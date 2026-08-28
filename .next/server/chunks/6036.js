"use strict";
exports.id = 6036;
exports.ids = [6036];
exports.modules = {

/***/ 311:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/logoSmall.34f6e991.png","height":500,"width":500,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAnUlEQVR42mMAAanMLYyq1XsYGbAB6dztcInOow+Ynn//x3Tt7Xem6+9+MMEV8WVt4WNjmM/PgAso5GzLNpxzevmBb39k7rz7YQI0wRhogvGdL38gpojHb2y0Wnlpctft17GvPv/Rv/Lmu/ENoMJbn38zA6XbGdnjN0iDVV54yMmAE9x/D3bsJaADb7/7wXgD2ZECcRvAkhnXn2N4FQCREEW2rs4i/wAAAABJRU5ErkJggg==","blurWidth":8,"blurHeight":8});

/***/ }),

/***/ 5976:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getParentalPin),
/* harmony export */   P: () => (/* binding */ getUser)
/* harmony export */ });
const getUser = ()=>{
    if (true) {
        return "";
    }
    return JSON.parse(localStorage.getItem("listUser"));
};
const getParentalPin = (key)=>{
    if (!key || "undefined" === "undefined") {
        return "";
    }
    const localItem = localStorage.getItem(key);
    const retrievedUser = localItem && Object.values(JSON.parse(localStorage.getItem(key)))[0].parentalPin;
    return retrievedUser;
};


/***/ })

};
;