exports.id = 4977;
exports.ids = [4977];
exports.modules = {

/***/ 4977:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5942);
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











const CatchUpPlayer = ({ src, onPlayerReady, currentStreams, onPreviousChannel, onNextChannel, currentStream, onclose, opened, onfullscreen, restart })=>{
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
    const playerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { view } = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)().query;
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
            });
            player.on("pause", ()=>{
                setPlayActive(false);
            });
            player.on("resume", ()=>{
                setPlayActive(true);
            });
            return ()=>{
                if (isIos()) {
                    player.unload();
                } else {
                    player?.engine.unload();
                }
            };
        }
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
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (src && player) {
            player.load({
                sources: [
                    {
                        type: "application/x-mpegURL",
                        src: src
                    }
                ]
            });
        }
    }, [
        src
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (opened && player) {
            setFullwidth(true);
            onfullscreen(true);
        }
    }, [
        opened,
        player
    ]);
    const handleAspectRatio = ()=>{
        if (fullscreen) {
            document.exitFullscreen();
            onclose();
        } else {
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
        if (currentStreams.length === 1) {
            setPreviousExists(false);
            setNextExists(false);
            setCurrentStreamIndex(0);
        } else {
            currentStreams.map((stream, index)=>{
                if (String(stream.stream_id) === String(currentStream)) {
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
    }, [
        currentStreams,
        currentStream
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (playerRef.current) {
            const fpUi = playerRef.current.childNodes[1].childNodes[4].childNodes;
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
    const handleMouseOver = ()=>{
        if (controlsTimer) {
            clearTimeout(controlsTimer);
        }
        setControlsActive(true);
        const timer = setTimeout(()=>{
            setControlsActive(false);
        }, 5000);
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
        opacity: controlsActive ? 1 : 0,
        visibility: controlsActive ? "visible" : "hidden"
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        id: "live-playerrr",
        className: `live-player${fullwidth ? "-fullscreen" : ""}`,
        onMouseMove: handleMouseOver,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                alt: "placeholder",
                style: {
                    display: !(fullwidth || fullscreen) && "none",
                    ...controlsStyles
                },
                onClick: handleBack,
                className: "back-btn",
                src: _assets_backBtn_svg__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                id: "player-wrapperr",
                ref: playerRef,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                        alt: "placeholder",
                        style: {
                            display: (error || !playerReady) && "none",
                            ...controlsStyles
                        },
                        onClick: handlePlayPause,
                        className: "play-pause-btn",
                        src: playActive ? _assets_pauseBtn_svg__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z : _assets_playBtn_svg__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                        style: controlsStyles,
                        className: "channel-name",
                        children: currentStreams && currentStreams[currentStreamIndex]?.name
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: controlsStyles,
                        className: `live-bottom-controls${fullscreen || fullwidth ? "-fullscreen" : ""}`,
                        children: [
                            previousExists && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                onClick: ()=>onPreviousChannel(currentStreamIndex),
                                className: "option",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                                        alt: "placeholder",
                                        src: _assets_nextEpisode_svg__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: "Previous Channel"
                                    })
                                ]
                            }),
                            (fullscreen || fullwidth) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                onClick: handleChannelList,
                                className: "option",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                                        alt: "placeholder",
                                        src: _assets_episodes_svg__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: "Channels List"
                                    })
                                ]
                            }),
                            fullscreenAvailable && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                onClick: handleAspectRatio,
                                className: "option",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                                        alt: "placeholder",
                                        src: _assets_aspectRatio_svg__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: "Aspect Ratio"
                                    })
                                ]
                            }),
                            nextExists && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                onClick: async ()=>{
                                    player.engine.unload();
                                    setTimeout(()=>{
                                        onNextChannel(currentStreamIndex);
                                    }, 100);
                                },
                                className: "option",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                                        alt: "placeholder",
                                        src: _assets_nextEpisode_svg__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z
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
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CatchUpPlayer);


/***/ }),

/***/ 5942:
/***/ (() => {



/***/ })

};
;