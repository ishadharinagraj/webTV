exports.id = 845;
exports.ids = [845];
exports.modules = {

/***/ 1651:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ concatUrl),
/* harmony export */   r: () => (/* binding */ convertToHttp)
/* harmony export */ });
const concatUrl = (url)=>{
    const regex = /[^a-zA-Z0-9\s.\-:]/g;
    return url?.replace(regex, "").split(".").join("");
};
const convertToHttp = (url)=>{
    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    } else {
        return "http://" + url;
    }
};


/***/ }),

/***/ 845:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8900);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4173);
/* harmony import */ var _mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_icons_material_Visibility__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(773);
/* harmony import */ var _mui_icons_material_Visibility__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Visibility__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_icons_material_VisibilityOff__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7749);
/* harmony import */ var _mui_icons_material_VisibilityOff__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_VisibilityOff__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_icons_material_PlaylistAddCheckRounded__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9726);
/* harmony import */ var _mui_icons_material_PlaylistAddCheckRounded__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_PlaylistAddCheckRounded__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mui_icons_material_PersonOutlineRounded__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7337);
/* harmony import */ var _mui_icons_material_PersonOutlineRounded__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_PersonOutlineRounded__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _mui_icons_material_LockOutlined__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(399);
/* harmony import */ var _mui_icons_material_LockOutlined__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_LockOutlined__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _mui_icons_material_DnsOutlined__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6964);
/* harmony import */ var _mui_icons_material_DnsOutlined__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_DnsOutlined__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5666);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _methods_concatUrl__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1651);
/* harmony import */ var _constants_avatars__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(2461);














const EditModal = ({ open, defaultPlaylist, onClose, onEdit })=>{
    const [playlistName, setPlaylistName] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const [username, setUsername] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const [password, setPassword] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const [serverUrl, setServerUrl] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const [passwordShow, setPasswordShow] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [loginType, setLoginType] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("player-api");
    const [avatarTab, setAvatarTab] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("boy");
    const [selectedAvatarId, setSelectedAvatarId] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("boy-1");
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        setPlaylistName("");
        if (defaultPlaylist) {
            const userVal = Object.values(defaultPlaylist)[0];
            if (userVal) {
                const { loginType, username, avatarId, password, portallink } = userVal;
                setPlaylistName(Object.keys(defaultPlaylist)[0] || "");
                setUsername(username || "");
                setLoginType(loginType || "player-api");
                if (avatarId) {
                    setSelectedAvatarId(avatarId);
                    if (avatarId.startsWith("girl")) setAvatarTab("girl");
                    else setAvatarTab("boy");
                }
                if (loginType !== "m3u" && password && portallink) {
                    try {
                        const decryptedPassword = crypto_js__WEBPACK_IMPORTED_MODULE_11__.AES.decrypt(password, "thisispassword").toString(crypto_js__WEBPACK_IMPORTED_MODULE_11__.enc.Utf8);
                        const decryptedServerAddress = crypto_js__WEBPACK_IMPORTED_MODULE_11__.AES.decrypt(portallink, "thisisserveraddress").toString(crypto_js__WEBPACK_IMPORTED_MODULE_11__.enc.Utf8);
                        setPassword(decryptedPassword);
                        setServerUrl(decryptedServerAddress);
                    } catch (err) {
                        setPassword("");
                        setServerUrl("");
                    }
                }
            }
        }
    }, [
        defaultPlaylist
    ]);
    const handleSave = (e)=>{
        e.preventDefault();
        const ecryptedPassword = crypto_js__WEBPACK_IMPORTED_MODULE_11__.AES.encrypt(password, "thisispassword").toString();
        const encryptedServerAddress = crypto_js__WEBPACK_IMPORTED_MODULE_11__.AES.encrypt((0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_13__/* .convertToHttp */ .r)(serverUrl), "thisisserveraddress").toString();
        const details = loginType !== "m3u" ? {
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
    const currentAvatars = avatarTab === "boy" ? _constants_avatars__WEBPACK_IMPORTED_MODULE_12__/* .BOY_AVATARS */ .NS : _constants_avatars__WEBPACK_IMPORTED_MODULE_12__/* .GIRL_AVATARS */ .oU;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Dialog, {
        sx: {
            "& .MuiBackdrop-root": {
                backgroundColor: "rgba(5, 8, 20, 0.85)",
                backdropFilter: "blur(12px)"
            }
        },
        PaperProps: {
            className: "edit-modal-paper"
        },
        open: open,
        onClose: onClose,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "editModalHeader",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                        className: "editModalTitle",
                        children: "Edit Profile & Avatar"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        type: "button",
                        className: "editModalCloseBtn",
                        onClick: onClose,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_4___default()), {
                            style: {
                                fontSize: 20
                            }
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "editModalBody",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "avatarSectionContainer",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                className: "avatarSectionLabel",
                                children: "Choose Profile Avatar:"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "avatarCategoryTabs",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "button",
                                        className: `avatarTabBtn ${avatarTab === "boy" ? "active" : ""}`,
                                        onClick: ()=>setAvatarTab("boy"),
                                        children: "Boy Characters (5)"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "button",
                                        className: `avatarTabBtn ${avatarTab === "girl" ? "active" : ""}`,
                                        onClick: ()=>setAvatarTab("girl"),
                                        children: "Girl Characters (5)"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "avatarGrid",
                                children: currentAvatars.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        onClick: ()=>setSelectedAvatarId(item.id),
                                        className: `avatarGridItem ${selectedAvatarId === item.id ? "selected" : ""}`,
                                        style: {
                                            background: item.gradient
                                        },
                                        title: item.name,
                                        children: item.svg
                                    }, item.id))
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                        className: "editModalForm",
                        onSubmit: handleSave,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "editInputGroup",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_PlaylistAddCheckRounded__WEBPACK_IMPORTED_MODULE_7___default()), {
                                        className: "editInputIcon"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        value: playlistName,
                                        onChange: (e)=>setPlaylistName(e.target.value),
                                        className: "editInputField",
                                        placeholder: "Playlist Name",
                                        type: "text"
                                    })
                                ]
                            }),
                            loginType !== "m3u" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "editInputGroup",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_PersonOutlineRounded__WEBPACK_IMPORTED_MODULE_8___default()), {
                                                className: "editInputIcon"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                value: username,
                                                onChange: (e)=>setUsername(e.target.value),
                                                className: "editInputField",
                                                placeholder: "Username",
                                                type: "text"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "editInputGroup",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_LockOutlined__WEBPACK_IMPORTED_MODULE_9___default()), {
                                                className: "editInputIcon"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                value: password,
                                                onChange: (e)=>setPassword(e.target.value),
                                                className: "editInputField",
                                                placeholder: "Password",
                                                type: passwordShow ? "text" : "password"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                type: "button",
                                                className: "editPasswordToggle",
                                                onClick: ()=>setPasswordShow(!passwordShow),
                                                children: passwordShow ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_VisibilityOff__WEBPACK_IMPORTED_MODULE_6___default()), {
                                                    style: {
                                                        fontSize: 20
                                                    }
                                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Visibility__WEBPACK_IMPORTED_MODULE_5___default()), {
                                                    style: {
                                                        fontSize: 20
                                                    }
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "editInputGroup",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_DnsOutlined__WEBPACK_IMPORTED_MODULE_10___default()), {
                                                className: "editInputIcon"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                value: serverUrl,
                                                onChange: (e)=>setServerUrl(e.target.value),
                                                className: "editInputField",
                                                placeholder: "Server Address",
                                                type: "text"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "editModalActions",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "submit",
                                        className: "editSaveBtn",
                                        children: "Save Changes"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "button",
                                        className: "editCancelBtn",
                                        onClick: onClose,
                                        children: "Cancel"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditModal);


/***/ }),

/***/ 8900:
/***/ (() => {



/***/ })

};
;