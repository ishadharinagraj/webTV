import React, { useState, useEffect, useContext, useRef } from "react";
import "./styles.css";
import { useRouter } from 'next/router';
import ParentalLock from "@/utils/parentalLock";
import { AppContext } from "@/contexts/app";
import { getFavourites, addToFavs, removeFromFavs, addToWatchlist, removeFromWatchlist } from "@/firebase/functions";
import Image from "next/image";
import placeholderImage from "@/assets/placeholder.png";
import noContentFound from "@/assets/noContentFound.svg";
import { getParentalPin } from "@/utils/local";
import DashboardHeader from "../header";

const SearchedItems = () => {
    const router = useRouter();
    const { user, streamData } = useContext(AppContext);

    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [liveStreams, setLiveStreams] = useState([]);

    const [moviesFavs, setMoviesFavs] = useState([]);
    const [seriesFavs, setSeriesFavs] = useState([]);
    const [liveStreamsFavs, setLiveStreamsFavs] = useState([]);

    const [noData, setNoData] = useState(false);
    const [currentTab, setCurrentTab] = useState("Movies");
    const [showParentalLock, setShowParentalLock] = useState(false);
    const [currentSelected, setCurrentSelected] = useState([]);
    const [currentItem, setCurrentItem] = useState("");
    const [errorIndex, setErrorIndex] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [hoveredCard, setHoveredCard] = useState(null);
    const hoverTimer = useRef(null);

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

    const handleTab = (newtab) => {
        setCurrentTab(newtab);
        if (newtab === "Movies") {
            setCurrentSelected(movies);
        } else if (newtab === "Series") {
            setCurrentSelected(series);
        } else {
            setCurrentSelected(liveStreams);
        }
    };

    useEffect(() => {
        handleTab(currentTab);
    }, [movies, series, liveStreams]);

    useEffect(() => {
        if (user) {
            getFavs(setMoviesFavs, "Movie");
            getFavs(setSeriesFavs, "Series");
            getFavs(setLiveStreamsFavs, "LiveTv");
        }
    }, [user]);

    const getFavs = async (setFn, type) => {
        try {
            const response = await getFavourites(type, user.dbAddress);
            if (response.val()) {
                const data = Object.keys(response.val());
                setFn(data);
            } else {
                setFn([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const parentalPin = getParentalPin("currentUser");

    const isAdult = (data) => {
        if (!data || !streamData) return false;
        const adultArray = ["adult", "xxx", "porn", "sex", "adults", "ADULTS", "+18", "18+", "18"];
        const { streamCategories: moviesCategories = [] } = streamData.movies || {};
        const { streamCategories: seriesCategories = [] } = streamData.series || {};
        const { streamCategories: liveTvCategories = [] } = streamData.liveTv || {};
        const combinedCategories = currentTab === 'LiveTv' ? liveTvCategories :
            currentTab === 'Movies' ? moviesCategories :
                currentTab === "Series" ? seriesCategories : [];

        const { category_id, categories, category_ids } = data;
        let adultCategoryIds = [];
        adultArray.forEach(item => {
            const adultCategoryId = combinedCategories.filter(ctg => ctg?.category_name?.toLowerCase().includes(item.toLowerCase()))[0]?.category_id;
            if (adultCategoryId) {
                adultCategoryIds.push(adultCategoryId);
            }
        });
        const match = category_id ? category_id : categories ? categories[0] : category_ids ? category_ids[0] : null;
        return match && adultCategoryIds.filter(id => String(id) === String(match)).length > 0;
    };

    const handleItem = (item) => {
        const idKey = (currentTab === "Movies" || currentTab === "LiveTv") ? 'stream_id' : 'series_id';
        const streamId = item[idKey] || item.stream_id || item.series_id || item.id || item.num;
        setCurrentItem(item);
        if (currentTab === "LiveTv") {
            if (isAdult(item) && parentalPin) {
                setShowParentalLock(true);
            } else {
                router.push(`/dashboard/live?view=${streamId}`);
            }
        } else {
            if (isAdult(item) && parentalPin) {
                setShowParentalLock(true);
            } else {
                const type = currentTab === "Movies" ? "movies" : "series";
                router.push(`/dashboard/preview/${type}/${streamId}?state=play`);
            }
        }
    };

    const handlePinVerified = () => {
        const idKey = (currentTab === "Movies" || currentTab === "LiveTv") ? 'stream_id' : 'series_id';
        const streamId = currentItem[idKey] || currentItem.stream_id || currentItem.series_id || currentItem.id || currentItem.num;
        if (currentTab === "LiveTv") {
            router.push(`/dashboard/live?view=${streamId}`);
        } else {
            const type = currentTab === "Movies" ? "movies" : "series";
            router.push(`/dashboard/preview/${type}/${streamId}?state=play`);
        }
        setShowParentalLock(false);
    };

    const deduplicate = (arr, idKey) => {
        if (!arr || !Array.isArray(arr)) return [];
        const seen = new Set();
        return arr.filter(item => {
            const id = item[idKey] || item.stream_id || item.series_id || item.id || item.name;
            if (!id || seen.has(String(id))) return false;
            seen.add(String(id));
            return true;
        });
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (!value.trim()) {
            setMovies([]);
            setSeries([]);
            setLiveStreams([]);
            setNoData(false);
            return;
        }

        const searchedMovies = deduplicate((streamData.movies?.streams || []).filter(movie => movie?.name?.toLowerCase().includes(value.toLowerCase())), 'stream_id');
        const searchedSeries = deduplicate((streamData.series?.streams || []).filter(serie => serie?.name?.toLowerCase().includes(value.toLowerCase())), 'series_id');
        const searchedLiveStreams = deduplicate((streamData.liveTv?.streams || []).filter(stream => stream?.name?.toLowerCase().includes(value.toLowerCase())), 'stream_id');

        setMovies(searchedMovies);
        setSeries(searchedSeries);
        setLiveStreams(searchedLiveStreams);

        if (searchedMovies.length === 0 && searchedSeries.length === 0 && searchedLiveStreams.length === 0) {
            setNoData(true);
        } else {
            setNoData(false);
            if (searchedMovies.length > 0) {
                setCurrentTab("Movies");
            } else if (searchedSeries.length > 0) {
                setCurrentTab("Series");
            } else {
                setCurrentTab("LiveTv");
            }
        }
    };

    const HoverCard = () => {
        if (!hoveredCard || !hoveredCard.item || !hoveredCard.rect) return null;
        const { item, rect } = hoveredCard;
        const idKey = (currentTab === "Movies" || currentTab === "LiveTv") ? 'stream_id' : 'series_id';
        const id = item[idKey] || item.stream_id || item.series_id || item.id || item.num;
        const title = item.name || item.title || "";
        const imgUrl = item.stream_icon || item.cover;
        const rating = Number(item.rating || 0).toFixed(1);

        const cardWidth = 310;
        const cardHeight = 280;
        let left = rect.left + rect.width / 2 - cardWidth / 2;
        let top = rect.top - 15;

        const screenW = typeof window !== "undefined" ? window.innerWidth : 1200;
        const screenH = typeof window !== "undefined" ? window.innerHeight : 800;

        if (left < 15) left = 15;
        if (left + cardWidth > screenW - 15) left = Math.max(15, screenW - cardWidth - 15);
        if (top < 85) top = Math.max(85, rect.top);
        if (top + cardHeight > screenH - 15) top = Math.max(85, screenH - cardHeight - 15);

        const handlePlayClick = (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (!id) return;
            setHoveredCard(null);

            if (isAdult(item) && parentalPin) {
                setCurrentItem(item);
                setShowParentalLock(true);
                return;
            }

            if (currentTab === "LiveTv") {
                router.push(`/dashboard/live?view=${id}`);
            } else if (currentTab === "Series") {
                router.push(`/dashboard/preview/series/${id}?state=play&action=play`);
            } else {
                router.push(`/dashboard/preview/movies/${id}?state=play`);
            }
        };

        const favArr = currentTab === "Movies" ? moviesFavs : currentTab === "LiveTv" ? liveStreamsFavs : seriesFavs;
        const isFavourite = favArr.includes(String(id));

        const handleToggleMyList = async (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            const pathType = currentTab === "Movies" ? "Movie" : currentTab === "Series" ? "Series" : "LiveTv";
            try {
                if (isFavourite) {
                    await removeFromFavs(id, pathType, user.dbAddress);
                    await removeFromWatchlist(id, pathType, user.dbAddress);
                } else {
                    await addToFavs(id, pathType, user.dbAddress);
                    await addToWatchlist(item, pathType, user.dbAddress);
                }
                getFavs(setMoviesFavs, "Movie");
                getFavs(setSeriesFavs, "Series");
                getFavs(setLiveStreamsFavs, "LiveTv");
            } catch (err) {
                console.log("Toggle fav error", err);
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
                        {imgUrl ? (
                            <img
                                src={imgUrl}
                                alt={title}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = placeholderImage.src || placeholderImage;
                                }}
                            />
                        ) : (
                            <Image alt="placeholder" layout="fill" objectFit="contain" src={placeholderImage} />
                        )}
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
                                onClick={handleToggleMyList}
                                title={isFavourite ? "Remove from My List" : "Add to My List"}
                                type="button"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "8px",
                                    background: isFavourite ? "rgba(99, 102, 241, 0.25)" : "rgba(255, 255, 255, 0.12)",
                                    border: isFavourite ? "1px solid #6366f1" : "1px solid rgba(255, 255, 255, 0.2)",
                                    color: isFavourite ? "#818cf8" : "#ffffff",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                {isFavourite ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <div className="hover-card-meta">
                            <h4 className="hover-card-title">{title}</h4>
                            {rating !== "NaN" && Number(rating) > 0 && (
                                <div className="hover-card-tags">
                                    <span className="hover-tag rating">★ {rating}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="searched-items">
            <DashboardHeader currentAction="search" />

            <div className="searched-items-container">
                <div className="search-input-container">
                    <div className="search-input-wrapper">
                        <svg className="search-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            value={searchTerm}
                            onChange={handleSearch}
                            className="search-input"
                            type="text"
                            placeholder="Search by Channel, Movies, and Series Name..."
                            autoFocus
                        />
                    </div>
                </div>

                {!noData && (movies.length > 0 || series.length > 0 || liveStreams.length > 0) && (
                    <div className="tabs-container">
                        {movies.length > 0 && (
                            <div onClick={() => handleTab("Movies")} className={`tab ${currentTab === "Movies" ? "active" : ""}`}>
                                <span className="tab-title">Movies</span>
                                <span className="tab-count">{movies.length}</span>
                            </div>
                        )}
                        {series.length > 0 && (
                            <div onClick={() => handleTab("Series")} className={`tab ${currentTab === "Series" ? "active" : ""}`}>
                                <span className="tab-title">Series</span>
                                <span className="tab-count">{series.length}</span>
                            </div>
                        )}
                        {liveStreams.length > 0 && (
                            <div onClick={() => handleTab("LiveTv")} className={`tab ${currentTab === "LiveTv" ? "active" : ""}`}>
                                <span className="tab-title">Live TV</span>
                                <span className="tab-count">{liveStreams.length}</span>
                            </div>
                        )}
                    </div>
                )}

                {!noData && currentSelected.length > 0 && (
                    <div className="search-results-grid">
                        {currentSelected.map((item, index) => {
                            const idKey = (currentTab === "Movies" || currentTab === "LiveTv") ? "stream_id" : "series_id";
                            const itemId = item[idKey] || item.stream_id || item.series_id || item.id || item.num;
                            const imgUrl = item.stream_icon || item.cover;
                            const rating = Number(item.rating).toFixed(1);

                            return (
                                <div
                                    key={itemId || index}
                                    onClick={() => handleItem(item)}
                                    onMouseEnter={(e) => handleCardMouseEnter(e, item)}
                                    onMouseLeave={handleCardMouseLeave}
                                    className="item"
                                >
                                    <div className="thumb">
                                        {imgUrl ? (
                                            <img
                                                src={imgUrl}
                                                alt={item.name}
                                                style={{
                                                    filter: (isAdult(item) && parentalPin) ? "blur(20px)" : "none"
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
                                        </div>
                                        <span className="h2">{item.name}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {noData && (
                    <div className="no-data-found-container">
                        <Image alt="no content" src={noContentFound} />
                        <h2 className="no-data-found">No results found for "{searchTerm}"</h2>
                    </div>
                )}

                {!noData && !searchTerm && (
                    <div className="no-data-found-container" style={{ paddingTop: 60 }}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <h2 style={{ color: "#ffffff", marginTop: 12 }}>Search for Movies, Series, or Live Channels</h2>
                        <p style={{ color: "#94a3b8", fontSize: 14 }}>Type in the search box above to browse titles across all categories.</p>
                    </div>
                )}

                <ParentalLock close={() => setShowParentalLock(false)} open={showParentalLock} completed={handlePinVerified} action={"verify"} />
            </div>

            <HoverCard />
        </div>
    );
};

export default SearchedItems;