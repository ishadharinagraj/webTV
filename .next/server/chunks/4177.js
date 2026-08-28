exports.id = 4177;
exports.ids = [4177];
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

/***/ 1401:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/seekBack.cb360e45.svg","height":149,"width":149,"blurWidth":0,"blurHeight":0});

/***/ }),

/***/ 7837:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/seekForward.2a6cde07.svg","height":149,"width":149,"blurWidth":0,"blurHeight":0});

/***/ }),

/***/ 1067:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/speed.5cf05eef.svg","height":44,"width":55,"blurWidth":0,"blurHeight":0});

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

/***/ 8807:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1304);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_scrollable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(707);
/* harmony import */ var _mui_icons_material_Cancel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3733);
/* harmony import */ var _mui_icons_material_Cancel__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Cancel__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1536);
/* harmony import */ var _utils_progress__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9328);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6666);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(firebase_database__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8837);
/* harmony import */ var _contexts_app__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2805);











const Episodes = ({ show, handleShowEpisode, onMouseMove, watchedEpisodes, playEpisode, series, player, currentPlaying, seriesId, setCurrentPlaying, seasonChanged })=>{
    const [seasons, setSeasons] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [episodes, setEpisodes] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [selectedSeason, setSelectedSeason] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const { user, currentPlayer } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_contexts_app__WEBPACK_IMPORTED_MODULE_10__/* .AppContext */ .I);
    const secondsToHms = (d)=>{
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        var hDisplay = h > 0 ? h + (h == 1 ? "h" : "h") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? "min" : " min") : "";
        return hDisplay + " " + mDisplay;
    };
    const handlePlay = (episode)=>{
        const data = {
            episode_num: episode.episode_num,
            episodeId: episode.id,
            season: episode.season
        };
        playEpisode(data);
        setTimeout(()=>{
            setCurrentPlaying(episode);
        }, 500);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (series) {
            setSeasons(Object.keys(series.episodes));
            setEpisodes(series.episodes);
        }
    }, [
        series
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (currentPlaying) {
            setSelectedSeason(currentPlaying.season);
        }
    }, [
        currentPlaying
    ]);
    const handleSeason = (e)=>{
        const { value } = e.target;
        setSelectedSeason(value);
        seasonChanged(value);
    };
    const database = (0,firebase_database__WEBPACK_IMPORTED_MODULE_8__.getDatabase)(_firebase__WEBPACK_IMPORTED_MODULE_9__/* .app */ .l);
    // useEffect(() => {
    //   if(user && seriesId){
    //     onValue(ref(database, `${user.dbAddress}/Recent/Series/${seriesId}`), (snapshot) => {
    //       const epsdKeys = snapshot.val() ?  Object.keys(snapshot.val()) : [];
    //       setWatchedEpisodes({
    //         episodes: snapshot.val(),
    //         keys: epsdKeys
    //     });
    //   });
    //   }
    // },[user,seriesId])
    const Episode = ({ episode, show })=>{
        const ratingCount = Math.round(episode.info.rating ? episode.info.rating : 0 / 2);
        const rating = ()=>Array(ratingCount).fill(1).map(()=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                    width: "18",
                    height: "33",
                    viewBox: "0 0 35 33",
                    style: {
                        marginLeft: 5
                    },
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: [
                        " ",
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                            d: "M0.479492 12.8428C0.667049 12.2289 0.995185 11.7264 1.62263 11.4926C2.17676 11.2861 2.77003 11.32 3.34658 11.2634C4.9531 11.1057 6.56103 10.9658 8.16861 10.8203C9.24057 10.7231 10.3118 10.6188 11.3848 10.5388C11.7073 10.5146 11.8991 10.4306 12.0397 10.096C13.2277 7.26702 14.4434 4.4494 15.646 1.62679C16.1741 0.386855 17.5023 -0.016018 18.4935 0.771578C18.786 1.00398 18.9583 1.31752 19.1028 1.65527C20.3203 4.50777 21.5442 7.35742 22.7564 10.2121C22.8404 10.4103 22.939 10.5021 23.1543 10.5203C24.9708 10.674 26.7869 10.8335 28.6023 10.9982C29.9583 11.1214 31.3143 11.2452 32.6684 11.3869C33.4194 11.4652 33.9255 11.8969 34.1611 12.6019C34.4031 13.3261 34.2212 13.9831 33.6575 14.4896C32.4069 15.6131 31.1356 16.7139 29.8718 17.8229C28.7401 18.8158 27.6101 19.8102 26.4716 20.795C26.3168 20.9288 26.2862 21.0434 26.3317 21.2427C27.0318 24.2977 27.7194 27.3559 28.4155 30.412C28.5959 31.2042 28.4176 31.8761 27.766 32.3793C27.1517 32.8538 26.3969 32.8584 25.6701 32.4238C22.986 30.8191 20.3011 29.2158 17.6215 27.6036C17.434 27.4908 17.3073 27.4922 17.1197 27.605C14.4299 29.2211 11.7372 30.8333 9.03842 32.4345C7.81022 33.1634 6.42401 32.4897 6.25318 31.1006C6.2272 30.8889 6.2571 30.6814 6.30265 30.4792C6.98704 27.4545 7.67071 24.429 8.37254 21.4082C8.44977 21.0761 8.38321 20.8871 8.12448 20.6626C5.78304 18.6325 3.45905 16.5826 1.12437 14.5447C0.797307 14.2589 0.634663 13.8863 0.480204 13.5016C0.479492 13.2827 0.479492 13.0628 0.479492 12.8428Z",
                            fill: "#FEC007"
                        }),
                        " "
                    ]
                }));
        const current = currentPlaying.id === episode.id;
        const watched = watchedEpisodes?.episodes ? watchedEpisodes?.episodes[user.loginType === "one-stream-panel" ? String(episode.id) : Number(episode.id)]?.timeline / watchedEpisodes?.episodes[user.loginType === "one-stream-panel" ? String(episode.id) : Number(episode.id)]?.duration * 100 : null;
        const currentEpisodeProgress = player ? (currentPlayer.player === "videojs" ? player.currentTime() / player.duration() : player.video.time / player.video.duration) * 100 : 0;
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            onClick: ()=>handlePlay(episode),
            className: "episode",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                    href: "javascript:void(0)",
                    className: "listLink",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "episode-img",
                            children: [
                                current && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "now-playing",
                                    children: "Now Playing"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                    className: "play-icon",
                                    width: "60",
                                    height: "60",
                                    viewBox: "0 0 167 167",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: [
                                        " ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
                                            filter: "url(#filter0_d_361_4267)",
                                            children: [
                                                " ",
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("rect", {
                                                    x: "27",
                                                    y: "27",
                                                    width: "113.01",
                                                    height: "113.01",
                                                    rx: "56.505",
                                                    fill: "black",
                                                    "fill-opacity": "0.8"
                                                }),
                                                " ",
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("rect", {
                                                    x: "28.5",
                                                    y: "28.5",
                                                    width: "110.01",
                                                    height: "110.01",
                                                    rx: "55.005",
                                                    stroke: "white",
                                                    "stroke-opacity": "0.7",
                                                    "stroke-width": "3"
                                                }),
                                                " ",
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                    d: "M68.5371 63.3047C68.854 63.3047 69.1705 63.3047 69.4873 63.3047C70.4095 63.4923 71.277 63.8164 72.0956 64.2865C81.0342 69.419 89.9788 74.541 98.9106 79.6844C99.5548 80.0555 100.174 80.5129 100.702 81.0342C102.145 82.4603 102.206 84.301 100.933 85.8705C100.374 86.559 99.6583 87.0485 98.8993 87.4839C89.9697 92.6055 81.0428 97.7316 72.1046 102.837C71.46 103.205 70.7503 103.499 70.0348 103.695C68.0982 104.226 66.4374 103.344 65.7151 101.477C65.3806 100.612 65.3127 99.707 65.3127 98.7939C65.3109 88.647 65.3109 78.5005 65.3141 68.3535C65.3141 67.9453 65.3281 67.534 65.3756 67.1289C65.5053 66.0187 65.8425 64.9958 66.6743 64.1907C67.1978 63.6835 67.8523 63.4652 68.5371 63.3047Z",
                                                    fill: "white"
                                                }),
                                                " "
                                            ]
                                        }),
                                        " ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("defs", {
                                            children: [
                                                " ",
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("filter", {
                                                    id: "filter0_d_361_4267",
                                                    x: "0.493332",
                                                    y: "0.493332",
                                                    width: "166.023",
                                                    height: "166.023",
                                                    filterUnits: "userSpaceOnUse",
                                                    "color-interpolation-filters": "sRGB",
                                                    children: [
                                                        " ",
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("feFlood", {
                                                            "flood-opacity": "0",
                                                            result: "BackgroundImageFix"
                                                        }),
                                                        " ",
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("feColorMatrix", {
                                                            in: "SourceAlpha",
                                                            type: "matrix",
                                                            values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                                                            result: "hardAlpha"
                                                        }),
                                                        " ",
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("feOffset", {}),
                                                        " ",
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("feGaussianBlur", {
                                                            stdDeviation: "13.2533"
                                                        }),
                                                        " ",
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("feComposite", {
                                                            in2: "hardAlpha",
                                                            operator: "out"
                                                        }),
                                                        " ",
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("feColorMatrix", {
                                                            type: "matrix",
                                                            values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"
                                                        }),
                                                        " ",
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("feBlend", {
                                                            mode: "normal",
                                                            in2: "BackgroundImageFix",
                                                            result: "effect1_dropShadow_361_4267"
                                                        }),
                                                        " ",
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("feBlend", {
                                                            mode: "normal",
                                                            in: "SourceGraphic",
                                                            in2: "effect1_dropShadow_361_4267",
                                                            result: "shape"
                                                        }),
                                                        " "
                                                    ]
                                                }),
                                                " "
                                            ]
                                        }),
                                        " "
                                    ]
                                }),
                                episode.info.movie_image ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    src: episode.info.movie_image
                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_5___default()), {
                                    alt: "placeholder",
                                    src: _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z
                                }),
                                String(currentPlaying.id) === String(episode.id) ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_utils_progress__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                    progress: currentEpisodeProgress
                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_utils_progress__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                    progress: watched ? watched : 0
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "episode-info",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "h4",
                                    children: [
                                        episode.episode_num,
                                        ". ",
                                        episode.title
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "rate",
                                    children: ratingCount !== 0 && rating()
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "dur",
                                    children: secondsToHms(episode.info.duration_secs)
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                    className: "text",
                    children: episode.info.plot?.substring(0, 100)
                })
            ]
        });
    };
    return seasons && episodes && selectedSeason && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        id: "episodes-container",
        onMouseMove: onMouseMove,
        style: {
            opacity: show ? 1 : 0,
            visibility: show ? "visible" : "hidden",
            bottom: show ? "0px" : "-1040px"
        },
        className: `episodes-container`,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("select", {
                onChange: handleSeason,
                children: seasons.map((season, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("option", {
                        value: index + 1,
                        selected: selectedSeason === index + 1,
                        children: [
                            "Season ",
                            index + 1
                        ]
                    }))
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "episodes",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_utils_scrollable__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                    children: episodes[selectedSeason].map((episode)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Episode, {
                            episode: episode
                        }))
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Cancel__WEBPACK_IMPORTED_MODULE_4___default()), {
                onClick: ()=>handleShowEpisode(),
                className: "cancel-icon",
                sx: {
                    color: "white"
                }
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Episodes);


/***/ }),

/***/ 7443:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8209);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _episodes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8807);
/* harmony import */ var _mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4173);
/* harmony import */ var _mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _firebase_functions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2313);
/* harmony import */ var _contexts_app__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2805);
/* harmony import */ var react_beforeunload__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1734);
/* harmony import */ var react_beforeunload__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_beforeunload__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _assets_backBtn_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5554);
/* harmony import */ var _assets_seekBack_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1401);
/* harmony import */ var _assets_playBtn_svg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(3794);
/* harmony import */ var _assets_pauseBtn_svg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(6018);
/* harmony import */ var _assets_seekForward_svg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(7837);
/* harmony import */ var _assets_episodes_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(4530);
/* harmony import */ var _assets_aspectRatio_svg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(2529);
/* harmony import */ var _assets_speed_svg__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(1067);
/* harmony import */ var _assets_nextEpisode_svg__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(47);
/* harmony import */ var _methods_concatUrl__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(1651);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(5666);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _assets_minimize_svg__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(2881);
/* harmony import */ var _assets_maximize_svg__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(2125);
























const Player = ({ src, type, onNext, episodes, selectedSeason, watchedEpisodes, series, timeline, close, playEpisode, currentPlaying, setCurrentPlaying, info, loginType, id, seasonChanged, fav })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_9__.useRouter)();
    const { user } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_contexts_app__WEBPACK_IMPORTED_MODULE_7__/* .AppContext */ .I);
    const [player, setPlayer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [speedOptionsShow, setSpeedOptionsShow] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [controlsActive, setControlsActive] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [playActive, setPlayActive] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const playerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const episodeOptionRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [showEpisodes, setShowEpisodes] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [videoLoaded, setVideoLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [progress, setProgress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [finalAddress, setFinalAddress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [videoPaused, setVideoPaused] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [videoFinished, setVideoFinished] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [videoStarted, setVideoStarted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [lastEpisode, setLastEpisode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [speed, setSpeed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const [fullscreen, setFullscreen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [fullscreenAvailable, setFullscreenAvailable] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [movieInfo, setMovieInfo] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [favourites, setFavourites] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [currentTime, setCurrentTime] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("00:00:00");
    const [durationTime, setDurationTime] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("00:00:00");
    const [isMuted, setIsMuted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const handleVolumeToggle = ()=>{
        if (player) {
            const newMute = !isMuted;
            setIsMuted(newMute);
            if (typeof player.mute === "function") {
                player.mute(newMute);
            } else if (typeof player.volume === "function") {
                player.volume(newMute ? 0 : 1);
            }
        }
    };
    const secondsToHMS = (seconds)=>{
        if (!seconds || isNaN(seconds)) return "00:00:00";
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor(seconds % 3600 / 60);
        var remainingSeconds = Math.floor(seconds % 60);
        var formattedHours = hours < 10 ? "0" + hours : hours;
        var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        var formattedSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
        return formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
    };
    const [intervalPassed, setIntervalPassed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    src = src.replace(/[\r\n]+/g, "").trim();
    if (!/\.[a-z0-9]+$/i.test(src)) {
        src += ".ts";
    }
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
        if (series) {
            const seasons = Object.keys(series.episodes).length;
            const lastSeasonEpisodes = series.episodes[seasons];
            const endEpisode = lastSeasonEpisodes[lastSeasonEpisodes.length - 1];
            setLastEpisode(endEpisode.id);
        }
    }, [
        series
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setTimeout(()=>{
            setIntervalPassed(true);
        }, 2000);
    }, []);
    const getFavs = async (address)=>{
        try {
            const response = await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .getFavourites */ .on)(type === "movies" ? "Movie" : "Series", address);
            const keys = response.val() ? Object.keys(response.val()) : [];
            setFavourites(keys);
        } catch (error) {
            console.log("ERROR", error);
        }
        ;
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (controlsActive) {
            if (!showEpisodes) {
                setTimeout(()=>{
                    setControlsActive(false);
                    setSpeedOptionsShow(false);
                }, 2000);
            }
        }
        ;
        if (playerRef.current && videoLoaded) {
            const nodes = playerRef.current.childNodes[0].childNodes[1].childNodes[1].childNodes;
            nodes.forEach((node)=>{
                if (node.className === "fp-controls") {
                    node.style.opacity = controlsActive ? 1 : 0;
                    node.style.visibility = controlsActive ? "visible" : "hidden";
                }
            });
        }
        ;
    }, [
        controlsActive,
        playerRef
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        let playerType;
        playerType = src.includes(".m3u") || src.includes(".m3u8") || src.includes(".ts") ? "application/x-mpegURL" : "video/mp4";
        setPlayer(window.flowplayer("#player-wrapper", {
            autoplay: true,
            ratio: "1:1",
            controls: false,
            muted: false,
            key: "webtvsecretggkey ngt8XJKe",
            clip: {
                sources: [
                    {
                        type: playerType,
                        src: src
                    }
                ]
            }
        }));
        const timer = setInterval(()=>{
            setProgress((prev)=>{
                if (prev === 95) {
                    return 95;
                } else {
                    return prev + 5;
                }
            });
        }, 500);
        return ()=>clearInterval(timer);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setFullscreenAvailable(document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (player) {
            // changeOrientation("lock")
            player.on("ready", ()=>{
                // window.alert("Data has been loaded")
                setVideoLoaded(true);
            });
            player.on("loadedmetadata", ()=>{
                window.alert("Video Loaded");
            });
            player.on("progress", ()=>{
                setVideoLoaded(true);
                if (!videoStarted) {
                    setVideoStarted(true);
                }
                if (player.video) {
                    setCurrentTime(secondsToHMS(player.video.time));
                    setDurationTime(secondsToHMS(player.video.duration));
                }
            });
            player.on("error", ()=>{
                setError(true);
            });
            player.on("seek", ()=>{
                console.log("player seek");
            });
            player.on("buffer", ()=>{
            // setVideoLoaded(false)
            });
            player.on("finish", ()=>{
                removeMovie();
            });
            player.on("pause", ()=>{
                setPlayActive(false);
                setControlsActive(true);
                setVideoPaused(true);
            });
            player.on("resume", ()=>{
                setPlayActive(true);
                setVideoPaused(false);
            });
        }
    }, [
        player
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (user) {
            const addr = user?.loginType === "m3u" ? user?.id : user?.dbAddress;
            setFinalAddress(addr);
            getFavs(addr);
        }
    }, [
        user
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (videoStarted) {
            if (timeline) {
                handleSeek.jump(timeline);
                setVideoLoaded(false);
            }
        }
    }, [
        videoStarted
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (info) {
            const movieDetails = {
                name: loginType === "one-stream-panel" ? info.vod.name : loginType === "player-api" ? info?.info?.name : info.name ? info.name : info.title,
                streamId: loginType === "one-stream-panel" ? info.vod.stream_id : loginType === "player-api" ? info.movie_data.stream_id : null
            };
            setMovieInfo(movieDetails);
        }
    }, [
        info
    ]);
    const handleSeek = {
        forward: ()=>player.seek(player.video.time + 10),
        back: ()=>player.seek(player.video.time - 10),
        jump: (time)=>player.seek(time),
        playPause: ()=>{
            setPlayActive(!playActive);
            if (playActive) {
                player.pause();
            } else {
                player.play();
            }
        }
    };
    const handleSpeed = (e)=>{
        const speed = Number(e);
        player.speed(speed);
        setSpeed(speed);
        setSpeedOptionsShow(false);
    };
    const handleControls = (e)=>{
        // if (videoLoaded) {
        //   const controls = playerRef.current.childNodes[0].childNodes[1].childNodes[1].childNodes[11];
        // if (controls) {
        //   controls.style.opacity = 1;
        //   controls.style.pointerEvents = "auto";
        //   setTimeout(() => {
        //     controls.style.opacity = 0;
        //     controls.style.pointerEvents = "none";
        //   }, 10000);
        // }
        // }
        setControlsActive(true);
    };
    const changeOrientation = (type)=>{
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            // Mobile device
            if (type === "lock") {
                document.documentElement.requestFullscreen();
                screen.orientation.lock("landscape");
            } else {
                document.documentElement.requestFullscreen();
                screen.orientation.lock("portrait");
            }
        }
    };
    const handleClick = (e)=>{
        const episodesContainer = document.getElementById("episodes-container");
        const episodeOption = episodeOptionRef.current;
        if (!episodesContainer?.contains(e.target) && !episodeOption?.contains(e.target)) {
            setShowEpisodes(false);
            setControlsActive(true);
        }
    };
    const handleNextEpisode = async ()=>{
        try {
            await saveTimeline();
            onNext();
        } catch (error) {
            onNext();
        }
        player.stop();
    };
    const removeMovie = async ()=>{
        // setVideoFinished(true);
        // changeOrientation("unlock")
        if (type === "series") {
            const seasons = Object.keys(series.episodes).length;
            const lastSeasonEpisodes = series.episodes[seasons];
            const endEpisode = lastSeasonEpisodes[lastSeasonEpisodes.length - 1];
            setLastEpisode();
            changeOrientation("unlock");
            if (String(endEpisode.id) !== String(currentPlaying.id)) {
                await saveTimeline();
                onNext();
            } else {
                try {
                    await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .removeMovieFromRecents */ .C3)(id, "Series", user.id, "remove");
                } catch (error) {
                    console.log(error);
                }
                handleClose();
            }
        } else if (type === "series-m3u") {
            try {
                await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .removeMovieFromRecents */ .C3)(id, "Series", finalAddress);
            } catch (error) {
                console.log(error);
            }
            handleClose();
        } else {
            try {
                await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .removeMovieFromRecents */ .C3)(id, "Movie", finalAddress);
            } catch (error) {
                console.log(error);
            }
            // changeOrientation("unlock")
            handleClose();
        }
    // saveTimeline();
    // handleClose()
    };
    const isLandscape = ()=>{
        return window.innerWidth > window.innerHeight;
    };
    const isPortrait = ()=>{
        return window.innerWidth < window.innerHeight;
    };
    const saveTimeline = async ()=>{
        const { time } = player.video;
        const duration = player.video.duration;
        if (time > 10) {
            if (type !== "m3u") {
                if (type === "series") {
                    try {
                        await _firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .saveWatchedContent */ .Gg.series(id, user.dbAddress, {
                            season: String(currentPlaying.season),
                            timeline: time,
                            thumbnail: series.info.cover,
                            episodeName: currentPlaying.title,
                            duration: duration,
                            lastWatched: "true"
                        }, currentPlaying.id);
                    } catch (error) {
                        console.log(error);
                    }
                } else if (type === "series-m3u") {
                    try {
                        await _firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .saveWatchedContent */ .Gg.series(id, user.id, {
                            season: "",
                            episode: "",
                            timeline: time,
                            thumbnail: "",
                            duration: duration
                        });
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    try {
                        return await _firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .saveWatchedContent */ .Gg.movie(user?.loginType === "m3u" ? (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_23__/* .concatUrl */ .C)(src) : String(id), user?.loginType === "m3u" ? user.id : user?.dbAddress, {
                            timeline: time,
                            thumbnail: info?.info?.movie_image ? info?.info?.movie_image : "",
                            duration: duration
                        });
                    } catch (error) {
                        console.log(error);
                    }
                    ;
                }
                ;
            }
        }
        ;
    };
    const handleBack = async ()=>{
        if (!player.ready) {
            player.engine.unload();
        }
        setError(false);
        if (!videoFinished) {
            saveTimeline();
        }
        if (fullscreen) {
            document.exitFullscreen();
        }
        handleClose();
    };
    const handleFullScreen = ()=>{
        if (fullscreen) {
            document.exitFullscreen();
        } else {
            // document.getElementById('player').requestFullscreen();
            if (document.documentElement.requestFullscreen) {
                // Most browsers
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                // Firefox (Gecko) 
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                // Safari (WebKit)
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                // IE/Edge
                document.documentElement.msRequestFullscreen();
            }
        }
    };
    const handleClose = ()=>{
        player.shutdown();
        close();
    };
    (0,react_beforeunload__WEBPACK_IMPORTED_MODULE_8__.useBeforeunload)((e)=>{
        if (player) {
            e.preventDefault();
            saveTimeline();
        }
        ;
    });
    const speedOptions = [
        1,
        2,
        3,
        4
    ];
    const onChangeFullscreen = ()=>{
        setFullscreen(document.fullscreenElement);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        document.addEventListener("fullscreenchange", onChangeFullscreen);
        return ()=>document.removeEventListener("fullscreenchange", onChangeFullscreen);
    }, []);
    const handleAddToFav = async ()=>{
        const fav = user?.loginType === "m3u" ? (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_23__/* .concatUrl */ .C)(src) : id;
        const isFavourite = favourites.filter((item)=>item === (user?.type === "m3u" ? (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_23__/* .concatUrl */ .C)(src) : id)).length > 0;
        try {
            if (isFavourite) {
                await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .removeFromFavs */ .h2)(user?.loginType === "m3u" ? (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_23__/* .concatUrl */ .C)(src) : id, type === "movies" ? "Movie" : "Series", user?.loginType === "m3u" ? user.id : user?.dbAddress);
                alert.toggle({
                    show: true,
                    title: "Removed from Favourites",
                    type: "success"
                });
            } else {
                await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .addToFavs */ .zg)(user?.loginType === "m3u" ? (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_23__/* .concatUrl */ .C)(src) : id, type === "movies" ? "Movie" : "Series", user?.loginType === "m3u" ? user.id : user?.dbAddress);
                alert.toggle({
                    show: true,
                    title: "Added to Favourites",
                    type: "success"
                });
            }
        } catch (error) {
            alert.toggle({
                show: true,
                title: "Something went wrong !",
                type: "error"
            });
        }
        ;
        getFavs(user?.loginType === "m3u" ? user.id : user?.dbAddress);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (player) {
            if (showEpisodes) {
                player.pause();
            } else {
                player.resume();
            }
        }
    }, [
        showEpisodes,
        player
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        id: "player",
        onClick: handleClick,
        onMouseMove: handleControls,
        onTouchStart: handleControls,
        className: "livePlayer video-player1 video-player-container",
        ref: playerRef,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: {
                    background: "black"
                },
                id: "player-wrapper"
            }),
            controlsActive && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_10___default()), {
                    onClick: handleBack,
                    className: "back-btn",
                    src: _assets_backBtn_svg__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z,
                    alt: "back-btn"
                })
            }),
            (user?.formatted === true || user?.loginType === "player-api") && controlsActive && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                onClick: handleAddToFav,
                className: "add-to-fav-icon",
                width: "40",
                height: "36",
                style: {
                    zIndex: 9999999,
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    background: "#0d1e23",
                    padding: "7px"
                },
                viewBox: "0 0 30 26",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    " ",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        d: "M29.2239 7.73189C29.2239 8.12625 29.2239 8.52061 29.2239 8.91467C29.2091 8.99632 29.1875 9.07738 29.181 9.15933C29.0718 10.5385 28.6337 11.8136 27.9606 13.0141C27.113 14.5265 25.9933 15.827 24.7685 17.0364C21.7994 19.9679 18.5333 22.5639 15.3951 25.3043C15.0229 25.6294 14.5771 25.6093 14.1904 25.2874C13.8659 25.0173 13.5469 24.7404 13.2289 24.4623C10.706 22.2574 8.16057 20.0782 5.67077 17.8369C4.12678 16.4471 2.71503 14.9182 1.69378 13.0851C-0.0217981 10.006 -0.113805 6.88017 1.61036 3.78242C2.56563 2.06565 4.04069 0.913648 5.94354 0.375217C7.9733 -0.19901 9.91905 0.00807828 11.7287 1.14352C12.8804 1.86626 13.7579 2.85732 14.4765 3.99927C14.5827 4.1679 14.6862 4.33801 14.7629 4.46167C15.3081 3.75845 15.7856 3.01796 16.3841 2.39344C18.4931 0.19357 21.056 -0.47858 23.9434 0.472844C26.661 1.36835 28.2366 3.37771 28.9393 6.10329C29.0762 6.63521 29.131 7.18843 29.2239 7.73189Z",
                        fill: favourites.filter((item)=>item === id).length > 0 ? "#FF0000" : "white"
                    }),
                    " "
                ]
            }),
            controlsActive ? type === "series" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                className: "current-playing-title",
                children: currentPlaying && currentPlaying.title
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                className: "current-playing-title",
                children: movieInfo?.name
            }) : null,
            type === "series" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_episodes__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                currentPlaying: currentPlaying,
                setCurrentPlaying: (epsd)=>{
                    setCurrentPlaying(epsd);
                },
                watchedEpisodes: watchedEpisodes,
                seriesId: id,
                seasonChanged: seasonChanged,
                series: series,
                player: player,
                playEpisode: async (data)=>{
                    saveTimeline().then(()=>{
                        playEpisode(data);
                    });
                },
                show: showEpisodes,
                handleShowEpisode: ()=>setShowEpisodes(false),
                episodes: episodes
            }),
            videoLoaded ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: `${controlsActive ? "bottom-options" : "bottom-options-notShow"}`,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "controls-left",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                onClick: handleSeek.playPause,
                                className: "option play-toggle-btn",
                                title: !playActive ? "Play" : "Pause",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_10___default()), {
                                    alt: "play/pause",
                                    src: !playActive ? _assets_playBtn_svg__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z : _assets_pauseBtn_svg__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                onClick: handleSeek.back,
                                className: "option seek-btn",
                                title: "Seek -10s",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_10___default()), {
                                    alt: "seek back",
                                    src: _assets_seekBack_svg__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                onClick: handleSeek.forward,
                                className: "option seek-btn",
                                title: "Seek +10s",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_10___default()), {
                                    alt: "seek forward",
                                    src: _assets_seekForward_svg__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .Z
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "time-display",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    children: [
                                        currentTime,
                                        " / ",
                                        durationTime
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "controls-right",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                onClick: handleVolumeToggle,
                                className: "option volume-btn",
                                title: isMuted ? "Unmute" : "Mute",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                        width: "20",
                                        height: "20",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        children: isMuted ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("polygon", {
                                                    points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("line", {
                                                    x1: "23",
                                                    y1: "9",
                                                    x2: "17",
                                                    y2: "15"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("line", {
                                                    x1: "17",
                                                    y1: "9",
                                                    x2: "23",
                                                    y2: "15"
                                                })
                                            ]
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("polygon", {
                                                    points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                    d: "M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
                                                })
                                            ]
                                        })
                                    }),
                                    !isPortrait() && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: isMuted ? "Muted" : "Audio"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "option",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        onClick: ()=>setSpeedOptionsShow(!speedOptionsShow),
                                        className: "sub-option",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_10___default()), {
                                                alt: "speed",
                                                src: _assets_speed_svg__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .Z
                                            }),
                                            !isPortrait() && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                children: [
                                                    "Speed ",
                                                    `(${speed}x)`
                                                ]
                                            })
                                        ]
                                    }),
                                    speedOptionsShow && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "speed-menu",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "dropdown-container",
                                            children: speedOptions.map((option)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                    className: speed === option ? "current-selected" : "",
                                                    onClick: ()=>handleSpeed(option),
                                                    children: [
                                                        option,
                                                        "x"
                                                    ]
                                                }, option))
                                        })
                                    })
                                ]
                            }),
                            type === "series" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                ref: episodeOptionRef,
                                onClick: ()=>{
                                    setShowEpisodes(!showEpisodes);
                                },
                                className: "option",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_10___default()), {
                                        alt: "episodes",
                                        src: _assets_episodes_svg__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .Z
                                    }),
                                    !isPortrait() && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: "Episodes"
                                    })
                                ]
                            }),
                            type === "series" && lastEpisode !== currentPlaying?.id && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                onClick: handleNextEpisode,
                                className: "option",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_10___default()), {
                                        alt: "next episode",
                                        src: _assets_nextEpisode_svg__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .Z
                                    }),
                                    !isPortrait() && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: "Next"
                                    })
                                ]
                            }),
                            fullscreenAvailable && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                onClick: handleFullScreen,
                                className: "option",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_10___default()), {
                                        alt: "fullscreen",
                                        src: fullscreen ? _assets_minimize_svg__WEBPACK_IMPORTED_MODULE_21__/* ["default"] */ .Z : _assets_maximize_svg__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .Z
                                    }),
                                    !isPortrait() && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: fullscreen ? "Minimize" : "Fullscreen"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "progress-loader-container",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "sexySpinner",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "sexySpinnerRing ring1"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "sexySpinnerRing ring2"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "sexySpinnerDot"
                        })
                    ]
                })
            }),
            error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "invalid-user-popupp",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_5___default()), {
                        className: "cross-icon",
                        color: "error"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "invalid-title",
                        children: "Sorry, this video can not be played, Try again later"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: handleBack,
                        className: "ok-btn",
                        children: "OK"
                    })
                ]
            }),
            "/"
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);


/***/ }),

/***/ 7140:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3018);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _episodes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8807);
/* harmony import */ var _mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4173);
/* harmony import */ var _mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _firebase_functions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2313);
/* harmony import */ var _contexts_app__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2805);
/* harmony import */ var react_beforeunload__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1734);
/* harmony import */ var react_beforeunload__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_beforeunload__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _assets_backBtn_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5554);
/* harmony import */ var _assets_seekBack_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1401);
/* harmony import */ var _assets_playBtn_svg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(3794);
/* harmony import */ var _assets_pauseBtn_svg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(6018);
/* harmony import */ var _assets_seekForward_svg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(7837);
/* harmony import */ var _assets_episodes_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(4530);
/* harmony import */ var _assets_aspectRatio_svg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(2529);
/* harmony import */ var _assets_speed_svg__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(1067);
/* harmony import */ var _assets_nextEpisode_svg__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(47);
/* harmony import */ var _methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(1651);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(5666);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _pages_dashboard_live_player_videojs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(7250);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(5335);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _assets_minimize_svg__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(2881);
/* harmony import */ var _assets_maximize_svg__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(2125);


























const Player = ({ src, type, onNext, episodes, selectedSeason, watchedEpisodes, series, timeline, close, playEpisode, currentPlaying, setCurrentPlaying, info, loginType, id, seasonChanged, fav })=>{
    src = src.replace(/[\r\n]+/g, "").trim();
    if (!/\.[a-z0-9]+$/i.test(src)) {
        src += ".ts";
    }
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_9__.useRouter)();
    const [player, setPlayer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [speedOptionsShow, setSpeedOptionsShow] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [controlsActive, setControlsActive] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [playActive, setPlayActive] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const playerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const episodeOptionRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [showEpisodes, setShowEpisodes] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [videoLoaded, setVideoLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [progress, setProgress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [videoPaused, setVideoPaused] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [videoFinished, setVideoFinished] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [videoStarted, setVideoStarted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [lastEpisode, setLastEpisode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [speed, setSpeed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const [fullscreen, setFullscreen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [fullscreenAvailable, setFullscreenAvailable] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [movieInfo, setMovieInfo] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [favourites, setFavourites] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    // const [episodes, setEpisodes] = useState([]);
    const { user, alert } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_contexts_app__WEBPACK_IMPORTED_MODULE_7__/* .AppContext */ .I);
    const [intervalPassed, setIntervalPassed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [currentTime, setCurrentTime] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("00:00");
    const [durationTime, setDurationTime] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("00:00");
    const [finalAddress, setFinalAddress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [isMuted, setIsMuted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const handleVolumeToggle = ()=>{
        if (player) {
            const newMute = !isMuted;
            setIsMuted(newMute);
            if (typeof player.muted === "function") {
                player.muted(newMute);
            } else if (typeof player.volume === "function") {
                player.volume(newMute ? 0 : 1);
            }
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (series) {
            const seasons = Object.keys(series.episodes).length;
            const lastSeasonEpisodes = series.episodes[seasons];
            const endEpisode = lastSeasonEpisodes[lastSeasonEpisodes.length - 1];
            setLastEpisode(endEpisode.id);
        }
    }, [
        series
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (user) {
            setFinalAddress(user.id);
            getFavs(user.id);
        }
    }, [
        user
    ]);
    const getFavs = async (address)=>{
        try {
            const response = await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .getFavourites */ .on)(type === "movies" ? "Movie" : "Series", address);
            const keys = response.val() ? Object.keys(response.val()) : [];
            setFavourites(keys);
        } catch (error) {
            console.log("ERROR", error);
        }
        ;
    };
    // useEffect(() => {
    //     if (controlsActive) {
    //         if (!showEpisodes) {
    //             setTimeout(() => {
    //                 setControlsActive(false);
    //                 setSpeedOptionsShow(false)
    //             }, 10000);
    //         }
    //     };
    //     if (playerRef.current && videoLoaded) {
    //         const nodes = playerRef.current.childNodes[0].childNodes[1].childNodes[1].childNodes;
    //         nodes.forEach(node => {
    //             if (node.className === "fp-controls") {
    //                 node.style.opacity = controlsActive ? 1 : 0;
    //                 node.style.visibility = controlsActive ? "visible" : "hidden";
    //             }
    //         })
    //     };
    // }, [controlsActive, playerRef])
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const timer = setInterval(()=>{
            setProgress((prev)=>{
                if (prev === 95) {
                    return 95;
                } else {
                    return prev + 5;
                }
            });
        }, 500);
        return ()=>clearInterval(timer);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setFullscreenAvailable(document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (user) {
            getFavs(user.id);
        }
    }, [
        user
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (player && timeline) {
            player.currentTime(timeline);
            setVideoLoaded(false);
        }
    }, [
        player,
        timeline
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (info) {
            const movieDetails = {
                name: loginType === "one-stream-panel" ? info.vod.name : loginType === "player-api" ? info?.info?.name : info.name ? info.name : info.title,
                streamId: loginType === "one-stream-panel" ? info.vod.stream_id : loginType === "player-api" ? info.movie_data.stream_id : null
            };
            setMovieInfo(movieDetails);
        }
    }, [
        info
    ]);
    const handleSeek = {
        forward: ()=>player.currentTime(player.currentTime() + 10),
        back: ()=>player.currentTime(player.currentTime() - 10),
        jump: (time)=>player.currentTime(time),
        playPause: ()=>{
            setPlayActive(!playActive);
            if (playActive) {
                player.pause();
            } else {
                player.play();
            }
        }
    };
    const handleSpeed = (e)=>{
        const speed = Number(e);
        player.playbackRate(speed);
        setSpeed(speed);
        setSpeedOptionsShow(false);
    };
    const handleControls = (e)=>{
        // if (videoLoaded) {
        //   const controls = playerRef.current.childNodes[0].childNodes[1].childNodes[1].childNodes[11];
        // if (controls) {
        //   controls.style.opacity = 1;
        //   controls.style.pointerEvents = "auto";
        //   setTimeout(() => {
        //     controls.style.opacity = 0;
        //     controls.style.pointerEvents = "none";
        //   }, 10000);
        // }
        // }
        setControlsActive(true);
    };
    const changeOrientation = (type)=>{
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            // Mobile device
            if (type === "lock") {
                document.documentElement.requestFullscreen();
                screen.orientation.lock("landscape");
            } else {
                document.documentElement.requestFullscreen();
                screen.orientation.lock("portrait");
            }
        }
    };
    const handleClick = (e)=>{
        const episodesContainer = document.getElementById("episodes-container");
        const episodeOption = episodeOptionRef.current;
        if (!episodesContainer?.contains(e.target) && !episodeOption?.contains(e.target)) {
            setShowEpisodes(false);
            setControlsActive(true);
        }
    };
    const handleNextEpisode = async ()=>{
        try {
            await saveTimeline();
            onNext();
        } catch (error) {
            onNext();
        }
        player.dispose();
    };
    const removeMovie = async (duration)=>{
        // setVideoFinished(true);
        // changeOrientation("unlock")
        if (type === "series") {
            const seasons = Object.keys(series.episodes).length;
            const lastSeasonEpisodes = series.episodes[seasons];
            const endEpisode = lastSeasonEpisodes[lastSeasonEpisodes.length - 1];
            setLastEpisode();
            changeOrientation("unlock");
            if (String(endEpisode.id) !== String(currentPlaying.id)) {
                await saveTimeline("ended", duration);
                onNext();
            } else {
                try {
                    await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .removeMovieFromRecents */ .C3)(id, "Series", user.id);
                } catch (error) {
                    console.log(error);
                }
                handleClose();
            }
        } else if (type === "series-m3u") {
            try {
                await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .removeMovieFromRecents */ .C3)(id, "Series", user.id, "remove");
            } catch (error) {
                console.log(error);
            }
            handleClose();
        } else {
            try {
                await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .removeMovieFromRecents */ .C3)(id, "Movie", user.id);
            } catch (error) {
                console.log(error);
            }
            // changeOrientation("unlock")
            close();
        }
    // saveTimeline();
    // handleClose()
    };
    const isLandscape = ()=>{
        return window.innerWidth > window.innerHeight;
    };
    const isPortrait = ()=>{
        return window.innerWidth < window.innerHeight;
    };
    const saveTimeline = async (ended, playerDuration)=>{
        const duration = ended ? playerDuration : player.duration();
        const time = ended ? playerDuration : player.currentTime();
        const { loginType } = user;
        if (time > 10) {
            if (type !== "m3u") {
                if (type === "series") {
                    try {
                        return await _firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .saveWatchedContent */ .Gg.series(id, user.dbAddress, {
                            season: String(currentPlaying.season),
                            timeline: time,
                            thumbnail: series.info.cover,
                            episodeName: currentPlaying.title,
                            duration: duration,
                            lastWatched: "true"
                        }, currentPlaying.id);
                    } catch (error) {
                        console.log(error);
                    }
                } else if (type === "series-m3u") {
                    try {
                        return await _firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .saveWatchedContent */ .Gg.series(id, user.id, {
                            season: "",
                            episode: "",
                            timeline: time,
                            thumbnail: "",
                            duration: duration
                        });
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    try {
                        return await _firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .saveWatchedContent */ .Gg.movie(user?.loginType === "m3u" ? (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(src) : String(id), user?.loginType === "m3u" ? user.id : user?.dbAddress, {
                            timeline: time,
                            thumbnail: info?.info?.movie_image ? info?.info?.movie_image : "",
                            duration: duration
                        });
                    } catch (error) {
                        console.log(error);
                    }
                    ;
                }
                ;
            }
        }
        ;
    };
    const handleBack = async ()=>{
        // changeOrientation("unlock")
        setError(false);
        if (!videoFinished) {
            await saveTimeline();
        }
        if (fullscreen) {
            document.exitFullscreen();
        }
        handleClose();
    };
    const handleFullScreen = ()=>{
        if (fullscreen) {
            document.exitFullscreen();
        } else {
            // document.getElementById('player').requestFullscreen();
            if (document.documentElement.requestFullscreen) {
                // Most browsers
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                // Firefox (Gecko) 
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                // Safari (WebKit)
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                // IE/Edge
                document.documentElement.msRequestFullscreen();
            }
        }
    };
    const handleClose = ()=>{
        if (player) {
            player.dispose();
        }
        close();
    };
    (0,react_beforeunload__WEBPACK_IMPORTED_MODULE_8__.useBeforeunload)((e)=>{
        if (player) {
            e.preventDefault();
            saveTimeline();
        }
        ;
    });
    const speedOptions = [
        1,
        2,
        3,
        4
    ];
    const onChangeFullscreen = ()=>{
        setFullscreen(document.fullscreenElement);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (player) {
            if (showEpisodes) {
                player.pause();
            } else {
                player.play();
            }
        }
    }, [
        showEpisodes,
        player
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        document.addEventListener("fullscreenchange", onChangeFullscreen);
        return ()=>document.removeEventListener("fullscreenchange", onChangeFullscreen);
    }, []);
    const handleAddToFav = async ()=>{
        const fav = user?.loginType === "m3u" ? (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(src) : id;
        const isFavourite = favourites.filter((item)=>item === (user?.type === "m3u" ? (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(src) : id)).length > 0;
        try {
            if (isFavourite) {
                await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .removeFromFavs */ .h2)(user?.loginType === "m3u" ? (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(src) : id, type === "movies" ? "Movie" : "Series", user?.loginType === "m3u" ? user.id : user?.dbAddress);
                alert.toggle({
                    show: true,
                    title: "Removed from Favourites",
                    type: "success"
                });
            } else {
                await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .addToFavs */ .zg)(user?.loginType === "m3u" ? (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(src) : id, type === "movies" ? "Movie" : "Series", user?.loginType === "m3u" ? user.id : user?.dbAddress);
                alert.toggle({
                    show: true,
                    title: "Added to Favourites",
                    type: "success"
                });
            }
        } catch (error) {
            alert.toggle({
                show: true,
                title: "Something went wrong !",
                type: "error"
            });
        }
        ;
        getFavs(user?.loginType === "m3u" ? user.id : user?.dbAddress);
    };
    const handlePlayerReady = (player)=>{
        playerRef.current = player;
        // You can handle player events here, for example:
        setPlayer(player);
        player.on("waiting", ()=>{
            video_js__WEBPACK_IMPORTED_MODULE_22___default().log("player is waiting");
        });
        player.on("dispose", ()=>{
            video_js__WEBPACK_IMPORTED_MODULE_22___default().log("player will dispose");
        });
        player.on("playing", ()=>{
            setPlayActive(true);
            // setPlayerReady(true);
            setError(false);
            setDurationTime(secondsToHMS(player.duration()));
        });
        player.on("error", ()=>{
            setError(true);
            setControlsActive(true);
        });
        player.on("play", ()=>{
            setVideoLoaded(true);
            setPlayActive(true);
            setTimeout(()=>{
                setIntervalPassed(true);
            }, 10000);
        });
        player.on("timeupdate", ()=>{
            setCurrentTime(secondsToHMS(player.currentTime() || 0));
            if (player.duration()) {
                setDurationTime(secondsToHMS(player.duration()));
            }
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
        player.on("ended", function(e) {
            removeMovie(this.duration());
        });
    };
    const secondsToHMS = (seconds)=>{
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor(seconds % 3600 / 60);
        var remainingSeconds = Math.floor(seconds % 60);
        var formattedHours = hours < 10 ? "0" + hours : hours;
        var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        var formattedSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
        return formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
    };
    let playerType;
    playerType = src.includes(".m3u") || src.includes(".m3u8") || src.includes(".ts") ? "application/x-mpegURL" : "video/mp4";
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        onClick: handleClick,
        // onMouseMove={handleControls}
        // onTouchStart={handleControls}
        className: "video-player-container",
        ref: playerRef,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_pages_dashboard_live_player_videojs__WEBPACK_IMPORTED_MODULE_21__["default"], {
                onReady: handlePlayerReady,
                options: {
                    autoplay: true,
                    controls: true,
                    responsive: true,
                    fluid: true,
                    // 'html5': {
                    //     nativeTextTracks: false
                    // },
                    // 'tracks': [
                    //     {
                    //         kind: 'captions',
                    //         label: 'user defined',
                    //         src: "https://www.tutorialspoint.com/videos/captions.vtt"
                    //     },
                    // ],
                    sources: [
                        {
                            src,
                            type: playerType
                        }
                    ]
                }
            }),
            controlsActive && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_10___default()), {
                onClick: handleBack,
                className: "back-btn",
                src: _assets_backBtn_svg__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z,
                alt: "back-btn"
            }),
            (user?.formatted === true || user?.loginType === "player-api") && controlsActive && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                onClick: handleAddToFav,
                className: "add-to-fav-icon",
                width: "40",
                height: "36",
                style: {
                    zIndex: 9999999,
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    background: "#0d1e23",
                    padding: "7px"
                },
                viewBox: "0 0 30 26",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    " ",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        d: "M29.2239 7.73189C29.2239 8.12625 29.2239 8.52061 29.2239 8.91467C29.2091 8.99632 29.1875 9.07738 29.181 9.15933C29.0718 10.5385 28.6337 11.8136 27.9606 13.0141C27.113 14.5265 25.9933 15.827 24.7685 17.0364C21.7994 19.9679 18.5333 22.5639 15.3951 25.3043C15.0229 25.6294 14.5771 25.6093 14.1904 25.2874C13.8659 25.0173 13.5469 24.7404 13.2289 24.4623C10.706 22.2574 8.16057 20.0782 5.67077 17.8369C4.12678 16.4471 2.71503 14.9182 1.69378 13.0851C-0.0217981 10.006 -0.113805 6.88017 1.61036 3.78242C2.56563 2.06565 4.04069 0.913648 5.94354 0.375217C7.9733 -0.19901 9.91905 0.00807828 11.7287 1.14352C12.8804 1.86626 13.7579 2.85732 14.4765 3.99927C14.5827 4.1679 14.6862 4.33801 14.7629 4.46167C15.3081 3.75845 15.7856 3.01796 16.3841 2.39344C18.4931 0.19357 21.056 -0.47858 23.9434 0.472844C26.661 1.36835 28.2366 3.37771 28.9393 6.10329C29.0762 6.63521 29.131 7.18843 29.2239 7.73189Z",
                        fill: favourites.filter((item)=>item === (user?.type === "m3u" ? (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(src) : id)).length > 0 ? "#FF0000" : "white"
                    }),
                    " "
                ]
            }),
            controlsActive ? type === "series" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                className: "current-playing-title",
                children: currentPlaying && currentPlaying.title
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                className: "current-playing-title",
                children: movieInfo?.name
            }) : null,
            type === "series" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_episodes__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                currentPlaying: currentPlaying,
                setCurrentPlaying: (epsd)=>{
                    setCurrentPlaying(epsd);
                },
                watchedEpisodes: watchedEpisodes,
                seriesId: id,
                seasonChanged: seasonChanged,
                series: series,
                player: player,
                playEpisode: async (data)=>{
                    saveTimeline().then(()=>{
                        playEpisode(data);
                    }).catch(()=>{
                        playEpisode(data);
                    });
                },
                show: showEpisodes,
                handleShowEpisode: ()=>setShowEpisodes(false),
                episodes: episodes
            }),
            videoLoaded ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: `${controlsActive ? "bottom-options" : "bottom-options-notShow"}`,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "controls-left",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                onClick: handleSeek.playPause,
                                className: "option play-toggle-btn",
                                title: !playActive ? "Play" : "Pause",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_10___default()), {
                                    alt: "play/pause",
                                    src: !playActive ? _assets_playBtn_svg__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z : _assets_pauseBtn_svg__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                onClick: handleSeek.back,
                                className: "option seek-btn",
                                title: "Seek -10s",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_10___default()), {
                                    alt: "seek back",
                                    src: _assets_seekBack_svg__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                onClick: handleSeek.forward,
                                className: "option seek-btn",
                                title: "Seek +10s",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_10___default()), {
                                    alt: "seek forward",
                                    src: _assets_seekForward_svg__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .Z
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "time-display",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    children: [
                                        currentTime,
                                        " / ",
                                        durationTime
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "controls-right",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                onClick: handleVolumeToggle,
                                className: "option volume-btn",
                                title: isMuted ? "Unmute" : "Mute",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                        width: "20",
                                        height: "20",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        children: isMuted ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("polygon", {
                                                    points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("line", {
                                                    x1: "23",
                                                    y1: "9",
                                                    x2: "17",
                                                    y2: "15"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("line", {
                                                    x1: "17",
                                                    y1: "9",
                                                    x2: "23",
                                                    y2: "15"
                                                })
                                            ]
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("polygon", {
                                                    points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                    d: "M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
                                                })
                                            ]
                                        })
                                    }),
                                    !isPortrait() && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: isMuted ? "Muted" : "Audio"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "option",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        onClick: ()=>setSpeedOptionsShow(!speedOptionsShow),
                                        className: "sub-option",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_10___default()), {
                                                alt: "speed",
                                                src: _assets_speed_svg__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .Z
                                            }),
                                            !isPortrait() && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                children: [
                                                    "Speed ",
                                                    `(${speed}x)`
                                                ]
                                            })
                                        ]
                                    }),
                                    speedOptionsShow && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "speed-menu",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "dropdown-container",
                                            children: speedOptions.map((option)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                    className: speed === option ? "current-selected" : "",
                                                    onClick: ()=>handleSpeed(option),
                                                    children: [
                                                        option,
                                                        "x"
                                                    ]
                                                }, option))
                                        })
                                    })
                                ]
                            }),
                            type === "series" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                ref: episodeOptionRef,
                                onClick: ()=>setShowEpisodes(!showEpisodes),
                                className: "option",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_10___default()), {
                                        alt: "episodes",
                                        src: _assets_episodes_svg__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .Z
                                    }),
                                    !isPortrait() && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: "Episodes"
                                    })
                                ]
                            }),
                            type === "series" && lastEpisode !== currentPlaying?.id && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                onClick: handleNextEpisode,
                                className: "option",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_10___default()), {
                                        alt: "next episode",
                                        src: _assets_nextEpisode_svg__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .Z
                                    }),
                                    !isPortrait() && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: "Next"
                                    })
                                ]
                            }),
                            fullscreenAvailable && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                onClick: handleFullScreen,
                                className: "option",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_10___default()), {
                                        alt: "fullscreen",
                                        src: fullscreen ? _assets_minimize_svg__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .Z : _assets_maximize_svg__WEBPACK_IMPORTED_MODULE_24__/* ["default"] */ .Z
                                    }),
                                    !isPortrait() && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: fullscreen ? "Minimize" : "Fullscreen"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "progress-loader-container",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "sexySpinner",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "sexySpinnerRing ring1"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "sexySpinnerRing ring2"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "sexySpinnerDot"
                        })
                    ]
                })
            }),
            error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "invalid-user-popupp",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_5___default()), {
                        className: "cross-icon",
                        color: "error"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "invalid-title",
                        children: "Sorry, this video can not be played, Try again later"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: handleBack,
                        className: "ok-btn",
                        children: "OK"
                    })
                ]
            }),
            "/"
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);


/***/ }),

/***/ 9328:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3815);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_2__);



const Watched = ({ progress })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        style: {
            width: progress > 100 ? "100%" : progress < 0 ? 0 : `${progress}%`
        },
        className: "watched-prog"
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Watched);


/***/ }),

/***/ 1304:
/***/ (() => {



/***/ }),

/***/ 8209:
/***/ (() => {



/***/ }),

/***/ 3018:
/***/ (() => {



/***/ }),

/***/ 3815:
/***/ (() => {



/***/ })

};
;