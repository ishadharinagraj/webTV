import React, { useState, useEffect, useContext, useRef } from 'react'
import DashboardHeader from '../../header';
import useApi from '@/hooks/useApi';
import { endpoint } from '@/config/endpoints';
import { AppContext } from '@/contexts/app';
import Loading from '@/utils/loading';
import { Alert, Backdrop, CircularProgress, Slider } from '@mui/material';
import "./styles.css"
import LiveTVPlayer from '../player';
import { AES, enc } from 'crypto-js';
import { addToFavs, getFavourites, getRecents, removeFromFavs, removeMovieFromRecents, saveWatchedContent } from '@/firebase/functions';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import ParentalLock from '@/utils/parentalLock';
import { getParentalPin } from '@/utils/local';
import { Cancel } from '@mui/icons-material';
import Image from 'next/image';
import noContentFound from "@/assets/noContentFound.svg"
import placeholderImage from "@/assets/placeholder.png"
import lockIcon from "@/assets/lockIcon.svg"
import VideoJSPlayer from '@/utils/player2';
import { getDatabase, onValue, ref } from 'firebase/database';
import { app } from '@/firebase';
import NoEpg from './noEpg';

const LiveTv = () => {
    const router = useRouter();
    const liveStreamsRef = useRef(null)
    const { makeRequest } = useApi();
    const { view } = useRouter().query;
    const { user, alert, streamData, currentPlayer, epgSrc, theme } = useContext(AppContext);
    const { liveTv } = streamData;
    const [liveCategories, setLiveCategories] = useState([]);
    const [searchedCategories, setSearchedCategories] = useState([]);
    const [searchedChannels, setSearchedChannels] = useState([]);
    const [liveStreams, setLiveStreams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentLiveStreams, setCurrentLiveStreams] = useState([]);
    const [epgs, setEpgs] = useState([]);
    const [externalEgps, setExternalEgps] = useState([]);
    const [playerSrc, setPlayerSrc] = useState(null);
    const [favourites, setFavourites] = useState([]);
    const [progress, setProgress] = useState(0);
    const [currentStreamId, setCurrentStreamId] = useState(null);
    const [currentStream, setCurrentStream] = useState(null);
    const [timerStart, setTimerStart] = useState(false);
    const [favouriteChannels, setFavouriteChannels] = useState([]);
    const [channelHistory, setChannelHistory] = useState([]);
    const [searchOn, setSearchOn] = useState(false);
    const [searchChannelOn, setSearchChannelOn] = useState(false);
    const [showExtraCtg, setShowExtraCtg] = useState({
        favourite: true,
        channelHistory: true
    });
    const [idExists, setIdExists] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [isAdult, setIsAdult] = useState(false);
    const [pinVerified, setPinVerified] = useState(false);
    const [noData, setNoData] = useState(false);
    const [onceAutoPlayed, setOnceAutoPlayed] = useState(false);
    const parentalPin = getParentalPin("currentUser");
    const [searchedValue, setSearchedValue] = useState('');
    const [searchedChannel, setSearchedChannel] = useState('');
    const [errorIndex, setErrorIndex] = useState(null);
    const [clickedAdultCtg, setClickedAdultCtg] = useState(null);
    const [screenWidth, setScreenWidth] = useState(0);
    const [currentEpg, setCurrentEpg] = useState(null);
    const [filteredStreams,setFilteredStreams]= useState();

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

    const database = getDatabase(app);
    useEffect(() => {
        if (user) {
            getLiveData(endpoint.getLiveCategories, setLiveCategories, "categories");
            getLiveData(endpoint.getLiveStreams, setLiveStreams, "streams");
            onValue(ref(database, `${user.dbAddress}/Fav/LiveTv`), (snapshot) => {
                getFavouriteChannels()
            });
            onValue(ref(database, `${user.dbAddress}/Recent/LiveTv`), (snapshot) => {
                getChannelHistory()
            });
        }
    }, [user]);

    useEffect(() => {
        if (user && liveTv.streams && selectedCategory) {
            // setCurrentLiveStreams([])
            getFavouriteChannels();
            getChannelHistory();
            getCurrentLiveStreams(false,false);
            // liveStreamsRef.current.scrollTo(0, 500)
        }
    }, [user, liveTv.streams, selectedCategory])

    useEffect(() => {
        if (liveCategories.length > 0 && liveTv.streams) {
            if (view) {
                const categoryId = liveTv.streams.filter(stream => String(stream.stream_id) === String(view))[0].category_id ?
                    liveTv.streams.filter(stream => String(stream.stream_id) === String(view))[0].category_id :
                    liveTv.streams.filter(stream => String(stream.stream_id) === String(view))[0].categories[0];
                const foundedCategory = liveCategories.filter(ctg => String(ctg.category_id) === String(categoryId))[0]
                const currentStrm = liveTv.streams.filter( stream => String(stream.stream_id) === view )[0];
                setSelectedCategory(foundedCategory)
                setCurrentStreamId(view);
                setCurrentStream(currentStrm);

            } else {
                setSelectedCategory(liveCategories[0]);
                const streams = filteredStreams?.filter(stream => String(stream.category_id ? stream.category_id: stream.categories && stream.categories.length > 0  ? stream.categories[0] : stream.category_ids[0]) === String(liveCategories[0].category_id ? liveCategories[0].category_id : liveCategories.categories[0]));
                setCurrentStreamId(streams[0]?.stream_id)
                setCurrentStream(streams[0])
                getCurrentLiveStreams(null, true)
            }
        }
    }, [liveCategories, liveTv.streams]);

    useEffect(() => {
        // setCurrentLiveStreams([]);
        if (selectedCategory && liveTv.streams && liveStreamsRef.current) {
            getCurrentLiveStreams(false,false);
            getChannelHistory();
            getFavouriteChannels();
            liveStreamsRef.current.scrollTo(0, 0);
        }
    }, [selectedCategory, liveTv.streams, liveStreamsRef]);

    // useEffect(() => {
    //     if (externalEgps.length > 0 && epgContainerRef.current && epgSrc.currentEpgSrc && epgSrc.currentEpgSrc.data) {
    //         currentProgress();
    //         setTimerStart(true)
    //         const currentEpgIndex = externalEgps.indexOf(externalEgps.filter(epg => {
    //             const isFinished = epg.timings.isTimePassed;
    //             const currentRunning = epg.timings.isWithinTime;
    //             return currentRunning;
    //         })[0]);
    //         const formattedEpgIndex = currentEpgIndex < 0 ? 1 : currentEpgIndex
    //             setCurrentEpg(externalEgps[currentEpgIndex]);
    //         epgContainerRef.current.scrollTo({
    //             top: (formattedEpgIndex) * (screenWidth > 768 ? 40 : 30),
    //             behavior: "smooth"
    //         })
    //     }
    // }, [externalEgps, epgContainerRef.current]);

    useEffect(() => {
        if ( currentStream) {
            getShortEpg(currentStream.stream_id, false);
        }
    }, [ currentStream])

    useEffect(() => {
        if (view) {
            setIdExists(true);
        } else {
            setIdExists(false);
        }
    }, [view])

    useEffect(() => {
        if (currentStreamId && timerStart && epgs.length > 0) {

            const currentTime = new Date().getTime();
            const formattedEndDate = typeof epgs[0].end === 'number' ? DateTime.fromSeconds(epgs[0].end, { zone: timeZone }).toFormat('yyyy-MM-dd HH:mm:ss') : epgs[0].end;
            const episodeEndTIme = DateTime.fromFormat(formattedEndDate, 'yyyy-MM-dd HH:mm:ss', { zone: timeZone }).setZone('Asia/Kolkata');
            const endTime = new Date(episodeEndTIme).getTime() + 100000;
            const delay = (endTime - currentTime);
            if (delay > 0) {
                const timer = setTimeout(() => {
                    handleEpg(currentLiveStreams.filter(stream => String(stream.stream_id) === String(currentStreamId))[0])
                }, delay);
                return () => clearTimeout(timer);
            };
           
        }
    }, [currentStreamId, timerStart, epgs]);

    useEffect(() => {
        if (epgs.length > 0){
            setCurrentEpg({
                ...epgs[0],
                start: formattedStartTime(epgs[0].start ? epgs[0].start : epgs[0].start_timestamp),
                end : formattedStartTime(epgs[0].stop ? epgs[0].stop : epgs[0].end ? epgs[0].end : epgs[0].timestamp),
                stop : formattedStartTime(epgs[0].stop ? epgs[0].stop : epgs[0].end ? epgs[0].end : epgs[0].timestamp),
            })
        }
    },[epgs])

    useEffect(() => {
        setScreenWidth(window.innerWidth);
    }, []);

    const timeZone = (user && user.loginType !== 'm3u') ? JSON.parse(AES.decrypt(user.serverInfo, "thisisserverinfo").toString(enc.Utf8)).timezone : 'America/NewYork'

    function formatDateToYYYYMMDDHHMMSS(inputDate, notTimestamp) {
        if (notTimestamp) {
            const year = inputDate.slice(0, 4);
            const month = inputDate.slice(4, 6);
            const day = inputDate.slice(6, 8);
            const hours = inputDate.slice(8, 10);
            const minutes = inputDate.slice(10, 12);
            const seconds = inputDate.slice(12, 14);
            const formattedTimestamp = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

            return formattedTimestamp;
        }

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

    function convertToTimezone(timestamp, dt) {
        // Extract date and time components from the timestamp
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const year = timestamp.slice(0, 4);
        const month = timestamp.slice(4, 6);
        const day = timestamp.slice(6, 8);
        const hour = timestamp.slice(8, 10);
        const minute = timestamp.slice(10, 12);
        const second = timestamp.slice(12, 14);
        let sign = timestamp.slice(15, 16); // Extract the sign
        let offsetHours = parseInt(timestamp.slice(16, 18).length > 0 ? timestamp.slice(16, 18) : 0); // Extract the hours
        // Create a Date object in UTC
        const utcDate = new Date(Date.UTC(year, month - 1, day, `${parseInt(hour) + (sign === "+" ? -offsetHours : offsetHours)}`, parseInt(minute), second));

        // Format the date to the target timezone in hh:mm am/pm format
        const options = {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };

        const formatter = new Intl.DateTimeFormat('en-US', options);
        const formattedDate = formatter.format(utcDate);
        if (dt) {
            return new Date(utcDate.toLocaleString('en-US', { timeZone: timezone }));
        }
        return formattedDate;
    }

    function checkTimeConditions(startTimestamp, endTimestamp) {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const startTime = convertToTimezone(startTimestamp, true);
        const endTime = convertToTimezone(endTimestamp, true);
        const currentTime = new Date().toLocaleString('en-US', { timeZone: timezone });

        const currentTimeObj = new Date(currentTime);

        const isWithinTime = currentTimeObj >= startTime && currentTimeObj <= endTime;
        const isTimePassed = currentTimeObj > endTime;

        return {
            isWithinTime,
            isTimePassed
        };
    }


     

    const formattedStartTime = (time) => {
        const dt = new Date(time).getTime();
        if (dt.toString() !== 'NaN') {
            if (user.loginType === 'one-stream-panel') {
                const parsedTime = formatDateToYYYYMMDDHHMMSS(dt)
                const foreignTime = DateTime.fromFormat(parsedTime, 'yyyy-MM-dd HH:mm:ss').toFormat('hh:mm a');
                return foreignTime;;
            } else {
                const parsedTime = formatDateToYYYYMMDDHHMMSS(dt)
                const foreignTime = DateTime.fromFormat(parsedTime, 'yyyy-MM-dd HH:mm:ss', { zone: timeZone });
                const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone; 
                const indianTime = foreignTime.setZone(currentTimezone).toFormat('hh:mm a');
                return indianTime;

            }
        }
        return null

    }

    const getLiveData = async (endpoint, setFn, type) => {
        setLoading(true);
        try {
            const response = await makeRequest().get(endpoint);
            const data = response.data.message;
            if (data === "Something went wrong!" || data.length === 0) {
                setNoData(true);
                setFn([]);
            } else {
                setNoData(false);
                setFn(data);
                if (type === "streams") {
                    liveTv.toggle(data, "streams")
                }
                if (type === "categories") {
                    liveTv.toggle(data, "categories")
                }
            }
        } catch (error) {
            setLiveStreams(null)
            console.log('Error', error);
        }
        setLoading(false);
    }

    const adultCategories = ["adult", "xxx", "porn", "sex", "adults", "ADULTS", "+18", "18+", "18"];

    const getOneStreamURL = (id) => {
        return liveTv.streams.filter(stm => String(stm?.stream_id) === String(id))[0].links.m3u8
    }

    const isToday = (timestamp) => {
        // Parse the timestamp
        let year = parseInt(timestamp.slice(0, 4));
        let month = parseInt(timestamp.slice(4, 6)) - 1; // JavaScript months are 0-based
        let day = parseInt(timestamp.slice(6, 8));

        // Create a Date object for the provided timestamp
        let providedDate = new Date(year, month, day);

        // Get the current date
        let currentDate = new Date();

        // Compare the year, month, and day of the provided date with the current date
        return providedDate.getFullYear() === currentDate.getFullYear() &&
            providedDate.getMonth() === currentDate.getMonth() &&
            providedDate.getDate() === currentDate.getDate();
    }


    const getShortEpg = async (id, verified) => {
        setEpgs([]);
        setExternalEgps([]);
        const getCtgId = liveTv.streams.filter(stm => String(stm?.stream_id) === String(id))[0]?.category_id ?
            liveTv.streams.filter(stm => String(stm?.stream_id) === String(id))[0]?.category_id :
            liveTv.streams.filter(stm => String(stm?.stream_id) === String(id))[0]?.categories[0]
        const ctgName = liveTv.streamCategories.filter(ctg => String(ctg?.category_id) === String(getCtgId))[0]?.category_name;
        const epgChannelId = liveTv.streams.filter(stm => String(stm?.stream_id) === String(id))[0]?.epg_channel_id;
        const matchedProgramme = epgSrc?.data?.tv?.programme?.filter(programme => programme["$"].channel === epgChannelId).filter(epg => isToday(epg.$.start));
        setPlayerSrc(null);
        const adult = adultCategories.filter(ctg => ctgName.toLowerCase().includes(ctg.toLowerCase())).length > 0;

        const runEpg = async () => {

            try {
                const response = await makeRequest().get(endpoint.getEpg + `?stream_id=${id}`);
                const { epg_listings, streamUrl } = response.data.message;
                const { loginType } = user
                // if (epgSrc.currentEpgSrc && epgSrc.currentEpgSrc.data) {
                //     if (matchedProgramme && matchedProgramme.length > 0) {
                //         // const formattedEpgs = matchedProgramme.map(programme => { return { start: formatDateToYYYYMMDDHHMMSS(programme["$"].start, true), stop: formatDateToYYYYMMDDHHMMSS(matchedProgramme["$"].stop, true), title: btoa(programme.title[0]) } })
                //         setExternalEgps(matchedProgramme.map(programme => ({
                //             start: convertToTimezone(programme.$.start, false),
                //             stop: convertToTimezone(programme.$.stop, false),
                //             end: convertToTimezone(programme.$.stop, false),
                //             timings: checkTimeConditions(programme.$.start, programme.$.stop),
                //             title: btoa(programme.title[0]),
                //             desc: btoa(programme.desc[0]),
                //         })));
                //     } else {
                //         setExternalEgps([]);
                //     }
                //     // setEpgs(epg_listings ? epg_listings: [])
                // } else {
                    setEpgs(epg_listings ? epg_listings : []);
                // }
                setPlayerSrc(loginType === 'one-stream-panel' ? getOneStreamURL(id) : streamUrl)

            } catch (error) {
                console.log(error)
            }
        }
        if (pinVerified) {
            runEpg()
        } else {
            if (parentalPin) {
                setIsAdult(adult);
                if (!adult) {
                    runEpg()
                    setPinVerified(false);
                } else {
                    if (adult && verified) {
                        runEpg();
                        setIsAdult(false);
                        setPinVerified(false);
                    }
                }
            } else {
                runEpg();
            }
        }

    }

    const getCurrentLiveStreams = (type, firstLoad) => {
        const currentCategory = firstLoad ? liveTv.streamCategories[0] : selectedCategory;
        if (currentCategory.category_name !== "Favourites" && currentCategory.category_name !== "Channel History") {
            const streams = liveTv.streams.filter(stream =>
                String(stream?.category_id) === String(currentCategory?.category_id) ||
                stream?.categories?.filter(id => String(id) === String(currentCategory.category_id)).length > 0
            );
            setCurrentLiveStreams(streams);
            if (!view) {
                if (firstLoad){
                    setCurrentStreamId(streams[0].stream_id);
                }
                if (!onceAutoPlayed) {
                    handleEpg(streams[0])
                    setCurrentStream(streams[0])
                    setOnceAutoPlayed(true);
                }
            };
            if (!onceAutoPlayed) {
                type !== 'fav' &&
                    getShortEpg(!view ? streams[0]?.stream_id : view, view ? true : pinVerified);
                setOnceAutoPlayed(true)
            }
        }else {
            if ( currentCategory.category_name === "Favourites" ) {
                setCurrentLiveStreams(favouriteChannels);
            }
            else if (currentCategory.category_name === "Channel History") (
setCurrentLiveStreams(channelHistory)
            )
        }
    }

    const getFavouriteChannels = async () => {
        try {
            const response = await getFavourites("LiveTv", user.dbAddress);
            const ids = response.val() ? Object.keys(response.val()) : [];
            const values = response.val() ? Object.values(response.val()) : [];
            const merge = () => {
                const mergedArr = []

                ids.forEach((id, index) =>
                    mergedArr.push({
                        id,
                        timestamp: values[index]
                    })
                );
                return mergedArr;
            }
            setFavourites(ids);
            let favouriteStreams = []
            merge().map(strm => {
                const matchedComp = liveTv.streams.filter(str => String(str.stream_id) === String(strm.id))[0];
                if (matchedComp) {
                    favouriteStreams.push({
                        ...matchedComp,
                        timestamp: strm.timestamp
                    });
                }
            });
            const sorted = favouriteStreams.sort(
                (objA, objB) => objB.timestamp - objA.timestamp
            );
            setFavouriteChannels(sorted);
        } catch (error) {
            setFavouriteChannels([])
        };
        // getCurrentLiveStreams('fav');
    };

    const getChannelHistory = async () => {
        try {
            const response = await getRecents("LiveTv", user.dbAddress);
            const ids = response.val() ? Object.keys(response.val()) : [];
            const values = response.val() ? Object.values(response.val()) : [];
            const merge = () => {
                const mergedArr = []

                ids.forEach((id, index) =>
                    mergedArr.push({
                        id,
                        timestamp: values[index]
                    })
                );
                return mergedArr;
            }
            let channelHistory = []
            merge().map(strm => {
                const matchedComp = liveTv.streams.filter(str => String(str.stream_id) === String(strm.id));
                if (matchedComp.length > 0) {
                    channelHistory.push({
                        ...matchedComp[0],
                        timestamp: strm.timestamp
                    });
                }
            });
            const sorted = channelHistory.sort(
                (objA, objB) => objB.timestamp - objA.timestamp
            );
            setChannelHistory(sorted)
        } catch (error) {
            setChannelHistory([])
        };
    }

    const handleEpg = (stream) => {
        const { stream_id } = stream;
        setPlayerSrc(null);
        getShortEpg(String(stream_id), pinVerified);
        setCurrentStreamId(String(stream_id));
        setCurrentStream(stream)
    };

    const handleSearch = e => {
        const { value } = e.target;
        setSearchedValue(value);
        let searchedEntries = liveTv.streamCategories.filter(ctg => ctg.category_name.toLowerCase().includes(value.toLowerCase()));
        setSearchedCategories(searchedEntries);
        if (value.length === 0) {
            setSearchOn(false);
            setShowExtraCtg({
                favourite: true,
                channelHistory: true
            });
        } else {
            const isFavourite = "Favourite".toLowerCase().includes(value);
            const isChannelHistory = "Channel History".toLowerCase().includes(value);
            setShowExtraCtg({
                favourite: isFavourite,
                channelHistory: isChannelHistory
            });
            setSearchOn(true);
        }
    }

    const handleSearchChannels = (e,val) => {
        const { value } = e.target;
        setSearchedChannel(value);
        let searchedEntries = (val ==="Favourites" ? favouriteChannels :val ==="Channel History"? channelHistory : currentLiveStreams || []).filter(stream => stream.name.toLowerCase().includes(value.toLowerCase()));
        setSearchedChannels(searchedEntries);
        if (value.length === 0) {
            setSearchChannelOn(false);
        } else {
            setSearchChannelOn(true);
        }
    }

    const handleFavourite = async (id, isFavourite) => {
        if (isFavourite) {
            await removeFromFavs(id, "LiveTv", user.dbAddress);
        } else {
            await addToFavs(id, "LiveTv", user.dbAddress);
        }
        getFavouriteChannels();
        alert.toggle({
            title: `${isFavourite ? 'Removed from Favourites' : "Added To Favourites"}`,
            show: true,
            type: 'success'
        })
    };

    const currentProgress = () => {
        const { start, end } = epgSrc.currentEpgSrc && epgSrc.currentEpgSrc.data ? externalEgps[0] : epgs[0];
        const formattedStartDate = typeof start === 'number' ? DateTime.fromSeconds(start, { zone: timeZone }).toFormat('yyyy-MM-dd HH:mm:ss') : start;
        const formattedEndDate = typeof end === 'number' ? DateTime.fromSeconds(end, { zone: timeZone }).toFormat('yyyy-MM-dd HH:mm:ss') : end;
        const startTime = DateTime.fromFormat(formattedStartDate, 'yyyy-MM-dd HH:mm:ss', { zone: timeZone }).setZone('Asia/Kolkata');
        const endTime = DateTime.fromFormat(formattedEndDate, 'yyyy-MM-dd HH:mm:ss', { zone: timeZone }).setZone('Asia/Kolkata');
        const convertedStartTime = new Date(startTime).getTime();
        const convertedEndTime = new Date(endTime).getTime()
        const currentTime = new Date().getTime();
        const fullTime = (convertedEndTime - convertedStartTime) / 1000;
        const elapsedTime = (currentTime - convertedStartTime) / 1000;
        const pct = Number((100 * elapsedTime / fullTime).toFixed(2));
        setProgress(pct);
    };

    const saveChannelHistroy = async () => {
        setIdExists(false);
        try {
            await saveWatchedContent.liveTv(currentStreamId, user.dbAddress);
        } catch (error) {
            console.log(error)
        }
    }

    const handlePinVerified = () => {
        setPinVerified(true);
        setIsAdult(false);
        if (selectedCategory.category_name === "Favourites" ||
            selectedCategory.category_name === "Channel History") {
            getShortEpg(currentStreamId, true);
            setSelectedCategory(clickedAdultCtg);
        } else {
            setSelectedCategory(clickedAdultCtg);
        }
    }

    const handleClearSearch = (type) => {
        if ( type === "ctg" ){
            setSearchedValue("");
            setSearchOn(false);
            setSearchedCategories([]);
            setShowExtraCtg({
                favourite: true,
                channelHistory: true
            });
        }else{
            setSearchChannelOn(false);
            setSearchedChannel("");
            setSearchedChannels([])
        }
       
    };

    const handleLiveStream = (e, s) => {
        const clickedElement = e.target.tagName;
        const isFavourite = clickedElement === 'svg' || clickedElement === 'path';
        if (!isFavourite) {
            handleEpg(s)
        setCurrentEpg(null);
        setCurrentStream(s);

        }
    }

    const handleCategory = category => {
        setSearchChannelOn(false);
        setSearchedChannel("");
        setPinVerified(false)
        const adult = adultCategories.filter(ctg => category.category_name.toLowerCase().includes(ctg.toLowerCase())).length > 0;
        if (parentalPin) {
            setIsAdult(adult);
            setClickedAdultCtg(category)
            if (!adult) {
                setSelectedCategory(category)
                setPinVerified(false);
            } else {
                if (adult && pinVerified) {
                    setSelectedCategory(category)
                    setIsAdult(false)
                    setPinVerified(false)
                }
            }
        } else {
            setSelectedCategory(category);
            setPinVerified(false)
        }
    };

    const removeChannelHistory = async (id) => {
        try {
            await removeMovieFromRecents(id, 'LiveTv', user.dbAddress, null);
            getChannelHistory()
        } catch (error) {
            console.log(error)
        }
    }

    const playerRef = React.useRef(null);

  useEffect(()=>{
    if(liveTv.streams){
    const streamsWithcid = liveTv.streams.filter(stream => stream.category_id  !== null);

    setFilteredStreams(streamsWithcid)
    }
  },[liveTv.streams]);

    const HoverCard = () => {
        if (!hoveredCard || !hoveredCard.item || !hoveredCard.rect) return null;
        const { item, rect } = hoveredCard;
        const id = item.stream_id || item.id;
        const title = item.name || item.title || "";
        const imgUrl = item.stream_icon || item.cover;
        const isFavourite = favourites.filter(favId => String(favId) === String(id)).length > 0;

        const cardWidth = 300;
        const cardHeight = 320;
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
            setHoveredCard(null);
            handleLiveStream(e, item);
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
                                type="button"
                                onClick={(e) => { e.stopPropagation(); handleFavourite(id, isFavourite); }}
                                className={`hover-card-fav-btn ${isFavourite ? "active" : ""}`}
                                title={isFavourite ? "Remove from Favourites" : "Add to Favourites"}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavourite ? "#e50914" : "none"} stroke="currentColor" strokeWidth="2">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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


        loading ? <Loading /> :
            <>
                <DashboardHeader currentAction="live" />
                {noData ? < div className="no-data-found-container">
                    {/* <Error color="warning" sx={{ fontSize: 30 }} /> */}
                    <Image src={noContentFound} alt='live-stream' />
                    <h2 className="no-data-found">No Live Streams found</h2>
                </div> :
                    <section className="liveTv">
                        <div style={{ position: "relative" }} className="steamDetail panel">
                            {!playerSrc ? (
                                <div className="stream-interrupted-container">
                                    <div className="stream-interrupted-card">
                                        <div className="stream-interrupted-icon">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <circle cx="12" cy="12" r="10" />
                                                <line x1="12" y1="8" x2="12" y2="12" />
                                                <line x1="12" y1="16" x2="12.01" y2="16" />
                                            </svg>
                                        </div>
                                        <h3>Stream Interrupted</h3>
                                        <p>We're unable to connect to the video source. Please check your connection or select a channel from below.</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="videoPlay" style={{ overflow: 'hidden' }}>
                                        {currentPlayer.player === 'videojs' ? (
                                            <VideoJSPlayer
                                                opened={idExists}
                                                src={playerSrc}
                                                currentEpg={currentEpg}
                                                favourites={favourites}
                                                currentStreams={currentLiveStreams}
                                                currentStream={currentStream}
                                                getFavouriteChannels={getFavouriteChannels}
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
                                                    router.push('/dashboard/live');
                                                }}
                                                type={'player-api'}
                                            />
                                        ) : (
                                            <LiveTVPlayer
                                                opened={idExists}
                                                currentEpg={currentEpg}
                                                src={playerSrc}
                                                favourites={favourites}
                                                currentStreams={currentLiveStreams}
                                                currentStream={currentStream}
                                                getFavouriteChannels={getFavouriteChannels}
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
                                                    router.push('/dashboard/live');
                                                }}
                                                type={'player-api'}
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
                                        {selectedCategory?.category_name || "Channels"}
                                    </h2>
                                    <span className="live-channel-count-badge">
                                        {currentLiveStreams ? currentLiveStreams.length : 0} Channels
                                    </span>
                                </div>

                                <div className="category-dropdown-wrapper">
                                    <label htmlFor="liveCategorySelect" className="category-select-label">Category:</label>
                                    <select
                                        id="liveCategorySelect"
                                        className="live-category-select"
                                        value={selectedCategory?.category_name || ""}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (val === "Favourites") {
                                                handleCategory({ category_name: "Favourites" });
                                            } else if (val === "Channel History") {
                                                handleCategory({ category_name: "Channel History" });
                                            } else {
                                                const catObj = liveCategories.find((c) => c.category_name === val);
                                                if (catObj) handleCategory(catObj);
                                            }
                                        }}
                                    >
                                        {showExtraCtg.favourite && (
                                            <option value="Favourites">⭐ Favourites ({favouriteChannels.length})</option>
                                        )}
                                        {showExtraCtg.channelHistory && (
                                            <option value="Channel History">🕒 Channel History ({channelHistory.length})</option>
                                        )}
                                        {liveCategories.map((category, index) => (
                                            <option key={index} value={category.category_name}>
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="live-channels-grid">
                                {(searchChannelOn ? searchedChannels : currentLiveStreams).map((stream, index) => {
                                    const { stream_id } = stream;
                                    const isFavourite = favourites.filter(id => String(id) === String(stream_id)).length > 0;
                                    const isEqual = String(stream_id) === String(currentStreamId);
                                    const ctgName = liveTv.streamCategories.filter(ctg => String(ctg.category_id) === String(stream.category_id ? stream.category_id : stream.categories[0]))[0]?.category_name;
                                    const adult = adultCategories.filter(ctg => ctgName?.toLowerCase().includes(ctg.toLowerCase())).length > 0;

                                    return (
                                        <div
                                            key={index}
                                            onClick={(e) => handleLiveStream(e, stream)}
                                            onMouseEnter={(e) => handleCardMouseEnter(e, stream)}
                                            onMouseLeave={handleCardMouseLeave}
                                            className={`item ${isEqual ? 'active' : ''}`}
                                            style={{
                                                outline: isEqual ? "2px solid #6366f1" : "none",
                                            }}
                                        >
                                            <div className="thumb">
                                                {errorIndex === index ? (
                                                    <Image alt="placeholder" layout="fill" objectFit="contain" src={placeholderImage} />
                                                ) : adult && getParentalPin("currentUser") && (selectedCategory.category_name === 'Favourites' || selectedCategory.category_name === 'Channel History') ? (
                                                    <Image alt="placeholder" layout="fill" objectFit="contain" style={{ padding: '15px' }} src={lockIcon} />
                                                ) : stream.stream_icon ? (
                                                    <img src={stream.stream_icon} onError={() => setErrorIndex(index)} alt={stream.name} />
                                                ) : (
                                                    <Image alt="placeholder" layout="fill" objectFit="contain" src={placeholderImage} />
                                                )}
                                            </div>
                                            <div className="caption">
                                                <span className="h2">{stream.name}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {(selectedCategory?.category_name === "Favourites" && favouriteChannels.length === 0) ? (
                                <h1 className='no-category-found'>No Favourite Streams found !</h1>
                            ) : (selectedCategory?.category_name === "Channel History" && channelHistory.length === 0) ? (
                                <h1 className='no-category-found'>No Channel History found !</h1>
                            ) : (currentLiveStreams.length === 0 && selectedCategory?.category_name !== "Favourites" && selectedCategory?.category_name !== "Channel History") ? (
                                <h1 className='no-category-found'>No Live streams found !</h1>
                            ) : null}
                        </div>
                    </section>
                }

                <ParentalLock
                    action={"verify"}
                    close={() => setIsAdult(false)}
                    open={isAdult}
                    completed={handlePinVerified}
                />
                {idExists &&
                    <Backdrop sx={{
                        background: 'black',
                        position: "fixed",
                        top: 0,
                        zIndex: 9999,
                        left: 0,
                        width: '100%',
                        height: '100%'
                    }} open={true}>
                        <CircularProgress sx={{ color: "white" }} />
                    </Backdrop>}
                <HoverCard />
            </>
    )
}

export default LiveTv