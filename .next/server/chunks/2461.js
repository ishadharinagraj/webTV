"use strict";
exports.id = 2461;
exports.ids = [2461];
exports.modules = {

/***/ 2461:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F_: () => (/* binding */ ALL_AVATARS),
/* harmony export */   NS: () => (/* binding */ BOY_AVATARS),
/* harmony export */   oU: () => (/* binding */ GIRL_AVATARS),
/* harmony export */   qM: () => (/* binding */ getAvatarById)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const BOY_AVATARS = [
    {
        id: "boy-1",
        name: "Cyber Hero",
        category: "boy",
        gradient: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
        glowColor: "#38bdf8",
        svg: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
            width: "110",
            height: "110",
            viewBox: "0 0 100 100",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "50",
                    r: "46",
                    fill: "url(#boy1-bg)"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M30 78C30 65 38 56 50 56C62 56 70 65 70 78V82H30V78Z",
                    fill: "#0f172a"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "42",
                    r: "18",
                    fill: "#38bdf8"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M36 38C36 30 42 24 50 24C58 24 64 30 64 38V42H36V38Z",
                    fill: "#0284c7"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("rect", {
                    x: "38",
                    y: "38",
                    width: "24",
                    height: "8",
                    rx: "4",
                    fill: "#7dd3fc"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "44",
                    cy: "42",
                    r: "2",
                    fill: "#0f172a"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "56",
                    cy: "42",
                    r: "2",
                    fill: "#0f172a"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("defs", {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
                        id: "boy1-bg",
                        x1: "0",
                        y1: "0",
                        x2: "100",
                        y2: "100",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                stopColor: "#0ea5e9"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                offset: "1",
                                stopColor: "#1e3a8a"
                            })
                        ]
                    })
                })
            ]
        })
    },
    {
        id: "boy-2",
        name: "Shadow Ninja",
        category: "boy",
        gradient: "linear-gradient(135deg, #8b5cf6 0%, #4c1d95 100%)",
        glowColor: "#c084fc",
        svg: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
            width: "110",
            height: "110",
            viewBox: "0 0 100 100",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "50",
                    r: "46",
                    fill: "url(#boy2-bg)"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M28 80C28 66 37 57 50 57C63 57 72 66 72 80V84H28V80Z",
                    fill: "#1e1b4b"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "40",
                    r: "19",
                    fill: "#312e81"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M31 38H69V46H31V38Z",
                    fill: "#a855f7"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ellipse", {
                    cx: "43",
                    cy: "42",
                    rx: "3",
                    ry: "2",
                    fill: "#ffffff"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ellipse", {
                    cx: "57",
                    cy: "42",
                    rx: "3",
                    ry: "2",
                    fill: "#ffffff"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M48 20L54 20L52 28L46 28Z",
                    fill: "#c084fc"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("defs", {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
                        id: "boy2-bg",
                        x1: "0",
                        y1: "0",
                        x2: "100",
                        y2: "100",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                stopColor: "#8b5cf6"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                offset: "1",
                                stopColor: "#31106a"
                            })
                        ]
                    })
                })
            ]
        })
    },
    {
        id: "boy-3",
        name: "Space Ranger",
        category: "boy",
        gradient: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
        glowColor: "#fbbf24",
        svg: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
            width: "110",
            height: "110",
            viewBox: "0 0 100 100",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "50",
                    r: "46",
                    fill: "url(#boy3-bg)"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M26 80C26 64 36 54 50 54C64 54 74 64 74 80V84H26V80Z",
                    fill: "#78350f"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "40",
                    r: "20",
                    fill: "#fef3c7"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M30 36C30 25 39 18 50 18C61 18 70 25 70 36H30Z",
                    fill: "#f59e0b"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M34 36H66V44H34V36Z",
                    fill: "#fbbf24",
                    opacity: "0.8"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "43",
                    cy: "40",
                    r: "2.5",
                    fill: "#451a03"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "57",
                    cy: "40",
                    r: "2.5",
                    fill: "#451a03"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M46 47C48 49 52 49 54 47",
                    stroke: "#451a03",
                    strokeWidth: "2",
                    strokeLinecap: "round"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("defs", {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
                        id: "boy3-bg",
                        x1: "0",
                        y1: "0",
                        x2: "100",
                        y2: "100",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                stopColor: "#f59e0b"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                offset: "1",
                                stopColor: "#78350f"
                            })
                        ]
                    })
                })
            ]
        })
    },
    {
        id: "boy-4",
        name: "Dragon Warrior",
        category: "boy",
        gradient: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
        glowColor: "#34d399",
        svg: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
            width: "110",
            height: "110",
            viewBox: "0 0 100 100",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "50",
                    r: "46",
                    fill: "url(#boy4-bg)"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M28 80C28 65 37 56 50 56C63 56 72 65 72 80V84H28V80Z",
                    fill: "#064e3b"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "41",
                    r: "19",
                    fill: "#a7f3d0"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M32 30C32 20 40 16 50 16C60 16 68 20 68 30V35H32V30Z",
                    fill: "#059669"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M44 14L50 6L56 14Z",
                    fill: "#34d399"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "43",
                    cy: "41",
                    r: "2.5",
                    fill: "#064e3b"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "57",
                    cy: "41",
                    r: "2.5",
                    fill: "#064e3b"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M45 48Q50 52 55 48",
                    stroke: "#064e3b",
                    strokeWidth: "2",
                    strokeLinecap: "round"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("defs", {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
                        id: "boy4-bg",
                        x1: "0",
                        y1: "0",
                        x2: "100",
                        y2: "100",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                stopColor: "#10b981"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                offset: "1",
                                stopColor: "#064e3b"
                            })
                        ]
                    })
                })
            ]
        })
    },
    {
        id: "boy-5",
        name: "Astro Knight",
        category: "boy",
        gradient: "linear-gradient(135deg, #6366f1 0%, #312e81 100%)",
        glowColor: "#818cf8",
        svg: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
            width: "110",
            height: "110",
            viewBox: "0 0 100 100",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "50",
                    r: "46",
                    fill: "url(#boy5-bg)"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M26 80C26 65 36 55 50 55C64 55 74 65 74 80V84H26V80Z",
                    fill: "#1e1b4b"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "39",
                    r: "20",
                    fill: "#e0e7ff"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M30 38C30 24 39 17 50 17C61 17 70 24 70 38V41H30V38Z",
                    fill: "#4f46e5"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M36 34L50 24L64 34Z",
                    fill: "#818cf8"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "43",
                    cy: "40",
                    r: "2.5",
                    fill: "#1e1b4b"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "57",
                    cy: "40",
                    r: "2.5",
                    fill: "#1e1b4b"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M46 47H54",
                    stroke: "#1e1b4b",
                    strokeWidth: "2",
                    strokeLinecap: "round"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("defs", {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
                        id: "boy5-bg",
                        x1: "0",
                        y1: "0",
                        x2: "100",
                        y2: "100",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                stopColor: "#6366f1"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                offset: "1",
                                stopColor: "#1e1b4b"
                            })
                        ]
                    })
                })
            ]
        })
    }
];
const GIRL_AVATARS = [
    {
        id: "girl-1",
        name: "Cyber Princess",
        category: "girl",
        gradient: "linear-gradient(135deg, #ec4899 0%, #831843 100%)",
        glowColor: "#f472b6",
        svg: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
            width: "110",
            height: "110",
            viewBox: "0 0 100 100",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "50",
                    r: "46",
                    fill: "url(#girl1-bg)"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M26 80C26 65 36 56 50 56C64 56 74 65 74 80V84H26V80Z",
                    fill: "#500724"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "40",
                    r: "19",
                    fill: "#fbcfe8"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M28 34C28 20 38 15 50 15C62 15 72 20 72 34V46H28V34Z",
                    fill: "#db2777"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M42 12L50 4L58 12Z",
                    fill: "#f472b6"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "43",
                    cy: "40",
                    r: "2.5",
                    fill: "#500724"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "57",
                    cy: "40",
                    r: "2.5",
                    fill: "#500724"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M45 47Q50 51 55 47",
                    stroke: "#500724",
                    strokeWidth: "2",
                    strokeLinecap: "round"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("defs", {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
                        id: "girl1-bg",
                        x1: "0",
                        y1: "0",
                        x2: "100",
                        y2: "100",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                stopColor: "#ec4899"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                offset: "1",
                                stopColor: "#500724"
                            })
                        ]
                    })
                })
            ]
        })
    },
    {
        id: "girl-2",
        name: "Starlight Heroine",
        category: "girl",
        gradient: "linear-gradient(135deg, #a855f7 0%, #581c87 100%)",
        glowColor: "#c084fc",
        svg: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
            width: "110",
            height: "110",
            viewBox: "0 0 100 100",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "50",
                    r: "46",
                    fill: "url(#girl2-bg)"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M28 80C28 65 37 55 50 55C63 55 72 65 72 80V84H28V80Z",
                    fill: "#3b0764"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "39",
                    r: "19",
                    fill: "#f3e8ff"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M26 30C26 18 36 14 50 14C64 14 74 18 74 30V48H26V30Z",
                    fill: "#9333ea"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "18",
                    r: "4",
                    fill: "#c084fc"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "43",
                    cy: "39",
                    r: "2.5",
                    fill: "#3b0764"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "57",
                    cy: "39",
                    r: "2.5",
                    fill: "#3b0764"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M46 46Q50 49 54 46",
                    stroke: "#3b0764",
                    strokeWidth: "2",
                    strokeLinecap: "round"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("defs", {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
                        id: "girl2-bg",
                        x1: "0",
                        y1: "0",
                        x2: "100",
                        y2: "100",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                stopColor: "#a855f7"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                offset: "1",
                                stopColor: "#3b0764"
                            })
                        ]
                    })
                })
            ]
        })
    },
    {
        id: "girl-3",
        name: "Cosmic Valkyrie",
        category: "girl",
        gradient: "linear-gradient(135deg, #06b6d4 0%, #164e63 100%)",
        glowColor: "#22d3ee",
        svg: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
            width: "110",
            height: "110",
            viewBox: "0 0 100 100",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "50",
                    r: "46",
                    fill: "url(#girl3-bg)"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M26 80C26 64 36 54 50 54C64 54 74 64 74 80V84H26V80Z",
                    fill: "#083344"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "40",
                    r: "19",
                    fill: "#cffafe"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M28 32C28 20 38 15 50 15C62 15 72 20 72 32V44H28V32Z",
                    fill: "#0891b2"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M34 26L50 16L66 26Z",
                    fill: "#22d3ee"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "43",
                    cy: "40",
                    r: "2.5",
                    fill: "#083344"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "57",
                    cy: "40",
                    r: "2.5",
                    fill: "#083344"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M45 47H55",
                    stroke: "#083344",
                    strokeWidth: "2",
                    strokeLinecap: "round"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("defs", {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
                        id: "girl3-bg",
                        x1: "0",
                        y1: "0",
                        x2: "100",
                        y2: "100",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                stopColor: "#06b6d4"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                offset: "1",
                                stopColor: "#083344"
                            })
                        ]
                    })
                })
            ]
        })
    },
    {
        id: "girl-4",
        name: "Anime Mage",
        category: "girl",
        gradient: "linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)",
        glowColor: "#60a5fa",
        svg: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
            width: "110",
            height: "110",
            viewBox: "0 0 100 100",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "50",
                    r: "46",
                    fill: "url(#girl4-bg)"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M26 80C26 65 36 55 50 55C64 55 74 65 74 80V84H26V80Z",
                    fill: "#172554"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "41",
                    r: "19",
                    fill: "#dbeafe"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M25 32C25 18 36 12 50 12C64 12 75 18 75 32V46H25V32Z",
                    fill: "#2563eb"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M32 18L50 4L68 18Z",
                    fill: "#60a5fa"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "43",
                    cy: "41",
                    r: "2.5",
                    fill: "#172554"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "57",
                    cy: "41",
                    r: "2.5",
                    fill: "#172554"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M46 48Q50 51 54 48",
                    stroke: "#172554",
                    strokeWidth: "2",
                    strokeLinecap: "round"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("defs", {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
                        id: "girl4-bg",
                        x1: "0",
                        y1: "0",
                        x2: "100",
                        y2: "100",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                stopColor: "#3b82f6"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                offset: "1",
                                stopColor: "#172554"
                            })
                        ]
                    })
                })
            ]
        })
    },
    {
        id: "girl-5",
        name: "Phoenix Queen",
        category: "girl",
        gradient: "linear-gradient(135deg, #f43f5e 0%, #881337 100%)",
        glowColor: "#fb7185",
        svg: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
            width: "110",
            height: "110",
            viewBox: "0 0 100 100",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "50",
                    r: "46",
                    fill: "url(#girl5-bg)"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M26 80C26 65 36 56 50 56C64 56 74 65 74 80V84H26V80Z",
                    fill: "#4c0519"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "50",
                    cy: "40",
                    r: "19",
                    fill: "#ffe4e6"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M26 30C26 16 36 12 50 12C64 12 74 16 74 30V46H26V30Z",
                    fill: "#e11d48"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M40 10L50 2L60 10Z",
                    fill: "#fb7185"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "43",
                    cy: "40",
                    r: "2.5",
                    fill: "#4c0519"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                    cx: "57",
                    cy: "40",
                    r: "2.5",
                    fill: "#4c0519"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M45 47Q50 51 55 47",
                    stroke: "#4c0519",
                    strokeWidth: "2",
                    strokeLinecap: "round"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("defs", {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
                        id: "girl5-bg",
                        x1: "0",
                        y1: "0",
                        x2: "100",
                        y2: "100",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                stopColor: "#f43f5e"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("stop", {
                                offset: "1",
                                stopColor: "#4c0519"
                            })
                        ]
                    })
                })
            ]
        })
    }
];
const ALL_AVATARS = [
    ...BOY_AVATARS,
    ...GIRL_AVATARS
];
const getAvatarById = (id)=>{
    if (!id) return null;
    return ALL_AVATARS.find((avatar)=>avatar.id === id) || null;
};


/***/ })

};
;