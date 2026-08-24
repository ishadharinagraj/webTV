"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import DashboardHeader from "../../header";
import useApi from "@/hooks/useApi";
import { endpoint } from "@/config/endpoints";
import { AppContext } from "@/contexts/app";
import Loading from "@/utils/loading";
import { Alert, Backdrop, CircularProgress, Slider } from "@mui/material";
import "./styles.css";
import LiveTVPlayer from "../player";
import { AES, enc } from "crypto-js";
import {
  addToFavs,
  getFavourites,
  getRecents,
  removeFromFavs,
  saveWatchedContent,
  removeMovieFromRecents,
} from "@/firebase/functions";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import ParentalLock from "@/utils/parentalLock";
import { getParentalPin } from "@/utils/local";
import { Cancel } from "@mui/icons-material";
import Image from "next/image";
import noContentFound from "@/assets/noContentFound.svg";
import placeholderImage from "@/assets/placeholder.png";
import lockIcon from "@/assets/lockIcon.svg";
import { parse } from "iptv-playlist-parser";
import axios from "axios";
import { concatUrl } from "@/methods/concatUrl";
import VideoJSPlayer from "@/utils/player2";
import { getFileByName } from "@/utils/indexDb/ indexedDB";

const M3ULive = () => {
  const router = useRouter();
  const liveStreamsRef = useRef(null);
  const { makeRequest } = useApi();
  const { view } = useRouter().query;
  const [searchParams, setSearchParams] = useState();

  const {
    user,
    alert,
    streamData,
    m3uStreams,
    m3uUrl,
    homeM3uStreams,
    currentPlayer,
    theme
  } = useContext(AppContext);
  // const { liveTv } = streamData;
  
  const { live: m3uLiveStreams } = m3uStreams.streams;
  const [liveCategories, setLiveCategories] = useState([]);
  const [searchedCategories, setSearchedCategories] = useState([]);
  const [searchedChannels, setSearchedChannels] = useState([]);
  const [liveStreams, setLiveStreams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentLiveStreams, setCurrentLiveStreams] = useState([]);
  const [epgs, setEpgs] = useState([]);
  const [playerSrc, setPlayerSrc] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentStreamId, setCurrentStreamId] = useState(null);
  const [currentStream, setCurrentStream] = useState(null);
  const [timerStart, setTimerStart] = useState(false);
  const [favouriteChannels, setFavouriteChannels] = useState([]);
  const [channelHistory, setChannelHistory] = useState([]);
  const [searchOn, setSearchOn] = useState(false);
  const [showExtraCtg, setShowExtraCtg] = useState({
    favourite: true,
    channelHistory: true,
  });
  const [idExists, setIdExists] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [pinVerified, setPinVerified] = useState(false);
  const [noData, setNoData] = useState(false);
  const [onceAutoPlayed, setOnceAutoPlayed] = useState(false);
  const parentalPin = getParentalPin("currentUser");
  const [searchedValue, setSearchedValue] = useState("");
  const [errorIndex, setErrorIndex] = useState(null);
  const [clickedAdultCtg, setClickedAdultCtg] = useState(null);
  const [searchedChannel, setSearchedChannel] = useState("");
  const [searchChannelOn, setSearchChannelOn] = useState(false);

  const { live: liveTv } = m3uStreams.streams;
  const fetchDb = async () => {
    const currentUser = Object.keys(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    const data = await getFileByName(currentUser[0]);
    const parsedData = parse(data);
    const live = parsedData.items.filter(
      (item) => !item.url.includes("/movie/") && !item.url.includes("/series/")
    );
    m3uStreams.toggle(live);
  };

  useEffect(() => {
    if (user) {
      if (m3uStreams.streams.live) {
        getLiveCategories();
      } else {
        getLiveStreams();
      }
    }
  }, [user, m3uStreams.streams.live]);

  // useEffect(() => {
  //     if ((!movies && !series) || ((movies && movies.length === 0) && (series && series.length === 0))) {

  //         setNoData(true);
  //     } else {
  //         setNoData(false);
  //     }
  // }, [movies, series])

  useEffect(() => {
    if (user && liveTv && selectedCategory) {
      setCurrentLiveStreams([]);
      getFavouriteChannels();
      getChannelHistory();
      getCurrentLiveStreams();
    }
  }, [user, liveTv, selectedCategory]);
  useEffect(() => {
    setSearchParams(router.query);
  }, [router.query]);
  useEffect(() => {
    if (searchParams?.length !== undefined) {
      const title = AES.decrypt(searchParams?.title, "thisistitle")?.toString(
        enc.Utf8
      );
      const name = AES.decrypt(searchParams?.name, "thisisname")?.toString(
        enc.Utf8
      );
      const stream = AES.decrypt(searchParams?.stream, "thisisurl")?.toString(
        enc.Utf8
      );
    }
  }, [router.query]);
  useEffect(() => {
    setSelectedCategory(selectedCategory);
  }, [selectedCategory]);
  useEffect(() => {
    if (liveCategories && liveTv) {
      if (view) {
        const decryptedId = AES.decrypt(
          decodeURIComponent(view),
          "thisisliveurl"
        ).toString(enc.Utf8);
        const stream = liveTv.filter(
          (stream) =>
            concatUrl(String(stream.url)) === concatUrl(String(decryptedId))
        )[0];
        const categoryId = stream.group.title;
        const foundedCategory = liveCategories.filter(
          (ctg) => String(ctg) === String(categoryId)
        )[0];
        setSelectedCategory(foundedCategory);
        setCurrentStreamId(decryptedId);
      } else {
        setSelectedCategory(
          Object.keys(router.query).length !== 0
            ? AES.decrypt(router.query?.title, "thisistitle")?.toString(
                enc.Utf8
              )
            : liveCategories[0]
        );
        setCurrentStreamId(concatUrl(liveTv[0].url));
      }
    }
  }, [liveCategories, liveTv, router.query]);

  useEffect(() => {
    setCurrentLiveStreams([]);
    if (selectedCategory && liveTv && liveStreamsRef.current && currentStream) {
      getCurrentLiveStreams();
      getChannelHistory();
      getFavouriteChannels();
      liveStreamsRef.current.scrollTo(0, 0);
    }
  }, [selectedCategory, liveTv, liveStreamsRef,currentStream]);

  useEffect(() => {
    if (epgs.length > 0) {
      currentProgress();
      setTimerStart(true);
    }
  }, [epgs]);

  useEffect(() => {
    if (view) {
      setIdExists(true);
    } else {
      setIdExists(false);
    }
  }, [view]);

  useEffect(() => {
    if (currentStreamId && timerStart && epgs.length > 0) {
      const currentTime = new Date().getTime();
      const formattedEndDate =
        typeof epgs[0].end === "number"
          ? DateTime.fromSeconds(epgs[0].end, { zone: timeZone }).toFormat(
              "yyyy-MM-dd HH:mm:ss"
            )
          : epgs[0].end;
      const episodeEndTIme = DateTime.fromFormat(
        formattedEndDate,
        "yyyy-MM-dd HH:mm:ss",
        { zone: timeZone }
      ).setZone("Asia/Kolkata");
      const endTime = new Date(episodeEndTIme).getTime() + 100000;
      const delay = endTime - currentTime;
      if (delay > 0) {
        const timer = setTimeout(() => {
          handleEpg(
            currentLiveStreams.filter(
              (stream) =>
                concatUrl(String(stream.url)) === String(currentStreamId)
            )[0]
          );
        }, delay);
        return () => clearTimeout(timer);
      }
    }
  }, [currentStreamId, timerStart, epgs]);

  const getLiveCategories = () => {
    const categories = [];
    m3uLiveStreams.map((stream) => {
      const exists =
        categories.filter((ctg) => ctg === stream.group.title).length > 0;
      const ctgName = stream.group.title;
      if (!exists && ctgName !== null && ctgName.length > 0) {
        categories.push(ctgName);
      }
    });
    setLiveCategories(categories);
  };

  const getLiveStreams = async () => {
    setLoading(true);
    try {
      const currentUser = Object.keys(
        JSON.parse(localStorage.getItem("currentUser"))
      );
      const data = await getFileByName(currentUser[0]);
      const parsedData = parse(data);
      const isValid =
        parsedData.items.filter(
          (item) => item.group.title.length > 0 && item.name.length > 0
        ).length > 0;

      if (parsedData && isValid) {
        const movies = parsedData.items.filter(
          (item) => !item.url.includes("/movie/")
        );
        const series = parsedData.items.filter((item) =>
          item.url.includes("/series/")
        );
        const live = parsedData.items.filter(
          (item) =>
            !item.url.includes("/movie/") && !item.url.includes("/series/")
        );
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

  const convertURL = (simplifiedURL, extension) => {
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

  const formattedStartTime = (time) => {
    const dt = new Date(time).getTime();
    if (dt.toString() !== "NaN") {
      if (user.loginType === "one-stream-panel") {
        const parsedTime = formatDateToYYYYMMDDHHMMSS(dt);
        const foreignTime = DateTime.fromFormat(
          parsedTime,
          "yyyy-MM-dd HH:mm:ss"
        );
        return foreignTime.toLocaleString(DateTime.TIME_SIMPLE);
      } else {
        const parsedTime = formatDateToYYYYMMDDHHMMSS(dt);
        const foreignTime = DateTime.fromFormat(
          parsedTime,
          "yyyy-MM-dd HH:mm:ss",
          { zone: timeZone }
        );
        const indianTime = foreignTime.setZone("Asia/Kolkata");
        return indianTime.toLocaleString(DateTime.TIME_SIMPLE);
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
    "18",
  ];

  const getOneStreamURL = (id) => {
    return liveTv.filter((stm) => String(stm?.stream_id) === String(id))[0]
      .links.m3u8;
  };

  const getShortEpg = async (stream, verified) => {
    const id = concatUrl(stream?.url);
    const ctgName = liveTv.filter(
      (stm) => concatUrl(String(stm?.url)) === String(id)
    )[0]?.group.title;
    setEpgs([]);
    setPlayerSrc(null);

    const adult =
      adultCategories?.filter((ctg) =>
        ctgName?.toLowerCase()?.includes(ctg?.toLowerCase())
      ).length > 0;
    const response = await makeRequest().get(
      endpoint.getEpg + `?stream_id=${id}`
    );

    setTimeout(() => {
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

  const getCurrentLiveStreams = (type) => {
    if (
      selectedCategory !== "Favourites" &&
      selectedCategory !== "Channel History"
    ) {
      const streams = liveTv.filter(
        (stream) =>
          String(stream?.group.title).toLowerCase() ===
          String(selectedCategory).toLowerCase()
      );
      setCurrentLiveStreams(streams);
      if (!view) {
        setCurrentStreamId(
          currentStreamId ? currentStreamId : concatUrl(streams[0].url)
        );
        if (!onceAutoPlayed) {
          handleEpg(streams[0]);
          setCurrentStream(streams[0]);
          setOnceAutoPlayed(true);
        }
      }
      if (!onceAutoPlayed) {
        if (type !== "fav") {
          if (view) {
            const url = AES.decrypt(
              view.replace(/ /g, "+"),
              "thisisliveurl"
            ).toString(enc.Utf8);
            const stream = liveTv.filter((item) => item.url === url)[0];
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

  const getFavouriteChannels = async () => {
    try {
      const response = await getFavourites("LiveTv", user.id);
      const ids = response.val() ? Object.keys(response.val()) : [];
      setFavourites(ids);
      let favouriteStreams = [];
      ids.map((id) => {
        const matchedComp = liveTv.filter(
          (str) => concatUrl(String(str.url)) === String(id)
        )[0];
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

  const getChannelHistory = async () => {
    try {
      const response = await getRecents("LiveTv", user.id);
      const ids = Object.keys(response.val());
      let channelHistory = [];
      ids.map((id) => {
        const matchedComp = liveTv.filter(
          (str) => concatUrl(String(str.url)) === String(id)
        )[0];
        if (matchedComp) {
          channelHistory.push(matchedComp);
        }
      });
      setChannelHistory(channelHistory);
    } catch (error) {
      setChannelHistory([]);
    }
  };

  const handleEpg = (stream) => {
    setPlayerSrc(null);
    const streamId = concatUrl(stream?.url);
    getShortEpg(stream, pinVerified);
    setCurrentStreamId(String(streamId));
  };

  const getStreamIdFromUrl = (url) => {
    const regex = /\/(\d+)\.\w+$/; // Regular expression to match the stream ID before any file extension
    const match = url.match(regex);

    if (match && match.length > 1) {
      return match[1]; // Extracted stream ID
    } else {
      return null; // If no match found
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchedValue(value);
    let searchedEntries = liveCategories.filter((ctg) =>
      ctg.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedCategories(searchedEntries);
    if (value.length === 0) {
      setSearchOn(false);
      setShowExtraCtg({
        favourite: true,
        channelHistory: true,
      });
    } else {
      const isFavourite = "Favourite".toLowerCase().includes(value);
      const isChannelHistory = "Channel History".toLowerCase().includes(value);
      setShowExtraCtg({
        favourite: isFavourite,
        channelHistory: isChannelHistory,
      });
      setSearchOn(true);
    }
  };

  const handleFavourite = async (id, isFavourite) => {
    const favId = concatUrl(id);
    if (isFavourite) {
      await removeFromFavs(favId, "LiveTv", user.id);
      alert.toggle({
        show: true,
        title: "Removed from Favourites",
        type: "success",
      });
    } else {
      await addToFavs(favId, "LiveTv", user.id);
      alert.toggle({
        show: true,
        title: "Added to Favourites",
        type: "success",
      });
    }
    getFavouriteChannels();
    alert.toggle({
      title: `${
        isFavourite ? "Removed from Favourites" : "Added To Favourites"
      }`,
      show: true,
      type: "success",
    });
  };

  const currentProgress = () => {
    const { start, end } = epgs[0];
    const formattedStartDate =
      typeof start === "number"
        ? DateTime.fromSeconds(start, { zone: timeZone }).toFormat(
            "yyyy-MM-dd HH:mm:ss"
          )
        : start;
    const formattedEndDate =
      typeof end === "number"
        ? DateTime.fromSeconds(end, { zone: timeZone }).toFormat(
            "yyyy-MM-dd HH:mm:ss"
          )
        : end;
    const startTime = DateTime.fromFormat(
      formattedStartDate,
      "yyyy-MM-dd HH:mm:ss",
      { zone: timeZone }
    ).setZone("Asia/Kolkata");
    const endTime = DateTime.fromFormat(
      formattedEndDate,
      "yyyy-MM-dd HH:mm:ss",
      { zone: timeZone }
    ).setZone("Asia/Kolkata");
    const convertedStartTime = new Date(startTime).getTime();
    const convertedEndTime = new Date(endTime).getTime();
    const currentTime = new Date().getTime();
    const fullTime = (convertedEndTime - convertedStartTime) / 1000;
    const elapsedTime = (currentTime - convertedStartTime) / 1000;
    const pct = Number(((100 * elapsedTime) / fullTime).toFixed(2));
    setProgress(pct);
  };

  const saveChannelHistroy = async () => {
    setIdExists(false);
    try {
      await saveWatchedContent.liveTv(currentStreamId, user.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePinVerified = () => {
    setPinVerified(true);
    setIsAdult(false);
    if (
      selectedCategory.category_name === "Favourites" ||
      selectedCategory.category_name === "Channel History"
    ) {
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

  const handleClearSearch = (type) => {
    if (type === "ctg") {
      setSearchedValue("");
      setSearchOn(false);
      setSearchedCategories([]);
      setShowExtraCtg({
        favourite: true,
        channelHistory: true,
      });
    } else {
      setSearchChannelOn(false);
      setSearchedChannel("");
      setSearchedChannels([]);
    }
  };
  const handleLiveStream = (e, s) => {
    setCurrentStream(s);
    const clickedElement = e.target.tagName;
    const isFavourite = clickedElement === "svg" || clickedElement === "path";
    if (!isFavourite) {
      handleEpg(s);
    }
  };

  const handleCategory = (category) => {
    setPinVerified(false);
    setCurrentStreamId(null);
    const adult =
      adultCategories.filter((ctg) =>
        category.toLowerCase().includes(ctg.toLowerCase())
      ).length > 0;
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

  const removeChannelHistory = async (id) => {
    const favId = concatUrl(id);

    try {
      await removeMovieFromRecents(favId, "LiveTv", user.id, null);
      getChannelHistory();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChannels = (e, val) => {
    const { value } = e.target;
    setSearchedChannel(value);
    let searchedEntries = (
      val === "Favourites"
        ? favouriteChannels
        : val === "Channel History"
        ? channelHistory
        : currentLiveStreams || []
    ).filter((stream) =>
      stream.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedChannels(searchedEntries);
    if (value.length === 0) {
      setSearchChannelOn(false);
    } else {
      setSearchChannelOn(true);
    }
  };
  return loading ? (
    <Loading />
  ) : (
    <>
      <DashboardHeader currentAction="live" />
      {noData ? (
        <div className="no-data-found-container">
          {/* <Error color="warning" sx={{ fontSize: 30 }} /> */}
          <Image src={noContentFound} alt="live-stream" />
          <h2 className="no-data-found">No Live Streams found</h2>
        </div>
      ) : (
        <section className="liveTv">
          <div
            style={{
              position: "relative",
            }}
            className="steamDetail panel"
          >
            {epgs.length === 0 && !playerSrc ? (
              <CircularProgress className="loader-icon" />
            ) : (
              <>
                <div className="videoPlay">
                  {currentPlayer.player === "videojs" ? (
                    <VideoJSPlayer
                      getFavouriteChannels={getFavouriteChannels}
                      opened={idExists}
                      favourites={favourites}
                      src={convertURL(playerSrc, "m3u8")}
                      currentStreams={currentLiveStreams}
                      currentStream={currentStreamId}
                      playingStream={currentStream}
                      onPlayerReady={saveChannelHistroy}
                      restart={(index) => handleEpg(currentLiveStreams[index])}
                      onPreviousChannel={(index) => {
                        if (fullscreen) {
                          setIdExists(true);
                        }
                        handleEpg(currentLiveStreams[index - 1]);
                      }}
                      onNextChannel={(index) => {
                        if (fullscreen) {
                          setIdExists(true);
                        }
                        handleEpg(currentLiveStreams[index + 1]);
                      }}
                      onfullscreen={(e) => setFullscreen(e)}
                      onclose={() => {
                        setIdExists(false);
                        setFullscreen(false);
                        router.push("/dashboard/live", undefined, {
                          shallow: true,
                        });
                      }}
                      type={"m3u"}
                    />
                  ) : (
                    <LiveTVPlayer
                      getFavouriteChannels={getFavouriteChannels}
                      opened={idExists}
                      favourites={favourites}
                      url={playerSrc}
                      src={convertURL(playerSrc, "m3u8")}
                      currentStreams={currentLiveStreams}
                      currentStream={currentStreamId}
                      playingStream={currentStream}
                      onPlayerReady={saveChannelHistroy}
                      restart={(index) => handleEpg(currentLiveStreams[index])}
                      onPreviousChannel={(index) => {
                        if (fullscreen) {
                          setIdExists(true);
                        }
                        handleEpg(currentLiveStreams[index - 1]);
                      }}
                      onNextChannel={(index) => {
                        if (fullscreen) {
                          setIdExists(true);
                        }
                        handleEpg(currentLiveStreams[index + 1]);
                      }}
                      onfullscreen={(e) => setFullscreen(e)}
                      onclose={() => {
                        setIdExists(false);
                        setFullscreen(false);
                        router.push("/dashboard/live", undefined, {
                          shallow: true,
                        });
                      }}
                      type={"m3u"}
                    />
                  )}
                </div>
              </>
            )}
          </div>

          <div className="liveTv-bottom-container" style={{ flexDirection: "column", gap: 20 }}>
            <div className="live-category-header-bar">
              <div className="category-title-group">
                <h2 className="live-category-heading">
                  {typeof selectedCategory === "string" ? selectedCategory : selectedCategory?.category_name || "Channels"}
                </h2>
                <span className="live-channel-count-badge">
                  {currentLiveStreams ? currentLiveStreams.length : 0} Channels
                </span>
              </div>

              <div className="category-dropdown-wrapper">
                <label htmlFor="liveCategorySelectM3u" className="category-select-label">Category:</label>
                <select
                  id="liveCategorySelectM3u"
                  className="live-category-select"
                  value={typeof selectedCategory === "string" ? selectedCategory : selectedCategory?.category_name || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleCategory(val);
                  }}
                >
                  {showExtraCtg.favourite && (
                    <option value="Favourites">⭐ Favourites ({favouriteChannels.length})</option>
                  )}
                  {showExtraCtg.channelHistory && (
                    <option value="Channel History">🕒 Channel History ({channelHistory.length})</option>
                  )}
                  {liveCategories.map((category, index) => (
                    <option key={index} value={typeof category === "string" ? category : category.category_name}>
                      {typeof category === "string" ? category : category.category_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          <div className="panel tvList">
            {/* <div className="pHead">
              <span className="h5">{selectedCategory}</span>
            </div> */}
            <div className="pHead">
              <div className="controls">
                {searchedChannel.length > 0 ? (
                  <Cancel
                    sx={{ zIndex: 9, ":hover": { cursor: "pointer" } }}
                    onClick={() => handleClearSearch("channels")}
                  />
                ) : (
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <path
                      d="M24.1175 26.1783C17.3706 31.352 8.08155 29.4127 3.57637 23.2248C-0.68313 17.3743 0.0222769 9.14911 5.26344 4.18996C10.6336 -0.891038 18.8046 -1.19482 24.501 3.47881C30.3196 8.25287 31.6682 16.9694 26.8365 23.4239C26.9409 23.5359 27.0477 23.6578 27.162 23.7719C29.1119 25.7217 31.0609 27.6722 33.0147 29.6185C33.5862 30.1878 33.854 30.8417 33.6315 31.6459C33.2639 32.9734 31.6879 33.5093 30.5881 32.6788C30.431 32.5601 30.2915 32.4168 30.1513 32.277C28.2428 30.3722 26.335 28.4663 24.4296 26.5579C24.3115 26.4402 24.2163 26.3001 24.1175 26.1783ZM15.2969 25.2385C21.1588 25.229 25.8636 20.5245 25.8675 14.668C25.8717 8.79405 21.1448 4.07337 15.2667 4.08145C9.40626 4.08917 4.70179 8.79476 4.69757 14.6522C4.6937 20.528 9.41961 25.248 15.2969 25.2385Z"
                      fill="#748BC8"
                    />{" "}
                  </svg>
                )}
                <input
                  onChange={(e) =>
                    handleSearchChannels(e, selectedCategory?.category_name)
                  }
                  value={searchedChannel}
                  placeholder="Search by Channel Name"
                />
              </div>
            </div>
            {/* <div className="pBody" ref={liveStreamsRef}>
              {(selectedCategory === "Favourites"
                ? favouriteChannels
                : selectedCategory === "Channel History"
                ? channelHistory
                : currentLiveStreams
              ).map((stream, index) => {
                const { stream_id } = stream;
                const isFavourite =
                  favourites.filter( 
                    (id) => String(id) === concatUrl(String(stream.url))
                  ).length > 0;
                const isEqual =
                  concatUrl(stream.url) === String(currentStreamId);
                const ctgName = liveCategories.filter(
                  (ctg) => String(ctg) === String(stream.group.title)
                )[0];
                const adult =
                  adultCategories.filter((ctg) =>
                    ctgName.toLowerCase().includes(ctg.toLowerCase())
                  ).length > 0;

                return (
                  <div
                    onClick={(e) => handleLiveStream(e, stream)}
                    style={{ background: isEqual && "rgb(255,255,255,0.1)" }}
                    className="list"
                  >
                    <div className="channelList">
                      <a href="javascript:void(0)" className="thumb">
                        {errorIndex === index ? (
                          <Image alt="placeholder" src={placeholderImage} />
                        ) : adult &&
                          getParentalPin("currentUser") &&
                          (selectedCategory === "Favourites" ||
                            selectedCategory === "Channel History") ? (
                          <Image
                            alt="placeholder"
                            style={{
                              objectFit: "contain",
                              padding: "15px",
                            }}
                            src={lockIcon}
                          />
                        ) : stream.tvg.logo ? (
                          <img
                            src={stream.tvg.logo}
                            onError={() => setErrorIndex(index)}
                          />
                        ) : (
                          <Image alt="placeholder" src={placeholderImage} />
                        )}
                      </a>
                      <span className="info" >
                        <a href="javascript:void(0)">
                          <strong>{stream.name}</strong>{" "}
                        </a>
                      </span>
                    </div>
                    <div className="fav-delete">
                    <a
                      className="favourite"
                      id="favourite-el"
                      href="javascript:void(0)"
                    >
                      <svg
                        onClick={() => handleFavourite(stream.url, isFavourite)}
                        width="25"
                        height="23"
                        viewBox="0 0 25 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {" "}
                        <path
                          d="M24.7976 7.2086C24.7976 7.54497 24.7976 7.88134 24.7976 8.21745C24.785 8.2871 24.7666 8.35624 24.7611 8.42614C24.6679 9.60254 24.2942 10.6901 23.7202 11.7141C22.9972 13.0041 22.0421 14.1134 20.9974 15.1449C18.4649 17.6453 15.6791 19.8596 13.0023 22.197C12.6849 22.4744 12.3046 22.4572 11.9748 22.1827C11.698 21.9523 11.4259 21.7161 11.1547 21.4789C9.00273 19.5982 6.83161 17.7395 4.70792 15.8278C3.39096 14.6423 2.1868 13.3382 1.31572 11.7747C-0.14759 9.14833 -0.226068 6.48212 1.24456 3.83987C2.05937 2.37555 3.31753 1.39294 4.94058 0.933683C6.67188 0.443893 8.33151 0.62053 9.87507 1.58901C10.8574 2.20547 11.6059 3.05081 12.2188 4.02484C12.3094 4.16867 12.3977 4.31377 12.4631 4.41924C12.9281 3.81943 13.3354 3.18783 13.8459 2.65514C15.6448 0.778747 17.8308 0.205432 20.2936 1.01695C22.6116 1.78079 23.9556 3.49467 24.5549 5.81947C24.6717 6.27318 24.7184 6.74505 24.7976 7.2086Z"
                          fill={isFavourite ? "#FF0000" : "white"}
                        />
                      </svg>
                    </a>
                    {
                     selectedCategory === "Channel History" && 
                      <a
                      className="delete"
                      id="delete-el"
                      href="javascript:void(0)"
                    >

                                                        <svg onClick={() => removeChannelHistory(stream.url)} width="17" height="24" viewBox="0 0 30 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.70855 11.3789C11.0812 11.3789 19.3939 11.3789 27.7294 11.3789C27.7446 11.4827 27.7696 11.5774 27.7704 11.6722C27.7802 15.5732 27.8673 19.4765 27.7704 23.3744C27.6984 26.2888 27.4331 29.201 27.1725 32.1063C26.9504 34.5827 24.8378 36.5468 22.3538 36.5695C17.6124 36.6135 12.871 36.615 8.12965 36.5695C5.54262 36.5445 3.4451 34.4356 3.27006 31.8585C3.09577 29.2881 2.90178 26.7193 2.7184 24.1489C2.70703 23.9928 2.70779 23.8359 2.70779 23.6791C2.70703 19.7637 2.70703 15.8475 2.70703 11.9321C2.70855 11.7646 2.70855 11.5964 2.70855 11.3789Z" fill="white" />
                                                            <path d="M15.2806 8.74084C10.9954 8.74084 6.70943 8.74615 2.42423 8.73099C2.08399 8.72948 1.70511 8.6537 1.41261 8.49078C0.801085 8.14978 0.545716 7.47612 0.715457 6.89415C0.9049 6.24323 1.54219 5.75825 2.25222 5.75371C3.63288 5.74537 5.0143 5.74007 6.39496 5.75901C6.72004 5.76356 6.90797 5.66505 7.07999 5.38846C7.69454 4.39805 8.32955 3.41977 8.96987 2.44603C9.88298 1.05855 11.1871 0.261373 12.833 0.185595C14.5516 0.106029 16.2809 0.0984515 17.9995 0.185595C19.9076 0.28259 21.2427 1.3662 22.1665 2.98481C22.5893 3.72591 22.9932 4.47913 23.3653 5.246C23.5494 5.62564 23.7654 5.77492 24.2056 5.76356C25.5575 5.72794 26.9109 5.73931 28.2628 5.75446C29.3282 5.76659 29.9981 6.60544 29.7722 7.60722C29.6374 8.20813 29.1372 8.65976 28.5212 8.72266C28.3234 8.74312 28.1233 8.73933 27.924 8.73933C23.7093 8.74084 19.4953 8.74084 15.2806 8.74084ZM20.4471 5.72491C20.125 5.20432 19.784 4.75951 19.5559 4.26317C19.1339 3.34323 18.4223 2.9545 17.4531 2.95146C15.9732 2.94768 14.4933 2.9454 13.0133 2.95222C12.3556 2.95525 11.7524 3.1697 11.3531 3.69105C10.8742 4.31621 10.4763 5.00427 10.0042 5.72415C13.5188 5.72491 16.9409 5.72491 20.4471 5.72491Z" fill="white" />
                                                        </svg>
                                                        </a>
                    }
                                                        </div>
                                                    
                  </div>
                );
              })}

              {selectedCategory === "Favourites" &&
              favouriteChannels.length === 0 ? (
                <h1 className="no-category-found">
                  No Favourite Streams found !
                </h1>
              ) : selectedCategory === "Channel History" &&
                channelHistory.length === 0 ? (
                <h1 className="no-category-found">
                  No Channel History found !
                </h1>
              ) : currentLiveStreams.length === 0 &&
                selectedCategory !== "Favourites" &&
                selectedCategory !== "Channel History" ? (
                <h1 className="no-category-found">No Live streams found !</h1>
              ) : null}
            </div> */}

            <div className="pBody" ref={liveStreamsRef}>
              {(searchChannelOn
                ? searchedChannels
                : selectedCategory === "Favourites"
                ? favouriteChannels
                : selectedCategory === "Channel History"
                ? channelHistory
                : currentLiveStreams
              ).map((stream, index) => {
                const { stream_id } = stream;
                const isFavourite =
                  favourites.filter(
                    (id) => String(id) === concatUrl(String(stream.url))
                  ).length > 0;
                const isEqual = String(stream_id) === String(currentStreamId);
                const ctgName = selectedCategory;
                const adult =
                  adultCategories.filter((ctg) =>
                    ctgName.toLowerCase().includes(ctg.toLowerCase())
                  ).length > 0;

                return (
                  <div
                    key={index}
                    onClick={(e) => handleLiveStream(e, stream)}
                    style={{ background: isEqual && "rgb(255,255,255,0.1)" }}
                    className="list"
                  >
                    <div className="channelList">
                      <a href="javascript:void(0)" className="thumb">
                        {errorIndex === index ? (
                          <Image alt="placeholder" src={placeholderImage} />
                        ) : adult &&
                          getParentalPin("currentUser") &&
                          (selectedCategory.category_name === "Favourites" ||
                            selectedCategory.category_name ===
                              "Channel History") ? (
                          <Image
                            alt="placeholder"
                            style={{
                              objectFit: "contain",
                              padding: "15px",
                            }}
                            src={lockIcon}
                          />
                        ) : stream.stream_icon ? (
                          <img
                            src={stream.stream_icon}
                            onError={() => setErrorIndex(index)}
                          />
                        ) : (
                          <Image alt="placeholder" src={placeholderImage} />
                        )}
                      </a>
                      <span className="info">
                        <a href="javascript:void(0)">
                          <strong>{stream.name}</strong>
                          {isEqual &&
                            currentEpg &&
                            atob(currentEpg.title).slice(0, 100)}{" "}
                          {isEqual &&
                            currentEpg &&
                            atob(currentEpg.title).length > 100 &&
                            "..."}
                        </a>
                        {/* {isEqual && epgs.length > 0 &&  
                                                                    <Slider
                                                                        className='live-stream-slider'
                                                                        value={isEqual ? progress : 0}
                                                                        size={"small"}
                                                                        sx={{
                                                                            width: "90%",
                                                                            color: '#615DFC !important',
                                                                        }}
                                                                        disabled
                                                                    />
                                                                } */}
                      </span>
                    </div>
                    {
                      <div
                        className="fav-and-delete"
                        style={{
                          display: "flex",
                          position: "absolute",
                          top: 6,
                          right: 10,
                          gap: 10,
                          padding: 5,
                        }}
                      >
                        <svg
                          stroke={theme.current ==="dark" ? "white" :"black"}
                          strokeWidth={2}
                          onClick={() =>
                            handleFavourite(stream.url, isFavourite)
                          }
                          width="28"
                          height="23"
                          viewBox="0 0 25 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          
                        >
                          {" "}
                          <path
                            d="M24.7976 7.2086C24.7976 7.54497 24.7976 7.88134 24.7976 8.21745C24.785 8.2871 24.7666 8.35624 24.7611 8.42614C24.6679 9.60254 24.2942 10.6901 23.7202 11.7141C22.9972 13.0041 22.0421 14.1134 20.9974 15.1449C18.4649 17.6453 15.6791 19.8596 13.0023 22.197C12.6849 22.4744 12.3046 22.4572 11.9748 22.1827C11.698 21.9523 11.4259 21.7161 11.1547 21.4789C9.00273 19.5982 6.83161 17.7395 4.70792 15.8278C3.39096 14.6423 2.1868 13.3382 1.31572 11.7747C-0.14759 9.14833 -0.226068 6.48212 1.24456 3.83987C2.05937 2.37555 3.31753 1.39294 4.94058 0.933683C6.67188 0.443893 8.33151 0.62053 9.87507 1.58901C10.8574 2.20547 11.6059 3.05081 12.2188 4.02484C12.3094 4.16867 12.3977 4.31377 12.4631 4.41924C12.9281 3.81943 13.3354 3.18783 13.8459 2.65514C15.6448 0.778747 17.8308 0.205432 20.2936 1.01695C22.6116 1.78079 23.9556 3.49467 24.5549 5.81947C24.6717 6.27318 24.7184 6.74505 24.7976 7.2086Z"
                            fill={isFavourite ? "#FF0000" : "none"}
                          />
                        </svg>
                        {selectedCategory ===
                          "Channel History" && (
                          <svg
                            onClick={() => removeChannelHistory(stream.url)}
                            width="17"
                            height="24"
                            viewBox="0 0 30 37"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.70855 11.3789C11.0812 11.3789 19.3939 11.3789 27.7294 11.3789C27.7446 11.4827 27.7696 11.5774 27.7704 11.6722C27.7802 15.5732 27.8673 19.4765 27.7704 23.3744C27.6984 26.2888 27.4331 29.201 27.1725 32.1063C26.9504 34.5827 24.8378 36.5468 22.3538 36.5695C17.6124 36.6135 12.871 36.615 8.12965 36.5695C5.54262 36.5445 3.4451 34.4356 3.27006 31.8585C3.09577 29.2881 2.90178 26.7193 2.7184 24.1489C2.70703 23.9928 2.70779 23.8359 2.70779 23.6791C2.70703 19.7637 2.70703 15.8475 2.70703 11.9321C2.70855 11.7646 2.70855 11.5964 2.70855 11.3789Z"
                              fill="white"
                            />
                            <path
                              d="M15.2806 8.74084C10.9954 8.74084 6.70943 8.74615 2.42423 8.73099C2.08399 8.72948 1.70511 8.6537 1.41261 8.49078C0.801085 8.14978 0.545716 7.47612 0.715457 6.89415C0.9049 6.24323 1.54219 5.75825 2.25222 5.75371C3.63288 5.74537 5.0143 5.74007 6.39496 5.75901C6.72004 5.76356 6.90797 5.66505 7.07999 5.38846C7.69454 4.39805 8.32955 3.41977 8.96987 2.44603C9.88298 1.05855 11.1871 0.261373 12.833 0.185595C14.5516 0.106029 16.2809 0.0984515 17.9995 0.185595C19.9076 0.28259 21.2427 1.3662 22.1665 2.98481C22.5893 3.72591 22.9932 4.47913 23.3653 5.246C23.5494 5.62564 23.7654 5.77492 24.2056 5.76356C25.5575 5.72794 26.9109 5.73931 28.2628 5.75446C29.3282 5.76659 29.9981 6.60544 29.7722 7.60722C29.6374 8.20813 29.1372 8.65976 28.5212 8.72266C28.3234 8.74312 28.1233 8.73933 27.924 8.73933C23.7093 8.74084 19.4953 8.74084 15.2806 8.74084ZM20.4471 5.72491C20.125 5.20432 19.784 4.75951 19.5559 4.26317C19.1339 3.34323 18.4223 2.9545 17.4531 2.95146C15.9732 2.94768 14.4933 2.9454 13.0133 2.95222C12.3556 2.95525 11.7524 3.1697 11.3531 3.69105C10.8742 4.31621 10.4763 5.00427 10.0042 5.72415C13.5188 5.72491 16.9409 5.72491 20.4471 5.72491Z"
                              fill="white"
                            />
                          </svg>
                        )}
                      </div>
                    }
                  </div>
                );
              })}

              {selectedCategory === "Favourites" &&
              favouriteChannels.length === 0 ? (
                <h1 className="no-category-found">
                  No Favourite Streams found !
                </h1>
              ) : selectedCategory === "Channel History" &&
                channelHistory.length === 0 ? (
                <h1 className="no-category-found">
                  No Channel History found !
                </h1>
              ) : currentLiveStreams.length === 0 &&
                selectedCategory !== "Favourites" &&
                selectedCategory!== "Channel History" ? (
                <h1 className="no-category-found">No Live streams found !</h1>
              ) : null}
              {searchChannelOn && searchedChannels.length === 0 && (
                <h1 className="no-category-found">No Live Streams Found !</h1>
              )}
            </div>
            </div>
          </div>
        </section>
      )}
      <ParentalLock
        action={"verify"}
        close={() => setIsAdult(false)}
        open={isAdult}
        completed={handlePinVerified}
      />
      {idExists && (
        <Backdrop
          sx={{
            background: "black",
            position: "fixed",
            top: 0,
            zIndex: 9999,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          open={true}
        >
          <CircularProgress sx={{ color: "white" }} />
        </Backdrop>
      )}
    </>
  );
};

export default M3ULive;
