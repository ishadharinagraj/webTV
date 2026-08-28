exports.id = 6819;
exports.ids = [6819];
exports.modules = {

/***/ 614:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/noContentFound.c65af0a3.svg","height":512,"width":512,"blurWidth":0,"blurHeight":0});

/***/ }),

/***/ 6819:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _contexts_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_virtualized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6325);
/* harmony import */ var react_virtualized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_virtualized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1536);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5666);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var iptv_playlist_parser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7775);
/* harmony import */ var iptv_playlist_parser__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(iptv_playlist_parser__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _utils_scrollable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(707);
/* harmony import */ var _firebase_functions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(2313);
/* harmony import */ var _utils_loading__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9637);
/* harmony import */ var _methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(1651);
/* harmony import */ var _utils_progress__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(9328);
/* harmony import */ var _utils_local__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(5976);
/* harmony import */ var _utils_parentalLock__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(4066);
/* harmony import */ var _assets_noContentFound_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(614);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(4265);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _utils_player_videojs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(7140);
/* harmony import */ var _mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(4173);
/* harmony import */ var _mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _utils_indexDb_indexedDB__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(1090);
/* harmony import */ var _utils_player__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(7443);
/* harmony import */ var _mui_icons_material_Cancel__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(3733);
/* harmony import */ var _mui_icons_material_Cancel__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Cancel__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _mui_icons_material_Info__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(8792);
/* harmony import */ var _mui_icons_material_Info__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Info__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(6952);
/* harmony import */ var _mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_23__);



























const M3uList = ({ currentAction })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_7__.useRouter)();
    const { query } = router;
    const { view } = query;
    const { m3uStreams, m3uUrl, parentalVerified, scrolled, m3u, isPlayerOpen, currentPlayer, theme, user, alert } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(_contexts_app__WEBPACK_IMPORTED_MODULE_1__/* .AppContext */ .I);
    const refs = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)([]);
    const listImagesRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)([]);
    let mouseDown = false;
    let startX, scrollLeft;
    const path = currentAction === "movies" ? "Movie" : "Series";
    const [movieCategories, setMovieCategories] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const [seriesCategories, setSeriesCategories] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const [liveCategories, setLiveCategories] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const [FavouriteMovies, setFavouriteMovies] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const [favouriteSeries, setFavouriteSeries] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const [recents, setRecents] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const [recentSeries, setRecentSeries] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const [windowSize, setWindowSize] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({
        width: 0,
        height: 0
    });
    const [noData, setNodata] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const columnCount = 2;
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [m3uLoading, setM3uLoading] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [showParentalLock, setShowParentalLock] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [clickedAdultItem, setClickedAdultItem] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const [seriesDifference, setSeriesDifference] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(0);
    const [moviesDifference, setMoviesDifference] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(0);
    const { movies, series, live } = m3uStreams.streams;
    const currentSelected = currentAction === "movies" ? movies : series;
    const [isPlayerOPen, setIsPlayerOpen] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [M3uData, setM3uData] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const gridRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)();
    const [url, setUrl] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const [searchTerm, setSearchTerm] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)("");
    const [filteredData, setFilteredData] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const [isFormatted, setIsFormatted] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)();
    const [currentRecentItem, setCurrentRecentItem] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const parentalPin = (0,_utils_local__WEBPACK_IMPORTED_MODULE_24__/* .getParentalPin */ .A)("currentUser");
    const adultArray = [
        "adult",
        "xxx",
        "porn",
        "sex",
        "adults",
        "ADULTS",
        "+18",
        "18+",
        "18"
    ];
    let currentSelectedId;
    const infoHandler = (movie)=>{
        const encryptedName = encodeURIComponent(crypto_js__WEBPACK_IMPORTED_MODULE_8__.AES.encrypt(movie?.info?.name, "thisismovie").toString());
        router.push({
            pathname: `/dashboard/preview/${currentAction}/m3u/${encryptedName}`,
            query: {
                id: getStreamIdFromUrl(movie?.info?.url),
                stream: crypto_js__WEBPACK_IMPORTED_MODULE_8__.AES.encrypt(movie?.info?.url, "thisisurl").toString(),
                name: movie?.info?.url
            }
        }, `/dashboard/preview/${currentAction}/m3u/${encryptedName}`);
    };
    const getM3uStreams = async ()=>{
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_10___default().get(m3uUrl.url);
            const parsedData = (0,iptv_playlist_parser__WEBPACK_IMPORTED_MODULE_9__.parse)(response.data);
            m3u.toggle(parsedData?.items);
            setM3uData(parsedData?.items);
        } catch (error) {
            console.log("ERROR", error);
        }
    };
    const clearHandler = ()=>{
        setSearchTerm("");
        setFilteredData([]);
        setNodata(false);
    };
    const getFavs = async (values)=>{
        setFavouriteMovies(null);
        setFavouriteSeries(null);
        try {
            const response = await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_12__/* .getFavourites */ .on)(path, user?.id);
            const ids = response.val() && Object.keys(response.val());
            if (ids) {
                let favs = [];
                ids.map((id)=>{
                    const itemExists = currentSelected.filter((movie)=>String((0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(movie.url)) === String(id));
                    if (itemExists.length > 0) {
                        const item = {
                            id: getStreamIdFromUrl(itemExists[0].url),
                            logo: itemExists[0].tvg.logo,
                            name: itemExists[0].tvg.name,
                            url: itemExists[0].url,
                            info: itemExists[0]
                        };
                        favs.push(item);
                    }
                });
                if (currentAction === "movies") {
                    setFavouriteMovies(favs);
                } else {
                    setFavouriteSeries(favs);
                }
            } else {
                setFavouriteMovies(null);
                setFavouriteSeries(null);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getRecent = async ()=>{
        setRecents([]);
        setRecentSeries([]);
        try {
            const response = await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_12__/* .getRecents */ .B4)(path, user?.id);
            const res = response.val();
            if (!res) {
                setRecents([]);
                return;
            }
            const ids = Object.keys(res);
            const data = Object.values(res);
            ids.forEach((id, index)=>{
                const item = data[index];
                if (item?.episode) {
                    const info = currentSelected?.find((movie)=>String((0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(movie.url)) === String(id));
                    setRecentSeries((prev)=>{
                        const updated = prev.filter((item)=>item?.id !== id);
                        return [
                            ...updated,
                            {
                                id,
                                ...item,
                                info
                            }
                        ];
                    });
                    return;
                }
                const info = currentSelected?.find((movie)=>String((0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(movie.url)) === String(id));
                setRecents((prev)=>{
                    const updated = prev.filter((item)=>item.id !== id);
                    return [
                        ...updated,
                        {
                            id,
                            ...item,
                            info
                        }
                    ];
                });
            });
        } catch (error) {
            console.log(error);
        }
    };
    const getStreamIdFromUrl = (url)=>{
        const regex = /([a-zA-Z0-9]{6})(?=\.(?:mkv|mp4)$)/i;
        const match = url.match(regex);
        return match ? match[1] : null;
    };
    const FavsCategory = ({ favMovies, style })=>{
        const handleItem = (isAdult, movie)=>{
            const encryptedName = encodeURIComponent(crypto_js__WEBPACK_IMPORTED_MODULE_8__.AES.encrypt(movie.name, "thisismovie").toString());
            if (parentalPin) {
                if (isAdult) {
                    setClickedAdultItem(movie.info);
                    setShowParentalLock(true);
                } else {
                    setShowParentalLock(false);
                    router.push({
                        pathname: `/dashboard/preview/${currentAction}/m3u/${encryptedName}`,
                        query: {
                            id: getStreamIdFromUrl(movie.url),
                            stream: crypto_js__WEBPACK_IMPORTED_MODULE_8__.AES.encrypt(movie.url, "thisisurl").toString()
                        }
                    });
                }
            } else {
                router.push({
                    pathname: `/dashboard/preview/${currentAction}/m3u/${encryptedName}`,
                    query: {
                        id: getStreamIdFromUrl(movie.url),
                        stream: crypto_js__WEBPACK_IMPORTED_MODULE_8__.AES.encrypt(movie.url, "thisisurl").toString()
                    }
                });
            }
        };
        return favMovies && favMovies.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
            style: style,
            className: "category",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    style: {
                        marginTop: 20
                    },
                    className: "h3",
                    children: "Favourites"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_utils_scrollable__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                    children: favMovies?.map((movie, index)=>{
                        const added = currentAction === "movies" ? movie.added : movie.last_modified;
                        const isAdult = adultArray.filter((item)=>movie.info.group.title.toLowerCase().includes(item.toLowerCase())).length > 0;
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            onClick: ()=>handleItem(isAdult, movie),
                            style: {
                                marginTop: 10,
                                marginBottom: 10,
                                width: 165,
                                borderRadius: 5
                            },
                            className: "item",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "caption",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "control",
                                            children: [
                                                Number(movie.rating).toFixed(1) !== "NaN" && Number(movie.rating) !== 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "count",
                                                    children: Number(movie.rating).toFixed(1)
                                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {}),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                    href: "#",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                                        width: "30",
                                                        height: "26",
                                                        viewBox: "0 0 30 26",
                                                        fill: "none",
                                                        xmlns: "http://www.w3.org/2000/svg",
                                                        children: [
                                                            " ",
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                                d: "M29.2239 7.73189C29.2239 8.12625 29.2239 8.52061 29.2239 8.91467C29.2091 8.99632 29.1875 9.07738 29.181 9.15933C29.0718 10.5385 28.6337 11.8136 27.9606 13.0141C27.113 14.5265 25.9933 15.827 24.7685 17.0364C21.7994 19.9679 18.5333 22.5639 15.3951 25.3043C15.0229 25.6294 14.5771 25.6093 14.1904 25.2874C13.8659 25.0173 13.5469 24.7404 13.2289 24.4623C10.706 22.2574 8.16057 20.0782 5.67077 17.8369C4.12678 16.4471 2.71503 14.9182 1.69378 13.0851C-0.0217981 10.006 -0.113805 6.88017 1.61036 3.78242C2.56563 2.06565 4.04069 0.913648 5.94354 0.375217C7.9733 -0.19901 9.91905 0.00807828 11.7287 1.14352C12.8804 1.86626 13.7579 2.85732 14.4765 3.99927C14.5827 4.1679 14.6862 4.33801 14.7629 4.46167C15.3081 3.75845 15.7856 3.01796 16.3841 2.39344C18.4931 0.19357 21.056 -0.47858 23.9434 0.472844C26.661 1.36835 28.2366 3.37771 28.9393 6.10329C29.0762 6.63521 29.131 7.18843 29.2239 7.73189Z",
                                                                fill: "#FF0000"
                                                            }),
                                                            " "
                                                        ]
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "info",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("text", {
                                                children: ""
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "h2",
                                            children: movie.name
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "thumb",
                                    children: [
                                        movie.logo ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            onError: (e)=>e.target.src = "/placeholder.png",
                                            style: {
                                                filter: isAdult && parentalPin && "blur(20px)"
                                            },
                                            src: movie.logo
                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_6___default()), {
                                            alt: "placeholder",
                                            layout: "fill",
                                            src: _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z
                                        }),
                                        isAdult && parentalPin && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                            style: {
                                                zIndex: 99,
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%,-50%)"
                                            },
                                            width: "32",
                                            height: "38",
                                            viewBox: "0 0 20 26",
                                            fill: "none",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                d: "M9.35342 0.978516C9.71046 0.978516 10.0675 0.978516 10.4246 0.978516C10.6069 1.0108 10.7891 1.04529 10.972 1.07454C13.6371 1.50415 15.8459 3.8255 16.0656 6.51604C16.1583 7.65313 16.1075 8.80208 16.1216 9.94578C16.1229 10.0653 16.1218 10.1847 16.1218 10.3277C16.3536 10.3277 16.5625 10.3274 16.7714 10.3277C18.2385 10.3296 19.2373 11.3213 19.2379 12.7826C19.2392 16.337 19.239 19.8918 19.2379 23.4462C19.2373 24.9108 18.2409 25.908 16.7791 25.9094C15.3184 25.9108 13.8576 25.9097 12.3969 25.9097C9.24001 25.9097 6.08316 25.9124 2.92631 25.9083C1.60326 25.9066 0.549224 24.9067 0.545085 23.6167C0.533772 19.9486 0.535152 16.2805 0.545085 12.6123C0.54812 11.4981 1.37617 10.547 2.47545 10.3743C2.8554 10.3147 3.24694 10.3277 3.65641 10.3061C3.65641 10.2176 3.65641 10.1301 3.65641 10.0429C3.65696 9.06089 3.64813 8.07888 3.65972 7.09714C3.69007 4.49186 5.41763 2.12443 7.89129 1.3179C8.36506 1.16338 8.86531 1.08944 9.35342 0.978516ZM14.04 10.321C14.04 9.49768 14.0469 8.69612 14.0372 7.89484C14.0314 7.42549 14.0414 6.95007 13.9718 6.48817C13.6457 4.31968 11.4524 2.74195 9.29354 3.10037C7.17969 3.45107 5.74929 5.12373 5.73853 7.26407C5.73384 8.20498 5.73743 9.14615 5.73798 10.0871C5.73798 10.1638 5.7446 10.2405 5.74819 10.321C8.51957 10.321 11.2598 10.321 14.04 10.321ZM9.88457 14.4809C8.99416 14.4842 8.19481 15.0664 7.91475 15.9154C7.63634 16.7589 7.92192 17.6764 8.65147 18.2081C8.81095 18.3242 8.86062 18.4412 8.85786 18.628C8.8482 19.293 8.85206 19.958 8.85593 20.623C8.85675 20.7515 8.86282 20.8848 8.89732 21.0073C9.03279 21.4883 9.51318 21.8086 9.9897 21.749C10.5222 21.6822 10.9071 21.2879 10.9174 20.7609C10.9312 20.0557 10.9295 19.3498 10.9187 18.6443C10.9157 18.4478 10.967 18.3253 11.1326 18.2036C11.8607 17.6681 12.1408 16.7523 11.8583 15.908C11.5735 15.0553 10.7742 14.4776 9.88457 14.4809Z",
                                                fill: "black"
                                            })
                                        })
                                    ]
                                })
                            ]
                        }, index);
                    })
                })
            ]
        });
    };
    const Recents = ({ style })=>{
        const handleItem = (isAdult, movie)=>{
            const encryptedName = encodeURIComponent(crypto_js__WEBPACK_IMPORTED_MODULE_8__.AES.encrypt(movie.info.tvg.name, "thisismovie").toString());
            if (parentalPin) {
                if (isAdult) {
                    setClickedAdultItem(movie.info);
                    setShowParentalLock(true);
                } else {
                    setShowParentalLock(false);
                    router.push({
                        pathname: `/dashboard/preview/${currentAction}/m3u/${encryptedName}`,
                        query: {
                            state: "play",
                            id: getStreamIdFromUrl(movie.id),
                            stream: crypto_js__WEBPACK_IMPORTED_MODULE_8__.AES.encrypt(movie.info.url, "thisisurl").toString()
                        }
                    });
                }
            } else {
                router.push({
                    pathname: `/dashboard/preview/${currentAction}/m3u/${encryptedName}`,
                    query: {
                        state: "play",
                        id: getStreamIdFromUrl(movie.id),
                        stream: crypto_js__WEBPACK_IMPORTED_MODULE_8__.AES.encrypt(movie.info.url, "thisisurl").toString()
                    }
                });
            }
        };
        return (currentAction === "movies" ? recents : recentSeries).length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
            style: style,
            className: "category",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "h3",
                    children: "Continue Watching"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_utils_scrollable__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                    children: (currentAction === "movies" ? recents : recentSeries)?.map((movie, index)=>{
                        const { timeline, duration } = movie;
                        const watched = timeline / duration * 100;
                        const added = currentAction === "movies" ? movie.info?.added : movie.info?.last_modified;
                        const isFavourite = currentAction === "movies" ? FavouriteMovies && FavouriteMovies.filter((item)=>String((0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(item?.info?.url)) === String((0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(movie?.info?.url))).length > 0 : favouriteSeries && favouriteSeries.filter((item)=>String((0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(item.url)) === String((0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(movie.id))).length > 0;
                        const isAdult = movie?.info && adultArray.filter((item)=>movie.info.group.title.toLowerCase().includes(item.toLowerCase())).length > 0;
                        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            style: {
                                position: "relative"
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                onClick: ()=>handleItem(isAdult, movie),
                                style: {
                                    marginTop: 10,
                                    marginBottom: 10,
                                    width: 165
                                },
                                className: "item",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "caption",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "control",
                                                children: [
                                                    Number(movie.info?.rating).toFixed(1) !== "NaN" && Number(movie.info?.rating) !== 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "count",
                                                        children: Number(movie.info?.rating).toFixed(1)
                                                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {}),
                                                    isFavourite && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                        href: "#",
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                                            width: "30",
                                                            height: "26",
                                                            viewBox: "0 0 30 26",
                                                            fill: "none",
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            children: [
                                                                " ",
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                                    d: "M29.2239 7.73189C29.2239 8.12625 29.2239 8.52061 29.2239 8.91467C29.2091 8.99632 29.1875 9.07738 29.181 9.15933C29.0718 10.5385 28.6337 11.8136 27.9606 13.0141C27.113 14.5265 25.9933 15.827 24.7685 17.0364C21.7994 19.9679 18.5333 22.5639 15.3951 25.3043C15.0229 25.6294 14.5771 25.6093 14.1904 25.2874C13.8659 25.0173 13.5469 24.7404 13.2289 24.4623C10.706 22.2574 8.16057 20.0782 5.67077 17.8369C4.12678 16.4471 2.71503 14.9182 1.69378 13.0851C-0.0217981 10.006 -0.113805 6.88017 1.61036 3.78242C2.56563 2.06565 4.04069 0.913648 5.94354 0.375217C7.9733 -0.19901 9.91905 0.00807828 11.7287 1.14352C12.8804 1.86626 13.7579 2.85732 14.4765 3.99927C14.5827 4.1679 14.6862 4.33801 14.7629 4.46167C15.3081 3.75845 15.7856 3.01796 16.3841 2.39344C18.4931 0.19357 21.056 -0.47858 23.9434 0.472844C26.661 1.36835 28.2366 3.37771 28.9393 6.10329C29.0762 6.63521 29.131 7.18843 29.2239 7.73189Z",
                                                                    fill: "#FF0000"
                                                                }),
                                                                " "
                                                            ]
                                                        })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "info",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("text", {
                                                    children: ""
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "h2",
                                                children: movie.info?.name
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_utils_progress__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z, {
                                        progress: watched
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "thumb",
                                        children: [
                                            movie.info && movie.info.tvg.logo ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                // onLoad={e => e.target.style.opacity = 1}
                                                style: {
                                                    filter: isAdult && parentalPin && "blur(20px)",
                                                    transition: ".5s"
                                                },
                                                onError: (e)=>e.target.src = _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z,
                                                src: movie.info.tvg.logo
                                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_6___default()), {
                                                alt: "placeholder",
                                                layout: "fill",
                                                src: _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z
                                            }),
                                            isAdult && parentalPin && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                                style: {
                                                    zIndex: 99,
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform: "translate(-50%,-50%)"
                                                },
                                                width: "32",
                                                height: "38",
                                                viewBox: "0 0 20 26",
                                                fill: "none",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                    d: "M9.35342 0.978516C9.71046 0.978516 10.0675 0.978516 10.4246 0.978516C10.6069 1.0108 10.7891 1.04529 10.972 1.07454C13.6371 1.50415 15.8459 3.8255 16.0656 6.51604C16.1583 7.65313 16.1075 8.80208 16.1216 9.94578C16.1229 10.0653 16.1218 10.1847 16.1218 10.3277C16.3536 10.3277 16.5625 10.3274 16.7714 10.3277C18.2385 10.3296 19.2373 11.3213 19.2379 12.7826C19.2392 16.337 19.239 19.8918 19.2379 23.4462C19.2373 24.9108 18.2409 25.908 16.7791 25.9094C15.3184 25.9108 13.8576 25.9097 12.3969 25.9097C9.24001 25.9097 6.08316 25.9124 2.92631 25.9083C1.60326 25.9066 0.549224 24.9067 0.545085 23.6167C0.533772 19.9486 0.535152 16.2805 0.545085 12.6123C0.54812 11.4981 1.37617 10.547 2.47545 10.3743C2.8554 10.3147 3.24694 10.3277 3.65641 10.3061C3.65641 10.2176 3.65641 10.1301 3.65641 10.0429C3.65696 9.06089 3.64813 8.07888 3.65972 7.09714C3.69007 4.49186 5.41763 2.12443 7.89129 1.3179C8.36506 1.16338 8.86531 1.08944 9.35342 0.978516ZM14.04 10.321C14.04 9.49768 14.0469 8.69612 14.0372 7.89484C14.0314 7.42549 14.0414 6.95007 13.9718 6.48817C13.6457 4.31968 11.4524 2.74195 9.29354 3.10037C7.17969 3.45107 5.74929 5.12373 5.73853 7.26407C5.73384 8.20498 5.73743 9.14615 5.73798 10.0871C5.73798 10.1638 5.7446 10.2405 5.74819 10.321C8.51957 10.321 11.2598 10.321 14.04 10.321ZM9.88457 14.4809C8.99416 14.4842 8.19481 15.0664 7.91475 15.9154C7.63634 16.7589 7.92192 17.6764 8.65147 18.2081C8.81095 18.3242 8.86062 18.4412 8.85786 18.628C8.8482 19.293 8.85206 19.958 8.85593 20.623C8.85675 20.7515 8.86282 20.8848 8.89732 21.0073C9.03279 21.4883 9.51318 21.8086 9.9897 21.749C10.5222 21.6822 10.9071 21.2879 10.9174 20.7609C10.9312 20.0557 10.9295 19.3498 10.9187 18.6443C10.9157 18.4478 10.967 18.3253 11.1326 18.2036C11.8607 17.6681 12.1408 16.7523 11.8583 15.908C11.5735 15.0553 10.7742 14.4776 9.88457 14.4809Z",
                                                    fill: "black"
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }, index)
                        }, index);
                    })
                })
            ]
        });
    };
    const MovieCategory = react__WEBPACK_IMPORTED_MODULE_3___default().useCallback(({ index, style })=>{
        const filtered = movies.filter((movie)=>movie.group.title === movieCategories[index - moviesDifference]);
        const [errorIndex, setErrorIndex] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
        const [canScrollLeft, setCanScrollLeft] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
        const [canScrollRight, setCanScrollRight] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
        (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
            const container = refs.current[index];
            if (!container) return;
            const gridEl = container.querySelector(".ReactVirtualized__Grid") || container.childNodes[0];
            if (!gridEl) return;
            const updateScroll = ()=>{
                const { scrollLeft, scrollWidth, clientWidth } = gridEl;
                const totalContentWidth = filtered ? filtered.length * 173 : scrollWidth;
                const maxContainerWidth = clientWidth || window.innerWidth - 60;
                const isOverflowing = totalContentWidth > maxContainerWidth + 10;
                setCanScrollLeft(isOverflowing && scrollLeft > 5);
                setCanScrollRight(isOverflowing && scrollLeft + maxContainerWidth < totalContentWidth - 10);
            };
            updateScroll();
            gridEl.addEventListener("scroll", updateScroll, {
                passive: true
            });
            window.addEventListener("resize", updateScroll, {
                passive: true
            });
            return ()=>{
                gridEl.removeEventListener("scroll", updateScroll);
                window.removeEventListener("resize", updateScroll);
            };
        }, [
            index,
            filtered,
            windowSize
        ]);
        const handleScrollRow = (direction)=>{
            const container = refs.current[index];
            if (!container) return;
            const gridEl = container.querySelector(".ReactVirtualized__Grid") || container.childNodes[0] || container;
            if (gridEl) {
                const scrollAmount = 600;
                gridEl.scrollBy({
                    left: direction === "left" ? -scrollAmount : scrollAmount,
                    behavior: "smooth"
                });
                setTimeout(()=>{
                    const { scrollLeft, scrollWidth, clientWidth } = gridEl;
                    const totalContentWidth = filtered ? filtered.length * 173 : scrollWidth;
                    const maxContainerWidth = clientWidth || window.innerWidth - 60;
                    const isOverflowing = totalContentWidth > maxContainerWidth + 10;
                    setCanScrollLeft(isOverflowing && scrollLeft > 5);
                    setCanScrollRight(isOverflowing && scrollLeft + maxContainerWidth < totalContentWidth - 10);
                }, 350);
            }
        };
        const innerElement = (args)=>{
            const filteredComp = filtered[args.columnIndex];
            // console.log("filtercomp----",filteredComp)
            const category_name = filteredComp.group.title;
            const { name } = filteredComp;
            const movie_image = filteredComp.tvg.logo;
            // const { category_name, added, name, movie_image } = filteredComp;
            const isFavourite = FavouriteMovies && FavouriteMovies.filter((movie)=>movie.id === getStreamIdFromUrl(filteredComp.url)).length > 0;
            // const category = movieCategories[index];
            const isAdult = adultArray.filter((item)=>category_name.toLowerCase().includes(item.toLowerCase())).length > 0;
            const handleItem = ()=>{
                if (parentalPin) {
                    if (isAdult) {
                        setClickedAdultItem(filteredComp);
                        setShowParentalLock(true);
                    } else {
                        setShowParentalLock(false);
                        router.push({
                            pathname: `/dashboard/preview/movies/m3u/${filteredComp.name}`,
                            query: {
                                stream: crypto_js__WEBPACK_IMPORTED_MODULE_8__.AES.encrypt(filteredComp.url, "thisisurl").toString(),
                                logo: crypto_js__WEBPACK_IMPORTED_MODULE_8__.AES.encrypt(movie_image, "thisisname").toString(),
                                title: crypto_js__WEBPACK_IMPORTED_MODULE_8__.AES.encrypt(filteredComp.group.title, "thisisname").toString()
                            }
                        });
                    }
                } else {
                    router.push({
                        pathname: `/dashboard/preview/movies/m3u/${filteredComp.name}`,
                        query: {
                            stream: crypto_js__WEBPACK_IMPORTED_MODULE_8__.AES.encrypt(filteredComp.url, "thisisurl").toString(),
                            logo: crypto_js__WEBPACK_IMPORTED_MODULE_8__.AES.encrypt(movie_image, "thisisname").toString(),
                            title: crypto_js__WEBPACK_IMPORTED_MODULE_8__.AES.encrypt(filteredComp.group.title, "thisisname").toString()
                        }
                    });
                }
            };
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: {
                    ...args.style,
                    padding: 5,
                    paddingTop: 6
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    onClick: handleItem,
                    onMouseEnter: (e)=>handleCardMouseEnter(e, filteredComp),
                    onMouseLeave: handleCardMouseLeave,
                    className: "item",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "caption",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "control",
                                    children: [
                                        Number(filteredComp.rating).toFixed(1) !== "NaN" && Number(filteredComp.rating) !== 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "count",
                                            children: Number(filteredComp.rating).toFixed(1)
                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {}),
                                        isFavourite && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                            href: "#",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                                width: "30",
                                                height: "26",
                                                viewBox: "0 0 30 26",
                                                fill: "none",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                children: [
                                                    " ",
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                        d: "M29.2239 7.73189C29.2239 8.12625 29.2239 8.52061 29.2239 8.91467C29.2091 8.99632 29.1875 9.07738 29.181 9.15933C29.0718 10.5385 28.6337 11.8136 27.9606 13.0141C27.113 14.5265 25.9933 15.827 24.7685 17.0364C21.7994 19.9679 18.5333 22.5639 15.3951 25.3043C15.0229 25.6294 14.5771 25.6093 14.1904 25.2874C13.8659 25.0173 13.5469 24.7404 13.2289 24.4623C10.706 22.2574 8.16057 20.0782 5.67077 17.8369C4.12678 16.4471 2.71503 14.9182 1.69378 13.0851C-0.0217981 10.006 -0.113805 6.88017 1.61036 3.78242C2.56563 2.06565 4.04069 0.913648 5.94354 0.375217C7.9733 -0.19901 9.91905 0.00807828 11.7287 1.14352C12.8804 1.86626 13.7579 2.85732 14.4765 3.99927C14.5827 4.1679 14.6862 4.33801 14.7629 4.46167C15.3081 3.75845 15.7856 3.01796 16.3841 2.39344C18.4931 0.19357 21.056 -0.47858 23.9434 0.472844C26.661 1.36835 28.2366 3.37771 28.9393 6.10329C29.0762 6.63521 29.131 7.18843 29.2239 7.73189Z",
                                                        fill: "#FF0000"
                                                    }),
                                                    " "
                                                ]
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "info",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("text", {
                                        children: category_name
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "h2",
                                    children: name
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "thumb",
                            children: [
                                errorIndex.includes(args.columnIndex) ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_6___default()), {
                                    alt: "placeholder",
                                    src: _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z
                                }) : movie_image ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    style: {
                                        filter: isAdult && parentalPin && "blur(20px)"
                                    },
                                    onError: ()=>setErrorIndex((prev)=>[
                                                ...prev,
                                                args.columnIndex
                                            ]),
                                    src: movie_image,
                                    ref: (element)=>listImagesRef.current[index] = element
                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_6___default()), {
                                    alt: "placeholder",
                                    src: _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z,
                                    ref: (element)=>listImagesRef.current[index] = element
                                }),
                                isAdult && parentalPin && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                    style: {
                                        zIndex: 99,
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%,-50%)"
                                    },
                                    width: "32",
                                    height: "38",
                                    viewBox: "0 0 20 26",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                        d: "M9.35342 0.978516C9.71046 0.978516 10.0675 0.978516 10.4246 0.978516C10.6069 1.0108 10.7891 1.04529 10.972 1.07454C13.6371 1.50415 15.8459 3.8255 16.0656 6.51604C16.1583 7.65313 16.1075 8.80208 16.1216 9.94578C16.1229 10.0653 16.1218 10.1847 16.1218 10.3277C16.3536 10.3277 16.5625 10.3274 16.7714 10.3277C18.2385 10.3296 19.2373 11.3213 19.2379 12.7826C19.2392 16.337 19.239 19.8918 19.2379 23.4462C19.2373 24.9108 18.2409 25.908 16.7791 25.9094C15.3184 25.9108 13.8576 25.9097 12.3969 25.9097C9.24001 25.9097 6.08316 25.9124 2.92631 25.9083C1.60326 25.9066 0.549224 24.9067 0.545085 23.6167C0.533772 19.9486 0.535152 16.2805 0.545085 12.6123C0.54812 11.4981 1.37617 10.547 2.47545 10.3743C2.8554 10.3147 3.24694 10.3277 3.65641 10.3061C3.65641 10.2176 3.65641 10.1301 3.65641 10.0429C3.65696 9.06089 3.64813 8.07888 3.65972 7.09714C3.69007 4.49186 5.41763 2.12443 7.89129 1.3179C8.36506 1.16338 8.86531 1.08944 9.35342 0.978516ZM14.04 10.321C14.04 9.49768 14.0469 8.69612 14.0372 7.89484C14.0314 7.42549 14.0414 6.95007 13.9718 6.48817C13.6457 4.31968 11.4524 2.74195 9.29354 3.10037C7.17969 3.45107 5.74929 5.12373 5.73853 7.26407C5.73384 8.20498 5.73743 9.14615 5.73798 10.0871C5.73798 10.1638 5.7446 10.2405 5.74819 10.321C8.51957 10.321 11.2598 10.321 14.04 10.321ZM9.88457 14.4809C8.99416 14.4842 8.19481 15.0664 7.91475 15.9154C7.63634 16.7589 7.92192 17.6764 8.65147 18.2081C8.81095 18.3242 8.86062 18.4412 8.85786 18.628C8.8482 19.293 8.85206 19.958 8.85593 20.623C8.85675 20.7515 8.86282 20.8848 8.89732 21.0073C9.03279 21.4883 9.51318 21.8086 9.9897 21.749C10.5222 21.6822 10.9071 21.2879 10.9174 20.7609C10.9312 20.0557 10.9295 19.3498 10.9187 18.6443C10.9157 18.4478 10.967 18.3253 11.1326 18.2036C11.8607 17.6681 12.1408 16.7523 11.8583 15.908C11.5735 15.0553 10.7742 14.4776 9.88457 14.4809Z",
                                        fill: "black"
                                    })
                                })
                            ]
                        })
                    ]
                }, args.key)
            });
        };
        const handleTouchMove = (e, ref)=>{
            if (!mouseDown || startX === undefined || scrollLeft === undefined || !ref?.childNodes?.[0]) return;
            e.preventDefault();
            if (ref?.childNodes?.[0]?.childNodes?.[0]?.childNodes) {
                const nodes = ref.childNodes[0].childNodes[0].childNodes;
                nodes.forEach((el)=>{
                    el.style.pointerEvents = "none";
                });
            }
            const x = e.touches[0].clientX - ref.childNodes[0].offsetLeft;
            const scroll = x - startX;
            ref.childNodes[0].scrollLeft = scrollLeft - scroll;
        };
        const handleTouchStart = (e, ref)=>{
            if (!ref?.childNodes?.[0]) return;
            mouseDown = true;
            startX = e.touches[0].clientX - ref.childNodes[0].offsetLeft;
            scrollLeft = ref.childNodes[0].scrollLeft;
        };
        const stopDragging = function(e, ref) {
            mouseDown = false;
            if (ref?.childNodes?.[0]?.childNodes?.[0]?.childNodes) {
                const nodes = ref.childNodes[0].childNodes[0].childNodes;
                nodes.forEach((el)=>{
                    el.style.pointerEvents = "auto";
                });
            }
        };
        const handleListDown = (e, ref)=>{
            if (!ref?.childNodes?.[0]) return;
            mouseDown = true;
            startX = e.pageX - ref.childNodes[0].offsetLeft;
            scrollLeft = ref.childNodes[0].scrollLeft;
        };
        const handlelistMove = (e, ref)=>{
            if (!mouseDown || startX === undefined || scrollLeft === undefined || !ref?.childNodes?.[0]) return;
            e.preventDefault();
            if (ref?.childNodes?.[0]?.childNodes?.[0]?.childNodes) {
                const nodes = ref.childNodes[0].childNodes[0].childNodes;
                nodes.forEach((el)=>{
                    el.style.pointerEvents = "none";
                });
            }
            const x = e.pageX - ref.childNodes[0].offsetLeft;
            const scroll = x - startX;
            ref.childNodes[0].scrollLeft = scrollLeft - scroll;
        };
        return filtered.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
            style: style,
            className: "category listSlider",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "h3",
                    children: movieCategories[index - moviesDifference]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "list",
                    children: [
                        canScrollLeft && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            type: "button",
                            onClick: (e)=>{
                                e.stopPropagation();
                                handleScrollRow("left");
                            },
                            className: "row-scroll-arrow left",
                            title: "Scroll Left",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                width: "22",
                                height: "22",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2.5",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("polyline", {
                                    points: "15 18 9 12 15 6"
                                })
                            })
                        }),
                        canScrollRight && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            type: "button",
                            onClick: (e)=>{
                                e.stopPropagation();
                                handleScrollRow("right");
                            },
                            className: "row-scroll-arrow right",
                            title: "Scroll Right",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                width: "22",
                                height: "22",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2.5",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("polyline", {
                                    points: "9 18 15 12 9 6"
                                })
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            style: {
                                paddingLeft: 10
                            },
                            className: "owl-carousel owl-theme",
                            onMouseDown: (e)=>handleListDown(e, refs.current[Number(index)]),
                            onMouseUp: (e)=>stopDragging(e, refs.current[Number(index)]),
                            onMouseLeave: (e)=>stopDragging(e, refs.current[Number(index)]),
                            onTouchEnd: (e)=>stopDragging(e, refs.current[Number(index)]),
                            onTouchStart: (e)=>handleTouchStart(e, refs.current[Number(index)]),
                            onTouchMove: (e)=>handleTouchMove(e, refs.current[Number(index)]),
                            onMouseMove: (e)=>handlelistMove(e, refs.current[Number(index)]),
                            ref: (element)=>refs.current[index] = element,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_virtualized__WEBPACK_IMPORTED_MODULE_4__.Grid, {
                                height: 270,
                                cellRenderer: innerElement,
                                columnCount: filtered ? filtered.length : 0,
                                rowHeight: 250,
                                style: {
                                    overflowY: "hidden",
                                    overflowX: "hidden",
                                    paddingTop: 15,
                                    paddingLeft: 5
                                },
                                rowCount: 1,
                                columnWidth: 173,
                                width: windowSize.width - window.innerWidth / 20
                            })
                        })
                    ]
                })
            ]
        }, index);
    }, [
        movies,
        movieCategories,
        FavouriteMovies,
        parentalPin,
        windowSize
    ]);
    const searchHandler = (searchTerm)=>{
        setSearchTerm(searchTerm);
        const filter = M3uData?.filter((item)=>item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        if (filter?.length === 0) {
            setNodata(true);
        } else {
            setNodata(false);
            setFilteredData(filter);
        }
    };
    const SeriesCategory = react__WEBPACK_IMPORTED_MODULE_3___default().useCallback(({ index, style })=>{
        const filtered = series.filter((series)=>series.group.title === seriesCategories[index - seriesDifference]);
        const [canScrollLeft, setCanScrollLeft] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
        const [canScrollRight, setCanScrollRight] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
        (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
            const container = refs.current[index];
            if (!container) return;
            const gridEl = container.querySelector(".ReactVirtualized__Grid") || container.childNodes[0];
            if (!gridEl) return;
            const updateScroll = ()=>{
                const { scrollLeft, scrollWidth, clientWidth } = gridEl;
                const totalContentWidth = filtered ? filtered.length * 173 : scrollWidth;
                const maxContainerWidth = clientWidth || window.innerWidth - 60;
                const isOverflowing = totalContentWidth > maxContainerWidth + 10;
                setCanScrollLeft(isOverflowing && scrollLeft > 5);
                setCanScrollRight(isOverflowing && scrollLeft + maxContainerWidth < totalContentWidth - 10);
            };
            updateScroll();
            gridEl.addEventListener("scroll", updateScroll, {
                passive: true
            });
            window.addEventListener("resize", updateScroll, {
                passive: true
            });
            return ()=>{
                gridEl.removeEventListener("scroll", updateScroll);
                window.removeEventListener("resize", updateScroll);
            };
        }, [
            index,
            filtered,
            windowSize
        ]);
        const handleScrollRow = (direction)=>{
            const container = refs.current[index];
            if (!container) return;
            const gridEl = container.querySelector(".ReactVirtualized__Grid") || container.childNodes[0] || container;
            if (gridEl) {
                const scrollAmount = 600;
                gridEl.scrollBy({
                    left: direction === "left" ? -scrollAmount : scrollAmount,
                    behavior: "smooth"
                });
                setTimeout(()=>{
                    const { scrollLeft, scrollWidth, clientWidth } = gridEl;
                    const totalContentWidth = filtered ? filtered.length * 173 : scrollWidth;
                    const maxContainerWidth = clientWidth || window.innerWidth - 60;
                    const isOverflowing = totalContentWidth > maxContainerWidth + 10;
                    setCanScrollLeft(isOverflowing && scrollLeft > 5);
                    setCanScrollRight(isOverflowing && scrollLeft + maxContainerWidth < totalContentWidth - 10);
                }, 350);
            }
        };
        const adultArray = [
            "adult",
            "xxx",
            "porn",
            "sex",
            "adults",
            "ADULTS",
            "+18",
            "18+",
            "18"
        ];
        const innerElement = (args)=>{
            const filteredComp = filtered[args.columnIndex];
            const category_name = filteredComp.group.title;
            const { name } = filteredComp;
            const movie_image = filteredComp.tvg.logo;
            // const { category_name, added, name, movie_image } = filteredComp;
            const isFavourite = favouriteSeries && favouriteSeries.filter((movie)=>movie.id === getStreamIdFromUrl(filteredComp.url)).length > 0;
            // const category = movieCategories[index];
            const isAdult = adultArray.filter((item)=>category_name.toLowerCase().includes(item.toLowerCase())).length > 0;
            const handleItem = ()=>{
                scrolled.toggle(0, 0, 0);
                const encryptedName = encodeURIComponent(crypto_js__WEBPACK_IMPORTED_MODULE_8__.AES.encrypt(filteredComp.name, "thisismovie").toString());
                if (parentalPin) {
                    if (isAdult) {
                        setClickedAdultItem(filteredComp);
                        setShowParentalLock(true);
                    } else {
                        setShowParentalLock(false);
                        router.push({
                            pathname: `/dashboard/preview/${currentAction}/m3u/${encryptedName}`,
                            query: {
                                id: getStreamIdFromUrl(filteredComp.url),
                                stream: crypto_js__WEBPACK_IMPORTED_MODULE_8__.AES.encrypt(filteredComp.url, "thisisurl").toString(),
                                name: filteredComp.url
                            }
                        });
                    }
                } else {
                    router.push({
                        pathname: `/dashboard/preview/${currentAction}/m3u/${encryptedName}`,
                        query: {
                            id: getStreamIdFromUrl(filteredComp.url),
                            stream: crypto_js__WEBPACK_IMPORTED_MODULE_8__.AES.encrypt(filteredComp.url, "thisisurl").toString(),
                            name: filteredComp.url
                        }
                    });
                }
            };
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: {
                    ...args.style,
                    padding: 5,
                    paddingTop: 6
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    onClick: handleItem,
                    className: "item",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "caption",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "control",
                                    children: [
                                        Number(filteredComp.rating).toFixed(1) !== "NaN" && Number(filteredComp.rating) !== 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "count",
                                            children: Number(filteredComp.rating).toFixed(1)
                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {}),
                                        isFavourite && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                            href: "'#",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                                width: "30",
                                                height: "26",
                                                viewBox: "0 0 30 26",
                                                fill: "none",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                children: [
                                                    " ",
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                        d: "M29.2239 7.73189C29.2239 8.12625 29.2239 8.52061 29.2239 8.91467C29.2091 8.99632 29.1875 9.07738 29.181 9.15933C29.0718 10.5385 28.6337 11.8136 27.9606 13.0141C27.113 14.5265 25.9933 15.827 24.7685 17.0364C21.7994 19.9679 18.5333 22.5639 15.3951 25.3043C15.0229 25.6294 14.5771 25.6093 14.1904 25.2874C13.8659 25.0173 13.5469 24.7404 13.2289 24.4623C10.706 22.2574 8.16057 20.0782 5.67077 17.8369C4.12678 16.4471 2.71503 14.9182 1.69378 13.0851C-0.0217981 10.006 -0.113805 6.88017 1.61036 3.78242C2.56563 2.06565 4.04069 0.913648 5.94354 0.375217C7.9733 -0.19901 9.91905 0.00807828 11.7287 1.14352C12.8804 1.86626 13.7579 2.85732 14.4765 3.99927C14.5827 4.1679 14.6862 4.33801 14.7629 4.46167C15.3081 3.75845 15.7856 3.01796 16.3841 2.39344C18.4931 0.19357 21.056 -0.47858 23.9434 0.472844C26.661 1.36835 28.2366 3.37771 28.9393 6.10329C29.0762 6.63521 29.131 7.18843 29.2239 7.73189Z",
                                                        fill: "#FF0000"
                                                    }),
                                                    " "
                                                ]
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "info",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("text", {
                                            children: category_name
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("text", {})
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "h2",
                                    children: name
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "thumb",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    onLoad: (e)=>e.target.style.opacity = 1,
                                    style: {
                                        opacity: 0,
                                        transition: ".5s"
                                    },
                                    onError: (e)=>{
                                        e.target.src = "/placeholder.png";
                                        (e)=>e.target.style.opacity = 1;
                                    },
                                    src: movie_image ? movie_image : "/placeholder.png",
                                    ref: (element)=>listImagesRef.current[index] = element
                                }),
                                isAdult && parentalPin && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                    style: {
                                        zIndex: 99,
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%,-50%)"
                                    },
                                    width: "32",
                                    height: "38",
                                    viewBox: "0 0 20 26",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                        d: "M9.35342 0.978516C9.71046 0.978516 10.0675 0.978516 10.4246 0.978516C10.6069 1.0108 10.7891 1.04529 10.972 1.07454C13.6371 1.50415 15.8459 3.8255 16.0656 6.51604C16.1583 7.65313 16.1075 8.80208 16.1216 9.94578C16.1229 10.0653 16.1218 10.1847 16.1218 10.3277C16.3536 10.3277 16.5625 10.3274 16.7714 10.3277C18.2385 10.3296 19.2373 11.3213 19.2379 12.7826C19.2392 16.337 19.239 19.8918 19.2379 23.4462C19.2373 24.9108 18.2409 25.908 16.7791 25.9094C15.3184 25.9108 13.8576 25.9097 12.3969 25.9097C9.24001 25.9097 6.08316 25.9124 2.92631 25.9083C1.60326 25.9066 0.549224 24.9067 0.545085 23.6167C0.533772 19.9486 0.535152 16.2805 0.545085 12.6123C0.54812 11.4981 1.37617 10.547 2.47545 10.3743C2.8554 10.3147 3.24694 10.3277 3.65641 10.3061C3.65641 10.2176 3.65641 10.1301 3.65641 10.0429C3.65696 9.06089 3.64813 8.07888 3.65972 7.09714C3.69007 4.49186 5.41763 2.12443 7.89129 1.3179C8.36506 1.16338 8.86531 1.08944 9.35342 0.978516ZM14.04 10.321C14.04 9.49768 14.0469 8.69612 14.0372 7.89484C14.0314 7.42549 14.0414 6.95007 13.9718 6.48817C13.6457 4.31968 11.4524 2.74195 9.29354 3.10037C7.17969 3.45107 5.74929 5.12373 5.73853 7.26407C5.73384 8.20498 5.73743 9.14615 5.73798 10.0871C5.73798 10.1638 5.7446 10.2405 5.74819 10.321C8.51957 10.321 11.2598 10.321 14.04 10.321ZM9.88457 14.4809C8.99416 14.4842 8.19481 15.0664 7.91475 15.9154C7.63634 16.7589 7.92192 17.6764 8.65147 18.2081C8.81095 18.3242 8.86062 18.4412 8.85786 18.628C8.8482 19.293 8.85206 19.958 8.85593 20.623C8.85675 20.7515 8.86282 20.8848 8.89732 21.0073C9.03279 21.4883 9.51318 21.8086 9.9897 21.749C10.5222 21.6822 10.9071 21.2879 10.9174 20.7609C10.9312 20.0557 10.9295 19.3498 10.9187 18.6443C10.9157 18.4478 10.967 18.3253 11.1326 18.2036C11.8607 17.6681 12.1408 16.7523 11.8583 15.908C11.5735 15.0553 10.7742 14.4776 9.88457 14.4809Z",
                                        fill: "black"
                                    })
                                })
                            ]
                        })
                    ]
                }, args.key)
            });
        };
        const handleTouchMove = (e, ref)=>{
            if (!ref?.childNodes?.[0]) return;
            e.preventDefault();
            if (mouseDown) {
                const nodes = ref.childNodes[0].childNodes[0].childNodes;
                nodes.forEach((el)=>{
                    el.style.pointerEvents = "none";
                });
                const x = e.touches[0].clientX - ref.childNodes[0].offsetLeft;
                const scroll = x - startX;
                ref.childNodes[0].scrollLeft = scrollLeft - scroll;
            }
        };
        const handleTouchStart = (e, ref)=>{
            if (!ref?.childNodes?.[0]) return;
            mouseDown = true;
            startX = e.touches[0].clientX - ref.childNodes[0].offsetLeft;
            scrollLeft = ref.childNodes[0].scrollLeft;
        };
        const stopDragging = function(e, ref) {
            mouseDown = false;
            if (ref?.childNodes?.[0]?.childNodes?.[0]?.childNodes) {
                const nodes = ref.childNodes[0].childNodes[0].childNodes;
                nodes.forEach((el)=>{
                    el.style.pointerEvents = "auto";
                });
            }
        };
        const handleListDown = (e, ref)=>{
            if (!ref?.childNodes?.[0]) return;
            mouseDown = true;
            startX = e.pageX - ref.childNodes[0].offsetLeft;
            scrollLeft = ref.childNodes[0].scrollLeft;
        };
        const handlelistMove = (e, ref)=>{
            if (!ref?.childNodes?.[0]) return;
            e.preventDefault();
            if (mouseDown) {
                const nodes = ref.childNodes[0].childNodes[0].childNodes;
                nodes.forEach((el)=>{
                    el.style.pointerEvents = "none";
                });
                const x = e.pageX - ref.childNodes[0].offsetLeft;
                const scroll = x - startX;
                ref.childNodes[0].scrollLeft = scrollLeft - scroll;
            }
        };
        return filtered.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
            style: style,
            className: "category listSlider",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "h3",
                    children: seriesCategories[index - seriesDifference]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "list",
                    children: [
                        canScrollLeft && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            type: "button",
                            onClick: (e)=>{
                                e.stopPropagation();
                                handleScrollRow("left");
                            },
                            className: "row-scroll-arrow left",
                            title: "Scroll Left",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                width: "22",
                                height: "22",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2.5",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("polyline", {
                                    points: "15 18 9 12 15 6"
                                })
                            })
                        }),
                        canScrollRight && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            type: "button",
                            onClick: (e)=>{
                                e.stopPropagation();
                                handleScrollRow("right");
                            },
                            className: "row-scroll-arrow right",
                            title: "Scroll Right",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                width: "22",
                                height: "22",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2.5",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("polyline", {
                                    points: "9 18 15 12 9 6"
                                })
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            style: {
                                paddingLeft: 10
                            },
                            className: "owl-carousel owl-theme",
                            onMouseDown: (e)=>handleListDown(e, refs.current[Number(index)]),
                            onMouseUp: (e)=>stopDragging(e, refs.current[Number(index)]),
                            onMouseLeave: (e)=>stopDragging(e, refs.current[Number(index)]),
                            onTouchEnd: (e)=>stopDragging(e, refs.current[Number(index)]),
                            onTouchStart: (e)=>handleTouchStart(e, refs.current[Number(index)]),
                            onTouchMove: (e)=>handleTouchMove(e, refs.current[Number(index)]),
                            onMouseMove: (e)=>handlelistMove(e, refs.current[Number(index)]),
                            ref: (element)=>refs.current[index] = element,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_virtualized__WEBPACK_IMPORTED_MODULE_4__.Grid, {
                                height: 270,
                                cellRenderer: innerElement,
                                columnCount: filtered ? filtered.length : 0,
                                rowHeight: 250,
                                style: {
                                    overflowY: "hidden",
                                    overflowX: "hidden",
                                    paddingTop: 15,
                                    paddingLeft: 5
                                },
                                rowCount: 1,
                                columnWidth: 173,
                                width: windowSize.width - window.innerWidth / 20
                            })
                        })
                    ]
                })
            ]
        }, index);
    }, [
        series,
        seriesCategories,
        favouriteSeries,
        parentalPin,
        windowSize
    ]);
    const renderMovie = ({ index, key, style })=>{
        let offset = 0;
        if (FavouriteMovies?.length > 0) {
            if (index === offset) {
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(FavsCategory, {
                    style: style,
                    favMovies: FavouriteMovies
                }, key);
            }
            offset++;
        }
        // Recents
        if (recents?.length > 0) {
            if (index === offset) {
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Recents, {
                    style: style,
                    recents: recents
                }, key);
            }
            offset++;
        }
        // Movies (shifted by how many special categories we added)
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MovieCategory, {
            style: style,
            index: index - offset
        }, key);
    };
    const renderSeries = ({ index, key, style })=>{
        let offset = 0;
        if (favouriteSeries?.length > 0) {
            if (index === offset) {
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(FavsCategory, {
                    style: style,
                    favMovies: favouriteSeries
                }, key);
            }
            offset++;
        }
        if (recentSeries?.length > 0) {
            if (index === offset) {
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Recents, {
                    style: style,
                    recents: recentSeries
                }, key);
            }
            offset++;
        }
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SeriesCategory, {
            style: style,
            index: index - offset
        }, key);
    };
    const removeItemFromRecents = async ()=>{
        try {
            await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_12__/* .removeMovieFromRecents */ .C3)(currentRecentItem.id, currentAction === "movies" ? "Movie" : "Series", user?.id, currentAction === "series" ? "remove" : null);
            getRecent();
        } catch (error) {
            console.log("ERROR", error);
        }
        setCurrentRecentItem(null);
    };
    const COLUMN_COUNT = 2;
    let gridHeight;
    const urlHandler = (url)=>{
        setUrl(url);
    };
    const VirtualizedGrid = ({ data, onItemClick })=>{
        const gutter = 10;
        const wrapperWidth = windowSize.width * 0.8;
        const itemWidth = (wrapperWidth - (columnCount - 1) * gutter) / columnCount;
        const rowCount = Math.ceil(data?.length / COLUMN_COUNT);
        const rowHeight = 80;
        const wrapperHeight = Math.min(windowSize.height * 0.7, rowCount * rowHeight);
        gridHeight = rowCount * rowHeight;
        const cellRenderer = ({ columnIndex, rowIndex, key, style })=>{
            const index = rowIndex * COLUMN_COUNT + columnIndex;
            if (index >= data?.length) return null;
            const item = data[index];
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    style: {
                        ...style,
                        left: style.left + columnIndex * gutter,
                        width: style.width,
                        padding: "5px"
                    },
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            color: theme?.current === "dark" ? "white" : "black"
                        },
                        className: "main-wrapper",
                        onClick: ()=>onItemClick(item?.url),
                        children: [
                            " ",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                style: {
                                    marginRight: "4px"
                                },
                                children: [
                                    index + 1,
                                    "."
                                ]
                            }),
                            item?.name
                        ]
                    })
                }, key)
            });
        };
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            style: {
                width: wrapperWidth,
                height: wrapperHeight,
                overflow: "hidden",
                backgroundColor: "transparent"
            },
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_virtualized__WEBPACK_IMPORTED_MODULE_4__.Grid, {
                ref: gridRef,
                columnCount: columnCount,
                columnWidth: itemWidth,
                height: wrapperHeight,
                rowCount: rowCount,
                rowHeight: 70,
                width: wrapperWidth,
                cellRenderer: cellRenderer,
                style: {
                    outline: "none"
                },
                className: "grid-wrapper",
                // Add padding between columns by adjusting left offset
                cellMargin: "5%"
            })
        });
    };
    const uniqueByName = (arr)=>{
        const seen = new Set();
        return arr.filter((item)=>{
            if (seen.has(item.name)) {
                return false;
            }
            seen.add(item.name);
            return true;
        });
    };
    const getDbData = async ()=>{
        setLoading(true);
        setM3uLoading(true);
        const user = JSON.parse(localStorage.getItem("currentUser"));
        setIsFormatted(Object.values(user)[0].formatted);
        if (Object.values(user)[0].formatted) {
            const data = await (0,_utils_indexDb_indexedDB__WEBPACK_IMPORTED_MODULE_26__/* .getFileByName */ .P9)(Object.keys(user)[0]);
            const parsedData = (0,iptv_playlist_parser__WEBPACK_IMPORTED_MODULE_9__.parse)(data);
            let movies = parsedData.items.filter((item)=>item.url.includes("/movie/"));
            let series = parsedData.items.filter((item)=>item.url.includes("/series/"));
            let live = parsedData.items.filter((item)=>!item.url.includes("/movie/") && !item.url.includes("/series/"));
            // Deduplicate by name/title
            movies = uniqueByName(movies);
            series = uniqueByName(series);
            live = uniqueByName(live);
            m3uStreams.toggle(movies, series, live);
        } else {
            const data = await (0,_utils_indexDb_indexedDB__WEBPACK_IMPORTED_MODULE_26__/* .getFileByName */ .P9)(Object.keys(user)[0]);
            setM3uData(data);
            setLoading(false);
        }
        setLoading(false);
        setM3uLoading(false);
    };
    function extractBaseNameRegex(url) {
        const m = url.match(/\/([^\/?#]+?)(?:\.[a-z0-9]+)?(?:[?#].*)?$/i);
        return m ? m[1].replace(/\.[^/.]+$/, "") : "";
    }
    if (currentRecentItem?.info?.url) {
        currentSelectedId = extractBaseNameRegex(currentRecentItem?.info?.url);
    }
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (!isPlayerOPen) {
            getRecent();
        }
    }, [
        isPlayerOPen
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        const handleResize = ()=>{
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return ()=>{
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (m3uStreams?.streams?.movies?.length === undefined) {
            getDbData();
        } else {
            const user = JSON.parse(localStorage.getItem("currentUser"));
            setIsFormatted(Object.values(user)[0].formatted);
            m3uStreams.toggle(m3uStreams?.streams?.movies, m3uStreams?.streams?.series, m3uStreams?.streams?.live);
        }
    }, [
        user?.id,
        isFormatted,
        m3uStreams?.streams?.movies?.length
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (!M3uData || !M3uData.length) {
            getDbData();
        }
    }, [
        M3uData
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (user?.id && currentSelected) {
            getFavs();
            getRecent();
        }
    }, [
        user?.id,
        currentAction,
        currentSelected
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (movies || series || live) {
            const isCategory = movies.filter((mov)=>mov.group.title && mov.group.title.length > 0).length > 0;
            const uniqueGroupTitles = [
                ...new Set(movies.map((val)=>val.group?.title).filter((title)=>title && title.trim()))
            ];
            if (isCategory) {
                setMovieCategories(uniqueGroupTitles);
            } else {
                setMovieCategories([
                    "UnCategorized"
                ]);
            }
            series.map((mov)=>setSeriesCategories((prev)=>{
                    const exist = prev.filter((ctg)=>ctg === mov.group.title).length > 0;
                    const category = mov.group.title && mov.group.title.length > 0;
                    return category && !exist ? [
                        ...prev,
                        mov.group.title
                    ] : prev;
                }));
            live.map((mov)=>setLiveCategories((prev)=>{
                    const exist = prev.filter((ctg)=>ctg === mov.group.title).length > 0;
                    const category = mov.group.title && mov.group.title.length > 0;
                    return category && !exist ? [
                        ...prev,
                        mov.group.title
                    ] : prev;
                }));
        }
    }, [
        movies,
        series
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (!m3u) {
            getM3uStreams();
        }
    }, [
        m3uUrl.url
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (m3u?.data) {
            setM3uData(m3u?.data);
            setLoading(false);
        }
    }, [
        m3u
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            currentRecentItem && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: {
                    opacity: currentRecentItem ? 1 : 0
                },
                className: "continue-watching-container-modal",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "continue-watching-container",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "title",
                            children: currentRecentItem?.info?.name
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Cancel__WEBPACK_IMPORTED_MODULE_21___default()), {
                            onClick: ()=>setCurrentRecentItem(null),
                            sx: {
                                color: "white",
                                fontSize: 23,
                                position: "absolute",
                                top: 10,
                                right: 10,
                                cursor: "pointer"
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "cw-btns-container",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    onClick: async ()=>{
                                        scrolled.toggle(0, 0, 0);
                                        setCurrentRecentItem(null);
                                        const isFavourite = (currentAction === "movies" ? FavouriteMovies : favouriteSeries)?.filter((item)=>String(item.id) === String(currentSelectedId)).length > 0;
                                        try {
                                            if (isFavourite) {
                                                await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_12__/* .removeFromFavs */ .h2)(currentRecentItem.id ? currentRecentItem.id : currentSelectedId, currentAction === "movies" ? "Movie" : "Series", user?.id);
                                                alert.toggle({
                                                    show: true,
                                                    title: "Removed from Favourites",
                                                    type: "success"
                                                });
                                                getFavs();
                                            } else {
                                                await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_12__/* .addToFavs */ .zg)(currentRecentItem.id ? currentRecentItem.id : currentSelectedId, currentAction === "movies" ? "Movie" : "Series", user?.id);
                                                alert.toggle({
                                                    show: true,
                                                    title: "Added to Favourites",
                                                    type: "success"
                                                });
                                            }
                                            getFavs();
                                        } catch (error) {
                                            console.log("ERROR", error);
                                            getFavs();
                                        }
                                    },
                                    children: [
                                        " ",
                                        currentAction === "movies" ? FavouriteMovies && FavouriteMovies?.filter((item)=>item?.info?.url === currentRecentItem?.info?.url).length > 0 ? "Remove from Favourites" : "Add to Favourites" : favouriteSeries && favouriteSeries?.filter((item)=>item?.info?.url === currentRecentItem?.info?.url).length > 0 ? "Remove from Favourites" : "Add to Favourites"
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    onClick: removeItemFromRecents,
                                    children: "Remove from Row"
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_utils_parentalLock__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .Z, {
                action: "verify",
                open: showParentalLock,
                close: ()=>setShowParentalLock(false),
                completed: ()=>{
                    parentalVerified.toggle(true);
                    const encryptedName = encodeURIComponent(crypto_js__WEBPACK_IMPORTED_MODULE_8__.AES.encrypt(clickedAdultItem.name, "thisismovie").toString());
                    router.push({
                        pathname: `/dashboard/preview/${currentAction}/m3u/${encryptedName}`,
                        query: {
                            id: getStreamIdFromUrl(clickedAdultItem.url),
                            stream: crypto_js__WEBPACK_IMPORTED_MODULE_8__.AES.encrypt(clickedAdultItem.url, "thisisurl").toString()
                        }
                    });
                }
            }),
            loading || m3uLoading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_utils_loading__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {}) : isFormatted ? currentSelected && currentSelected.length === 0 || currentAction === "movies" && movieCategories.length === 0 || currentAction === "series" && seriesCategories.length === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "no-data-found-container",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_6___default()), {
                        src: _assets_noContentFound_svg__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .Z
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                        className: "no-data-found",
                        children: [
                            "No ",
                            currentAction,
                            " found"
                        ]
                    })
                ]
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: view === "movies" && movies && movies.length > 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_virtualized__WEBPACK_IMPORTED_MODULE_4__.List, {
                    width: windowSize.width - 10,
                    className: "categores-render-list",
                    scrollToIndex: scrolled.m,
                    height: windowSize.height,
                    rowHeight: 350,
                    rowRenderer: renderMovie,
                    rowCount: movieCategories?.length + (FavouriteMovies && FavouriteMovies.length > 0 ? 1 : 0) + (recents && recents.length > 0 ? 1 : 0),
                    overscanRowCount: 3
                }) : view === "series" && series && series.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_virtualized__WEBPACK_IMPORTED_MODULE_4__.List, {
                    width: windowSize.width - 10,
                    scrollToIndex: scrolled.s,
                    className: "categores-render-list",
                    height: windowSize.height,
                    rowHeight: 350,
                    rowRenderer: renderSeries,
                    rowCount: seriesCategories?.length + (favouriteSeries && favouriteSeries.length > 0 ? 1 : 0) + (recents && recents.length > 0 ? 1 : 0),
                    overscanRowCount: 3
                })
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    M3uData?.length > 0 && !isFormatted && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "input-wrapper-div",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                type: "text",
                                placeholder: "Search by Title",
                                value: searchTerm,
                                onChange: (e)=>searchHandler(e.target.value),
                                className: "search-input"
                            }),
                            searchTerm && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_19___default()), {
                                className: "input-close",
                                onClick: clearHandler
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            margin: "auto",
                            width: "80vw"
                        },
                        children: [
                            M3uData?.length > 0 && !noData && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(VirtualizedGrid, {
                                data: filteredData?.length > 0 ? filteredData : M3uData,
                                onItemClick: (url)=>{
                                    urlHandler(url);
                                    m3u.toggle(true);
                                    isPlayerOpen.toggle(true);
                                    setIsPlayerOpen(true);
                                }
                            }),
                            noData && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "no-data-found-container",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        alt: "placeholder",
                                        src: _assets_noContentFound_svg__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .Z.src
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                        className: "no-data-found",
                                        children: "No data found related to search"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            isPlayerOPen ? currentPlayer.player === "videojs" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_utils_player_videojs__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .Z, {
                type: currentAction,
                // timeline={"00.00"}
                id: 1,
                close: ()=>{
                    setIsPlayerOpen(false);
                    isPlayerOpen.toggle(false);
                },
                src: url,
                loginType: "player-api",
                info: {
                    movie_data: {
                        stream_id: 1
                    }
                },
                fav: true
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_utils_player__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .Z, {
                type: currentAction,
                timeline: "00.00",
                id: 1,
                close: ()=>{
                    setIsPlayerOpen(false);
                    isPlayerOpen.toggle(false);
                },
                src: url,
                loginType: "player-api",
                info: {
                    movie_data: {
                        stream_id: 1
                    }
                },
                fav: true
            }) : null
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (M3uList);


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

/***/ 4265:
/***/ (() => {



/***/ })

};
;