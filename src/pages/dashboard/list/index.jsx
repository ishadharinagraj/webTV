import Carousel, { CarouselItem } from "@/utils/carousels/dashboard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Grid } from "react-virtualized";
import { useContext } from "react";
import { AppContext } from "@/contexts/app";
import useApi from "@/hooks/useApi";
import {
  addToFavs,
  getFavourites,
  getRecents,
  removeFromFavs,
  removeMovieFromRecents,
} from "@/firebase/functions";
import Scrollable from "@/utils/scrollable";
import { getDatabase, onValue, ref } from "firebase/database";
import { app } from "@/firebase";
import "./styles.css";
import ParentalLock from "@/utils/parentalLock";
import Watched from "@/utils/progress";
import Image from "next/image";
import placeholderImage from "@/assets/placeholder.png";
import noContentFound from "@/assets/noContentFound.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Cancel, Info } from "@mui/icons-material";
import M3uList from "./m3u";
import { Skeleton } from "@mui/material";

const options = {
  year: "numeric",
  month: "short",
  day: "2-digit",
};
export const formattedDate = (givenDate) => {
  const isNumber = /^[0-9]+$/.test(givenDate);
  const timestamp = new Date(
    isNumber ? Number(givenDate) : givenDate
  ).getTime();
  return new Intl.DateTimeFormat("en-US", options).format(timestamp);
};

const AllList = ({ currentUser, currentAction }) => {
  const router = useRouter();
  const { user, streamData, alert, parentalVerified } = useContext(AppContext);
  const { movies, series } = streamData;
  const currentSelected = currentAction === "series" ? series : movies;
  const currentKeys = {
    id: currentAction === "series" ? "series_id" : "stream_id",
    image: currentAction === "series" ? "cover" : "stream_icon",
  };
  const refs = useRef([]);
  const listImagesRef = useRef([]);
  let mouseDown = false;
  let startX, scrollLeft;
  const database = getDatabase(app);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [bannerMovies, setBannerMovies] = useState([]);
  const [show, setShow] = useState(false);
  const [FavouriteMovies, setFavouriteMovies] = useState(null);
  const [recents, setRecents] = useState([]);
  const [finalAddress, setFinalAddress] = useState(null);
  const [showParentalLock, setShowParentalLock] = useState(false);
  const [clickedAdultItem, setClickedAdultItem] = useState(null);
  const [continueWatchingClicked, setContinueWatchingClicked] = useState(false);
  const [currentRecentItem, setCurrentRecentItem] = useState(null);

  const [hoveredCard, setHoveredCard] = useState(null);
  const hoverTimer = useRef(null);
  const [favouriteIds, setFavouriteIds] = useState([]);
  const [myListIds, setMyListIds] = useState([]);

  const handleCardMouseEnter = (e, item) => {
    if (!item) return;
    const target = e.currentTarget;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    if (!rect || (rect.width === 0 && rect.height === 0)) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setHoveredCard({ item, rect });
    }, 120);
  };

  const handleCardMouseLeave = (e) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    const relatedTarget = e?.relatedTarget;
    if (relatedTarget && relatedTarget.closest && relatedTarget.closest(".hover-preview-card-portal")) {
      return;
    }
    setHoveredCard(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      setHoveredCard(null);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (FavouriteMovies) {
      setFavouriteIds(FavouriteMovies.map((m) => String(m[currentKeys.id] || m.stream_id || m.series_id || m.id)));
    }
  }, [FavouriteMovies, currentKeys.id]);

  useEffect(() => {
    if (recents) {
      setMyListIds(recents.map((m) => String(m.id || m.info?.[currentKeys.id] || m.info?.stream_id || m.info?.series_id)));
    }
  }, [recents, currentKeys.id]);

  const recentlyAdded = React.useMemo(() => {
    if (!currentSelected?.streams || currentSelected.streams.length === 0) return [];
    return [...currentSelected.streams]
      .sort((a, b) => Number(b.added || b.last_modified || 0) - Number(a.added || a.last_modified || 0))
      .slice(0, 10);
  }, [currentSelected]);

  const RecentlyAddedSection = React.useCallback(() => {
    if (!recentlyAdded || recentlyAdded.length === 0) return null;

    return (
      <section className="category top10-category-section">
        <span className="h3">Recently Added</span>
        <Scrollable>
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: 10, paddingTop: 10, paddingBottom: 15 }}>
            {recentlyAdded.map((movie, index) => {
              const id = movie[currentKeys.id] || movie.stream_id || movie.series_id;
              const imgUrl = movie[currentKeys.image] || movie.cover || movie.stream_icon;
              const name = movie.name || movie.title || "";

              const handleItem = () => {
                router.push(`/dashboard/preview/${currentAction}/${id}`);
              };

              return (
                <div
                  key={id || index}
                  onClick={handleItem}
                  onMouseEnter={(e) => handleCardMouseEnter(e, movie)}
                  onMouseLeave={handleCardMouseLeave}
                  className="top10-card-wrapper"
                >
                  <span className="top10-rank-number">{index + 1}</span>
                  <div className="top10-poster-card">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={name}
                        className="top10-poster-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = placeholderImage.src || placeholderImage;
                        }}
                      />
                    ) : (
                      <Image alt="placeholder" layout="fill" src={placeholderImage} objectFit="cover" />
                    )}
                    <span className="top10-badge">RECENTLY ADDED</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Scrollable>
      </section>
    );
  }, [recentlyAdded, currentKeys, currentAction, handleCardMouseEnter, handleCardMouseLeave]);

  const handleMyList = async (id, isMyList, action) => {
    const strId = String(id);
    const itemAction = action || currentAction;
    const pathType = itemAction === "movies" ? "Movie" : itemAction === "series" ? "Series" : "LiveTv";

    if (isMyList) {
      setMyListIds((prev) => prev.filter((i) => i !== strId));
      setFavouriteIds((prev) => prev.filter((i) => i !== strId));
      if (alert?.toggle) alert.toggle({ title: "Removed from My List", show: true, type: "success" });
    } else {
      setMyListIds((prev) => [...prev, strId]);
      setFavouriteIds((prev) => [...prev, strId]);
      if (alert?.toggle) alert.toggle({ title: "Added to My List", show: true, type: "success" });
    }

    try {
      if (isMyList) {
        await removeFromFavs(strId, pathType, finalAddress);
        await removeFromWatchlist(strId, pathType, finalAddress);
      } else {
        await addToFavs(strId, pathType, finalAddress);
        await addToWatchlist(strId, pathType, finalAddress);
      }
      getFavs();
    } catch (err) {
      console.log("Firebase sync error:", err);
    }
  };

  const HoverCard = () => {
    if (!hoveredCard || !hoveredCard.item || !hoveredCard.rect) return null;
    const { item, rect } = hoveredCard;
    const id = item[currentKeys.id] || item.stream_id || item.series_id || item.id;
    const title = item.name || item.title || item.info?.name || "";
    const imgUrl = item[currentKeys.image] || item.cover || item.stream_icon || item.info?.cover;
    const rating = Number(item.rating || item.info?.rating || 0).toFixed(1);

    const isFavourite = favouriteIds.includes(String(id));
    const isMyList = myListIds.includes(String(id));

    const cardWidth = 310;
    const cardHeight = 350;
    let left = rect.left + rect.width / 2 - cardWidth / 2;
    let top = rect.top - 15;

    const screenW = windowSize.width || (typeof window !== "undefined" ? window.innerWidth : 1200);
    const screenH = windowSize.height || (typeof window !== "undefined" ? window.innerHeight : 800);

    if (left < 15) left = 15;
    if (left + cardWidth > screenW - 15) left = Math.max(15, screenW - cardWidth - 15);
    if (top < 85) top = Math.max(85, rect.top);
    if (top + cardHeight > screenH - 15) top = Math.max(85, screenH - cardHeight - 15);

    const handlePlayClick = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      const actionType = item.actionType || (currentAction === "series" ? "series" : "movies");
      const streamId = item[currentKeys.id] || item.stream_id || item.series_id || item.id;
      if (!streamId) return;
      setHoveredCard(null);
      if (actionType === "live") {
        router.push(`/dashboard/live?view=${streamId}`);
      } else {
        router.push(`/dashboard/preview/${actionType}/${streamId}?state=play`);
      }
    };

    return (
      <div
        className="hover-preview-card-portal"
        style={{
          position: "fixed",
          top: top,
          left: left,
          width: cardWidth,
          zIndex: 99999,
        }}
        onMouseEnter={() => {
          if (hoverTimer.current) clearTimeout(hoverTimer.current);
        }}
        onMouseLeave={() => {
          setHoveredCard(null);
        }}
      >
        <div className="hover-card-inner">
          <div className="hover-card-thumb">
            <img
              src={imgUrl}
              alt={title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholderImage.src || placeholderImage;
              }}
            />
            <div className="hover-card-thumb-grad" />
          </div>

          <div className="hover-card-body">
            <div className="hover-card-actions">
              <button onClick={handlePlayClick} className="hover-card-play-btn" type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Now
              </button>

              <button
                type="button"
                onClick={() => handleMyList(id, isMyList, currentAction)}
                className={`hover-card-add-btn ${isMyList ? "active" : ""}`}
                title={isMyList ? "In My List" : "Add to My List"}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => handleFavourites(id, isFavourite)}
                className={`hover-card-fav-btn ${isFavourite ? "active" : ""}`}
                title={isFavourite ? "Remove from Favourites" : "Add to Favourites"}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavourite ? "#e50914" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>

            <div className="hover-card-meta">
              <h4 className="hover-card-title">{title}</h4>
              <div className="hover-card-tags">
                {rating !== "NaN" && Number(rating) > 0 && (
                  <span className="hover-tag rating">★ {rating}</span>
                )}
                {item.added && (
                  <span className="hover-tag">{formattedDate(item.added)}</span>
                )}
                <span className="hover-tag">{currentAction === "series" ? "Series" : "Movie"}</span>
              </div>
              {item.plot || item.description ? (
                <p className="hover-card-plot">
                  {item.plot || item.description}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const path = currentAction === "movies" ? "Movie" : "Series";
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

  const isAdult = (data) => {
    if (!data || !streamData) return false;
    const catId = data.category_id || (data.categories && data.categories[0]) || (data.category_ids && data.category_ids[0]);
    const allCategories = [
      ...(streamData.movies?.streamCategories || []),
      ...(streamData.series?.streamCategories || []),
      ...(streamData.liveTv?.streamCategories || [])
    ];
    const foundCategory = allCategories.find(c => String(c.category_id) === String(catId));
    const categoryName = foundCategory?.category_name || "";
    return adultArray.some((kw) => categoryName.toLowerCase().includes(kw.toLowerCase()));
  };



  const findItem = (id) => {
    if (!id || !streamData) return null;
    const sId = String(id);
    const mItem = (streamData.movies?.streams || []).find(
      (m) => String(m.stream_id || m.id || m.num) === sId
    );
    if (mItem) return { ...mItem, actionType: "movies", itemType: "Movie" };

    const sItem = (streamData.series?.streams || []).find(
      (s) => String(s.series_id || s.id || s.num) === sId
    );
    if (sItem) return { ...sItem, actionType: "series", itemType: "Series" };

    const lItem = (streamData.liveTv?.streams || []).find(
      (l) => String(l.stream_id || l.id || l.num) === sId
    );
    if (lItem) return { ...lItem, actionType: "live", itemType: "Live TV" };

    return null;
  };

  const isMyListTab = currentAction === "mylist" || currentAction === "watchlist";

  const getFavs = async (values) => {
    if (!finalAddress) return;
    try {
      if (isMyListTab) {
        const [movWatch, serWatch, liveWatch] = await Promise.all([
          getWatchlist("Movie", finalAddress),
          getWatchlist("Series", finalAddress),
          getWatchlist("LiveTv", finalAddress),
        ]);

        let items = [];
        let allIds = [];

        const processSnap = (snap, defaultType) => {
          if (!snap?.val()) return;
          Object.entries(snap.val()).forEach(([id, val]) => {
            allIds.push(String(id));
            if (typeof val === 'object' && val !== null && (val.name || val.id)) {
              items.push({
                stream_id: val.id || id,
                series_id: val.id || id,
                id: val.id || id,
                name: val.name || "",
                cover: val.cover || val.stream_icon || "",
                stream_icon: val.stream_icon || val.cover || "",
                rating: val.rating || 0,
                actionType: val.actionType || defaultType,
                addedAt: val.addedAt || 0
              });
            } else {
              const found = findItem(id);
              if (found) {
                items.push({ ...found, addedAt: val });
              } else {
                items.push({
                  stream_id: id,
                  series_id: id,
                  id: id,
                  name: `Saved ${defaultType === 'movies' ? 'Movie' : defaultType === 'series' ? 'Show' : 'Channel'} (${id})`,
                  actionType: defaultType,
                  addedAt: val
                });
              }
            }
          });
        };

        processSnap(movWatch, "movies");
        processSnap(serWatch, "series");
        processSnap(liveWatch, "live");

        items.sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));

        setFavouriteMovies(items);
        setMyListIds(allIds);
      } else {
        const response = await getFavourites(path, finalAddress);
        const ids = response.val() ? Object.keys(response.val()) : [];
        if (ids && currentSelected.streams) {
          let favs = [];
          ids.forEach((id) => {
            const itemExists = currentSelected.streams.find(
              (movie) => String(movie[currentKeys.id] || movie.stream_id || movie.series_id || movie.id) === String(id)
            );
            if (itemExists) {
              favs.push({
                ...itemExists,
                actionType: currentAction,
              });
            }
          });
          setFavouriteMovies(favs);
          setFavouriteIds(ids);
        } else {
          setFavouriteMovies(null);
        }
      }
    } catch (error) {
      console.log("getFavs error:", error);
    }
  };

  const handleFavourites = async (id, liked) => {
    try {
      if (liked) {
        await removeFromFavs(id, path, finalAddress);
        alert.toggle({
          title: "Removed from Favourites",
          show: true,
          type: "success",
        });
      } else {
        await addToFavs(id, path, finalAddress);
        alert.toggle({
          title: "Added to Favourites",
          show: true,
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
      alert.toggle({
        title: "Something went wrong",
        show: true,
        type: "error",
      });
    }
    getFavs();
  };

  const getRecent = async () => {
    try {
      if (isMyListTab) {
        const [movSnap, serSnap, liveSnap] = await Promise.all([
          getRecents("Movie", finalAddress),
          getRecents("Series", finalAddress),
          getRecents("LiveTv", finalAddress),
        ]);

        let recentsArr = [];

        if (movSnap?.val() && streamData?.movies?.streams) {
          Object.entries(movSnap.val()).forEach(([id, data]) => {
            const info = streamData.movies.streams.find((m) => String(m.stream_id || m.id) === String(id));
            if (info) recentsArr.push({ id, ...data, info, actionType: "movies" });
          });
        }
        if (serSnap?.val() && streamData?.series?.streams) {
          Object.entries(serSnap.val()).forEach(([id, data]) => {
            const info = streamData.series.streams.find((s) => String(s.series_id || s.id) === String(id));
            if (info) recentsArr.push({ id, ...data, info, actionType: "series" });
          });
        }
        if (liveSnap?.val() && streamData?.liveTv?.streams) {
          Object.entries(liveSnap.val()).forEach(([id, data]) => {
            const info = streamData.liveTv.streams.find((l) => String(l.stream_id || l.id) === String(id));
            if (info) recentsArr.push({ id, ...data, info, actionType: "live" });
          });
        }

        recentsArr.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setRecents(recentsArr);
      } else {
        const response = await getRecents(path, finalAddress);
        if (response.val() && currentSelected.streams) {
          const ids = Object.keys(response.val());
          const data = Object.values(response.val());
          const recentsArr = [];
          ids.map((id, index) => {
            const info = currentSelected.streams.filter(
              (movie) => String(movie[currentKeys.id]) === String(id)
            )[0];
            const isShow = data[index].showInContinueWatchingList;
            if (isShow) {
              if (isShow === "true") {
                recentsArr.push({
                  id,
                  ...data[index],
                  info,
                  actionType: currentAction,
                });
              }
            } else {
              recentsArr.push({
                id,
                ...data[index],
                info,
                actionType: currentAction,
              });
            }
          });
          const sorted = recentsArr.sort(
            (objA, objB) => objB.timestamp - objA.timestamp
          );
          setRecents(sorted);
        } else {
          setRecents([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stopDragging = function (e, ref) {
    mouseDown = false;
    const nodes = ref.childNodes[0].childNodes[0].childNodes;
    nodes.forEach((el) => {
      el.style.pointerEvents = "auto";
    });
  };

  const handleListDown = (e, ref) => {
    mouseDown = true;
    startX = e.pageX - ref.childNodes[0].offsetLeft;
    scrollLeft = ref.childNodes[0].scrollLeft;
  };

  const handlelistMove = (e, ref) => {
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

  const getParentalPin = (key) => {
    if (!key || typeof window === "undefined") {
      return "";
    }
    const user = localStorage.getItem(key);
    const retrievedUser =
      user && Object.values(JSON.parse(user))[0].parentalPin;
    return retrievedUser;
  };

  const parentalPin = getParentalPin("currentUser");

  const Category = React.useCallback(
    ({ index }) => {
    const filtered = currentSelected?.streams.filter(
      (movie) =>
        movie?.category_id ===
          currentSelected.streamCategories[index].category_id ||
        movie?.categories?.filter(
          (id) =>
            String(id) ===
            String(currentSelected.streamCategories[index].category_id)
        ).length > 0
    );
    const [errorIndex, setErrorIndex] = useState(null);

    const innerElement = (args) => {
      const filteredComp = filtered[args.columnIndex];
      const { category_name, added, name } = filteredComp;
      const isFavourite =
        FavouriteMovies &&
        FavouriteMovies.filter(
          (movie) => movie[currentKeys.id] === filteredComp[currentKeys.id]
        ).length > 0;
      const category = currentSelected.streamCategories[index].category_name;
      const isAdult =
        adultArray.filter((item) =>
          category.toLowerCase().includes(item.toLowerCase())
        ).length > 0;
      const handleItem = () => {
        if (parentalPin) {
          if (isAdult) {
            setClickedAdultItem(
              filteredComp[
                currentAction === "movies" ? "stream_id" : "series_id"
              ]
            );
            setShowParentalLock(true);
          } else {
            setShowParentalLock(false);
            router.push(
              `/dashboard/preview/${currentAction}/${
                filteredComp[
                  currentAction === "movies" ? "stream_id" : "series_id"
                ]
              }`
            );
          }
        } else {
          router.push(
            `/dashboard/preview/${currentAction}/${
              filteredComp[
                currentAction === "movies" ? "stream_id" : "series_id"
              ]
            }`
          );
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
                  <Link href="javascript:void(0)">
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
              {errorIndex === args.columnIndex ? (
                <Image alt="placeholder" src={placeholderImage} />
              ) : filteredComp[currentKeys.image] ? (
                <img
                  style={{
                    filter: isAdult && parentalPin && "blur(20px)",
                  }}
                  onError={() => setErrorIndex(args.columnIndex)}
                  src={filteredComp[currentKeys.image]}
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
      e.preventDefault();

      const x = e.touches[0].clientX - ref.childNodes[0].offsetLeft;
      const scroll = x - startX;
      ref.childNodes[0].scrollLeft = scrollLeft - scroll;
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
      mouseDown = true;
      startX = e.touches[0].clientX - ref.childNodes[0].offsetLeft;
      scrollLeft = ref.childNodes[0].scrollLeft;
    };

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

    return (
      filtered.length > 0 && (
        <section key={index} className="category listSlider">
          <div className="category-header-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: 20 }}>
            <span className="h3">
              {currentSelected.streamCategories[index].category_name}
            </span>
            <span
              className="see-all-text"
              onClick={() =>
                router.push(
                  `/dashboard/preview/movies/more?cat_id=${currentSelected.streamCategories[index].category_id}&cat_name=${encodeURIComponent(
                    currentSelected.streamCategories[index].category_name
                  )}`
                )
              }
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "color 0.2s ease"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)")}
            >
              See All ›
            </span>
          </div>
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
              {currentSelected.streams ? (
                // <AutoSizer disableHeight>
                //  {({ width }) => (
                <Grid
                  height={270}
                  cellRenderer={innerElement}
                  columnCount={filtered ? filtered.length : 0}
                  rowHeight={250}
                  style={{
                    overflowY: "hidden",
                    overflowX: "hidden",
                    paddingTop: 15,
                    paddingLeft: 5,
                  }}
                  rowCount={1}
                  columnWidth={173}
                  width={windowSize.width - window.innerWidth / 20}
                  // width={width}
                />
              ) : (
                // )}
                //     </AutoSizer>
                <>
                  <Skeleton
                    sx={{ borderRadius: 2 }}
                    variant="rectangle"
                    height={300}
                    width={300}
                  />
                  <Skeleton
                    sx={{ borderRadius: 2 }}
                    variant="rectangle"
                    height={300}
                    width={300}
                  />
                  <Skeleton
                    sx={{ borderRadius: 2 }}
                    variant="rectangle"
                    height={300}
                    width={300}
                  />
                  <Skeleton
                    sx={{ borderRadius: 2 }}
                    variant="rectangle"
                    height={300}
                    width={300}
                  />
                  <Skeleton
                    sx={{ borderRadius: 2 }}
                    variant="rectangle"
                    height={300}
                    width={300}
                  />
                </>
              )}
            </div>
          </div>
        </section>
      )
    );
  },
  [currentSelected, FavouriteMovies, parentalPin, windowSize]
);
  const FavsCategory = ({ favMovies }) => {
    return (
      favMovies.length > 0 && (
        <section className="category">
          <span style={{ marginTop: 20 }} className="h3">
            Favourites
          </span>
          <Scrollable>
            {favMovies?.map((movie, index) => {
              const added =
                currentAction === "movies" ? movie.added : movie.last_modified;
              const isCategory = currentSelected.streamCategories?.filter(
                (ctg) =>
                  String(ctg.category_id) === String(movie?.category_id) ||
                  String(ctg.category_id) ===
                    String(movie?.categories && movie?.categories[0])
              )[0];
              const category = isCategory && isCategory.category_name;

              const isAdult =
                adultArray.filter((item) =>
                  category?.toLowerCase().includes(item.toLowerCase())
                ).length > 0;
              const handleItem = () => {
                if (parentalPin) {
                  if (isAdult) {
                    setClickedAdultItem(
                      movie[
                        currentAction === "movies" ? "stream_id" : "series_id"
                      ]
                    );
                    setShowParentalLock(true);
                  } else {
                    setShowParentalLock(false);
                    router.push(
                      `/dashboard/preview/${currentAction}/${
                        movie[
                          currentAction === "movies" ? "stream_id" : "series_id"
                        ]
                      }`
                    );
                  }
                } else {
                  router.push(
                    `/dashboard/preview/${currentAction}/${
                      movie[
                        currentAction === "movies" ? "stream_id" : "series_id"
                      ]
                    }`
                  );
                }
              };
              return (
                <div key={index} onClick={handleItem}>
                  <div
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      width: 165,
                      borderRadius: 5,
                    }}
                    onMouseEnter={(e) => handleCardMouseEnter(e, movie)}
                    onMouseLeave={handleCardMouseLeave}
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
                        <Link href="javascript:void(0)">
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
                      {movie[currentKeys.image] ? (
                        <img
                          style={{
                            filter: isAdult && parentalPin && "blur(20px)",
                          }}
                          src={movie[currentKeys.image]}
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

  const removeItemFromRecents = async () => {
    try {
      await removeMovieFromRecents(
        currentRecentItem.id,
        currentAction === "movies" ? "Movie" : "Series",
        finalAddress
      );
    } catch (error) {
      console.log("ERROR", error);
    }
    setCurrentRecentItem(null);
  };
  

  const Recents = React.useCallback(() => {
    return (
      recents.length > 0 && (
        <section className="category">
          <span className="h3">Continue Watching</span>
          <Scrollable>
            {recents.map((movie, index) => {
              const values = Object.values(movie);
              const lastWatched = false;
              // values && values.filter(vl => vl.lastWatched === 'true')
              const watched =
                currentAction === "series"
                  ? lastWatched.length > 0 &&
                    (lastWatched[0].timeline / lastWatched[0].duration) * 100
                  : (movie.timeline / movie.duration) * 100;
              const added =
                currentAction === "movies"
                  ? movie.info?.added
                  : movie.info?.last_modified;
              const isFavourite = FavouriteMovies
                ? FavouriteMovies.filter(
                    (item) => String(item[currentKeys.id]) === String(movie.id)
                  ).length > 0
                : null;
              const isCategory = currentSelected.streamCategories?.filter(
                (ctg) =>
                  String(ctg.category_id) ===
                    String(movie?.info?.category_id) ||
                  String(ctg.category_id) ===
                    String(movie?.info?.categories && movie.info?.categories[0])
              )[0];
              const category = isCategory && isCategory.category_name;
              const isAdult =
                adultArray.filter((item) =>
                  category?.toLowerCase().includes(item.toLowerCase())
                ).length > 0;

              const handleItem = (action) => {
                setContinueWatchingClicked(true);
                if (parentalPin) {
                  if (isAdult) {
                    setClickedAdultItem(
                      movie.info[
                        currentAction === "movies" ? "stream_id" : "series_id"
                      ]
                    );
                    setShowParentalLock(true);
                  } else {
                    setShowParentalLock(false);
                    if (action === "info") {
                      router.push(
                        `/dashboard/preview/${currentAction}/${
                          movie.info[
                            currentAction === "movies"
                              ? "stream_id"
                              : "series_id"
                          ]
                        }`
                      );
                    } else {
                      router.push(
                        `/dashboard/preview/${currentAction}/${
                          movie.info[
                            currentAction === "movies"
                              ? "stream_id"
                              : "series_id"
                          ]
                        }?state=play`
                      );
                    }
                  }
                } else {
                  if (action === "info") {
                    router.push(
                      `/dashboard/preview/${currentAction}/${
                        movie.info[
                          currentAction === "movies" ? "stream_id" : "series_id"
                        ]
                      }`
                    );
                  } else {
                    router.push(
                      `/dashboard/preview/${currentAction}/${
                        movie.info[
                          currentAction === "movies" ? "stream_id" : "series_id"
                        ]
                      }?state=play`
                    );
                  }
                }
              };

              return (
                <div
                  key={index}
                  style={{
                    position: "relative",
                  }}
                >
                  <div
                    onClick={handleItem}
                    onMouseEnter={(e) => handleCardMouseEnter(e, movie.info ? { ...movie.info, ...movie } : movie)}
                    onMouseLeave={handleCardMouseLeave}
                    key={index}
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
                          <Link href="javascript:void(0)">
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
                      {movie.info && movie.info[currentKeys.image] ? (
                        <img
                          style={{
                            filter: isAdult && parentalPin && "blur(20px)",
                          }}
                          src={movie.info[currentKeys.image]}
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
  }, [recents, currentKeys, currentAction, FavouriteMovies, adultArray, parentalPin, handleCardMouseEnter, handleCardMouseLeave]);

    useEffect(() => {
    setBannerMovies([]);
    if (currentSelected.banner.streams) {
      setBannerMovies(currentSelected.banner.streams);
    }
  }, [currentSelected.banner.streams, currentAction]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Call it once immediately, in case size changed before listeners attached
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setFinalAddress(user.dbAddress);
    }
  }, [user]);

  useEffect(() => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 500);
    setFavouriteMovies(null);
    setRecents([]);
  }, [currentAction]);

  useEffect(() => {
    if (finalAddress) {
      getFavs();
      getRecent();

      if (isMyListTab) {
        const favMov = onValue(ref(database, `${finalAddress}/Fav/Movie`), () => getFavs());
        const favSer = onValue(ref(database, `${finalAddress}/Fav/Series`), () => getFavs());
        const favLive = onValue(ref(database, `${finalAddress}/Fav/LiveTv`), () => getFavs());
        const watchMov = onValue(ref(database, `${finalAddress}/Watchlist/Movie`), () => getFavs());
        const watchSer = onValue(ref(database, `${finalAddress}/Watchlist/Series`), () => getFavs());
        const watchLive = onValue(ref(database, `${finalAddress}/Watchlist/LiveTv`), () => getFavs());

        return () => {
          favMov(); favSer(); favLive();
          watchMov(); watchSer(); watchLive();
        };
      } else {
        const pathStr = currentAction === "movies" ? "Movie" : "Series";
        const favUnsub = onValue(ref(database, `${finalAddress}/Fav/${pathStr}`), () => getFavs());
        const watchUnsub = onValue(ref(database, `${finalAddress}/Watchlist/${pathStr}`), () => getFavs());
        const recUnsub = onValue(ref(database, `${finalAddress}/Recent/${pathStr}`), () => getRecent());

        return () => {
          favUnsub(); watchUnsub(); recUnsub();
        };
      }
    }
  }, [currentAction, finalAddress, streamData]);

  return (
    <div
      className="list-container"
      style={{
        transition: ".4s",
        opacity: show ? 1 : 1,
      }}
    >
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
                  setCurrentRecentItem(null);
                  const isFavourite =
                    FavouriteMovies.filter(
                      (item) =>
                        String(item[currentKeys.id]) ===
                        String(currentRecentItem.id)
                    ).length > 0;
                  try {
                    if (isFavourite) {
                      await removeFromFavs(
                        currentRecentItem.id,
                        currentAction === "movies" ? "Movie" : "Series",
                        finalAddress
                      );
                      alert.toggle({
                        show: true,
                        title: "Removed from Favourites",
                        type: "success",
                      });
                    } else {
                      await addToFavs(
                        currentRecentItem.id,
                        currentAction === "movies" ? "Movie" : "Series",
                        finalAddress
                      );
                      alert.toggle({
                        show: true,
                        title: "Added to Favourites",
                        type: "success",
                      });
                    }
                  } catch (error) {
                    console.log("ERROR", error);
                  }
                }}
              >
                {" "}
                {FavouriteMovies.filter(
                  (item) =>
                    String(item[currentKeys.id]) ===
                    String(currentRecentItem.id)
                ).length > 0
                  ? "Remove from Favourites"
                  : "Add to Favourites"}
              </button>
              <button onClick={removeItemFromRecents}>Remove from Row</button>
            </div>
          </div>
        </div>
      )}
      {user?.loginType !== "m3u" ? (
        <>
          <ParentalLock
            action={"verify"}
            open={showParentalLock}
            close={() => setShowParentalLock(false)}
            completed={() => {
              parentalVerified.toggle(true);
              router.push(
                `/dashboard/preview/${currentAction}/${clickedAdultItem}`
              );
            }}
          />
          {isMyListTab ? (
            <div style={{ paddingTop: 95, paddingLeft: 40, paddingRight: 40, paddingBottom: 60, maxWidth: 1440, margin: "0 auto" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <h1 style={{ fontSize: 28, fontWeight: 800, color: "#ffffff", margin: 0 }}>My List</h1>
                  <span style={{ padding: "4px 12px", background: "rgba(99, 102, 241, 0.2)", border: "1px solid rgba(99, 102, 241, 0.4)", borderRadius: 16, fontSize: 13, fontWeight: 700, color: "#818cf8" }}>
                    {FavouriteMovies ? FavouriteMovies.length : 0} {FavouriteMovies && FavouriteMovies.length === 1 ? 'title' : 'titles'}
                  </span>
                </div>
              </div>

              {!FavouriteMovies || FavouriteMovies.length === 0 ? (
                <div className="no-data-found-container" style={{ padding: "80px 20px" }}>
                  <Image src={noContentFound} alt="No content found" width={140} height={140} />
                  <h2 style={{ color: "#ffffff", marginTop: 16, fontSize: 22 }}>Your List is empty</h2>
                  <p style={{ color: "#94a3b8", fontSize: 14, maxWidth: 420 }}>Add movies, TV shows, and live channels to your list by clicking the + button on any title.</p>
                </div>
              ) : (
                <div className="search-results-grid">
                  {FavouriteMovies.map((item, index) => {
                    const actionType = item.actionType || (item.series_id ? "series" : "movies");
                    const streamId = item.stream_id || item.series_id || item.id;
                    const imgUrl = item.stream_icon || item.cover || item.info?.cover || item.info?.stream_icon;
                    const title = item.name || item.title || item.info?.name || "";
                    const ratingVal = item.rating || item.info?.rating;
                    const rating = Number(ratingVal || 0).toFixed(1);

                    const handleItemClick = () => {
                      if (actionType === "live") {
                        router.push(`/dashboard/live?view=${streamId}`);
                      } else {
                        router.push(`/dashboard/preview/${actionType}/${streamId}`);
                      }
                    };

                    const handleRemoveFromList = async (e) => {
                      e.stopPropagation();
                      const pathType = actionType === "movies" ? "Movie" : actionType === "series" ? "Series" : "LiveTv";
                      try {
                        await removeFromFavs(streamId, pathType, finalAddress);
                        await removeFromWatchlist(streamId, pathType, finalAddress);
                        alert.toggle({ title: "Removed from My List", show: true, type: "success" });
                        getFavs();
                      } catch (err) {
                        console.log("Remove error", err);
                      }
                    };

                    return (
                      <div
                        key={streamId || index}
                        onClick={handleItemClick}
                        onMouseEnter={(e) => handleCardMouseEnter(e, item)}
                        onMouseLeave={handleCardMouseLeave}
                        className="item"
                      >
                        <div className="thumb">
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              alt={title}
                              style={{
                                filter: isAdult(item) && parentalPin ? "blur(20px)" : "none"
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = placeholderImage.src || placeholderImage;
                              }}
                            />
                          ) : (
                            <Image alt="placeholder" layout="fill" objectFit="cover" src={placeholderImage} />
                          )}
                        </div>

                        <div className="caption">
                          <div className="control">
                            {rating !== "NaN" && Number(rating) > 0 ? (
                              <span className="count">{rating}</span>
                            ) : (
                              <span />
                            )}
                            <button
                              type="button"
                              onClick={handleRemoveFromList}
                              title="Remove from My List"
                              style={{
                                background: "rgba(239, 68, 68, 0.2)",
                                border: "1px solid rgba(239, 68, 68, 0.4)",
                                color: "#ef4444",
                                borderRadius: "50%",
                                width: "28px",
                                height: "28px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer"
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </div>
                          <span className="h2">{title}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <HoverCard />
            </div>
          ) : (currentSelected.streams && currentSelected.streams.length === 0) ||
          !currentSelected.streams ? (
            <div className="no-data-found-container">
              <Image src={noContentFound} alt="No content found" width={150} height={150} />
              <h2 className="no-data-found">No {currentAction} found</h2>
            </div>
          ) : (
            <>
              {bannerMovies && bannerMovies.length > 0 && (
                <section className="mainBanner">
                  <div style={{ width: "100%" }} className="owl-carousel">
                    <Carousel>
                      {bannerMovies?.map((movie, index) => {
                        const liked =
                          FavouriteMovies?.filter(
                            (item) =>
                              String(item[currentKeys.id]) ===
                              String(
                                currentAction === "movies"
                                  ? movie?.movie_data?.stream_id
                                  : movie?.series_id
                              )
                          ).length > 0;
                        const imgPath = () => {
                          if (currentAction === "movies") {
                            return movie.info?.backdrop_path &&
                              movie.info?.backdrop_path.length > 0
                              ? movie.info?.backdrop_path[0]
                              : movie.info?.cover
                              ? movie.info?.cover
                              : null;
                          }
                          if (currentAction === "series") {
                            return movie.backdrop_path &&
                              movie.backdrop_path.length > 0
                              ? movie.backdrop_path[0]
                              : movie.cover
                              ? movie.cover
                              : null;
                          }
                        };
                        const id =
                          currentAction === "movies"
                            ? movie?.movie_data?.stream_id
                            : movie?.series_id;
                        const aboutMovie =
                          currentAction === "movies"
                            ? movie?.info?.description
                              ? movie?.info?.description
                              : movie?.info?.plot
                            : movie?.plot;
                        return (
                          <CarouselItem key={index}>
                            <div className="item">
                              <div className="thumb">
                                <span className="effectGrad"></span>
                                {imgPath() ? (
                                  <img src={imgPath()} />
                                ) : (
                                  <Image
                                    alt="placeholder"
                                    layout="fill"
                                    src={placeholderImage}
                                  />
                                )}
                              </div>
                              <div className="info">
                                <span className="h2">
                                  {currentAction === "movies"
                                    ? movie?.info?.name
                                    : movie?.name}
                                </span>
                                <p className="text">
                                  {aboutMovie
                                    ? aboutMovie?.length > 400
                                      ? aboutMovie.substring(0, 400) + "..."
                                      : aboutMovie
                                    : null}
                                </p>
                                <div className="btnGroup">
                                  <Link
                                    href={`/dashboard/preview/${currentAction}/${
                                      currentAction === "movies"
                                        ? movie?.movie_data?.stream_id
                                        : currentSelected.streams[index]
                                            .series_id
                                    }`}
                                    className="btn btn-primary playBtn"
                                  >
                                    <svg
                                      width="28"
                                      height="30"
                                      viewBox="0 0 28 30"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      {" "}
                                      <path
                                        d="M0 0.120605V29.8574L27.928 14.989L0 0.120605Z"
                                        fill="white"
                                      />{" "}
                                    </svg>{" "}
                                    Play
                                  </Link>
                                  <button
                                    onClick={() => handleFavourites(id, liked)}
                                    className="btn btn-primary"
                                  >
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
                                        fill={liked ? "#FF0000" : "white"}
                                      />{" "}
                                    </svg>{" "}
                                    My Favourite
                                  </button>
                                </div>
                              </div>
                            </div>
                          </CarouselItem>
                        );
                      })}
                    </Carousel>
                    <div className="ad-container">
                      <AdSense currentPath={currentAction} />
                    </div>
                  </div>
                </section>
              )}

              <div
                style={{
                  paddingTop: bannerMovies && bannerMovies.length > 0 ? 0 : 70,
                }}
              >
                {FavouriteMovies && FavouriteMovies && (
                  <FavsCategory favMovies={FavouriteMovies} />
                )}
                <Recents />
                <RecentlyAddedSection />
                {currentSelected.streamCategories?.map((ctg, index) => (
                  <Category key={ctg.category_id || index} index={index} />
                ))}
              </div>
              <HoverCard />
            </>
          )}
        </>
      ) : (
              <M3uList finalAddress={finalAddress} currentAction={currentAction} />

      )}
    </div>
  );
};

export default AllList;




