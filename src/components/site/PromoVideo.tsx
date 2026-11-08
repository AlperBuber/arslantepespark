import { MouseEvent, useEffect, useRef, useState } from "react";
import { Maximize, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";

const SRC = "/video/arslantepe-spark-tanitim.mp4";
const POSTER = "/video/arslantepe-spark-tanitim-kapak.jpg";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

// Yerleşik tarayıcı kontrolleri yerine sade, özel kontroller (üç nokta menüsü, indirme vb. yok).
export default function PromoVideo() {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const hideTimer = useRef<number>();
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [idle, setIdle] = useState(false);

  useEffect(() => () => window.clearTimeout(hideTimer.current), []);

  const wake = () => {
    setIdle(false);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setIdle(true), 2500);
  };

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused || v.ended) {
      setStarted(true);
      void v.play();
    } else v.pause();
  };

  const seek = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const v = video.current;
    if (!v || !v.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1) * v.duration;
    wake();
  };

  const toggleMute = (e: MouseEvent) => {
    e.stopPropagation();
    if (!video.current) return;
    video.current.muted = !video.current.muted;
    setMuted(video.current.muted);
  };

  const fullscreen = (e: MouseEvent) => {
    e.stopPropagation();
    const v = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (document.fullscreenElement) void document.exitFullscreen();
    else if (wrap.current?.requestFullscreen) void wrap.current.requestFullscreen();
    else v?.webkitEnterFullscreen?.(); // iPhone Safari
  };

  const showBar = started && (!playing || !idle);
  const progress = duration ? (time / duration) * 100 : 0;

  return (
    <div
      ref={wrap}
      onMouseMove={wake}
      onClick={toggle}
      className={`group/video relative mx-auto mb-12 md:mb-16 max-w-5xl aspect-video overflow-hidden rounded-2xl bg-black ring-1 ring-ivory/10 shadow-bronze select-none ${playing && idle ? "cursor-none" : "cursor-pointer"}`}
    >
      <video
        ref={video}
        src={SRC}
        poster={POSTER}
        preload="metadata"
        playsInline
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
        onPlay={() => { setPlaying(true); setEnded(false); wake(); }}
        onPause={() => setPlaying(false)}
        onEnded={() => setEnded(true)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        className="absolute inset-0 h-full w-full object-contain"
      />

      {/* Ortadaki oynat düğmesi: başlamadan önce, duraklatınca ve bitince */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-5 transition-opacity duration-500 ${
          playing ? "pointer-events-none opacity-0" : "opacity-100"
        } ${started ? "bg-charcoal/45" : "bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent"}`}
      >
        <button
          type="button"
          aria-label={ended ? "Tekrar izle" : "Tanıtım filmini oynat"}
          onClick={(e) => { e.stopPropagation(); toggle(); }}
          className="relative grid h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 place-items-center rounded-full bg-gradient-bronze text-ivory shadow-bronze transition-transform duration-300 hover:scale-105 group-hover/video:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-glow focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
        >
          {!started && <span className="absolute inset-0 rounded-full border border-bronze-glow/60 animate-[ping_2.6s_cubic-bezier(0,0,0.2,1)_infinite]" aria-hidden />}
          {ended ? <RotateCcw className="h-6 w-6 sm:h-8 sm:w-8 md:h-9 md:w-9" /> : <Play className="ml-1 h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 fill-current" />}
        </button>
        {!started && (
          <span className="absolute bottom-3 sm:bottom-6 md:bottom-8 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.24em] text-ivory/90">
            Tanıtım Filmi{duration ? ` · ${fmt(duration)}` : ""}
          </span>
        )}
      </div>

      {/* Alt kontrol çubuğu */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute inset-x-0 bottom-0 flex items-center gap-3 md:gap-4 bg-gradient-to-t from-black/75 to-transparent px-4 md:px-6 pb-3 md:pb-4 pt-10 text-ivory transition-opacity duration-300 ${
          showBar ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button type="button" aria-label={playing ? "Duraklat" : "Oynat"} onClick={(e) => { e.stopPropagation(); toggle(); }} className="opacity-90 transition hover:text-bronze-glow hover:opacity-100">
          {playing ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
        </button>
        <div onClick={seek} className="group/bar relative flex h-4 flex-1 cursor-pointer items-center" role="slider" aria-label="İlerleme" aria-valuemin={0} aria-valuemax={Math.round(duration)} aria-valuenow={Math.round(time)}>
          <div className="h-1 w-full overflow-hidden rounded-full bg-ivory/25 transition-all group-hover/bar:h-1.5">
            <div className="h-full rounded-full bg-gradient-bronze transition-[width] duration-200 ease-linear" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <span className="text-xs tabular-nums text-ivory/80">
          {fmt(time)} / {fmt(duration)}
        </span>
        <button type="button" aria-label={muted ? "Sesi aç" : "Sesi kapat"} onClick={toggleMute} className="opacity-90 transition hover:text-bronze-glow hover:opacity-100">
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
        <button type="button" aria-label="Tam ekran" onClick={fullscreen} className="opacity-90 transition hover:text-bronze-glow hover:opacity-100">
          <Maximize className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
