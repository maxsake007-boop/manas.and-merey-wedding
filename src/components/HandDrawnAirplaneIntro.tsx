import React, { useState, useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';
import { audioManager } from '../services/audioManager';

interface HandDrawnAirplaneIntroProps {
  t: {
    title: string;
    openBtn: string;
  };
  onOpen: () => void;
}

export const HandDrawnAirplaneIntro: React.FC<HandDrawnAirplaneIntroProps> = ({ t, onOpen }) => {
  const [isFlying, setIsFlying] = useState(false);
  const [isContentFading, setIsContentFading] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);

  // Directly load the user's animation file from public/animation/t0y99yWlsv.json
  useEffect(() => {
    if (lottieContainerRef.current) {
      const anim = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '/animation/t0y99yWlsv.json',
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet',
        },
      });

      animRef.current = anim;

      // As the airplane finishes its loop and accelerates towards right exit (frame 48 out of 63, ~1.6s):
      // smoothly fade out the title and button right as the airplane is about to fly out of frame!
      anim.addEventListener('enterFrame', (e: any) => {
        const frame = e && typeof e.currentTime === 'number' ? e.currentTime : anim.currentFrame;
        if (frame >= 48) {
          setIsContentFading(true);
        }
      });

      // When the Lottie airplane finishes its flight and exits the screen:
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

    // 1. Play background music immediately on click
    audioManager.tryPlay();

    // 2. Start the airplane flight animation
    setIsFlying(true);
    setIsContentFading(false);

    if (animRef.current) {
      animRef.current.goToAndPlay(0, true);
    }

    // Safety fallback timer for content fade-out in case enterFrame doesn't fire
    setTimeout(() => {
      setIsContentFading(true);
    }, 1650);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center select-none overflow-hidden transition-all duration-700 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundColor: '#f7f6f2',
      }}
    >
      {/* Fullscreen Lottie Animation from public/animation/t0y99yWlsv.json */}
      <div
        ref={lottieContainerRef}
        className={`fixed inset-0 w-full h-full pointer-events-none z-20 transition-opacity duration-200 ${
          isFlying ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Centered Resting State: Title at top, space in middle for airplane flight, Button directly below */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-xl transition-all duration-700 ease-out ${
          isContentFading ? 'opacity-0 -translate-y-3 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Title above */}
        <h1
          className="text-[27px] sm:text-[32px] md:text-4xl lg:text-5xl text-stone-900 font-medium tracking-normal leading-tight select-none px-4"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic' }}
        >
          {t.title}
        </h1>

        {/* Space between title and button where the airplane swoops and loops */}
        <div className="h-44 sm:h-52 md:h-60 w-full pointer-events-none" />

        {/* Button directly below the space */}
        <div>
          <button
            id="open-invitation-btn"
            type="button"
            onClick={handleOpen}
            className="px-11 py-4 rounded-full bg-[#222222] hover:bg-black text-[#f7f6f2] text-lg sm:text-xl font-serif-clean shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-95 border border-stone-800 tracking-wide font-medium"
          >
            {t.openBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
