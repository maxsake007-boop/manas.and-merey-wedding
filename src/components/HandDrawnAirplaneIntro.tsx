import React, { useState, useEffect, useRef } from 'react';
import { Music, ChevronDown } from 'lucide-react';
import { audioManager } from '../services/audioManager';

interface HandDrawnAirplaneIntroProps {
  t: {
    title: string;
    date: string;
    openBtn: string;
    musicHint: string;
    skip: string;
  };
  onOpen: () => void;
}

// Exact Catmull-Rom cubic Bézier path reconstructed from user's sketch (media_1791380067444.png)
// in 1024x682 coordinate space: entry from lower-left -> full 360° center loop -> exit to top-right
const TRAJECTORY_PATH =
  'M 319.6 493.5 C 323.1 492.5, 333.8 489.6, 340.8 487.7 C 347.8 485.8, 354.7 484.2, 361.8 482.2 C 368.9 480.2, 376.1 478.0, 383.3 475.7 C 390.5 473.4, 397.9 471.0, 405.2 468.5 C 412.5 466.0, 419.8 463.4, 427.0 460.5 C 434.2 457.6, 441.6 454.6, 448.7 451.2 C 455.8 447.8, 462.9 444.1, 469.8 440.1 C 476.7 436.1, 488.9 433.1, 490.3 427.2 C 491.7 421.3, 483.0 409.9, 478.0 404.8 C 473.0 399.7, 465.8 400.0, 460.2 396.7 C 454.6 393.4, 449.4 389.8, 444.6 385.0 C 439.8 380.2, 434.9 374.4, 431.4 368.1 C 427.9 361.8, 424.7 354.6, 423.5 347.2 C 422.3 339.8, 422.3 331.3, 424.1 323.9 C 425.9 316.5, 429.6 308.9, 434.1 302.8 C 438.6 296.8, 444.7 291.6, 451.0 287.6 C 457.3 283.6, 464.5 280.6, 471.7 279.0 C 478.9 277.4, 486.9 276.7, 494.2 277.7 C 501.5 278.7, 508.9 281.3, 515.3 285.1 C 521.7 288.9, 528.2 294.2, 532.6 300.3 C 537.0 306.4, 539.9 314.3, 541.8 321.9 C 543.6 329.5, 544.2 337.8, 543.7 345.7 C 543.2 353.6, 541.3 361.7, 538.5 369.3 C 535.7 376.9, 531.2 384.3, 527.0 391.2 C 522.8 398.1, 511.4 407.8, 513.1 410.8 C 514.9 413.8, 529.5 410.3, 537.5 409.2 C 545.5 408.1, 553.1 406.3, 560.8 404.4 C 568.5 402.4, 576.1 400.1, 583.7 397.5 C 591.3 394.9, 598.7 391.9, 606.3 388.6 C 613.9 385.3, 621.7 381.5, 629.1 377.7 C 636.5 373.9, 643.7 369.9, 650.9 365.6 C 658.1 361.3, 665.4 356.7, 672.4 352.1 C 679.4 347.5, 686.2 342.8, 693.1 337.8 C 700.0 332.9, 706.9 327.6, 713.6 322.4 C 720.3 317.2, 726.8 311.8, 733.3 306.4 C 739.8 300.9, 746.0 295.3, 752.3 289.7 C 758.5 284.1, 764.7 278.6, 770.8 272.9 C 776.9 267.2, 782.9 261.4, 788.8 255.7 C 794.6 249.9, 800.3 244.3, 805.9 238.4 C 811.5 232.5, 817.0 226.6, 822.5 220.5 C 828.0 214.4, 833.7 208.3, 839.2 202.0 C 844.8 195.7, 850.6 188.9, 855.8 182.5 C 861.0 176.1, 865.8 169.9, 870.6 163.8 C 875.4 157.7, 873.1 159.7, 884.7 145.7 C 896.3 131.7, 912.5 111.0, 940.0 80.0 C 967.5 49.0, 1031.7 -20.0, 1050.0 -40.0';

// Smooth acceleration & glide easing
function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export const HandDrawnAirplaneIntro: React.FC<HandDrawnAirplaneIntroProps> = ({ t, onOpen }) => {
  const [isFlying, setIsFlying] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Flight progress: 0 to 1
  const [progress, setProgress] = useState(0);

  // SVG Path & track measurement
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(1300);

  // Real-time coordinates of plane during flight
  const [planeTransform, setPlaneTransform] = useState<{ x: number; y: number; angle: number }>({
    x: 319.6,
    y: 493.5,
    angle: 0,
  });

  // Calculate actual SVG path length on mount
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      if (len > 0) {
        setPathLength(len);
      }
    }
  }, []);

  // Handle clicking "Открыть"
  const handleOpen = () => {
    if (isFlying) return;

    // 1. Immediately play audio on user gesture
    audioManager.tryPlay();

    // 2. Start plane animation & hide text
    setIsFlying(true);

    const startTime = performance.now();
    const flightDuration = 1800; // ms for full loop-the-loop and flight offscreen

    const animateFlight = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / flightDuration, 1);
      const eased = easeInOutCubic(rawProgress);

      setProgress(eased);

      if (pathRef.current) {
        const len = pathRef.current.getTotalLength();
        const currentLen = eased * len;
        const pt = pathRef.current.getPointAtLength(currentLen);
        const nextPt = pathRef.current.getPointAtLength(Math.min(currentLen + 8, len));
        const tangentDeg = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * (180 / Math.PI);

        // Plane image axis is at -25.3°, so offset by +25.3° to align nose with tangent
        setPlaneTransform({
          x: pt.x,
          y: pt.y,
          angle: tangentDeg + 25.3,
        });
      }

      if (rawProgress < 1) {
        requestAnimationFrame(animateFlight);
      } else {
        // Flight completed: fade out screen
        setIsFadingOut(true);
        setTimeout(() => {
          onOpen();
        }, 500);
      }
    };

    requestAnimationFrame(animateFlight);
  };

  const handleSkip = () => {
    audioManager.tryPlay();
    setIsFadingOut(true);
    setTimeout(() => {
      onOpen();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between select-none overflow-hidden transition-all duration-600 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundColor: '#f7f6f2',
      }}
    >
      {/* Skip Button (Bottom Right) */}
      <button
        id="airplane-skip-btn"
        onClick={handleSkip}
        type="button"
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 text-xs sm:text-sm tracking-wider uppercase font-serif-clean text-stone-500 hover:text-stone-800 transition-colors px-3.5 py-1.5 rounded-full border border-stone-300/80 hover:border-stone-400 bg-white/70 backdrop-blur-md cursor-pointer shadow-xs active:scale-95"
      >
        {t.skip} →
      </button>

      {/* TOP HEADER: Title & Date (fades out when launching) */}
      <div
        className={`w-full text-center pt-16 sm:pt-20 px-6 transition-all duration-400 ${
          isFlying ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        <h1
          className="text-2xl sm:text-3xl md:text-4xl text-stone-900 font-medium tracking-normal leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic' }}
        >
          {t.title}
        </h1>
        <p
          className="text-stone-500 text-xs sm:text-sm mt-2 tracking-widest uppercase font-serif-clean"
        >
          {t.date}
        </p>
      </div>

      {/* CENTER STAGE: SVG Canvas with flight path & plane */}
      <div className="relative w-full max-w-4xl h-[340px] sm:h-[420px] md:h-[480px] my-auto flex items-center justify-center">
        {/* Full-screen responsive flight vector coordinate system (1024x682 matching sketch) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          viewBox="0 0 1024 682"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Mask to reveal dotted trajectory behind plane as it flies */}
            <mask id="trail-reveal-mask">
              <path
                d={TRAJECTORY_PATH}
                fill="none"
                stroke="#ffffff"
                strokeWidth="50"
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength * (1 - progress)}
                strokeLinecap="round"
              />
            </mask>
          </defs>

          {/* Reference path for length computation */}
          <path ref={pathRef} d={TRAJECTORY_PATH} fill="none" stroke="none" />

          {/* Hand-drawn dotted trajectory (appears right behind the plane) */}
          <path
            d={TRAJECTORY_PATH}
            fill="none"
            stroke="#222222"
            strokeWidth="4"
            strokeDasharray="4 15"
            strokeLinecap="round"
            mask="url(#trail-reveal-mask)"
            opacity={isFlying ? 0.85 : 0}
            style={{
              transition: 'opacity 0.2s ease',
            }}
          />

          {/* The Flying Plane (Rendered directly in SVG during flight for 100% precision) */}
          {isFlying && (
            <g
              transform={`translate(${planeTransform.x}, ${planeTransform.y}) rotate(${planeTransform.angle})`}
            >
              {/* Centered paper plane image */}
              <image
                href="/paper-plane.png"
                x="-55"
                y="-37"
                width="110"
                height="74"
                style={{
                  filter: 'drop-shadow(2px 6px 12px rgba(0,0,0,0.18))',
                }}
              />
            </g>
          )}
        </svg>

        {/* Initial Static / Floating Plane (before flight starts) */}
        {!isFlying && (
          <div
            onClick={handleOpen}
            className="relative cursor-pointer group flex flex-col items-center justify-center"
            title={t.openBtn}
          >
            {/* Plane with gentle floating sway */}
            <div className="transition-transform duration-300 hover:scale-105 active:scale-95 animate-plane-hover">
              <img
                src="/paper-plane.png"
                alt="Бумажный самолётик"
                className="w-36 sm:w-44 md:w-52 h-auto select-none pointer-events-none drop-shadow-md"
              />
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM SECTION: "Открыть" Button (fades out when launching) */}
      <div
        className={`w-full flex flex-col items-center justify-center pb-14 sm:pb-16 px-6 transition-all duration-400 ${
          isFlying ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        <button
          id="open-invitation-btn"
          type="button"
          onClick={handleOpen}
          className="group relative flex items-center justify-center gap-2 px-9 py-3 sm:py-3.5 rounded-full bg-[#222222] hover:bg-black text-[#f7f6f2] text-base sm:text-lg font-serif-clean shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-95 border border-stone-800"
        >
          <span className="font-medium tracking-wide">{t.openBtn}</span>
          <Music className="w-4 h-4 text-stone-300 group-hover:scale-110 transition-transform ml-0.5" />
        </button>

        <p className="text-[12px] text-stone-500 font-serif-clean tracking-wider flex items-center gap-1 mt-2.5">
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-stone-400" />
          <span>{t.musicHint}</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-stone-400" />
        </p>
      </div>
    </div>
  );
};
