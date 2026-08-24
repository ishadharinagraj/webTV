import React, { useContext, useEffect, useState, useRef } from "react";
import "./styles.scss";
import { AppContext } from "@/contexts/app";
import VideoJSPlayer from "@/utils/player2 tvguide";
import useApi from "@/hooks/useApi";
import LiveTVPlayer from "../dashboard/live/player tvguide";
import { endpoint } from "@/config/endpoints";
import { Skeleton, Dialog, CircularProgress, Tooltip } from "@mui/material";
import { AES, enc } from "crypto-js";
import { addToFavs, getFavourites, removeFromFavs } from "@/firebase/functions";
import CloseIcon from '@mui/icons-material/Close';
import RestoreIcon from '@mui/icons-material/Restore';
import { useRouter as Navigator } from "next/navigation";
import DashboardHeader from "../dashboard/header";


const TIME_SLOT_WIDTH = 200;
const TIME_SLOTS = [];

for (let h = 0; h < 24; h++) {
    [0, 30].forEach((m) => {
        const hour12 = h % 12 || 12;
        const ampm = h < 12 ? " AM" : " PM";
        TIME_SLOTS.push({
            hour: h,
            minute: m,
            label: `${hour12}:${m.toString().padStart(2, "0")}${ampm}`,
        });
    });
}

const CustomDropdown = ({ options, value, onChange, labelKey, valueKey }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const selectedOption = options?.find((opt) => opt[valueKey] == value);
    const displayLabel = selectedOption ? selectedOption[labelKey] : "Select...";

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="custom-dropdown" ref={dropdownRef}>
            <div className="dropdown-trigger" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <span>{displayLabel}</span>
                <span className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}>▼</span>
            </div>
            {isDropdownOpen && (
                <div className="dropdown-options">
                    {options?.map((opt, index) => (
                        <div
                            key={index}
                            className={`dropdown-option ${opt[valueKey] == value ? "selected" : ""}`}
                            onClick={(e) => {
                                e.preventDefault();
                                onChange(opt[valueKey]);
                                setIsDropdownOpen(false);
                            }}
                        >
                            {opt[labelKey]}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const TVGUIDE = () => {
    const timeHeaderRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const menuRef = useRef(null);
    const navigate = Navigator();
    const [categories, setCategories] = useState([]);
    const [streams, setStreams] = useState([]);
    const [currentStreams, setCurrentStreams] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [playingStream, setPlayingStream] = useState(null);
    const [epgData, setEpgData] = useState({});
    const [currentTimePos, setCurrentTimePos] = useState(0);
    const [currentProgram, setCurrentProgram] = useState();
    const [loading, setLoading] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [favourites, setFavourites] = useState([]);
    const [liveCategories, setLiveCategories] = useState([]);
    const [liveStreams, setLiveStreams] = useState([]);
    const [noData, setNoData] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const [server, setServer] = useState();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const { streamData, currentPlayer, user, logo, alert, theme } =
        useContext(AppContext);
    const { makeRequest } = useApi();
    const { liveTv } = streamData;
    const [now, setNow] = useState(new Date());
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const [fullscreen, setFullscreen] = useState(false);
    const [isPlayerOpen, setIsPlayerOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(1); // Start with 1, load remaining after first EPG loads
    const [profileDropOpened, setProfileDropOpened] = useState(false);
    const profileBtnRef = useRef(null);
    const popupRef = useRef(null);
    const profileOptionRef = useRef(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentOption, setCurrentOption] = useState(null);
    const [parentalPinExists, setParentalPinExists] = useState(false);
    const [setupPin, setSetupPin] = useState(false);
    const [guestLogin, setGuestLogin] = useState();
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [dialogData, setDialogData] = useState(false);
    const [showNowButton, setShowNowButton] = useState(false);
    const [epgLoading, setEpgLoading] = useState(false);

    const handleClick = (e) => {
        const { target } = e;
        const profileEl = profileOptionRef?.current;
        const contained = profileEl?.contains(target);
        const profileBtn = profileBtnRef.current;
        const backBtnClicked = document
            .getElementById("close-profile")
            .contains(e.target);

        if (backBtnClicked) {
            setProfileDropOpened(false);
        } else {
            if (!contained) {
                if (profileBtn?.contains(target) && !contained) {
                    setProfileDropOpened(true);
                } else {
                    setProfileDropOpened(false);
                }
                setCurrentOption(null);
            } else {
                setProfileDropOpened(true);
            }
        }
    };
    const getParentalPin = (key) => {
        if (!key || typeof window === "undefined") {
            return "";
        }
        const isUserExists = localStorage.getItem(key);
        if (isUserExists === null) {
            return;
        } else {
            const retrievedUser = Object?.values(
                JSON.parse(localStorage.getItem(key)),
            )[0].parentalPin;
            return retrievedUser;
        }
    };

    const getFromLocalStorage = (key) => {
        if (!key || typeof window === "undefined") {
            return "";
        }
        const isUserExists = localStorage.getItem(key);
        if (isUserExists === null) {
            return "";
        } else {
            const retrievedUser = JSON.parse(localStorage.getItem(key));
            return (
                retrievedUser && [
                    Object?.keys(retrievedUser)[0],
                    Object?.values(retrievedUser)[0],
                ]
            );
        }
    };

    useEffect(() => {
        if (getFromLocalStorage("currentUser")) {
            setCurrentUser(getFromLocalStorage("currentUser"));
        } else {
            navigate.push("/");
        }
        if (getParentalPin("currentUser")) {
            setParentalPinExists(true);
        } else {
            setParentalPinExists(false);
        }
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (!storedUser) return;
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && Object.values(parsedUser)[0]?.guestLogin) {
            setGuestLogin(true);
        }
    }, [user]);


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
                    liveTv.toggle(data, "streams");
                }
                if (type === "categories") {
                    liveTv.toggle(data, "categories");
                }
            }
        } catch (error) {
            setLiveStreams(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowSubscriptionModal(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    useEffect(() => {
        getFavouriteChannels();
    }, [user?.dbAddress]);

    const getFavouriteChannels = async () => {
        try {
            const response = await getFavourites("LiveTv", user.dbAddress);
            const ids = response.val() ? Object.keys(response.val()) : [];
            const values = response.val() ? Object.values(response.val()) : [];
            const merge = () => {
                const mergedArr = [];

                ids.forEach((id, index) =>
                    mergedArr.push({
                        id,
                        timestamp: values[index],
                    }),
                );
                return mergedArr;
            };
            setFavourites(ids);
            let favouriteStreams = [];
            merge().map((strm) => {
                const matchedComp = liveTv?.streams?.filter(
                    (str) => String(str.stream_id) === String(strm.id),
                )[0];
                if (matchedComp) {
                    favouriteStreams.push({
                        ...matchedComp,
                        timestamp: strm.timestamp,
                    });
                }
            });
        } catch (error) {
            console.log("errorGetFavouriteChannels", error);
        }
    };

    const updateCurrentTimePos = () => {
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const totalMinutes = hours * 60 + minutes;
        const offset = 200;
        const pos = offset + totalMinutes * (TIME_SLOT_WIDTH / 30);
        setCurrentTimePos(pos);
    };

    const scrollToTime = (hour, minute = 0) => {
        if (timeHeaderRef.current && scrollContainerRef.current) {
            const slotIndex = hour * 2 + (minute >= 30 ? 1 : 0);
            const scrollPos = slotIndex * TIME_SLOT_WIDTH;
            timeHeaderRef.current.scrollLeft = scrollPos;
            scrollContainerRef.current.scrollLeft = scrollPos;
        }
    };

    const handleTimeScroll = (direction) => {
        if (scrollContainerRef.current) {
            const current = scrollContainerRef.current.scrollLeft;
            const amount =
                direction === "forward" ? TIME_SLOT_WIDTH : -TIME_SLOT_WIDTH;
            scrollContainerRef.current.scrollTo({
                left: current + amount,
                behavior: "smooth",
            });
        }
    };

    const scrollToNow = () => {
        const hour = now.getHours();
        const minute = now.getMinutes();
        scrollToTime(hour, minute);
        setShowNowButton(false);
    };

    const onContentScroll = (e) => {
        if (timeHeaderRef.current) {
            timeHeaderRef.current.scrollLeft = e.target.scrollLeft;
        }

        // Check if scrolled away from current time slot
        const currentSlotIndex = currentHour * 2 + (currentMinute >= 30 ? 1 : 0);
        const currentSlotScrollPos = currentSlotIndex * TIME_SLOT_WIDTH;
        const scrollLeft = e.target.scrollLeft;
        const tolerance = TIME_SLOT_WIDTH / 2;

        if (Math.abs(scrollLeft - currentSlotScrollPos) > tolerance) {
            setShowNowButton(true);
        } else {
            setShowNowButton(false);
        }

        const { scrollTop, clientHeight } = e.target;
        const rowHeight = 20; // From styles.scss

        // Trigger if we've scrolled near the end of the currently "EPG-active" channels
        const currentTotalHeight = visibleCount * rowHeight;

        if (scrollTop + clientHeight >= currentTotalHeight - 120) {
            setVisibleCount((prev) => {
                if (prev < currentStreams.length) {
                    return Math.min(prev + 10, currentStreams.length);
                }
                return prev;
            });
        }
    };

    const handleMouseDown = (e) => {
        if (e.button !== 0) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const switchStream = (index) => {
        setIsPlayerOpen(false);
        setTimeout(() => {
            setPlayingStream(currentStreams[index]);
            setIsPlayerOpen(true);
        }, 500);
    };

    const handleChannelClick = (stream) => {
        setIsPlayerOpen(false);
        setTimeout(() => {
            setPlayingStream(stream);
            setIsPlayerOpen(true);
        }, 500);
    };

    const filterEpgForToday = (data) => {
        if (!data) return {};
        const now = new Date();
        const startOfDayUTC = Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            0,
            0,
            0,
        );
        const endOfDayUTC = Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            23,
            59,
            59,
        );
        const filteredData = {};
        Object.keys(data).forEach((streamId) => {
            const programs = data[streamId];
            if (Array.isArray(programs)) {
                filteredData[streamId] = programs.filter((p) => {
                    const start = parseInt(p.start_timestamp) * 1000;
                    const stop = parseInt(p.stop_timestamp) * 1000;
                    return start < endOfDayUTC && stop > startOfDayUTC;
                });
            } else {
                filteredData[streamId] = [];
            }
        });
        return filteredData;
    };

    const decodeBase64 = (str) => {
        try {
            return atob(str);
        } catch (e) {
            return str;
        }
    };

    const getProgramForTime = (streamId, hour, minute) => {
        const channelEpg = epgData[streamId];
        if (!channelEpg) return undefined;
        if (!Array.isArray(channelEpg)) return null;
        const today = new Date();
        const startOfSlot = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            hour,
            minute,
            0,
        ).getTime();
        const endOfSlot = startOfSlot + 1800000;
        const program = channelEpg.find((p) => {
            const startPromise = parseInt(p.start_timestamp) * 1000;
            const stopPromise = parseInt(p.stop_timestamp) * 1000;
            return startPromise < endOfSlot && stopPromise > startOfSlot;
        });

        if (program) {
            const title = decodeBase64(program?.title);
            const displayTitle = title.length > 15
                ? title.slice(0, 13) + "..."
                : title;
            return displayTitle;
        }

        return null;
    };
    const getEpgForTime = (streamId, hour, minute) => {
        const channelEpg = epgData[streamId];
        if (!channelEpg) return undefined;
        if (!Array.isArray(channelEpg)) return null;
        const today = new Date();
        const startOfSlot = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            hour,
            minute,
            0,
        ).getTime();
        const endOfSlot = startOfSlot + 1800000;
        const program = channelEpg.find((p) => {
            const startPromise = parseInt(p.start_timestamp) * 1000;
            const stopPromise = parseInt(p.stop_timestamp) * 1000;
            return startPromise < endOfSlot && stopPromise > startOfSlot;
        });

        if (program) {
            const programInfo = {
                title: decodeBase64(program.title),
                description: decodeBase64(program.description || ""),
                formattedStart: formatEpgTime(program.start_timestamp),
                formattedEnd: formatEpgTime(program.stop_timestamp),
            };
            return programInfo;
        }

        return null;
    };

    const formatEpgTime = (timestamp) => {
        if (!timestamp) return "N/A";
        const date = new Date(parseInt(timestamp) * 1000);
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const getCurrentProgram = (streamId) => {
        const channelEpg = epgData[streamId];
        if (!channelEpg || !Array.isArray(channelEpg)) {
            // console.log(`[EPG Debug] No EPG data for stream ${streamId}`);
            return null;
        }
        const now = Date.now();

        channelEpg.forEach((p, idx) => {
            const start = parseInt(p.start_timestamp) * 1000;
            const stop = parseInt(p.stop_timestamp) * 1000;
            const isCurrentlyAiring = now >= start && now < stop;
        });
        const program = channelEpg.find((p) => {
            const start = parseInt(p.start_timestamp) * 1000;
            const stop = parseInt(p.stop_timestamp) * 1000;
            return now >= start && now < stop;
        });
        if (program) {
            // console.log(`[EPG Debug] Found current program: "${decodeBase64(program.title)}"`);

            return {
                ...program,
                title: decodeBase64(program.title),
                description: decodeBase64(program.description || ""),
                formattedStart: formatEpgTime(program.start_timestamp),
                formattedEnd: formatEpgTime(program.stop_timestamp),
            };
        } else {
            // console.log(`[EPG Debug] No program found for current time!`);
            return null;
        }
    };

    const playerReady = () => { };

    const handleFavourite = async (id, isFavourite) => {
        if (isFavourite) {
            await removeFromFavs(id, "LiveTv", user.dbAddress);
        } else {
            await addToFavs(id, "LiveTv", user.dbAddress);
        }
        getFavouriteChannels();
        alert.toggle({
            title: `${isFavourite ? "Removed from Favourites" : "Added To Favourites"}`,
            show: true,
            type: "success",
        });
    };

    const isFavourite =
        favourites.filter((id) => String(id) === String(playingStream?.stream_id))
            .length > 0;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (user) {
            getLiveData(endpoint.getLiveCategories, setLiveCategories, "categories");
            getLiveData(endpoint.getLiveStreams, setLiveStreams, "streams");
        }
    }, [user]);

    useEffect(() => {
        if (liveTv) {
            setCategories(liveTv?.streamCategories || liveCategories);
            setStreams(liveTv?.streams || liveStreams);
        }
    }, [liveTv]);

    useEffect(() => {
        if (categories && categories.length > 0 && !selectedCategory) {
            setSelectedCategory(categories[0].category_id);
        }
    }, [categories]);

    useEffect(() => {
        if (!streams || !selectedCategory) return;
        const filtered = streams.filter(
            (val) => Number(val.category_id) === Number(selectedCategory),
        );
        setCurrentStreams(filtered);
    }, [selectedCategory, streams]);

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (currentStreams.length > 0) {
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            const timer = setTimeout(() => {
                scrollToTime(currentHour, currentMinute);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [currentStreams.length]);

    useEffect(() => {
        updateCurrentTimePos();
    }, [now]);

    useEffect(() => {
        if (user) {
            const { userInfo, server } = user;
            const userDetails = JSON.parse(
                AES.decrypt(userInfo, "thisisuserinfo").toString(enc.Utf8),
            );
            const serverDetails = AES.decrypt(server, "thisisserveraddress").toString(
                enc.Utf8,
            );
            setUserInfo(userDetails);
            setServer(serverDetails);
        }
    }, [user]);

    useEffect(() => {
        if (playingStream) {
            const prog = getCurrentProgram(playingStream.stream_id);
            setCurrentProgram(prog);
        }
    }, [playingStream, epgData]);

    useEffect(() => {
        const fetchEPG = async () => {
            if (currentStreams && currentStreams.length > 0) {
                const start = Math.max(0, visibleCount - 10);
                const streamIdsToFetch = currentStreams
                    .slice(start, visibleCount)
                    .map((s) => s.stream_id);

                if (streamIdsToFetch.length === 0) return;

                try {
                    setLoading(true);
                    const response = await makeRequest().post("/get_all_epg", {
                        stream_ids: streamIdsToFetch,
                    });

                    if (response.data && response.data.success) {
                        const filtered = filterEpgForToday(response.data.data);
                        setEpgData((prev) => ({ ...prev, ...filtered }));

                        // If this was the initial load (visibleCount === 1), set playingStream and load more
                        if (visibleCount === 1 && currentStreams.length > 0) {
                            setPlayingStream(currentStreams[0]);
                            setIsPlayerOpen(true);
                            // After a short delay, load the next batch of channels
                            setTimeout(() => {
                                setVisibleCount(10);
                            }, 500);
                        }
                    }
                } catch (error) {
                    console.error("Failed to fetch EPG:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchEPG();
    }, [currentStreams, visibleCount]);

    const handleOpenDialog = (epgData, stream) => {
        setEpgLoading(true)
        setIsOpen(!isOpen);
        setDialogData({ ...epgData, channelName: stream.name, channelLogo: stream.stream_icon });
        setTimeout(() => {
            setEpgLoading(false)
        }, [2000])
    };




    return (
        <div className="tv-guide-wrapper" onClick={handleClick}>
            <DashboardHeader />
            <Dialog
                PaperProps={{ className: "dialog-div" }}
                onClose={() => {
                    setIsOpen(!isOpen);
                }}
                open={isOpen}
            >
                {epgLoading ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress /></div> : dialogData && dialogData?.title ? (
                    <div className="dialog-wrapper">
                        <div className="dialog-close">
                            <CloseIcon onClick={() => { setIsOpen(!isOpen) }} className="close-dialog" />
                        </div>
                        <div style={{ display: "flex", justifyContent: "start", alignItems: 'center' }}>

                            <img style={{ width: '60px', height: '50px', marginRight: "2%", border: '2px solid transparent', padding: "2%", background: "rgba(255, 255, 255, 0.2)" }} src={dialogData?.channelLogo} />
                            <h2>{dialogData?.channelName}</h2>
                        </div>
                        <p><span style={{ fontWeight: 'bolder' }}>Title </span> : {dialogData?.title}</p>
                        <p><span style={{ fontWeight: 'bolder' }}>Timing </span> :
                            Starts at {dialogData?.formattedStart} to{" "}
                            {dialogData?.formattedEnd}
                        </p>
                        <p><span style={{ fontWeight: 'bolder' }}>Description </span> : {dialogData?.description}</p>
                    </div>
                ) : (
                    <div className="dialog-wrapper-noinfo">
                        <div className="dialog-close">
                            <CloseIcon style={{ float: 'right', cursor: 'pointer' }} onClick={() => { setIsOpen(!isOpen) }} className="close-dialog" />
                        </div>
                        <div style={{ display: "flex", justifyContent: "start" }}>
                            <img style={{ width: '60px', height: '50px', marginRight: "2%", border: '2px solid transparent', padding: "2%", background: "rgba(255, 255, 255, 0.2)" }} src={dialogData?.channelLogo} />
                            <h2>{dialogData?.channelName}</h2>
                        </div>
                        <p>No information</p>
                    </div>
                )}
            </Dialog>
            <div className="epg-player-category-wrapper">
                <div className="video-player-epg">
                    {isPlayerOpen && playingStream ? (
                        currentPlayer?.player === "flowplayer" ? (
                            <LiveTVPlayer
                                key={playingStream?.stream_id}
                                opened={isPlayerOpen}
                                src={`${server}/live/${userInfo?.username}/${userInfo?.password}/${playingStream?.stream_id}.m3u8`}
                                favourites={favourites}
                                currentStreams={currentStreams}
                                playingStream={playingStream?.stream_id}
                                getFavouriteChannels={getFavouriteChannels}
                                currentStream={currentStreams.findIndex(
                                    (s) => s.stream_id === playingStream?.stream_id,
                                )}
                                onfullscreen={(e) => setFullscreen(false)}
                                onclose={() => {
                                    setIsPlayerOpen(true);
                                    setFullscreen(false);
                                }}
                                onPlayerReady={playerReady}
                                restart={(index) => switchStream(index)}
                                onPreviousChannel={(index) => {
                                    if (fullscreen) {
                                        setIsPlayerOpen(false);
                                    }
                                    if (index > 0) {
                                        switchStream(index - 1);
                                    }
                                }}
                                onNextChannel={(index) => {
                                    if (fullscreen) {
                                        setIsPlayerOpen(false);
                                    }
                                    if (index < currentStreams.length - 1) {
                                        switchStream(index + 1);
                                    }
                                }}
                            />
                        ) : (
                            <VideoJSPlayer
                                key={playingStream?.stream_id}
                                opened={isPlayerOpen}
                                src={`${server}/live/${userInfo?.username}/${userInfo?.password}/${playingStream?.stream_id}.m3u8`}
                                favourites={favourites}
                                currentStreams={currentStreams}
                                playingStream={playingStream?.stream_id}
                                currentStream={currentStreams.findIndex(
                                    (s) => s.stream_id === playingStream?.stream_id,
                                )}
                                onfullscreen={(e) => setFullscreen(false)}
                                onclose={() => {
                                    setIsPlayerOpen(true);
                                    setFullscreen(false);
                                }}
                                onPlayerReady={playerReady}
                                restart={(index) => switchStream(index)}
                                onPreviousChannel={(index) => {
                                    if (fullscreen) {
                                        setIsPlayerOpen(false);
                                    }
                                    if (index > 0) {
                                        switchStream(index - 1);
                                    }
                                }}
                                getFavouriteChannels={getFavouriteChannels}
                                onNextChannel={(index) => {
                                    if (fullscreen) {
                                        setIsPlayerOpen(false);
                                    }
                                    if (index < currentStreams.length - 1) {
                                        switchStream(index + 1);
                                    }
                                }}
                            />
                        )
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                                zIndex: 99999,
                            }}
                        >
                            <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
                        </div>
                    )}
                </div>
                <div className="category-wrapper">
                    <div style={{ width: "100%" }}>
                        <span className="header-span">
                            <h1>{playingStream?.name}</h1>
                            <svg
                                style={{ cursor: "pointer" }}
                                stroke="white"
                                strokeWidth={isFavourite ? 1 : 1.5}
                                onClick={() =>
                                    handleFavourite(playingStream.stream_id, isFavourite)
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
                                    stroke={isFavourite ? "#FF0000" : "white"}
                                />
                            </svg>
                        </span>
                        <div className="name-timing-wrapper">
                            <p>
                                {currentProgram?.title
                                    ? currentProgram?.title
                                    : "No Information"}
                            </p>
                            <p>
                                {currentProgram?.formattedStart && currentProgram?.formattedEnd
                                    ? `Starts at ${currentProgram?.formattedStart}  to ${currentProgram?.formattedEnd}`
                                    : null}
                            </p>
                        </div>
                        <p className="epg-description">
                            <Tooltip
                                slotProps={{
                                    tooltip: {
                                        sx: {
                                            maxWidth: "50%!important",   // 👈 set your custom width
                                            fontSize: "14px",
                                            float: 'right',
                                            marginRight: "3%"
                                        },
                                    },
                                }}
                                placement="top" title={currentProgram?.description}>
                                {currentProgram?.description?.length > 230
                                    ? currentProgram.description.slice(0, 230) + "..."
                                    : currentProgram?.description}
                            </Tooltip>
                        </p>
                    </div>
                </div>
            </div>
            <div className="epg-search-category-wrapper">
                <CustomDropdown
                    options={categories}
                    value={selectedCategory}
                    onChange={(val) => {
                        setSelectedCategory(val);
                        setPlayingStream(null);
                        setVisibleCount(1);
                        setEpgData({});
                    }}
                    labelKey="category_name"
                    valueKey="category_id"
                />

                {/* <div className="search-input-container">
                    <input
                        className='search-input'
                        type='text'
                        placeholder='Search channel name'
                        value={searchQuery}
                        onChange={(e) => {
                            const val = e.target.value;
                            setSearchQuery(val);
                        }}
                    />
                </div> */}
            </div>
            <div className="epg-details-div">
                <div className="time-controls">

                    <button onClick={() => handleTimeScroll("forward")}>&gt;</button>
                </div>
                <div className="epg-timing-wrapper" ref={timeHeaderRef}>
                    <div className="header-today-label">
                        {showNowButton && (
                            <button className="now-button" onClick={scrollToNow}>
                                <RestoreIcon />
                            </button>
                        )}
                        {new Date()
                            .toLocaleDateString("en-GB", {
                                weekday: "short",
                                day: "2-digit",
                                month: "short",
                            })
                            .replace(",", "")}
                        <button className="backward-btn" onClick={() => handleTimeScroll("backward")}>&lt;</button>

                    </div>
                    {TIME_SLOTS.map((slot, index) => {
                        const isCurrentHour = slot.hour === currentHour;
                        const isCurrentSlot =
                            isCurrentHour &&
                            ((slot.minute === 0 && currentMinute < 30) ||
                                (slot.minute === 30 && currentMinute >= 30));

                        return (
                            <div
                                key={index}
                                className={`time-slot ${isCurrentSlot ? "active-slot" : ""}`}
                            >
                                {slot.label}
                                {isCurrentSlot && (
                                    <div
                                        className="indicator-dot"
                                        style={{ left: `${((currentMinute % 30) / 30) * 100}%` }}
                                    ></div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div
                    className={`epg-channels-scroller ${isDragging ? "dragging" : ""}`}
                    ref={scrollContainerRef}
                    onScroll={onContentScroll}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    <div
                        className="current-now-line"
                        style={{ left: `${currentTimePos}px` }}
                    />
                    {currentStreams?.map((stream, idx) => {
                        const isPlaying = playingStream?.stream_id === stream.stream_id;
                        return (
                            <div
                                className="epg-channel-row"
                                key={stream.stream_id || idx}
                            >
                                <div
                                    className={`channel-info ${isPlaying ? "active-channel-row" : ""}`}
                                >
                                    <img
                                        src={stream.stream_icon}
                                        alt={stream.name}
                                        onError={(e) => (e.target.style.display = "none")}
                                    />
                                    <div className="channel-name-epg-wrapper">
                                        <p className="channel-name">{stream.name}</p>
                                        <p className="active-epg-title">
                                            {getCurrentProgram(stream.stream_id)?.title ||
                                                "No Information"}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="empty-slot-track"
                                    style={{ width: `${TIME_SLOTS.length * TIME_SLOT_WIDTH}px` }}
                                >
                                    {TIME_SLOTS.map((slot, index) => {
                                        const prog = getProgramForTime(
                                            stream.stream_id,
                                            slot.hour,
                                            slot.minute,
                                        );
                                        const fullEpgData = getEpgForTime(
                                            stream.stream_id,
                                            slot.hour,
                                            slot.minute,
                                        );

                                        const isPlaying =
                                            playingStream?.stream_id === stream.stream_id;
                                        const isCurrentHour = slot.hour === currentHour;
                                        const isCurrentSlot =
                                            isCurrentHour &&
                                            ((slot.minute === 0 && currentMinute < 30) ||
                                                (slot.minute === 30 && currentMinute >= 30));
                                        let indicatorLeft = 0;
                                        if (isCurrentSlot) {
                                            const minutesIntoSlot = currentMinute % 30;
                                            indicatorLeft = (minutesIntoSlot / 30) * 100;
                                        }
                                        return (
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    isCurrentSlot
                                                        ? handleChannelClick(stream)
                                                        : handleOpenDialog(fullEpgData, stream);
                                                }}
                                                className={`time-slot-placeholder ${isCurrentSlot ? "active-slot" : ""} ${isPlaying && isCurrentSlot ? "playing-active-slot" : "playing-inactive-slot"}`}
                                            >
                                                {isCurrentSlot && (
                                                    <div className={`slot-line`}>
                                                        <div
                                                            className="indicator"
                                                            style={{
                                                                left: `${indicatorLeft}%`,
                                                                position: "absolute",
                                                            }}
                                                        ></div>
                                                        <div
                                                            style={{
                                                                background: "gray",
                                                                width: "100%",
                                                                height: "2px",
                                                                position: "absolute",
                                                                bottom: 0,
                                                                left: 0,
                                                            }}
                                                        >
                                                            <div
                                                                className="progress-horizontal"
                                                                style={{
                                                                    width: `${indicatorLeft}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                )}
                                                {prog !== undefined ? (
                                                    prog || `No Information`
                                                ) : idx >= visibleCount ||
                                                    (idx >= visibleCount - 10 && loading) ? (
                                                    <Skeleton
                                                        variant="rectangular"
                                                        width={"100%"}
                                                        height={"100%"}
                                                        animation="wave"
                                                    />
                                                ) : (
                                                    <Skeleton
                                                        variant="rectangular"
                                                        width={"100%"}
                                                        height={"100%"}
                                                        animation="wave"
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};

export default TVGUIDE;

