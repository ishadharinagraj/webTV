exports.id = 7071;
exports.ids = [7071];
exports.modules = {

/***/ 7071:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_virtualized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6325);
/* harmony import */ var react_virtualized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_virtualized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3689);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2259);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _utils_parentalLock__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4066);
/* harmony import */ var _contexts_app__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2805);
/* harmony import */ var _firebase_functions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2313);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1536);
/* harmony import */ var _assets_noContentFound_svg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(614);
/* harmony import */ var _utils_local__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(5976);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5666);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var iptv_playlist_parser__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(7775);
/* harmony import */ var iptv_playlist_parser__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(iptv_playlist_parser__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _utils_loading__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(9637);
/* harmony import */ var _methods_concatUrl__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(1651);




















const SearchedItems = ()=>{
    const navigate = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
    const { user, streamData, m3uStreams, m3uUrl, homeM3uStreams } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(_contexts_app__WEBPACK_IMPORTED_MODULE_8__/* .AppContext */ .I);
    const [movies, setMovies] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const [series, setSeries] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const [liveStreams, setLiveStreams] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const { movies: m3uMoviesData, series: m3uSeriesData, live: m3uLiveData } = m3uStreams.streams;
    //favourites
    const [moviesFavs, setMoviesFavs] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const [seriesFavs, setSeriesFavs] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const [liveStreamsFavs, setLiveStreamsFavs] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const [noData, setNoData] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [currentTab, setCurrentTab] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)("Movies");
    const [showParentalLock, setShowParentalLock] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [currentSelected, setCurrentSelected] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(movies);
    const [currentItem, setCurrentItem] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)("");
    const [errorIndex, setErrorIndex] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [noType, setNoType] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [noMoviesSeries, setNoMoviesSeries] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [categories, setCategories] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const [currentAdultItem, setCurrentAdultItem] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const [searchedItem, setSearchedItem] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)("");
    const currentType = currentTab === "Movies" ? "movies" : "series";
    const handleTab = (e, newtab)=>{
        setCurrentTab(newtab);
        if (newtab === "Movies") {
            setCurrentSelected(movies);
        } else if (newtab === "Series") {
            setCurrentSelected(series);
        } else {
            setCurrentSelected(liveStreams);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        handleTab(null, currentTab);
    }, [
        movies,
        series,
        liveStreams
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (user) {
            getFavs(setMoviesFavs, "Movie");
            getFavs(setSeriesFavs, "Series");
            getFavs(setLiveStreamsFavs, "LiveTv");
        }
    }, [
        user
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (!m3uMoviesData && !m3uSeriesData && !m3uLiveData) {
            getM3uStreams();
            setNoType(false);
        }
    }, [
        m3uMoviesData,
        m3uSeriesData,
        m3uLiveData
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (homeM3uStreams.streams) {
            const moviesSeries = homeM3uStreams.streams.filter((stream)=>stream.url.includes("/movie/") || stream.url.includes("/series/")).length > 0;
            setNoMoviesSeries(moviesSeries);
            if (!moviesSeries) {
                setCurrentSelected(homeM3uStreams.streams);
            }
            const combinedCategories = [];
            homeM3uStreams.streams.map((item1)=>{
                const exists = combinedCategories.filter((ctg)=>String(ctg) === String(item1.group.title)).length > 0;
                if (!exists) {
                    combinedCategories.push(item1.group.title);
                }
            });
            setCategories(combinedCategories);
        }
    }, [
        homeM3uStreams.streams
    ]);
    const getM3uStreams = async ()=>{
        setLoading(true);
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_16___default().get(m3uUrl.url);
            const parsedData = (0,iptv_playlist_parser__WEBPACK_IMPORTED_MODULE_15__.parse)(response.data);
            const isValid = parsedData.items.filter((item1)=>item1.group.title.length > 0 && item1.name.length > 0).length > 0;
            if (parsedData && isValid) {
                const movies = parsedData.items.filter((item1)=>item1.url.includes("/movie/"));
                const series = parsedData.items.filter((item1)=>item1.url.includes("/series/"));
                const live = parsedData.items.filter((item1)=>!item1.url.includes("/movie/") && !item1.url.includes("/series/"));
                m3uStreams.toggle(movies, series, live);
                homeM3uStreams.toggle(parsedData.items);
            }
        } catch (error) {
            console.log("ERROR", error);
        }
        setLoading(false);
    };
    const getFavs = async (setFn, type)=>{
        try {
            const response = await (0,_firebase_functions__WEBPACK_IMPORTED_MODULE_9__/* .getFavourites */ .on)(type, user.id);
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
    const ITEMS_COUNT = currentSelected.length;
    const parentalPin = (0,_utils_local__WEBPACK_IMPORTED_MODULE_18__/* .getParentalPin */ .A)("currentUser");
    const isAdult = (data)=>{
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
        const { movies, series, live } = m3uStreams.streams;
        const category_id = data.group.title;
        let adultCategoryIds = [];
        adultArray.map((item1)=>{
            const adultCategoryId = categories.filter((ctg)=>ctg.toLowerCase().includes(item1.toLowerCase()));
            if (adultCategoryId) {
                adultCategoryIds.push(...adultCategoryId);
            }
        });
        const match = category_id;
        if (match && adultCategoryIds.filter((id)=>String(id) === String(match)).length > 0) {
            return true;
        }
        return false;
    };
    const handleItem = (item1)=>{
        const id = currentTab === "Movies" || currentTab === "LiveTv" ? "stream_id" : "series_id";
        setCurrentItem(item1);
        const encryptedName = encodeURIComponent(crypto_js__WEBPACK_IMPORTED_MODULE_14__.AES.encrypt(item1.name, "thisismovie").toString());
        if (currentTab === "LiveTv") {
            if (isAdult(item1) && parentalPin) {
                setShowParentalLock(true);
                setCurrentAdultItem(item1);
            } else {
                const encrypted = crypto_js__WEBPACK_IMPORTED_MODULE_14__.AES.encrypt(item1.url, "thisisliveurl").toString();
                if (!noMoviesSeries) {
                    navigate.push({
                        pathname: `/dashboard/live`,
                        query: {
                            id: (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_19__/* .concatUrl */ .C)(item1.url),
                            stream: crypto_js__WEBPACK_IMPORTED_MODULE_14__.AES.encrypt(item1.url, "thisisurl").toString(),
                            name: crypto_js__WEBPACK_IMPORTED_MODULE_14__.AES.encrypt(item1.tvg.name, "thisisname").toString(),
                            title: crypto_js__WEBPACK_IMPORTED_MODULE_14__.AES.encrypt(item1?.group?.title, "thisistitle").toString()
                        }
                    });
                } else {
                    navigate.push(`/dashboard/live?view=${encodeURIComponent(encrypted)}`);
                }
            }
        } else {
            if (isAdult(item1)) {
                setShowParentalLock(true);
                setCurrentAdultItem(item1);
            } else {
                navigate.push({
                    pathname: `/dashboard/preview/${currentTab.toLowerCase()}/m3u/${encryptedName}`,
                    query: {
                        id: getStreamIdFromUrl(item1.url),
                        stream: crypto_js__WEBPACK_IMPORTED_MODULE_14__.AES.encrypt(item1.url, "thisisurl").toString(),
                        name: crypto_js__WEBPACK_IMPORTED_MODULE_14__.AES.encrypt(item1.tvg.name, "thisisname").toString()
                    }
                });
            }
        }
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
    const handlePinVerified = ()=>{
        const encryptedName = encodeURIComponent(crypto_js__WEBPACK_IMPORTED_MODULE_14__.AES.encrypt(currentAdultItem.name, "thisismovie").toString());
        const id = currentTab === "Movies" || currentTab === "LiveTv" ? "stream_id" : "series_id";
        if (currentTab === "LiveTv") {
            navigate.push(`/dashboard/live?view=${encodeURIComponent(crypto_js__WEBPACK_IMPORTED_MODULE_14__.AES.encrypt(currentItem.url, "thisisliveurl").toString())}`);
        } else {
            navigate.push({
                pathname: `/dashboard/preview/${currentTab.toLowerCase()}/m3u/${encryptedName}`,
                query: {
                    id: getStreamIdFromUrl(currentAdultItem.url),
                    stream: crypto_js__WEBPACK_IMPORTED_MODULE_14__.AES.encrypt(currentAdultItem.url, "thisisurl").toString(),
                    name: crypto_js__WEBPACK_IMPORTED_MODULE_14__.AES.encrypt(item.tvg.name, "thisisname").toString()
                }
            });
        }
        setShowParentalLock(false);
    };
    const handleSearch = (e)=>{
        const { value } = e.target;
        setSearchedItem(value);
        const searchedMovies = m3uStreams.streams.movies.filter((movie)=>movie?.name?.toLowerCase().includes(value.toLowerCase()));
        const searchedSeries = m3uStreams.streams.series.filter((serie)=>serie?.name.toLowerCase().includes(value.toLowerCase()));
        const searchedLiveStreams = m3uStreams.streams.live.filter((stream)=>stream?.name.toLowerCase().includes(value.toLowerCase()));
        setMovies(searchedMovies);
        setSeries(searchedSeries);
        setLiveStreams(searchedLiveStreams);
        if (searchedMovies.length === 0 && searchedSeries.length === 0 && searchedLiveStreams.length === 0) {
            setNoData(true);
        } else {
            setNoData(false);
            if (searchedMovies.length > 0 && searchedSeries.length === 0 && searchedLiveStreams.length === 0) {
                setCurrentTab("Movies");
            }
            if (searchedMovies.length === 0 && searchedLiveStreams.length === 0 && searchedSeries.length > 0) {
                setCurrentTab("Series");
            }
            if (searchedLiveStreams.length > 0 && searchedSeries.length === 0 && searchedMovies.length === 0) {
                setCurrentTab("LiveTv");
            }
        }
        if (value === "") {
            setMovies([]);
            setSeries([]);
            setLiveStreams([]);
        }
    };
    return loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_utils_loading__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .Z, {}) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "searched-items",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            id: "searched-items-container",
            className: "searched-items-container",
            style: {
                paddingTop: user?.loginType === "m3u" ? 0 : "80px"
            },
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "search-input-container",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        onChange: handleSearch,
                        className: "search-input",
                        type: "text",
                        placeholder: "Search movie, series , live tv"
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                !noData ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        // !noMoviesSeries &&
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Tabs, {
                            className: "tabs-container",
                            value: currentTab,
                            onChange: handleTab,
                            "aria-label": "disabled tabs example",
                            children: [
                                movies.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Tab, {
                                    className: "tab",
                                    value: "Movies",
                                    label: "Movies"
                                }),
                                series.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Tab, {
                                    className: "tab",
                                    value: "Series",
                                    label: "Series"
                                }),
                                liveStreams.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Tab, {
                                    className: "tab",
                                    value: "LiveTv",
                                    label: "Live Tv"
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                        !noMoviesSeries ? searchedItem.length > 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_virtualized__WEBPACK_IMPORTED_MODULE_2__.AutoSizer, {
                            children: ({ height, width })=>{
                                const dividendWidth = width < 500 ? width / 2 : 180;
                                const itemsPerRow = Math.floor(width / dividendWidth);
                                const rowCount = Math.ceil(ITEMS_COUNT / itemsPerRow);
                                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
                                    className: "category listSlider",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_virtualized__WEBPACK_IMPORTED_MODULE_2__.List, {
                                        width: width,
                                        height: height,
                                        rowCount: rowCount,
                                        rowHeight: 270,
                                        rowRenderer: ({ index, key, style })=>{
                                            const items = [];
                                            const fromIndex = index * itemsPerRow;
                                            const toIndex = Math.min(fromIndex + itemsPerRow, ITEMS_COUNT);
                                            for(let i = fromIndex; i < toIndex; i++){
                                                const id = currentTab === "Movies" || currentTab === "LiveTv" ? "stream_id" : "series_id";
                                                const favArr = currentTab === "Movies" ? moviesFavs : currentTab === "LiveTv" ? liveStreamsFavs : seriesFavs;
                                                const isFavourite = favArr.filter((movieId)=>String(movieId) === (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_19__/* .concatUrl */ .C)(currentSelected[i].url)).length > 0;
                                                items.push(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    onClick: ()=>handleItem(currentSelected[i]),
                                                    style: {
                                                        marginTop: 10,
                                                        marginLeft: 10,
                                                        padding: 5,
                                                        height: 270,
                                                        width: dividendWidth
                                                    },
                                                    className: "item",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "caption",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                    className: "control",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                            style: {
                                                                                opacity: 0
                                                                            },
                                                                            className: "count"
                                                                        }),
                                                                        isFavourite && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_10___default()), {
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
                                                                        children: " "
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    className: "h2",
                                                                    children: currentSelected[i].name
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "thumb",
                                                            children: [
                                                                currentSelected[i].tvg.logo ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                    className: "search-item-img",
                                                                    style: {
                                                                        filter: isAdult(currentSelected[i]) && parentalPin && "blur(20px)"
                                                                    },
                                                                    loading: "lazy",
                                                                    onLoad: (e)=>e.target.style.opacity = 1,
                                                                    onError: (e)=>e.target.src = _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z,
                                                                    src: currentSelected[i].tvg.logo
                                                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_11___default()), {
                                                                    alt: "placeholder",
                                                                    layout: "fill",
                                                                    src: _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z
                                                                }),
                                                                isAdult(currentSelected[i]) && parentalPin && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
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
                                                }, i));
                                            }
                                            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "Row",
                                                style: {
                                                    ...style
                                                },
                                                children: items
                                            }, key);
                                        }
                                    })
                                });
                            }
                        }) : null : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_virtualized__WEBPACK_IMPORTED_MODULE_2__.AutoSizer, {
                            children: ({ height, width })=>{
                                const dividendWidth = width < 500 ? width / 2 : 180;
                                const itemsPerRow = Math.floor(width / dividendWidth);
                                const rowCount = Math.ceil(ITEMS_COUNT / itemsPerRow);
                                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
                                    className: "category listSlider",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_virtualized__WEBPACK_IMPORTED_MODULE_2__.List, {
                                        width: width,
                                        height: height,
                                        rowCount: rowCount,
                                        rowHeight: 270,
                                        rowRenderer: ({ index, key, style })=>{
                                            const items = [];
                                            const fromIndex = index * itemsPerRow;
                                            const toIndex = Math.min(fromIndex + itemsPerRow, ITEMS_COUNT);
                                            for(let i = fromIndex; i < toIndex; i++){
                                                const id = currentTab === "Movies" || currentTab === "LiveTv" ? "stream_id" : "series_id";
                                                const favArr = currentTab === "Movies" ? moviesFavs : currentTab === "LiveTv" ? liveStreamsFavs : seriesFavs;
                                                const isFavourite = favArr.filter((movieId)=>String(movieId) === (0,_methods_concatUrl__WEBPACK_IMPORTED_MODULE_19__/* .concatUrl */ .C)(currentSelected[i].url)).length > 0;
                                                items.push(currentTab === "LiveTv" ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    onClick: ()=>handleItem(currentSelected[i]),
                                                    style: {
                                                        marginTop: 10,
                                                        marginLeft: 10,
                                                        padding: 5,
                                                        height: 270,
                                                        width: dividendWidth
                                                    },
                                                    className: "item",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "caption",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                    className: "control",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                            style: {
                                                                                opacity: 0
                                                                            },
                                                                            className: "count"
                                                                        }),
                                                                        isFavourite && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_10___default()), {
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
                                                                        children: " "
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    className: "h2",
                                                                    children: currentSelected[i].name
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "thumb",
                                                            children: [
                                                                errorIndex === index ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_11___default()), {
                                                                    alt: "placeholder",
                                                                    layout: "fill",
                                                                    src: _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z
                                                                }) : currentSelected[i].tvg.logo ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                    className: "search-item-img",
                                                                    style: {
                                                                        filter: isAdult(currentSelected[i]) && parentalPin && "blur(20px)"
                                                                    },
                                                                    loading: "lazy",
                                                                    onLoad: (e)=>e.target.style.opacity = 1,
                                                                    onError: (e)=>setErrorIndex(index),
                                                                    src: currentSelected[i].tvg.logo
                                                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_11___default()), {
                                                                    alt: "placeholder",
                                                                    layout: "fill",
                                                                    src: _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z
                                                                }),
                                                                isAdult(currentSelected[i]) && parentalPin && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
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
                                                }, i) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    onClick: ()=>handleItem(currentSelected[i]),
                                                    style: {
                                                        marginTop: 10,
                                                        marginLeft: 10,
                                                        padding: 5,
                                                        height: 270,
                                                        width: dividendWidth
                                                    },
                                                    className: "item",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "caption",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                    className: "control",
                                                                    children: [
                                                                        Number(currentSelected[i].rating).toFixed(1) !== "NaN" && Number(currentSelected[i].rating) !== 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                            className: "count",
                                                                            children: Number(currentSelected[i].rating).toFixed(1)
                                                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {}),
                                                                        isFavourite && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_10___default()), {
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
                                                                        children: currentSelected[i].group.title
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    className: "h2",
                                                                    children: currentSelected[i].name
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "thumb",
                                                            children: [
                                                                errorIndex === index ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_11___default()), {
                                                                    alt: "placeholder",
                                                                    layout: "fill",
                                                                    src: _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z
                                                                }) : currentSelected[i].tvg.logo ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                                    style: {
                                                                        filter: isAdult(currentSelected[i]) && parentalPin && "blur(20px)"
                                                                    },
                                                                    className: "search-item-img",
                                                                    loading: "lazy",
                                                                    onError: (e)=>e.target.src = "/placeholder.png",
                                                                    onLoad: (e)=>e.target.style.opacity = 1,
                                                                    src: currentSelected[i].tvg.logo
                                                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_11___default()), {
                                                                    alt: "placeholder",
                                                                    layout: "fill",
                                                                    src: _assets_placeholder_png__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z
                                                                }),
                                                                isAdult(currentSelected[i]) && parentalPin && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
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
                                                }, i));
                                            }
                                            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "Row",
                                                style: {
                                                    ...style
                                                },
                                                children: items
                                            }, key);
                                        }
                                    })
                                });
                            }
                        })
                    ]
                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "no-data-found-container",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_11___default()), {
                            alt: "placeholder",
                            src: _assets_noContentFound_svg__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                            className: "no-data-found",
                            children: "No data found related to search"
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_utils_parentalLock__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                    close: ()=>setShowParentalLock(false),
                    open: showParentalLock,
                    completed: handlePinVerified,
                    action: "verify"
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchedItems);


/***/ }),

/***/ 2259:
/***/ (() => {



/***/ })

};
;