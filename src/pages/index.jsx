import React, { useEffect, useContext, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AppContext } from "@/contexts/app";
import { getUser } from "@/utils/local";
import { m3utojson } from "./render";
import ViewListIcon from "@mui/icons-material/ViewList";
import StorageIcon from "@mui/icons-material/Storage";
import MediaPlayer from "@/utils/player/mediaPlayer";
import CoverImg from "../assets/cover.jpg";
import CloseIcon from "@mui/icons-material/Close";
import logoSmall from "@/assets/logoSmall.png";
import Image from "next/image";
import backBtn from "@/assets/backBtn.svg";
import YouTubePlayer from "@/utils/ytPlayerLiveStream";

// Best icons for the landing page
import DnsRounded from "@mui/icons-material/DnsRounded";
import FeaturedPlayListRounded from "@mui/icons-material/FeaturedPlayListRounded";
import PermMediaRounded from "@mui/icons-material/PermMediaRounded";
import LiveTvRounded from "@mui/icons-material/LiveTvRounded";
import SettingsRounded from "@mui/icons-material/SettingsRounded";

const Landing = () => {
  const router = useRouter();
  const { alert } = useContext(AppContext);
  const pathname = router.query?.action;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [localFile, setLocalFile] = useState();
  const [playerOpen, setPlayerOpen] = useState(false);
  const [videoType, setVideoType] = useState();
  const [isAudio, setIsAudio] = useState(false);
  const [currentTimeline, setCurrentTimeline] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isStream, setIsstream] = useState(false);
  const [url, setUrl] = useState();
  const [error, setError] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  const userExists =
    getUser() && getUser().length > 0 && !(pathname === "add-profile");
  useEffect(() => {
    if (userExists) {
      router.push("/playlists");
    }
  }, []);

  // Close settings dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loginQuery = (type) => ({
    pathname: "/login",
    query:
      pathname === "add-profile"
        ? {
            action: "add-profile",
            type,
          }
        : {
            type,
          },
  });

  const handleListPlaylist = () => {
    const list = localStorage.getItem("listUser")
      ? JSON.parse(localStorage.getItem("listUser")).length > 0
      : null;
    if (!list) {
      alert.toggle({
        show: true,
        title: "No Playlist Found !",
        type: "warning",
      });
    } else {
      router.push("/playlists");
    }
  };
  const handleClick = () => {
    document.getElementById("fileInput").click();
    setPlayerOpen(true);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files.map((file) => file.name));
    if (files.length > 0) {
      setLocalFile(URL.createObjectURL(files[0]));
      setPlayerOpen(true);
      if (files[0].name.endsWith(".mov")) {
        setVideoType("video/mp4");
      } else {
        setVideoType(files[0].type);
      }
      if (files[0].type === "audio/mpeg") {
        setIsAudio(true);
      }
      event.target.value = "";
    } else {
      event.target.value = "";
    }
  };

  const handleClose = () => {
    setPlayerOpen(false);
    setLocalFile(null);
    setIsAudio(false);
    setIsstream(false);
    setUrl(null);
  };

  const streamHandler = () => {
    setIsstream(true);
  };

  const urlHandler = () => {
    const videoExtensions = [
      ".mp4",
      ".mkv",
      ".avi",
      ".mov",
      ".wmv",
      ".flv",
      ".webm",
      ".m3u",
      ".m3u8",
    ];
    const audioExtensions = [".mp3", ".aac", ".wav", ".flac", ".ogg", ".m4a"];
    if (url) {
      if (videoExtensions.some((ext) => url.toLowerCase().endsWith(ext))) {
        setLocalFile(url);
        setPlayerOpen(true);
        if (url.endsWith(".m3u") || url.endsWith(".m3u8")) {
          setVideoType("video/quicktime");
        } else {
          setVideoType("video/mp4");
        }
      } else if (
        audioExtensions.some((ext) => url.toLowerCase().endsWith(ext))
      ) {
        setIsAudio(true);
        setPlayerOpen(true);
        setVideoType("audio/mpeg");
        setLocalFile(url);
      } else if (url.includes("https://www.youtube.com/")) {
        setVideoType("youtube");
        setPlayerOpen(true);
        setLocalFile(url);
      } else {
        alert.toggle({
          show: true,
          title: "Please enter a valid URL !",
          type: "warning",
        });
      }
    } else {
      setError(true);
    }
  };

  const backHandler = () => {
    setIsstream(false);
  };

  return (
    <section className="splash">
      <div className="splash-bg-glow"></div>

      {/* Top Right Settings Menu */}
      <div className="top-settings-container" ref={settingsRef}>
        <button
          className={`settings-icon-btn ${settingsOpen ? "active" : ""}`}
          onClick={() => setSettingsOpen(!settingsOpen)}
          aria-label="Settings"
          title="Settings"
        >
          <SettingsRounded className="settings-icon" />
        </button>

        {settingsOpen && (
          <div className="settings-dropdown">
            <div
              className="settings-item"
              onClick={() => {
                setSettingsOpen(false);
                handleListPlaylist();
              }}
            >
              <span>List Playlists</span>
            </div>
          </div>
        )}
      </div>

      <div className="splash-header">
        <div className="logo-wrapper">
          <Image src={logoSmall} alt="Brand Logo" className="app-brand-logo" priority />
        </div>
      </div>

      <div className="playList">
        <Link href={loginQuery("player-api")} className="playlist-card">
          <div className="thumb-container">
            <span className="thumb">
              <DnsRounded className="card-icon" />
            </span>
          </div>
          <span className="card-title">XTREAM CODES API</span>
          <p className="card-subtitle">( Connect via Xtream Credentials )</p>
        </Link>

        <Link href="/login/m3u" className="playlist-card">
          <div className="thumb-container">
            <span className="thumb">
              <FeaturedPlayListRounded className="card-icon" />
            </span>
          </div>
          <span className="card-title">M3U PLAYLIST</span>
          <p className="card-subtitle">( Load M3U File or URL )</p>
        </Link>

        <Link onClick={handleClick} href="#" className="playlist-card">
          <div className="thumb-container">
            <span className="thumb">
              <PermMediaRounded className="card-icon" />
            </span>
          </div>
          <span className="card-title">LOCAL MEDIA</span>
          <p className="card-subtitle">( Play Audio & Video Files )</p>
        </Link>

        <input
          id="fileInput"
          type="file"
          accept="audio/*,video/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <Link onClick={streamHandler} href="#" className="playlist-card">
          <div className="thumb-container">
            <span className="thumb">
              <LiveTvRounded className="card-icon" />
            </span>
          </div>
          <span className="card-title">DIRECT STREAM</span>
          <p className="card-subtitle">( Play Direct Live & VOD Links )</p>
        </Link>

        {isStream && (
          <div className="stream-wrapper-main">
            <button onClick={backHandler} className="backbutton-container">
              <img src={backBtn.src} alt="back" />
            </button>
            <div className="main-wrapper">
              <p className="single-stream-text">Play Single Stream</p>
              <div className="input-button-wrapper">
                <input
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError(false);
                  }}
                  placeholder="http://url_here.com:port/stream_name.extension"
                  type="text"
                />
                {error && <p className="error">This Field is required !</p>}
              </div>
              <div className="btn-container-wrapper">
                <button
                  className="cancel-btn"
                  onClick={() => {
                    setIsstream(false);
                    setError(false);
                  }}
                >
                  Cancel
                </button>
                <button className="cancel-btn play-btn" onClick={urlHandler}>
                  Play
                </button>
              </div>
            </div>
          </div>
        )}

        {localFile &&
          playerOpen &&
          (videoType === "video/mp4" || videoType === "video/quicktime") && (
            <MediaPlayer
              type={"movies"}
              timeline={currentTimeline}
              close={handleClose}
              src={localFile}
              loginType={"guest"}
              info={"movie"}
              videoType={videoType}
            />
          )}
          
        {playerOpen && videoType === "youtube" && (
          <div className="youtube-video-player">
            <YouTubePlayer
              playerOpen={playerOpen}
              videoType={videoType}
              url={localFile}
              setPlayerOpen={setPlayerOpen}
              className="yt-player"
              setVideoType={setVideoType}
            />
          </div>
        )}

        {isAudio && playerOpen && videoType === "audio/mpeg" && (
          <div className="audio-wrapper">
            <div onClick={handleClose} className="close-handler">
              <img src={backBtn.src} alt="close" />
            </div>
            <div className="audio-label-div">
              <img className="label-img" src={CoverImg.src} alt={"label"} />
            </div>
            <div className="audio-div">
              <audio className="audio-wrapper-div" autoPlay controls>
                <source src={localFile} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Landing;
