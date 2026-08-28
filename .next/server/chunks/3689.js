exports.id = 3689;
exports.ids = [3689];
exports.modules = {

/***/ 3689:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ list),
  formattedDate: () => (/* binding */ formattedDate)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "react-swipeable"
var external_react_swipeable_ = __webpack_require__(3789);
// EXTERNAL MODULE: ./src/utils/carousels/dashboard/styles.css
var styles = __webpack_require__(87);
;// CONCATENATED MODULE: ./src/utils/carousels/dashboard/index.jsx




const CarouselItem = ({ children, width })=>{
    return /*#__PURE__*/ jsx_runtime.jsx("div", {
        className: "carousel-item",
        style: {
            width: width
        },
        children: children
    });
};
const Carousel = ({ children })=>{
    const [activeIndex, setActiveIndex] = (0,external_react_.useState)(0);
    const [paused, setPaused] = (0,external_react_.useState)(false);
    const [timer, setTimer] = (0,external_react_.useState)(null);
    const updateIndex = (newIndex)=>{
        if (newIndex < 0) {
            newIndex = external_react_default().Children.count(children) - 1;
        } else if (newIndex >= external_react_default().Children.count(children)) {
            newIndex = 0;
        }
    // setActiveIndex(newIndex);
    };
    (0,external_react_.useEffect)(()=>{
        if (children.length > 0 && !timer) {
            setTimer(setInterval(()=>{
                // if (!paused) {
                // updateIndex(activeIndex + 1);
                setActiveIndex((prev)=>{
                    updateIndex(prev === children.length - 1 ? 0 : prev + 1);
                    return prev === children.length - 1 ? 0 : prev + 1;
                });
            // }
            }, 3000));
        }
    // return () => {
    //   if (interval) {
    //     clearInterval(interval);
    //   }
    // };
    }, [
        children
    ]);
    const handlers = (0,external_react_swipeable_.useSwipeable)({
        onSwipedLeft: ()=>updateIndex(activeIndex + 1),
        onSwipedRight: ()=>updateIndex(activeIndex - 1)
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        ...handlers,
        className: "carousel-dashboard",
        onMouseEnter: ()=>setPaused(true),
        onMouseLeave: ()=>setPaused(false),
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "inner",
                style: {
                    transform: `translateX(-${activeIndex * 100}%)`
                },
                children: external_react_default().Children.map(children, (child, index)=>{
                    return /*#__PURE__*/ external_react_default().cloneElement(child, {
                        width: "100%"
                    });
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "indicators",
                children: external_react_default().Children.map(children, (child, index)=>{
                    return /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: index === activeIndex ? "active-indicator" : "indicator",
                        onClick: ()=>{
                            clearInterval(timer);
                            setTimer(null);
                            updateIndex(index);
                            setActiveIndex(index);
                            setTimeout(()=>{
                                setTimer(setInterval(()=>{
                                    setActiveIndex((prev)=>{
                                        updateIndex(prev === children.length - 1 ? 0 : prev + 1);
                                        return prev === children.length - 1 ? 0 : prev + 1;
                                    });
                                }, 3000));
                            }, 2000);
                        }
                    });
                })
            })
        ]
    });
};
/* harmony default export */ const dashboard = (Carousel);

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(9332);
// EXTERNAL MODULE: external "react-virtualized"
var external_react_virtualized_ = __webpack_require__(6325);
// EXTERNAL MODULE: ./src/contexts/app.js
var app = __webpack_require__(2805);
// EXTERNAL MODULE: ./src/hooks/useApi.js
var useApi = __webpack_require__(592);
// EXTERNAL MODULE: ./src/firebase/functions.js
var functions = __webpack_require__(2313);
// EXTERNAL MODULE: ./src/utils/scrollable/index.jsx
var scrollable = __webpack_require__(707);
// EXTERNAL MODULE: external "firebase/database"
var database_ = __webpack_require__(6666);
// EXTERNAL MODULE: ./src/firebase/index.js
var firebase = __webpack_require__(8837);
// EXTERNAL MODULE: ./src/pages/dashboard/list/styles.css
var list_styles = __webpack_require__(1011);
// EXTERNAL MODULE: ./src/utils/parentalLock/index.jsx + 1 modules
var parentalLock = __webpack_require__(4066);
// EXTERNAL MODULE: ./src/utils/progress/index.jsx
var progress = __webpack_require__(9328);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./src/assets/placeholder.png
var placeholder = __webpack_require__(1536);
// EXTERNAL MODULE: ./src/assets/noContentFound.svg
var noContentFound = __webpack_require__(614);
// EXTERNAL MODULE: external "@mui/icons-material/MoreVert"
var MoreVert_ = __webpack_require__(6952);
// EXTERNAL MODULE: external "@mui/icons-material/Cancel"
var Cancel_ = __webpack_require__(3733);
var Cancel_default = /*#__PURE__*/__webpack_require__.n(Cancel_);
// EXTERNAL MODULE: external "@mui/icons-material/Info"
var Info_ = __webpack_require__(8792);
// EXTERNAL MODULE: ./src/pages/dashboard/list/m3u/index.jsx
var m3u = __webpack_require__(6819);
// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
;// CONCATENATED MODULE: ./src/pages/dashboard/list/index.jsx
























const options = {
    year: "numeric",
    month: "short",
    day: "2-digit"
};
const formattedDate = (givenDate)=>{
    const isNumber = /^[0-9]+$/.test(givenDate);
    const timestamp = new Date(isNumber ? Number(givenDate) : givenDate).getTime();
    return new Intl.DateTimeFormat("en-US", options).format(timestamp);
};
const AllList = ({ currentUser, currentAction })=>{
    const router = (0,navigation.useRouter)();
    const { user, streamData, alert, parentalVerified } = (0,external_react_.useContext)(app/* AppContext */.I);
    const { movies, series } = streamData;
    const currentSelected = currentAction === "series" ? series : movies;
    const currentKeys = {
        id: currentAction === "series" ? "series_id" : "stream_id",
        image: currentAction === "series" ? "cover" : "stream_icon"
    };
    const refs = (0,external_react_.useRef)([]);
    const listImagesRef = (0,external_react_.useRef)([]);
    let mouseDown = false;
    let startX, scrollLeft;
    const database = (0,database_.getDatabase)(firebase/* app */.l);
    const [windowSize, setWindowSize] = (0,external_react_.useState)({
        width: 0,
        height: 0
    });
    const [bannerMovies, setBannerMovies] = (0,external_react_.useState)([]);
    const [show, setShow] = (0,external_react_.useState)(false);
    const [FavouriteMovies, setFavouriteMovies] = (0,external_react_.useState)(null);
    const [recents, setRecents] = (0,external_react_.useState)([]);
    const [finalAddress, setFinalAddress] = (0,external_react_.useState)(null);
    const [showParentalLock, setShowParentalLock] = (0,external_react_.useState)(false);
    const [clickedAdultItem, setClickedAdultItem] = (0,external_react_.useState)(null);
    const [continueWatchingClicked, setContinueWatchingClicked] = (0,external_react_.useState)(false);
    const [currentRecentItem, setCurrentRecentItem] = (0,external_react_.useState)(null);
    const [hoveredCard, setHoveredCard] = (0,external_react_.useState)(null);
    const hoverTimer = (0,external_react_.useRef)(null);
    const [favouriteIds, setFavouriteIds] = (0,external_react_.useState)([]);
    const [myListIds, setMyListIds] = (0,external_react_.useState)([]);
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
    (0,external_react_.useEffect)(()=>{
        const handleScroll = ()=>{
            if (hoverTimer.current) clearTimeout(hoverTimer.current);
            setHoveredCard(null);
        };
        window.addEventListener("scroll", handleScroll, {
            passive: true
        });
        return ()=>window.removeEventListener("scroll", handleScroll);
    }, []);
    (0,external_react_.useEffect)(()=>{
        if (FavouriteMovies) {
            setFavouriteIds(FavouriteMovies.map((m)=>String(m[currentKeys.id] || m.stream_id || m.series_id || m.id)));
        }
    }, [
        FavouriteMovies,
        currentKeys.id
    ]);
    (0,external_react_.useEffect)(()=>{
        if (recents) {
            setMyListIds(recents.map((m)=>String(m.id || m.info?.[currentKeys.id] || m.info?.stream_id || m.info?.series_id)));
        }
    }, [
        recents,
        currentKeys.id
    ]);
    const recentlyAdded = external_react_default().useMemo(()=>{
        if (!currentSelected?.streams || currentSelected.streams.length === 0) return [];
        return [
            ...currentSelected.streams
        ].sort((a, b)=>Number(b.added || b.last_modified || 0) - Number(a.added || a.last_modified || 0)).slice(0, 10);
    }, [
        currentSelected
    ]);
    const RecentlyAddedSection = external_react_default().useCallback(()=>{
        if (!recentlyAdded || recentlyAdded.length === 0) return null;
        return /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
            className: "category top10-category-section",
            children: [
                /*#__PURE__*/ jsx_runtime.jsx("span", {
                    className: "h3",
                    children: "Recently Added"
                }),
                /*#__PURE__*/ jsx_runtime.jsx(scrollable/* default */.Z, {
                    children: /*#__PURE__*/ jsx_runtime.jsx("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            paddingLeft: 10,
                            paddingTop: 10,
                            paddingBottom: 15
                        },
                        children: recentlyAdded.map((movie, index)=>{
                            const id = movie[currentKeys.id] || movie.stream_id || movie.series_id;
                            const imgUrl = movie[currentKeys.image] || movie.cover || movie.stream_icon;
                            const name = movie.name || movie.title || "";
                            const handleItem = ()=>{
                                router.push(`/dashboard/preview/${currentAction}/${id}`);
                            };
                            return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                onClick: handleItem,
                                onMouseEnter: (e)=>handleCardMouseEnter(e, movie),
                                onMouseLeave: handleCardMouseLeave,
                                className: "top10-card-wrapper",
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("span", {
                                        className: "top10-rank-number",
                                        children: index + 1
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: "top10-poster-card",
                                        children: [
                                            imgUrl ? /*#__PURE__*/ jsx_runtime.jsx("img", {
                                                src: imgUrl,
                                                alt: name,
                                                className: "top10-poster-img",
                                                onError: (e)=>{
                                                    e.target.onerror = null;
                                                    e.target.src = placeholder/* default */.Z.src || placeholder/* default */.Z;
                                                }
                                            }) : /*#__PURE__*/ jsx_runtime.jsx((image_default()), {
                                                alt: "placeholder",
                                                layout: "fill",
                                                src: placeholder/* default */.Z,
                                                objectFit: "cover"
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                className: "top10-badge",
                                                children: "RECENTLY ADDED"
                                            })
                                        ]
                                    })
                                ]
                            }, id || index);
                        })
                    })
                })
            ]
        });
    }, [
        recentlyAdded,
        currentKeys,
        currentAction,
        handleCardMouseEnter,
        handleCardMouseLeave
    ]);
    const handleMyList = async (id, isMyList, action)=>{
        const strId = String(id);
        const itemAction = action || currentAction;
        const pathType = itemAction === "movies" ? "Movie" : itemAction === "series" ? "Series" : "LiveTv";
        if (isMyList) {
            setMyListIds((prev)=>prev.filter((i)=>i !== strId));
            setFavouriteIds((prev)=>prev.filter((i)=>i !== strId));
            if (alert?.toggle) alert.toggle({
                title: "Removed from My List",
                show: true,
                type: "success"
            });
        } else {
            setMyListIds((prev)=>[
                    ...prev,
                    strId
                ]);
            setFavouriteIds((prev)=>[
                    ...prev,
                    strId
                ]);
            if (alert?.toggle) alert.toggle({
                title: "Added to My List",
                show: true,
                type: "success"
            });
        }
        try {
            if (isMyList) {
                await (0,functions/* removeFromFavs */.h2)(strId, pathType, finalAddress);
                await removeFromWatchlist(strId, pathType, finalAddress);
            } else {
                await (0,functions/* addToFavs */.zg)(strId, pathType, finalAddress);
                await addToWatchlist(strId, pathType, finalAddress);
            }
            getFavs();
        } catch (err) {
            console.log("Firebase sync error:", err);
        }
    };
    const HoverCard = ()=>{
        if (!hoveredCard || !hoveredCard.item || !hoveredCard.rect) return null;
        const { item, rect } = hoveredCard;
        const id = item[currentKeys.id] || item.stream_id || item.series_id || item.id;
        const title = item.name || item.title || item.info?.name || "";
        const imgUrl = item[currentKeys.image] || item.cover || item.stream_icon || item.info?.cover;
        const rating = Number(item.rating || item.info?.rating || 0).toFixed(1);
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
        const handlePlayClick = (e)=>{
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            const actionType = item.actionType || (currentAction === "series" ? "series" : "movies");
            const streamId = item[currentKeys.id] || item.stream_id || item.series_id || item.id;
            if (!streamId) return;
            setHoveredCard(null);
            if (actionType === "live") {
                router.push(`/dashboard/live?view=${streamId}`);
            } else {
                router.push(`/dashboard/preview/${actionType}/${streamId}?state=play`);
            }
        };
        return /*#__PURE__*/ jsx_runtime.jsx("div", {
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
            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "hover-card-inner",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "hover-card-thumb",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("img", {
                                src: imgUrl,
                                alt: title,
                                onError: (e)=>{
                                    e.target.onerror = null;
                                    e.target.src = placeholder/* default */.Z.src || placeholder/* default */.Z;
                                }
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("div", {
                                className: "hover-card-thumb-grad"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "hover-card-body",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "hover-card-actions",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("button", {
                                        onClick: handlePlayClick,
                                        className: "hover-card-play-btn",
                                        type: "button",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx("svg", {
                                                width: "18",
                                                height: "18",
                                                viewBox: "0 0 24 24",
                                                fill: "currentColor",
                                                children: /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                    d: "M8 5v14l11-7z"
                                                })
                                            }),
                                            "Watch Now"
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("button", {
                                        type: "button",
                                        onClick: ()=>handleMyList(id, isMyList, currentAction),
                                        className: `hover-card-add-btn ${isMyList ? "active" : ""}`,
                                        title: isMyList ? "In My List" : "Add to My List",
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
                                            width: "18",
                                            height: "18",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2.5",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx("line", {
                                                    x1: "12",
                                                    y1: "5",
                                                    x2: "12",
                                                    y2: "19"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("line", {
                                                    x1: "5",
                                                    y1: "12",
                                                    x2: "19",
                                                    y2: "12"
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("button", {
                                        type: "button",
                                        onClick: ()=>handleFavourites(id, isFavourite),
                                        className: `hover-card-fav-btn ${isFavourite ? "active" : ""}`,
                                        title: isFavourite ? "Remove from Favourites" : "Add to Favourites",
                                        children: /*#__PURE__*/ jsx_runtime.jsx("svg", {
                                            width: "18",
                                            height: "18",
                                            viewBox: "0 0 24 24",
                                            fill: isFavourite ? "#e50914" : "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            children: /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                            })
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "hover-card-meta",
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("h4", {
                                        className: "hover-card-title",
                                        children: title
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: "hover-card-tags",
                                        children: [
                                            rating !== "NaN" && Number(rating) > 0 && /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                                className: "hover-tag rating",
                                                children: [
                                                    "★ ",
                                                    rating
                                                ]
                                            }),
                                            item.added && /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                className: "hover-tag",
                                                children: formattedDate(item.added)
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                className: "hover-tag",
                                                children: currentAction === "series" ? "Series" : "Movie"
                                            })
                                        ]
                                    }),
                                    item.plot || item.description ? /*#__PURE__*/ jsx_runtime.jsx("p", {
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
    const path = currentAction === "movies" ? "Movie" : "Series";
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
    const isAdult = (data)=>{
        if (!data || !streamData) return false;
        const catId = data.category_id || data.categories && data.categories[0] || data.category_ids && data.category_ids[0];
        const allCategories = [
            ...streamData.movies?.streamCategories || [],
            ...streamData.series?.streamCategories || [],
            ...streamData.liveTv?.streamCategories || []
        ];
        const foundCategory = allCategories.find((c)=>String(c.category_id) === String(catId));
        const categoryName = foundCategory?.category_name || "";
        return adultArray.some((kw)=>categoryName.toLowerCase().includes(kw.toLowerCase()));
    };
    const findItem = (id)=>{
        if (!id || !streamData) return null;
        const sId = String(id);
        const mItem = (streamData.movies?.streams || []).find((m)=>String(m.stream_id || m.id || m.num) === sId);
        if (mItem) return {
            ...mItem,
            actionType: "movies",
            itemType: "Movie"
        };
        const sItem = (streamData.series?.streams || []).find((s)=>String(s.series_id || s.id || s.num) === sId);
        if (sItem) return {
            ...sItem,
            actionType: "series",
            itemType: "Series"
        };
        const lItem = (streamData.liveTv?.streams || []).find((l)=>String(l.stream_id || l.id || l.num) === sId);
        if (lItem) return {
            ...lItem,
            actionType: "live",
            itemType: "Live TV"
        };
        return null;
    };
    const isMyListTab = currentAction === "mylist" || currentAction === "watchlist";
    const getFavs = async (values)=>{
        if (!finalAddress) return;
        try {
            if (isMyListTab) {
                const [movWatch, serWatch, liveWatch] = await Promise.all([
                    getWatchlist("Movie", finalAddress),
                    getWatchlist("Series", finalAddress),
                    getWatchlist("LiveTv", finalAddress)
                ]);
                let items = [];
                let allIds = [];
                const processSnap = (snap, defaultType)=>{
                    if (!snap?.val()) return;
                    Object.entries(snap.val()).forEach(([id, val])=>{
                        allIds.push(String(id));
                        if (typeof val === "object" && val !== null && (val.name || val.id)) {
                            items.push({
                                stream_id: val.id || id,
                                series_id: val.id || id,
                                id: val.id || id,
                                name: val.name || "",
                                cover: val.cover || val.stream_icon || "",
                                stream_icon: val.stream_icon || val.cover || "",
                                rating: val.rating || 0,
                                actionType: val.actionType || defaultType,
                                addedAt: val.addedAt || 0
                            });
                        } else {
                            const found = findItem(id);
                            if (found) {
                                items.push({
                                    ...found,
                                    addedAt: val
                                });
                            } else {
                                items.push({
                                    stream_id: id,
                                    series_id: id,
                                    id: id,
                                    name: `Saved ${defaultType === "movies" ? "Movie" : defaultType === "series" ? "Show" : "Channel"} (${id})`,
                                    actionType: defaultType,
                                    addedAt: val
                                });
                            }
                        }
                    });
                };
                processSnap(movWatch, "movies");
                processSnap(serWatch, "series");
                processSnap(liveWatch, "live");
                items.sort((a, b)=>(b.addedAt || 0) - (a.addedAt || 0));
                setFavouriteMovies(items);
                setMyListIds(allIds);
            } else {
                const response = await (0,functions/* getFavourites */.on)(path, finalAddress);
                const ids = response.val() ? Object.keys(response.val()) : [];
                if (ids && currentSelected.streams) {
                    let favs = [];
                    ids.forEach((id)=>{
                        const itemExists = currentSelected.streams.find((movie)=>String(movie[currentKeys.id] || movie.stream_id || movie.series_id || movie.id) === String(id));
                        if (itemExists) {
                            favs.push({
                                ...itemExists,
                                actionType: currentAction
                            });
                        }
                    });
                    setFavouriteMovies(favs);
                    setFavouriteIds(ids);
                } else {
                    setFavouriteMovies(null);
                }
            }
        } catch (error) {
            console.log("getFavs error:", error);
        }
    };
    const handleFavourites = async (id, liked)=>{
        try {
            if (liked) {
                await (0,functions/* removeFromFavs */.h2)(id, path, finalAddress);
                alert.toggle({
                    title: "Removed from Favourites",
                    show: true,
                    type: "success"
                });
            } else {
                await (0,functions/* addToFavs */.zg)(id, path, finalAddress);
                alert.toggle({
                    title: "Added to Favourites",
                    show: true,
                    type: "success"
                });
            }
        } catch (error) {
            console.log(error);
            alert.toggle({
                title: "Something went wrong",
                show: true,
                type: "error"
            });
        }
        getFavs();
    };
    const getRecent = async ()=>{
        try {
            if (isMyListTab) {
                const [movSnap, serSnap, liveSnap] = await Promise.all([
                    (0,functions/* getRecents */.B4)("Movie", finalAddress),
                    (0,functions/* getRecents */.B4)("Series", finalAddress),
                    (0,functions/* getRecents */.B4)("LiveTv", finalAddress)
                ]);
                let recentsArr = [];
                if (movSnap?.val() && streamData?.movies?.streams) {
                    Object.entries(movSnap.val()).forEach(([id, data])=>{
                        const info = streamData.movies.streams.find((m)=>String(m.stream_id || m.id) === String(id));
                        if (info) recentsArr.push({
                            id,
                            ...data,
                            info,
                            actionType: "movies"
                        });
                    });
                }
                if (serSnap?.val() && streamData?.series?.streams) {
                    Object.entries(serSnap.val()).forEach(([id, data])=>{
                        const info = streamData.series.streams.find((s)=>String(s.series_id || s.id) === String(id));
                        if (info) recentsArr.push({
                            id,
                            ...data,
                            info,
                            actionType: "series"
                        });
                    });
                }
                if (liveSnap?.val() && streamData?.liveTv?.streams) {
                    Object.entries(liveSnap.val()).forEach(([id, data])=>{
                        const info = streamData.liveTv.streams.find((l)=>String(l.stream_id || l.id) === String(id));
                        if (info) recentsArr.push({
                            id,
                            ...data,
                            info,
                            actionType: "live"
                        });
                    });
                }
                recentsArr.sort((a, b)=>(b.timestamp || 0) - (a.timestamp || 0));
                setRecents(recentsArr);
            } else {
                const response = await (0,functions/* getRecents */.B4)(path, finalAddress);
                if (response.val() && currentSelected.streams) {
                    const ids = Object.keys(response.val());
                    const data = Object.values(response.val());
                    const recentsArr = [];
                    ids.map((id, index)=>{
                        const info = currentSelected.streams.filter((movie)=>String(movie[currentKeys.id]) === String(id))[0];
                        const isShow = data[index].showInContinueWatchingList;
                        if (isShow) {
                            if (isShow === "true") {
                                recentsArr.push({
                                    id,
                                    ...data[index],
                                    info,
                                    actionType: currentAction
                                });
                            }
                        } else {
                            recentsArr.push({
                                id,
                                ...data[index],
                                info,
                                actionType: currentAction
                            });
                        }
                    });
                    const sorted = recentsArr.sort((objA, objB)=>objB.timestamp - objA.timestamp);
                    setRecents(sorted);
                } else {
                    setRecents([]);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const stopDragging = function(e, ref) {
        mouseDown = false;
        const nodes = ref.childNodes[0].childNodes[0].childNodes;
        nodes.forEach((el)=>{
            el.style.pointerEvents = "auto";
        });
    };
    const handleListDown = (e, ref)=>{
        mouseDown = true;
        startX = e.pageX - ref.childNodes[0].offsetLeft;
        scrollLeft = ref.childNodes[0].scrollLeft;
    };
    const handlelistMove = (e, ref)=>{
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
    const getParentalPin = (key)=>{
        if (!key || "undefined" === "undefined") {
            return "";
        }
        const user = localStorage.getItem(key);
        const retrievedUser = user && Object.values(JSON.parse(user))[0].parentalPin;
        return retrievedUser;
    };
    const parentalPin = getParentalPin("currentUser");
    const Category = external_react_default().useCallback(({ index })=>{
        const filtered = currentSelected?.streams.filter((movie)=>movie?.category_id === currentSelected.streamCategories[index].category_id || movie?.categories?.filter((id)=>String(id) === String(currentSelected.streamCategories[index].category_id)).length > 0);
        const [errorIndex, setErrorIndex] = (0,external_react_.useState)(null);
        const innerElement = (args)=>{
            const filteredComp = filtered[args.columnIndex];
            const { category_name, added, name } = filteredComp;
            const isFavourite = FavouriteMovies && FavouriteMovies.filter((movie)=>movie[currentKeys.id] === filteredComp[currentKeys.id]).length > 0;
            const category = currentSelected.streamCategories[index].category_name;
            const isAdult = adultArray.filter((item)=>category.toLowerCase().includes(item.toLowerCase())).length > 0;
            const handleItem = ()=>{
                if (parentalPin) {
                    if (isAdult) {
                        setClickedAdultItem(filteredComp[currentAction === "movies" ? "stream_id" : "series_id"]);
                        setShowParentalLock(true);
                    } else {
                        setShowParentalLock(false);
                        router.push(`/dashboard/preview/${currentAction}/${filteredComp[currentAction === "movies" ? "stream_id" : "series_id"]}`);
                    }
                } else {
                    router.push(`/dashboard/preview/${currentAction}/${filteredComp[currentAction === "movies" ? "stream_id" : "series_id"]}`);
                }
            };
            return /*#__PURE__*/ jsx_runtime.jsx("div", {
                style: {
                    ...args.style,
                    padding: 5,
                    paddingTop: 6
                },
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    onClick: handleItem,
                    onMouseEnter: (e)=>handleCardMouseEnter(e, filteredComp),
                    onMouseLeave: handleCardMouseLeave,
                    className: "item",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "caption",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                    className: "control",
                                    children: [
                                        Number(filteredComp.rating).toFixed(1) !== "NaN" && Number(filteredComp.rating) !== 0 ? /*#__PURE__*/ jsx_runtime.jsx("span", {
                                            className: "count",
                                            children: Number(filteredComp.rating).toFixed(1)
                                        }) : /*#__PURE__*/ jsx_runtime.jsx("span", {}),
                                        isFavourite && /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                            href: "javascript:void(0)",
                                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
                                                width: "30",
                                                height: "26",
                                                viewBox: "0 0 30 26",
                                                fill: "none",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                children: [
                                                    " ",
                                                    /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                        d: "M29.2239 7.73189C29.2239 8.12625 29.2239 8.52061 29.2239 8.91467C29.2091 8.99632 29.1875 9.07738 29.181 9.15933C29.0718 10.5385 28.6337 11.8136 27.9606 13.0141C27.113 14.5265 25.9933 15.827 24.7685 17.0364C21.7994 19.9679 18.5333 22.5639 15.3951 25.3043C15.0229 25.6294 14.5771 25.6093 14.1904 25.2874C13.8659 25.0173 13.5469 24.7404 13.2289 24.4623C10.706 22.2574 8.16057 20.0782 5.67077 17.8369C4.12678 16.4471 2.71503 14.9182 1.69378 13.0851C-0.0217981 10.006 -0.113805 6.88017 1.61036 3.78242C2.56563 2.06565 4.04069 0.913648 5.94354 0.375217C7.9733 -0.19901 9.91905 0.00807828 11.7287 1.14352C12.8804 1.86626 13.7579 2.85732 14.4765 3.99927C14.5827 4.1679 14.6862 4.33801 14.7629 4.46167C15.3081 3.75845 15.7856 3.01796 16.3841 2.39344C18.4931 0.19357 21.056 -0.47858 23.9434 0.472844C26.661 1.36835 28.2366 3.37771 28.9393 6.10329C29.0762 6.63521 29.131 7.18843 29.2239 7.73189Z",
                                                        fill: "#FF0000"
                                                    }),
                                                    " "
                                                ]
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("span", {
                                    className: "info",
                                    children: /*#__PURE__*/ jsx_runtime.jsx("text", {
                                        children: category_name
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("span", {
                                    className: "h2",
                                    children: name
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "thumb",
                            children: [
                                errorIndex === args.columnIndex ? /*#__PURE__*/ jsx_runtime.jsx((image_default()), {
                                    alt: "placeholder",
                                    src: placeholder/* default */.Z
                                }) : filteredComp[currentKeys.image] ? /*#__PURE__*/ jsx_runtime.jsx("img", {
                                    style: {
                                        filter: isAdult && parentalPin && "blur(20px)"
                                    },
                                    onError: ()=>setErrorIndex(args.columnIndex),
                                    src: filteredComp[currentKeys.image],
                                    ref: (element)=>listImagesRef.current[index] = element
                                }) : /*#__PURE__*/ jsx_runtime.jsx((image_default()), {
                                    alt: "placeholder",
                                    src: placeholder/* default */.Z,
                                    ref: (element)=>listImagesRef.current[index] = element
                                }),
                                isAdult && parentalPin && /*#__PURE__*/ jsx_runtime.jsx("svg", {
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
                                    children: /*#__PURE__*/ jsx_runtime.jsx("path", {
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
            e.preventDefault();
            const x = e.touches[0].clientX - ref.childNodes[0].offsetLeft;
            const scroll = x - startX;
            ref.childNodes[0].scrollLeft = scrollLeft - scroll;
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
            mouseDown = true;
            startX = e.touches[0].clientX - ref.childNodes[0].offsetLeft;
            scrollLeft = ref.childNodes[0].scrollLeft;
        };
        const [canScrollLeft, setCanScrollLeft] = (0,external_react_.useState)(false);
        const [canScrollRight, setCanScrollRight] = (0,external_react_.useState)(false);
        (0,external_react_.useEffect)(()=>{
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
        return filtered.length > 0 && /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
            className: "category listSlider",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "category-header-row",
                    style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingRight: 20
                    },
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                            className: "h3",
                            children: currentSelected.streamCategories[index].category_name
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("span", {
                            className: "see-all-text",
                            onClick: ()=>router.push(`/dashboard/preview/movies/more?cat_id=${currentSelected.streamCategories[index].category_id}&cat_name=${encodeURIComponent(currentSelected.streamCategories[index].category_name)}`),
                            style: {
                                color: "rgba(255, 255, 255, 0.7)",
                                fontSize: "14px",
                                fontWeight: "500",
                                cursor: "pointer",
                                transition: "color 0.2s ease"
                            },
                            onMouseEnter: (e)=>e.currentTarget.style.color = "#ffffff",
                            onMouseLeave: (e)=>e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)",
                            children: "See All ›"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "list",
                    children: [
                        canScrollLeft && /*#__PURE__*/ jsx_runtime.jsx("button", {
                            type: "button",
                            onClick: (e)=>{
                                e.stopPropagation();
                                handleScrollRow("left");
                            },
                            className: "row-scroll-arrow left",
                            title: "Scroll Left",
                            children: /*#__PURE__*/ jsx_runtime.jsx("svg", {
                                width: "22",
                                height: "22",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2.5",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: /*#__PURE__*/ jsx_runtime.jsx("polyline", {
                                    points: "15 18 9 12 15 6"
                                })
                            })
                        }),
                        canScrollRight && /*#__PURE__*/ jsx_runtime.jsx("button", {
                            type: "button",
                            onClick: (e)=>{
                                e.stopPropagation();
                                handleScrollRow("right");
                            },
                            className: "row-scroll-arrow right",
                            title: "Scroll Right",
                            children: /*#__PURE__*/ jsx_runtime.jsx("svg", {
                                width: "22",
                                height: "22",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2.5",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: /*#__PURE__*/ jsx_runtime.jsx("polyline", {
                                    points: "9 18 15 12 9 6"
                                })
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("div", {
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
                            children: currentSelected.streams ? // <AutoSizer disableHeight>
                            //  {({ width }) => (
                            /*#__PURE__*/ jsx_runtime.jsx(external_react_virtualized_.Grid, {
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
                            }) : // )}
                            //     </AutoSizer>
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx(material_.Skeleton, {
                                        sx: {
                                            borderRadius: 2
                                        },
                                        variant: "rectangle",
                                        height: 300,
                                        width: 300
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx(material_.Skeleton, {
                                        sx: {
                                            borderRadius: 2
                                        },
                                        variant: "rectangle",
                                        height: 300,
                                        width: 300
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx(material_.Skeleton, {
                                        sx: {
                                            borderRadius: 2
                                        },
                                        variant: "rectangle",
                                        height: 300,
                                        width: 300
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx(material_.Skeleton, {
                                        sx: {
                                            borderRadius: 2
                                        },
                                        variant: "rectangle",
                                        height: 300,
                                        width: 300
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx(material_.Skeleton, {
                                        sx: {
                                            borderRadius: 2
                                        },
                                        variant: "rectangle",
                                        height: 300,
                                        width: 300
                                    })
                                ]
                            })
                        })
                    ]
                })
            ]
        }, index);
    }, [
        currentSelected,
        FavouriteMovies,
        parentalPin,
        windowSize
    ]);
    const FavsCategory = ({ favMovies })=>{
        return favMovies.length > 0 && /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
            className: "category",
            children: [
                /*#__PURE__*/ jsx_runtime.jsx("span", {
                    style: {
                        marginTop: 20
                    },
                    className: "h3",
                    children: "Favourites"
                }),
                /*#__PURE__*/ jsx_runtime.jsx(scrollable/* default */.Z, {
                    children: favMovies?.map((movie, index)=>{
                        const added = currentAction === "movies" ? movie.added : movie.last_modified;
                        const isCategory = currentSelected.streamCategories?.filter((ctg)=>String(ctg.category_id) === String(movie?.category_id) || String(ctg.category_id) === String(movie?.categories && movie?.categories[0]))[0];
                        const category = isCategory && isCategory.category_name;
                        const isAdult = adultArray.filter((item)=>category?.toLowerCase().includes(item.toLowerCase())).length > 0;
                        const handleItem = ()=>{
                            if (parentalPin) {
                                if (isAdult) {
                                    setClickedAdultItem(movie[currentAction === "movies" ? "stream_id" : "series_id"]);
                                    setShowParentalLock(true);
                                } else {
                                    setShowParentalLock(false);
                                    router.push(`/dashboard/preview/${currentAction}/${movie[currentAction === "movies" ? "stream_id" : "series_id"]}`);
                                }
                            } else {
                                router.push(`/dashboard/preview/${currentAction}/${movie[currentAction === "movies" ? "stream_id" : "series_id"]}`);
                            }
                        };
                        return /*#__PURE__*/ jsx_runtime.jsx("div", {
                            onClick: handleItem,
                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                style: {
                                    marginTop: 10,
                                    marginBottom: 10,
                                    width: 165,
                                    borderRadius: 5
                                },
                                onMouseEnter: (e)=>handleCardMouseEnter(e, movie),
                                onMouseLeave: handleCardMouseLeave,
                                className: "item",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: "caption",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                                className: "control",
                                                children: [
                                                    Number(movie.rating).toFixed(1) !== "NaN" && Number(movie.rating) !== 0 ? /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                        className: "count",
                                                        children: Number(movie.rating).toFixed(1)
                                                    }) : /*#__PURE__*/ jsx_runtime.jsx("span", {}),
                                                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                                        href: "javascript:void(0)",
                                                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
                                                            width: "30",
                                                            height: "26",
                                                            viewBox: "0 0 30 26",
                                                            fill: "none",
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            children: [
                                                                " ",
                                                                /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                    d: "M29.2239 7.73189C29.2239 8.12625 29.2239 8.52061 29.2239 8.91467C29.2091 8.99632 29.1875 9.07738 29.181 9.15933C29.0718 10.5385 28.6337 11.8136 27.9606 13.0141C27.113 14.5265 25.9933 15.827 24.7685 17.0364C21.7994 19.9679 18.5333 22.5639 15.3951 25.3043C15.0229 25.6294 14.5771 25.6093 14.1904 25.2874C13.8659 25.0173 13.5469 24.7404 13.2289 24.4623C10.706 22.2574 8.16057 20.0782 5.67077 17.8369C4.12678 16.4471 2.71503 14.9182 1.69378 13.0851C-0.0217981 10.006 -0.113805 6.88017 1.61036 3.78242C2.56563 2.06565 4.04069 0.913648 5.94354 0.375217C7.9733 -0.19901 9.91905 0.00807828 11.7287 1.14352C12.8804 1.86626 13.7579 2.85732 14.4765 3.99927C14.5827 4.1679 14.6862 4.33801 14.7629 4.46167C15.3081 3.75845 15.7856 3.01796 16.3841 2.39344C18.4931 0.19357 21.056 -0.47858 23.9434 0.472844C26.661 1.36835 28.2366 3.37771 28.9393 6.10329C29.0762 6.63521 29.131 7.18843 29.2239 7.73189Z",
                                                                    fill: "#FF0000"
                                                                }),
                                                                " "
                                                            ]
                                                        })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                className: "info",
                                                children: /*#__PURE__*/ jsx_runtime.jsx("text", {
                                                    children: ""
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                className: "h2",
                                                children: movie.name
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: "thumb",
                                        children: [
                                            movie[currentKeys.image] ? /*#__PURE__*/ jsx_runtime.jsx("img", {
                                                style: {
                                                    filter: isAdult && parentalPin && "blur(20px)"
                                                },
                                                src: movie[currentKeys.image]
                                            }) : /*#__PURE__*/ jsx_runtime.jsx((image_default()), {
                                                alt: "placeholder",
                                                layout: "fill",
                                                src: placeholder/* default */.Z
                                            }),
                                            isAdult && parentalPin && /*#__PURE__*/ jsx_runtime.jsx("svg", {
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
                                                children: /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                    d: "M9.35342 0.978516C9.71046 0.978516 10.0675 0.978516 10.4246 0.978516C10.6069 1.0108 10.7891 1.04529 10.972 1.07454C13.6371 1.50415 15.8459 3.8255 16.0656 6.51604C16.1583 7.65313 16.1075 8.80208 16.1216 9.94578C16.1229 10.0653 16.1218 10.1847 16.1218 10.3277C16.3536 10.3277 16.5625 10.3274 16.7714 10.3277C18.2385 10.3296 19.2373 11.3213 19.2379 12.7826C19.2392 16.337 19.239 19.8918 19.2379 23.4462C19.2373 24.9108 18.2409 25.908 16.7791 25.9094C15.3184 25.9108 13.8576 25.9097 12.3969 25.9097C9.24001 25.9097 6.08316 25.9124 2.92631 25.9083C1.60326 25.9066 0.549224 24.9067 0.545085 23.6167C0.533772 19.9486 0.535152 16.2805 0.545085 12.6123C0.54812 11.4981 1.37617 10.547 2.47545 10.3743C2.8554 10.3147 3.24694 10.3277 3.65641 10.3061C3.65641 10.2176 3.65641 10.1301 3.65641 10.0429C3.65696 9.06089 3.64813 8.07888 3.65972 7.09714C3.69007 4.49186 5.41763 2.12443 7.89129 1.3179C8.36506 1.16338 8.86531 1.08944 9.35342 0.978516ZM14.04 10.321C14.04 9.49768 14.0469 8.69612 14.0372 7.89484C14.0314 7.42549 14.0414 6.95007 13.9718 6.48817C13.6457 4.31968 11.4524 2.74195 9.29354 3.10037C7.17969 3.45107 5.74929 5.12373 5.73853 7.26407C5.73384 8.20498 5.73743 9.14615 5.73798 10.0871C5.73798 10.1638 5.7446 10.2405 5.74819 10.321C8.51957 10.321 11.2598 10.321 14.04 10.321ZM9.88457 14.4809C8.99416 14.4842 8.19481 15.0664 7.91475 15.9154C7.63634 16.7589 7.92192 17.6764 8.65147 18.2081C8.81095 18.3242 8.86062 18.4412 8.85786 18.628C8.8482 19.293 8.85206 19.958 8.85593 20.623C8.85675 20.7515 8.86282 20.8848 8.89732 21.0073C9.03279 21.4883 9.51318 21.8086 9.9897 21.749C10.5222 21.6822 10.9071 21.2879 10.9174 20.7609C10.9312 20.0557 10.9295 19.3498 10.9187 18.6443C10.9157 18.4478 10.967 18.3253 11.1326 18.2036C11.8607 17.6681 12.1408 16.7523 11.8583 15.908C11.5735 15.0553 10.7742 14.4776 9.88457 14.4809Z",
                                                    fill: "black"
                                                })
                                            })
                                        ]
                                    })
                                ]
                            })
                        }, index);
                    })
                })
            ]
        });
    };
    const removeItemFromRecents = async ()=>{
        try {
            await (0,functions/* removeMovieFromRecents */.C3)(currentRecentItem.id, currentAction === "movies" ? "Movie" : "Series", finalAddress);
        } catch (error) {
            console.log("ERROR", error);
        }
        setCurrentRecentItem(null);
    };
    const Recents = external_react_default().useCallback(()=>{
        return recents.length > 0 && /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
            className: "category",
            children: [
                /*#__PURE__*/ jsx_runtime.jsx("span", {
                    className: "h3",
                    children: "Continue Watching"
                }),
                /*#__PURE__*/ jsx_runtime.jsx(scrollable/* default */.Z, {
                    children: recents.map((movie, index)=>{
                        const values = Object.values(movie);
                        const lastWatched = false;
                        // values && values.filter(vl => vl.lastWatched === 'true')
                        const watched = currentAction === "series" ? lastWatched.length > 0 && lastWatched[0].timeline / lastWatched[0].duration * 100 : movie.timeline / movie.duration * 100;
                        const added = currentAction === "movies" ? movie.info?.added : movie.info?.last_modified;
                        const isFavourite = FavouriteMovies ? FavouriteMovies.filter((item)=>String(item[currentKeys.id]) === String(movie.id)).length > 0 : null;
                        const isCategory = currentSelected.streamCategories?.filter((ctg)=>String(ctg.category_id) === String(movie?.info?.category_id) || String(ctg.category_id) === String(movie?.info?.categories && movie.info?.categories[0]))[0];
                        const category = isCategory && isCategory.category_name;
                        const isAdult = adultArray.filter((item)=>category?.toLowerCase().includes(item.toLowerCase())).length > 0;
                        const handleItem = (action)=>{
                            setContinueWatchingClicked(true);
                            if (parentalPin) {
                                if (isAdult) {
                                    setClickedAdultItem(movie.info[currentAction === "movies" ? "stream_id" : "series_id"]);
                                    setShowParentalLock(true);
                                } else {
                                    setShowParentalLock(false);
                                    if (action === "info") {
                                        router.push(`/dashboard/preview/${currentAction}/${movie.info[currentAction === "movies" ? "stream_id" : "series_id"]}`);
                                    } else {
                                        router.push(`/dashboard/preview/${currentAction}/${movie.info[currentAction === "movies" ? "stream_id" : "series_id"]}?state=play`);
                                    }
                                }
                            } else {
                                if (action === "info") {
                                    router.push(`/dashboard/preview/${currentAction}/${movie.info[currentAction === "movies" ? "stream_id" : "series_id"]}`);
                                } else {
                                    router.push(`/dashboard/preview/${currentAction}/${movie.info[currentAction === "movies" ? "stream_id" : "series_id"]}?state=play`);
                                }
                            }
                        };
                        return /*#__PURE__*/ jsx_runtime.jsx("div", {
                            style: {
                                position: "relative"
                            },
                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                onClick: handleItem,
                                onMouseEnter: (e)=>handleCardMouseEnter(e, movie.info ? {
                                        ...movie.info,
                                        ...movie
                                    } : movie),
                                onMouseLeave: handleCardMouseLeave,
                                style: {
                                    marginTop: 10,
                                    marginBottom: 10,
                                    width: 165
                                },
                                className: "item",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: "caption",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                                className: "control",
                                                children: [
                                                    Number(movie.info?.rating).toFixed(1) !== "NaN" && Number(movie.info?.rating) !== 0 ? /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                        className: "count",
                                                        children: Number(movie.info?.rating).toFixed(1)
                                                    }) : /*#__PURE__*/ jsx_runtime.jsx("span", {}),
                                                    isFavourite && /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                                        href: "javascript:void(0)",
                                                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
                                                            width: "30",
                                                            height: "26",
                                                            viewBox: "0 0 30 26",
                                                            fill: "none",
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            children: [
                                                                " ",
                                                                /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                    d: "M29.2239 7.73189C29.2239 8.12625 29.2239 8.52061 29.2239 8.91467C29.2091 8.99632 29.1875 9.07738 29.181 9.15933C29.0718 10.5385 28.6337 11.8136 27.9606 13.0141C27.113 14.5265 25.9933 15.827 24.7685 17.0364C21.7994 19.9679 18.5333 22.5639 15.3951 25.3043C15.0229 25.6294 14.5771 25.6093 14.1904 25.2874C13.8659 25.0173 13.5469 24.7404 13.2289 24.4623C10.706 22.2574 8.16057 20.0782 5.67077 17.8369C4.12678 16.4471 2.71503 14.9182 1.69378 13.0851C-0.0217981 10.006 -0.113805 6.88017 1.61036 3.78242C2.56563 2.06565 4.04069 0.913648 5.94354 0.375217C7.9733 -0.19901 9.91905 0.00807828 11.7287 1.14352C12.8804 1.86626 13.7579 2.85732 14.4765 3.99927C14.5827 4.1679 14.6862 4.33801 14.7629 4.46167C15.3081 3.75845 15.7856 3.01796 16.3841 2.39344C18.4931 0.19357 21.056 -0.47858 23.9434 0.472844C26.661 1.36835 28.2366 3.37771 28.9393 6.10329C29.0762 6.63521 29.131 7.18843 29.2239 7.73189Z",
                                                                    fill: "#FF0000"
                                                                }),
                                                                " "
                                                            ]
                                                        })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                className: "info",
                                                children: /*#__PURE__*/ jsx_runtime.jsx("text", {
                                                    children: ""
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                className: "h2",
                                                children: movie.info?.name
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx(progress/* default */.Z, {
                                        progress: watched
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: "thumb",
                                        children: [
                                            movie.info && movie.info[currentKeys.image] ? /*#__PURE__*/ jsx_runtime.jsx("img", {
                                                style: {
                                                    filter: isAdult && parentalPin && "blur(20px)"
                                                },
                                                src: movie.info[currentKeys.image]
                                            }) : /*#__PURE__*/ jsx_runtime.jsx((image_default()), {
                                                alt: "placeholder",
                                                layout: "fill",
                                                src: placeholder/* default */.Z
                                            }),
                                            isAdult && parentalPin && /*#__PURE__*/ jsx_runtime.jsx("svg", {
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
                                                children: /*#__PURE__*/ jsx_runtime.jsx("path", {
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
    }, [
        recents,
        currentKeys,
        currentAction,
        FavouriteMovies,
        adultArray,
        parentalPin,
        handleCardMouseEnter,
        handleCardMouseLeave
    ]);
    (0,external_react_.useEffect)(()=>{
        setBannerMovies([]);
        if (currentSelected.banner.streams) {
            setBannerMovies(currentSelected.banner.streams);
        }
    }, [
        currentSelected.banner.streams,
        currentAction
    ]);
    (0,external_react_.useEffect)(()=>{
        const handleResize = ()=>{
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);
        // Call it once immediately, in case size changed before listeners attached
        handleResize();
        return ()=>{
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("orientationchange", handleResize);
        };
    }, []);
    (0,external_react_.useEffect)(()=>{
        if (user) {
            setFinalAddress(user.dbAddress);
        }
    }, [
        user
    ]);
    (0,external_react_.useEffect)(()=>{
        setShow(false);
        setTimeout(()=>{
            setShow(true);
        }, 500);
        setFavouriteMovies(null);
        setRecents([]);
    }, [
        currentAction
    ]);
    (0,external_react_.useEffect)(()=>{
        if (finalAddress) {
            getFavs();
            getRecent();
            if (isMyListTab) {
                const favMov = (0,database_.onValue)((0,database_.ref)(database, `${finalAddress}/Fav/Movie`), ()=>getFavs());
                const favSer = (0,database_.onValue)((0,database_.ref)(database, `${finalAddress}/Fav/Series`), ()=>getFavs());
                const favLive = (0,database_.onValue)((0,database_.ref)(database, `${finalAddress}/Fav/LiveTv`), ()=>getFavs());
                const watchMov = (0,database_.onValue)((0,database_.ref)(database, `${finalAddress}/Watchlist/Movie`), ()=>getFavs());
                const watchSer = (0,database_.onValue)((0,database_.ref)(database, `${finalAddress}/Watchlist/Series`), ()=>getFavs());
                const watchLive = (0,database_.onValue)((0,database_.ref)(database, `${finalAddress}/Watchlist/LiveTv`), ()=>getFavs());
                return ()=>{
                    favMov();
                    favSer();
                    favLive();
                    watchMov();
                    watchSer();
                    watchLive();
                };
            } else {
                const pathStr = currentAction === "movies" ? "Movie" : "Series";
                const favUnsub = (0,database_.onValue)((0,database_.ref)(database, `${finalAddress}/Fav/${pathStr}`), ()=>getFavs());
                const watchUnsub = (0,database_.onValue)((0,database_.ref)(database, `${finalAddress}/Watchlist/${pathStr}`), ()=>getFavs());
                const recUnsub = (0,database_.onValue)((0,database_.ref)(database, `${finalAddress}/Recent/${pathStr}`), ()=>getRecent());
                return ()=>{
                    favUnsub();
                    watchUnsub();
                    recUnsub();
                };
            }
        }
    }, [
        currentAction,
        finalAddress,
        streamData
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "list-container",
        style: {
            transition: ".4s",
            opacity: show ? 1 : 1
        },
        children: [
            currentRecentItem && /*#__PURE__*/ jsx_runtime.jsx("div", {
                style: {
                    opacity: currentRecentItem ? 1 : 0
                },
                className: "continue-watching-container-modal",
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "continue-watching-container",
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx("p", {
                            className: "title",
                            children: currentRecentItem?.info?.name
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx((Cancel_default()), {
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
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "cw-btns-container",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("button", {
                                    onClick: async ()=>{
                                        setCurrentRecentItem(null);
                                        const isFavourite = FavouriteMovies.filter((item)=>String(item[currentKeys.id]) === String(currentRecentItem.id)).length > 0;
                                        try {
                                            if (isFavourite) {
                                                await (0,functions/* removeFromFavs */.h2)(currentRecentItem.id, currentAction === "movies" ? "Movie" : "Series", finalAddress);
                                                alert.toggle({
                                                    show: true,
                                                    title: "Removed from Favourites",
                                                    type: "success"
                                                });
                                            } else {
                                                await (0,functions/* addToFavs */.zg)(currentRecentItem.id, currentAction === "movies" ? "Movie" : "Series", finalAddress);
                                                alert.toggle({
                                                    show: true,
                                                    title: "Added to Favourites",
                                                    type: "success"
                                                });
                                            }
                                        } catch (error) {
                                            console.log("ERROR", error);
                                        }
                                    },
                                    children: [
                                        " ",
                                        FavouriteMovies.filter((item)=>String(item[currentKeys.id]) === String(currentRecentItem.id)).length > 0 ? "Remove from Favourites" : "Add to Favourites"
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx("button", {
                                    onClick: removeItemFromRecents,
                                    children: "Remove from Row"
                                })
                            ]
                        })
                    ]
                })
            }),
            user?.loginType !== "m3u" ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(parentalLock/* default */.Z, {
                        action: "verify",
                        open: showParentalLock,
                        close: ()=>setShowParentalLock(false),
                        completed: ()=>{
                            parentalVerified.toggle(true);
                            router.push(`/dashboard/preview/${currentAction}/${clickedAdultItem}`);
                        }
                    }),
                    isMyListTab ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        style: {
                            paddingTop: 95,
                            paddingLeft: 40,
                            paddingRight: 40,
                            paddingBottom: 60,
                            maxWidth: 1440,
                            margin: "0 auto"
                        },
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginBottom: 28
                                },
                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ jsx_runtime.jsx("h1", {
                                            style: {
                                                fontSize: 28,
                                                fontWeight: 800,
                                                color: "#ffffff",
                                                margin: 0
                                            },
                                            children: "My List"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                            style: {
                                                padding: "4px 12px",
                                                background: "rgba(99, 102, 241, 0.2)",
                                                border: "1px solid rgba(99, 102, 241, 0.4)",
                                                borderRadius: 16,
                                                fontSize: 13,
                                                fontWeight: 700,
                                                color: "#818cf8"
                                            },
                                            children: [
                                                FavouriteMovies ? FavouriteMovies.length : 0,
                                                " ",
                                                FavouriteMovies && FavouriteMovies.length === 1 ? "title" : "titles"
                                            ]
                                        })
                                    ]
                                })
                            }),
                            !FavouriteMovies || FavouriteMovies.length === 0 ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "no-data-found-container",
                                style: {
                                    padding: "80px 20px"
                                },
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx((image_default()), {
                                        src: noContentFound/* default */.Z,
                                        alt: "No content found",
                                        width: 140,
                                        height: 140
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("h2", {
                                        style: {
                                            color: "#ffffff",
                                            marginTop: 16,
                                            fontSize: 22
                                        },
                                        children: "Your List is empty"
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("p", {
                                        style: {
                                            color: "#94a3b8",
                                            fontSize: 14,
                                            maxWidth: 420
                                        },
                                        children: "Add movies, TV shows, and live channels to your list by clicking the + button on any title."
                                    })
                                ]
                            }) : /*#__PURE__*/ jsx_runtime.jsx("div", {
                                className: "search-results-grid",
                                children: FavouriteMovies.map((item, index)=>{
                                    const actionType = item.actionType || (item.series_id ? "series" : "movies");
                                    const streamId = item.stream_id || item.series_id || item.id;
                                    const imgUrl = item.stream_icon || item.cover || item.info?.cover || item.info?.stream_icon;
                                    const title = item.name || item.title || item.info?.name || "";
                                    const ratingVal = item.rating || item.info?.rating;
                                    const rating = Number(ratingVal || 0).toFixed(1);
                                    const handleItemClick = ()=>{
                                        if (actionType === "live") {
                                            router.push(`/dashboard/live?view=${streamId}`);
                                        } else {
                                            router.push(`/dashboard/preview/${actionType}/${streamId}`);
                                        }
                                    };
                                    const handleRemoveFromList = async (e)=>{
                                        e.stopPropagation();
                                        const pathType = actionType === "movies" ? "Movie" : actionType === "series" ? "Series" : "LiveTv";
                                        try {
                                            await (0,functions/* removeFromFavs */.h2)(streamId, pathType, finalAddress);
                                            await removeFromWatchlist(streamId, pathType, finalAddress);
                                            alert.toggle({
                                                title: "Removed from My List",
                                                show: true,
                                                type: "success"
                                            });
                                            getFavs();
                                        } catch (err) {
                                            console.log("Remove error", err);
                                        }
                                    };
                                    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        onClick: handleItemClick,
                                        onMouseEnter: (e)=>handleCardMouseEnter(e, item),
                                        onMouseLeave: handleCardMouseLeave,
                                        className: "item",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx("div", {
                                                className: "thumb",
                                                children: imgUrl ? /*#__PURE__*/ jsx_runtime.jsx("img", {
                                                    src: imgUrl,
                                                    alt: title,
                                                    style: {
                                                        filter: isAdult(item) && parentalPin ? "blur(20px)" : "none"
                                                    },
                                                    onError: (e)=>{
                                                        e.target.onerror = null;
                                                        e.target.src = placeholder/* default */.Z.src || placeholder/* default */.Z;
                                                    }
                                                }) : /*#__PURE__*/ jsx_runtime.jsx((image_default()), {
                                                    alt: "placeholder",
                                                    layout: "fill",
                                                    objectFit: "cover",
                                                    src: placeholder/* default */.Z
                                                })
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                className: "caption",
                                                children: [
                                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                        className: "control",
                                                        children: [
                                                            rating !== "NaN" && Number(rating) > 0 ? /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                                className: "count",
                                                                children: rating
                                                            }) : /*#__PURE__*/ jsx_runtime.jsx("span", {}),
                                                            /*#__PURE__*/ jsx_runtime.jsx("button", {
                                                                type: "button",
                                                                onClick: handleRemoveFromList,
                                                                title: "Remove from My List",
                                                                style: {
                                                                    background: "rgba(239, 68, 68, 0.2)",
                                                                    border: "1px solid rgba(239, 68, 68, 0.4)",
                                                                    color: "#ef4444",
                                                                    borderRadius: "50%",
                                                                    width: "28px",
                                                                    height: "28px",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    cursor: "pointer"
                                                                },
                                                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
                                                                    width: "14",
                                                                    height: "14",
                                                                    viewBox: "0 0 24 24",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "3",
                                                                    children: [
                                                                        /*#__PURE__*/ jsx_runtime.jsx("line", {
                                                                            x1: "18",
                                                                            y1: "6",
                                                                            x2: "6",
                                                                            y2: "18"
                                                                        }),
                                                                        /*#__PURE__*/ jsx_runtime.jsx("line", {
                                                                            x1: "6",
                                                                            y1: "6",
                                                                            x2: "18",
                                                                            y2: "18"
                                                                        })
                                                                    ]
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                        className: "h2",
                                                        children: title
                                                    })
                                                ]
                                            })
                                        ]
                                    }, streamId || index);
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(HoverCard, {})
                        ]
                    }) : currentSelected.streams && currentSelected.streams.length === 0 || !currentSelected.streams ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "no-data-found-container",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx((image_default()), {
                                src: noContentFound/* default */.Z,
                                alt: "No content found",
                                width: 150,
                                height: 150
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("h2", {
                                className: "no-data-found",
                                children: [
                                    "No ",
                                    currentAction,
                                    " found"
                                ]
                            })
                        ]
                    }) : /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                        children: [
                            bannerMovies && bannerMovies.length > 0 && /*#__PURE__*/ jsx_runtime.jsx("section", {
                                className: "mainBanner",
                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                    style: {
                                        width: "100%"
                                    },
                                    className: "owl-carousel",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime.jsx(dashboard, {
                                            children: bannerMovies?.map((movie, index)=>{
                                                const liked = FavouriteMovies?.filter((item)=>String(item[currentKeys.id]) === String(currentAction === "movies" ? movie?.movie_data?.stream_id : movie?.series_id)).length > 0;
                                                const imgPath = ()=>{
                                                    if (currentAction === "movies") {
                                                        return movie.info?.backdrop_path && movie.info?.backdrop_path.length > 0 ? movie.info?.backdrop_path[0] : movie.info?.cover ? movie.info?.cover : null;
                                                    }
                                                    if (currentAction === "series") {
                                                        return movie.backdrop_path && movie.backdrop_path.length > 0 ? movie.backdrop_path[0] : movie.cover ? movie.cover : null;
                                                    }
                                                };
                                                const id = currentAction === "movies" ? movie?.movie_data?.stream_id : movie?.series_id;
                                                const aboutMovie = currentAction === "movies" ? movie?.info?.description ? movie?.info?.description : movie?.info?.plot : movie?.plot;
                                                return /*#__PURE__*/ jsx_runtime.jsx(CarouselItem, {
                                                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                        className: "item",
                                                        children: [
                                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                                className: "thumb",
                                                                children: [
                                                                    /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                                        className: "effectGrad"
                                                                    }),
                                                                    imgPath() ? /*#__PURE__*/ jsx_runtime.jsx("img", {
                                                                        src: imgPath()
                                                                    }) : /*#__PURE__*/ jsx_runtime.jsx((image_default()), {
                                                                        alt: "placeholder",
                                                                        layout: "fill",
                                                                        src: placeholder/* default */.Z
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                                className: "info",
                                                                children: [
                                                                    /*#__PURE__*/ jsx_runtime.jsx("span", {
                                                                        className: "h2",
                                                                        children: currentAction === "movies" ? movie?.info?.name : movie?.name
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime.jsx("p", {
                                                                        className: "text",
                                                                        children: aboutMovie ? aboutMovie?.length > 400 ? aboutMovie.substring(0, 400) + "..." : aboutMovie : null
                                                                    }),
                                                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                                        className: "btnGroup",
                                                                        children: [
                                                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)((link_default()), {
                                                                                href: `/dashboard/preview/${currentAction}/${currentAction === "movies" ? movie?.movie_data?.stream_id : currentSelected.streams[index].series_id}`,
                                                                                className: "btn btn-primary playBtn",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
                                                                                        width: "28",
                                                                                        height: "30",
                                                                                        viewBox: "0 0 28 30",
                                                                                        fill: "none",
                                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                                        children: [
                                                                                            " ",
                                                                                            /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                                                d: "M0 0.120605V29.8574L27.928 14.989L0 0.120605Z",
                                                                                                fill: "white"
                                                                                            }),
                                                                                            " "
                                                                                        ]
                                                                                    }),
                                                                                    " ",
                                                                                    "Play"
                                                                                ]
                                                                            }),
                                                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("button", {
                                                                                onClick: ()=>handleFavourites(id, liked),
                                                                                className: "btn btn-primary",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
                                                                                        width: "30",
                                                                                        height: "26",
                                                                                        viewBox: "0 0 30 26",
                                                                                        fill: "none",
                                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                                        children: [
                                                                                            " ",
                                                                                            /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                                                d: "M29.2239 7.73189C29.2239 8.12625 29.2239 8.52061 29.2239 8.91467C29.2091 8.99632 29.1875 9.07738 29.181 9.15933C29.0718 10.5385 28.6337 11.8136 27.9606 13.0141C27.113 14.5265 25.9933 15.827 24.7685 17.0364C21.7994 19.9679 18.5333 22.5639 15.3951 25.3043C15.0229 25.6294 14.5771 25.6093 14.1904 25.2874C13.8659 25.0173 13.5469 24.7404 13.2289 24.4623C10.706 22.2574 8.16057 20.0782 5.67077 17.8369C4.12678 16.4471 2.71503 14.9182 1.69378 13.0851C-0.0217981 10.006 -0.113805 6.88017 1.61036 3.78242C2.56563 2.06565 4.04069 0.913648 5.94354 0.375217C7.9733 -0.19901 9.91905 0.00807828 11.7287 1.14352C12.8804 1.86626 13.7579 2.85732 14.4765 3.99927C14.5827 4.1679 14.6862 4.33801 14.7629 4.46167C15.3081 3.75845 15.7856 3.01796 16.3841 2.39344C18.4931 0.19357 21.056 -0.47858 23.9434 0.472844C26.661 1.36835 28.2366 3.37771 28.9393 6.10329C29.0762 6.63521 29.131 7.18843 29.2239 7.73189Z",
                                                                                                fill: liked ? "#FF0000" : "white"
                                                                                            }),
                                                                                            " "
                                                                                        ]
                                                                                    }),
                                                                                    " ",
                                                                                    "My Favourite"
                                                                                ]
                                                                            })
                                                                        ]
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                }, index);
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime.jsx("div", {
                                            className: "ad-container"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                style: {
                                    paddingTop: bannerMovies && bannerMovies.length > 0 ? 0 : 70
                                },
                                children: [
                                    FavouriteMovies && FavouriteMovies && /*#__PURE__*/ jsx_runtime.jsx(FavsCategory, {
                                        favMovies: FavouriteMovies
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx(Recents, {}),
                                    /*#__PURE__*/ jsx_runtime.jsx(RecentlyAddedSection, {}),
                                    currentSelected.streamCategories?.map((ctg, index)=>/*#__PURE__*/ jsx_runtime.jsx(Category, {
                                            index: index
                                        }, ctg.category_id || index))
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(HoverCard, {})
                        ]
                    })
                ]
            }) : /*#__PURE__*/ jsx_runtime.jsx(m3u["default"], {
                finalAddress: finalAddress,
                currentAction: currentAction
            })
        ]
    });
};
/* harmony default export */ const list = (AllList);


/***/ }),

/***/ 1011:
/***/ (() => {



/***/ }),

/***/ 87:
/***/ (() => {



/***/ })

};
;