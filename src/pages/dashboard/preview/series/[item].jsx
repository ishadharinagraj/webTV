import { endpoint } from '@/config/endpoints';
import { Backdrop, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router'
import React, { useEffect, useState, useContext, useRef, useMemo } from 'react'
import "./styles.css"
import DashboardHeader from '../../header';
import { AppContext } from '@/contexts/app';
import useApi from '@/hooks/useApi';
import VideoJsPlayer from '@/utils/player/videojs';
import { AES, enc } from 'crypto-js';
import { addToFavs, addToWatchlist, getParticluarTimeline, getValue, getWatchlist, removeFromFavs, removeFromWatchlist } from '@/firebase/functions';
import ReactPlayer from 'react-player';
import { CloseOutlined } from '@mui/icons-material';
import ParentalLock from '@/utils/parentalLock';
import Loading from '@/utils/loading';
import Watched from '@/utils/progress';
import placeholder from "@/assets/placeholder.png"
import Image from 'next/image';
import Player from '@/utils/player';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SeriesPreview = () => {
    const router = useRouter();
    const { item, state } = router.query;
    const reactPlayerRef = useRef(null);
    const { makeRequest } = useApi();
    const { user, alert, streamData, parentalVerified, currentPlayer } = useContext(AppContext)
    const [series, setSeries] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [playerOpen, setPlayerOpen] = useState(false);
    const [streamUrl, setStreamUrl] = useState("");
    const [currentEpisode, setCurrentEpisode] = useState(0);
    const [episodes, setEpisodes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPlaying, setCurrentPlaying] = useState(0)
    const [addedToFav, setAddedToFav] = useState(false);
    const [addedToWatchlist, setAddedToWatchlist] = useState(false);
    const [finalAddress, setFinalAddress] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const [ytPlayerReady, setYtPlayerReady] = useState(false);
    const [watchedEpisodes, setWatchedEpisodes] = useState({
        episodes: [],
        keys: []
    });
    const [timeline, setTimeline] = useState(0);
    const [adult, setAdult] = useState(false);
    const [watchedEpisode, setWatchedEpisode] = useState({
        episodeId: '',
        watched: 0
    });
    const [addingToFav, setAddingToFav] = useState(false);
    const [currentKeys, setCurrentKeys] = useState(null);

    const secondsToHms = (d) => {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor((d % 3600) / 60);
        var s = Math.floor((d % 3600) % 60);

        var hDisplay = h > 0 ? h + "h " : "";
        var mDisplay = m > 0 ? m + "m" : "";
        return (hDisplay + mDisplay).trim();
    }

    const getEpisodeTimeline = async (action, episodeId, fetchData) => {
        setLoading(true);
        try {
            const response = await getParticluarTimeline(item, 'Series', finalAddress);
            if (response.val()) {
                const recentEpisodes = Object.values(response.val());
                const epsdKeys = Object.keys(response.val());
                if (fetchData) {
                    setWatchedEpisodes({
                        episodes: response.val(),
                        keys: epsdKeys
                    });
                } else {

                    const formattedRecentEpisodes = recentEpisodes.slice(0, recentEpisodes.length - 1);
                    const lastWatched = formattedRecentEpisodes.filter(epsd => epsd.lastWatched === 'true')[0];
                    const index = formattedRecentEpisodes.indexOf(lastWatched);
                    const { season, timeline, duration } = action === 'next' ? response.val()[user.loginType === "one-stream-panel" ? String(episodeId) : Number(episodeId)] : lastWatched;
                    const episode = epsdKeys[index]
                    const watchedTime = (timeline / duration) * 100;
                    setWatchedEpisodes({
                        episodes: response.val(),
                        keys: epsdKeys
                    });
                    setSelectedSeason(Number(season));
                    setTimeline(timeline);
                    const watchedEp = {
                        episodeId: episode,
                        watched: watchedTime
                    }
                    if (action === 'play') {

                        handlePlay(series.episodes[Number(season)].filter(epsd => epsd.id === episode)[0], {
                            episodes: response.val(),
                            keys: epsdKeys
                        });

                    } else {
                        if (response.val() && state === 'play') {
                            handlePlay(series.episodes[Number(season)].filter(epsd => epsd.id === episode)[0], {
                                episodes: response.val(),
                                keys: epsdKeys
                            });
                        }
                    }
                    setWatchedEpisode({
                        episodeId: episode,
                        watched: watchedTime
                    });
                }

            } else {
                if (action === "play") {

                    handlePlay(series.episodes[selectedSeason][0]);
                }
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            if (action === "play") {

                handlePlay(series.episodes[selectedSeason][0]);
            }
            setLoading(false);
        }

    }

    useEffect(() => {
        if (item && user) {
            setFinalAddress(user.dbAddress);
            getSeries();
            setCurrentKeys(() => {
                if (user.loginType === "one-stream-panel") {
                    return {
                        releaseDate: 'release_date'
                    }
                } else {
                    return {
                        releaseDate: 'releaseDate'
                    }
                }

            })
        }
    }, [item, user, state]);

    useEffect(() => {
        if (finalAddress) {
            checkFav(finalAddress);
            checkWatchlist(finalAddress);
        }
    }, [finalAddress]);


    useEffect(() => {
        if (series) {
            setEpisodes(series.episodes[selectedSeason]);

        }
    }, [selectedSeason, series])

    useEffect(() => {
        if (series) {
            getEpisodeTimeline();
            if (getParentalPin("currentUser") && !parentalVerified.status) {
                isAdult();
            }
        }
    }, [series])

    useEffect(() => {
        if (state !== 'play') {
            setPlayerOpen(false)
        }
    }, [state]);

    const getParentalPin = (key) => {
        if (!key || typeof window === 'undefined') {
            return ""
        }
        const retrievedUser = Object.values(JSON.parse(localStorage.getItem(key)))[0].parentalPin;
        return retrievedUser;
    }

    const isAdult = async () => {
        const adultArray = ["adult", "xxx", "porn", "sex", "adults", "ADULTS", "+18", "18+", "18"];
        const parentalPin = getParentalPin('currentUser');
        if (parentalPin) {
            if (streamData.series.streamCategories) {

                const category_id = series.info.category_id;
                const category = streamData.series.streamCategories.filter(cat => String(cat.category_id) === String(category_id))[0]?.category_name
                if (category) {

                    const isAdult = adultArray.filter(item => category.toLowerCase().includes(item.toLowerCase())).length > 0;
                    setAdult(isAdult);
                }
            }
        }
    }

    const getSeries = async () => {
        try {
            const response = await makeRequest().get(`${endpoint.getSerie}?series_id=${item}`);
            setSeries(response.data.message);
        } catch (error) {
            console.log(error)
        }
    }

    const handleFavourites = async () => {
        setAddingToFav(true);
        if (addedToFav) {
            try {
                await removeFromFavs(item, "Series", finalAddress);
                alert.toggle({
                    title: "Removed from Favourites",
                    show: true,
                    type: "info"
                })
            } catch (error) {
                console.log(error);
            }
            checkFav(finalAddress);
            setAddingToFav(false);

        } else {
            try {
                await addToFavs(series?.info || { series_id: item }, "Series", finalAddress);
                alert.toggle({
                    title: "Added to Favourites",
                    show: true,
                    type: "success"
                })
            } catch (error) {
                console.log(error);
            }
            checkFav(finalAddress);
            setAddingToFav(false);

        }
    };

    const checkFav = async (address) => {
        try {
            const response = await getValue(item, "Series", address);
            const added = await response.val();
            setAddedToFav(Boolean(added));
        } catch (error) {
            console.log(error);
        }
    }

    const checkWatchlist = async (address) => {
        try {
            const watchlistData = await getWatchlist("Series", address);
            if (watchlistData.val()) {
                const list = Object.values(watchlistData.val());
                const exists = list.some(
                    (itemObj) => String(itemObj.series_id || itemObj.id) === String(item)
                );
                setAddedToWatchlist(exists);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleWatchlist = async () => {
        try {
            if (addedToWatchlist) {
                await removeFromWatchlist(item, "Series", finalAddress);
                setAddedToWatchlist(false);
                alert.toggle({
                    title: "Removed from My List",
                    show: true,
                    type: "info"
                });
            } else {
                await addToWatchlist(series?.info || { series_id: item }, "Series", finalAddress);
                setAddedToWatchlist(true);
                alert.toggle({
                    title: "Added to My List",
                    show: true,
                    type: "success"
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const relatedSeries = useMemo(() => {
        const seriesList = Array.isArray(streamData?.series)
            ? streamData.series
            : streamData?.series?.streams;
        if (!seriesList || !Array.isArray(seriesList) || !series?.info?.category_id) return [];
        return seriesList
            .filter(
                (s) =>
                    String(s.category_id) === String(series.info.category_id) &&
                    String(s.series_id || s.id) !== String(item)
            )
            .slice(0, 6);
    }, [streamData, series, item]);

    const Episode = ({ episode, index }) => {
        const isWatched = watchedEpisodes.keys.filter(key => String(key) === String(episode.id)).length > 0;
        const watched = isWatched && (watchedEpisodes.episodes[episode.id].timeline / watchedEpisodes.episodes[episode.id].duration) * 100;
        const episodeNumber = episode.episode_num || (index + 1);
        const duration = episode.info?.duration_secs ? secondsToHms(episode.info.duration_secs) : "";
        const thumbUrl = episode.info?.movie_image || series?.info?.cover || placeholder;

        return (
            <div className="netflix-episode-row" onClick={() => handlePlay(episode, null)}>
                <div className="netflix-ep-number">{episodeNumber}</div>
                <div className="netflix-ep-thumb-container">
                    <img
                        src={thumbUrl}
                        onError={(e) => { e.target.src = "/placeholder.png"; }}
                        alt={episode.title}
                    />
                    <div className="netflix-ep-play-btn">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                    </div>
                    {watched > 0 && <Watched progress={watched} />}
                </div>
                <div className="netflix-ep-details">
                    <div className="netflix-ep-title-row">
                        <span className="netflix-ep-title">{episodeNumber}. {episode.title}</span>
                        {duration && <span className="netflix-ep-duration">{duration}</span>}
                    </div>
                    <p className="netflix-ep-plot">
                        {episode.info?.plot || "No description available for this episode."}
                    </p>
                </div>
            </div>
        );
    }

    const handleSeason = (e) => {
        const { value } = e.target;
        setSelectedSeason(Number(value) + 1);
    }

    const handlePlay = (episode, wathchedEpsd) => {
        const { username, password, serverInfo } = user;
        const server = AES.decrypt(user.server, "thisisserveraddress").toString(enc.Utf8);
        const decryptedPassword = AES.decrypt(password, "thisispassword").toString(enc.Utf8);
        const watchedEpsd = (wathchedEpsd ? wathchedEpsd : watchedEpisodes).episodes[user.loginType === "one-stream-panel" ? String(episode.id) : Number(episode.id)]
        if (watchedEpsd) {
            const { timeline, duration } = watchedEpsd;
            setTimeline(timeline)
        } else {
            setTimeline(0)
        }

        setStreamUrl(
            user.loginType === "one-stream-panel" ?
                Object.values(episode.links)[0] :
                `${server}/series/${username}/${decryptedPassword}/${episode.id}.${episode.container_extension}`
        )
        setPlayerOpen(true);
        setCurrentPlaying(episode);
        setCurrentEpisode(episode);

    }

    const onNextEpisode = () => {
        const { username, password, serverPrefix } = user;
        const { episodes } = series;
        const server = AES.decrypt(serverPrefix, "thisisserveraddress").toString(enc.Utf8);
        const decryptedPassword = AES.decrypt(password, "thisispassword").toString(enc.Utf8);
        const isLastEpisode = episodes[selectedSeason][episodes[selectedSeason].length - 1].id === currentPlaying.id;
        const isLastSeason = Object.keys(episodes).length === selectedSeason;
        const isLast = (isLastEpisode && isLastSeason);

        if (!isLast) {
            setLoading(true);
            const episode = episodes[isLastEpisode ? selectedSeason + 1 : selectedSeason][isLastEpisode ? 0 : currentEpisode.episode_num];
            const isWatched = watchedEpisodes.keys.filter(key => String(key) === String(episode.id))[0]
            if (isWatched) {
                setTimeline(watchedEpisodes.episodes[isWatched].timeline)
            } else {
                setTimeline(0)
            }
            setPlayerOpen(false);
            setCurrentEpisode(episode);
            setCurrentPlaying(episode)
            setSelectedSeason(isLastEpisode ? selectedSeason + 1 : selectedSeason);
            setStreamUrl(
                user.loginType === "one-stream-panel" ?
                    Object.values(episode.links)[0] :
                    `${server}/series/${username}/${decryptedPassword}/${episode.id}.${episode.container_extension}`
            )
            setTimeout(() => {
                setLoading(false)
                setPlayerOpen(true)
            }, 1000);
            getEpisodeTimeline(null, null, true);
        } else {
            setPlayerOpen(false);
        }
    }

    const playEpisode = (season, episodeToPlay) => {
        setLoading(true);

        const episodeNum = episodeToPlay.episode_num;
        const { episodeId } = episodeToPlay
        const watchedEpsd = watchedEpisodes.episodes[user.loginType === "one-stream-panel" ? String(episodeId) : Number(episodeId)]
        if (watchedEpsd) {
            const { timeline, duration } = watchedEpsd;
            setTimeline(timeline)

        } else {
            setTimeline(0)
        }
        setPlayerOpen(false);
        const { username, password, serverPrefix } = user;
        const { episodes } = series;
        const episode = episodes[season][episodeNum - 1];
        const server = AES.decrypt(serverPrefix, "thisisserveraddress").toString(enc.Utf8);
        const decryptedPassword = AES.decrypt(password, "thisispassword").toString(enc.Utf8);   
        setCurrentEpisode(episode);
        setStreamUrl(
            user.loginType === "one-stream-panel" ?
                Object.values(episode.links)[0] :
                `${server}/series/${username}/${decryptedPassword}/${episode.id}.${episode.container_extension}`
        )
        setTimeout(() => {
            setLoading(false)
            setPlayerOpen(true)
        }, 1000);
        getEpisodeTimeline(null, null, true);

    }

    const handleTrailer = () => {
        setShowTrailer(true);
        reactPlayerRef.current.seekTo(0, "seconds")
    };

    const handleClose = () => {
        checkFav(user?.dbAddress)
        if (state === "play") {
            router.push(`/dashboard?view=series`)
        } else {
            setTimeout(() => {
                getEpisodeTimeline();
            }, 1000);
            setPlayerOpen(false)
        }
    };

    const handleCloseTrailer = () => {
        reactPlayerRef.current.seekTo(0)
        setShowTrailer(false)
    }

    return loading ? (
        <Loading />
    ) : (
        <div className="netflix-series-container">
            {!playerOpen && <DashboardHeader currentAction={"series"} />}

            <div className="netflix-series-modal">
                {/* Hero Banner Section */}
                <div
                    className="netflix-hero-banner"
                    style={{
                        backgroundImage: `url(${
                            (series.info.backdrop_path && series.info.backdrop_path.length > 0)
                                ? series.info.backdrop_path[0]
                                : series.info.cover
                        })`,
                    }}
                >
                    <div className="hero-overlay"></div>
                    <div className="netflix-hero-content">
                        <h1 className="netflix-hero-title">{series?.info.name}</h1>
                        <div className="netflix-hero-action-bar">
                            <button
                                onClick={() => getEpisodeTimeline("play", null, null)}
                                className="netflix-btn-play"
                                type="button"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                                {watchedEpisode && watchedEpisode.watched > 0 ? "Resume" : "Play"}
                            </button>

                            {/* My List (+) Button */}
                            <button
                                onClick={handleWatchlist}
                                className="netflix-btn-icon"
                                title={addedToWatchlist ? "Remove from My List" : "Add to My List"}
                                type="button"
                            >
                                {addedToWatchlist ? (
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ) : (
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                )}
                            </button>

                            {/* Favourite (Heart) Button */}
                            <button
                                onClick={handleFavourites}
                                className="netflix-btn-icon"
                                title={addedToFav ? "Remove from Favourites" : "Add to Favourites"}
                                type="button"
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill={addedToFav ? "#ff0000" : "none"} stroke={addedToFav ? "#ff0000" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                            </button>

                            {ytPlayerReady && (
                                <button onClick={handleTrailer} className="netflix-btn-trailer" type="button">
                                    🎥 Watch Trailer
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Details Body */}
                <div className="netflix-details-body">
                    {/* Metadata Row */}
                    <div className="netflix-meta-row">
                        {Number(series?.info?.rating) > 0 && (
                            <span className="netflix-match-badge">
                                ★ {Number(series?.info?.rating).toFixed(1)} Rating
                            </span>
                        )}
                        {series?.info[currentKeys?.releaseDate] && (
                            <span className="netflix-year-badge">
                                {series?.info[currentKeys?.releaseDate]}
                            </span>
                        )}
                        <span className="netflix-age-badge">18+</span>
                        <span className="netflix-seasons-badge">
                            {Object.keys(series?.episodes || {}).length} Seasons
                        </span>
                        <span className="netflix-hd-badge">HD</span>
                    </div>

                    {/* Overview 2-Column Grid */}
                    <div className="netflix-overview-grid">
                        <div className="netflix-plot-text">
                            {series?.info?.plot || "No description available for this series."}
                        </div>
                        <div className="netflix-credits-col">
                            {series?.info?.cast && (
                                <div>
                                    <strong>Cast: </strong> {series.info.cast}
                                </div>
                            )}
                            {series?.info?.director && (
                                <div>
                                    <strong>Director: </strong> {series.info.director}
                                </div>
                            )}
                            {series?.info?.genre && (
                                <div>
                                    <strong>Genre: </strong> {series.info.genre}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Episodes Section */}
                    <section className="netflix-episodes-section">
                        <div className="netflix-episodes-header">
                            <h3>Episodes</h3>
                            <div className="netflix-season-select-wrapper">
                                <select
                                    className="netflix-season-select"
                                    value={selectedSeason - 1}
                                    onChange={handleSeason}
                                >
                                    {Object.keys(series?.episodes || {}).map((seasonKey, sIdx) => (
                                        <option key={sIdx} value={sIdx}>
                                            Season {seasonKey}
                                        </option>
                                    ))}
                                </select>
                                <ArrowDropDownIcon className="select-arrow" />
                            </div>
                        </div>

                        <div className="netflix-episodes-list">
                            {series.episodes[selectedSeason]?.map((episode, epIndex) => (
                                <Episode key={epIndex} episode={episode} index={epIndex} />
                            ))}
                        </div>
                    </section>

                    {/* More Like This Recommendations */}
                    {relatedSeries.length > 0 && (
                        <section className="netflix-recommendations-section">
                            <h3>More Like This</h3>
                            <div className="netflix-rec-grid">
                                {relatedSeries.map((rec, rIdx) => (
                                    <div
                                        key={rIdx}
                                        className="netflix-rec-card"
                                        onClick={() => router.push(`/dashboard/preview/series/${rec.series_id}`)}
                                    >
                                        <div className="netflix-rec-thumb">
                                            <img
                                                src={rec.cover || placeholder}
                                                onError={(e) => { e.target.src = "/placeholder.png"; }}
                                                alt={rec.name}
                                            />
                                        </div>
                                        <div className="netflix-rec-info">
                                            <div className="netflix-rec-meta">
                                                <span className="netflix-match-badge">
                                                    ★ {Number(rec.rating || 7.5).toFixed(1)}
                                                </span>
                                                <span className="netflix-hd-badge">HD</span>
                                            </div>
                                            <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#fff", margin: "0 0 6px 0" }}>
                                                {rec.name}
                                            </h4>
                                            <p className="netflix-rec-plot">
                                                {rec.plot || "Watch similar TV shows and series."}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* Trailer & Player Modals */}
            <div>
                {showTrailer && (
                    <CloseOutlined onClick={handleCloseTrailer} className="close-icon" />
                )}
                <ReactPlayer
                    onError={() => setShowTrailer(false)}
                    url={`https://www.youtube.com/watch?v=${series?.info?.youtube_trailer}`}
                    width={"100%"}
                    height={"100%"}
                    onReady={() => setYtPlayerReady(true)}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        zIndex: 9999,
                        visibility: showTrailer ? "visible" : "hidden",
                        opacity: showTrailer ? 1 : 0,
                        transition: ".4s"
                    }}
                    playing={showTrailer}
                    config={{
                        youtube: {
                            playerVars: {
                                fullscreen: true,
                            }
                        }
                    }}
                    ref={reactPlayerRef}
                />
            </div>

            {playerOpen ? (
                currentPlayer.player === 'videojs' ? (
                    <VideoJsPlayer
                        close={handleClose}
                        src={streamUrl}
                        selectedSeason={selectedSeason}
                        series={series}
                        id={item}
                        watchedEpisodes={watchedEpisodes}
                        type="series"
                        timeline={timeline}
                        episodes={episodes}
                        onNext={onNextEpisode}
                        seasonChanged={e => setSelectedSeason(Number(e))}
                        currentPlaying={currentPlaying}
                        setCurrentPlaying={(epsd) => setCurrentPlaying(epsd)}
                        playEpisode={(data) => playEpisode(data.season, data)}
                    />
                ) : (
                    <Player
                        close={handleClose}
                        src={streamUrl}
                        selectedSeason={selectedSeason}
                        series={series}
                        id={item}
                        watchedEpisodes={watchedEpisodes}
                        type="series"
                        timeline={timeline}
                        episodes={episodes}
                        onNext={onNextEpisode}
                        seasonChanged={e => setSelectedSeason(Number(e))}
                        currentPlaying={currentPlaying}
                        setCurrentPlaying={(epsd) => setCurrentPlaying(epsd)}
                        playEpisode={(data) => playEpisode(data.season, data)}
                    />
                )
            ) : null}

            <ParentalLock
                action={"verify"}
                close={() => setAdult(false)}
                open={adult}
                noEscape={true}
                completed={() => setAdult(false)}
            />
        </div>
    );
}

export default SeriesPreview
