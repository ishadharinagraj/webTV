exports.id = 6041;
exports.ids = [6041];
exports.modules = {

/***/ 2814:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/lockIcon.401b1ad2.svg","height":26,"width":20,"blurWidth":0,"blurHeight":0});

/***/ }),

/***/ 614:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/noContentFound.c65af0a3.svg","height":512,"width":512,"blurWidth":0,"blurHeight":0});

/***/ }),

/***/ 1536:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/placeholder.c15ce369.png","height":560,"width":426,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAAAAAD/rdHkAAAAGUlEQVR42mNwdnIGAgZnJxCAU2AApHDKAQBdqwx86F74/gAAAABJRU5ErkJggg==","blurWidth":6,"blurHeight":8});

/***/ }),

/***/ 5976:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getParentalPin),
/* harmony export */   P: () => (/* binding */ getUser)
/* harmony export */ });
const getUser = ()=>{
    if (true) {
        return "";
    }
    return JSON.parse(localStorage.getItem("listUser"));
};
const getParentalPin = (key)=>{
    if (!key || "undefined" === "undefined") {
        return "";
    }
    const localItem = localStorage.getItem(key);
    const retrievedUser = localItem && Object.values(JSON.parse(localStorage.getItem(key)))[0].parentalPin;
    return retrievedUser;
};


/***/ }),

/***/ 133:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _pages_dashboard_live_player_videojs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7250);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5335);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9755);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_nextEpisode_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(47);
/* harmony import */ var _assets_aspectRatio_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2529);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _contexts_app__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2805);
/* harmony import */ var _mui_icons_material_Sensors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7462);
/* harmony import */ var _mui_icons_material_Sensors__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Sensors__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _assets_playBtn_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3794);
/* harmony import */ var _assets_pauseBtn_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6018);
/* harmony import */ var _firebase_functions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(2313);
/* harmony import */ var _assets_backBtn_svg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(5554);
/* harmony import */ var _methods_concatUrl__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(1651);
/* harmony import */ var _mui_icons_material_Fullscreen__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(682);
/* harmony import */ var _mui_icons_material_Fullscreen__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Fullscreen__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _assets_minimize_svg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(2881);
/* harmony import */ var _assets_maximize_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(2125);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_17__);



















const VideoJSPlayer = ({ src, opened, onPlayerReady, currentEpg, currentStreams, onPreviousChannel, onNextChannel, currentStream, onclose, favourites, playingStream, getFavouriteChannels, onfullscreen, restart, type })=>{
    const [fullscreen, setFullscreen] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [player, setPlayer] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const [previousExists, setPreviousExists] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [nextExists, setNextExists] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [currentStreamIndex, setCurrentStreamIndex] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const [controlsActive, setControlsActive] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(true);
    const [controlsTimer, setControlsTimer] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [fullwidth, setFullwidth] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [playActive, setPlayActive] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [playerReady, setPlayerReady] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [fullscreenAvailable, setFullscreenAvailable] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [currentTime, setCurrentTime] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)("00:00");
    const [isFavourite, setIsFavourite] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)();
    const [isAlertShow, setIsAlertShow] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [alertInfo, setAlertInfo] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)();
    const playerRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
    const { user, alert } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(_contexts_app__WEBPACK_IMPORTED_MODULE_8__/* .AppContext */ .I);
    const getFav = async ()=>{
        const response = await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_12__/* .getFavourites */ .on)("LiveTv", user.id);
        if (Object.keys(response.val()).includes(String(currentStream))) {
            setIsFavourite(true);
        } else {
            setIsFavourite(false);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (isAlertShow) {
            const timer = setTimeout(()=>{
                setIsAlertShow(false);
                setAlertInfo();
            }, 3000); // 3 seconds delay
            return ()=>clearTimeout(timer);
        }
    }, [
        isAlertShow
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        getFav();
    }, [
        user?.id
    ]);
    const handlePlayerReady = (player)=>{
        playerRef.current = player;
        // You can handle player events here, for example:
        setPlayer(player);
        player.on("waiting", ()=>{
            video_js__WEBPACK_IMPORTED_MODULE_2___default().log("player is waiting");
        });
        player.on("dispose", ()=>{
            video_js__WEBPACK_IMPORTED_MODULE_2___default().log("player will dispose");
        });
        player.on("playing", ()=>{
            setPlayActive(true);
            onPlayerReady();
            setPlayerReady(true);
            setError(false);
        });
        player.on("error", ()=>{
            setError(true);
            setControlsActive(true);
        });
        player.on("play", ()=>{
            setPlayActive(true);
        });
        player.on("pause", ()=>{
            setPlayActive(false);
        });
        player.on("useractive", function() {
            setControlsActive(true);
        });
        player.on("userinactive", function() {
            setControlsActive(false);
        });
    };
    const handleAspectRatio = ()=>{
        if (fullscreen) {
            getFav();
            document.exitFullscreen();
            onclose();
        } else {
            getFav();
            document.getElementById("video-js-player-id").requestFullscreen();
        }
    };
    const onChangeFullscreen = ()=>{
        setFullscreen(document.fullscreenElement);
        onfullscreen(document.fullscreenElement);
    };
    const handlePlayPause = ()=>{
        if (playActive) {
            player.pause();
        } else {
            player.play();
        }
    };
    const handleBack = ()=>{
        if (fullwidth) {
            setFullwidth(false);
        }
        if (fullscreen) {
            document.exitFullscreen();
        }
        onclose();
    };
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        document.addEventListener("fullscreenchange", onChangeFullscreen);
        return ()=>document.removeEventListener("fullscreenchange", onChangeFullscreen);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        setFullscreenAvailable(document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled);
    }, []);
    // useEffect(() => {
    //   if (opened && player) {
    //     setFullwidth(true);
    //     onfullscreen(true);
    //   }
    // }, [opened, player])
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        const intervalId = setInterval(()=>{
            setCurrentTime(formatTime(new Date()));
        }, 1000);
        // Cleanup interval on component unmount
        return ()=>clearInterval(intervalId);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (user) {
            if (currentStreams.length === 1) {
                setPreviousExists(false);
                setNextExists(false);
                setCurrentStreamIndex(0);
            } else {
                currentStreams.map((stream, index)=>{
                    if (user.loginType === "m3u" ? (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_18__/* .concatUrl */ .C)(stream?.url) === currentStream?.stream_id : String(stream?.stream_id) === String(currentStream?.stream_id)) {
                        setCurrentStreamIndex(index);
                        if (index > 0) {
                            setPreviousExists(true);
                        } else {
                            setPreviousExists(false);
                        }
                        if (index === currentStreams.length - 1) {
                            setNextExists(false);
                        } else {
                            setNextExists(true);
                        }
                    }
                });
            }
        }
    }, [
        currentStreams,
        currentStream,
        user
    ]);
    const formatTime = (date)=>{
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        // Convert from 24-hour to 12-hour format
        hours = hours % 12 || 12;
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        return `${formattedHours}:${formattedMinutes}`;
    };
    function calculatePercentage(start, end, current) {
        function timeToMinutes(time) {
            var parts = time.split(":");
            return parseInt(parts[0]) * 60 + parseInt(parts[1]);
        }
        var startMinutes = timeToMinutes(start);
        var endMinutes = timeToMinutes(end);
        var currentMinutes = timeToMinutes(current);
        var totalDuration = endMinutes - startMinutes;
        var elapsedTime = currentMinutes - startMinutes;
        return elapsedTime / totalDuration * 100;
    }
    const handleAddToFav = async ()=>{
        const favId = user?.loginType === "m3u" ? String(currentStream) : String(currentStream?.stream_id);
        setIsAlertShow(true);
        try {
            if (isFavourite) {
                setIsFavourite(false);
                await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_12__/* .removeFromFavs */ .h2)(favId, "LiveTv", user?.loginType === "m3u" ? user.id : user?.dbAddress);
                setAlertInfo("Removed from Favourites");
            } else {
                await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_12__/* .addToFavs */ .zg)(favId, "LiveTv", user?.loginType === "m3u" ? user.id : user?.dbAddress);
                setIsFavourite(true);
                setAlertInfo("Added to Favourites");
            }
        } catch (error) {
            alert.toggle({
                show: true,
                title: "Something went wrong !",
                type: "error"
            });
        }
        ;
        getFavouriteChannels();
    };
    const controlStyles = {
        headerFooter: {
            opacity: controlsActive ? 1 : 0,
            visibility: controlsActive ? "visible" : "hidden",
            // height: controlsActive ? '100px' : 0,
            transition: ".5s"
        },
        playPause: {
            opacity: controlsActive ? 1 : 0,
            visibility: controlsActive ? "visible" : "hidden",
            transition: ".5s"
        }
    };
    const Loading = ()=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Backdrop, {
            sx: {
                background: "black",
                position: "absolute",
                top: 0,
                zIndex: 9,
                left: 0,
                width: "100%",
                height: "100%"
            },
            open: true,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CircularProgress, {
                sx: {
                    color: "white"
                }
            })
        });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        id: "video-js-player-id",
        className: `video-js-player${fullwidth || fullscreen ? "-fullscreen" : ""}`,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                onClick: handleAddToFav,
                className: "add-to-fav-icon",
                width: "40",
                height: "36",
                style: {
                    zIndex: 9999999,
                    position: "absolute",
                    top: "12px",
                    right: "20px",
                    // background: '#0d1e23',
                    padding: "7px",
                    display: controlsActive && fullscreen || controlsActive && fullwidth ? "block" : "none",
                    cursor: "pointer"
                },
                viewBox: "0 0 30 26",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        d: "M29.2239 7.73189C29.2239 8.12625 29.2239 8.52061 29.2239 8.91467C29.2091 8.99632 29.1875 9.07738 29.181 9.15933C29.0718 10.5385 28.6337 11.8136 27.9606 13.0141C27.113 14.5265 25.9933 15.827 24.7685 17.0364C21.7994 19.9679 18.5333 22.5639 15.3951 25.3043C15.0229 25.6294 14.5771 25.6093 14.1904 25.2874C13.8659 25.0173 13.5469 24.7404 13.2289 24.4623C10.706 22.2574 8.16057 20.0782 5.67077 17.8369C4.12678 16.4471 2.71503 14.9182 1.69378 13.0851C-0.0217981 10.006 -0.113805 6.88017 1.61036 3.78242C2.56563 2.06565 4.04069 0.913648 5.94354 0.375217C7.9733 -0.19901 9.91905 0.00807828 11.7287 1.14352C12.8804 1.86626 13.7579 2.85732 14.4765 3.99927C14.5827 4.1679 14.6862 4.33801 14.7629 4.46167C15.3081 3.75845 15.7856 3.01796 16.3841 2.39344C18.4931 0.19357 21.056 -0.47858 23.9434 0.472844C26.661 1.36835 28.2366 3.37771 28.9393 6.10329C29.0762 6.63521 29.131 7.18843 29.2239 7.73189Z",
                        fill: type === "player-api" ? favourites.filter((item)=>String(item) === String(currentStream?.stream_id)).length > 0 ? "#FF0000" : "white" : isFavourite ? "#FF0000" : "white"
                    }),
                    " "
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_7___default()), {
                style: {
                    display: !(fullwidth || fullscreen) && "none",
                    ...controlStyles.playPause
                },
                onClick: handleBack,
                className: "back-btn",
                src: _assets_backBtn_svg__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z,
                alt: "back-btn"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_dashboard_live_player_videojs__WEBPACK_IMPORTED_MODULE_1__["default"], {
                onReady: handlePlayerReady,
                options: {
                    autoplay: true,
                    controls: true,
                    responsive: true,
                    fluid: true,
                    liveui: true,
                    sources: [
                        {
                            src: src,
                            type: "application/x-mpegURL"
                        }
                    ]
                }
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "vjs-header",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                        className: "channel-name",
                        children: playingStream ? playingStream.name : currentStreams && currentStreams[currentStreamIndex]?.name
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "live-indicator",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "dot"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                children: "Live"
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_17__.Slide, {
                        direction: "left",
                        in: isAlertShow,
                        style: {
                            position: "fixed",
                            top: 10,
                            right: 10,
                            zIndex: 9999999
                        },
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_17__.Alert, {
                            className: "alert-div",
                            style: {
                                fontWeight: "bold",
                                zIndex: 99999999
                            },
                            severity: "success",
                            children: alertInfo
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_7___default()), {
                style: controlStyles.playPause,
                onClick: handlePlayPause,
                className: "play-pause-btn",
                src: playActive ? _assets_pauseBtn_svg__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z : _assets_playBtn_svg__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z,
                alt: "back-btn"
            }),
            currentEpg && !fullscreen && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: controlStyles.playPause,
                className: "progress-bar-wo-fullscreen",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    style: {
                        width: calculatePercentage(currentEpg.start, currentEpg.end, currentTime) > 100 ? 100 : calculatePercentage(currentEpg.start, currentEpg.end, currentTime) + "%"
                    },
                    className: "completed-progress"
                })
            }),
            currentEpg && !fullscreen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: controlStyles.playPause,
                className: "current-program-timings",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: currentTime
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: currentEpg.end.slice(0, 5)
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: controlStyles.headerFooter,
                className: "vjs-player-btns-container",
                children: [
                    previousExists && fullscreen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        onClick: ()=>onPreviousChannel(currentStreamIndex),
                        className: "option",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_7___default()), {
                                alt: "placeholder",
                                src: _assets_nextEpisode_svg__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                children: "Previous Channel"
                            })
                        ]
                    }),
                    fullscreenAvailable && !fullscreen && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        onClick: handleAspectRatio,
                        className: "option",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_7___default()), {
                            alt: "placeholder",
                            src: _assets_maximize_svg__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .Z,
                            className: "full-screen-icon"
                        })
                    }),
                    fullscreenAvailable && fullscreen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        onClick: handleAspectRatio,
                        className: "option",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_7___default()), {
                                alt: "placeholder",
                                src: _assets_minimize_svg__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .Z
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                children: "Minimize"
                            })
                        ]
                    }),
                    nextExists && fullscreen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        onClick: async ()=>{
                            player.dispose();
                            setTimeout(()=>{
                                onNextChannel(currentStreamIndex);
                            }, 100);
                        },
                        className: "option",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_7___default()), {
                                alt: "placeholder",
                                src: _assets_nextEpisode_svg__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                children: "Next Channel"
                            })
                        ]
                    })
                ]
            }),
            error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "error-modal",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: "There is some error playing the video"
                    }),
                    ";",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: ()=>restart(currentStreamIndex),
                        children: "Try again"
                    })
                ]
            }),
            fullscreen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: controlStyles.playPause,
                className: "current-program-info-container",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "current-program-info",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "image-and-info",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        src: playingStream ? playingStream?.tvg?.logo : currentStream.stream_icon
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "current-program-channel-details",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                                className: "current-channel",
                                                children: playingStream ? playingStream.name : currentStreams && currentStreams[currentStreamIndex]?.name
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: "current-program-info",
                                                children: currentEpg && atob(currentEpg.title)
                                            })
                                        ]
                                    })
                                ]
                            }),
                            currentEpg && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "current-program-timing",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    children: [
                                        currentTime,
                                        " / ",
                                        currentEpg.end.slice(0, 5)
                                    ]
                                })
                            })
                        ]
                    }),
                    currentEpg && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "progress-bar",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            style: {
                                width: calculatePercentage(currentEpg.start, currentEpg.end, currentTime) > 100 ? 100 : calculatePercentage(currentEpg.start, currentEpg.end, currentTime) + "%"
                            },
                            className: "completed-progress"
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VideoJSPlayer);


/***/ }),

/***/ 9755:
/***/ (() => {



/***/ })

};
;