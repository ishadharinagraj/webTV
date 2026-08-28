exports.id = 7707;
exports.ids = [7707];
exports.modules = {

/***/ 2125:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/maximize.72aee2ff.svg","height":15,"width":15,"blurWidth":0,"blurHeight":0});

/***/ }),

/***/ 2881:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/minimize.eef68d29.svg","height":15,"width":15,"blurWidth":0,"blurHeight":0});

/***/ }),

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

/***/ 7707:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5971);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_backBtn_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5554);
/* harmony import */ var _assets_nextEpisode_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(47);
/* harmony import */ var _assets_episodes_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4530);
/* harmony import */ var _assets_aspectRatio_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2529);
/* harmony import */ var _assets_playBtn_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3794);
/* harmony import */ var _assets_pauseBtn_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6018);
/* harmony import */ var _methods_concatUrl__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(1651);
/* harmony import */ var _contexts_app__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2805);
/* harmony import */ var _firebase_functions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(2313);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _mui_icons_material_Fullscreen__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(682);
/* harmony import */ var _mui_icons_material_Fullscreen__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Fullscreen__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _assets_minimize_svg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(2881);
/* harmony import */ var _assets_maximize_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(2125);



















const LiveTVPlayer = ({ src, onPlayerReady, currentStreams, onPreviousChannel, onNextChannel, currentStream, onclose, opened, favourites = [], playingStream, getFavouriteChannels, onfullscreen, currentEpg, url, restart, type })=>{
    const [player, setPlayer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [fullscreen, setFullscreen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [previousExists, setPreviousExists] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [nextExists, setNextExists] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [currentStreamIndex, setCurrentStreamIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [controlsActive, setControlsActive] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [controlsTimer, setControlsTimer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [fullwidth, setFullwidth] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [playActive, setPlayActive] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [playerReady, setPlayerReady] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [fullscreenAvailable, setFullscreenAvailable] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [currentTime, setCurrentTime] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("00:00");
    const [playing, setPlaying] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { user, alert } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_contexts_app__WEBPACK_IMPORTED_MODULE_11__/* .AppContext */ .I);
    const [isAlertShow, setIsAlertShow] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [alertInfo, setAlertInfo] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const [isFavourite, setIsFavourite] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const playerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const getFav = async ()=>{
        const response = await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_12__/* .getFavourites */ .on)("LiveTv", user.id);
        if (Object.keys(response.val()).includes(String(currentStream))) {
            setIsFavourite(true);
        } else {
            setIsFavourite(false);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
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
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getFav();
    }, [
        user?.id
    ]);
    // const { view } = useRouter().query;
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setFullscreenAvailable(document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setPlayer(window.flowplayer("#player-wrapperr", {
            autoplay: true,
            ratio: "1:1",
            controls: false,
            muted: false,
            clip: {
                sources: [
                    {
                        type: "application/x-mpegURL",
                        src
                    }
                ]
            }
        }));
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const intervalId = setInterval(()=>{
            setCurrentTime(formatTime(new Date()));
        }, 1000);
        // Cleanup interval on component unmount
        return ()=>clearInterval(intervalId);
    }, []);
    const formatTime = (date)=>{
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        // Convert from 24-hour to 12-hour format
        hours = hours % 12 || 12;
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        return `${formattedHours}:${formattedMinutes}`;
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (player) {
            player.on("ready", ()=>{
                onPlayerReady();
                setPlayerReady(true);
                setError(false);
            });
            player.on("error", ()=>{
                setError(true);
            });
            player.on("progress", ()=>{
                setPlayActive(true);
                setPlaying(true);
            });
            player.on("pause", ()=>{
                setPlayActive(false);
            });
            player.on("resume", ()=>{
                setPlayActive(true);
            });
            return ()=>{
                if (isIos()) {
                    player?.unload();
                } else {
                    player?.engine?.unload();
                }
            };
        }
        ;
    }, [
        player
    ]);
    const isIos = ()=>{
        return [
            "iPad Simulator",
            "iPhone Simulator",
            "iPod Simulator",
            "iPad",
            "iPhone",
            "iPod"
        ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
    };
    // useEffect(() => {
    //     if (opened && player) {
    //         setFullwidth(true);
    //         onfullscreen(true);
    //     }
    // }, [opened, player])
    const handleAspectRatio = ()=>{
        if (fullscreen) {
            getFav();
            document.exitFullscreen();
            onclose();
        } else {
            getFav();
            document.getElementById("live-playerrr").requestFullscreen();
        }
    };
    const onChangeFullscreen = ()=>{
        setFullscreen(document.fullscreenElement);
        onfullscreen(document.fullscreenElement);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        document.addEventListener("fullscreenchange", onChangeFullscreen);
        return ()=>document.removeEventListener("fullscreenchange", onChangeFullscreen);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (user && currentStream) {
            if (currentStreams.length === 1) {
                setPreviousExists(false);
                setNextExists(false);
                setCurrentStreamIndex(0);
            } else {
                currentStreams.map((stream, index)=>{
                    if (user.loginType === "m3u" ? (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_17__/* .concatUrl */ .C)(stream.url) === currentStream?.stream_id : String(stream.stream_id) === String(currentStream?.stream_id)) {
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
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (playerRef.current) {
            const fpUi = playerRef.current.childNodes[1].childNodes[5].childNodes;
            fpUi.forEach((node)=>{
                if (node.className === "fp-controls") {
                    node.style.bottom = fullscreen || fullwidth ? "90px" : "40px";
                    node.style.opacity = controlsActive ? 1 : 0;
                    node.style.visibility = controlsActive ? "visible" : "hidden";
                }
            });
        }
    }, [
        controlsActive,
        fullscreen,
        fullwidth
    ]);
    const handleAddToFav = async ()=>{
        const favId = user?.loginType === "m3u" ? String(currentStream) : String(currentStream?.stream_id);
        setIsAlertShow(true);
        try {
            if (isFavourite) {
                await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_12__/* .removeFromFavs */ .h2)(favId, "LiveTv", user?.loginType === "m3u" ? user.id : user.dbAddress);
                setAlertInfo("Removed from Favourites");
                setIsFavourite(false);
            } else {
                await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_12__/* .addToFavs */ .zg)(favId, "LiveTv", user?.loginType === "m3u" ? user?.id : user.dbAddress);
                setAlertInfo("Added to Favourites");
                setIsFavourite(true);
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
    const handleMouseOver = ()=>{
        if (controlsTimer) {
            clearTimeout(controlsTimer);
        }
        setControlsActive(true);
        const timer = setTimeout(()=>{
            setControlsActive(false);
        }, 2000);
        setControlsTimer(timer);
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
    const handleChannelList = ()=>{
        setFullwidth(false);
        if (fullscreen) {
            document.exitFullscreen();
        }
        onclose();
    };
    const handlePlayPause = ()=>{
        if (playActive) {
            player.pause();
        } else {
            player.play();
        }
    };
    const controlsStyles = {
        transition: ".3s",
        opacity: controlsActive && !error ? 1 : 0,
        visibility: controlsActive && !error ? "visible" : "hidden",
        display: error ? "none" : ""
    };
    const Loading = ()=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_13__.Backdrop, {
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
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_13__.CircularProgress, {
                sx: {
                    color: "white"
                }
            })
        });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            id: "live-playerrr",
            className: `live-player${fullwidth ? "-fullscreen" : ""}`,
            onMouseMove: handleMouseOver,
            children: [
                !error && !playing && Loading(),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_13__.Slide, {
                    direction: "left",
                    in: isAlertShow,
                    style: {
                        position: "fixed",
                        top: 10,
                        right: 10,
                        zIndex: 9999999
                    },
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_13__.Alert, {
                        className: "alert-div",
                        style: {
                            fontWeight: "bold",
                            zIndex: 99999999
                        },
                        severity: "success",
                        children: alertInfo
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                    style: {
                        zIndex: 9999999,
                        ...controlsStyles,
                        display: !(fullwidth || fullscreen) && "none"
                    },
                    onClick: handleBack,
                    className: "back-btn",
                    src: _assets_backBtn_svg__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z,
                    alt: "back-btn"
                }),
                currentEpg && !fullscreen && !error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    style: controlsStyles,
                    className: "progress-bar-wo-fullscreen",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        style: {
                            width: calculatePercentage(currentEpg.start, currentEpg.end, currentTime) > 100 ? 100 : calculatePercentage(currentEpg.start, currentEpg.end, currentTime) + "%"
                        },
                        className: "completed-progress"
                    })
                }),
                currentEpg && !fullscreen && !error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    style: controlsStyles,
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
                    id: "player-wrapperr",
                    ref: playerRef,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                            style: {
                                display: (error || !playerReady) && "none",
                                ...controlsStyles
                            },
                            onClick: handlePlayPause,
                            className: "play-pause-btn",
                            src: playActive ? _assets_pauseBtn_svg__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z : _assets_playBtn_svg__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z,
                            alt: "back-btn"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                            style: controlsStyles,
                            className: "channel-name",
                            children: playingStream ? playingStream.name : currentStreams && currentStreams[currentStreamIndex]?.name
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                            onClick: handleAddToFav,
                            className: "add-to-fav-icon",
                            width: "40",
                            height: "36",
                            style: {
                                zIndex: 9999999,
                                position: "absolute",
                                top: "20px",
                                right: "20px",
                                padding: "7px",
                                display: controlsActive && fullscreen ? "block" : "none",
                                cursor: "pointer"
                            },
                            viewBox: "0 0 30 26",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: [
                                " ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                    d: "M29.2239 7.73189C29.2239 8.12625 29.2239 8.52061 29.2239 8.91467C29.2091 8.99632 29.1875 9.07738 29.181 9.15933C29.0718 10.5385 28.6337 11.8136 27.9606 13.0141C27.113 14.5265 25.9933 15.827 24.7685 17.0364C21.7994 19.9679 18.5333 22.5639 15.3951 25.3043C15.0229 25.6294 14.5771 25.6093 14.1904 25.2874C13.8659 25.0173 13.5469 24.7404 13.2289 24.4623C10.706 22.2574 8.16057 20.0782 5.67077 17.8369C4.12678 16.4471 2.71503 14.9182 1.69378 13.0851C-0.0217981 10.006 -0.113805 6.88017 1.61036 3.78242C2.56563 2.06565 4.04069 0.913648 5.94354 0.375217C7.9733 -0.19901 9.91905 0.00807828 11.7287 1.14352C12.8804 1.86626 13.7579 2.85732 14.4765 3.99927C14.5827 4.1679 14.6862 4.33801 14.7629 4.46167C15.3081 3.75845 15.7856 3.01796 16.3841 2.39344C18.4931 0.19357 21.056 -0.47858 23.9434 0.472844C26.661 1.36835 28.2366 3.37771 28.9393 6.10329C29.0762 6.63521 29.131 7.18843 29.2239 7.73189Z",
                                    fill: type === "player-api" ? favourites.filter((item)=>String(item) === String(currentStream?.stream_id)).length > 0 ? "#FF0000" : "white" : isFavourite ? "#FF0000" : "white"
                                }),
                                " "
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            style: controlsStyles,
                            className: `live-bottom-controls${fullscreen || fullwidth ? "-fullscreen" : ""}`,
                            children: [
                                previousExists && fullscreen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    onClick: ()=>onPreviousChannel(currentStreamIndex),
                                    className: "option",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                                            src: _assets_nextEpisode_svg__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z,
                                            alt: "next-episodes"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            children: "Previous Channel"
                                        })
                                    ]
                                }),
                                fullscreenAvailable && !fullscreen && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    onClick: handleAspectRatio,
                                    className: "full-screen-icon-container",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                                        src: _assets_maximize_svg__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .Z,
                                        alt: "aspect-ratio",
                                        className: "full-screen-icon"
                                    })
                                }),
                                fullscreenAvailable && fullscreen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    style: {
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    },
                                    onClick: handleAspectRatio,
                                    className: "option",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                                            src: _assets_minimize_svg__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .Z,
                                            alt: "aspect-ratio"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            children: "Minimize"
                                        })
                                    ]
                                }),
                                nextExists && fullscreen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    onClick: async ()=>{
                                        player.engine.unload();
                                        setTimeout(()=>{
                                            onNextChannel(currentStreamIndex);
                                        }, 100);
                                    },
                                    className: "option",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                                            src: _assets_nextEpisode_svg__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z,
                                            alt: "next-episodes"
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
                            style: controlsStyles,
                            className: "current-program-info-container",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "current-program-info",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "image-and-info",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                    src: playingStream ? playingStream.tvg.logo : currentStream.stream_icon
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
                                                            children: currentEpg && atob(currentEpg?.title)
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
                        }),
                        fullscreen && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "live-full-screen-gradient"
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LiveTVPlayer);


/***/ }),

/***/ 5971:
/***/ (() => {



/***/ })

};
;