import { Dialog } from '@mui/material';
import React, { useState, useEffect } from 'react';
import "./styles.css";
import { 
    Close, 
    Visibility, 
    VisibilityOff,
    PlaylistAddCheckRounded,
    PersonOutlineRounded,
    LockOutlined,
    DnsOutlined 
} from '@mui/icons-material';
import { AES, enc } from 'crypto-js';
import { convertToHttp } from '@/methods/concatUrl';
import { BOY_AVATARS, GIRL_AVATARS } from '@/constants/avatars';

const EditModal = ({ open, defaultPlaylist, onClose, onEdit }) => {
    const [playlistName, setPlaylistName] = useState('');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [serverUrl, setServerUrl] = useState("");
    const [passwordShow, setPasswordShow] = useState(false);
    const [loginType, setLoginType] = useState('player-api');
    const [avatarTab, setAvatarTab] = useState('boy');
    const [selectedAvatarId, setSelectedAvatarId] = useState('boy-1');

    useEffect(() => {
        setPlaylistName('');
        if (defaultPlaylist) {
            const userVal = Object.values(defaultPlaylist)[0];
            if (userVal) {
                const { loginType, username, avatarId, password, portallink } = userVal;
                setPlaylistName(Object.keys(defaultPlaylist)[0] || '');
                setUsername(username || '');
                setLoginType(loginType || 'player-api');
                if (avatarId) {
                    setSelectedAvatarId(avatarId);
                    if (avatarId.startsWith('girl')) setAvatarTab('girl');
                    else setAvatarTab('boy');
                }
                if (loginType !== 'm3u' && password && portallink) {
                    try {
                        const decryptedPassword = AES.decrypt(password, "thisispassword").toString(enc.Utf8);
                        const decryptedServerAddress = AES.decrypt(portallink, "thisisserveraddress").toString(enc.Utf8);
                        setPassword(decryptedPassword);
                        setServerUrl(decryptedServerAddress);
                    } catch (err) {
                        setPassword('');
                        setServerUrl('');
                    }
                }
            }
        }
    }, [defaultPlaylist]);

    const handleSave = (e) => {
        e.preventDefault();
        const ecryptedPassword = AES.encrypt(password, 'thisispassword').toString();
        const encryptedServerAddress = AES.encrypt(convertToHttp(serverUrl), "thisisserveraddress").toString();
        const details = loginType !== 'm3u' ? {
            username,
            playlistName,
            password: ecryptedPassword,
            portallink: encryptedServerAddress,
            avatarId: selectedAvatarId
        } : {
            ...Object.values(defaultPlaylist)[0],
            playlistName,
            avatarId: selectedAvatarId
        };

        onEdit(details);
    };

    const currentAvatars = avatarTab === 'boy' ? BOY_AVATARS : GIRL_AVATARS;

    return (
        <Dialog
            sx={{
                '& .MuiBackdrop-root': {
                    backgroundColor: 'rgba(5, 8, 20, 0.85)',
                    backdropFilter: 'blur(12px)',
                }
            }}
            PaperProps={{ className: 'edit-modal-paper' }}
            open={open}
            onClose={onClose}
        >
            <div className="editModalHeader">
                <h3 className="editModalTitle">Edit Profile & Avatar</h3>
                <button type="button" className="editModalCloseBtn" onClick={onClose}>
                    <Close style={{ fontSize: 20 }} />
                </button>
            </div>

            <div className="editModalBody">
                <div className="avatarSectionContainer">
                    <label className="avatarSectionLabel">Choose Profile Avatar:</label>
                    <div className="avatarCategoryTabs">
                        <button
                            type="button"
                            className={`avatarTabBtn ${avatarTab === 'boy' ? 'active' : ''}`}
                            onClick={() => setAvatarTab('boy')}
                        >
                            Boy Characters (5)
                        </button>
                        <button
                            type="button"
                            className={`avatarTabBtn ${avatarTab === 'girl' ? 'active' : ''}`}
                            onClick={() => setAvatarTab('girl')}
                        >
                            Girl Characters (5)
                        </button>
                    </div>

                    <div className="avatarGrid">
                        {currentAvatars.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedAvatarId(item.id)}
                                className={`avatarGridItem ${selectedAvatarId === item.id ? 'selected' : ''}`}
                                style={{ background: item.gradient }}
                                title={item.name}
                            >
                                {item.svg}
                            </div>
                        ))}
                    </div>
                </div>

                <form className="editModalForm" onSubmit={handleSave}>
                    <div className="editInputGroup">
                        <PlaylistAddCheckRounded className="editInputIcon" />
                        <input
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            className="editInputField"
                            placeholder="Playlist Name"
                            type="text"
                        />
                    </div>

                    {loginType !== "m3u" && (
                        <>
                            <div className="editInputGroup">
                                <PersonOutlineRounded className="editInputIcon" />
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="editInputField"
                                    placeholder="Username"
                                    type="text"
                                />
                            </div>

                            <div className="editInputGroup">
                                <LockOutlined className="editInputIcon" />
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="editInputField"
                                    placeholder="Password"
                                    type={passwordShow ? "text" : "password"}
                                />
                                <button
                                    type="button"
                                    className="editPasswordToggle"
                                    onClick={() => setPasswordShow(!passwordShow)}
                                >
                                    {passwordShow ? <VisibilityOff style={{ fontSize: 20 }} /> : <Visibility style={{ fontSize: 20 }} />}
                                </button>
                            </div>

                            <div className="editInputGroup">
                                <DnsOutlined className="editInputIcon" />
                                <input
                                    value={serverUrl}
                                    onChange={(e) => setServerUrl(e.target.value)}
                                    className="editInputField"
                                    placeholder="Server Address"
                                    type="text"
                                />
                            </div>
                        </>
                    )}

                    <div className="editModalActions">
                        <button type="submit" className="editSaveBtn">
                            Save Changes
                        </button>
                        <button type="button" className="editCancelBtn" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
};

export default EditModal;