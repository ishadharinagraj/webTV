"use client"
import React, { useState, useEffect, useRef, useContext } from "react";
import "./styles.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import placeholderImage from "@/assets/placeholder.png";
import { AppContext } from "@/contexts/app";
import {
  addToFavs,
  addToWatchlist,
  getFavourites,
  getWatchlist,
  removeFromFavs,
  removeFromWatchlist,
} from "@/firebase/functions";
import { formattedDate } from "@/pages/dashboard/list";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

const CategoryMorePage = () => {
  const router = useRouter();
  const catId = router.query?.cat_id;
  const catName = router.query?.cat_name;
  const action = router.query?.action || "movies";

  const { user, alert, streamData, parentalPin } = useContext(AppContext);
  const { movies, series } = streamData;
  const currentSelected = action === "series" ? series : movies;
  const currentKeys = {
    id: action === "series" ? "series_id" : "stream_id",
    image: action === "series" ? "cover" : "stream_icon",
  };

  const [finalAddress, setFinalAddress] = useState(null);
  const [favouriteIds, setFavouriteIds] = useState([]);
  const [myListIds, setMyListIds] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const hoverTimer = useRef(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (user) {
      let rawAddress = user.server_url || user.url || user.host;
      if (rawAddress) {
        const cleanAddress = rawAddress.replace(/https?:\/\//, "").replace(/:\d+$/, "").replace(/\//g, "");
        setFinalAddress(cleanAddress);
      }
    }
  }, [user]);

  const fetchFavsAndList = async () => {
    if (!finalAddress) return;
    try {
      const itemPath = action === "series" ? "Series" : "Movie";
      const favRes = await getFavourites(itemPath, finalAddress);
      const favVal = favRes?.val() || {};
      setFavouriteIds(Object.keys(favVal));

      const movieWatchlistRes = await getWatchlist("Movie", finalAddress);
      const seriesWatchlistRes = await getWatchlist("Series", finalAddress);
      const movieVal = Object.keys(movieWatchlistRes?.val() || {});
      const seriesVal = Object.keys(seriesWatchlistRes?.val() || {});
      setMyListIds([...movieVal, ...seriesVal]);
    } catch (e) {
      console.log("Error fetching favs/list:", e);
    }
  };

  useEffect(() => {
    if (finalAddress) {
      fetchFavsAndList();
    }
  }, [finalAddress]);

  const handleFavourites = async (id, isFav, mediaType) => {
    if (!finalAddress) return;
    const itemPath = mediaType === "series" ? "Series" : "Movie";
    try {
      if (isFav) {
        await removeFromFavs(id, itemPath, finalAddress);
        alert.toggle({ title: "Removed from Favourites", show: true, type: "success" });
      } else {
        await addToFavs(id, itemPath, finalAddress);
        alert.toggle({ title: "Added to Favourites", show: true, type: "success" });
      }
      fetchFavsAndList();
    } catch (err) {
      console.log(err);
    }
  };

  const handleMyList = async (id, isListed, mediaType) => {
    if (!finalAddress) return;
    const itemPath = mediaType === "series" ? "Series" : "Movie";
    try {
      if (isListed) {
        await removeFromWatchlist(id, itemPath, finalAddress);
        alert.toggle({ title: "Removed from My List", show: true, type: "success" });
      } else {
        await addToWatchlist(id, itemPath, finalAddress);
        alert.toggle({ title: "Added to My List", show: true, type: "success" });
      }
      fetchFavsAndList();
    } catch (err) {
      console.log(err);
    }
  };

  const [closingHover, setClosingHover] = useState(false);
  const closeTimer = useRef(null);

  const closeHoverCard = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setClosingHover(true);
    closeTimer.current = setTimeout(() => {
      setHoveredCard(null);
      setClosingHover(false);
    }, 220);
  };

  const handleCardMouseEnter = (e, item) => {
    if (!item) return;
    const target = e.currentTarget;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    if (!rect || (rect.width === 0 && rect.height === 0)) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setClosingHover(false);
    hoverTimer.current = setTimeout(() => {
      setHoveredCard({ item, rect });
    }, 220);
  };

  const handleCardMouseLeave = (e) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    const relatedTarget = e?.relatedTarget;
    if (relatedTarget && relatedTarget.closest && relatedTarget.closest(".hover-preview-card-portal")) {
      return;
    }
    closeHoverCard();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      setHoveredCard(null);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredMovies = React.useMemo(() => {
    if (!currentSelected?.streams) return [];
    if (!catId) return currentSelected.streams;
    return currentSelected.streams.filter(
      (item) =>
        String(item.category_id) === String(catId) ||
        (item.categories && item.categories.map(String).includes(String(catId)))
    );
  }, [currentSelected, catId]);

  const HoverCard = () => {
    if (!hoveredCard || !hoveredCard.item || !hoveredCard.rect) return null;
    const { item, rect } = hoveredCard;
    const id = item[currentKeys.id] || item.stream_id || item.series_id || item.id;
    const title = item.name || item.title || item.info?.name || "";
    const imgUrl = item[currentKeys.image] || item.cover || item.stream_icon || item.info?.cover;
    const rating = Number(item.rating).toFixed(1);

    const isFavourite = favouriteIds.includes(String(id));
    const isMyList = myListIds.includes(String(id));

    const cardWidth = 380;
    const cardHeight = 470;
    let left = rect.left + rect.width / 2 - cardWidth / 2;
    let top = rect.top - 20;

    const screenW = windowSize.width || (typeof window !== "undefined" ? window.innerWidth : 1200);
    const screenH = windowSize.height || (typeof window !== "undefined" ? window.innerHeight : 800);

    if (left < 15) left = 15;
    if (left + cardWidth > screenW - 15) left = Math.max(15, screenW - cardWidth - 15);
    if (top < 85) top = Math.max(85, rect.top);
    if (top + cardHeight > screenH - 15) top = Math.max(85, screenH - cardHeight - 15);

    const handlePlayClick = () => {
      setHoveredCard(null);
      router.push(`/dashboard/preview/${action}/${id}?state=play`);
    };

    const handleInfoClick = () => {
      setHoveredCard(null);
      router.push(`/dashboard/preview/${action}/${id}`);
    };

    return (
      <div
        className={`hover-preview-card-portal ${closingHover ? "closing" : ""}`}
        style={{
          position: "fixed",
          top: top,
          left: left,
          width: cardWidth,
          zIndex: 99999,
        }}
        onMouseEnter={() => {
          if (hoverTimer.current) clearTimeout(hoverTimer.current);
          if (closeTimer.current) clearTimeout(closeTimer.current);
          setClosingHover(false);
        }}
        onMouseLeave={() => {
          closeHoverCard();
        }}
      >
        <div className="hover-card-inner">
          <div className="hover-card-thumb">
            <img src={imgUrl} alt={title} onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage.src || placeholderImage; }} />
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
                onClick={() => handleMyList(id, isMyList, action)}
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
                onClick={() => handleFavourites(id, isFavourite, action)}
                className={`hover-card-fav-btn ${isFavourite ? "active" : ""}`}
                title={isFavourite ? "Remove from Favourites" : "Add to Favourites"}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavourite ? "#e50914" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleInfoClick}
                className="hover-card-info-btn"
                title="More Info"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </button>
            </div>

            <div className="hover-card-meta">
              <h4 className="hover-card-title">{title}</h4>
              {/* <div className="hover-card-tags">
                {rating !== "NaN" && Number(item.rating) > 0 && (
                  <span className="hover-tag rating">★ {rating}</span>
                )}
                {item.added && (
                  <span className="hover-tag">{formattedDate(item.added)}</span>
                )}
                <span className="hover-tag">{action === "series" ? "Series" : "Movie"}</span>
              </div>
              {item.plot || item.description ? (
                <p className="hover-card-plot">
                  {item.plot || item.description}
                </p>
              ) : null} */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="category-full-page">
      <div className="category-view-header">
        <button onClick={() => router.back()} className="category-back-btn" type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
        <h1 className="category-view-title-center">
          {catName || "Category"}
        </h1>
        <div className="header-spacer" />
      </div>

      <div className="category-full-grid">
        {filteredMovies?.map((movie, index) => {
          const id = movie[currentKeys.id] || movie.stream_id || movie.series_id;
          const imgUrl = movie[currentKeys.image] || movie.cover || movie.stream_icon;
          const name = movie.name || movie.title || "";
          const rating = Number(movie.rating).toFixed(1);

          return (
            <div
              key={id || index}
              onClick={() => router.push(`/dashboard/preview/${action}/${id}?state=play`)}
              onMouseEnter={(e) => handleCardMouseEnter(e, movie)}
              onMouseLeave={handleCardMouseLeave}
              className="item"
            >
              <div className="caption">
                <span className="control">
                  {rating !== "NaN" && Number(movie.rating) > 0 ? (
                    <span className="count">{rating}</span>
                  ) : (
                    <span />
                  )}
                </span>
                <span className="info">
                  <text>{catName || ""}</text>
                </span>
                <span className="h2">{name}</span>
              </div>
              <div className="thumb">
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt={name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <Image alt="placeholder" layout="fill" src={placeholderImage} objectFit="cover" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <HoverCard />
    </div>
  );
};

const MoreLikeThis = ({ movies: propsMovies }) => {
  const router = useRouter();
  const catId = router.query?.cat_id;
  const catName = router.query?.cat_name;

  if (catId || catName) {
    return <CategoryMorePage />;
  }

  const action = router.query?.action || "movies";
  const { user, alert } = useContext(AppContext);

  const [finalAddress, setFinalAddress] = useState(null);
  const [favouriteIds, setFavouriteIds] = useState([]);
  const [myListIds, setMyListIds] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [closingHover, setClosingHover] = useState(false);
  const hoverTimer = useRef(null);
  const closeTimer = useRef(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (user) {
      const emailOrUser = user.email || user.username || user.server_url || user.url || "";
      const cleanUser = emailOrUser ? String(emailOrUser).replace(/[^a-zA-Z0-9]/g, "") : "user";
      if (user?.multiUser) {
        setFinalAddress(`${cleanUser}/${user.profile || "default"}`);
      } else {
        setFinalAddress(cleanUser);
      }
    }
  }, [user]);

  const getFavs = async () => {
    if (!finalAddress) return;
    try {
      const favsRes = await getFavourites(action, finalAddress);
      if (favsRes?.val()) {
        const data = favsRes.val();
        const ids = Object.values(data).map((m) => String(m.stream_id || m.series_id || m.id));
        setFavouriteIds(ids);
      } else {
        setFavouriteIds([]);
      }

      const watchRes = await getWatchlist(action, finalAddress);
      if (watchRes?.val()) {
        const data = watchRes.val();
        const ids = Object.values(data).map((m) => String(m.stream_id || m.series_id || m.id));
        setMyListIds(ids);
      } else {
        setMyListIds([]);
      }
    } catch (e) {
      console.log("Error fetching favs in MoreLikeThis:", e);
    }
  };

  useEffect(() => {
    getFavs();
  }, [finalAddress, action]);

  const handleFavourites = async (id, isFav) => {
    if (!finalAddress) return;
    const strId = String(id);
    if (isFav) {
      setFavouriteIds((prev) => prev.filter((i) => i !== strId));
      if (alert?.toggle) alert.toggle({ title: "Removed from Favourites", show: true, type: "success" });
    } else {
      setFavouriteIds((prev) => [...prev, strId]);
      if (alert?.toggle) alert.toggle({ title: "Added to Favourites", show: true, type: "success" });
    }
    try {
      if (isFav) await removeFromFavs(strId, action, finalAddress);
      else await addToFavs(strId, action, finalAddress);
      getFavs();
    } catch (err) {
      console.log("Firebase sync error:", err);
    }
  };

  const handleMyList = async (id, isMyList) => {
    if (!finalAddress) return;
    const strId = String(id);
    if (isMyList) {
      setMyListIds((prev) => prev.filter((i) => i !== strId));
      if (alert?.toggle) alert.toggle({ title: "Removed from My List", show: true, type: "success" });
    } else {
      setMyListIds((prev) => [...prev, strId]);
      if (alert?.toggle) alert.toggle({ title: "Added to My List", show: true, type: "success" });
    }
    try {
      if (isMyList) await removeFromWatchlist(strId, action, finalAddress);
      else await addToWatchlist(strId, action, finalAddress);
      getFavs();
    } catch (err) {
      console.log("Firebase sync error:", err);
    }
  };

  const closeHoverCard = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setClosingHover(true);
    closeTimer.current = setTimeout(() => {
      setHoveredCard(null);
      setClosingHover(false);
    }, 220);
  };

  const handleCardMouseEnter = (e, item) => {
    if (!item) return;
    const target = e.currentTarget;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    if (!rect || (rect.width === 0 && rect.height === 0)) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setClosingHover(false);
    hoverTimer.current = setTimeout(() => {
      setHoveredCard({ item, rect });
    }, 220);
  };

  const handleCardMouseLeave = (e) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    const relatedTarget = e?.relatedTarget;
    if (relatedTarget && relatedTarget.closest && relatedTarget.closest(".hover-preview-card-portal")) {
      return;
    }
    closeHoverCard();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      setHoveredCard(null);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const HoverCard = () => {
    if (!hoveredCard || !hoveredCard.item || !hoveredCard.rect) return null;
    const { item, rect } = hoveredCard;
    const id = item.stream_id || item.series_id || item.id;
    const title = item.name || item.title || "";
    const imgUrl = item.cover || item.stream_icon || item.info?.cover;
    const rating = Number(item.rating || 0).toFixed(1);

    const isFavourite = favouriteIds.includes(String(id));
    const isMyList = myListIds.includes(String(id));

    const cardWidth = 380;
    const cardHeight = 470;
    let left = rect.left + rect.width / 2 - cardWidth / 2;
    let top = rect.top - 20;

    const screenW = windowSize.width || (typeof window !== "undefined" ? window.innerWidth : 1200);
    const screenH = windowSize.height || (typeof window !== "undefined" ? window.innerHeight : 800);

    if (left < 15) left = 15;
    if (left + cardWidth > screenW - 15) left = Math.max(15, screenW - cardWidth - 15);
    if (top < 85) top = Math.max(85, rect.top);
    if (top + cardHeight > screenH - 15) top = Math.max(85, screenH - cardHeight - 15);

    const handlePlayClick = () => {
      setHoveredCard(null);
      router.push(`/dashboard/preview/${action}/${id}?state=play`);
    };

    const handleInfoClick = () => {
      setHoveredCard(null);
      router.push(`/dashboard/preview/${action}/${id}`);
    };

    return (
      <div
        className={`hover-preview-card-portal ${closingHover ? "closing" : ""}`}
        style={{
          position: "fixed",
          top: top,
          left: left,
          width: cardWidth,
          zIndex: 99999,
        }}
        onMouseEnter={() => {
          if (hoverTimer.current) clearTimeout(hoverTimer.current);
          if (closeTimer.current) clearTimeout(closeTimer.current);
          setClosingHover(false);
        }}
        onMouseLeave={() => {
          closeHoverCard();
        }}
      >
        <div className="hover-card-inner">
          <div className="hover-card-thumb">
            <img src={imgUrl} alt={title} onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage.src || placeholderImage; }} />
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
                onClick={() => handleMyList(id, isMyList)}
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

              <button
                type="button"
                onClick={handleInfoClick}
                className="hover-card-info-btn"
                title="More Info"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </button>
            </div>

            <div className="hover-card-meta">
              <h4 className="hover-card-title">{title}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="more-like-this-container">
      <span className="h3">You May Also Like</span>
      <Swiper
        style={{ padding: 10, marginTop: '40px' }}
        slidesPerView={windowWidth ? Math.min((windowWidth - 20) / 205) : 7}
      >
        {propsMovies?.map((movie, index) => (
          <SwiperSlide key={index}>
            <div
              className="item"
              onMouseEnter={(e) => handleCardMouseEnter(e, movie)}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="caption">
                <span className="control">
                  {Number(movie.rating).toFixed(1) !== "NaN" && Number(movie.rating) !== 0 ? (
                    <span className="count">{Number(movie.rating).toFixed(1)}</span>
                  ) : (
                    <span />
                  )}
                </span>
                <span className="h2">{movie.name}</span>
              </div>
              <div className="thumb">
                {movie.stream_icon && movie.stream_icon.length > 0 ? (
                  <img src={movie.stream_icon} alt={movie.name} />
                ) : (
                  <Image alt="placeholder" layout="fill" src={placeholderImage} />
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <HoverCard />
    </div>
  );
};

export default MoreLikeThis;