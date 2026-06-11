import Hls from 'hls.js';
import { Play, Pause } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface HlsPlayerProps {
  url: string;
  poster?: string;
  autoPlay?: boolean;
}

export function HlsPlayer({ url, poster, autoPlay = true }: HlsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls;
    setError(null);

    const playVideo = async () => {
      try {
        if (autoPlay) {
          await video.play();
          setIsPlaying(true);
        }
      } catch (err) {
        console.warn("Autoplay prevented:", err);
        setIsPlaying(false);
      }
    };

    if (Hls.isSupported()) {
      hls = new Hls({
        maxBufferLength: 30,
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, playVideo);
      
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              setError("Network error encountered, trying to recover...");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              setError("Media error encountered, trying to recover...");
              hls.recoverMediaError();
              break;
            default:
              setError("Cannot play this video stream.");
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (e.g. Safari)
      video.src = url;
      video.addEventListener('loadedmetadata', playVideo);
    } else {
      setError("HLS is not supported in this browser.");
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [url, autoPlay]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center border border-slate-800 shadow-2xl">
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
          <p className="text-red-400 text-sm font-medium px-4 text-center">{error}</p>
        </div>
      )}
      
      <video
        ref={videoRef}
        poster={poster}
        className="w-full h-full object-contain"
        playsInline
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        controls={true}
      />
      
      {!isPlaying && !error && (
        <button 
          onClick={togglePlay}
          className="absolute inset-0 m-auto w-16 h-16 flex items-center justify-center bg-cyan-500/80 rounded-full text-white cursor-pointer hover:scale-110 transition-transform z-10"
        >
          <Play className="w-8 h-8 fill-current ml-1" />
        </button>
      )}
    </div>
  );
}
