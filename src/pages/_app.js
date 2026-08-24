import { AppContext } from "@/contexts/app";
import Head from "next/head";
import { useState, useEffect } from "react"
import { AES, MD5, enc } from "crypto-js";
import { Alert, CircularProgress, Slide } from "@mui/material";
import "../app/css/main.css"
import "../app/css/theme.css"
import GoogleAnalytics from "@/utils/ga";
import ErrorBoundary from "@/utils/errorBoundary/error";
import { Upload } from "@mui/icons-material";
import { useBeforeunload } from "react-beforeunload";
import axios from "axios";
import { parse } from "iptv-playlist-parser";
import Loading from "@/utils/loading";
import { useRouter } from "next/router";
import { migrateData } from "@/firebase/functions";
import AdSense from "@/utils/Adsense";
import Disclaimer from "@/utils/disclaimer";
import NetworkAlert from "@/utils/networkAlert";

const MyApp = ({ Component, pageProps }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [streamData, setStreamData] = useState({
        movies: {
            streams: null,
            streamCategories: null,
        },
        series: {
            streams: null,
            streamCategories: null,
        },
        liveTv: {
            streams: null,
            streamCategories: null,
        }
    });
    const [parentalVerified, setParentalVerified] = useState(false);
    const [alertProps, setAlertProps] = useState({
        show: false,
        type: "",
        title: ""
    });
    const [currentTheme, setCurrentTheme] = useState("dark");
    const [currentColor, setCurrentColor] = useState("purple");
    const [movieBannerStreams, setMovieBannerStreams] = useState(null);
    const [seriesBannerStreams, setSeriesBannerStreams] = useState(null);
    const [isPlayer, setIsPlayer] = useState(false);
    const [m3uStreams, setM3uStreams] = useState({
        movies: null,
        series: null,
        live: null
    });
    const [m3uUrl, setM3uUrl] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [m3u, setM3u] = useState(null);
    const [loading, setLoading] = useState(false);
    const [storage, setStorage] = useState(false)

    //m3u file uploaded

    const [m3uFileUploading, setM3uFileUplaoding] = useState(false);
    const [m3uFileUploaded, setM3uFileUploaded] = useState(false);
    const [homeM3uStreams, setHomeM3uStreams] = useState(null);
    const [scrolledPosition, setScrolledPosition] = useState({
        h: 0,
        m: 0,
        s: 0
    });

    const [currentPlayer, setCurrentPlayer] = useState('flowplayer')

    const getFromLocalStorage = (key) => {
        if (!key || typeof window === 'undefined') {
            return ""
        }
        return JSON.parse(localStorage.getItem(key))
    }

    const getLocal = (key) => {
        if (!key || typeof window === 'undefined') {
            return ""
        }
        return localStorage.getItem(key)
    }

    useEffect(() => {
        document.documentElement.className = currentColor
    }, [currentColor]);

    const currentUser = getFromLocalStorage("currentUser");



    useEffect(() => {
        try {
            if (currentUser && typeof currentUser === 'object' && Object.keys(currentUser).length > 0) {
                const userVal = Object.values(currentUser)[0];
                if (userVal) {
                    const { username, password, portallink, serverInfo, userInfo, loginType, token, M3U, id } = userVal;
                    if (loginType === 'm3u') {
                        const user = {
                            id,
                            loginType,
                            username,
                            password,
                            server: portallink
                        }
                        setUser({
                            ...user,
                            dbAddress: getDbAddressM3u(user)
                        });
                        setM3uUrl(M3U);
                    } else if (serverInfo) {
                        try {
                            const decryptedInfoStr = AES.decrypt(serverInfo, "thisisserverinfo").toString(enc.Utf8);
                            if (decryptedInfoStr) {
                                const time = JSON.parse(decryptedInfoStr).time_now;
                                const getTimeDifference = () => {
                                    const difference = new Date().getHours() - new Date(time).getHours();
                                    return difference;
                                }
                                const user = {
                                    id,
                                    username,
                                    password,
                                    serverPrefix: portallink,
                                    server: portallink,
                                    timeDifference: getTimeDifference(),
                                    serverInfo,
                                    userInfo,
                                    loginType,
                                    token
                                }
                                setUser({
                                    ...user,
                                    dbAddress: getDbAddress(user, null),
                                    decryptedDbAddress: getDbAddress(user, 'decrypted')
                                });
                            }
                        } catch (err) {
                            console.error("Error decrypting serverInfo in _app:", err);
                        }
                    }
                }
            }
        } catch (err) {
            console.error("Error initializing user in _app:", err);
        }
        if (getLocal("theme")) {
            setCurrentTheme(getLocal("theme"))
        }
        if (getLocal('player')) {
            setCurrentPlayer(getLocal('player'))
        }
        if (getLocal("color")) {
            setCurrentColor(getLocal("color"))
        }

        // Add your logic here to add the class to the body element
        document.body.classList.add('noTabs');
    }, []);

    useEffect(() => {
        // const handleRouteChange = () => {
        //     console.log('Scroll Position', window.scrollY)
        //   sessionStorage.setItem('scrollPosition', window.scrollY.toString());
        // };
        // router.events.on('routeChangeStart', handleRouteChange);
        // return () => {
        //   router.events.off('routeChangeStart', handleRouteChange);
        // };
    }, []);

    useBeforeunload(e => {
        if (m3uFileUploading) {
            e.preventDefault()
        }
    });

    useEffect(() => {
        if (currentTheme === "dark") {
            document.body.classList.remove("light");
            document.body.classList.add(currentTheme);
        } else {
            document.body.classList.remove("dark");
            document.body.classList.add(currentTheme);
        }
    }, [currentTheme]);


    const contextValue = {
        user: user,
        toggleUser: (userDetail) => {
            setUser(userDetail);
        },
        streamData: {
            movies: {
                streams: streamData.movies.streams,
                streamCategories: streamData.movies.streamCategories,
                toggle: (data, type) => {
                    setStreamData(prev => {
                        return {
                            ...prev,
                            movies: {
                                streams: type === "streams" ? data : prev.movies.streams,
                                streamCategories: type === "categories" ? data : prev.movies.streamCategories
                            }
                        }
                    })
                },
                banner: {
                    streams: movieBannerStreams,
                    toggle: (streams) => setMovieBannerStreams(streams)
                }
            },
            series: {
                streams: streamData.series.streams,
                streamCategories: streamData.series.streamCategories,
                toggle: (data, type) => {
                    setStreamData(prev => {
                        return {
                            ...prev,
                            series: {
                                streams: type === "streams" ? data : prev.series.streams,
                                streamCategories: type === "categories" ? data : prev.series.streamCategories
                            }
                        }
                    })
                },
                banner: {
                    streams: seriesBannerStreams,
                    toggle: (streams) => setSeriesBannerStreams(streams)
                }
            },
            liveTv: {
                streams: streamData.liveTv.streams,
                streamCategories: streamData.liveTv.streamCategories,
                toggle: (data, type) => {
                    setStreamData(prev => {
                        return {
                            ...prev,
                            liveTv: {
                                streams: type === "streams" ? data : prev.liveTv.streams,
                                streamCategories: type === "categories" ? data : prev.liveTv.streamCategories
                            }
                        }
                    })
                }
            }
        },
        alert: {
            title: alertProps.title,
            show: alertProps.show,
            type: alertProps.type,
            toggle: (alertDetails) => {
                setAlertProps(alertDetails);
                setTimeout(() => {
                    setAlertProps({
                        ...alertProps,
                        show: false
                    })
                }, 1000);
            }
        },
        parentalVerified: {
            status: parentalVerified,
            toggle: (status) => setParentalVerified(status)
        },
        theme: {
            current: currentTheme,
            color: currentColor,
            toggleTheme: (theme) => setCurrentTheme(theme),
            toggleColor: (color) => setCurrentColor(color)
        },
        m3uStreams: {
            streams: {
                movies: m3uStreams.movies,
                series: m3uStreams.series,
                live: m3uStreams.live
            },
            toggle: (movies, series, live) => setM3uStreams({ movies, series, live })
        },
        m3uUrl: {
            url: m3uUrl,
            toggle: (url) => setM3uUrl(url)
        },
        m3u: {
            data: m3u,
            isVisible: isVisible,
            toggle: (data) => {
                if (typeof data === "boolean") {
                    setIsVisible(true);
                } else {
                    setM3u(data);
                }
            }
        },
        homeM3uStreams: {
            streams: homeM3uStreams,
            toggle: (streams) => setHomeM3uStreams(streams)
        },
        m3uFileUpload: {
            uploading: m3uFileUploading,
            uploaded: m3uFileUploaded,
            toggle: (uploading, uploaded) => {
                setM3uFileUplaoding(uploading);
                setM3uFileUploaded(uploaded);
            }
        },
        scrolled: {
            h: scrolledPosition.h,
            m: scrolledPosition.m,
            s: scrolledPosition.s,
            toggle: (h, m, s) => setScrolledPosition({ h, m, s })
        },
        loading: {
            state: loading,
            toggle: (state) => setLoading(state)
        },
        currentPlayer: {
            player: currentPlayer,
            toggle: (player) => setCurrentPlayer(player)
        },
        storage: {
            state: storage,
            toggle: (state) => setStorage(state)
        },
        isPlayerOpen: {
            state: isPlayer,
            toggle: (value) => setIsPlayer(value)
        }
    }

    return <ErrorBoundary><AppContext.Provider value={contextValue}>
        <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flowplayer/7.2.7/skin/skin.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flowplayer/7.2.7/skin/skin.min.css" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/flowplayer/7.2.7/flowplayer.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/flowplayer/7.2.7/flowplayer.js"></script>
            <script src="https://releases.flowplayer.org/hlsjs/flowplayer.hlsjs.min.js"></script>\
            <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>

            {/* Google tag (gtag.js)  */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-6XDR5H7ESG"></script>
            <title>Avon</title>
        </Head>

        {
            loading ?
                <Loading /> :
                <Component pageProps={pageProps} />
        }
        <Slide direction="left" in={alertProps.show} style={{
            position: "fixed",
            top: 10,
            right: 10,
            zIndex: 9999999
        }}>
            <Alert className="alert-div" style={{ fontWeight: "bold", zIndex: 99999999 }} severity={alertProps.type || "info"}>{alertProps.title}</Alert>

        </Slide>
        <Disclaimer />
        <NetworkAlert />
        <GoogleAnalytics />
        {/* <AdSense/> */}
    </AppContext.Provider>
    </ErrorBoundary>
}

export const getDbAddress = (user, type) => {
    try {
        if (!user || !user.serverInfo || !user.password || !user.server) return "";
        const decryptedServerInfoStr = AES.decrypt(user.serverInfo, "thisisserverinfo").toString(enc.Utf8);
        if (!decryptedServerInfoStr) return "";
        const decryptedServerInfo = JSON.parse(decryptedServerInfoStr);
        const decryptedPassword = AES.decrypt(user.password, "thisispassword").toString(enc.Utf8);
        const decryptedServerAddress = AES.decrypt(user.server, "thisisserveraddress").toString(enc.Utf8);

        const getProtocol = (url) => {
            if (!url) return "http";
            const fixedUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `http://${url}`;
            try {
                const parsedUrl = new URL(fixedUrl);
                return (parsedUrl.protocol.substring(0, parsedUrl.protocol.length - 1));
            } catch (e) {
                return "http";
            }
        }
        const getDomain = (url) => {
            if (!url) return "";
            const fixedUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `http://${url}`;
            try {
                const parsedUrl = new URL(fixedUrl);
                return parsedUrl.hostname;
            } catch (e) {
                return url;
            }
        }
        const { username, loginType } = user;
        const safeUsername = username || "";
        if (type === 'decrypted') {
            const address = () => {
                const { server_protocol, url } = decryptedServerInfo || {};
                const parsedProtocol = server_protocol ? server_protocol : getProtocol(decryptedServerAddress);
                const parsedDomain = url ? url : getDomain(decryptedServerAddress);
                return safeUsername + '-' + decryptedPassword + '-' + parsedProtocol + ':' + parsedDomain
            }
            const regex = /[^a-zA-Z0-9\s.\-:]/g;
            const finalAddress = address().replace(regex, "").split(".").join("");

            if (loginType === "one-stream-panel") {
                return finalAddress + '-' + loginType
            }
            return finalAddress
        } else {
            const address = () => {
                const { server_protocol, url } = decryptedServerInfo || {};
                const parsedProtocol = server_protocol ? server_protocol : getProtocol(decryptedServerAddress);
                const parsedDomain = url ? url : getDomain(decryptedServerAddress);
                const regex = /[^a-zA-Z0-9\s.\-:]/g;

                if (loginType === "one-stream-panel") {
                    return MD5(safeUsername.replace(regex, "").split(".").join("")) + '-' + MD5(decryptedPassword.replace(regex, "").split(".").join("")) + '-' + MD5((parsedProtocol + ':' + parsedDomain).replace(regex, "").split(".").join("")) + '-' + MD5(loginType)
                }
                return MD5(safeUsername.replace(regex, "").split(".").join("")) + '-' + MD5(decryptedPassword.replace(regex, "").split(".").join("")) + '-' + MD5((parsedProtocol + ':' + parsedDomain).replace(regex, "").split(".").join(""))
            }
            return address()
        }
    } catch (err) {
        console.error("Error in getDbAddress:", err);
        return "";
    }
};

export const getDbAddressM3u = (user) => {
    try {
        if (!user || !user.server) return "";
        const { server } = user;
        const decryptedServerAddress = AES.decrypt(server, "thisisserveraddress").toString(enc.Utf8);
        const regex = /[^a-zA-Z0-9\s.\-:]/g;

        const getProtocol = (url) => {
            if (!url) return "http";
            const fixedUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `http://${url}`;
            try {
                const parsedUrl = new URL(fixedUrl);
                return (parsedUrl.protocol.substring(0, parsedUrl.protocol.length - 1)).replace(regex, "").split(".").join("");
            } catch (e) {
                return "http";
            }
        }

        const getDomain = (url) => {
            if (!url) return "";
            const fixedUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `http://${url}`;
            try {
                const parsedUrl = new URL(fixedUrl);
                return parsedUrl.hostname.replace(regex, "").split(".").join("");
            } catch (e) {
                return url;
            }
        }

        const address = () => {
            const parsedProtocol = getProtocol(decryptedServerAddress);
            const parsedDomain = getDomain(decryptedServerAddress);
            return MD5(parsedDomain) + '-' + MD5('m3u') + '-' + MD5(parsedProtocol + ':' + parsedDomain);
        }

        return address() + '-' + MD5('m3u');
    } catch (err) {
        console.error("Error in getDbAddressM3u:", err);
        return "";
    }
}


export default MyApp;
