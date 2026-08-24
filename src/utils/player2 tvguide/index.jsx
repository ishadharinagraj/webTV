import VideoJS from "@/pages/dashboard/live/player/videojs";
import videojs from "video.js";
import { useRef, useEffect, useState, useContext } from "react"
import "./styles.css"
import nextEpisode from "@/assets/nextEpisode.svg"
import aspectRatio from "@/assets/aspectRatio.svg"
import Image from "next/image";
import { AppContext } from "@/contexts/app";
import SensorsIcon from '@mui/icons-material/Sensors';
import playBtn from "@/assets/playBtn.svg"
import pauseBtn from "@/assets/pauseBtn.svg"
import { addToFavs, removeFromFavs } from "@/firebase/functions";
import backBtn from "@/assets/backBtn.svg"
import { concatUrl } from "@/methods/concatUrl";


const VideoJSPlayer = ({ src,
  opened,
  onPlayerReady,
  currentStreams,
  onPreviousChannel, 
  onNextChannel,
  currentStream,
  onclose,
  favourites = [],
  playingStream,
  getFavouriteChannels,
  onfullscreen,
  restart }) => {
  const [fullscreen, setFullscreen] = useState(false);
  const [player, setPlayer] = useState(null);
  const [previousExists, setPreviousExists] = useState(false);
  const [nextExists, setNextExists] = useState(false);
  const [currentStreamIndex, setCurrentStreamIndex] = useState(null)
  const [controlsActive, setControlsActive] = useState(true);
  const [controlsTimer, setControlsTimer] = useState(null);
  const [error, setError] = useState(false);
  const [fullwidth, setFullwidth] = useState(false);
  const [playActive, setPlayActive] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [fullscreenAvailable, setFullscreenAvailable] = useState(false);

  const playerRef = useRef(null);
  const { user, alert } = useContext(AppContext);

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    // You can handle player events here, for example:
    setPlayer(player)
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
    player.on("playing", () => {
      setPlayActive(true);
      onPlayerReady();
      setPlayerReady(true);
      setError(false);
    })
    player.on("error", () => {
      setError(true);
      setControlsActive(true)
    });
    player.on("play", () => {
      setPlayActive(true);
    })
    player.on("pause", () => {
      setPlayActive(false);
    })
    player.on('useractive', function () {
      setControlsActive(true);
    });
    player.on('userinactive', function () {
      setControlsActive(false);
    });
  };

  const handleAspectRatio = () => {
    if (fullscreen) {
      document.exitFullscreen();
      onclose();

    } else {
      document.getElementById("video-js-player-id").requestFullscreen();
    }
  };
  const onChangeFullscreen = () => {
    setFullscreen(document.fullscreenElement);
    onfullscreen(document.fullscreenElement);
  }


  const handlePlayPause = () => {
    if (playActive) {
      player.pause();
    } else {
      player.play();
    }
  };


  const handleBack = () => {
    if (fullwidth) {
      setFullwidth(false)
    }
    if (fullscreen) {
      document.exitFullscreen();
    }
    onclose();
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', onChangeFullscreen);
    return () => document.removeEventListener("fullscreenchange", onChangeFullscreen)
  }, [])

  useEffect(() => {
    setFullscreenAvailable(document.fullscreenEnabled ||
      document.mozFullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.msFullscreenEnabled)
  }, []);

  useEffect(() => {
    if (opened && player) {
      // setFullwidth(true);
      onfullscreen(true);
    }
  }, [opened, player])

  useEffect(() => {
    if (user) {
      if (currentStreams.length === 1) {
        setPreviousExists(false);
        setNextExists(false);
        setCurrentStreamIndex(0);
      } else {
        currentStreams.map((stream, index) => {
          if (user.loginType === 'm3u'? concatUrl(stream.url) === currentStream :String(stream.stream_id) === String(currentStream)) {
            setCurrentStreamIndex(index);
            if (index > 0) {
              setPreviousExists(true);
            } else {
              setPreviousExists(false);
            }
            if (index === currentStreams.length - 1) {
              setNextExists(false)
            } else {
              setNextExists(true)
            }
          }else{
            const currentPlayingIndex = currentStreams?.findIndex((item)=> String(item.stream_id) === String(playingStream));
            setCurrentStreamIndex(currentPlayingIndex)
          }
        });
      }
    }
  }, [currentStreams, currentStream, user]);

  const handleAddToFav = async () => {
    const isFavourite = favourites.filter(item => item === currentStream).length > 0;

    try {
      if (isFavourite) {
        await removeFromFavs(currentStream, 'LiveTv', user.dbAddress);
        alert.toggle({
          show: true,
          title: 'Removed from Favourites',
          type: 'success'
        });
      } else {
        await addToFavs(currentStream, 'LiveTv', user.dbAddress);
        alert.toggle({
          show: true,
          title: 'Added to Favourites',
          type: 'success'
        });
      }

    } catch (error) {
      alert.toggle({
        show: true,
        title: 'Something went wrong !',
        type: 'error'
      });
    };
    getFavouriteChannels()
  };




  const controlStyles = {
    headerFooter: {
      opacity: controlsActive ? 1 : 0,
      height: controlsActive ? '150px' : 0,
      transition: '.5s'
    },
    playPause: {
      opacity: controlsActive ? 1 : 0,
      visibility: controlsActive ? 'visible' : 'hidden',
      transition: '.5s'
    }
  }

  return <div
    id="video-js-player-id"
    className={`video-js-player${(fullwidth || fullscreen) ? '-fullscreen' : ''}`}>

      <svg onClick={handleAddToFav} className='add-to-fav-icon' width="40" height="36" style={{ zIndex: 9999999, position: 'absolute', top: '12px', right: '20px', background: '#0d1e23', padding: '7px', display: ((controlsActive && fullscreen) || (controlsActive && fullwidth)) ? "block" : "none", cursor: "pointer" }} viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M29.2239 7.73189C29.2239 8.12625 29.2239 8.52061 29.2239 8.91467C29.2091 8.99632 29.1875 9.07738 29.181 9.15933C29.0718 10.5385 28.6337 11.8136 27.9606 13.0141C27.113 14.5265 25.9933 15.827 24.7685 17.0364C21.7994 19.9679 18.5333 22.5639 15.3951 25.3043C15.0229 25.6294 14.5771 25.6093 14.1904 25.2874C13.8659 25.0173 13.5469 24.7404 13.2289 24.4623C10.706 22.2574 8.16057 20.0782 5.67077 17.8369C4.12678 16.4471 2.71503 14.9182 1.69378 13.0851C-0.0217981 10.006 -0.113805 6.88017 1.61036 3.78242C2.56563 2.06565 4.04069 0.913648 5.94354 0.375217C7.9733 -0.19901 9.91905 0.00807828 11.7287 1.14352C12.8804 1.86626 13.7579 2.85732 14.4765 3.99927C14.5827 4.1679 14.6862 4.33801 14.7629 4.46167C15.3081 3.75845 15.7856 3.01796 16.3841 2.39344C18.4931 0.19357 21.056 -0.47858 23.9434 0.472844C26.661 1.36835 28.2366 3.37771 28.9393 6.10329C29.0762 6.63521 29.131 7.18843 29.2239 7.73189Z" fill={
        favourites.filter(item => item === currentStream).length > 0 ? "#FF0000" :
          "white"
      } /> </svg>
    <Image
      style={{
        display: !(fullwidth || fullscreen) && "none",
        ...controlStyles.playPause
      }}
      onClick={handleBack} className='back-btn' src={backBtn} alt="back-btn" />
    {
      <VideoJS
        onReady={handlePlayerReady}
        options={{
          autoplay: true,
          controls: true,
          responsive: true,
          fluid: true,
          liveui: true,
          sources: [{
            src: src,
            type: 'application/x-mpegURL'
          }]
        }}
      />
    }

    <div className="vjs-header">
      <h3 className="channel-name">{playingStream ? playingStream.name : currentStreams && currentStreams[currentStreamIndex]?.name}</h3>
      <div className="live-indicator">
        <div className="dot" ></div>
        <p>Live</p>
      </div>
    </div>

    <Image
      style={controlStyles.playPause}
      onClick={handlePlayPause} className='play-pause-btn' src={playActive ? pauseBtn : playBtn} alt="back-btn" />

    <div style={controlStyles.headerFooter} className="vjs-player-btns-container">

      {
        previousExists &&
        <div onClick={() => onPreviousChannel(currentStreamIndex)} className="option">
          <Image alt="placeholder" src={nextEpisode} />
          <p>Previous Channel</p>
        </div>

      }
      {
        fullscreenAvailable &&

        <div onClick={handleAspectRatio} className="option">
          <Image alt="placeholder" src={aspectRatio} />
          <p>Aspect Ratio</p>
        </div>
      }
      {
        nextExists &&
        <div onClick={async () => {
          player.dispose();
          setTimeout(() => {
            onNextChannel(currentStreamIndex)
          }, 100);
        }} className="option">
          <Image alt="placeholder" src={nextEpisode} />
          <p>Next Channel</p>
        </div>
      }
    </div>
    {
      error &&
      <div className='error-modal'>

        <p>There is some error playing the video</p>
        <button onClick={() => restart(currentStreamIndex)}>Try again</button>
      </div>
    }
  </div>
};

export default VideoJSPlayer;