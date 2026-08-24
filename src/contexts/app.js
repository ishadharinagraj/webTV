import React, { createContext } from 'react';

const AppContext = createContext({
  user: null,
  toggleUser: () => { },
  streamData: {
    movies: {
      streams: null,
      streamCategories: null,
      banner: null,
      toggle: () => { },
      banner: {
        streams: null,
        toggle: () => { }
      }
    },
    series: {
      streams: null,
      streamCategories: null,
      toggle: () => { },
      banner: {
        streams: null,
        toggle: () => { }
      }
    },
    liveTv : {
      streams : null,
      streamCategories : null,
      toggle : () => {}
    },
    toggle: () => { }
  },
  alert: {
    title: "",
    show: false,
    type: "success",
    toggle: () => { }
  },
  parentalVerified: {
    status: false,
    toggle: () => { }
  },
  theme: {
    current: "dark",
    color : "blue",
    toggleTheme: () => {},
    toggleColor: () => {},
  },
  m3uStreams : {
    streams : {
      movies: null,
      series: null,
      live: null
    },
    toggle : () => {},
  },
  m3uUrl : {
    url : '',
    toggle : () => {}
  },
  homeM3uStreams: {
    streams: null,
    toggle: () => {}
  },
  m3uFileUpload: {
    uploading:  false,
    uploaded: false,
    progress: 0,
    toggle: () => {}
  },
  scrolled: {
    h: 0,
    m: 0,
    s: 0,
    toggle: () => {}
  },
  loading: {
    state: false,
    toggle: () => {}
  },
  currentPlayer: {
    player: 'flowplayer',
    toggle: () => {}
  },
  m3u:{
    data:null,
    isVisible:false,
    toggle:()=>{}
  },

});

export { AppContext };