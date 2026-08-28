exports.id = 4288;
exports.ids = [4288];
exports.modules = {

/***/ 1536:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/placeholder.c15ce369.png","height":560,"width":426,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAAAAAD/rdHkAAAAGUlEQVR42mNwdnIGAgZnJxCAU2AApHDKAQBdqwx86F74/gAAAABJRU5ErkJggg==","blurWidth":6,"blurHeight":8});

/***/ }),

/***/ 707:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(886);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_2__);



const Scrollable = ({ children, style, showArrows = true })=>{
    const [isMobile, setIsMobile] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [canScrollLeft, setCanScrollLeft] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [canScrollRight, setCanScrollRight] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setIsMobile(/iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator?.userAgent));
    }, []);
    const listRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const isMouseDownRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const startXRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const scrollLeftRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const updateScroll = ()=>{
        if (listRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
            const isOverflowing = scrollWidth > clientWidth + 10;
            setCanScrollLeft(isOverflowing && scrollLeft > 5);
            setCanScrollRight(isOverflowing && scrollLeft + clientWidth < scrollWidth - 5);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        updateScroll();
        const el = listRef.current;
        if (el) {
            el.addEventListener("scroll", updateScroll, {
                passive: true
            });
            window.addEventListener("resize", updateScroll, {
                passive: true
            });
        }
        return ()=>{
            if (el) el.removeEventListener("scroll", updateScroll);
            window.removeEventListener("resize", updateScroll);
        };
    }, [
        children
    ]);
    const handleRedirect = (action)=>{
        if (listRef.current && listRef.current.childNodes) {
            listRef.current.childNodes.forEach((el)=>{
                if (el.style) el.style.pointerEvents = action;
            });
        }
    };
    const stopDragging = ()=>{
        isMouseDownRef.current = false;
        handleRedirect("auto");
        setTimeout(updateScroll, 100);
    };
    const handleListDown = (e)=>{
        if (!listRef.current) return;
        isMouseDownRef.current = true;
        startXRef.current = e.pageX - listRef.current.offsetLeft;
        scrollLeftRef.current = listRef.current.scrollLeft;
    };
    const handlelistMove = (e)=>{
        if (isMouseDownRef.current && listRef.current) {
            e.preventDefault();
            const x = e.pageX - listRef.current.offsetLeft;
            const scroll = x - startXRef.current;
            listRef.current.scrollLeft = scrollLeftRef.current - scroll;
            handleRedirect("none");
            updateScroll();
        }
    };
    const handleTouchStart = (e)=>{
        if (!listRef.current) return;
        isMouseDownRef.current = true;
        startXRef.current = e.touches[0].clientX - listRef.current.offsetLeft;
        scrollLeftRef.current = listRef.current.scrollLeft;
    };
    const handleTouchMove = (e)=>{
        if (isMouseDownRef.current && listRef.current) {
            const x = e.touches[0].clientX - listRef.current.offsetLeft;
            const scroll = x - startXRef.current;
            listRef.current.scrollLeft = scrollLeftRef.current - scroll;
            updateScroll();
        }
    };
    const scrollByAmount = (direction)=>{
        if (listRef.current) {
            const amount = 550;
            listRef.current.scrollBy({
                left: direction === "left" ? -amount : amount,
                behavior: "smooth"
            });
            setTimeout(updateScroll, 350);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "scrollable-container",
        style: {
            position: "relative"
        },
        children: [
            showArrows && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    canScrollLeft && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: ()=>scrollByAmount("left"),
                        className: "row-scroll-arrow left",
                        title: "Scroll Left",
                        type: "button",
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
                        onClick: ()=>scrollByAmount("right"),
                        className: "row-scroll-arrow right",
                        title: "Scroll Right",
                        type: "button",
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
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: style,
                className: "scrollable-list",
                onMouseDown: !isMobile ? handleListDown : ()=>{},
                onMouseUp: !isMobile ? stopDragging : ()=>{},
                onMouseLeave: !isMobile ? stopDragging : ()=>{},
                onMouseMove: !isMobile ? handlelistMove : ()=>{},
                onTouchStart: handleTouchStart,
                onTouchMove: handleTouchMove,
                onTouchEnd: stopDragging,
                ref: listRef,
                children: children
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scrollable);


/***/ }),

/***/ 886:
/***/ (() => {



/***/ })

};
;