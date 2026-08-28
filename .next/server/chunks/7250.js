exports.id = 7250;
exports.ids = [7250];
exports.modules = {

/***/ 7250:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VideoJS: () => (/* binding */ VideoJS),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5335);
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var video_js_dist_video_js_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6903);
/* harmony import */ var video_js_dist_video_js_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(video_js_dist_video_js_css__WEBPACK_IMPORTED_MODULE_3__);




const VideoJS = (props)=>{
    const videoRef = react__WEBPACK_IMPORTED_MODULE_1___default().useRef(null);
    const playerRef = react__WEBPACK_IMPORTED_MODULE_1___default().useRef(null);
    const { options, onReady } = props;
    // const videoJsOptions = {
    //   autoplay: true,
    //   controls: true,
    //   responsive: true,
    //   fluid: true,
    //   sources: [{
    //     src: '/path/to/video.mp4',
    //     type: 'video/mp4'
    //   }]
    // };
    react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(()=>{
        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
            const videoElement = document.createElement("video-js");
            videoElement.classList.add("vjs-big-play-centered");
            videoRef.current.appendChild(videoElement);
            const player = playerRef.current = video_js__WEBPACK_IMPORTED_MODULE_2___default()(videoElement, options, ()=>{
                video_js__WEBPACK_IMPORTED_MODULE_2___default().log("player is ready");
                onReady && onReady(player);
            });
        // You could update an existing player in the `else` block here
        // on prop change, for example:
        } else {
            const player = playerRef.current;
            player.autoplay(options.autoplay);
            player.src(options.sources);
        }
    }, [
        videoRef
    ]);
    // Dispose the Video.js player when the functional component unmounts
    react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(()=>{
        const player = playerRef.current;
        return ()=>{
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [
        playerRef
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        style: {
            height: "100%"
        },
        "data-vjs-player": true,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            style: {
                height: "100%"
            },
            ref: videoRef,
            "data-setup": '{"liveui": true}'
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VideoJS);


/***/ }),

/***/ 6903:
/***/ (() => {



/***/ })

};
;