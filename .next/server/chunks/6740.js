exports.id = 6740;
exports.ids = [6740];
exports.modules = {

/***/ 6740:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1484);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9332);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1536);
/* harmony import */ var _contexts_app__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2805);
/* harmony import */ var _firebase_functions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2313);
/* harmony import */ var _pages_dashboard_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3689);
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3015);
/* harmony import */ var swiper_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7644);
/* harmony import */ var swiper_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(swiper_css__WEBPACK_IMPORTED_MODULE_11__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swiper_react__WEBPACK_IMPORTED_MODULE_10__]);
swiper_react__WEBPACK_IMPORTED_MODULE_10__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/* __next_internal_client_entry_do_not_use__ default auto */ 











const CategoryMorePage = ()=>{
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_4__.useSearchParams)();
    const catId = searchParams?.get("cat_id");
    const catName = searchParams?.get("cat_name");
    const action = searchParams?.get("action") || "movies";
    const { user, alert, streamData, parentalPin } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_contexts_app__WEBPACK_IMPORTED_MODULE_7__/* .AppContext */ .I);
    const { movies, series } = streamData;
    const currentSelected = action === "series" ? series : movies;
    const currentKeys = {
        id: action === "series" ? "series_id" : "stream_id",
        image: action === "series" ? "cover" : "stream_icon"
    };
    const [finalAddress, setFinalAddress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [favouriteIds, setFavouriteIds] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [myListIds, setMyListIds] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [hoveredCard, setHoveredCard] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const hoverTimer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [windowSize, setWindowSize] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        width: 0,
        height: 0
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
        const handleResize = ()=>setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        window.addEventListener("resize", handleResize);
        return ()=>window.removeEventListener("resize", handleResize);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (user) {
            let rawAddress = user.server_url || user.url || user.host;
            if (rawAddress) {
                const cleanAddress = rawAddress.replace(/https?:\/\//, "").replace(/:\d+$/, "").replace(/\//g, "");
                setFinalAddress(cleanAddress);
            }
        }
    }, [
        user
    ]);
    const fetchFavsAndList = async ()=>{
        if (!finalAddress) return;
        try {
            const itemPath = action === "series" ? "Series" : "Movie";
            const favRes = await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_8__/* .getFavourites */ .on)(itemPath, finalAddress);
            const favVal = favRes?.val() || {};
            setFavouriteIds(Object.keys(favVal));
            const movieWatchlistRes = await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_8__/* .getWatchlist */ .uT)("Movie", finalAddress);
            const seriesWatchlistRes = await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_8__/* .getWatchlist */ .uT)("Series", finalAddress);
            const movieVal = Object.keys(movieWatchlistRes?.val() || {});
            const seriesVal = Object.keys(seriesWatchlistRes?.val() || {});
            setMyListIds([
                ...movieVal,
                ...seriesVal
            ]);
        } catch (e) {
            console.log("Error fetching favs/list:", e);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (finalAddress) {
            fetchFavsAndList();
        }
    }, [
        finalAddress
    ]);
    const handleFavourites = async (id, isFav, mediaType)=>{
        if (!finalAddress) return;
        const itemPath = mediaType === "series" ? "Series" : "Movie";
        try {
            if (isFav) {
                await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_8__/* .removeFromFavs */ .h2)(id, itemPath, finalAddress);
                alert.toggle({
                    title: "Removed from Favourites",
                    show: true,
                    type: "success"
                });
            } else {
                await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_8__/* .addToFavs */ .zg)(id, itemPath, finalAddress);
                alert.toggle({
                    title: "Added to Favourites",
                    show: true,
                    type: "success"
                });
            }
            fetchFavsAndList();
        } catch (err) {
            console.log(err);
        }
    };
    const handleMyList = async (id, isListed, mediaType)=>{
        if (!finalAddress) return;
        const itemPath = mediaType === "series" ? "Series" : "Movie";
        try {
            if (isListed) {
                await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_8__/* .removeFromWatchlist */ .BZ)(id, itemPath, finalAddress);
                alert.toggle({
                    title: "Removed from My List",
                    show: true,
                    type: "success"
                });
            } else {
                await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_8__/* .addToWatchlist */ .FW)(id, itemPath, finalAddress);
                alert.toggle({
                    title: "Added to My List",
                    show: true,
                    type: "success"
                });
            }
            fetchFavsAndList();
        } catch (err) {
            console.log(err);
        }
    };
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
    const filteredMovies = react__WEBPACK_IMPORTED_MODULE_1___default().useMemo(()=>{
        if (!currentSelected?.streams) return [];
        if (!catId) return currentSelected.streams;
        return currentSelected.streams.filter((item)=>String(item.category_id) === String(catId) || item.categories && item.categories.map(String).includes(String(catId)));
    }, [
        currentSelected,
        catId
    ]);
    const HoverCard = ()=>{
        if (!hoveredCard || !hoveredCard.item || !hoveredCard.rect) return null;
        const { item, rect } = hoveredCard;
        const id = item[currentKeys.id] || item.stream_id || item.series_id || item.id;
        const title = item.name || item.title || item.info?.name || "";
        const imgUrl = item[currentKeys.image] || item.cover || item.stream_icon || item.info?.cover;
        const rating = Number(item.rating).toFixed(1);
        const isFavourite = favouriteIds.includes(String(id));
        const isMyList = myListIds.includes(String(id));
        const cardWidth = 310;
        const cardHeight = 350;
        let left = rect.left + rect.width / 2 - cardWidth / 2;
        let top = rect.top - 15;
        const screenW = windowSize.width || ( false ? 0 : 1200);
        const screenH = windowSize.height || ( false ? 0 : 800);
        if (left < 15) left = 15;
        if (left + cardWidth > screenW - 15) left = Math.max(15, screenW - cardWidth - 15);
        if (top < 85) top = Math.max(85, rect.top);
        if (top + cardHeight > screenH - 15) top = Math.max(85, screenH - cardHeight - 15);
        const handlePlayClick = ()=>{
            router.push(`/dashboard/preview/${action}/${id}?state=play`);
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
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                src: imgUrl,
                                alt: title,
                                onError: (e)=>{
                                    e.target.onerror = null;
                                    e.target.src = _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.src || _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z;
                                }
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
                                        type: "button",
                                        onClick: ()=>handleMyList(id, isMyList, action),
                                        className: `hover-card-add-btn ${isMyList ? "active" : ""}`,
                                        title: isMyList ? "In My List" : "Add to My List",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                            width: "18",
                                            height: "18",
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
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "button",
                                        onClick: ()=>handleFavourites(id, isFavourite, action),
                                        className: `hover-card-fav-btn ${isFavourite ? "active" : ""}`,
                                        title: isFavourite ? "Remove from Favourites" : "Add to Favourites",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                            width: "18",
                                            height: "18",
                                            viewBox: "0 0 24 24",
                                            fill: isFavourite ? "#e50914" : "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                            })
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
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "hover-card-tags",
                                        children: [
                                            rating !== "NaN" && Number(item.rating) > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "hover-tag rating",
                                                children: [
                                                    "★ ",
                                                    rating
                                                ]
                                            }),
                                            item.added && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "hover-tag",
                                                children: (0,_pages_dashboard_list__WEBPACK_IMPORTED_MODULE_9__.formattedDate)(item.added)
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "hover-tag",
                                                children: action === "series" ? "Series" : "Movie"
                                            })
                                        ]
                                    }),
                                    item.plot || item.description ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "hover-card-plot",
                                        children: item.plot || item.description
                                    }) : null
                                ]
                            })
                        ]
                    })
                ]
            })
        });
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "category-full-page",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "category-view-header",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        onClick: ()=>router.back(),
                        className: "category-back-btn",
                        type: "button",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                width: "20",
                                height: "20",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2.5",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("polyline", {
                                    points: "15 18 9 12 15 6"
                                })
                            }),
                            "Back"
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                        className: "category-view-title-center",
                        children: catName || "Category"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "header-spacer"
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "category-full-grid",
                children: filteredMovies?.map((movie, index)=>{
                    const id = movie[currentKeys.id] || movie.stream_id || movie.series_id;
                    const imgUrl = movie[currentKeys.image] || movie.cover || movie.stream_icon;
                    const name = movie.name || movie.title || "";
                    const rating = Number(movie.rating).toFixed(1);
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        onClick: ()=>router.push(`/dashboard/preview/${action}/${id}?state=play`),
                        onMouseEnter: (e)=>handleCardMouseEnter(e, movie),
                        onMouseLeave: handleCardMouseLeave,
                        className: "item",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "caption",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "control",
                                        children: rating !== "NaN" && Number(movie.rating) > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "count",
                                            children: [
                                                "★ ",
                                                rating
                                            ]
                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {})
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "info",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("text", {
                                            children: catName || ""
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "h2",
                                        children: name
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "thumb",
                                children: imgUrl ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    src: imgUrl,
                                    alt: name,
                                    onError: (e)=>{
                                        e.target.onerror = null;
                                        e.target.style.display = "none";
                                    }
                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_5___default()), {
                                    alt: "placeholder",
                                    layout: "fill",
                                    src: _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z,
                                    objectFit: "cover"
                                })
                            })
                        ]
                    }, id || index);
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(HoverCard, {})
        ]
    });
};
const MoreLikeThis = ({ movies: propsMovies })=>{
    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_4__.useSearchParams)();
    const catId = searchParams?.get("cat_id");
    const catName = searchParams?.get("cat_name");
    if (catId || catName) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CategoryMorePage, {});
    }
    const [windowWidth, setWindowWidth] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setWindowWidth(window.innerWidth);
        const handleResize = ()=>setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return ()=>window.removeEventListener("resize", handleResize);
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "more-like-this-container",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "h3",
                children: "More Like This"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_10__.Swiper, {
                style: {
                    padding: 10
                },
                slidesPerView: windowWidth ? Math.min((windowWidth - 20) / 205) : 7,
                children: propsMovies?.map((movie, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_10__.SwiperSlide, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                            href: `/dashboard/preview/movies/${movie.stream_id}?state=play`,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "item",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "caption",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "control",
                                                children: Number(movie.rating).toFixed(1) !== "NaN" && Number(movie.rating) !== 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "count",
                                                    children: Number(movie.rating).toFixed(1)
                                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {})
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "h2",
                                                children: movie.name
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "thumb",
                                        children: movie.stream_icon && movie.stream_icon.length > 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: movie.stream_icon,
                                            alt: movie.name
                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_5___default()), {
                                            alt: "placeholder",
                                            layout: "fill",
                                            src: _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z
                                        })
                                    })
                                ]
                            })
                        })
                    }, index))
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MoreLikeThis);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7644:
/***/ (() => {



/***/ }),

/***/ 1484:
/***/ (() => {



/***/ })

};
;