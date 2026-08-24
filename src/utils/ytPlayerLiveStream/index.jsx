import React, { useEffect, useRef } from 'react';
import backBtn from "@/assets/backBtn.svg"
import "./styles.css";

const YoutubePlayer = ({ playerOpen, videoType, url, setPlayerOpen,setVideoType }) => {
  const playerRef = useRef(null);
  useEffect(() => {
    if (!playerOpen || videoType !== "youtube") return;

    const loadPlayer = () => {
      const yt = new URL(url);
    const videoId = yt.searchParams.get("v");
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId,
        playerVars: {
          autoplay: 1,
          rel: 0,
         
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              console.log("Video finished");
              setPlayerOpen(false); // ✅ Close overlay
              setUrl('')
            }
          },
        },
      });
    };

    // Load the IFrame API if it's not already loaded
    if (!window.YT || !window.YT.Player) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = loadPlayer;
    } else {
      loadPlayer();
    }

    // Cleanup on unmount or player close
    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [playerOpen, videoType, url, setPlayerOpen]);

  return (
    <>
      {playerOpen && videoType === "youtube" && (
        <div className='youtube-player-wrapper'>
          
          <button onClick={() => {setPlayerOpen(false), setVideoType(null)}}>
              <img src={backBtn.src} />
          </button>
          <div id="youtube-player" />
        </div>
      )}
    </>
  );
};

export default YoutubePlayer;