import React, { useEffect, useContext, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import "@/app/css/main.css";
import "@/app/css/theme.css";
import { playlistIcons } from "@/constants/landing/index";
import "./styles.css";
import { AppContext } from "@/contexts/app";
import { getUser } from "@/utils/local";
import { m3utojson } from "./render";
import ViewListIcon from "@mui/icons-material/ViewList";
import StorageIcon from "@mui/icons-material/Storage";
import MediaPlayer from "@/utils/player/mediaPlayer";
import { CleaningServices } from "@mui/icons-material";
import CoverImg from "../assets/cover.jpg";
import CloseIcon from "@mui/icons-material/Close";
import localIcon from "../assets/local.png";
import streamIcon from "../assets/stream.png";
import Image from "next/image";
import backBtn from "@/assets/backBtn.svg"
import YouTubePlayer from "@/utils/ytPlayerLiveStream";



const Landing = () => {
  const router = useRouter();
  const { alert } = useContext(AppContext);
  const pathname = useSearchParams().get("action");
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

  const userExists =
    getUser() && getUser().length > 0 && !(pathname === "add-profile");
  useEffect(() => {
    if (userExists) {
      router.push("/playlists");
    }
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
      setLocalFile(URL.createObjectURL(files[0])); // Set the first file as the current file to play
      setPlayerOpen(true); // Open the player when a file is selected
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
    //   router.push('/?action=add-profile')
  };

  // const handleFileChange = (event) => {
  //     const files = Array.from(event.target.files);
  //     setSelectedFiles(files);
  //     setShowModal(true); // Show modal after file selection
  //   };

  //   const handleFileSelect = (file) => {
  //     setLocalFile(URL.createObjectURL(file));
  //     setVideoType(file.type);
  //     setPlayerOpen(true);
  //     setIsAudio(file.type.startsWith("audio/"));
  //     setShowModal(false);
  //   };

  //   const handleClose = () => {
  //     setPlayerOpen(false);
  //     setLocalFile(null);
  //     setIsAudio(false);
  //   };
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
      }else if(url.includes("https://www.youtube.com/")) {
setVideoType("youtube")
setPlayerOpen(true)
setLocalFile(url)

} 
      
      else {
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
  


const backHandler=()=>{
   setIsstream(false)
};


  return (
    <section className="splash">
      {playlistIcons.logo}
      <div>
        <p className="terms-and-conditions1">This is our demo player for testing purposes only. We do not provide any content, and this is not intended for production use.</p>
      </div>
      <div className="playList">
        {/* <Link href={loginQuery("one-stream-panel")}>
          <span className="thumb">{playlistIcons.m3u}</span>
          <span>1 STREAM PANEL</span>
          <p>( API Based )</p>
        </Link> */}
        <Link href={loginQuery("player-api")}>
          <span className="thumb">{playlistIcons.player}</span>
          <span>PLAYER API</span>
          <p>( Xtream Code API )</p>
        </Link>
        <Link href="/login/m3u">
          <span className="thumb">{playlistIcons.stalker}</span>
          <span>M3U PORTAL</span>
          <p>( M3U File & URL )</p>
        </Link>
        <Link onClick={handleClick} href="#">
          <span className="thumb">
            <img className="local-icon" src={localIcon.src} alt="local" />
          </span>
          <span>PLAY LOCAL</span>
          <p>( Audio/Video Data )</p>
        </Link>
        <input
          id="fileInput"
          type="file"
          accept="audio/*,video/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {isStream && (
          <div className="stream-wrapper-main">
             <button onClick={backHandler} className="backbutton-container">
                          <img src={backBtn.src} />
                      </button>
            <div className="main-wrapper">
              <p className="single-stream-text">Play Single Stream</p>
              <div className="input-button-wrapper">
                <input
                  onChange={(e) => {
                    setUrl(e.target.value), setError(false);
                  }}
                  placeholder="http://url_here.com:port/stream_name.extenstion"
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
                <button className="cancel-btn" onClick={urlHandler}>
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
          
         { playerOpen &&  videoType ==="youtube" && <div className='youtube-video-player' >
               <YouTubePlayer
    playerOpen={playerOpen}
    videoType={videoType}
    url={localFile}
    setPlayerOpen={setPlayerOpen}
    className="yt-player"
    setVideoType={setVideoType}
  />
            </div>
            

        }
        {isAudio && playerOpen && videoType === "audio/mpeg" && (
          <>
            <div className="audio-wrapper">
              <div  onClick={handleClose} className="close-handler">
                {/* <CloseIcon /> */}
                <img src={backBtn.src}/>
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
          </>
        )}

        <Link onClick={streamHandler} href="#">
          <span className="thumb">
            <img className="local-icon" src={streamIcon.src} alt="stream" />
          </span>
          <span>PLAY SINGLE STREAM</span>
        </Link>
      </div>
      <Link
        href="/playlists"
        onClick={handleListPlaylist}
        className="list-playlists"
      >
        <ViewListIcon fontSize="large" className="icon" />
        <p>List Playlists</p>
      </Link>
      <p className="terms-and-conditions">
        By using this web application, You must agree to{" "}
        <Link target="blank" href="https://smarterspro.com/terms-conditions/">
          Terms of Use
        </Link>
        .{" "}
      </p>
    </section>
  );
};

export default Landing;
