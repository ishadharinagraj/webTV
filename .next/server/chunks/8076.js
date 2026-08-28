exports.id = 8076;
exports.ids = [8076];
exports.modules = {

/***/ 8076:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8917);
/* harmony import */ var _hooks_useApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(592);
/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2665);
/* harmony import */ var _contexts_app__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2805);
/* harmony import */ var _utils_loading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9637);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6764);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7707);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5666);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _firebase_functions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2313);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(2748);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _utils_parentalLock__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(4066);
/* harmony import */ var _utils_local__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(5976);
/* harmony import */ var _mui_icons_material_Cancel__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(3733);
/* harmony import */ var _mui_icons_material_Cancel__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Cancel__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _assets_noContentFound_svg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(614);
/* harmony import */ var _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(1536);
/* harmony import */ var _assets_lockIcon_svg__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(2814);
/* harmony import */ var iptv_playlist_parser__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(7775);
/* harmony import */ var iptv_playlist_parser__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(iptv_playlist_parser__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(1651);
/* harmony import */ var _utils_player2__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(133);
/* harmony import */ var _utils_indexDb_indexedDB__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(1090);
/* __next_internal_client_entry_do_not_use__ default auto */ 

























const M3ULive = ()=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_13__.useRouter)();
    const liveStreamsRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { makeRequest } = (0,_hooks_useApi__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)();
    const { view } = (0,next_router__WEBPACK_IMPORTED_MODULE_13__.useRouter)().query;
    const [searchParams, setSearchParams] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { user, alert, streamData, m3uStreams, m3uUrl, homeM3uStreams, currentPlayer, theme } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_contexts_app__WEBPACK_IMPORTED_MODULE_5__/* .AppContext */ .I);
    // const { liveTv } = streamData;
    const { live: m3uLiveStreams } = m3uStreams.streams;
    const [liveCategories, setLiveCategories] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [searchedCategories, setSearchedCategories] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [searchedChannels, setSearchedChannels] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [liveStreams, setLiveStreams] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [selectedCategory, setSelectedCategory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [currentLiveStreams, setCurrentLiveStreams] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [epgs, setEpgs] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [playerSrc, setPlayerSrc] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [favourites, setFavourites] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [progress, setProgress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [currentStreamId, setCurrentStreamId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [currentStream, setCurrentStream] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [timerStart, setTimerStart] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [favouriteChannels, setFavouriteChannels] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [channelHistory, setChannelHistory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [searchOn, setSearchOn] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showExtraCtg, setShowExtraCtg] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        favourite: true,
        channelHistory: true
    });
    const [idExists, setIdExists] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [fullscreen, setFullscreen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isAdult, setIsAdult] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [pinVerified, setPinVerified] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [noData, setNoData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [onceAutoPlayed, setOnceAutoPlayed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const parentalPin = (0,_utils_local__WEBPACK_IMPORTED_MODULE_23__/* .getParentalPin */ .A)("currentUser");
    const [searchedValue, setSearchedValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [errorIndex, setErrorIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [clickedAdultCtg, setClickedAdultCtg] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [searchedChannel, setSearchedChannel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [searchChannelOn, setSearchChannelOn] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { live: liveTv } = m3uStreams.streams;
    const fetchDb = async ()=>{
        const currentUser = Object.keys(JSON.parse(localStorage.getItem("currentUser")));
        const data = await (0,_utils_indexDb_indexedDB__WEBPACK_IMPORTED_MODULE_24__/* .getFileByName */ .P9)(currentUser[0]);
        const parsedData = (0,iptv_playlist_parser__WEBPACK_IMPORTED_MODULE_20__.parse)(data);
        const live = parsedData.items.filter((item)=>!item.url.includes("/movie/") && !item.url.includes("/series/"));
        m3uStreams.toggle(live);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (user) {
            if (m3uStreams.streams.live) {
                getLiveCategories();
            } else {
                getLiveStreams();
            }
        }
    }, [
        user,
        m3uStreams.streams.live
    ]);
    // useEffect(() => {
    //     if ((!movies && !series) || ((movies && movies.length === 0) && (series && series.length === 0))) {
    //         setNoData(true);
    //     } else {
    //         setNoData(false);
    //     }
    // }, [movies, series])
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (user && liveTv && selectedCategory) {
            setCurrentLiveStreams([]);
            getFavouriteChannels();
            getChannelHistory();
            getCurrentLiveStreams();
        }
    }, [
        user,
        liveTv,
        selectedCategory
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setSearchParams(router.query);
    }, [
        router.query
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (searchParams?.length !== undefined) {
            const title = crypto_js__WEBPACK_IMPORTED_MODULE_10__.AES.decrypt(searchParams?.title, "thisistitle")?.toString(crypto_js__WEBPACK_IMPORTED_MODULE_10__.enc.Utf8);
            const name = crypto_js__WEBPACK_IMPORTED_MODULE_10__.AES.decrypt(searchParams?.name, "thisisname")?.toString(crypto_js__WEBPACK_IMPORTED_MODULE_10__.enc.Utf8);
            const stream = crypto_js__WEBPACK_IMPORTED_MODULE_10__.AES.decrypt(searchParams?.stream, "thisisurl")?.toString(crypto_js__WEBPACK_IMPORTED_MODULE_10__.enc.Utf8);
        }
    }, [
        router.query
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setSelectedCategory(selectedCategory);
    }, [
        selectedCategory
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (liveCategories && liveTv) {
            if (view) {
                const decryptedId = crypto_js__WEBPACK_IMPORTED_MODULE_10__.AES.decrypt(decodeURIComponent(view), "thisisliveurl").toString(crypto_js__WEBPACK_IMPORTED_MODULE_10__.enc.Utf8);
                const stream = liveTv.filter((stream)=>(0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(String(stream.url)) === (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(String(decryptedId)))[0];
                const categoryId = stream.group.title;
                const foundedCategory = liveCategories.filter((ctg)=>String(ctg) === String(categoryId))[0];
                setSelectedCategory(foundedCategory);
                setCurrentStreamId(decryptedId);
            } else {
                setSelectedCategory(Object.keys(router.query).length !== 0 ? crypto_js__WEBPACK_IMPORTED_MODULE_10__.AES.decrypt(router.query?.title, "thisistitle")?.toString(crypto_js__WEBPACK_IMPORTED_MODULE_10__.enc.Utf8) : liveCategories[0]);
                setCurrentStreamId((0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(liveTv[0].url));
            }
        }
    }, [
        liveCategories,
        liveTv,
        router.query
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setCurrentLiveStreams([]);
        if (selectedCategory && liveTv && liveStreamsRef.current && currentStream) {
            getCurrentLiveStreams();
            getChannelHistory();
            getFavouriteChannels();
            liveStreamsRef.current.scrollTo(0, 0);
        }
    }, [
        selectedCategory,
        liveTv,
        liveStreamsRef,
        currentStream
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (epgs.length > 0) {
            currentProgress();
            setTimerStart(true);
        }
    }, [
        epgs
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (view) {
            setIdExists(true);
        } else {
            setIdExists(false);
        }
    }, [
        view
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (currentStreamId && timerStart && epgs.length > 0) {
            const currentTime = new Date().getTime();
            const formattedEndDate = typeof epgs[0].end === "number" ? luxon__WEBPACK_IMPORTED_MODULE_12__.DateTime.fromSeconds(epgs[0].end, {
                zone: timeZone
            }).toFormat("yyyy-MM-dd HH:mm:ss") : epgs[0].end;
            const episodeEndTIme = luxon__WEBPACK_IMPORTED_MODULE_12__.DateTime.fromFormat(formattedEndDate, "yyyy-MM-dd HH:mm:ss", {
                zone: timeZone
            }).setZone("Asia/Kolkata");
            const endTime = new Date(episodeEndTIme).getTime() + 100000;
            const delay = endTime - currentTime;
            if (delay > 0) {
                const timer = setTimeout(()=>{
                    handleEpg(currentLiveStreams.filter((stream)=>(0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(String(stream.url)) === String(currentStreamId))[0]);
                }, delay);
                return ()=>clearTimeout(timer);
            }
        }
    }, [
        currentStreamId,
        timerStart,
        epgs
    ]);
    const getLiveCategories = ()=>{
        const categories = [];
        m3uLiveStreams.map((stream)=>{
            const exists = categories.filter((ctg)=>ctg === stream.group.title).length > 0;
            const ctgName = stream.group.title;
            if (!exists && ctgName !== null && ctgName.length > 0) {
                categories.push(ctgName);
            }
        });
        setLiveCategories(categories);
    };
    const getLiveStreams = async ()=>{
        setLoading(true);
        try {
            const currentUser = Object.keys(JSON.parse(localStorage.getItem("currentUser")));
            const data = await (0,_utils_indexDb_indexedDB__WEBPACK_IMPORTED_MODULE_24__/* .getFileByName */ .P9)(currentUser[0]);
            const parsedData = (0,iptv_playlist_parser__WEBPACK_IMPORTED_MODULE_20__.parse)(data);
            const isValid = parsedData.items.filter((item)=>item.group.title.length > 0 && item.name.length > 0).length > 0;
            if (parsedData && isValid) {
                const movies = parsedData.items.filter((item)=>!item.url.includes("/movie/"));
                const series = parsedData.items.filter((item)=>item.url.includes("/series/"));
                const live = parsedData.items.filter((item)=>!item.url.includes("/movie/") && !item.url.includes("/series/"));
                m3uStreams.toggle(movies, series, live);
                homeM3uStreams.toggle(parsedData.items);
            }
        } catch (error) {
            console.log("ERROR", error);
        }
        setLoading(false);
    };
    const timeZone = "America/NewYork";
    //  user && JSON.parse(AES.decrypt(user.serverInfo, "thisisserverinfo").toString(enc.Utf8)).timezone;
    const convertURL = (simplifiedURL, extension)=>{
        // Split the simplified URL by '/'
        const withoutProtocol = simplifiedURL.split("//")[1];
        const parts = withoutProtocol.split("/");
        // Check if the URL format is correct
        if (parts.length !== 4) {
            const newFilename = simplifiedURL.substring(1).replace(/\.ts$/, ".m3u8");
            return simplifiedURL;
        }
        // Extract necessary parts from the simplified URL
        const [domain, username, password, videoAndExtension] = parts;
        const [videoId, ext] = videoAndExtension.split(".");
        // Construct the original URL format
        const originalURL = `http://${domain}/live/${username}/${password}/${videoId}.${extension}`;
        return originalURL;
    };
    function formatDateToYYYYMMDDHHMMSS(inputDate) {
        if (!(inputDate instanceof Date)) {
            inputDate = new Date(inputDate); // Attempt to parse the input as a Date
        }
        if (isNaN(inputDate.getTime())) {
            return null;
        }
        const year = inputDate.getFullYear();
        const month = String(inputDate.getMonth() + 1).padStart(2, "0");
        const day = String(inputDate.getDate()).padStart(2, "0");
        const hours = String(inputDate.getHours()).padStart(2, "0");
        const minutes = String(inputDate.getMinutes()).padStart(2, "0");
        const seconds = String(inputDate.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    const formattedStartTime = (time)=>{
        const dt = new Date(time).getTime();
        if (dt.toString() !== "NaN") {
            if (user.loginType === "one-stream-panel") {
                const parsedTime = formatDateToYYYYMMDDHHMMSS(dt);
                const foreignTime = luxon__WEBPACK_IMPORTED_MODULE_12__.DateTime.fromFormat(parsedTime, "yyyy-MM-dd HH:mm:ss");
                return foreignTime.toLocaleString(luxon__WEBPACK_IMPORTED_MODULE_12__.DateTime.TIME_SIMPLE);
            } else {
                const parsedTime = formatDateToYYYYMMDDHHMMSS(dt);
                const foreignTime = luxon__WEBPACK_IMPORTED_MODULE_12__.DateTime.fromFormat(parsedTime, "yyyy-MM-dd HH:mm:ss", {
                    zone: timeZone
                });
                const indianTime = foreignTime.setZone("Asia/Kolkata");
                return indianTime.toLocaleString(luxon__WEBPACK_IMPORTED_MODULE_12__.DateTime.TIME_SIMPLE);
            }
        }
        return null;
    };
    const adultCategories = [
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
    const getOneStreamURL = (id)=>{
        return liveTv.filter((stm)=>String(stm?.stream_id) === String(id))[0].links.m3u8;
    };
    const getShortEpg = async (stream, verified)=>{
        const id = (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(stream?.url);
        const ctgName = liveTv.filter((stm)=>(0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(String(stm?.url)) === String(id))[0]?.group.title;
        setEpgs([]);
        setPlayerSrc(null);
        const adult = adultCategories?.filter((ctg)=>ctgName?.toLowerCase()?.includes(ctg?.toLowerCase())).length > 0;
        const response = await makeRequest().get(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__/* .endpoint */ .FP.getEpg + `?stream_id=${id}`);
        setTimeout(()=>{
            if (pinVerified) {
                try {
                    setEpgs([]);
                    setPlayerSrc(stream.url);
                } catch (error) {
                    console.log(error);
                }
            } else {
                if (parentalPin) {
                    setIsAdult(adult);
                    if (!adult) {
                        try {
                            setEpgs([]);
                            setPlayerSrc(stream.url);
                        } catch (error) {
                            console.log(error);
                        }
                        setPinVerified(false);
                    } else {
                        if (adult && verified) {
                            try {
                                setEpgs([]);
                                setPlayerSrc(stream.url);
                            } catch (error) {
                                console.log(error);
                            }
                            setIsAdult(false);
                            setPinVerified(false);
                        }
                    }
                } else {
                    setPlayerSrc(stream?.url);
                }
            }
        }, 500);
    };
    const getCurrentLiveStreams = (type)=>{
        if (selectedCategory !== "Favourites" && selectedCategory !== "Channel History") {
            const streams = liveTv.filter((stream)=>String(stream?.group.title).toLowerCase() === String(selectedCategory).toLowerCase());
            setCurrentLiveStreams(streams);
            if (!view) {
                setCurrentStreamId(currentStreamId ? currentStreamId : (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(streams[0].url));
                if (!onceAutoPlayed) {
                    handleEpg(streams[0]);
                    setCurrentStream(streams[0]);
                    setOnceAutoPlayed(true);
                }
            }
            if (!onceAutoPlayed) {
                if (type !== "fav") {
                    if (view) {
                        const url = crypto_js__WEBPACK_IMPORTED_MODULE_10__.AES.decrypt(view.replace(/ /g, "+"), "thisisliveurl").toString(crypto_js__WEBPACK_IMPORTED_MODULE_10__.enc.Utf8);
                        const stream = liveTv.filter((item)=>item.url === url)[0];
                        handleEpg(stream);
                        setOnceAutoPlayed(true);
                    } else {
                        getShortEpg(streams[0], pinVerified);
                        setOnceAutoPlayed(true);
                    }
                }
            }
        }
    };
    const getFavouriteChannels = async ()=>{
        try {
            const response = await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_11__/* .getFavourites */ .on)("LiveTv", user.id);
            const ids = response.val() ? Object.keys(response.val()) : [];
            setFavourites(ids);
            let favouriteStreams = [];
            ids.map((id)=>{
                const matchedComp = liveTv.filter((str)=>(0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(String(str.url)) === String(id))[0];
                if (matchedComp) {
                    favouriteStreams.push(matchedComp);
                }
            });
            setFavouriteChannels(favouriteStreams);
        } catch (error) {
            setFavouriteChannels([]);
        }
        getCurrentLiveStreams("fav");
    };
    const getChannelHistory = async ()=>{
        try {
            const response = await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_11__/* .getRecents */ .B4)("LiveTv", user.id);
            const ids = Object.keys(response.val());
            let channelHistory = [];
            ids.map((id)=>{
                const matchedComp = liveTv.filter((str)=>(0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(String(str.url)) === String(id))[0];
                if (matchedComp) {
                    channelHistory.push(matchedComp);
                }
            });
            setChannelHistory(channelHistory);
        } catch (error) {
            setChannelHistory([]);
        }
    };
    const handleEpg = (stream)=>{
        setPlayerSrc(null);
        const streamId = (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(stream?.url);
        getShortEpg(stream, pinVerified);
        setCurrentStreamId(String(streamId));
    };
    const getStreamIdFromUrl = (url)=>{
        const regex = /\/(\d+)\.\w+$/; // Regular expression to match the stream ID before any file extension
        const match = url.match(regex);
        if (match && match.length > 1) {
            return match[1]; // Extracted stream ID
        } else {
            return null; // If no match found
        }
    };
    const handleSearch = (e)=>{
        const { value } = e.target;
        setSearchedValue(value);
        let searchedEntries = liveCategories.filter((ctg)=>ctg.toLowerCase().includes(value.toLowerCase()));
        setSearchedCategories(searchedEntries);
        if (value.length === 0) {
            setSearchOn(false);
            setShowExtraCtg({
                favourite: true,
                channelHistory: true
            });
        } else {
            const isFavourite = "Favourite".toLowerCase().includes(value);
            const isChannelHistory = "Channel History".toLowerCase().includes(value);
            setShowExtraCtg({
                favourite: isFavourite,
                channelHistory: isChannelHistory
            });
            setSearchOn(true);
        }
    };
    const handleFavourite = async (id, isFavourite)=>{
        const favId = (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(id);
        if (isFavourite) {
            await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_11__/* .removeFromFavs */ .h2)(favId, "LiveTv", user.id);
            alert.toggle({
                show: true,
                title: "Removed from Favourites",
                type: "success"
            });
        } else {
            await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_11__/* .addToFavs */ .zg)(favId, "LiveTv", user.id);
            alert.toggle({
                show: true,
                title: "Added to Favourites",
                type: "success"
            });
        }
        getFavouriteChannels();
        alert.toggle({
            title: `${isFavourite ? "Removed from Favourites" : "Added To Favourites"}`,
            show: true,
            type: "success"
        });
    };
    const currentProgress = ()=>{
        const { start, end } = epgs[0];
        const formattedStartDate = typeof start === "number" ? luxon__WEBPACK_IMPORTED_MODULE_12__.DateTime.fromSeconds(start, {
            zone: timeZone
        }).toFormat("yyyy-MM-dd HH:mm:ss") : start;
        const formattedEndDate = typeof end === "number" ? luxon__WEBPACK_IMPORTED_MODULE_12__.DateTime.fromSeconds(end, {
            zone: timeZone
        }).toFormat("yyyy-MM-dd HH:mm:ss") : end;
        const startTime = luxon__WEBPACK_IMPORTED_MODULE_12__.DateTime.fromFormat(formattedStartDate, "yyyy-MM-dd HH:mm:ss", {
            zone: timeZone
        }).setZone("Asia/Kolkata");
        const endTime = luxon__WEBPACK_IMPORTED_MODULE_12__.DateTime.fromFormat(formattedEndDate, "yyyy-MM-dd HH:mm:ss", {
            zone: timeZone
        }).setZone("Asia/Kolkata");
        const convertedStartTime = new Date(startTime).getTime();
        const convertedEndTime = new Date(endTime).getTime();
        const currentTime = new Date().getTime();
        const fullTime = (convertedEndTime - convertedStartTime) / 1000;
        const elapsedTime = (currentTime - convertedStartTime) / 1000;
        const pct = Number((100 * elapsedTime / fullTime).toFixed(2));
        setProgress(pct);
    };
    const saveChannelHistroy = async ()=>{
        setIdExists(false);
        try {
            await _firebase_functions__WEBPACK_IMPORTED_MODULE_11__/* .saveWatchedContent */ .Gg.liveTv(currentStreamId, user.id);
        } catch (error) {
            console.log(error);
        }
    };
    const handlePinVerified = ()=>{
        setPinVerified(true);
        setIsAdult(false);
        if (selectedCategory.category_name === "Favourites" || selectedCategory.category_name === "Channel History") {
            getShortEpg(currentStream, true);
            setSelectedCategory(clickedAdultCtg);
        } else {
            setSelectedCategory(clickedAdultCtg);
        }
    };
    // const handleClearSearch = () => {
    //   setSearchedValue("");
    //   setSearchOn(false);
    //   setShowExtraCtg({
    //     favourite: true,
    //     channelHistory: true,
    //   });
    // };
    const handleClearSearch = (type)=>{
        if (type === "ctg") {
            setSearchedValue("");
            setSearchOn(false);
            setSearchedCategories([]);
            setShowExtraCtg({
                favourite: true,
                channelHistory: true
            });
        } else {
            setSearchChannelOn(false);
            setSearchedChannel("");
            setSearchedChannels([]);
        }
    };
    const handleLiveStream = (e, s)=>{
        setCurrentStream(s);
        const clickedElement = e.target.tagName;
        const isFavourite = clickedElement === "svg" || clickedElement === "path";
        if (!isFavourite) {
            handleEpg(s);
        }
    };
    const handleCategory = (category)=>{
        setPinVerified(false);
        setCurrentStreamId(null);
        const adult = adultCategories.filter((ctg)=>category.toLowerCase().includes(ctg.toLowerCase())).length > 0;
        if (parentalPin) {
            setIsAdult(adult);
            setClickedAdultCtg(category);
            if (!adult) {
                setSelectedCategory(category);
                setPinVerified(false);
            } else {
                if (adult && pinVerified) {
                    setSelectedCategory(category);
                    setIsAdult(false);
                    setPinVerified(false);
                }
            }
        } else {
            setSelectedCategory(category);
            setPinVerified(false);
        }
    };
    const removeChannelHistory = async (id)=>{
        const favId = (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(id);
        try {
            await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_11__/* .removeMovieFromRecents */ .C3)(favId, "LiveTv", user.id, null);
            getChannelHistory();
        } catch (error) {
            console.log(error);
        }
    };
    const handleSearchChannels = (e, val)=>{
        const { value } = e.target;
        setSearchedChannel(value);
        let searchedEntries = (val === "Favourites" ? favouriteChannels : val === "Channel History" ? channelHistory : currentLiveStreams || []).filter((stream)=>stream.name.toLowerCase().includes(value.toLowerCase()));
        setSearchedChannels(searchedEntries);
        if (value.length === 0) {
            setSearchChannelOn(false);
        } else {
            setSearchChannelOn(true);
        }
    };
    return loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_utils_loading__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {}) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_header__WEBPACK_IMPORTED_MODULE_2__["default"], {
                currentAction: "live"
            }),
            noData ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "no-data-found-container",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_16___default()), {
                        src: _assets_noContentFound_svg__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .Z,
                        alt: "live-stream"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                        className: "no-data-found",
                        children: "No Live Streams found"
                    })
                ]
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                className: "liveTv",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        style: {
                            position: "relative"
                        },
                        className: "steamDetail panel",
                        children: epgs.length === 0 && !playerSrc ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.CircularProgress, {
                            className: "loader-icon"
                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "videoPlay",
                                children: currentPlayer.player === "videojs" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_utils_player2__WEBPACK_IMPORTED_MODULE_22__/* ["default"] */ .Z, {
                                    getFavouriteChannels: getFavouriteChannels,
                                    opened: idExists,
                                    favourites: favourites,
                                    src: convertURL(playerSrc, "m3u8"),
                                    currentStreams: currentLiveStreams,
                                    currentStream: currentStreamId,
                                    playingStream: currentStream,
                                    onPlayerReady: saveChannelHistroy,
                                    restart: (index)=>handleEpg(currentLiveStreams[index]),
                                    onPreviousChannel: (index)=>{
                                        if (fullscreen) {
                                            setIdExists(true);
                                        }
                                        handleEpg(currentLiveStreams[index - 1]);
                                    },
                                    onNextChannel: (index)=>{
                                        if (fullscreen) {
                                            setIdExists(true);
                                        }
                                        handleEpg(currentLiveStreams[index + 1]);
                                    },
                                    onfullscreen: (e)=>setFullscreen(e),
                                    onclose: ()=>{
                                        setIdExists(false);
                                        setFullscreen(false);
                                        router.push("/dashboard/live", undefined, {
                                            shallow: true
                                        });
                                    },
                                    type: "m3u"
                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_player__WEBPACK_IMPORTED_MODULE_9__["default"], {
                                    getFavouriteChannels: getFavouriteChannels,
                                    opened: idExists,
                                    favourites: favourites,
                                    url: playerSrc,
                                    src: convertURL(playerSrc, "m3u8"),
                                    currentStreams: currentLiveStreams,
                                    currentStream: currentStreamId,
                                    playingStream: currentStream,
                                    onPlayerReady: saveChannelHistroy,
                                    restart: (index)=>handleEpg(currentLiveStreams[index]),
                                    onPreviousChannel: (index)=>{
                                        if (fullscreen) {
                                            setIdExists(true);
                                        }
                                        handleEpg(currentLiveStreams[index - 1]);
                                    },
                                    onNextChannel: (index)=>{
                                        if (fullscreen) {
                                            setIdExists(true);
                                        }
                                        handleEpg(currentLiveStreams[index + 1]);
                                    },
                                    onfullscreen: (e)=>setFullscreen(e),
                                    onclose: ()=>{
                                        setIdExists(false);
                                        setFullscreen(false);
                                        router.push("/dashboard/live", undefined, {
                                            shallow: true
                                        });
                                    },
                                    type: "m3u"
                                })
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "liveTv-bottom-container",
                        style: {
                            flexDirection: "column",
                            gap: 20
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "live-category-header-bar",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "category-title-group",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                                className: "live-category-heading",
                                                children: typeof selectedCategory === "string" ? selectedCategory : selectedCategory?.category_name || "Channels"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "live-channel-count-badge",
                                                children: [
                                                    currentLiveStreams ? currentLiveStreams.length : 0,
                                                    " Channels"
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "category-dropdown-wrapper",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                htmlFor: "liveCategorySelectM3u",
                                                className: "category-select-label",
                                                children: "Category:"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                                id: "liveCategorySelectM3u",
                                                className: "live-category-select",
                                                value: typeof selectedCategory === "string" ? selectedCategory : selectedCategory?.category_name || "",
                                                onChange: (e)=>{
                                                    const val = e.target.value;
                                                    handleCategory(val);
                                                },
                                                children: [
                                                    showExtraCtg.favourite && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("option", {
                                                        value: "Favourites",
                                                        children: [
                                                            "⭐ Favourites (",
                                                            favouriteChannels.length,
                                                            ")"
                                                        ]
                                                    }),
                                                    showExtraCtg.channelHistory && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("option", {
                                                        value: "Channel History",
                                                        children: [
                                                            "\uD83D\uDD52 Channel History (",
                                                            channelHistory.length,
                                                            ")"
                                                        ]
                                                    }),
                                                    liveCategories.map((category, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                            value: typeof category === "string" ? category : category.category_name,
                                                            children: typeof category === "string" ? category : category.category_name
                                                        }, index))
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "panel tvList",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "pHead",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "controls",
                                            children: [
                                                searchedChannel.length > 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Cancel__WEBPACK_IMPORTED_MODULE_15___default()), {
                                                    sx: {
                                                        zIndex: 9,
                                                        ":hover": {
                                                            cursor: "pointer"
                                                        }
                                                    },
                                                    onClick: ()=>handleClearSearch("channels")
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                                    width: "34",
                                                    height: "34",
                                                    viewBox: "0 0 34 34",
                                                    fill: "none",
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    children: [
                                                        " ",
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                            d: "M24.1175 26.1783C17.3706 31.352 8.08155 29.4127 3.57637 23.2248C-0.68313 17.3743 0.0222769 9.14911 5.26344 4.18996C10.6336 -0.891038 18.8046 -1.19482 24.501 3.47881C30.3196 8.25287 31.6682 16.9694 26.8365 23.4239C26.9409 23.5359 27.0477 23.6578 27.162 23.7719C29.1119 25.7217 31.0609 27.6722 33.0147 29.6185C33.5862 30.1878 33.854 30.8417 33.6315 31.6459C33.2639 32.9734 31.6879 33.5093 30.5881 32.6788C30.431 32.5601 30.2915 32.4168 30.1513 32.277C28.2428 30.3722 26.335 28.4663 24.4296 26.5579C24.3115 26.4402 24.2163 26.3001 24.1175 26.1783ZM15.2969 25.2385C21.1588 25.229 25.8636 20.5245 25.8675 14.668C25.8717 8.79405 21.1448 4.07337 15.2667 4.08145C9.40626 4.08917 4.70179 8.79476 4.69757 14.6522C4.6937 20.528 9.41961 25.248 15.2969 25.2385Z",
                                                            fill: "#748BC8"
                                                        }),
                                                        " "
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                    onChange: (e)=>handleSearchChannels(e, selectedCategory?.category_name),
                                                    value: searchedChannel,
                                                    placeholder: "Search by Channel Name"
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "pBody",
                                        ref: liveStreamsRef,
                                        children: [
                                            (searchChannelOn ? searchedChannels : selectedCategory === "Favourites" ? favouriteChannels : selectedCategory === "Channel History" ? channelHistory : currentLiveStreams).map((stream, index)=>{
                                                const { stream_id } = stream;
                                                const isFavourite = favourites.filter((id)=>String(id) === (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_25__/* .concatUrl */ .C)(String(stream.url))).length > 0;
                                                const isEqual = String(stream_id) === String(currentStreamId);
                                                const ctgName = selectedCategory;
                                                const adult = adultCategories.filter((ctg)=>ctgName.toLowerCase().includes(ctg.toLowerCase())).length > 0;
                                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    onClick: (e)=>handleLiveStream(e, stream),
                                                    style: {
                                                        background: isEqual && "rgb(255,255,255,0.1)"
                                                    },
                                                    className: "list",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "channelList",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                    href: "javascript:void(0)",
                                                                    className: "thumb",
                                                                    children: errorIndex === index ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_16___default()), {
                                                                        alt: "placeholder",
                                                                        src: _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .Z
                                                                    }) : adult && (0,_utils_local__WEBPACK_IMPORTED_MODULE_23__/* .getParentalPin */ .A)("currentUser") && (selectedCategory.category_name === "Favourites" || selectedCategory.category_name === "Channel History") ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_16___default()), {
                                                                        alt: "placeholder",
                                                                        style: {
                                                                            objectFit: "contain",
                                                                            padding: "15px"
                                                                        },
                                                                        src: _assets_lockIcon_svg__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .Z
                                                                    }) : stream.stream_icon ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                        src: stream.stream_icon,
                                                                        onError: ()=>setErrorIndex(index)
                                                                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_16___default()), {
                                                                        alt: "placeholder",
                                                                        src: _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .Z
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    className: "info",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                        href: "javascript:void(0)",
                                                                        children: [
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                                                children: stream.name
                                                                            }),
                                                                            isEqual && currentEpg && atob(currentEpg.title).slice(0, 100),
                                                                            " ",
                                                                            isEqual && currentEpg && atob(currentEpg.title).length > 100 && "..."
                                                                        ]
                                                                    })
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "fav-and-delete",
                                                            style: {
                                                                display: "flex",
                                                                position: "absolute",
                                                                top: 6,
                                                                right: 10,
                                                                gap: 10,
                                                                padding: 5
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                                                    stroke: theme.current === "dark" ? "white" : "black",
                                                                    strokeWidth: 2,
                                                                    onClick: ()=>handleFavourite(stream.url, isFavourite),
                                                                    width: "28",
                                                                    height: "23",
                                                                    viewBox: "0 0 25 23",
                                                                    fill: "none",
                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                    children: [
                                                                        " ",
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                                            d: "M24.7976 7.2086C24.7976 7.54497 24.7976 7.88134 24.7976 8.21745C24.785 8.2871 24.7666 8.35624 24.7611 8.42614C24.6679 9.60254 24.2942 10.6901 23.7202 11.7141C22.9972 13.0041 22.0421 14.1134 20.9974 15.1449C18.4649 17.6453 15.6791 19.8596 13.0023 22.197C12.6849 22.4744 12.3046 22.4572 11.9748 22.1827C11.698 21.9523 11.4259 21.7161 11.1547 21.4789C9.00273 19.5982 6.83161 17.7395 4.70792 15.8278C3.39096 14.6423 2.1868 13.3382 1.31572 11.7747C-0.14759 9.14833 -0.226068 6.48212 1.24456 3.83987C2.05937 2.37555 3.31753 1.39294 4.94058 0.933683C6.67188 0.443893 8.33151 0.62053 9.87507 1.58901C10.8574 2.20547 11.6059 3.05081 12.2188 4.02484C12.3094 4.16867 12.3977 4.31377 12.4631 4.41924C12.9281 3.81943 13.3354 3.18783 13.8459 2.65514C15.6448 0.778747 17.8308 0.205432 20.2936 1.01695C22.6116 1.78079 23.9556 3.49467 24.5549 5.81947C24.6717 6.27318 24.7184 6.74505 24.7976 7.2086Z",
                                                                            fill: isFavourite ? "#FF0000" : "none"
                                                                        })
                                                                    ]
                                                                }),
                                                                selectedCategory === "Channel History" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                                                    onClick: ()=>removeChannelHistory(stream.url),
                                                                    width: "17",
                                                                    height: "24",
                                                                    viewBox: "0 0 30 37",
                                                                    fill: "none",
                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                                            d: "M2.70855 11.3789C11.0812 11.3789 19.3939 11.3789 27.7294 11.3789C27.7446 11.4827 27.7696 11.5774 27.7704 11.6722C27.7802 15.5732 27.8673 19.4765 27.7704 23.3744C27.6984 26.2888 27.4331 29.201 27.1725 32.1063C26.9504 34.5827 24.8378 36.5468 22.3538 36.5695C17.6124 36.6135 12.871 36.615 8.12965 36.5695C5.54262 36.5445 3.4451 34.4356 3.27006 31.8585C3.09577 29.2881 2.90178 26.7193 2.7184 24.1489C2.70703 23.9928 2.70779 23.8359 2.70779 23.6791C2.70703 19.7637 2.70703 15.8475 2.70703 11.9321C2.70855 11.7646 2.70855 11.5964 2.70855 11.3789Z",
                                                                            fill: "white"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                                            d: "M15.2806 8.74084C10.9954 8.74084 6.70943 8.74615 2.42423 8.73099C2.08399 8.72948 1.70511 8.6537 1.41261 8.49078C0.801085 8.14978 0.545716 7.47612 0.715457 6.89415C0.9049 6.24323 1.54219 5.75825 2.25222 5.75371C3.63288 5.74537 5.0143 5.74007 6.39496 5.75901C6.72004 5.76356 6.90797 5.66505 7.07999 5.38846C7.69454 4.39805 8.32955 3.41977 8.96987 2.44603C9.88298 1.05855 11.1871 0.261373 12.833 0.185595C14.5516 0.106029 16.2809 0.0984515 17.9995 0.185595C19.9076 0.28259 21.2427 1.3662 22.1665 2.98481C22.5893 3.72591 22.9932 4.47913 23.3653 5.246C23.5494 5.62564 23.7654 5.77492 24.2056 5.76356C25.5575 5.72794 26.9109 5.73931 28.2628 5.75446C29.3282 5.76659 29.9981 6.60544 29.7722 7.60722C29.6374 8.20813 29.1372 8.65976 28.5212 8.72266C28.3234 8.74312 28.1233 8.73933 27.924 8.73933C23.7093 8.74084 19.4953 8.74084 15.2806 8.74084ZM20.4471 5.72491C20.125 5.20432 19.784 4.75951 19.5559 4.26317C19.1339 3.34323 18.4223 2.9545 17.4531 2.95146C15.9732 2.94768 14.4933 2.9454 13.0133 2.95222C12.3556 2.95525 11.7524 3.1697 11.3531 3.69105C10.8742 4.31621 10.4763 5.00427 10.0042 5.72415C13.5188 5.72491 16.9409 5.72491 20.4471 5.72491Z",
                                                                            fill: "white"
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }, index);
                                            }),
                                            selectedCategory === "Favourites" && favouriteChannels.length === 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                                className: "no-category-found",
                                                children: "No Favourite Streams found !"
                                            }) : selectedCategory === "Channel History" && channelHistory.length === 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                                className: "no-category-found",
                                                children: "No Channel History found !"
                                            }) : currentLiveStreams.length === 0 && selectedCategory !== "Favourites" && selectedCategory !== "Channel History" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                                className: "no-category-found",
                                                children: "No Live streams found !"
                                            }) : null,
                                            searchChannelOn && searchedChannels.length === 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                                className: "no-category-found",
                                                children: "No Live Streams Found !"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_utils_parentalLock__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z, {
                action: "verify",
                close: ()=>setIsAdult(false),
                open: isAdult,
                completed: handlePinVerified
            }),
            idExists && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.Backdrop, {
                sx: {
                    background: "black",
                    position: "fixed",
                    top: 0,
                    zIndex: 9999,
                    left: 0,
                    width: "100%",
                    height: "100%"
                },
                open: true,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.CircularProgress, {
                    sx: {
                        color: "white"
                    }
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (M3ULive);


/***/ }),

/***/ 6764:
/***/ (() => {



/***/ })

};
;