exports.id = 5221;
exports.ids = [5221];
exports.modules = {

/***/ 5221:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5035);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_parentalLock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4066);
/* harmony import */ var _contexts_app__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2805);
/* harmony import */ var _firebase_functions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2313);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1536);
/* harmony import */ var _assets_noContentFound_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(614);
/* harmony import */ var _utils_local__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5976);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8917);












const SearchedItems = ()=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const { user, streamData } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_contexts_app__WEBPACK_IMPORTED_MODULE_5__/* .AppContext */ .I);
    const [movies, setMovies] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [series, setSeries] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [liveStreams, setLiveStreams] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [moviesFavs, setMoviesFavs] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [seriesFavs, setSeriesFavs] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [liveStreamsFavs, setLiveStreamsFavs] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [noData, setNoData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [currentTab, setCurrentTab] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("Movies");
    const [showParentalLock, setShowParentalLock] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [currentSelected, setCurrentSelected] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [currentItem, setCurrentItem] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [errorIndex, setErrorIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [searchTerm, setSearchTerm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [hoveredCard, setHoveredCard] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const hoverTimer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const handleCardMouseEnter = (e, item)=>{
        if (!item) return;
        const target = e.currentTarget;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        if (!rect || rect.width === 0 && rect.height === 0) return;
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        hoverTimer.current = setTimeout(()=>{
            setHoveredCard({
                item,
                rect
            });
        }, 120);
    };
    const handleCardMouseLeave = (e)=>{
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        const relatedTarget = e?.relatedTarget;
        if (relatedTarget && relatedTarget.closest && relatedTarget.closest(".hover-preview-card-portal")) {
            return;
        }
        setHoveredCard(null);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleScroll = ()=>{
            if (hoverTimer.current) clearTimeout(hoverTimer.current);
            setHoveredCard(null);
        };
        window.addEventListener("scroll", handleScroll, {
            passive: true
        });
        return ()=>window.removeEventListener("scroll", handleScroll);
    }, []);
    const handleTab = (newtab)=>{
        setCurrentTab(newtab);
        if (newtab === "Movies") {
            setCurrentSelected(movies);
        } else if (newtab === "Series") {
            setCurrentSelected(series);
        } else {
            setCurrentSelected(liveStreams);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        handleTab(currentTab);
    }, [
        movies,
        series,
        liveStreams
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (user) {
            getFavs(setMoviesFavs, "Movie");
            getFavs(setSeriesFavs, "Series");
            getFavs(setLiveStreamsFavs, "LiveTv");
        }
    }, [
        user
    ]);
    const getFavs = async (setFn, type)=>{
        try {
            const response = await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .getFavourites */ .on)(type, user.dbAddress);
            if (response.val()) {
                const data = Object.keys(response.val());
                setFn(data);
            } else {
                setFn([]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const parentalPin = (0,_utils_local__WEBPACK_IMPORTED_MODULE_11__/* .getParentalPin */ .A)("currentUser");
    const isAdult = (data)=>{
        if (!data || !streamData) return false;
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
        const { streamCategories: moviesCategories = [] } = streamData.movies || {};
        const { streamCategories: seriesCategories = [] } = streamData.series || {};
        const { streamCategories: liveTvCategories = [] } = streamData.liveTv || {};
        const combinedCategories = currentTab === "LiveTv" ? liveTvCategories : currentTab === "Movies" ? moviesCategories : currentTab === "Series" ? seriesCategories : [];
        const { category_id, categories, category_ids } = data;
        let adultCategoryIds = [];
        adultArray.forEach((item)=>{
            const adultCategoryId = combinedCategories.filter((ctg)=>ctg?.category_name?.toLowerCase().includes(item.toLowerCase()))[0]?.category_id;
            if (adultCategoryId) {
                adultCategoryIds.push(adultCategoryId);
            }
        });
        const match = category_id ? category_id : categories ? categories[0] : category_ids ? category_ids[0] : null;
        return match && adultCategoryIds.filter((id)=>String(id) === String(match)).length > 0;
    };
    const handleItem = (item)=>{
        const idKey = currentTab === "Movies" || currentTab === "LiveTv" ? "stream_id" : "series_id";
        const streamId = item[idKey] || item.stream_id || item.series_id || item.id || item.num;
        setCurrentItem(item);
        if (currentTab === "LiveTv") {
            if (isAdult(item) && parentalPin) {
                setShowParentalLock(true);
            } else {
                router.push(`/dashboard/live?view=${streamId}`);
            }
        } else {
            if (isAdult(item) && parentalPin) {
                setShowParentalLock(true);
            } else {
                const type = currentTab === "Movies" ? "movies" : "series";
                router.push(`/dashboard/preview/${type}/${streamId}?state=play`);
            }
        }
    };
    const handlePinVerified = ()=>{
        const idKey = currentTab === "Movies" || currentTab === "LiveTv" ? "stream_id" : "series_id";
        const streamId = currentItem[idKey] || currentItem.stream_id || currentItem.series_id || currentItem.id || currentItem.num;
        if (currentTab === "LiveTv") {
            router.push(`/dashboard/live?view=${streamId}`);
        } else {
            const type = currentTab === "Movies" ? "movies" : "series";
            router.push(`/dashboard/preview/${type}/${streamId}?state=play`);
        }
        setShowParentalLock(false);
    };
    const deduplicate = (arr, idKey)=>{
        if (!arr || !Array.isArray(arr)) return [];
        const seen = new Set();
        return arr.filter((item)=>{
            const id = item[idKey] || item.stream_id || item.series_id || item.id || item.name;
            if (!id || seen.has(String(id))) return false;
            seen.add(String(id));
            return true;
        });
    };
    const handleSearch = (e)=>{
        const value = e.target.value;
        setSearchTerm(value);
        if (!value.trim()) {
            setMovies([]);
            setSeries([]);
            setLiveStreams([]);
            setNoData(false);
            return;
        }
        const searchedMovies = deduplicate((streamData.movies?.streams || []).filter((movie)=>movie?.name?.toLowerCase().includes(value.toLowerCase())), "stream_id");
        const searchedSeries = deduplicate((streamData.series?.streams || []).filter((serie)=>serie?.name?.toLowerCase().includes(value.toLowerCase())), "series_id");
        const searchedLiveStreams = deduplicate((streamData.liveTv?.streams || []).filter((stream)=>stream?.name?.toLowerCase().includes(value.toLowerCase())), "stream_id");
        setMovies(searchedMovies);
        setSeries(searchedSeries);
        setLiveStreams(searchedLiveStreams);
        if (searchedMovies.length === 0 && searchedSeries.length === 0 && searchedLiveStreams.length === 0) {
            setNoData(true);
        } else {
            setNoData(false);
            if (searchedMovies.length > 0) {
                setCurrentTab("Movies");
            } else if (searchedSeries.length > 0) {
                setCurrentTab("Series");
            } else {
                setCurrentTab("LiveTv");
            }
        }
    };
    const HoverCard = ()=>{
        if (!hoveredCard || !hoveredCard.item || !hoveredCard.rect) return null;
        const { item, rect } = hoveredCard;
        const idKey = currentTab === "Movies" || currentTab === "LiveTv" ? "stream_id" : "series_id";
        const id = item[idKey] || item.stream_id || item.series_id || item.id || item.num;
        const title = item.name || item.title || "";
        const imgUrl = item.stream_icon || item.cover;
        const rating = Number(item.rating || 0).toFixed(1);
        const cardWidth = 310;
        const cardHeight = 280;
        let left = rect.left + rect.width / 2 - cardWidth / 2;
        let top = rect.top - 15;
        const screenW =  false ? 0 : 1200;
        const screenH =  false ? 0 : 800;
        if (left < 15) left = 15;
        if (left + cardWidth > screenW - 15) left = Math.max(15, screenW - cardWidth - 15);
        if (top < 85) top = Math.max(85, rect.top);
        if (top + cardHeight > screenH - 15) top = Math.max(85, screenH - cardHeight - 15);
        const handlePlayClick = (e)=>{
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (!id) return;
            setHoveredCard(null);
            if (isAdult(item) && parentalPin) {
                setCurrentItem(item);
                setShowParentalLock(true);
                return;
            }
            if (currentTab === "LiveTv") {
                router.push(`/dashboard/live?view=${id}`);
            } else if (currentTab === "Series") {
                router.push(`/dashboard/preview/series/${id}?state=play&action=play`);
            } else {
                router.push(`/dashboard/preview/movies/${id}?state=play`);
            }
        };
        const favArr = currentTab === "Movies" ? moviesFavs : currentTab === "LiveTv" ? liveStreamsFavs : seriesFavs;
        const isFavourite = favArr.includes(String(id));
        const handleToggleMyList = async (e)=>{
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            const pathType = currentTab === "Movies" ? "Movie" : currentTab === "Series" ? "Series" : "LiveTv";
            try {
                if (isFavourite) {
                    await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .removeFromFavs */ .h2)(id, pathType, user.dbAddress);
                    await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .removeFromWatchlist */ .BZ)(id, pathType, user.dbAddress);
                } else {
                    await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .addToFavs */ .zg)(id, pathType, user.dbAddress);
                    await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_6__/* .addToWatchlist */ .FW)(item, pathType, user.dbAddress);
                }
                getFavs(setMoviesFavs, "Movie");
                getFavs(setSeriesFavs, "Series");
                getFavs(setLiveStreamsFavs, "LiveTv");
            } catch (err) {
                console.log("Toggle fav error", err);
            }
        };
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "hover-preview-card-portal",
            style: {
                position: "fixed",
                top: top,
                left: left,
                width: cardWidth,
                zIndex: 99999
            },
            onMouseEnter: ()=>{
                if (hoverTimer.current) clearTimeout(hoverTimer.current);
            },
            onMouseLeave: ()=>{
                setHoveredCard(null);
            },
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "hover-card-inner",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "hover-card-thumb",
                        children: [
                            imgUrl ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                src: imgUrl,
                                alt: title,
                                onError: (e)=>{
                                    e.target.onerror = null;
                                    e.target.src = _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z.src || _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z;
                                }
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_7___default()), {
                                alt: "placeholder",
                                layout: "fill",
                                objectFit: "contain",
                                src: _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "hover-card-thumb-grad"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "hover-card-body",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "hover-card-actions",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: handlePlayClick,
                                        className: "hover-card-play-btn",
                                        type: "button",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                                width: "18",
                                                height: "18",
                                                viewBox: "0 0 24 24",
                                                fill: "currentColor",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                    d: "M8 5v14l11-7z"
                                                })
                                            }),
                                            "Watch Now"
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        onClick: handleToggleMyList,
                                        title: isFavourite ? "Remove from My List" : "Add to My List",
                                        type: "button",
                                        style: {
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "8px",
                                            background: isFavourite ? "rgba(99, 102, 241, 0.25)" : "rgba(255, 255, 255, 0.12)",
                                            border: isFavourite ? "1px solid #6366f1" : "1px solid rgba(255, 255, 255, 0.2)",
                                            color: isFavourite ? "#818cf8" : "#ffffff",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease"
                                        },
                                        children: isFavourite ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                            width: "20",
                                            height: "20",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2.5",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("polyline", {
                                                points: "20 6 9 17 4 12"
                                            })
                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                            width: "20",
                                            height: "20",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2.5",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("line", {
                                                    x1: "12",
                                                    y1: "5",
                                                    x2: "12",
                                                    y2: "19"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("line", {
                                                    x1: "5",
                                                    y1: "12",
                                                    x2: "19",
                                                    y2: "12"
                                                })
                                            ]
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "hover-card-meta",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                        className: "hover-card-title",
                                        children: title
                                    }),
                                    rating !== "NaN" && Number(rating) > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "hover-card-tags",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "hover-tag rating",
                                            children: [
                                                "★ ",
                                                rating
                                            ]
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        });
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "searched-items",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_header__WEBPACK_IMPORTED_MODULE_10__["default"], {
                currentAction: "search"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "searched-items-container",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "search-input-container",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "search-input-wrapper",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                    className: "search-input-icon",
                                    width: "20",
                                    height: "20",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2.5",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                                            cx: "11",
                                            cy: "11",
                                            r: "8"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("line", {
                                            x1: "21",
                                            y1: "21",
                                            x2: "16.65",
                                            y2: "16.65"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    value: searchTerm,
                                    onChange: handleSearch,
                                    className: "search-input",
                                    type: "text",
                                    placeholder: "Search by Channel, Movies, and Series Name...",
                                    autoFocus: true
                                })
                            ]
                        })
                    }),
                    !noData && (movies.length > 0 || series.length > 0 || liveStreams.length > 0) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "tabs-container",
                        children: [
                            movies.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                onClick: ()=>handleTab("Movies"),
                                className: `tab ${currentTab === "Movies" ? "active" : ""}`,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "tab-title",
                                        children: "Movies"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "tab-count",
                                        children: movies.length
                                    })
                                ]
                            }),
                            series.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                onClick: ()=>handleTab("Series"),
                                className: `tab ${currentTab === "Series" ? "active" : ""}`,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "tab-title",
                                        children: "Series"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "tab-count",
                                        children: series.length
                                    })
                                ]
                            }),
                            liveStreams.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                onClick: ()=>handleTab("LiveTv"),
                                className: `tab ${currentTab === "LiveTv" ? "active" : ""}`,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "tab-title",
                                        children: "Live TV"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "tab-count",
                                        children: liveStreams.length
                                    })
                                ]
                            })
                        ]
                    }),
                    !noData && currentSelected.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "search-results-grid",
                        children: currentSelected.map((item, index)=>{
                            const idKey = currentTab === "Movies" || currentTab === "LiveTv" ? "stream_id" : "series_id";
                            const itemId = item[idKey] || item.stream_id || item.series_id || item.id || item.num;
                            const imgUrl = item.stream_icon || item.cover;
                            const rating = Number(item.rating).toFixed(1);
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                onClick: ()=>handleItem(item),
                                onMouseEnter: (e)=>handleCardMouseEnter(e, item),
                                onMouseLeave: handleCardMouseLeave,
                                className: "item",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "thumb",
                                        children: imgUrl ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: imgUrl,
                                            alt: item.name,
                                            style: {
                                                filter: isAdult(item) && parentalPin ? "blur(20px)" : "none"
                                            },
                                            onError: (e)=>{
                                                e.target.onerror = null;
                                                e.target.src = _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z.src || _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z;
                                            }
                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_7___default()), {
                                            alt: "placeholder",
                                            layout: "fill",
                                            objectFit: "cover",
                                            src: _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "caption",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "control",
                                                children: rating !== "NaN" && Number(rating) > 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "count",
                                                    children: rating
                                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {})
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "h2",
                                                children: item.name
                                            })
                                        ]
                                    })
                                ]
                            }, itemId || index);
                        })
                    }),
                    noData && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "no-data-found-container",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_7___default()), {
                                alt: "no content",
                                src: _assets_noContentFound_svg__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                                className: "no-data-found",
                                children: [
                                    'No results found for "',
                                    searchTerm,
                                    '"'
                                ]
                            })
                        ]
                    }),
                    !noData && !searchTerm && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "no-data-found-container",
                        style: {
                            paddingTop: 60
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                width: "64",
                                height: "64",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "#6366f1",
                                strokeWidth: "1.5",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                                        cx: "11",
                                        cy: "11",
                                        r: "8"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("line", {
                                        x1: "21",
                                        y1: "21",
                                        x2: "16.65",
                                        y2: "16.65"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                style: {
                                    color: "#ffffff",
                                    marginTop: 12
                                },
                                children: "Search for Movies, Series, or Live Channels"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                style: {
                                    color: "#94a3b8",
                                    fontSize: 14
                                },
                                children: "Type in the search box above to browse titles across all categories."
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_utils_parentalLock__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                        close: ()=>setShowParentalLock(false),
                        open: showParentalLock,
                        completed: handlePinVerified,
                        action: "verify"
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(HoverCard, {})
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchedItems);


/***/ }),

/***/ 5035:
/***/ (() => {



/***/ })

};
;