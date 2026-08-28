"use strict";
exports.id = 9799;
exports.ids = [9799];
exports.modules = {

/***/ 2665:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FP: () => (/* binding */ endpoint)
/* harmony export */ });
/* unused harmony exports endpoints, endpoints2 */
const endpoints = {
    login: "/login",
    movieCategories: "get_vod_categories",
    moviesStreams: "get_vod_streams",
    bannerMovies: "get_banner_streams",
    seriesCategories: "get_series_categories",
    seriesStreams: "get_series",
    liveCategories: "get_live_categories",
    liveStreams: "get_live_streams",
    getMovie: "get_vod_info&vod_id=",
    getSeries: "get_series_info&series_id="
};
const endpoints2 = {
    login: "/login",
    getMovieCategories: "/get_vod_categories",
    getMovies: "/get_vod_streams",
    getBannerMovies: "/get_banner_streams",
    getSeriesCategories: "/get_series_categories",
    getSeries: "/get_series",
    liveCategories: "/get_live_categories",
    liveStreams: "/get_live_streams",
    getMovie: "/get_vod_info&vod_id=",
    getSerie: "//get_series_info&series_id="
};
const endpoint = {
    login: "/login",
    getMovieCategories: "/get_vod_categories",
    getMovies: "/get_vod_streams",
    getBannerMovies: "/get_banner_streams",
    getSeriesCategories: "/get_series_categories",
    getSeries: "/get_series",
    getMovie: "/get_vod_info",
    getMoviesByCategory: "/get_movie_by_category",
    getSerie: "/get_series_info",
    getMovieCast: "https://image.tmdb.org/t/p/w500/",
    getLiveCategories: "/get_live_categories",
    getLiveStreams: "/get_live_streams",
    getEpg: "/get_short_epg",
    getCatchup: "/get_catchup"
};


/***/ }),

/***/ 592:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _contexts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2805);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



const useApi = ()=>{
    const { user } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_contexts_app__WEBPACK_IMPORTED_MODULE_0__/* .AppContext */ .I);
    const makeRequest = ()=>{
        const { username, password, server, loginType, token } = user;
        const headers = {
            username,
            password,
            server,
            type: loginType,
            token
        };
        return {
            get: async (endpoint)=>await axios__WEBPACK_IMPORTED_MODULE_1___default().get(`${"https://backend-mu8j.onrender.com"}${endpoint}`, {
                    headers: headers
                }),
            post: async (endpoint, data)=>await axios__WEBPACK_IMPORTED_MODULE_1___default().post(`${"https://backend-mu8j.onrender.com"}${endpoint}`, data, {
                    headers: headers
                })
        };
    };
    return {
        makeRequest
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useApi);


/***/ })

};
;