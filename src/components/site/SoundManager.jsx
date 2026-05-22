import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAudioStore } from "@/hooks/useAudio";

export function SoundManager() {
  const { isMuted } = useAudioStore();
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  
  // Background Music Ref
  const bgMusicRef = useRef(null);
  
  // Initialize audio object once
  useEffect(() => {
    const audio = new Audio("/audio/43861138-game-of-thrones-211870.mp3");
    audio.crossOrigin = "anonymous";
    audio.loop = true;
    audio.volume = 0.15;
    bgMusicRef.current = audio;

    // cleanup on unmount
    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
    };
  }, []);

  // Sound URLs
  const transitionSound = "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3";
  const clickSound = "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3";

  const playSound = (url) => {
    if (isMuted) return;
    const audio = new Audio(url);
    audio.crossOrigin = "anonymous";
    audio.volume = 0.2;
    audio.play().catch(() => {});
  };

  // Background Music Effect & Autoplay Fix
  useEffect(() => {
    const bgMusic = bgMusicRef.current;
    if (!bgMusic) return;

    // Force autoplay attempt
    bgMusic.autoplay = true;

    const attemptPlay = () => {
      if (!isMuted && bgMusic.paused) {
        bgMusic.play().then(() => {
          // Success! Clean up listeners
          window.removeEventListener("click", attemptPlay);
          window.removeEventListener("touchstart", attemptPlay);
          window.removeEventListener("mousedown", attemptPlay);
          window.removeEventListener("keydown", attemptPlay);
          window.removeEventListener("scroll", attemptPlay);
        }).catch((err) => {
          // Still blocked
        });
      }
    };

    if (!isMuted) {
      // Try to play immediately (might work in some browsers or if user already interacted)
      attemptPlay();
      
      // Also listen for ANY interaction including scroll
      window.addEventListener("click", attemptPlay);
      window.addEventListener("touchstart", attemptPlay);
      window.addEventListener("mousedown", attemptPlay);
      window.addEventListener("keydown", attemptPlay);
      window.addEventListener("scroll", attemptPlay);
    } else {
      bgMusic.pause();
    }

    return () => {
      window.removeEventListener("click", attemptPlay);
      window.removeEventListener("touchstart", attemptPlay);
      window.removeEventListener("mousedown", attemptPlay);
      window.removeEventListener("keydown", attemptPlay);
      window.removeEventListener("scroll", attemptPlay);
    };
  }, [isMuted]);

  useEffect(() => {
    // Play transition sound when pathname changes
    if (location.pathname !== prevPathRef.current) {
      playSound(transitionSound);
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname, isMuted]);

  useEffect(() => {
    // Global click listener for UI elements
    const handleGlobalClick = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        playSound(clickSound);
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [isMuted]);

  return null;
}
