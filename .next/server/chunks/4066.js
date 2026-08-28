exports.id = 4066;
exports.ids = [4066];
exports.modules = {

/***/ 4066:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ parentalLock)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "react-pin-input"
var external_react_pin_input_ = __webpack_require__(6490);
var external_react_pin_input_default = /*#__PURE__*/__webpack_require__.n(external_react_pin_input_);
// EXTERNAL MODULE: ./src/utils/parentalLock/styles.css
var styles = __webpack_require__(8477);
// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "crypto-js"
var external_crypto_js_ = __webpack_require__(5666);
// EXTERNAL MODULE: ./src/contexts/app.js
var app = __webpack_require__(2805);
;// CONCATENATED MODULE: ./src/assets/cross.png
/* harmony default export */ const cross = ({"src":"/_next/static/media/cross.5dc6f7be.png","height":195,"width":195,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA2UlEQVR42jWOOQrCYBCF5yJiDGggggsoRLBxQRRc0cYFNRewcEOPodYuxxC0EFyuYpHCKoGY4jlDsPj/gffeN/MIAGnpka4b43vUMD1+X90wb1p6qIn3Nz9qso9gvAcl0UMo0QdrFofCJGSIzXxt5habC+TrMxSbc9cPmVfiz1OTA2TLE2wOD+xOL+RqUyh+wCG5KauF3uwf2B6fqHTWCMS6iGZMm6SQpEutpVtozJGrTlFur1yFIYbPJG05ZElIRLktG1l7R1JDlQBQhNuycGHC4WkLKSYA+gG4O3IaJaFA/wAAAABJRU5ErkJggg==","blurWidth":8,"blurHeight":8});
;// CONCATENATED MODULE: ./src/utils/parentalLock/index.jsx








const ParentalLock = ({ open, close, completed, action, noEscape })=>{
    const [loading, setLoading] = (0,external_react_.useState)(false);
    const [error, setError] = (0,external_react_.useState)(false);
    const [pin, setPin] = (0,external_react_.useState)("");
    const [previousPin, setPreviousPin] = (0,external_react_.useState)(null);
    const [enteredOldPin, setEnteredOldPin] = (0,external_react_.useState)("");
    const [openNewPin, setOpenNewPin] = (0,external_react_.useState)(false);
    const { parentalVerified, alert } = (0,external_react_.useContext)(app/* AppContext */.I);
    const [errorModal, setErrorModal] = (0,external_react_.useState)({
        message: "",
        show: false
    });
    const encryptedPin = (newpin)=>external_crypto_js_.AES.encrypt(newpin, "thisispin").toString();
    const inputRef = (0,external_react_.useRef)(null);
    (0,external_react_.useEffect)(()=>{
        if (getParentalPin("currentUser")) {
            setPreviousPin(getParentalPin("currentUser"));
        } else {
            setPreviousPin(null);
        }
    }, []);
    const handleOk = ()=>{
        setErrorModal((prev)=>{
            return {
                ...prev,
                show: false
            };
        });
    };
    const getParentalPin = (key)=>{
        if (!key || "undefined" === "undefined") {
            return "";
        }
        const retrievedUser = Object.values(JSON.parse(localStorage.getItem(key)))[0].parentalPin;
        if (retrievedUser) {
            const restoredPin = external_crypto_js_.AES.decrypt(retrievedUser, "thisispin").toString(external_crypto_js_.enc.Utf8);
            return restoredPin;
        }
        return null;
    };
    const savePin = (newpin)=>{
        if (newpin.length === 4) {
            const listUsers = JSON.parse(localStorage.getItem("listUser"));
            const users = listUsers.map((user)=>Object.values(user)[0]);
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            const currentUserId = Object.values(currentUser)[0].id;
            const foundUser = users.filter((user)=>user.id === currentUserId)[0];
            const updatedUser = {
                ...foundUser,
                parentalPin: encryptedPin(newpin)
            };
            const foundUserKey = Object.keys(listUsers.filter((user)=>{
                const userId = Object.values(user)[0].id;
                return userId === currentUserId;
            })[0])[0];
            const foundUserIndex = listUsers.indexOf(listUsers.filter((user)=>{
                const userId = Object.values(user)[0].id;
                return userId === currentUserId;
            })[0]);
            listUsers[foundUserIndex][foundUserKey] = updatedUser;
            currentUser[foundUserKey] = updatedUser;
            localStorage.setItem("listUser", JSON.stringify(listUsers));
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            handleComplete();
            alert.toggle({
                title: "Parental pin apply successfully",
                type: "success",
                show: true
            });
            window.location.reload();
            setError(false);
        } else {
            setError(true);
        }
    };
    const saveNewPin = (newpin)=>{
        if (newpin.length === 4) {
            const listUsers = JSON.parse(localStorage.getItem("listUser"));
            const users = listUsers.map((user)=>Object.values(user)[0]);
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            const currentUserId = Object.values(currentUser)[0].id;
            const foundUser = users.filter((user)=>user.id === currentUserId)[0];
            const updatedUser = {
                ...foundUser,
                parentalPin: encryptedPin(newpin)
            };
            const foundUserKey = Object.keys(listUsers.filter((user)=>{
                const userId = Object.values(user)[0].id;
                return userId === currentUserId;
            })[0])[0];
            const foundUserIndex = listUsers.indexOf(listUsers.filter((user)=>{
                const userId = Object.values(user)[0].id;
                return userId === currentUserId;
            })[0]);
            listUsers[foundUserIndex][foundUserKey] = updatedUser;
            currentUser[foundUserKey] = updatedUser;
            localStorage.setItem("listUser", JSON.stringify(listUsers));
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            handleComplete();
            alert.toggle({
                title: "Parental pin changed successfully",
                type: "success",
                show: true
            });
            setTimeout(()=>{
                window.location.reload();
            }, 1000);
            setError(false);
        } else {
            setError(true);
        }
    };
    const handleComplete = ()=>{
        setLoading(true);
        setTimeout(()=>{
            completed();
            setTimeout(()=>{
                setLoading(false);
            }, 500);
        }, 1000);
    };
    const checkPin = (enteredPin)=>{
        const existedPin = getParentalPin("currentUser");
        if (existedPin === enteredPin) {
            handleComplete();
            parentalVerified.toggle(true);
        } else {
            setError(true);
        }
    };
    const changePin = ()=>{
        const handleOldPin = (e)=>{
            setEnteredOldPin(e);
            if (e === previousPin) {
                setOpenNewPin(true);
                inputRef.current.clear();
            } else {
                setError(true);
            }
        };
        const handleNewPin = (e)=>{
            if (e.length === 4) {
                saveNewPin(e);
            }
        };
        return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                    className: "enter-pin-code-title",
                    children: [
                        "Enter Your ",
                        openNewPin ? "New" : "Old",
                        " Code"
                    ]
                }),
                openNewPin ? /*#__PURE__*/ jsx_runtime.jsx((external_react_pin_input_default()), {
                    secret: true,
                    initialValue: "",
                    inputStyle: {
                        border: "1.5px solid white",
                        borderColor: error ? "red" : "white",
                        borderRadius: 3,
                        marginLeft: 5,
                        marginRight: 5,
                        color: "#615DFC",
                        fontSize: 40
                    },
                    length: 4,
                    onChange: handleNewPin,
                    type: "numeric"
                }) : /*#__PURE__*/ jsx_runtime.jsx((external_react_pin_input_default()), {
                    secret: true,
                    inputStyle: {
                        border: "1.5px solid white",
                        borderColor: error ? "red" : "white",
                        borderRadius: 3,
                        marginLeft: 5,
                        marginRight: 5,
                        color: "#615DFC",
                        fontSize: 40
                    },
                    ref: inputRef,
                    length: 4,
                    onChange: ()=>setError(false),
                    onComplete: handleOldPin,
                    type: "numeric"
                })
            ]
        });
    };
    const setupPin = ()=>{
        return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
                /*#__PURE__*/ jsx_runtime.jsx("p", {
                    className: "enter-pin-code-title",
                    children: "Enter Your Pin Code"
                }),
                /*#__PURE__*/ jsx_runtime.jsx((external_react_pin_input_default()), {
                    secret: true,
                    inputStyle: {
                        border: "1.5px solid white",
                        borderColor: error ? "red" : "white",
                        borderRadius: 3,
                        marginLeft: 5,
                        marginRight: 5,
                        color: "#615DFC",
                        fontSize: 40
                    },
                    length: 4,
                    onChange: (e)=>{
                        setPin(e);
                        setError(false);
                    },
                    type: "numeric"
                }),
                " :"
            ]
        });
    };
    const disablePin = ()=>{
        const handleDisable = (e)=>{
            if (e === previousPin) {
                localStorage.removeItem("parentalPin");
                const listUsers = JSON.parse(localStorage.getItem("listUser"));
                const users = listUsers.map((user)=>Object.values(user)[0]);
                const currentUser = JSON.parse(localStorage.getItem("currentUser"));
                const currentUserId = Object.values(currentUser)[0].id;
                const foundUser = users.filter((user)=>user.id === currentUserId)[0];
                const updatedUser = {
                    ...foundUser,
                    parentalPin: null
                };
                const foundUserKey = Object.keys(listUsers.filter((user)=>{
                    const userId = Object.values(user)[0].id;
                    return userId === currentUserId;
                })[0])[0];
                const foundUserIndex = listUsers.indexOf(listUsers.filter((user)=>{
                    const userId = Object.values(user)[0].id;
                    return userId === currentUserId;
                })[0]);
                listUsers[foundUserIndex][foundUserKey] = updatedUser;
                currentUser[foundUserKey] = updatedUser;
                localStorage.setItem("listUser", JSON.stringify(listUsers));
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                setLoading(true);
                setTimeout(()=>{
                    setLoading(false);
                    completed();
                }, 1000);
                alert.toggle({
                    title: "Parental pin disabled",
                    type: "success",
                    show: true
                });
                window.location.reload();
            } else {
                alert.toggle({
                    title: "Invalid parental pin",
                    type: "error",
                    show: true
                });
                setError(true);
            }
        };
        return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
                /*#__PURE__*/ jsx_runtime.jsx("p", {
                    className: "enter-pin-code-title",
                    children: "Enter Your Pin Code"
                }),
                /*#__PURE__*/ jsx_runtime.jsx((external_react_pin_input_default()), {
                    secret: true,
                    inputStyle: {
                        border: "1.5px solid white",
                        borderColor: error ? "red" : "white",
                        borderRadius: 3,
                        marginLeft: 5,
                        marginRight: 5,
                        color: "#615DFC",
                        fontSize: 40
                    },
                    length: 4,
                    onChange: (e)=>{
                        setError(false);
                    },
                    onComplete: handleDisable,
                    type: "numeric"
                }),
                ":"
            ]
        });
    };
    const verifyPin = ()=>{
        const handlePin = (e)=>{
            checkPin(e);
        };
        return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
                /*#__PURE__*/ jsx_runtime.jsx("p", {
                    className: "enter-pin-code-title",
                    children: "Enter Your Pin Code"
                }),
                /*#__PURE__*/ jsx_runtime.jsx((external_react_pin_input_default()), {
                    secret: true,
                    inputStyle: {
                        border: "1.5px solid white",
                        borderColor: error ? "red" : "white",
                        borderRadius: 3,
                        marginLeft: 5,
                        marginRight: 5,
                        color: "#615DFC",
                        fontSize: 40
                    },
                    length: 4,
                    onChange: (e)=>{
                        setError(false);
                    },
                    onComplete: handlePin,
                    type: "numeric"
                }),
                " :"
            ]
        });
    };
    return /*#__PURE__*/ jsx_runtime.jsx(material_.Dialog, {
        sx: {
            background: "rgba(0,0,0,0.6)",
            zIndex: 999999
        },
        open: open,
        onClose: noEscape ? ()=>{} : close,
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "enter-parental-lock-container",
            children: [
                /*#__PURE__*/ jsx_runtime.jsx("div", {
                    className: "heading",
                    children: /*#__PURE__*/ jsx_runtime.jsx("p", {
                        children: "Your Pin Code"
                    })
                }),
                loading ? /*#__PURE__*/ jsx_runtime.jsx(material_.CircularProgress, {
                    sx: {
                        mt: 5
                    }
                }) : /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                    children: [
                        action === "change" && changePin(),
                        action === "setup" && setupPin(),
                        action === "disable" && disablePin(),
                        action === "verify" && verifyPin(),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "btns",
                            children: [
                                action === "setup" && /*#__PURE__*/ jsx_runtime.jsx("button", {
                                    onClick: ()=>savePin(pin),
                                    className: "btn btn-primary playBtn",
                                    children: "Save"
                                }),
                                !noEscape && /*#__PURE__*/ jsx_runtime.jsx("button", {
                                    onClick: ()=>close(),
                                    className: "btn btn-primary ",
                                    children: "Cancel"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const parentalLock = (ParentalLock);


/***/ }),

/***/ 8477:
/***/ (() => {



/***/ })

};
;