exports.id = 4101;
exports.ids = [4101];
exports.modules = {

/***/ 4101:
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
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1231);
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
/* harmony import */ var _utils_local__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(5976);
/* harmony import */ var _mui_icons_material_Cancel__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(3733);
/* harmony import */ var _mui_icons_material_Cancel__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Cancel__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _assets_noContentFound_svg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(614);
/* harmony import */ var _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(1536);
/* harmony import */ var _assets_lockIcon_svg__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(2814);
/* harmony import */ var _utils_player2__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(133);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(6666);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(firebase_database__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(8837);
/* harmony import */ var _noEpg__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(9015);

























const LiveTv = ()=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_13__.useRouter)();
    const liveStreamsRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { makeRequest } = (0,_hooks_useApi__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)();
    const { view } = (0,next_router__WEBPACK_IMPORTED_MODULE_13__.useRouter)().query;
    const { user, alert, streamData, currentPlayer, epgSrc, theme } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_contexts_app__WEBPACK_IMPORTED_MODULE_5__/* .AppContext */ .I);
    const { liveTv } = streamData;
    const [liveCategories, setLiveCategories] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [searchedCategories, setSearchedCategories] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [searchedChannels, setSearchedChannels] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [liveStreams, setLiveStreams] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [selectedCategory, setSelectedCategory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [currentLiveStreams, setCurrentLiveStreams] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [epgs, setEpgs] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [externalEgps, setExternalEgps] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [playerSrc, setPlayerSrc] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [favourites, setFavourites] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [progress, setProgress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [currentStreamId, setCurrentStreamId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [currentStream, setCurrentStream] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [timerStart, setTimerStart] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [favouriteChannels, setFavouriteChannels] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [channelHistory, setChannelHistory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [searchOn, setSearchOn] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [searchChannelOn, setSearchChannelOn] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
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
    const parentalPin = (0,_utils_local__WEBPACK_IMPORTED_MODULE_24__/* .getParentalPin */ .A)("currentUser");
    const [searchedValue, setSearchedValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [searchedChannel, setSearchedChannel] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [errorIndex, setErrorIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [clickedAdultCtg, setClickedAdultCtg] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [screenWidth, setScreenWidth] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [currentEpg, setCurrentEpg] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [filteredStreams, setFilteredStreams] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
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
    const database = (0,firebase_database__WEBPACK_IMPORTED_MODULE_21__.getDatabase)(_firebase__WEBPACK_IMPORTED_MODULE_22__/* .app */ .l);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (user) {
            getLiveData(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__/* .endpoint */ .FP.getLiveCategories, setLiveCategories, "categories");
            getLiveData(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__/* .endpoint */ .FP.getLiveStreams, setLiveStreams, "streams");
            (0,firebase_database__WEBPACK_IMPORTED_MODULE_21__.onValue)((0,firebase_database__WEBPACK_IMPORTED_MODULE_21__.ref)(database, `${user.dbAddress}/Fav/LiveTv`), (snapshot)=>{
                getFavouriteChannels();
            });
            (0,firebase_database__WEBPACK_IMPORTED_MODULE_21__.onValue)((0,firebase_database__WEBPACK_IMPORTED_MODULE_21__.ref)(database, `${user.dbAddress}/Recent/LiveTv`), (snapshot)=>{
                getChannelHistory();
            });
        }
    }, [
        user
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (user && liveTv.streams && selectedCategory) {
            // setCurrentLiveStreams([])
            getFavouriteChannels();
            getChannelHistory();
            getCurrentLiveStreams(false, false);
        // liveStreamsRef.current.scrollTo(0, 500)
        }
    }, [
        user,
        liveTv.streams,
        selectedCategory
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (liveCategories.length > 0 && liveTv.streams) {
            if (view) {
                const categoryId = liveTv.streams.filter((stream)=>String(stream.stream_id) === String(view))[0].category_id ? liveTv.streams.filter((stream)=>String(stream.stream_id) === String(view))[0].category_id : liveTv.streams.filter((stream)=>String(stream.stream_id) === String(view))[0].categories[0];
                const foundedCategory = liveCategories.filter((ctg)=>String(ctg.category_id) === String(categoryId))[0];
                const currentStrm = liveTv.streams.filter((stream)=>String(stream.stream_id) === view)[0];
                setSelectedCategory(foundedCategory);
                setCurrentStreamId(view);
                setCurrentStream(currentStrm);
            } else {
                setSelectedCategory(liveCategories[0]);
                const streams = filteredStreams?.filter((stream)=>String(stream.category_id ? stream.category_id : stream.categories && stream.categories.length > 0 ? stream.categories[0] : stream.category_ids[0]) === String(liveCategories[0].category_id ? liveCategories[0].category_id : liveCategories.categories[0]));
                setCurrentStreamId(streams[0]?.stream_id);
                setCurrentStream(streams[0]);
                getCurrentLiveStreams(null, true);
            }
        }
    }, [
        liveCategories,
        liveTv.streams
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        // setCurrentLiveStreams([]);
        if (selectedCategory && liveTv.streams && liveStreamsRef.current) {
            getCurrentLiveStreams(false, false);
            getChannelHistory();
            getFavouriteChannels();
            liveStreamsRef.current.scrollTo(0, 0);
        }
    }, [
        selectedCategory,
        liveTv.streams,
        liveStreamsRef
    ]);
    // useEffect(() => {
    //     if (externalEgps.length > 0 && epgContainerRef.current && epgSrc.currentEpgSrc && epgSrc.currentEpgSrc.data) {
    //         currentProgress();
    //         setTimerStart(true)
    //         const currentEpgIndex = externalEgps.indexOf(externalEgps.filter(epg => {
    //             const isFinished = epg.timings.isTimePassed;
    //             const currentRunning = epg.timings.isWithinTime;
    //             return currentRunning;
    //         })[0]);
    //         const formattedEpgIndex = currentEpgIndex < 0 ? 1 : currentEpgIndex
    //             setCurrentEpg(externalEgps[currentEpgIndex]);
    //         epgContainerRef.current.scrollTo({
    //             top: (formattedEpgIndex) * (screenWidth > 768 ? 40 : 30),
    //             behavior: "smooth"
    //         })
    //     }
    // }, [externalEgps, epgContainerRef.current]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (currentStream) {
            getShortEpg(currentStream.stream_id, false);
        }
    }, [
        currentStream
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
                    handleEpg(currentLiveStreams.filter((stream)=>String(stream.stream_id) === String(currentStreamId))[0]);
                }, delay);
                return ()=>clearTimeout(timer);
            }
            ;
        }
    }, [
        currentStreamId,
        timerStart,
        epgs
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (epgs.length > 0) {
            setCurrentEpg({
                ...epgs[0],
                start: formattedStartTime(epgs[0].start ? epgs[0].start : epgs[0].start_timestamp),
                end: formattedStartTime(epgs[0].stop ? epgs[0].stop : epgs[0].end ? epgs[0].end : epgs[0].timestamp),
                stop: formattedStartTime(epgs[0].stop ? epgs[0].stop : epgs[0].end ? epgs[0].end : epgs[0].timestamp)
            });
        }
    }, [
        epgs
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setScreenWidth(window.innerWidth);
    }, []);
    const timeZone = user && user.loginType !== "m3u" ? JSON.parse(crypto_js__WEBPACK_IMPORTED_MODULE_10__.AES.decrypt(user.serverInfo, "thisisserverinfo").toString(crypto_js__WEBPACK_IMPORTED_MODULE_10__.enc.Utf8)).timezone : "America/NewYork";
    function formatDateToYYYYMMDDHHMMSS(inputDate, notTimestamp) {
        if (notTimestamp) {
            const year = inputDate.slice(0, 4);
            const month = inputDate.slice(4, 6);
            const day = inputDate.slice(6, 8);
            const hours = inputDate.slice(8, 10);
            const minutes = inputDate.slice(10, 12);
            const seconds = inputDate.slice(12, 14);
            const formattedTimestamp = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
            return formattedTimestamp;
        }
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
    function convertToTimezone(timestamp, dt) {
        // Extract date and time components from the timestamp
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const year = timestamp.slice(0, 4);
        const month = timestamp.slice(4, 6);
        const day = timestamp.slice(6, 8);
        const hour = timestamp.slice(8, 10);
        const minute = timestamp.slice(10, 12);
        const second = timestamp.slice(12, 14);
        let sign = timestamp.slice(15, 16); // Extract the sign
        let offsetHours = parseInt(timestamp.slice(16, 18).length > 0 ? timestamp.slice(16, 18) : 0); // Extract the hours
        // Create a Date object in UTC
        const utcDate = new Date(Date.UTC(year, month - 1, day, `${parseInt(hour) + (sign === "+" ? -offsetHours : offsetHours)}`, parseInt(minute), second));
        // Format the date to the target timezone in hh:mm am/pm format
        const options = {
            timeZone: timezone,
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        };
        const formatter = new Intl.DateTimeFormat("en-US", options);
        const formattedDate = formatter.format(utcDate);
        if (dt) {
            return new Date(utcDate.toLocaleString("en-US", {
                timeZone: timezone
            }));
        }
        return formattedDate;
    }
    function checkTimeConditions(startTimestamp, endTimestamp) {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const startTime = convertToTimezone(startTimestamp, true);
        const endTime = convertToTimezone(endTimestamp, true);
        const currentTime = new Date().toLocaleString("en-US", {
            timeZone: timezone
        });
        const currentTimeObj = new Date(currentTime);
        const isWithinTime = currentTimeObj >= startTime && currentTimeObj <= endTime;
        const isTimePassed = currentTimeObj > endTime;
        return {
            isWithinTime,
            isTimePassed
        };
    }
    const formattedStartTime = (time)=>{
        const dt = new Date(time).getTime();
        if (dt.toString() !== "NaN") {
            if (user.loginType === "one-stream-panel") {
                const parsedTime = formatDateToYYYYMMDDHHMMSS(dt);
                const foreignTime = luxon__WEBPACK_IMPORTED_MODULE_12__.DateTime.fromFormat(parsedTime, "yyyy-MM-dd HH:mm:ss").toFormat("hh:mm a");
                return foreignTime;
                ;
            } else {
                const parsedTime = formatDateToYYYYMMDDHHMMSS(dt);
                const foreignTime = luxon__WEBPACK_IMPORTED_MODULE_12__.DateTime.fromFormat(parsedTime, "yyyy-MM-dd HH:mm:ss", {
                    zone: timeZone
                });
                const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const indianTime = foreignTime.setZone(currentTimezone).toFormat("hh:mm a");
                return indianTime;
            }
        }
        return null;
    };
    const getLiveData = async (endpoint, setFn, type)=>{
        setLoading(true);
        try {
            const response = await makeRequest().get(endpoint);
            const data = response.data.message;
            if (data === "Something went wrong!" || data.length === 0) {
                setNoData(true);
                setFn([]);
            } else {
                setNoData(false);
                setFn(data);
                if (type === "streams") {
                    liveTv.toggle(data, "streams");
                }
                if (type === "categories") {
                    liveTv.toggle(data, "categories");
                }
            }
        } catch (error) {
            setLiveStreams(null);
            console.log("Error", error);
        }
        setLoading(false);
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
        return liveTv.streams.filter((stm)=>String(stm?.stream_id) === String(id))[0].links.m3u8;
    };
    const isToday = (timestamp)=>{
        // Parse the timestamp
        let year = parseInt(timestamp.slice(0, 4));
        let month = parseInt(timestamp.slice(4, 6)) - 1; // JavaScript months are 0-based
        let day = parseInt(timestamp.slice(6, 8));
        // Create a Date object for the provided timestamp
        let providedDate = new Date(year, month, day);
        // Get the current date
        let currentDate = new Date();
        // Compare the year, month, and day of the provided date with the current date
        return providedDate.getFullYear() === currentDate.getFullYear() && providedDate.getMonth() === currentDate.getMonth() && providedDate.getDate() === currentDate.getDate();
    };
    const getShortEpg = async (id, verified)=>{
        setEpgs([]);
        setExternalEgps([]);
        const getCtgId = liveTv.streams.filter((stm)=>String(stm?.stream_id) === String(id))[0]?.category_id ? liveTv.streams.filter((stm)=>String(stm?.stream_id) === String(id))[0]?.category_id : liveTv.streams.filter((stm)=>String(stm?.stream_id) === String(id))[0]?.categories[0];
        const ctgName = liveTv.streamCategories.filter((ctg)=>String(ctg?.category_id) === String(getCtgId))[0]?.category_name;
        const epgChannelId = liveTv.streams.filter((stm)=>String(stm?.stream_id) === String(id))[0]?.epg_channel_id;
        const matchedProgramme = epgSrc?.data?.tv?.programme?.filter((programme)=>programme["$"].channel === epgChannelId).filter((epg)=>isToday(epg.$.start));
        setPlayerSrc(null);
        const adult = adultCategories.filter((ctg)=>ctgName.toLowerCase().includes(ctg.toLowerCase())).length > 0;
        const runEpg = async ()=>{
            try {
                const response = await makeRequest().get(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__/* .endpoint */ .FP.getEpg + `?stream_id=${id}`);
                const { epg_listings, streamUrl } = response.data.message;
                const { loginType } = user;
                // if (epgSrc.currentEpgSrc && epgSrc.currentEpgSrc.data) {
                //     if (matchedProgramme && matchedProgramme.length > 0) {
                //         // const formattedEpgs = matchedProgramme.map(programme => { return { start: formatDateToYYYYMMDDHHMMSS(programme["$"].start, true), stop: formatDateToYYYYMMDDHHMMSS(matchedProgramme["$"].stop, true), title: btoa(programme.title[0]) } })
                //         setExternalEgps(matchedProgramme.map(programme => ({
                //             start: convertToTimezone(programme.$.start, false),
                //             stop: convertToTimezone(programme.$.stop, false),
                //             end: convertToTimezone(programme.$.stop, false),
                //             timings: checkTimeConditions(programme.$.start, programme.$.stop),
                //             title: btoa(programme.title[0]),
                //             desc: btoa(programme.desc[0]),
                //         })));
                //     } else {
                //         setExternalEgps([]);
                //     }
                //     // setEpgs(epg_listings ? epg_listings: [])
                // } else {
                setEpgs(epg_listings ? epg_listings : []);
                // }
                setPlayerSrc(loginType === "one-stream-panel" ? getOneStreamURL(id) : streamUrl);
            } catch (error) {
                console.log(error);
            }
        };
        if (pinVerified) {
            runEpg();
        } else {
            if (parentalPin) {
                setIsAdult(adult);
                if (!adult) {
                    runEpg();
                    setPinVerified(false);
                } else {
                    if (adult && verified) {
                        runEpg();
                        setIsAdult(false);
                        setPinVerified(false);
                    }
                }
            } else {
                runEpg();
            }
        }
    };
    const getCurrentLiveStreams = (type, firstLoad)=>{
        const currentCategory = firstLoad ? liveTv.streamCategories[0] : selectedCategory;
        if (currentCategory.category_name !== "Favourites" && currentCategory.category_name !== "Channel History") {
            const streams = liveTv.streams.filter((stream)=>String(stream?.category_id) === String(currentCategory?.category_id) || stream?.categories?.filter((id)=>String(id) === String(currentCategory.category_id)).length > 0);
            setCurrentLiveStreams(streams);
            if (!view) {
                if (firstLoad) {
                    setCurrentStreamId(streams[0].stream_id);
                }
                if (!onceAutoPlayed) {
                    handleEpg(streams[0]);
                    setCurrentStream(streams[0]);
                    setOnceAutoPlayed(true);
                }
            }
            ;
            if (!onceAutoPlayed) {
                type !== "fav" && getShortEpg(!view ? streams[0]?.stream_id : view, view ? true : pinVerified);
                setOnceAutoPlayed(true);
            }
        } else {
            if (currentCategory.category_name === "Favourites") {
                setCurrentLiveStreams(favouriteChannels);
            } else if (currentCategory.category_name === "Channel History") setCurrentLiveStreams(channelHistory);
        }
    };
    const getFavouriteChannels = async ()=>{
        try {
            const response = await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_11__/* .getFavourites */ .on)("LiveTv", user.dbAddress);
            const ids = response.val() ? Object.keys(response.val()) : [];
            const values = response.val() ? Object.values(response.val()) : [];
            const merge = ()=>{
                const mergedArr = [];
                ids.forEach((id, index)=>mergedArr.push({
                        id,
                        timestamp: values[index]
                    }));
                return mergedArr;
            };
            setFavourites(ids);
            let favouriteStreams = [];
            merge().map((strm)=>{
                const matchedComp = liveTv.streams.filter((str)=>String(str.stream_id) === String(strm.id))[0];
                if (matchedComp) {
                    favouriteStreams.push({
                        ...matchedComp,
                        timestamp: strm.timestamp
                    });
                }
            });
            const sorted = favouriteStreams.sort((objA, objB)=>objB.timestamp - objA.timestamp);
            setFavouriteChannels(sorted);
        } catch (error) {
            setFavouriteChannels([]);
        }
        ;
    // getCurrentLiveStreams('fav');
    };
    const getChannelHistory = async ()=>{
        try {
            const response = await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_11__/* .getRecents */ .B4)("LiveTv", user.dbAddress);
            const ids = response.val() ? Object.keys(response.val()) : [];
            const values = response.val() ? Object.values(response.val()) : [];
            const merge = ()=>{
                const mergedArr = [];
                ids.forEach((id, index)=>mergedArr.push({
                        id,
                        timestamp: values[index]
                    }));
                return mergedArr;
            };
            let channelHistory = [];
            merge().map((strm)=>{
                const matchedComp = liveTv.streams.filter((str)=>String(str.stream_id) === String(strm.id));
                if (matchedComp.length > 0) {
                    channelHistory.push({
                        ...matchedComp[0],
                        timestamp: strm.timestamp
                    });
                }
            });
            const sorted = channelHistory.sort((objA, objB)=>objB.timestamp - objA.timestamp);
            setChannelHistory(sorted);
        } catch (error) {
            setChannelHistory([]);
        }
        ;
    };
    const handleEpg = (stream)=>{
        const { stream_id } = stream;
        setPlayerSrc(null);
        getShortEpg(String(stream_id), pinVerified);
        setCurrentStreamId(String(stream_id));
        setCurrentStream(stream);
    };
    const handleSearch = (e)=>{
        const { value } = e.target;
        setSearchedValue(value);
        let searchedEntries = liveTv.streamCategories.filter((ctg)=>ctg.category_name.toLowerCase().includes(value.toLowerCase()));
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
    const handleFavourite = async (id, isFavourite)=>{
        if (isFavourite) {
            await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_11__/* .removeFromFavs */ .h2)(id, "LiveTv", user.dbAddress);
        } else {
            await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_11__/* .addToFavs */ .zg)(id, "LiveTv", user.dbAddress);
        }
        getFavouriteChannels();
        alert.toggle({
            title: `${isFavourite ? "Removed from Favourites" : "Added To Favourites"}`,
            show: true,
            type: "success"
        });
    };
    const currentProgress = ()=>{
        const { start, end } = epgSrc.currentEpgSrc && epgSrc.currentEpgSrc.data ? externalEgps[0] : epgs[0];
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
            await _firebase_functions__WEBPACK_IMPORTED_MODULE_11__/* .saveWatchedContent */ .Gg.liveTv(currentStreamId, user.dbAddress);
        } catch (error) {
            console.log(error);
        }
    };
    const handlePinVerified = ()=>{
        setPinVerified(true);
        setIsAdult(false);
        if (selectedCategory.category_name === "Favourites" || selectedCategory.category_name === "Channel History") {
            getShortEpg(currentStreamId, true);
            setSelectedCategory(clickedAdultCtg);
        } else {
            setSelectedCategory(clickedAdultCtg);
        }
    };
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
        const clickedElement = e.target.tagName;
        const isFavourite = clickedElement === "svg" || clickedElement === "path";
        if (!isFavourite) {
            handleEpg(s);
            setCurrentEpg(null);
            setCurrentStream(s);
        }
    };
    const handleCategory = (category)=>{
        setSearchChannelOn(false);
        setSearchedChannel("");
        setPinVerified(false);
        const adult = adultCategories.filter((ctg)=>category.category_name.toLowerCase().includes(ctg.toLowerCase())).length > 0;
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
        try {
            await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_11__/* .removeMovieFromRecents */ .C3)(id, "LiveTv", user.dbAddress, null);
            getChannelHistory();
        } catch (error) {
            console.log(error);
        }
    };
    const playerRef = react__WEBPACK_IMPORTED_MODULE_1___default().useRef(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (liveTv.streams) {
            const streamsWithcid = liveTv.streams.filter((stream)=>stream.category_id !== null);
            setFilteredStreams(streamsWithcid);
        }
    }, [
        liveTv.streams
    ]);
    const HoverCard = ()=>{
        if (!hoveredCard || !hoveredCard.item || !hoveredCard.rect) return null;
        const { item, rect } = hoveredCard;
        const id = item.stream_id || item.id;
        const title = item.name || item.title || "";
        const imgUrl = item.stream_icon || item.cover;
        const isFavourite = favourites.filter((favId)=>String(favId) === String(id)).length > 0;
        const cardWidth = 300;
        const cardHeight = 320;
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
            setHoveredCard(null);
            handleLiveStream(e, item);
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
                                    e.target.src = _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .Z.src || _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .Z;
                                }
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_16___default()), {
                                alt: "placeholder",
                                layout: "fill",
                                objectFit: "contain",
                                src: _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .Z
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
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            handleFavourite(id, isFavourite);
                                        },
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
                                                d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                            })
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "hover-card-meta",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                    className: "hover-card-title",
                                    children: title
                                })
                            })
                        ]
                    })
                ]
            })
        });
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
                        children: !playerSrc ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "stream-interrupted-container",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "stream-interrupted-card",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "stream-interrupted-icon",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                            width: "32",
                                            height: "32",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2.5",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                                                    cx: "12",
                                                    cy: "12",
                                                    r: "10"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("line", {
                                                    x1: "12",
                                                    y1: "8",
                                                    x2: "12",
                                                    y2: "12"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("line", {
                                                    x1: "12",
                                                    y1: "16",
                                                    x2: "12.01",
                                                    y2: "16"
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                        children: "Stream Interrupted"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: "We're unable to connect to the video source. Please check your connection or select a channel from below."
                                    })
                                ]
                            })
                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "videoPlay",
                                style: {
                                    overflow: "hidden"
                                },
                                children: currentPlayer.player === "videojs" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_utils_player2__WEBPACK_IMPORTED_MODULE_20__/* ["default"] */ .Z, {
                                    opened: idExists,
                                    src: playerSrc,
                                    currentEpg: currentEpg,
                                    favourites: favourites,
                                    currentStreams: currentLiveStreams,
                                    currentStream: currentStream,
                                    getFavouriteChannels: getFavouriteChannels,
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
                                        router.push("/dashboard/live");
                                    },
                                    type: "player-api"
                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_player__WEBPACK_IMPORTED_MODULE_9__["default"], {
                                    opened: idExists,
                                    currentEpg: currentEpg,
                                    src: playerSrc,
                                    favourites: favourites,
                                    currentStreams: currentLiveStreams,
                                    currentStream: currentStream,
                                    getFavouriteChannels: getFavouriteChannels,
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
                                        router.push("/dashboard/live");
                                    },
                                    type: "player-api"
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
                                                children: selectedCategory?.category_name || "Channels"
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
                                                htmlFor: "liveCategorySelect",
                                                className: "category-select-label",
                                                children: "Category:"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                                id: "liveCategorySelect",
                                                className: "live-category-select",
                                                value: selectedCategory?.category_name || "",
                                                onChange: (e)=>{
                                                    const val = e.target.value;
                                                    if (val === "Favourites") {
                                                        handleCategory({
                                                            category_name: "Favourites"
                                                        });
                                                    } else if (val === "Channel History") {
                                                        handleCategory({
                                                            category_name: "Channel History"
                                                        });
                                                    } else {
                                                        const catObj = liveCategories.find((c)=>c.category_name === val);
                                                        if (catObj) handleCategory(catObj);
                                                    }
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
                                                            value: category.category_name,
                                                            children: category.category_name
                                                        }, index))
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "live-channels-grid",
                                children: (searchChannelOn ? searchedChannels : currentLiveStreams).map((stream, index)=>{
                                    const { stream_id } = stream;
                                    const isFavourite = favourites.filter((id)=>String(id) === String(stream_id)).length > 0;
                                    const isEqual = String(stream_id) === String(currentStreamId);
                                    const ctgName = liveTv.streamCategories.filter((ctg)=>String(ctg.category_id) === String(stream.category_id ? stream.category_id : stream.categories[0]))[0]?.category_name;
                                    const adult = adultCategories.filter((ctg)=>ctgName?.toLowerCase().includes(ctg.toLowerCase())).length > 0;
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        onClick: (e)=>handleLiveStream(e, stream),
                                        onMouseEnter: (e)=>handleCardMouseEnter(e, stream),
                                        onMouseLeave: handleCardMouseLeave,
                                        className: `item ${isEqual ? "active" : ""}`,
                                        style: {
                                            outline: isEqual ? "2px solid #6366f1" : "none"
                                        },
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "thumb",
                                                children: errorIndex === index ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_16___default()), {
                                                    alt: "placeholder",
                                                    layout: "fill",
                                                    objectFit: "contain",
                                                    src: _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .Z
                                                }) : adult && (0,_utils_local__WEBPACK_IMPORTED_MODULE_24__/* .getParentalPin */ .A)("currentUser") && (selectedCategory.category_name === "Favourites" || selectedCategory.category_name === "Channel History") ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_16___default()), {
                                                    alt: "placeholder",
                                                    layout: "fill",
                                                    objectFit: "contain",
                                                    style: {
                                                        padding: "15px"
                                                    },
                                                    src: _assets_lockIcon_svg__WEBPACK_IMPORTED_MODULE_19__/* ["default"] */ .Z
                                                }) : stream.stream_icon ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                    src: stream.stream_icon,
                                                    onError: ()=>setErrorIndex(index),
                                                    alt: stream.name
                                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_16___default()), {
                                                    alt: "placeholder",
                                                    layout: "fill",
                                                    objectFit: "contain",
                                                    src: _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .Z
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "caption",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "h2",
                                                    children: stream.name
                                                })
                                            })
                                        ]
                                    }, index);
                                })
                            }),
                            selectedCategory?.category_name === "Favourites" && favouriteChannels.length === 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                className: "no-category-found",
                                children: "No Favourite Streams found !"
                            }) : selectedCategory?.category_name === "Channel History" && channelHistory.length === 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                className: "no-category-found",
                                children: "No Channel History found !"
                            }) : currentLiveStreams.length === 0 && selectedCategory?.category_name !== "Favourites" && selectedCategory?.category_name !== "Channel History" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                className: "no-category-found",
                                children: "No Live streams found !"
                            }) : null
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
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(HoverCard, {})
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LiveTv);


/***/ }),

/***/ 9015:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* __next_internal_client_entry_do_not_use__ default auto */ 

const NoEpg = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "no-epg-found",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
            children: "No Epgs found related to this channel !"
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NoEpg);


/***/ }),

/***/ 1231:
/***/ (() => {



/***/ })

};
;