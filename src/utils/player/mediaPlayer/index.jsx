import React, { useEffect, useState, useRef, useContext } from 'react'
import "./styles.css"
import { CircularProgress } from '@mui/material'
import { Close } from "@mui/icons-material"
import { getFavourites,removeMovieFromRecents, saveWatchedContent } from '@/firebase/functions'
import { AppContext } from '@/contexts/app'
import { useBeforeunload } from 'react-beforeunload'
import SpeedIcon from '@mui/icons-material/Speed';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Replay10Icon from '@mui/icons-material/Replay10';
import Forward10Icon from '@mui/icons-material/Forward10';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image'
import backBtn from "@/assets/backBtn.svg"


const MediaPlayer = ({src,type,onNext,series,timeline,close,currentPlaying,info,loginType,id,videoType}) => {
  const [player, setPlayer] = useState(null)
  const [speedOptionsShow, setSpeedOptionsShow] = useState(false);
  const [controlsActive, setControlsActive] = useState(true);
  const [playActive, setPlayActive] = useState(true);
  const playerRef = useRef(null);
  const episodeOptionRef = useRef(null);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(false);
  const [finalAddress, setFinalAddress] = useState(null);
  const [videoPaused, setVideoPaused] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [lastEpisode, setLastEpisode] = useState("");
  const [speed, setSpeed] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenAvailable, setFullscreenAvailable] = useState(false);
  const [movieInfo, setMovieInfo] = useState(null);
  const [favourites, setFavourites] = useState([]);  const { user, alert } = useContext(AppContext);
  const [intervalPassed, setIntervalPassed] = useState(false);
  const [ isSong ,setIsSong] = useState(false);
  const getFavs = async (address) => {
    try {
      const response = await getFavourites(type === 'movies' ? 'Movie' : 'Series', address);
      const keys = response.val() ? Object.keys(response.val()) : [];
      setFavourites(keys);
    } catch (error) {
      console.log('ERROR', error);
    };
  };

  const handleSeek = {
    forward: () => player.seek(player.video.time + 10),
    back: () => player.seek(player.video.time - 10),
    jump: (time) => player.seek(time),
    playPause: () => {
      setPlayActive(!playActive);
      if (playActive) {
        player.pause()
      } else {
        player.play();
      }
    }
  }

  const handleSpeed = (e) => {
    const speed = Number(e);
    player.speed(speed);
    setSpeed(speed);
    setSpeedOptionsShow(false)
  }

  const handleControls = (e) => {

    // if (videoLoaded) {
    //   const controls = playerRef.current.childNodes[0].childNodes[1].childNodes[1].childNodes[11];

    // if (controls) {
    //   controls.style.opacity = 1;
    //   controls.style.pointerEvents = "auto";
    //   setTimeout(() => {
    //     controls.style.opacity = 0;
    //     controls.style.pointerEvents = "none";
    //   }, 10000);
    // }
    // }
    setControlsActive(true);
  };

  const changeOrientation = (type) => {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      // Mobile device
      if (type === "lock") {
        document.documentElement.requestFullscreen();
        screen.orientation.lock("landscape")
      } else {
        document.documentElement.requestFullscreen();
        screen.orientation.lock("portrait")
      }
    }
  }

  const handleClick = e => {
    const episodesContainer = document.getElementById("episodes-container");
    const episodeOption = episodeOptionRef.current;
    if (!episodesContainer?.contains(e.target) && !episodeOption?.contains(e.target)) {
      setShowEpisodes(false);
      setControlsActive(true)
    }
  }

  const removeMovie = async () => {
    // setVideoFinished(true);
    // changeOrientation("unlock")
    if (type === "series") {
      const seasons = Object.keys(series.episodes).length
      const lastSeasonEpisodes = series.episodes[seasons];
      const endEpisode = lastSeasonEpisodes[lastSeasonEpisodes.length - 1];
      setLastEpisode();
      changeOrientation("unlock")
      if (String(endEpisode.id) !== String(currentPlaying.id)) {
        await saveTimeline()
        onNext();
      } else {
        try {
          await removeMovieFromRecents(id, 'Series', user.dbAddress, 'remove');

        } catch (error) {
          console.log(error)

        }
        handleClose();

      }
    }
    else if (
      type === 'series-m3u'
    ) {
      try {
        await removeMovieFromRecents(id, 'Series', finalAddress);
      } catch (error) {
        console.log(error)
      }
      handleClose();

    }
    else {
      try {
        await removeMovieFromRecents(id, 'Movie', finalAddress);
      } catch (error) {
        console.log(error)
      }
      // changeOrientation("unlock")
      handleClose();
    }
    // saveTimeline();
    // handleClose()
  }

  const isPortrait = () => {
    return window.innerWidth < window.innerHeight;
  }

  const saveTimeline = async () => {
    const { time } = player.video;
    const duration = player.video.duration;
    if (time > 10) {
      if (type !== 'm3u') {
        if (type === "series") {
          try {
            await saveWatchedContent.series(id, user.dbAddress, {
              season: String(currentPlaying.season),
              timeline: time,
              thumbnail:series.episodes[currentPlaying.season].filter(val => val.id == currentPlaying.id)[0].info.movie_image ? series.episodes[currentPlaying.season].filter(val => val.id == currentPlaying.id)[0].info.movie_image : series.info.cover,
              episodeName: currentPlaying.title,
              duration: duration,
              lastWatched: "true"
            }, currentPlaying.id);
          } catch (error) {
            console.log(error);
          }
        }
        else if (type === 'series-m3u') {
          try {
            await saveWatchedContent.series(id, user.dbAddress, {
              season: '',
              episode: '',
              timeline: time,
              thumbnail: '',
              duration: duration
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            await saveWatchedContent.movie(id, user.dbAddress, {
              timeline: time,
              thumbnail: info?.info?.movie_image ? info?.info?.movie_image : "",
              duration: duration
            });
          } catch (error) {
            console.log(error);
          };
        };
      }

    };
  };

  const handleBack = async () => {
    // changeOrientation("unlock")
    setError(false);
    if (!videoFinished) {
      saveTimeline();
    }
    if (fullscreen) {
      document.exitFullscreen();
    }
    handleClose();
  };

  const handleFullScreen = () => {

    if (fullscreen) {
      document.exitFullscreen();
    } else {
      // document.getElementById('player').requestFullscreen();
      if (document.documentElement.requestFullscreen) {
        // Most browsers
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        // Firefox (Gecko) 
        document.documentElement.mozRequestFullScreen();

      } else if (document.documentElement.webkitRequestFullscreen) {
        // Safari (WebKit)
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
    }
  };

  const handleClose = () => {
    player.shutdown();
    close();
  };

  useBeforeunload(e => {
    if (player) {
      e.preventDefault()
      saveTimeline()
    };
  });

  const speedOptions = [1, 2, 3, 4];

  const onChangeFullscreen = () => {
    setFullscreen(document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', onChangeFullscreen);
    return () => document.removeEventListener("fullscreenchange", onChangeFullscreen)
  }, []);

  useEffect(() => {
    if (player) {
      if (showEpisodes) {
        player.pause()
      } else {
        player.resume()
      }
    }
  }, [showEpisodes, player])

  useEffect(() => {
    if (controlsActive) {
      if (!showEpisodes) {
        setTimeout(() => {
          setControlsActive(false);
          setSpeedOptionsShow(false)
        },2000);
      }
    };
    if (playerRef.current && videoLoaded) {
      const nodes = playerRef.current.childNodes[0].childNodes[1].childNodes[1].childNodes;
      nodes.forEach(node => {
        if (node.className === "fp-controls") {
          node.style.opacity = controlsActive ? 1 : 0;
          node.style.visibility = controlsActive ? "visible" : "hidden";
        }
      })
    };
  }, [controlsActive, playerRef])

  useEffect(() => {
    setPlayer(window.flowplayer("#player-wrapper", {
      autoplay: true,
      ratio: "1:1",
      controls: false,
      muted: false,
      key: "webtvsecretggkey ngt8XJKe",
      clip: {
        sources: [
          {
            type:videoType ==="video/mp4" ? "video/mp4": "application/x-mpegURL",
            src: src,
          },
        ]
      },
    }));
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev === 95) {
          return 95
        } else {
          return prev + 5
        }
      });
    }, 500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setFullscreenAvailable(document.fullscreenEnabled ||
      document.mozFullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.msFullscreenEnabled)
  }, []);

  useEffect(() => {
    if (player) {
      // changeOrientation("lock")
      player.on("ready", () => {
        // window.alert("Data has been loaded")
        if(videoType === 'audio/mpeg'){
          setIsSong(true)
        }
        setVideoLoaded(true);
      });
      player.on("loadedmetadata", () => {
        window.alert("Video Loaded")
      })
      player.on("progress", () => {
        setVideoLoaded(true)
        if (!videoStarted) {
          setVideoStarted(true);
        }
      })
      player.on("error", () => {
        setError(true);
      });
      player.on("buffer", () => {
        // setVideoLoaded(false)
      });
      player.on("finish", () => {
        // removeMovie();
      });
      player.on('pause', () => {
        setPlayActive(false);
        setControlsActive(true);
        setVideoPaused(true);
      });
      player.on('resume', () => {
        setPlayActive(true);
        setVideoPaused(false)
      });
    }
  }, [player]);

  useEffect(() => {
    if (user) {
      setFinalAddress(user.dbAddress);
      getFavs(user.dbAddress)
    }
  }, [user]);

  useEffect(() => {
    if (videoStarted) {
      if (timeline) {
        handleSeek.jump(timeline);
        setVideoLoaded(false)
      }
    }
  }, [videoStarted]);

  useEffect(() => {
    if (info) {
      const movieDetails = {
        name: loginType === 'one-stream-panel' ? info.vod.name : loginType === 'player-api' ? info?.info?.name : info.name ? info.name : info.title,
        streamId: loginType === 'one-stream-panel' ? info.vod.stream_id : loginType === 'player-api' ? info.movie_data.stream_id : null,
      }
      setMovieInfo(movieDetails);
    }
  }, [info]);

  useEffect(() => {
    if (series) {
      const seasons = Object.keys(series.episodes).length
      const lastSeasonEpisodes = series?.episodes[seasons];
      const endEpisode = lastSeasonEpisodes[lastSeasonEpisodes?.length - 1];
      setLastEpisode(endEpisode.id);
    }
  }, [series]);

  useEffect(() => {
    setTimeout(() => {
      setIntervalPassed(true);
    }, 2000);
  }, [])




  return (
    <div
      id='player'
      onClick={handleClick}
      onMouseMove={handleControls}
      onTouchStart={handleControls}
      className=" video-player1 video-player-container"
      ref={playerRef}>
      <div style={{
        background: 'black'
      }} id="player-wrapper">
      </div>
      {
        controlsActive &&
        <div onClick={handleBack} style={{zIndex:9999999,position:'absolute',top:'20px',left:'0px',cursor:'pointer'}}>
          <img src={backBtn.src} style={{width:"50px",height:"40px",marginLeft:"5px"}} />
        </div>
      }
      {
        videoLoaded ?
          <>
            <div className={
              `${controlsActive ?
                "seek-options"
                : "seek-options-notShow"}`
            }>
             <div onClick={handleSeek.back} style={{background:"transparent",cursor:"pointer", display:"flex",alignItems:'center',justifyContent:'center',}}><Replay10Icon sx={{fontSize:"50px",color:'white'}}/> </div>
             <div onClick={handleSeek.playPause} style={{background:"transparent",cursor:"pointer", display:"flex",alignItems:'center',justifyContent:'center',}}> {playActive ? <PauseCircleOutlineIcon sx={{fontSize:"80px",color:'white'}}/>: <PlayCircleOutlineIcon sx={{fontSize:"80px",color:'white'}}/> }</div>
             <div onClick={handleSeek.forward} style={{background:"transparent",cursor:"pointer", display:"flex",alignItems:'center',justifyContent:'center',}}> <Forward10Icon sx={{fontSize:"50px",color:'white'}} /></div>
            </div>
            <div className={`${controlsActive ? "bottom-options" : "bottom-options-notShow"}`}>
              {
                fullscreenAvailable &&
                <div onClick={handleFullScreen} className="option">
                    <div> <p>{fullscreen ? <FullscreenExitIcon  sx={{fontSize:"50px",color:'white'}}/> : <FullscreenIcon  sx={{fontSize:"50px",color:'white'}}/>}</p> </div>
                  {!isPortrait() && <p>{ fullscreen ? 'Minimize': 'Fullscreen' } </p>}
                </div>
              }
              <div className="option">
                <div onClick={() => setSpeedOptionsShow(!speedOptionsShow)} className='sub-option'>
                <SpeedIcon  sx={{fontSize:"50px",color:'white'}}/>
                  {!isPortrait() && <p>Speed {`(${speed}x)`}</p>}
                </div>
                {
                  speedOptionsShow &&
                  <div className='speed-menu' >
                    <div className='dropdown-container'>
                      {
                        speedOptions.map(option => <p className={speed === option ? "current-selected" : ""} onClick={() => handleSpeed(option)}>{option}x</p>)
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          </> :
          <div className='progress-loader-container'>
            <div className="sexySpinner">
              <div className="sexySpinnerRing ring1"></div>
              <div className="sexySpinnerRing ring2"></div>
              <div className="sexySpinnerDot"></div>
            </div>
          </div>
      }
      {
        error &&
        <div className='invalid-user-popupp'>
          <Close className='cross-icon' color='error' />
          <p className='invalid-title'>Sorry, this video can not be played, Try again later</p>
          <button onClick={handleBack} className='ok-btn'>OK</button>
        </div>
      }/
    </div >
  )
}

export default MediaPlayer;