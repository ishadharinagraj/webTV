exports.id = 3207;
exports.ids = [3207];
exports.modules = {

/***/ 2805:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ AppContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const AppContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
    user: null,
    toggleUser: ()=>{},
    streamData: {
        movies: {
            streams: null,
            streamCategories: null,
            banner: null,
            toggle: ()=>{},
            banner: {
                streams: null,
                toggle: ()=>{}
            }
        },
        series: {
            streams: null,
            streamCategories: null,
            toggle: ()=>{},
            banner: {
                streams: null,
                toggle: ()=>{}
            }
        },
        liveTv: {
            streams: null,
            streamCategories: null,
            toggle: ()=>{}
        },
        toggle: ()=>{}
    },
    alert: {
        title: "",
        show: false,
        type: "success",
        toggle: ()=>{}
    },
    parentalVerified: {
        status: false,
        toggle: ()=>{}
    },
    theme: {
        current: "dark",
        color: "blue",
        toggleTheme: ()=>{},
        toggleColor: ()=>{}
    },
    m3uStreams: {
        streams: {
            movies: null,
            series: null,
            live: null
        },
        toggle: ()=>{}
    },
    m3uUrl: {
        url: "",
        toggle: ()=>{}
    },
    homeM3uStreams: {
        streams: null,
        toggle: ()=>{}
    },
    m3uFileUpload: {
        uploading: false,
        uploaded: false,
        progress: 0,
        toggle: ()=>{}
    },
    scrolled: {
        h: 0,
        m: 0,
        s: 0,
        toggle: ()=>{}
    },
    loading: {
        state: false,
        toggle: ()=>{}
    },
    currentPlayer: {
        player: "flowplayer",
        toggle: ()=>{}
    },
    m3u: {
        data: null,
        isVisible: false,
        toggle: ()=>{}
    }
});



/***/ }),

/***/ 2313:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B4: () => (/* binding */ getRecents),
/* harmony export */   BZ: () => (/* binding */ removeFromWatchlist),
/* harmony export */   C3: () => (/* binding */ removeMovieFromRecents),
/* harmony export */   FW: () => (/* binding */ addToWatchlist),
/* harmony export */   Gg: () => (/* binding */ saveWatchedContent),
/* harmony export */   NA: () => (/* binding */ getValue),
/* harmony export */   h2: () => (/* binding */ removeFromFavs),
/* harmony export */   on: () => (/* binding */ getFavourites),
/* harmony export */   s4: () => (/* binding */ getParticluarTimeline),
/* harmony export */   uT: () => (/* binding */ getWatchlist),
/* harmony export */   zg: () => (/* binding */ addToFavs)
/* harmony export */ });
/* unused harmony export migrateData */
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6666);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_database__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8837);


const database = (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.getDatabase)(___WEBPACK_IMPORTED_MODULE_1__/* .app */ .l);
//Favs
const addToFavs = async (id, type, address)=>{
    const obj = {};
    obj[id] = parseInt(Date.now() / 1000);
    return await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.update)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Fav/${type}`), obj);
};
const removeFromFavs = async (id, type, address)=>{
    return await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.remove)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Fav/${type}/${id}`));
};
const getValue = async (id, type, address)=>{
    return (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.get)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Fav/${type}/${id}`));
};
const getFavourites = async (type, address)=>{
    return (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.get)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Fav/${type}`));
};
// Watchlist / MyList
const addToWatchlist = async (item, type, address)=>{
    let id = item;
    let dataObj = parseInt(Date.now() / 1000);
    if (typeof item === "object" && item !== null) {
        id = item.stream_id || item.series_id || item.id || item.num;
        dataObj = {
            id: String(id),
            name: item.name || item.title || item.info?.name || "",
            cover: item.cover || item.stream_icon || item.info?.cover || "",
            stream_icon: item.stream_icon || item.cover || item.info?.stream_icon || "",
            rating: item.rating || item.info?.rating || 0,
            actionType: type === "Movie" ? "movies" : type === "Series" ? "series" : "live",
            addedAt: parseInt(Date.now() / 1000)
        };
    }
    const obj = {};
    obj[id] = dataObj;
    return await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.update)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Watchlist/${type}`), obj);
};
const removeFromWatchlist = async (id, type, address)=>{
    return await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.remove)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Watchlist/${type}/${id}`));
};
const getWatchlist = async (type, address)=>{
    return (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.get)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Watchlist/${type}`));
};
const migrateData = async (decrypted, encrypted)=>{
    const exists = (await get(ref(database, encrypted))).exists();
    if (!exists) {
        const preFav = (await get(ref(database, `${decrypted}/Fav`))).val();
        if (preFav) {
            const { LiveTv: liveFav, Movie: movieFav, Series: seriesFav } = preFav;
            const liveFavIds = liveFav && Object.keys(liveFav);
            const movieFavIds = movieFav && Object.keys(movieFav);
            const seriesFavIds = seriesFav && Object.keys(seriesFav);
            if (liveFavIds) {
                if (liveFavIds) {}
                const updatedLiveIds = {};
                liveFavIds.map((id)=>updatedLiveIds[id] = parseInt(Date.now() / 1000));
                await update(ref(database, `${encrypted}/Fav/LiveTv`), updatedLiveIds);
            }
            if (movieFavIds) {
                const updatedMovieids = {};
                movieFavIds.map((id)=>updatedMovieids[id] = parseInt(Date.now() / 1000));
                await update(ref(database, `${encrypted}/Fav/Movie`), updatedMovieids);
            }
            if (seriesFavIds) {
                const updatedSeriesids = {};
                seriesFavIds.map((id)=>updatedSeriesids[id] = parseInt(Date.now() / 1000));
                await update(ref(database, `${encrypted}/Fav/Series`), updatedSeriesids);
            }
        }
        const preRecent = (await get(ref(database, `${decrypted}/Recent`))).val();
        if (preRecent) {
            const { LiveTv: liveRecents, Movie: movieRecents, Series: seriesRecents } = preRecent;
            const liveRecentsIds = liveRecents && Object.keys(liveRecents);
            const movieRecentsIds = movieRecents && Object.keys(movieRecents);
            const movieRecentsValues = movieRecents && Object.values(movieRecents);
            const seriesRecentsIds = seriesRecents && Object.keys(seriesRecents);
            const seriesRecentsValues = seriesRecents && Object.values(seriesRecents);
            if (liveRecentsIds) {
                const updatedLiveIds = {};
                liveRecentsIds.map((id)=>updatedLiveIds[id] = parseInt(Date.now() / 1000));
                await update(ref(database, `${encrypted}/Recent/LiveTv`), updatedLiveIds);
            }
            if (movieRecentsIds) {
                const updatedMovieids = {};
                movieRecentsIds.forEach((id, index)=>updatedMovieids[id] = {
                        ...movieRecentsValues[index],
                        timestamp: parseInt(Date.now() / 1000)
                    });
                await update(ref(database, `${encrypted}/Recent/Movie`), updatedMovieids);
            }
            if (seriesRecentsIds) {
                const updatedSeriesids = {};
                const updatedEpisodesIds = {};
                seriesRecentsIds.map((id, index)=>{
                    const { duration, episode, season, thumbnail, timeline } = seriesRecentsValues[index];
                    const { e } = seriesRecentsIds[index];
                    updatedSeriesids[id] = {
                        [episode]: {
                            duration,
                            season,
                            thumbnail,
                            timeline,
                            lastWatched: "true"
                        },
                        showInContinueWatchingList: "true",
                        timestamp: parseInt(Date.now() / 1000)
                    };
                });
                await update(ref(database, `${encrypted}/Recent/Series`), updatedSeriesids);
            }
        }
        await update(ref(database, `${encrypted}`), {
            migrated: true
        });
    } else {
        await update(ref(database, `${encrypted}`), {
            migrated: true
        });
    }
};
//Recent
const saveWatchedContent = {
    movie: async (id, address, movie)=>{
        const obj = {};
        obj[id] = {
            ...movie,
            timestamp: parseInt(Date.now() / 1000)
        };
        return await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.update)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Recent/Movie`), obj);
    },
    series: async (series_id, address, episode, episodeId)=>{
        const episodes = (await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.get)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Recent/Series/${series_id}`))).val();
        if (episodes) {
            const keys = Object.keys(episodes);
            keys.map((key)=>{
                const isNumber = key;
                if (isNumber && key !== "showInContinueWatchingList" && key !== "timestamp") {
                    episodes[key].lastWatched = "false";
                }
            });
            episodes[episodeId] = episode;
            return await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.update)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Recent/Series/${series_id}`), {
                ...episodes,
                showInContinueWatchingList: "true",
                timestamp: parseInt(Date.now() / 1000)
            });
        } else if (episodeId) {
            return await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.update)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Recent/Series/${series_id}`), {
                [episodeId]: episode,
                showInContinueWatchingList: "true",
                timestamp: parseInt(Date.now() / 1000)
            });
        } else {
            return await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.update)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Recent/Series/${series_id}`), {
                episode,
                showInContinueWatchingList: "true",
                timestamp: parseInt(Date.now() / 1000)
            });
        }
    // return await set(ref(database, `${address}/Recent/Series/${series_id}/${episodeId}`), episode)
    },
    liveTv: async (stream_id, address)=>{
        const obj = {};
        obj[stream_id] = parseInt(Date.now() / 1000);
        return await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.update)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Recent/LiveTv`), obj);
    },
    catchup: async (stream_id, address)=>{
        const obj = {};
        obj[stream_id] = parseInt(Date.now() / 1000);
        return await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.update)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Recent/Catchup`), obj);
    },
    home: async (stream_id, address)=>{
        const obj = {};
        obj[stream_id] = "true";
        return await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.update)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Recent/Home`), obj);
    }
};
const getRecents = async (type, address)=>{
    return await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.get)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Recent/${type}`));
};
const getParticluarTimeline = async (id, type, address)=>{
    return await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.get)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Recent/${type}/${id}`));
};
const removeMovieFromRecents = async (id, type, address, action)=>{
    if (type === "Movie" && !action) {
        return await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.remove)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Recent/${type}/${id}`));
    }
    if (type === "Series" && action === "remove") {
        return await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.remove)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Recent/${type}/${id}`));
    }
    if (type === "LiveTv") {
        return await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.remove)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Recent/${type}/${id}`));
    } else {
        return await (0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.update)((0,firebase_database__WEBPACK_IMPORTED_MODULE_0__.ref)(database, `${address}/Recent/${type}/${id}`), {
            showInContinueWatchingList: "false"
        });
    }
};


/***/ }),

/***/ 8837:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ auth),
/* harmony export */   l: () => (/* binding */ app)
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4324);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4610);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_auth__WEBPACK_IMPORTED_MODULE_1__);
// Import the functions you need from the SDKs you need


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCSsk4CAc2HARGrraguuYW8FlH8Lt2rtys",
    authDomain: "kong-18.firebaseapp.com",
    databaseURL: "https://kong-18-default-rtdb.firebaseio.com",
    projectId: "kong-18",
    storageBucket: "kong-18.firebasestorage.app",
    messagingSenderId: "350028286535",
    appId: "1:350028286535:web:7c4d55a9fd7450dc85ff62",
    measurementId: "G-YBXE9YMTJV"
};
// Initialize Firebase
const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);
const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)();


/***/ }),

/***/ 1365:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app),
  getDbAddress: () => (/* binding */ getDbAddress),
  getDbAddressM3u: () => (/* binding */ getDbAddressM3u)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./src/contexts/app.js
var app = __webpack_require__(2805);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "crypto-js"
var external_crypto_js_ = __webpack_require__(5666);
// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
// EXTERNAL MODULE: ./src/app/css/main.css
var main = __webpack_require__(1825);
// EXTERNAL MODULE: ./src/app/css/theme.css
var theme = __webpack_require__(8885);
// EXTERNAL MODULE: ./src/pages/styles.css
var styles = __webpack_require__(4009);
;// CONCATENATED MODULE: ./src/utils/ga/index.jsx


const GoogleAnalytics = ()=>/*#__PURE__*/ jsx_runtime.jsx("script", {
        dangerouslySetInnerHTML: {
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-6XDR5H7ESG');
      `
        }
    });
/* harmony default export */ const ga = (GoogleAnalytics);

// EXTERNAL MODULE: ./src/utils/errorBoundary/style.css
var style = __webpack_require__(5321);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
;// CONCATENATED MODULE: ./src/utils/errorBoundary/error.jsx





class ErrorBoundary extends (external_react_default()).Component {
    constructor(props){
        super(props);
        this.navigateToMovies = ()=>{
            router_default().push("/dashboard?view=movies");
            this.setState({
                hasError: false
            });
        };
        this.state = {
            hasError: false
        };
    }
    static{
        this.contextType = app/* AppContext */.I;
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true
        };
    }
    componentDidCatch(error, errorInfo) {
        console.log({
            error,
            errorInfo
        });
    }
    render() {
        // Check if the error is thrown
        const { theme } = this.context;
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "error-popup",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("h2", {
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("b", {
                                style: {
                                    color: "rgb(223, 0, 0)"
                                },
                                children: "Oops"
                            }),
                            ",  Something went wrong!"
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "btns-container",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("button", {
                                type: "button",
                                className: `back-btn`,
                                onClick: this.navigateToMovies,
                                children: "Go Back"
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("button", {
                                type: "button",
                                className: `${theme.color}`,
                                onClick: ()=>this.setState({
                                        hasError: false
                                    }),
                                children: "Try again"
                            })
                        ]
                    })
                ]
            });
        }
        // Return children components in case of no error
        return this.props.children;
    }
}
/* harmony default export */ const error = (ErrorBoundary);

// EXTERNAL MODULE: external "@mui/icons-material/Upload"
var Upload_ = __webpack_require__(6198);
// EXTERNAL MODULE: external "react-beforeunload"
var external_react_beforeunload_ = __webpack_require__(1734);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2167);
// EXTERNAL MODULE: external "iptv-playlist-parser"
var external_iptv_playlist_parser_ = __webpack_require__(7775);
// EXTERNAL MODULE: ./src/utils/loading/index.jsx
var utils_loading = __webpack_require__(9637);
// EXTERNAL MODULE: ./src/firebase/functions.js
var functions = __webpack_require__(2313);
;// CONCATENATED MODULE: ./src/constants/disclaimer/index.js
const disclaimerPoints = [
    "Avon is an advanced player that uses M3U and JSON user-created playlists.",
    "We do not provide any actual playlists or contents.",
    "This application is designed to use with the user’s own or created playlist with legal contents.",
    "You are responsible to check your created playlists/contents are legal and you have full rights to use and/or RECORD contents.",
    "We are not responsible for misuse of copyright or third party contents using our software and please check your contents are legal and/or you have rights to use and/or RECORD.",
    "By using our application means you accept the above terms and conditions",
    "Avon does not provide or solicit any audiovisual content to the users.",
    "Avon has no affiliation with any third-party provider what so ever.",
    "Users must provide their own contents.",
    "We strictly do not endorse the streaming of copyright-protected material without permission of the copyright holder."
];

// EXTERNAL MODULE: ./src/utils/disclaimer/styles.css
var disclaimer_styles = __webpack_require__(3170);
;// CONCATENATED MODULE: ./src/utils/disclaimer/index.jsx





// import { ipcRenderer } from 'electron'
const Disclaimer = ()=>{
    const [showModal, setShowModal] = (0,external_react_.useState)(false);
    (0,external_react_.useEffect)(()=>{
        if (localStorage.getItem("termsAgreed") === "true") {
            setShowModal(false);
        } else {
            setShowModal(true);
        }
    }, []);
    const handleAccept = ()=>{
        localStorage.setItem("termsAgreed", "true");
        setShowModal(false);
    };
    const handleCancel = ()=>{
        setShowModal(true);
        window.close();
        localStorage.setItem("termsAgreed", "false");
    };
    return /*#__PURE__*/ jsx_runtime.jsx(material_.Dialog, {
        PaperProps: {
            className: "disclaimer-container-paper",
            sx: {
                minWidth: "95%"
            }
        },
        open: showModal,
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "disclaimer-container",
            children: [
                /*#__PURE__*/ jsx_runtime.jsx("h1", {
                    className: "title",
                    children: "YOU HEREBY AGREE TO TERMS HERE OTHERWISE DO NOT USE THE APP"
                }),
                /*#__PURE__*/ jsx_runtime.jsx("ul", {
                    className: "list-containerr",
                    children: disclaimerPoints.slice(0, 6).map((point, index)=>{
                        return /*#__PURE__*/ jsx_runtime.jsx("li", {
                            children: point
                        }, index);
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("ul", {
                    className: "list-containerr",
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx("h2", {
                            children: "Disclaimer"
                        }),
                        disclaimerPoints.slice(6, 10).map((point, index)=>{
                            return /*#__PURE__*/ jsx_runtime.jsx("li", {
                                children: point
                            }, `disc-${index}`);
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "disclaimer-btns-container",
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx("button", {
                            onClick: handleAccept,
                            children: "ACCEPT"
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("button", {
                            onClick: handleCancel,
                            children: "CANCEL"
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const disclaimer = (Disclaimer);

// EXTERNAL MODULE: ./src/utils/networkAlert/styles.css
var networkAlert_styles = __webpack_require__(4459);
// EXTERNAL MODULE: external "@mui/icons-material/WifiOff"
var WifiOff_ = __webpack_require__(8499);
var WifiOff_default = /*#__PURE__*/__webpack_require__.n(WifiOff_);
;// CONCATENATED MODULE: ./src/utils/networkAlert/index.jsx






const NetworkAlert = ()=>{
    const { alert } = (0,external_react_.useContext)(app/* AppContext */.I);
    const [offline, setOffline] = (0,external_react_.useState)(false);
    (0,external_react_.useEffect)(()=>{
        setOffline(!window.navigator.onLine);
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return ()=>{
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);
    const handleOnline = ()=>{
        setOffline(false);
        alert.toggle({
            show: true,
            title: "You are back Online",
            type: "success"
        });
    };
    const handleOffline = ()=>{
        setOffline(true);
    };
    return offline && /*#__PURE__*/ jsx_runtime.jsx(material_.Dialog, {
        open: true,
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "network-alert-container",
            children: [
                /*#__PURE__*/ jsx_runtime.jsx((WifiOff_default()), {
                    className: "network-icon"
                }),
                /*#__PURE__*/ jsx_runtime.jsx("h2", {
                    children: "You are Disconnected !"
                }),
                /*#__PURE__*/ jsx_runtime.jsx("p", {
                    children: "Please check your network internet connection"
                })
            ]
        })
    });
};
/* harmony default export */ const networkAlert = (NetworkAlert);

;// CONCATENATED MODULE: ./src/pages/_app.js




















const MyApp = ({ Component, pageProps })=>{
    const router = (0,router_.useRouter)();
    const [user, setUser] = (0,external_react_.useState)(null);
    const [streamData, setStreamData] = (0,external_react_.useState)({
        movies: {
            streams: null,
            streamCategories: null
        },
        series: {
            streams: null,
            streamCategories: null
        },
        liveTv: {
            streams: null,
            streamCategories: null
        }
    });
    const [parentalVerified, setParentalVerified] = (0,external_react_.useState)(false);
    const [alertProps, setAlertProps] = (0,external_react_.useState)({
        show: false,
        type: "",
        title: ""
    });
    const [currentTheme, setCurrentTheme] = (0,external_react_.useState)("dark");
    const [currentColor, setCurrentColor] = (0,external_react_.useState)("purple");
    const [movieBannerStreams, setMovieBannerStreams] = (0,external_react_.useState)(null);
    const [seriesBannerStreams, setSeriesBannerStreams] = (0,external_react_.useState)(null);
    const [isPlayer, setIsPlayer] = (0,external_react_.useState)(false);
    const [m3uStreams, setM3uStreams] = (0,external_react_.useState)({
        movies: null,
        series: null,
        live: null
    });
    const [m3uUrl, setM3uUrl] = (0,external_react_.useState)(null);
    const [isVisible, setIsVisible] = (0,external_react_.useState)(false);
    const [m3u, setM3u] = (0,external_react_.useState)(null);
    const [loading, setLoading] = (0,external_react_.useState)(false);
    const [storage, setStorage] = (0,external_react_.useState)(false);
    //m3u file uploaded
    const [m3uFileUploading, setM3uFileUplaoding] = (0,external_react_.useState)(false);
    const [m3uFileUploaded, setM3uFileUploaded] = (0,external_react_.useState)(false);
    const [homeM3uStreams, setHomeM3uStreams] = (0,external_react_.useState)(null);
    const [scrolledPosition, setScrolledPosition] = (0,external_react_.useState)({
        h: 0,
        m: 0,
        s: 0
    });
    const [currentPlayer, setCurrentPlayer] = (0,external_react_.useState)("flowplayer");
    const getFromLocalStorage = (key)=>{
        if (!key || "undefined" === "undefined") {
            return "";
        }
        return JSON.parse(localStorage.getItem(key));
    };
    const getLocal = (key)=>{
        if (!key || "undefined" === "undefined") {
            return "";
        }
        return localStorage.getItem(key);
    };
    (0,external_react_.useEffect)(()=>{
        document.documentElement.className = currentColor;
    }, [
        currentColor
    ]);
    const currentUser = getFromLocalStorage("currentUser");
    (0,external_react_.useEffect)(()=>{
        try {
            if (currentUser && typeof currentUser === "object" && Object.keys(currentUser).length > 0) {
                const userVal = Object.values(currentUser)[0];
                if (userVal) {
                    const { username, password, portallink, serverInfo, userInfo, loginType, token, M3U, id } = userVal;
                    if (loginType === "m3u") {
                        const user = {
                            id,
                            loginType,
                            username,
                            password,
                            server: portallink
                        };
                        setUser({
                            ...user,
                            dbAddress: getDbAddressM3u(user)
                        });
                        setM3uUrl(M3U);
                    } else if (serverInfo) {
                        try {
                            const decryptedInfoStr = external_crypto_js_.AES.decrypt(serverInfo, "thisisserverinfo").toString(external_crypto_js_.enc.Utf8);
                            if (decryptedInfoStr) {
                                const time = JSON.parse(decryptedInfoStr).time_now;
                                const getTimeDifference = ()=>{
                                    const difference = new Date().getHours() - new Date(time).getHours();
                                    return difference;
                                };
                                const user = {
                                    id,
                                    username,
                                    password,
                                    serverPrefix: portallink,
                                    server: portallink,
                                    timeDifference: getTimeDifference(),
                                    serverInfo,
                                    userInfo,
                                    loginType,
                                    token
                                };
                                setUser({
                                    ...user,
                                    dbAddress: getDbAddress(user, null),
                                    decryptedDbAddress: getDbAddress(user, "decrypted")
                                });
                            }
                        } catch (err) {
                            console.error("Error decrypting serverInfo in _app:", err);
                        }
                    }
                }
            }
        } catch (err) {
            console.error("Error initializing user in _app:", err);
        }
        if (getLocal("theme")) {
            setCurrentTheme(getLocal("theme"));
        }
        if (getLocal("player")) {
            setCurrentPlayer(getLocal("player"));
        }
        if (getLocal("color")) {
            setCurrentColor(getLocal("color"));
        }
        // Add your logic here to add the class to the body element
        document.body.classList.add("noTabs");
    }, []);
    (0,external_react_.useEffect)(()=>{
    // const handleRouteChange = () => {
    //     console.log('Scroll Position', window.scrollY)
    //   sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    // };
    // router.events.on('routeChangeStart', handleRouteChange);
    // return () => {
    //   router.events.off('routeChangeStart', handleRouteChange);
    // };
    }, []);
    (0,external_react_beforeunload_.useBeforeunload)((e)=>{
        if (m3uFileUploading) {
            e.preventDefault();
        }
    });
    (0,external_react_.useEffect)(()=>{
        if (currentTheme === "dark") {
            document.body.classList.remove("light");
            document.body.classList.add(currentTheme);
        } else {
            document.body.classList.remove("dark");
            document.body.classList.add(currentTheme);
        }
    }, [
        currentTheme
    ]);
    const contextValue = {
        user: user,
        toggleUser: (userDetail)=>{
            setUser(userDetail);
        },
        streamData: {
            movies: {
                streams: streamData.movies.streams,
                streamCategories: streamData.movies.streamCategories,
                toggle: (data, type)=>{
                    setStreamData((prev)=>{
                        return {
                            ...prev,
                            movies: {
                                streams: type === "streams" ? data : prev.movies.streams,
                                streamCategories: type === "categories" ? data : prev.movies.streamCategories
                            }
                        };
                    });
                },
                banner: {
                    streams: movieBannerStreams,
                    toggle: (streams)=>setMovieBannerStreams(streams)
                }
            },
            series: {
                streams: streamData.series.streams,
                streamCategories: streamData.series.streamCategories,
                toggle: (data, type)=>{
                    setStreamData((prev)=>{
                        return {
                            ...prev,
                            series: {
                                streams: type === "streams" ? data : prev.series.streams,
                                streamCategories: type === "categories" ? data : prev.series.streamCategories
                            }
                        };
                    });
                },
                banner: {
                    streams: seriesBannerStreams,
                    toggle: (streams)=>setSeriesBannerStreams(streams)
                }
            },
            liveTv: {
                streams: streamData.liveTv.streams,
                streamCategories: streamData.liveTv.streamCategories,
                toggle: (data, type)=>{
                    setStreamData((prev)=>{
                        return {
                            ...prev,
                            liveTv: {
                                streams: type === "streams" ? data : prev.liveTv.streams,
                                streamCategories: type === "categories" ? data : prev.liveTv.streamCategories
                            }
                        };
                    });
                }
            }
        },
        alert: {
            title: alertProps.title,
            show: alertProps.show,
            type: alertProps.type,
            toggle: (alertDetails)=>{
                setAlertProps(alertDetails);
                setTimeout(()=>{
                    setAlertProps({
                        ...alertProps,
                        show: false
                    });
                }, 1000);
            }
        },
        parentalVerified: {
            status: parentalVerified,
            toggle: (status)=>setParentalVerified(status)
        },
        theme: {
            current: currentTheme,
            color: currentColor,
            toggleTheme: (theme)=>setCurrentTheme(theme),
            toggleColor: (color)=>setCurrentColor(color)
        },
        m3uStreams: {
            streams: {
                movies: m3uStreams.movies,
                series: m3uStreams.series,
                live: m3uStreams.live
            },
            toggle: (movies, series, live)=>setM3uStreams({
                    movies,
                    series,
                    live
                })
        },
        m3uUrl: {
            url: m3uUrl,
            toggle: (url)=>setM3uUrl(url)
        },
        m3u: {
            data: m3u,
            isVisible: isVisible,
            toggle: (data)=>{
                if (typeof data === "boolean") {
                    setIsVisible(true);
                } else {
                    setM3u(data);
                }
            }
        },
        homeM3uStreams: {
            streams: homeM3uStreams,
            toggle: (streams)=>setHomeM3uStreams(streams)
        },
        m3uFileUpload: {
            uploading: m3uFileUploading,
            uploaded: m3uFileUploaded,
            toggle: (uploading, uploaded)=>{
                setM3uFileUplaoding(uploading);
                setM3uFileUploaded(uploaded);
            }
        },
        scrolled: {
            h: scrolledPosition.h,
            m: scrolledPosition.m,
            s: scrolledPosition.s,
            toggle: (h, m, s)=>setScrolledPosition({
                    h,
                    m,
                    s
                })
        },
        loading: {
            state: loading,
            toggle: (state)=>setLoading(state)
        },
        currentPlayer: {
            player: currentPlayer,
            toggle: (player)=>setCurrentPlayer(player)
        },
        storage: {
            state: storage,
            toggle: (state)=>setStorage(state)
        },
        isPlayerOpen: {
            state: isPlayer,
            toggle: (value)=>setIsPlayer(value)
        }
    };
    return /*#__PURE__*/ jsx_runtime.jsx(error, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(app/* AppContext */.I.Provider, {
            value: contextValue,
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)((head_default()), {
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx("link", {
                            rel: "stylesheet",
                            href: "https://cdnjs.cloudflare.com/ajax/libs/flowplayer/7.2.7/skin/skin.css"
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("link", {
                            rel: "stylesheet",
                            href: "https://cdnjs.cloudflare.com/ajax/libs/flowplayer/7.2.7/skin/skin.min.css"
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("script", {
                            src: "https://cdnjs.cloudflare.com/ajax/libs/flowplayer/7.2.7/flowplayer.min.js"
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("script", {
                            src: "https://cdnjs.cloudflare.com/ajax/libs/flowplayer/7.2.7/flowplayer.js"
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("script", {
                            src: "https://releases.flowplayer.org/hlsjs/flowplayer.hlsjs.min.js"
                        }),
                        "\\",
                        /*#__PURE__*/ jsx_runtime.jsx("script", {
                            src: "https://cdn.jsdelivr.net/npm/hls.js@latest"
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("script", {
                            async: true,
                            src: "https://www.googletagmanager.com/gtag/js?id=G-6XDR5H7ESG"
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("title", {
                            children: "Avon"
                        })
                    ]
                }),
                loading ? /*#__PURE__*/ jsx_runtime.jsx(utils_loading/* default */.Z, {}) : /*#__PURE__*/ jsx_runtime.jsx(Component, {
                    pageProps: pageProps
                }),
                /*#__PURE__*/ jsx_runtime.jsx(material_.Slide, {
                    direction: "left",
                    in: alertProps.show,
                    style: {
                        position: "fixed",
                        top: 10,
                        right: 10,
                        zIndex: 9999999
                    },
                    children: /*#__PURE__*/ jsx_runtime.jsx(material_.Alert, {
                        className: "alert-div",
                        style: {
                            fontWeight: "bold",
                            zIndex: 99999999
                        },
                        severity: alertProps.type || "info",
                        children: alertProps.title
                    })
                }),
                /*#__PURE__*/ jsx_runtime.jsx(disclaimer, {}),
                /*#__PURE__*/ jsx_runtime.jsx(networkAlert, {}),
                /*#__PURE__*/ jsx_runtime.jsx(ga, {})
            ]
        })
    });
};
const getDbAddress = (user, type)=>{
    try {
        if (!user || !user.serverInfo || !user.password || !user.server) return "";
        const decryptedServerInfoStr = external_crypto_js_.AES.decrypt(user.serverInfo, "thisisserverinfo").toString(external_crypto_js_.enc.Utf8);
        if (!decryptedServerInfoStr) return "";
        const decryptedServerInfo = JSON.parse(decryptedServerInfoStr);
        const decryptedPassword = external_crypto_js_.AES.decrypt(user.password, "thisispassword").toString(external_crypto_js_.enc.Utf8);
        const decryptedServerAddress = external_crypto_js_.AES.decrypt(user.server, "thisisserveraddress").toString(external_crypto_js_.enc.Utf8);
        const getProtocol = (url)=>{
            if (!url) return "http";
            const fixedUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `http://${url}`;
            try {
                const parsedUrl = new URL(fixedUrl);
                return parsedUrl.protocol.substring(0, parsedUrl.protocol.length - 1);
            } catch (e) {
                return "http";
            }
        };
        const getDomain = (url)=>{
            if (!url) return "";
            const fixedUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `http://${url}`;
            try {
                const parsedUrl = new URL(fixedUrl);
                return parsedUrl.hostname;
            } catch (e) {
                return url;
            }
        };
        const { username, loginType } = user;
        const safeUsername = username || "";
        if (type === "decrypted") {
            const address = ()=>{
                const { server_protocol, url } = decryptedServerInfo || {};
                const parsedProtocol = server_protocol ? server_protocol : getProtocol(decryptedServerAddress);
                const parsedDomain = url ? url : getDomain(decryptedServerAddress);
                return safeUsername + "-" + decryptedPassword + "-" + parsedProtocol + ":" + parsedDomain;
            };
            const regex = /[^a-zA-Z0-9\s.\-:]/g;
            const finalAddress = address().replace(regex, "").split(".").join("");
            if (loginType === "one-stream-panel") {
                return finalAddress + "-" + loginType;
            }
            return finalAddress;
        } else {
            const address = ()=>{
                const { server_protocol, url } = decryptedServerInfo || {};
                const parsedProtocol = server_protocol ? server_protocol : getProtocol(decryptedServerAddress);
                const parsedDomain = url ? url : getDomain(decryptedServerAddress);
                const regex = /[^a-zA-Z0-9\s.\-:]/g;
                if (loginType === "one-stream-panel") {
                    return (0,external_crypto_js_.MD5)(safeUsername.replace(regex, "").split(".").join("")) + "-" + (0,external_crypto_js_.MD5)(decryptedPassword.replace(regex, "").split(".").join("")) + "-" + (0,external_crypto_js_.MD5)((parsedProtocol + ":" + parsedDomain).replace(regex, "").split(".").join("")) + "-" + (0,external_crypto_js_.MD5)(loginType);
                }
                return (0,external_crypto_js_.MD5)(safeUsername.replace(regex, "").split(".").join("")) + "-" + (0,external_crypto_js_.MD5)(decryptedPassword.replace(regex, "").split(".").join("")) + "-" + (0,external_crypto_js_.MD5)((parsedProtocol + ":" + parsedDomain).replace(regex, "").split(".").join(""));
            };
            return address();
        }
    } catch (err) {
        console.error("Error in getDbAddress:", err);
        return "";
    }
};
const getDbAddressM3u = (user)=>{
    try {
        if (!user || !user.server) return "";
        const { server } = user;
        const decryptedServerAddress = external_crypto_js_.AES.decrypt(server, "thisisserveraddress").toString(external_crypto_js_.enc.Utf8);
        const regex = /[^a-zA-Z0-9\s.\-:]/g;
        const getProtocol = (url)=>{
            if (!url) return "http";
            const fixedUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `http://${url}`;
            try {
                const parsedUrl = new URL(fixedUrl);
                return parsedUrl.protocol.substring(0, parsedUrl.protocol.length - 1).replace(regex, "").split(".").join("");
            } catch (e) {
                return "http";
            }
        };
        const getDomain = (url)=>{
            if (!url) return "";
            const fixedUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `http://${url}`;
            try {
                const parsedUrl = new URL(fixedUrl);
                return parsedUrl.hostname.replace(regex, "").split(".").join("");
            } catch (e) {
                return url;
            }
        };
        const address = ()=>{
            const parsedProtocol = getProtocol(decryptedServerAddress);
            const parsedDomain = getDomain(decryptedServerAddress);
            return (0,external_crypto_js_.MD5)(parsedDomain) + "-" + (0,external_crypto_js_.MD5)("m3u") + "-" + (0,external_crypto_js_.MD5)(parsedProtocol + ":" + parsedDomain);
        };
        return address() + "-" + (0,external_crypto_js_.MD5)("m3u");
    } catch (err) {
        console.error("Error in getDbAddressM3u:", err);
        return "";
    }
};
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 9987:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Document)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6859);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4298);
/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_script__WEBPACK_IMPORTED_MODULE_3__);




function Document() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(next_document__WEBPACK_IMPORTED_MODULE_1__.Html, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_document__WEBPACK_IMPORTED_MODULE_1__.Head, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("body", {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_document__WEBPACK_IMPORTED_MODULE_1__.Main, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_document__WEBPACK_IMPORTED_MODULE_1__.NextScript, {})
                ]
            })
        ]
    });
}


/***/ }),

/***/ 9637:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _contexts_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2805);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2128);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_4__);





const Loading = ({ text = "Loading..." })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Backdrop, {
        className: "backdrop-loader",
        open: true,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "sexyLoaderContainer",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
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
                }),
                text && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "sexyLoaderText",
                    children: text
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loading);


/***/ }),

/***/ 1825:
/***/ (() => {



/***/ }),

/***/ 8885:
/***/ (() => {



/***/ }),

/***/ 4009:
/***/ (() => {



/***/ }),

/***/ 3170:
/***/ (() => {



/***/ }),

/***/ 5321:
/***/ (() => {



/***/ }),

/***/ 2128:
/***/ (() => {



/***/ }),

/***/ 4459:
/***/ (() => {



/***/ })

};
;