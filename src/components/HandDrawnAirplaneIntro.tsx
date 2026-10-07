import React, { useState, useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web/build/player/lottie_light';
import { audioManager } from '../services/audioManager';
import animationData from '../assets/plane-animation.json';

interface HandDrawnAirplaneIntroProps {
  t: {
    title: string;
    openBtn: string;
  };
  onOpen: () => void;
}

export const HandDrawnAirplaneIntro: React.FC<HandDrawnAirplaneIntroProps> = ({ t, onOpen }) => {
  const [isFlying, setIsFlying] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);

  // Initialize Lottie animation from public/animation folder (t0y99yWlsv.json)
  useEffect(() => {
    if (lottieContainerRef.current) {
      const anim = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet',
        },
      });

      animRef.current = anim;

      // When the airplane finishes its loop flight and flies off-screen:
      anim.addEventListener('complete', () => {
        setIsFadingOut(true);
        setTimeout(() => {
          onOpen();
        }, 350);
      });

      return () => {
        anim.destroy();
      };
    }
  }, [onOpen]);

  const handleOpen = () => {
    if (isFlying) return;

    // 1. Play music immediately on user gesture
    audioManager.tryPlay();

    // 2. Hide intro UI and trigger Lottie flight
    setIsFlying(true);

    if (animRef.current) {
      animRef.current.goToAndPlay(0, true);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center select-none overflow-hidden transition-all duration-500 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundColor: '#f7f6f2',
      }}
    >
      {/* Fullscreen Lottie Airplane Loop Animation */}
      <div
        ref={lottieContainerRef}
        className={`fixed inset-0 w-full h-full pointer-events-none z-20 transition-opacity duration-200 ${
          isFlying ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Centered Resting State: Title directly above -> Large plane -> Button directly below */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-xl transition-all duration-300 ${
          isFlying ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Title directly above the plane */}
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-stone-900 font-medium tracking-normal leading-tight select-none mb-3 sm:mb-4"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic' }}
        >
          {t.title}
        </h1>

        {/* Paper Plane in the center, enlarged, clickable */}
        <div
          onClick={handleOpen}
          className="cursor-pointer group flex flex-col items-center justify-center my-1 sm:my-2"
          title={t.openBtn}
        >
          <div className="transition-transform duration-300 hover:scale-105 active:scale-95">
            <img
              src="/paper-plane.png"
              alt="Самолётик"
              className="w-56 sm:w-64 md:w-72 lg:w-80 h-auto select-none pointer-events-none drop-shadow-md"
            />
          </div>
        </div>

        {/* Button directly below the plane, slightly down */}
        <div className="mt-3 sm:mt-4">
          <button
            id="open-invitation-btn"
            type="button"
            onClick={handleOpen}
            className="px-10 py-3.5 rounded-full bg-[#222222] hover:bg-black text-[#f7f6f2] text-base sm:text-lg font-serif-clean shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-95 border border-stone-800 tracking-wide font-medium"
          >
            {t.openBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
