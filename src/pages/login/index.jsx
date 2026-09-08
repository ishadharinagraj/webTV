"use client";
import React, { useState, useContext, useEffect, useRef } from 'react'
import "./styles.css"
import axios from 'axios';
import { useRouter } from "next/router"
import { useRouter as queryRouter } from "next/router"
import { AES, enc } from 'crypto-js'
import { AppContext } from '@/contexts/app';
import {
    Visibility,
    VisibilityOff,
    PlaylistAddCheckRounded,
    PersonOutlineRounded,
    LockOutlined,
    DnsOutlined
} from '@mui/icons-material';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '@/firebase';
import { v4 } from "uuid";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUser } from '@/utils/local';
import { getRandomHexColor } from '@/methods/getRandomColor';
import { getDbAddress } from '../_app';
import { validateDns } from '@/utils/dnsValidation';

const Login = () => {
    const router = useRouter();
    const { action, type } = queryRouter().query;
    const { toggleUser, streamData, homeM3uStreams, m3uStreams } = useContext(AppContext);
    const [playlistName, setPlaylistName] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [serverAddress, setServerAddress] = useState("");
    const [passwordShow, setPasswordShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [handleLoginClicked, setHandleLoginClicked] = useState(false);

    const playlistNameRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const serverAddressRef = useRef(null);
    const submitBtnRef = useRef(null);

    const refs = [playlistNameRef, usernameRef, passwordRef, serverAddressRef, submitBtnRef];

    const handleKeyDown = (e, index) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (index + 1) % refs.length;
            refs[nextIndex].current?.focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (index - 1 + refs.length) % refs.length;
            refs[prevIndex].current?.focus();
        } else if (e.key === 'Enter') {
            if (index < refs.length - 1) {
                e.preventDefault();
                refs[index + 1].current?.focus();
            }
        }
    };

    const valuesNotFilled = [playlistName, password, username, serverAddress].filter(val => val.length === 0).length > 0;
    const convertToHttp = (url) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        } else {
            return 'http://' + url;
        }
    }

    const convertedUrl = convertToHttp(serverAddress);
    const encryptedPassword = AES.encrypt(password, "thisispassword").toString();
    const encryptedAddress = AES.encrypt(convertedUrl, "thisisserveraddress").toString();
    const dataToSend = {
        username: username,
        password: encryptedPassword,
    }
    const params = new URLSearchParams(dataToSend).toString();

    const loginUser = async () => {
        const uid = v4();
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/login?${params}`, {
                headers: {
                    server: encryptedAddress,
                    type
                }
            });

            const { user_info, server_info, token } = response.data.message;
            const serverInfo = AES.encrypt(JSON.stringify(server_info), "thisisserverinfo").toString();
            const userInfo = AES.encrypt(JSON.stringify(user_info), "thisisuserinfo").toString();
            const getTimeDifference = () => {
                const encryptedTime = server_info.time_now;
                const difference = new Date().getHours() - new Date(encryptedTime).getHours();
                return difference;
            };
            const profileColor = getRandomHexColor();
            if (user_info.auth === 1 && user_info.status === "Active") {
                const credentials = {
                    [playlistName]: {
                        id: uid,
                        username,
                        password: encryptedPassword,
                        portallink: encryptedAddress,
                        serverInfo,
                        userInfo,
                        timeDifference: getTimeDifference(),
                        profileColor,
                        loginType: type,
                        token,
                    }
                };
                const user = {
                    id: uid,
                    username,
                    password: encryptedPassword,
                    serverPrefix: encryptedAddress,
                    server: encryptedAddress,
                    serverInfo,
                    userInfo,
                    timeDifference: getTimeDifference(),
                    profileColor,
                    loginType: type,
                    token,
                };
                const existingUsers = JSON.parse(localStorage.getItem("listUser"));
                const updatedUsers = JSON.stringify(existingUsers ? [...existingUsers, credentials] : [credentials]);
                localStorage.setItem("listUser", updatedUsers);
                localStorage.setItem("currentUser", JSON.stringify(credentials));
                localStorage.setItem('player', 'flowplayer')
                toggleUser({
                    ...user,
                    dbAddress: getDbAddress(user, null),
                    decryptedDbAddress: getDbAddress(user, 'decrypted')
                })
                const { movies, series } = streamData;

                movies.toggle(null, "streams")
                movies.toggle(null, "categories")
                series.toggle(null, "streams")
                series.toggle(null, "categories");
                m3uStreams.toggle(null, null, null);
                homeM3uStreams.toggle(null);
                movies.banner.toggle(null);
                series.banner.toggle(null)

                firebaseSignIn();
            } else {
                toast.error("Authentication Failed! Account Status: " + user_info.status);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Invalid Username, Password, or Server Address!");
            setLoading(false);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setHandleLoginClicked(true);
        setLoading(true);
        if (valuesNotFilled) {
            toast.warning("Please fill in all required fields!");
            setTimeout(() => {
                setLoading(false);
            }, 400);
        } else {
            // Check DNS Whitelist status
            const dnsCheck = await validateDns(serverAddress);
            if (!dnsCheck.isWhitelisted) {
                toast.error(dnsCheck.message || "This Server DNS is not whitelisted!");
                setLoading(false);
                setHandleLoginClicked(false);
                return;
            }

            const existedUser = getUser();
            if (existedUser) {
                const existingUsers = Object.values(existedUser);
                const userExists = Object.values(existedUser).map(user => Object.keys(user)).filter(user => user[0].toLowerCase() === playlistName.toLowerCase()).length > 0;
                if (userExists) {
                    const userDetails = Object.values(existingUsers.filter((user) => Object.keys(user)[0].toLowerCase() === playlistName.toLowerCase()));

                    userDetails.map(async userdetail => {
                        const userDetail = Object.values(userdetail)[0]
                        const { username: existedUsername, password: existedPassword, portallink } = userDetail;
                        const decryptedPassword = AES.decrypt(existedPassword, "thisispassword").toString(enc.Utf8);
                        const decryptedServerAddress = AES.decrypt(portallink, "thisisserveraddress").toString(enc.Utf8);
                        const newDecryptedAddress = AES.decrypt(encryptedAddress, "thisisserveraddress").toString(enc.Utf8);
                        if (existedUsername === username && decryptedPassword === password && decryptedServerAddress === newDecryptedAddress) {
                            toast.warning("This playlist already exists! Try another one.");
                            setLoading(false)
                        } else {
                            await loginUser()
                            setHandleLoginClicked(false);
                        }
                    })

                } else {
                    await loginUser()
                    setHandleLoginClicked(false);
                }
            } else {
                await loginUser()
                setHandleLoginClicked(false);
            }
        }
    }

    const handleChange = (e, setFn) => {
        const value = e.target.value;
        setFn(value);
    }

    const firebaseSignIn = async () => {
        try {
            const response = await signInAnonymously(auth);
            if (response) {
                toast.success("Playlist added successfully! Redirecting...");
                setTimeout(() => {
                    router.push('/dashboard?view=movies');
                    setLoading(false);
                }, 1000);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong! Please try again.");
            setLoading(false);
        }
    }

    useEffect(() => {
        if (getUser() && getUser().length > 0 && action !== 'add-profile') {
            router.push('/playlists')
        } else {
            playlistNameRef.current?.focus();
        }
    }, []);

    return (
        <section className="login">
            <ToastContainer
                theme="dark"
                position="top-right"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
            />
            <div className="loginCard">
                <div className="loginBrand">
                    <h2 className="loginCardTitle">Add New Playlist</h2>
                    <p className="loginCardSubtitle">Connect your subscription to stream live TV, movies & series</p>
                </div>

                <form onSubmit={handleLogin} className="loginForm">
                    <div className="formGroup">
                        <div className="inputWrapper">
                            <span className="inputIcon"><PlaylistAddCheckRounded /></span>
                            <input
                                ref={playlistNameRef}
                                onKeyDown={(e) => handleKeyDown(e, 0)}
                                onChange={(e) => handleChange(e, setPlaylistName)}
                                className="formControl"
                                placeholder=" "
                                type="text"
                                value={playlistName}
                            />
                            <label className="floatingLabel">Any Playlist Name (e.g. My OTT)</label>
                        </div>
                        {(handleLoginClicked && playlistName.length === 0) && <p className='error' >This Field is required !</p>}
                    </div>
                    <div className="formGroup">
                        <div className="inputWrapper">
                            <span className="inputIcon"><PersonOutlineRounded /></span>
                            <input
                                ref={usernameRef}
                                onKeyDown={(e) => handleKeyDown(e, 1)}
                                onChange={(e) => handleChange(e, setUsername)}
                                className="formControl"
                                placeholder=" "
                                type="text"
                                value={username}
                            />
                            <label className="floatingLabel">Username</label>
                        </div>
                        {(handleLoginClicked && username.length === 0) && <p className='error' >This Field is required !</p>}
                    </div>
                    <div className="formGroup">
                        <div className="inputWrapper">
                            <span className="inputIcon"><LockOutlined /></span>
                            <input
                                ref={passwordRef}
                                onKeyDown={(e) => handleKeyDown(e, 2)}
                                onChange={(e) => handleChange(e, setPassword)}
                                className="formControl"
                                placeholder=" "
                                type={passwordShow ? "text" : "password"}
                                value={password}
                            />
                            <label className="floatingLabel">Password</label>
                            {passwordShow ? (
                                <VisibilityOff className="showPassword" onClick={() => setPasswordShow(!passwordShow)} />
                            ) : (
                                <Visibility className="showPassword" onClick={() => setPasswordShow(!passwordShow)} />
                            )}
                        </div>
                        {(handleLoginClicked && password.length === 0) && <p className='error' >This Field is required !</p>}
                    </div>

                    <div className="formGroup">
                        <div className="inputWrapper">
                            <span className="inputIcon"><DnsOutlined /></span>
                            <input
                                ref={serverAddressRef}
                                onKeyDown={(e) => handleKeyDown(e, 3)}
                                onChange={(e) => handleChange(e, setServerAddress)}
                                className="formControl"
                                placeholder=" "
                                type="text"
                                value={serverAddress}
                            />
                            <label className="floatingLabel">Portal URL / Server Address (e.g. http://url:port)</label>
                        </div>
                        {(handleLoginClicked && serverAddress.length === 0) && <p className='error' >This Field is required !</p>}
                    </div>

                    {loading ? (
                        <div className="sexyLoaderContainer">
                            <div className="sexySpinner">
                                <div className="sexySpinnerRing ring1"></div>
                                <div className="sexySpinnerRing ring2"></div>
                                <div className="sexySpinnerDot"></div>
                            </div>
                            <span className="sexyLoaderText">Authenticating...</span>
                        </div>
                    ) : (
                        <button ref={submitBtnRef} onKeyDown={(e) => handleKeyDown(e, 4)} type='submit' className="btn submitBtn">Add Playlist</button>
                    )}
                </form>
            </div>
        </section >
    )
}

export default Login