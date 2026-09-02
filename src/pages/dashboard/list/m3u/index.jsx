import { AppContext } from "@/contexts/app";
import Link from "next/link";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Grid, List } from "react-virtualized";
import placeholderImage from "@/assets/placeholder.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { AES } from "crypto-js";
import { parse } from "iptv-playlist-parser";
import axios from "axios";
import Scrollable from "@/utils/scrollable";
import {
  getFavourites,
  getRecents,
  removeMovieFromRecents,
  removeFromFavs,
  addToFavs,
} from "@/firebase/functions";
import Loading from "@/utils/loading";
import { concatUrl } from "@/methods/concatUrl";
import Watched from "@/utils/progress";
import { getParentalPin } from "@/utils/local";
import ParentalLock from "@/utils/parentalLock";
import noContentFound from "@/assets/noContentFound.svg";
import "./styles.css";
import VideoJsPlayer from "@/utils/player/videojs";
import CloseIcon from "@mui/icons-material/Close";
import {getFileByName } from "@/utils/indexDb/ indexedDB";
import Player from "@/utils/player";
import { Cancel, Info } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const M3uList = ({ currentAction }) => {
  const router = useRouter();
  const { query } = router;
  const { view } = query;
  const {
    m3uStreams,
    m3uUrl,
    parentalVerified,
    scrolled,
    m3u,
    isPlayerOpen,
    currentPlayer,
    theme,
    user,
    alert,
  } = useContext(AppContext);
  const refs = useRef([]);
  const listImagesRef = useRef([]);
  let mouseDown = false;
  let startX, scrollLeft;
  const path = currentAction === "movies" ? "Movie" : "Series";
  const [movieCategories, setMovieCategories] = useState([]);
  const [seriesCategories, setSeriesCategories] = useState([]);
  const [liveCategories, setLiveCategories] = useState([]);
  const [FavouriteMovies, setFavouriteMovies] = useState(null);
  const [favouriteSeries, setFavouriteSeries] = useState(null);
  const [recents, setRecents] = useState([]);
  const [recentSeries, setRecentSeries] = useState([]);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [noData, setNodata] = useState(false);
  const columnCount = 2;
  const [loading, setLoading] = useState(false);
  const [m3uLoading, setM3uLoading] = useState(false);
  const [showParentalLock, setShowParentalLock] = useState(false);
  const [clickedAdultItem, setClickedAdultItem] = useState(null);
  const [seriesDifference, setSeriesDifference] = useState(0);
  const [moviesDifference, setMoviesDifference] = useState(0);
  const { movies, series, live } = m3uStreams.streams;
  const currentSelected = currentAction === "movies" ? movies : series;
  const [isPlayerOPen, setIsPlayerOpen] = useState(false);
  const [M3uData, setM3uData] = useState(null);
  const gridRef = useRef();
  const [url, setUrl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [isFormatted, setIsFormatted] = useState();
  const [currentRecentItem, setCurrentRecentItem] = useState(null);
  const parentalPin = getParentalPin("currentUser");
  const adultArray = [
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
  let currentSelectedId;
  const infoHandler = (movie) => {
    const encryptedName = encodeURIComponent(
      AES.encrypt(movie?.info?.name, "thisismovie").toString()
    );
    router.push(
      {
        pathname: `/dashboard/preview/${currentAction}/m3u/${encryptedName}`,
        query: {
          id: getStreamIdFromUrl(movie?.info?.url),
          stream: AES.encrypt(movie?.info?.url, "thisisurl").toString(),
          name: movie?.info?.url,
        },
      },
      `/dashboard/preview/${currentAction}/m3u/${encryptedName}`
    );
  };
  const getM3uStreams = async () => {
    try {
      const response = await axios.get(m3uUrl.url);
      const parsedData = parse(response.data);
      m3u.toggle(parsedData?.items);
      setM3uData(parsedData?.items);
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const clearHandler = () => {
    setSearchTerm("");
    setFilteredData([]);
    setNodata(false);
  };
  const getFavs = async (values) => {
    setFavouriteMovies(null);
    setFavouriteSeries(null);
    try {
      const response = await getFavourites(path, user?.id);
      const ids = response.val() && Object.keys(response.val());
      if (ids) {
        let favs = [];
        ids.map((id) => {
          const itemExists = currentSelected.filter(
            (movie) => String(concatUrl(movie.url)) === String(id)
          );
          if (itemExists.length > 0) {
            const item = {
              id: getStreamIdFromUrl(itemExists[0].url),
              logo: itemExists[0].tvg.logo,
              name: itemExists[0].tvg.name,
              url: itemExists[0].url,
              info: itemExists[0],
            };
            favs.push(item);
          }
        });
        if (currentAction === "movies") {
          setFavouriteMovies(favs);
        } else {
          setFavouriteSeries(favs);
        }
      } else {
        setFavouriteMovies(null);
        setFavouriteSeries(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getRecent = async () => {
  setRecents([]);
  setRecentSeries([]);

  try {
    const response = await getRecents(path, user?.id);
    const res = response.val();

    if (!res) {
      setRecents([]);
      return;
    }

    const ids = Object.keys(res);
    const data = Object.values(res);

    ids.forEach((id, index) => {
      const item = data[index];
      if (item?.episode) {
          const info = currentSelected?.find(
        (movie) => String(concatUrl(movie.url)) === String(id)
      );
        setRecentSeries((prev)=>{
          const updated = prev.filter((item)=> item?.id !== id);
        return [...updated, { id, ...item, info }];
        })
        return;
      }

      const info = currentSelected?.find(
        (movie) => String(concatUrl(movie.url)) === String(id)
      );

      setRecents((prev) => {
        const updated = prev.filter((item) => item.id !== id);
        return [...updated, { id, ...item, info }];
      });
    });
  } catch (error) {
    console.log(error);
  }
};

  const getStreamIdFromUrl = (url) => {
    const regex = /([a-zA-Z0-9]{6})(?=\.(?:mkv|mp4)$)/i;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  const FavsCategory = ({ favMovies, style }) => {
    const handleItem = (isAdult, movie) => {
      const encryptedName = encodeURIComponent(
        AES.encrypt(movie.name, "thisismovie").toString()
      );
      if (parentalPin) {
        if (isAdult) {
          setClickedAdultItem(movie.info);
          setShowParentalLock(true);
        } else {
          setShowParentalLock(false);
          router.push({
            pathname: `/dashboard/preview/${currentAction}/m3u/${encryptedName}`,
            query: {
              id: getStreamIdFromUrl(movie.url),
              stream: AES.encrypt(movie.url, "thisisurl").toString(),
            },
          });
        }
      } else {
        router.push({
          pathname: `/dashboard/preview/${currentAction}/m3u/${encryptedName}`,
          query: {
            id: getStreamIdFromUrl(movie.url),
            stream: AES.encrypt(movie.url, "thisisurl").toString(),
          },
        });
      }
    };
    return (
      favMovies &&
      favMovies.length > 0 && (
        <section style={style} className="category">
          <span style={{ marginTop: 20 }} className="h3">
            Favourites
          </span>
          <Scrollable>
            {favMovies?.map((movie, index) => {
              const added =
                currentAction === "movies" ? movie.added : movie.last_modified;
              const isAdult =
                adultArray.filter((item) =>
                  movie.info.group.title
                    .toLowerCase()
                    .includes(item.toLowerCase())
                ).length > 0;

              return (
                <div
                  key={index}
                  onClick={() => handleItem(isAdult, movie)}
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    width: 165,
                    borderRadius: 5,
                  }}
                  className="item"
                >
                  <div className="caption">
                    <span className="control">
                      {Number(movie.rating).toFixed(1) !== "NaN" &&
                      Number(movie.rating) !== 0 ? (
                        <span className="count">
                          {Number(movie.rating).toFixed(1)}
                        </span>
                      ) : (
                        <span></span>
                      )}
                      <Link href="#">
                        <svg
                          width="30"
                          height="26"
                          viewBox="0 0 30 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <path
                            d="M29.2239 7.73189C29.2239 8.12625 29.2239 8.52061 29.2239 8.91467C29.2091 8.99632 29.1875 9.07738 29.181 9.15933C29.0718 10.5385 28.6337 11.8136 27.9606 13.0141C27.113 14.5265 25.9933 15.827 24.7685 17.0364C21.7994 19.9679 18.5333 22.5639 15.3951 25.3043C15.0229 25.6294 14.5771 25.6093 14.1904 25.2874C13.8659 25.0173 13.5469 24.7404 13.2289 24.4623C10.706 22.2574 8.16057 20.0782 5.67077 17.8369C4.12678 16.4471 2.71503 14.9182 1.69378 13.0851C-0.0217981 10.006 -0.113805 6.88017 1.61036 3.78242C2.56563 2.06565 4.04069 0.913648 5.94354 0.375217C7.9733 -0.19901 9.91905 0.00807828 11.7287 1.14352C12.8804 1.86626 13.7579 2.85732 14.4765 3.99927C14.5827 4.1679 14.6862 4.33801 14.7629 4.46167C15.3081 3.75845 15.7856 3.01796 16.3841 2.39344C18.4931 0.19357 21.056 -0.47858 23.9434 0.472844C26.661 1.36835 28.2366 3.37771 28.9393 6.10329C29.0762 6.63521 29.131 7.18843 29.2239 7.73189Z"
                            fill="#FF0000"
                          />{" "}
                        </svg>
                      </Link>
                    </span>
                    <span className="info">
                      <text>{""}</text>
                      {/* <text>{added && formattedDate(added)}</text> */}
                    </span>
                    <span className="h2">{movie.name}</span>
                  </div>
                  <div className="thumb">
                    {movie.logo ? (
                      <img
                        onError={(e) => (e.target.src = "/placeholder.png")}
                        style={{
                          filter: isAdult && parentalPin && "blur(20px)",
                        }}
                        src={movie.logo}
                      />
                    ) : (
                      <Image
                        alt="placeholder"
                        layout="fill"
                        src={placeholderImage}
                      />
                    )}
                    {isAdult && parentalPin && (
                      <svg
                        style={{
                          zIndex: 99,
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                        }}
                        width="32"
                        height="38"
                        viewBox="0 0 20 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.35342 0.978516C9.71046 0.978516 10.0675 0.978516 10.4246 0.978516C10.6069 1.0108 10.7891 1.04529 10.972 1.07454C13.6371 1.50415 15.8459 3.8255 16.0656 6.51604C16.1583 7.65313 16.1075 8.80208 16.1216 9.94578C16.1229 10.0653 16.1218 10.1847 16.1218 10.3277C16.3536 10.3277 16.5625 10.3274 16.7714 10.3277C18.2385 10.3296 19.2373 11.3213 19.2379 12.7826C19.2392 16.337 19.239 19.8918 19.2379 23.4462C19.2373 24.9108 18.2409 25.908 16.7791 25.9094C15.3184 25.9108 13.8576 25.9097 12.3969 25.9097C9.24001 25.9097 6.08316 25.9124 2.92631 25.9083C1.60326 25.9066 0.549224 24.9067 0.545085 23.6167C0.533772 19.9486 0.535152 16.2805 0.545085 12.6123C0.54812 11.4981 1.37617 10.547 2.47545 10.3743C2.8554 10.3147 3.24694 10.3277 3.65641 10.3061C3.65641 10.2176 3.65641 10.1301 3.65641 10.0429C3.65696 9.06089 3.64813 8.07888 3.65972 7.09714C3.69007 4.49186 5.41763 2.12443 7.89129 1.3179C8.36506 1.16338 8.86531 1.08944 9.35342 0.978516ZM14.04 10.321C14.04 9.49768 14.0469 8.69612 14.0372 7.89484C14.0314 7.42549 14.0414 6.95007 13.9718 6.48817C13.6457 4.31968 11.4524 2.74195 9.29354 3.10037C7.17969 3.45107 5.74929 5.12373 5.73853 7.26407C5.73384 8.20498 5.73743 9.14615 5.73798 10.0871C5.73798 10.1638 5.7446 10.2405 5.74819 10.321C8.51957 10.321 11.2598 10.321 14.04 10.321ZM9.88457 14.4809C8.99416 14.4842 8.19481 15.0664 7.91475 15.9154C7.63634 16.7589 7.92192 17.6764 8.65147 18.2081C8.81095 18.3242 8.86062 18.4412 8.85786 18.628C8.8482 19.293 8.85206 19.958 8.85593 20.623C8.85675 20.7515 8.86282 20.8848 8.89732 21.0073C9.03279 21.4883 9.51318 21.8086 9.9897 21.749C10.5222 21.6822 10.9071 21.2879 10.9174 20.7609C10.9312 20.0557 10.9295 19.3498 10.9187 18.6443C10.9157 18.4478 10.967 18.3253 11.1326 18.2036C11.8607 17.6681 12.1408 16.7523 11.8583 15.908C11.5735 15.0553 10.7742 14.4776 9.88457 14.4809Z"
                          fill="black"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </Scrollable>
        </section>
      )
    );
  };
  const Recents = ({ style }) => {
    const handleItem = (isAdult, movie) => {
      const encryptedName = encodeURIComponent(
        AES.encrypt(movie.info.tvg.name, "thisismovie").toString()
      );

      if (parentalPin) {
        if (isAdult) {
          setClickedAdultItem(movie.info);
          setShowParentalLock(true);
        } else {
          setShowParentalLock(false);
          router.push({
            pathname: `/dashboard/preview/${currentAction}/m3u/${encryptedName}`,
            query: {
              state: "play",
              id: getStreamIdFromUrl(movie.id),
              stream: AES.encrypt(movie.info.url, "thisisurl").toString(),
            },
          });
        }
      } else {
        router.push({
          pathname: `/dashboard/preview/${currentAction}/m3u/${encryptedName}`,
          query: {
            state: "play",
            id: getStreamIdFromUrl(movie.id),
            stream: AES.encrypt(movie.info.url, "thisisurl").toString(),
          },
        });
      }
    };
    return (
     (currentAction === 'movies' ?recents:recentSeries).length > 0 && (
        <section style={style} className="category">
          <span className="h3">Continue Watching</span>
          <Scrollable>
            { (currentAction === 'movies' ?recents:recentSeries)?.map((movie, index) => {
              const { timeline, duration } = movie;
              const watched = (timeline / duration) * 100;
              const added =
                currentAction === "movies"
                  ? movie.info?.added
                  : movie.info?.last_modified;
              const isFavourite =
                currentAction === "movies"
                  ? FavouriteMovies &&
                    FavouriteMovies.filter(
                      (item) =>
                        String(concatUrl(item?.info?.url)) ===
                        String(concatUrl(movie?.info?.url))
                    ).length > 0
                  : favouriteSeries &&
                    favouriteSeries.filter(
                      (item) =>
                        String(concatUrl(item.url)) ===
                        String(concatUrl(movie.id))
                    ).length > 0;
              const isAdult =
                movie?.info &&
                adultArray.filter((item) =>
                  movie.info.group.title
                    .toLowerCase()
                    .includes(item.toLowerCase())
                ).length > 0;
              return (
                <div
                  key={index}
                  style={{
                    position: "relative",
                  }}
                >
                  <div
                    key={index}
                    onClick={() => handleItem(isAdult, movie)}
                    style={{ marginTop: 10, marginBottom: 10, width: 165 }}
                    className="item"
                  >
                    <div className="caption">
                      <span className="control">
                        {Number(movie.info?.rating).toFixed(1) !== "NaN" &&
                        Number(movie.info?.rating) !== 0 ? (
                          <span className="count">
                            {Number(movie.info?.rating).toFixed(1)}
                          </span>
                        ) : (
                          <span></span>
                        )}
                        {isFavourite && (
                          <Link href="#">
                            <svg
                              width="30"
                              height="26"
                              viewBox="0 0 30 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {" "}
                              <path
                                d="M29.2239 7.73189C29.2239 8.12625 29.2239 8.52061 29.2239 8.91467C29.2091 8.99632 29.1875 9.07738 29.181 9.15933C29.0718 10.5385 28.6337 11.8136 27.9606 13.0141C27.113 14.5265 25.9933 15.827 24.7685 17.0364C21.7994 19.9679 18.5333 22.5639 15.3951 25.3043C15.0229 25.6294 14.5771 25.6093 14.1904 25.2874C13.8659 25.0173 13.5469 24.7404 13.2289 24.4623C10.706 22.2574 8.16057 20.0782 5.67077 17.8369C4.12678 16.4471 2.71503 14.9182 1.69378 13.0851C-0.0217981 10.006 -0.113805 6.88017 1.61036 3.78242C2.56563 2.06565 4.04069 0.913648 5.94354 0.375217C7.9733 -0.19901 9.91905 0.00807828 11.7287 1.14352C12.8804 1.86626 13.7579 2.85732 14.4765 3.99927C14.5827 4.1679 14.6862 4.33801 14.7629 4.46167C15.3081 3.75845 15.7856 3.01796 16.3841 2.39344C18.4931 0.19357 21.056 -0.47858 23.9434 0.472844C26.661 1.36835 28.2366 3.37771 28.9393 6.10329C29.0762 6.63521 29.131 7.18843 29.2239 7.73189Z"
                                fill="#FF0000"
                              />{" "}
                            </svg>
                          </Link>
                        )}
                      </span>
                      <span className="info">
                        <text>{""}</text>
                        {/* <text>{added && formattedDate(added)}</text> */}
                      </span>
                      <span className="h2">{movie.info?.name}</span>
                    </div>
                    <Watched progress={watched} />
                    <div className="thumb">
                      {movie.info && movie.info.tvg.logo ? (
                        <img
                          // onLoad={e => e.target.style.opacity = 1}
                          style={{
                            filter: isAdult && parentalPin && "blur(20px)",
                            transition: ".5s",
                          }}
                          onError={(e) => (e.target.src = placeholderImage)}
                          src={movie.info.tvg.logo}
                        />
                      ) : (
                        <Image
                          alt="placeholder"
                          layout="fill"
                          src={placeholderImage}
                        />
                      )}
                      {isAdult && parentalPin && (
                        <svg
                          style={{
                            zIndex: 99,
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                          }}
                          width="32"
                          height="38"
                          viewBox="0 0 20 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.35342 0.978516C9.71046 0.978516 10.0675 0.978516 10.4246 0.978516C10.6069 1.0108 10.7891 1.04529 10.972 1.07454C13.6371 1.50415 15.8459 3.8255 16.0656 6.51604C16.1583 7.65313 16.1075 8.80208 16.1216 9.94578C16.1229 10.0653 16.1218 10.1847 16.1218 10.3277C16.3536 10.3277 16.5625 10.3274 16.7714 10.3277C18.2385 10.3296 19.2373 11.3213 19.2379 12.7826C19.2392 16.337 19.239 19.8918 19.2379 23.4462C19.2373 24.9108 18.2409 25.908 16.7791 25.9094C15.3184 25.9108 13.8576 25.9097 12.3969 25.9097C9.24001 25.9097 6.08316 25.9124 2.92631 25.9083C1.60326 25.9066 0.549224 24.9067 0.545085 23.6167C0.533772 19.9486 0.535152 16.2805 0.545085 12.6123C0.54812 11.4981 1.37617 10.547 2.47545 10.3743C2.8554 10.3147 3.24694 10.3277 3.65641 10.3061C3.65641 10.2176 3.65641 10.1301 3.65641 10.0429C3.65696 9.06089 3.64813 8.07888 3.65972 7.09714C3.69007 4.49186 5.41763 2.12443 7.89129 1.3179C8.36506 1.16338 8.86531 1.08944 9.35342 0.978516ZM14.04 10.321C14.04 9.49768 14.0469 8.69612 14.0372 7.89484C14.0314 7.42549 14.0414 6.95007 13.9718 6.48817C13.6457 4.31968 11.4524 2.74195 9.29354 3.10037C7.17969 3.45107 5.74929 5.12373 5.73853 7.26407C5.73384 8.20498 5.73743 9.14615 5.73798 10.0871C5.73798 10.1638 5.7446 10.2405 5.74819 10.321C8.51957 10.321 11.2598 10.321 14.04 10.321ZM9.88457 14.4809C8.99416 14.4842 8.19481 15.0664 7.91475 15.9154C7.63634 16.7589 7.92192 17.6764 8.65147 18.2081C8.81095 18.3242 8.86062 18.4412 8.85786 18.628C8.8482 19.293 8.85206 19.958 8.85593 20.623C8.85675 20.7515 8.86282 20.8848 8.89732 21.0073C9.03279 21.4883 9.51318 21.8086 9.9897 21.749C10.5222 21.6822 10.9071 21.2879 10.9174 20.7609C10.9312 20.0557 10.9295 19.3498 10.9187 18.6443C10.9157 18.4478 10.967 18.3253 11.1326 18.2036C11.8607 17.6681 12.1408 16.7523 11.8583 15.908C11.5735 15.0553 10.7742 14.4776 9.88457 14.4809Z"
                            fill="black"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </Scrollable>
        </section>
      )
    );
  };
  const MovieCategory = React.useCallback(({ index, style }) => {
    const filtered = movies.filter(
      (movie) => movie.group.title === movieCategories[index - moviesDifference]
    );

    const [errorIndex, setErrorIndex] = useState([]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    useEffect(() => {
      const container = refs.current[index];
      if (!container) return;
      const gridEl = container.querySelector(".ReactVirtualized__Grid") || container.childNodes[0];
      if (!gridEl) return;

      const updateScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = gridEl;
        const totalContentWidth = filtered ? filtered.length * 173 : scrollWidth;
        const maxContainerWidth = clientWidth || (window.innerWidth - 60);
        const isOverflowing = totalContentWidth > maxContainerWidth + 10;

        setCanScrollLeft(isOverflowing && scrollLeft > 5);
        setCanScrollRight(isOverflowing && scrollLeft + maxContainerWidth < totalContentWidth - 10);
      };

      updateScroll();
      gridEl.addEventListener("scroll", updateScroll, { passive: true });
      window.addEventListener("resize", updateScroll, { passive: true });

      return () => {
        gridEl.removeEventListener("scroll", updateScroll);
        window.removeEventListener("resize", updateScroll);
      };
    }, [index, filtered, windowSize]);

    const handleScrollRow = (direction) => {
      const container = refs.current[index];
      if (!container) return;
      const gridEl = container.querySelector(".ReactVirtualized__Grid") || container.childNodes[0] || container;
      if (gridEl) {
        const scrollAmount = 600;
        gridEl.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
        setTimeout(() => {
          const { scrollLeft, scrollWidth, clientWidth } = gridEl;
          const totalContentWidth = filtered ? filtered.length * 173 : scrollWidth;
          const maxContainerWidth = clientWidth || (window.innerWidth - 60);
          const isOverflowing = totalContentWidth > maxContainerWidth + 10;
          setCanScrollLeft(isOverflowing && scrollLeft > 5);
          setCanScrollRight(isOverflowing && scrollLeft + maxContainerWidth < totalContentWidth - 10);
        }, 350);
      }
    };

    const innerElement = (args) => {
      const filteredComp = filtered[args.columnIndex];
      // console.log("filtercomp----",filteredComp)
      const category_name = filteredComp.group.title;
      const { name } = filteredComp;
      const movie_image = filteredComp.tvg.logo;
      // const { category_name, added, name, movie_image } = filteredComp;

      const isFavourite =
        FavouriteMovies &&
        FavouriteMovies.filter(
          (movie) => movie.id === getStreamIdFromUrl(filteredComp.url)
        ).length > 0;
      // const category = movieCategories[index];
      const isAdult =
        adultArray.filter((item) =>
          category_name.toLowerCase().includes(item.toLowerCase())
        ).length > 0;

      const handleItem = () => {
        if (parentalPin) {
          if (isAdult) {
            setClickedAdultItem(filteredComp);
            setShowParentalLock(true);
          } else {
            setShowParentalLock(false);
            router.push({
              pathname: `/dashboard/preview/movies/m3u/${filteredComp.name}`,
              query: {
                stream: AES.encrypt(filteredComp.url, "thisisurl").toString(),
                logo: AES.encrypt(movie_image, "thisisname").toString(),
                title: AES.encrypt(
                  filteredComp.group.title,
                  "thisisname"
                ).toString(),
              },
            });
          }
        } else {
          router.push({
            pathname: `/dashboard/preview/movies/m3u/${filteredComp.name}`,
            query: {
              stream: AES.encrypt(filteredComp.url, "thisisurl").toString(),
              logo: AES.encrypt(movie_image, "thisisname").toString(),
              title: AES.encrypt(
                filteredComp.group.title,
                "thisisname"
              ).toString(),
            },
          });
        }
      };

      return (
        <div style={{ ...args.style, padding: 5, paddingTop: 6 }}>
          <div
            onClick={handleItem}
            onMouseEnter={(e) => handleCardMouseEnter(e, filteredComp)}
            onMouseLeave={handleCardMouseLeave}
            key={args.key}
            className="item"
          >
            <div className="caption">
              <span className="control">
                {Number(filteredComp.rating).toFixed(1) !== "NaN" &&
                Number(filteredComp.rating) !== 0 ? (
                  <span className="count">
                    {Number(filteredComp.rating).toFixed(1)}
                  </span>
                ) : (
                  <span></span>
                )}
                {isFavourite && (
                  <Link href="#">
                    <svg
                      width="30"
                      height="26"
                      viewBox="0 0 30 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M29.2239 7.73189C29.2239 8.12625 29.2239 8.52061 29.2239 8.91467C29.2091 8.99632 29.1875 9.07738 29.181 9.15933C29.0718 10.5385 28.6337 11.8136 27.9606 13.0141C27.113 14.5265 25.9933 15.827 24.7685 17.0364C21.7994 19.9679 18.5333 22.5639 15.3951 25.3043C15.0229 25.6294 14.5771 25.6093 14.1904 25.2874C13.8659 25.0173 13.5469 24.7404 13.2289 24.4623C10.706 22.2574 8.16057 20.0782 5.67077 17.8369C4.12678 16.4471 2.71503 14.9182 1.69378 13.0851C-0.0217981 10.006 -0.113805 6.88017 1.61036 3.78242C2.56563 2.06565 4.04069 0.913648 5.94354 0.375217C7.9733 -0.19901 9.91905 0.00807828 11.7287 1.14352C12.8804 1.86626 13.7579 2.85732 14.4765 3.99927C14.5827 4.1679 14.6862 4.33801 14.7629 4.46167C15.3081 3.75845 15.7856 3.01796 16.3841 2.39344C18.4931 0.19357 21.056 -0.47858 23.9434 0.472844C26.661 1.36835 28.2366 3.37771 28.9393 6.10329C29.0762 6.63521 29.131 7.18843 29.2239 7.73189Z"
                        fill="#FF0000"
                      />{" "}
                    </svg>
                  </Link>
                )}
              </span>
              <span className="info">
                <text>{category_name}</text>
                {/* <text>{added && formattedDate(added)}</text> */}
              </span>
              <span className="h2">{name}</span>
            </div>
            <div className="thumb">
              {errorIndex.includes(args.columnIndex) ? (
                <Image alt="placeholder" src={placeholderImage} />
              ) : movie_image ? (
                <img
                  style={{
                    filter: isAdult && parentalPin && "blur(20px)",
                  }}
                  onError={() =>
                    setErrorIndex((prev) => [...prev, args.columnIndex])
                  }
                  src={movie_image}
                  ref={(element) => (listImagesRef.current[index] = element)}
                />
              ) : (
                <Image
                  alt="placeholder"
                  src={placeholderImage}
                  ref={(element) => (listImagesRef.current[index] = element)}
                />
              )}
              {isAdult && parentalPin && (
                <svg
                  style={{
                    zIndex: 99,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                  width="32"
                  height="38"
                  viewBox="0 0 20 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.35342 0.978516C9.71046 0.978516 10.0675 0.978516 10.4246 0.978516C10.6069 1.0108 10.7891 1.04529 10.972 1.07454C13.6371 1.50415 15.8459 3.8255 16.0656 6.51604C16.1583 7.65313 16.1075 8.80208 16.1216 9.94578C16.1229 10.0653 16.1218 10.1847 16.1218 10.3277C16.3536 10.3277 16.5625 10.3274 16.7714 10.3277C18.2385 10.3296 19.2373 11.3213 19.2379 12.7826C19.2392 16.337 19.239 19.8918 19.2379 23.4462C19.2373 24.9108 18.2409 25.908 16.7791 25.9094C15.3184 25.9108 13.8576 25.9097 12.3969 25.9097C9.24001 25.9097 6.08316 25.9124 2.92631 25.9083C1.60326 25.9066 0.549224 24.9067 0.545085 23.6167C0.533772 19.9486 0.535152 16.2805 0.545085 12.6123C0.54812 11.4981 1.37617 10.547 2.47545 10.3743C2.8554 10.3147 3.24694 10.3277 3.65641 10.3061C3.65641 10.2176 3.65641 10.1301 3.65641 10.0429C3.65696 9.06089 3.64813 8.07888 3.65972 7.09714C3.69007 4.49186 5.41763 2.12443 7.89129 1.3179C8.36506 1.16338 8.86531 1.08944 9.35342 0.978516ZM14.04 10.321C14.04 9.49768 14.0469 8.69612 14.0372 7.89484C14.0314 7.42549 14.0414 6.95007 13.9718 6.48817C13.6457 4.31968 11.4524 2.74195 9.29354 3.10037C7.17969 3.45107 5.74929 5.12373 5.73853 7.26407C5.73384 8.20498 5.73743 9.14615 5.73798 10.0871C5.73798 10.1638 5.7446 10.2405 5.74819 10.321C8.51957 10.321 11.2598 10.321 14.04 10.321ZM9.88457 14.4809C8.99416 14.4842 8.19481 15.0664 7.91475 15.9154C7.63634 16.7589 7.92192 17.6764 8.65147 18.2081C8.81095 18.3242 8.86062 18.4412 8.85786 18.628C8.8482 19.293 8.85206 19.958 8.85593 20.623C8.85675 20.7515 8.86282 20.8848 8.89732 21.0073C9.03279 21.4883 9.51318 21.8086 9.9897 21.749C10.5222 21.6822 10.9071 21.2879 10.9174 20.7609C10.9312 20.0557 10.9295 19.3498 10.9187 18.6443C10.9157 18.4478 10.967 18.3253 11.1326 18.2036C11.8607 17.6681 12.1408 16.7523 11.8583 15.908C11.5735 15.0553 10.7742 14.4776 9.88457 14.4809Z"
                    fill="black"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      );
    };

    const handleTouchMove = (e, ref) => {
      if (!mouseDown || startX === undefined || scrollLeft === undefined || !ref?.childNodes?.[0]) return;
      e.preventDefault();

      if (ref?.childNodes?.[0]?.childNodes?.[0]?.childNodes) {
        const nodes = ref.childNodes[0].childNodes[0].childNodes;
        nodes.forEach((el) => {
          el.style.pointerEvents = "none";
        });
      }
      const x = e.touches[0].clientX - ref.childNodes[0].offsetLeft;
      const scroll = x - startX;
      ref.childNodes[0].scrollLeft = scrollLeft - scroll;
    };

    const handleTouchStart = (e, ref) => {
      if (!ref?.childNodes?.[0]) return;
      mouseDown = true;
      startX = e.touches[0].clientX - ref.childNodes[0].offsetLeft;
      scrollLeft = ref.childNodes[0].scrollLeft;
    };

    const stopDragging = function (e, ref) {
      mouseDown = false;
      if (ref?.childNodes?.[0]?.childNodes?.[0]?.childNodes) {
        const nodes = ref.childNodes[0].childNodes[0].childNodes;
        nodes.forEach((el) => {
          el.style.pointerEvents = "auto";
        });
      }
    };

    const handleListDown = (e, ref) => {
      if (!ref?.childNodes?.[0]) return;
      mouseDown = true;
      startX = e.pageX - ref.childNodes[0].offsetLeft;
      scrollLeft = ref.childNodes[0].scrollLeft;
    };

    const handlelistMove = (e, ref) => {
      if (!mouseDown || startX === undefined || scrollLeft === undefined || !ref?.childNodes?.[0]) return;
      e.preventDefault();

      if (ref?.childNodes?.[0]?.childNodes?.[0]?.childNodes) {
        const nodes = ref.childNodes[0].childNodes[0].childNodes;
        nodes.forEach((el) => {
          el.style.pointerEvents = "none";
        });
      }
      const x = e.pageX - ref.childNodes[0].offsetLeft;
      const scroll = x - startX;
      ref.childNodes[0].scrollLeft = scrollLeft - scroll;
    };

    return (
      filtered.length > 0 && (
        <section key={index} style={style} className="category listSlider">
          <span className="h3">
            {movieCategories[index - moviesDifference]}
          </span>
          <div className="list">
            {canScrollLeft && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleScrollRow("left");
                }}
                className="row-scroll-arrow left"
                title="Scroll Left"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
            {canScrollRight && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleScrollRow("right");
                }}
                className="row-scroll-arrow right"
                title="Scroll Right"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
            <div
              style={{
                paddingLeft: 10,
              }}
              className="owl-carousel owl-theme"
              onMouseDown={(e) =>
                handleListDown(e, refs.current[Number(index)])
              }
              onMouseUp={(e) => stopDragging(e, refs.current[Number(index)])}
              onMouseLeave={(e) => stopDragging(e, refs.current[Number(index)])}
              onTouchEnd={(e) => stopDragging(e, refs.current[Number(index)])}
              onTouchStart={(e) =>
                handleTouchStart(e, refs.current[Number(index)])
              }
              onTouchMove={(e) =>
                handleTouchMove(e, refs.current[Number(index)])
              }
              onMouseMove={(e) =>
                handlelistMove(e, refs.current[Number(index)])
              }
              ref={(element) => (refs.current[index] = element)}
            >
              <Grid
                height={315}
                cellRenderer={innerElement}
                columnCount={filtered ? filtered.length : 0}
                rowHeight={295}
                style={{
                  overflowY: "hidden",
                  overflowX: "hidden",
                  paddingTop: 15,
                  paddingLeft: 5,
                }}
                rowCount={1}
                columnWidth={212}
                width={windowSize.width - window.innerWidth / 20}
              />
            </div>
          </div>
        </section>
      )
    );
  }, [movies, movieCategories, FavouriteMovies, parentalPin, windowSize]);
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filter = M3uData?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filter?.length === 0) {
      setNodata(true);
    } else {
      setNodata(false);
      setFilteredData(filter);
    }
  };
  const SeriesCategory = React.useCallback(({ index, style }) => {
    const filtered = series.filter(
      (series) =>
        series.group.title === seriesCategories[index - seriesDifference]
    );

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    useEffect(() => {
      const container = refs.current[index];
      if (!container) return;
      const gridEl = container.querySelector(".ReactVirtualized__Grid") || container.childNodes[0];
      if (!gridEl) return;

      const updateScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = gridEl;
        const totalContentWidth = filtered ? filtered.length * 173 : scrollWidth;
        const maxContainerWidth = clientWidth || (window.innerWidth - 60);
        const isOverflowing = totalContentWidth > maxContainerWidth + 10;

        setCanScrollLeft(isOverflowing && scrollLeft > 5);
        setCanScrollRight(isOverflowing && scrollLeft + maxContainerWidth < totalContentWidth - 10);
      };

      updateScroll();
      gridEl.addEventListener("scroll", updateScroll, { passive: true });
      window.addEventListener("resize", updateScroll, { passive: true });

      return () => {
        gridEl.removeEventListener("scroll", updateScroll);
        window.removeEventListener("resize", updateScroll);
      };
    }, [index, filtered, windowSize]);

    const handleScrollRow = (direction) => {
      const container = refs.current[index];
      if (!container) return;
      const gridEl = container.querySelector(".ReactVirtualized__Grid") || container.childNodes[0] || container;
      if (gridEl) {
        const scrollAmount = 600;
        gridEl.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
        setTimeout(() => {
          const { scrollLeft, scrollWidth, clientWidth } = gridEl;
          const totalContentWidth = filtered ? filtered.length * 173 : scrollWidth;
          const maxContainerWidth = clientWidth || (window.innerWidth - 60);
          const isOverflowing = totalContentWidth > maxContainerWidth + 10;
          setCanScrollLeft(isOverflowing && scrollLeft > 5);
          setCanScrollRight(isOverflowing && scrollLeft + maxContainerWidth < totalContentWidth - 10);
        }, 350);
      }
    };
    const adultArray = [
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
    const innerElement = (args) => {
      const filteredComp = filtered[args.columnIndex];
      const category_name = filteredComp.group.title;
      const { name } = filteredComp;
      const movie_image = filteredComp.tvg.logo;
      // const { category_name, added, name, movie_image } = filteredComp;
      const isFavourite =
        favouriteSeries &&
        favouriteSeries.filter(
          (movie) => movie.id === getStreamIdFromUrl(filteredComp.url)
        ).length > 0;
      // const category = movieCategories[index];
      const isAdult =
        adultArray.filter((item) =>
          category_name.toLowerCase().includes(item.toLowerCase())
        ).length > 0;
      const handleItem = () => {
        scrolled.toggle(0, 0, 0);
        const encryptedName = encodeURIComponent(
          AES.encrypt(filteredComp.name, "thisismovie").toString()
        );
        if (parentalPin) {
          if (isAdult) {
            setClickedAdultItem(filteredComp);
            setShowParentalLock(true);
          } else {
            setShowParentalLock(false);
            router.push({
              pathname: `/dashboard/preview/${currentAction}/m3u/${encryptedName}`,
              query: {
                id: getStreamIdFromUrl(filteredComp.url),
                stream: AES.encrypt(filteredComp.url, "thisisurl").toString(),
                name: filteredComp.url,
              },
            });
          }
        } else {
          router.push({
            pathname: `/dashboard/preview/${currentAction}/m3u/${encryptedName}`,
            query: {
              id: getStreamIdFromUrl(filteredComp.url),
              stream: AES.encrypt(filteredComp.url, "thisisurl").toString(),
              name: filteredComp.url,
            },
          });
        }
      };

      return (
        <div style={{ ...args.style, padding: 5, paddingTop: 6 }}>
          <div onClick={handleItem} key={args.key} className="item">
            <div className="caption">
              <span className="control">
                {Number(filteredComp.rating).toFixed(1) !== "NaN" &&
                Number(filteredComp.rating) !== 0 ? (
                  <span className="count">
                    {Number(filteredComp.rating).toFixed(1)}
                  </span>
                ) : (
                  <span></span>
                )}
                {isFavourite && (
                  <Link href="'#">
                    <svg
                      width="30"
                      height="26"
                      viewBox="0 0 30 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M29.2239 7.73189C29.2239 8.12625 29.2239 8.52061 29.2239 8.91467C29.2091 8.99632 29.1875 9.07738 29.181 9.15933C29.0718 10.5385 28.6337 11.8136 27.9606 13.0141C27.113 14.5265 25.9933 15.827 24.7685 17.0364C21.7994 19.9679 18.5333 22.5639 15.3951 25.3043C15.0229 25.6294 14.5771 25.6093 14.1904 25.2874C13.8659 25.0173 13.5469 24.7404 13.2289 24.4623C10.706 22.2574 8.16057 20.0782 5.67077 17.8369C4.12678 16.4471 2.71503 14.9182 1.69378 13.0851C-0.0217981 10.006 -0.113805 6.88017 1.61036 3.78242C2.56563 2.06565 4.04069 0.913648 5.94354 0.375217C7.9733 -0.19901 9.91905 0.00807828 11.7287 1.14352C12.8804 1.86626 13.7579 2.85732 14.4765 3.99927C14.5827 4.1679 14.6862 4.33801 14.7629 4.46167C15.3081 3.75845 15.7856 3.01796 16.3841 2.39344C18.4931 0.19357 21.056 -0.47858 23.9434 0.472844C26.661 1.36835 28.2366 3.37771 28.9393 6.10329C29.0762 6.63521 29.131 7.18843 29.2239 7.73189Z"
                        fill="#FF0000"
                      />{" "}
                    </svg>
                  </Link>
                )}
              </span>
              <span className="info">
                <text>{category_name}</text>
                <text></text>
              </span>
              <span className="h2">{name}</span>
            </div>
            <div className="thumb">
              <img
                onLoad={(e) => (e.target.style.opacity = 1)}
                style={{
                  opacity: 0,
                  transition: ".5s",
                }}
                onError={(e) => {
                  e.target.src = "/placeholder.png";
                  (e) => (e.target.style.opacity = 1);
                }}
                src={movie_image ? movie_image : "/placeholder.png"}
                ref={(element) => (listImagesRef.current[index] = element)}
                
              />
              {isAdult && parentalPin && (
                <svg
                  style={{
                    zIndex: 99,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                  width="32"
                  height="38"
                  viewBox="0 0 20 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.35342 0.978516C9.71046 0.978516 10.0675 0.978516 10.4246 0.978516C10.6069 1.0108 10.7891 1.04529 10.972 1.07454C13.6371 1.50415 15.8459 3.8255 16.0656 6.51604C16.1583 7.65313 16.1075 8.80208 16.1216 9.94578C16.1229 10.0653 16.1218 10.1847 16.1218 10.3277C16.3536 10.3277 16.5625 10.3274 16.7714 10.3277C18.2385 10.3296 19.2373 11.3213 19.2379 12.7826C19.2392 16.337 19.239 19.8918 19.2379 23.4462C19.2373 24.9108 18.2409 25.908 16.7791 25.9094C15.3184 25.9108 13.8576 25.9097 12.3969 25.9097C9.24001 25.9097 6.08316 25.9124 2.92631 25.9083C1.60326 25.9066 0.549224 24.9067 0.545085 23.6167C0.533772 19.9486 0.535152 16.2805 0.545085 12.6123C0.54812 11.4981 1.37617 10.547 2.47545 10.3743C2.8554 10.3147 3.24694 10.3277 3.65641 10.3061C3.65641 10.2176 3.65641 10.1301 3.65641 10.0429C3.65696 9.06089 3.64813 8.07888 3.65972 7.09714C3.69007 4.49186 5.41763 2.12443 7.89129 1.3179C8.36506 1.16338 8.86531 1.08944 9.35342 0.978516ZM14.04 10.321C14.04 9.49768 14.0469 8.69612 14.0372 7.89484C14.0314 7.42549 14.0414 6.95007 13.9718 6.48817C13.6457 4.31968 11.4524 2.74195 9.29354 3.10037C7.17969 3.45107 5.74929 5.12373 5.73853 7.26407C5.73384 8.20498 5.73743 9.14615 5.73798 10.0871C5.73798 10.1638 5.7446 10.2405 5.74819 10.321C8.51957 10.321 11.2598 10.321 14.04 10.321ZM9.88457 14.4809C8.99416 14.4842 8.19481 15.0664 7.91475 15.9154C7.63634 16.7589 7.92192 17.6764 8.65147 18.2081C8.81095 18.3242 8.86062 18.4412 8.85786 18.628C8.8482 19.293 8.85206 19.958 8.85593 20.623C8.85675 20.7515 8.86282 20.8848 8.89732 21.0073C9.03279 21.4883 9.51318 21.8086 9.9897 21.749C10.5222 21.6822 10.9071 21.2879 10.9174 20.7609C10.9312 20.0557 10.9295 19.3498 10.9187 18.6443C10.9157 18.4478 10.967 18.3253 11.1326 18.2036C11.8607 17.6681 12.1408 16.7523 11.8583 15.908C11.5735 15.0553 10.7742 14.4776 9.88457 14.4809Z"
                    fill="black"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      );
    };

    const handleTouchMove = (e, ref) => {
      if (!ref?.childNodes?.[0]) return;
      e.preventDefault();

      if (mouseDown) {
        const nodes = ref.childNodes[0].childNodes[0].childNodes;
        nodes.forEach((el) => {
          el.style.pointerEvents = "none";
        });
        const x = e.touches[0].clientX - ref.childNodes[0].offsetLeft;
        const scroll = x - startX;
        ref.childNodes[0].scrollLeft = scrollLeft - scroll;
      }
    };

    const handleTouchStart = (e, ref) => {
      if (!ref?.childNodes?.[0]) return;
      mouseDown = true;
      startX = e.touches[0].clientX - ref.childNodes[0].offsetLeft;
      scrollLeft = ref.childNodes[0].scrollLeft;
    };

    const stopDragging = function (e, ref) {
      mouseDown = false;
      if (ref?.childNodes?.[0]?.childNodes?.[0]?.childNodes) {
        const nodes = ref.childNodes[0].childNodes[0].childNodes;
        nodes.forEach((el) => {
          el.style.pointerEvents = "auto";
        });
      }
    };

    const handleListDown = (e, ref) => {
      if (!ref?.childNodes?.[0]) return;
      mouseDown = true;
      startX = e.pageX - ref.childNodes[0].offsetLeft;
      scrollLeft = ref.childNodes[0].scrollLeft;
    };

    const handlelistMove = (e, ref) => {
      if (!ref?.childNodes?.[0]) return;
      e.preventDefault();

      if (mouseDown) {
        const nodes = ref.childNodes[0].childNodes[0].childNodes;
        nodes.forEach((el) => {
          el.style.pointerEvents = "none";
        });
        const x = e.pageX - ref.childNodes[0].offsetLeft;
        const scroll = x - startX;
        ref.childNodes[0].scrollLeft = scrollLeft - scroll;
      }
    };

    return (
      filtered.length > 0 && (
        <section key={index} style={style} className="category listSlider">
          <span className="h3">
            {seriesCategories[index - seriesDifference]}
          </span>
          <div className="list">
            {canScrollLeft && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleScrollRow("left");
                }}
                className="row-scroll-arrow left"
                title="Scroll Left"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
            {canScrollRight && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleScrollRow("right");
                }}
                className="row-scroll-arrow right"
                title="Scroll Right"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
            <div
              style={{
                paddingLeft: 10,
              }}
              className="owl-carousel owl-theme"
              onMouseDown={(e) =>
                handleListDown(e, refs.current[Number(index)])
              }
              onMouseUp={(e) => stopDragging(e, refs.current[Number(index)])}
              onMouseLeave={(e) => stopDragging(e, refs.current[Number(index)])}
              onTouchEnd={(e) => stopDragging(e, refs.current[Number(index)])}
              onTouchStart={(e) =>
                handleTouchStart(e, refs.current[Number(index)])
              }
              onTouchMove={(e) =>
                handleTouchMove(e, refs.current[Number(index)])
              }
              onMouseMove={(e) =>
                handlelistMove(e, refs.current[Number(index)])
              }
              ref={(element) => (refs.current[index] = element)}
            >
              <Grid
                height={315}
                cellRenderer={innerElement}
                columnCount={filtered ? filtered.length : 0}
                rowHeight={295}
                style={{
                  overflowY: "hidden",
                  overflowX: "hidden",
                  paddingTop: 15,
                  paddingLeft: 5,
                }}
                rowCount={1}
                columnWidth={212}
                width={windowSize.width - window.innerWidth / 20}
              />
            </div>
          </div>
        </section>
      )
    );
  }, [series, seriesCategories, favouriteSeries, parentalPin, windowSize]);
  const renderMovie = ({ index, key, style }) => {
    let offset = 0;
    if (FavouriteMovies?.length > 0) {
      if (index === offset) {
        return (
          <FavsCategory key={key} style={style} favMovies={FavouriteMovies} />
        );
      }
      offset++;
    }

    // Recents
    if (recents?.length > 0) {
      if (index === offset) {
        return <Recents key={key} style={style} recents={recents} />;
      }
      offset++;
    }


    // Movies (shifted by how many special categories we added)
    return <MovieCategory key={key} style={style} index={index - offset} />;
  };
  
  const renderSeries = ({ index, key, style }) => {
    let offset = 0;
    if (favouriteSeries?.length > 0) {
      if (index === offset) {
        return (
          <FavsCategory key={key} style={style} favMovies={favouriteSeries} />
        );
      }
      offset++;
    }
    

    if (recentSeries?.length > 0) {
      if (index === offset) {
        return <Recents key={key} style={style} recents={recentSeries} />;
      }
      offset++;
    }
     
    return <SeriesCategory key={key} style={style} index={index - offset} />;
  };
 
  const removeItemFromRecents = async () => {
    try {
      await removeMovieFromRecents(
        currentRecentItem.id,
        currentAction === "movies" ? "Movie" : "Series",
        user?.id,
        currentAction === "series" ? "remove" : null
      );
      getRecent();
    } catch (error) {
      console.log("ERROR", error);
    }
    setCurrentRecentItem(null);
  };
  const COLUMN_COUNT = 2;
  let gridHeight;
  const urlHandler = (url) => {
    setUrl(url);
  };
  const VirtualizedGrid = ({ data, onItemClick }) => {
    const gutter = 10;
    const wrapperWidth = windowSize.width * 0.8;
    const itemWidth = (wrapperWidth - (columnCount - 1) * gutter) / columnCount;
    const rowCount = Math.ceil(data?.length / COLUMN_COUNT);
    const rowHeight = 80;
    const wrapperHeight = Math.min(
      windowSize.height * 0.7,
      rowCount * rowHeight
    );
    gridHeight = rowCount * rowHeight;
    const cellRenderer = ({ columnIndex, rowIndex, key, style }) => {
      const index = rowIndex * COLUMN_COUNT + columnIndex;
      if (index >= data?.length) return null;

      const item = data[index];

      return (
        <>
          <div
            key={key}
            style={{
              ...style,
              left: style.left + columnIndex * gutter, // Add spacing between columns
              width: style.width,
              padding: "5px",
            }}
          >
            <div
              style={{ color: theme?.current === "dark" ? "white" : "black" }}
              className="main-wrapper"
              onClick={() => onItemClick(item?.url)}
            >
              {" "}
              <span style={{ marginRight: "4px" }}>{index + 1}.</span>
              {item?.name}
            </div>
          </div>
        </>
      );
    };

    return (
      <div
        style={{
          width: wrapperWidth,
          height: wrapperHeight,
          overflow: "hidden",
          backgroundColor: "transparent",
        }}
      >
        <Grid
          ref={gridRef}
          columnCount={columnCount}
          columnWidth={itemWidth}
          height={wrapperHeight}
          rowCount={rowCount}
          rowHeight={70}
          width={wrapperWidth}
          cellRenderer={cellRenderer}
          style={{
            outline: "none",
          }}
          className="grid-wrapper"
          // Add padding between columns by adjusting left offset
          cellMargin={"5%"}
        />
      </div>
    );
  };
  const uniqueByName = (arr) => {
    const seen = new Set();
    return arr.filter((item) => {
      if (seen.has(item.name)) {
        return false;
      }
      seen.add(item.name);
      return true;
    });
  };
  const getDbData = async () => {
    setLoading(true);
    setM3uLoading(true);
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setIsFormatted(Object.values(user)[0].formatted);
    if (Object.values(user)[0].formatted) {
      const data = await getFileByName(Object.keys(user)[0]);
      const parsedData = parse(data);
      let movies = parsedData.items.filter((item) =>
        item.url.includes("/movie/")
      );
      let series = parsedData.items.filter((item) =>
        item.url.includes("/series/")
      );
      let live = parsedData.items.filter(
        (item) =>
          !item.url.includes("/movie/") && !item.url.includes("/series/")
      );
      // Deduplicate by name/title
      movies = uniqueByName(movies);
      series = uniqueByName(series);
      live = uniqueByName(live);
      m3uStreams.toggle(movies, series, live);
    } else {
      const data = await getFileByName(Object.keys(user)[0]);
      setM3uData(data);
      setLoading(false);
    }
    setLoading(false);
    setM3uLoading(false);
  };
  function extractBaseNameRegex(url) {
    const m = url.match(/\/([^\/?#]+?)(?:\.[a-z0-9]+)?(?:[?#].*)?$/i);
    return m ? m[1].replace(/\.[^/.]+$/, "") : "";
  }
  if (currentRecentItem?.info?.url) {
    currentSelectedId = extractBaseNameRegex(currentRecentItem?.info?.url);
  }
  
  useEffect(() => {
  if (!isPlayerOPen) {
    getRecent();
  }
}, [isPlayerOPen]);


  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  
  useEffect(() => {
    if (m3uStreams?.streams?.movies?.length === undefined) {
      getDbData();
    } else {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      setIsFormatted(Object.values(user)[0].formatted);
      m3uStreams.toggle(
        m3uStreams?.streams?.movies,
        m3uStreams?.streams?.series,
        m3uStreams?.streams?.live
      );
    }
  }, [user?.id, isFormatted, m3uStreams?.streams?.movies?.length]);


  useEffect(() => {
  if (!M3uData || !M3uData.length) {
    getDbData();
  }
}, [M3uData]);

  useEffect(() => {
    if (user?.id && currentSelected) {
      getFavs();
      getRecent();
    }
  }, [user?.id, currentAction, currentSelected]);

  useEffect(() => {
    if (movies || series || live) {
      const isCategory =
        movies.filter((mov) => mov.group.title && mov.group.title.length > 0)
          .length > 0;
      const uniqueGroupTitles = [
        ...new Set(
          movies
            .map((val) => val.group?.title)
            .filter((title) => title && title.trim())
        ),
      ];

      if (isCategory) {
        setMovieCategories(uniqueGroupTitles);
      } else {
        setMovieCategories(["UnCategorized"]);
      }

      series.map((mov) =>
        setSeriesCategories((prev) => {
          const exist =
            prev.filter((ctg) => ctg === mov.group.title).length > 0;
          const category = mov.group.title && mov.group.title.length > 0;
          return category && !exist ? [...prev, mov.group.title] : prev;
        })
      );
      live.map((mov) =>
        setLiveCategories((prev) => {
          const exist =
            prev.filter((ctg) => ctg === mov.group.title).length > 0;
          const category = mov.group.title && mov.group.title.length > 0;

          return category && !exist ? [...prev, mov.group.title] : prev;
        })
      );
    }
  }, [movies,series]);

  useEffect(() => {
    if (!m3u) {
      getM3uStreams();
    }
  }, [m3uUrl.url]);
  useEffect(() => {
    if (m3u?.data) {
      setM3uData(m3u?.data);
      setLoading(false);
    }
  }, [m3u]);
  return (
    <div>
      {currentRecentItem && (
        <div
          style={{
            opacity: currentRecentItem ? 1 : 0,
          }}
          className="continue-watching-container-modal"
        >
          <div className="continue-watching-container">
            <p className="title">{currentRecentItem?.info?.name}</p>
            <Cancel
              onClick={() => setCurrentRecentItem(null)}
              sx={{
                color: "white",
                fontSize: 23,
                position: "absolute",
                top: 10,
                right: 10,
                cursor: "pointer",
              }}
            />
            <div className="cw-btns-container">
              <button
                onClick={async () => {
        scrolled.toggle(0, 0, 0);

                  setCurrentRecentItem(null);
                  const isFavourite =
                    (currentAction === "movies"
                      ? FavouriteMovies
                      : favouriteSeries
                    )?.filter(
                      (item) => String(item.id) === String(currentSelectedId)
                    ).length > 0;
                  try {
                    if (isFavourite) {
                      await removeFromFavs(
                        currentRecentItem.id
                          ? currentRecentItem.id
                          : currentSelectedId,
                        currentAction === "movies" ? "Movie" : "Series",
                        user?.id
                      );
                      alert.toggle({
                        show: true,
                        title: "Removed from Favourites",
                        type: "success",
                      });
                      getFavs();
                    } else {
                      await addToFavs(
                        currentRecentItem.id
                          ? currentRecentItem.id
                          : currentSelectedId,
                        currentAction === "movies" ? "Movie" : "Series",
                        user?.id
                      );
                      alert.toggle({
                        show: true,
                        title: "Added to Favourites",
                        type: "success",
                      });
                    }
                    getFavs();
                  } catch (error) {
                    console.log("ERROR", error);
                    getFavs();

                  }
                }}
              >
                {" "}
                {currentAction === "movies"
                  ? FavouriteMovies &&
                    FavouriteMovies?.filter(
                      (item) => item?.info?.url === currentRecentItem?.info?.url
                    ).length > 0
                    ? "Remove from Favourites"
                    : "Add to Favourites"
                  : favouriteSeries &&
                    favouriteSeries?.filter(
                      (item) => item?.info?.url === currentRecentItem?.info?.url
                    ).length > 0
                  ? "Remove from Favourites"
                  : "Add to Favourites"}
              </button>
              <button onClick={removeItemFromRecents}>Remove from Row</button>
            </div>
          </div>
        </div>
      )}
      <ParentalLock
        action={"verify"}
        open={showParentalLock}
        close={() => setShowParentalLock(false)}
        completed={() => {
          parentalVerified.toggle(true);
          const encryptedName = encodeURIComponent(
            AES.encrypt(clickedAdultItem.name, "thisismovie").toString()
          );

          router.push({
            pathname: `/dashboard/preview/${currentAction}/m3u/${encryptedName}`,
            query: {
              id: getStreamIdFromUrl(clickedAdultItem.url),
              stream: AES.encrypt(clickedAdultItem.url, "thisisurl").toString(),
            },
          });
        }}
      />
      {loading || m3uLoading ? (
        <Loading />
      ) : isFormatted ? (
        (currentSelected && currentSelected.length === 0) ||
        (currentAction === "movies" && movieCategories.length === 0) ||
        (currentAction === "series" && seriesCategories.length === 0) ? (
          <div className="no-data-found-container">
            <Image src={noContentFound} />
            <h2 className="no-data-found">No {currentAction} found</h2>
          </div>
        ) : (
          <>
            {view === "movies" && movies && movies.length > 0 ? (
              <List
                width={windowSize.width - 10}
                className="categores-render-list"
                scrollToIndex={scrolled.m}
                height={windowSize.height}
                rowHeight={350}
                rowRenderer={renderMovie}
                rowCount={
                  movieCategories?.length +
                  (FavouriteMovies && FavouriteMovies.length > 0 ? 1 : 0) +
                  (recents && recents.length > 0 ? 1 : 0)
                }
                overscanRowCount={3}
              />
            ) : (
              view === "series" &&
              series &&
              series.length > 0 && (
                <List
                  width={windowSize.width - 10}
                  scrollToIndex={scrolled.s}
                  className="categores-render-list"
                  height={windowSize.height}
                  rowHeight={350}
                  rowRenderer={renderSeries}
                  rowCount={
                    seriesCategories?.length +
                    (favouriteSeries && favouriteSeries.length > 0 ? 1 : 0) +
                    (recents && recents.length > 0 ? 1 : 0)
                  }
                  overscanRowCount={3}
                />
              )
            )}
          </>
        )
      ) : (
        <>
          {M3uData?.length > 0 && !isFormatted && (
            <div className="input-wrapper-div">
              <input
                type="text"
                placeholder="Search by Title"
                value={searchTerm}
                onChange={(e) => searchHandler(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <CloseIcon className="input-close" onClick={clearHandler} />
              )}
            </div>
          )}
          <div
            style={{
              margin: "auto",
              width: "80vw",
            }}
          >
            {M3uData?.length > 0 && !noData && (
              <VirtualizedGrid
                data={filteredData?.length > 0 ? filteredData : M3uData}
                onItemClick={(url) => {
                  urlHandler(url);
                  m3u.toggle(true);
                  isPlayerOpen.toggle(true);
                  setIsPlayerOpen(true);
                }}
              />
            )}
            {noData && (
              <div className="no-data-found-container">
                <img alt="placeholder" src={noContentFound.src} />
                <h2 className="no-data-found">
                  No data found related to search
                </h2>
              </div>
            )}
          </div>
        </>
      )}
      {isPlayerOPen ? (
        currentPlayer.player === "videojs" ? (
          <VideoJsPlayer
            type={currentAction}
            // timeline={"00.00"}
            id={1}
            close={() => {
              setIsPlayerOpen(false);
              isPlayerOpen.toggle(false);
            }}
            src={url}
            loginType={"player-api"}
            info={{ movie_data: { stream_id: 1 } }}
            fav={true}
          />
        ) : (
          <Player
            type={currentAction}
            timeline={"00.00"}
            id={1}
            close={() => {
              setIsPlayerOpen(false);
              isPlayerOpen.toggle(false);
            }}
            src={url}
            loginType={"player-api"}
            info={{ movie_data: { stream_id: 1 } }}
            fav={true}
          />
        )
      ) : null}
    </div>
  );
};

export default M3uList;
