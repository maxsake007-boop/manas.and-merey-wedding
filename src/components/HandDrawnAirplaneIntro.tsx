import React, { useState, useEffect, useRef } from 'react';
import { audioManager } from '../services/audioManager';

interface HandDrawnAirplaneIntroProps {
  t: {
    title: string;
    openBtn: string;
  };
  onOpen: () => void;
}

// Full 360° acrobatic loop-the-loop trajectory reconstructed from user's sketch
// Starts right at centered airplane position (512, 341) in 1024x682 space
const TRAJECTORY_PATH =
  'M 512.0 341.0 C 515.8 340.4, 527.4 338.8, 535.1 337.3 C 542.7 335.7, 550.4 333.9, 557.9 331.6 C 565.4 329.4, 572.8 326.8, 580.0 323.8 C 587.2 320.8, 594.3 317.4, 601.1 313.5 C 607.9 309.6, 614.5 305.3, 620.7 300.4 C 627.0 295.6, 633.1 290.2, 638.5 284.4 C 643.9 278.6, 649.1 272.3, 653.3 265.7 C 657.5 259.1, 661.2 252.0, 663.8 244.7 C 666.4 237.3, 668.1 229.6, 668.9 221.8 C 669.6 214.0, 669.4 205.9, 668.2 198.1 C 667.0 190.2, 664.8 182.2, 661.6 174.7 C 658.5 167.2, 654.2 159.6, 649.2 153.0 C 644.3 146.3, 638.3 139.8, 632.1 134.6 C 625.8 129.4, 618.7 124.7, 611.6 121.6 C 604.4 118.5, 596.7 116.4, 589.2 115.9 C 581.7 115.5, 573.9 116.7, 566.5 118.8 C 559.1 121.0, 551.6 124.7, 544.6 128.9 C 537.7 133.2, 530.9 138.6, 524.8 144.4 C 518.8 150.1, 513.1 156.6, 508.4 163.2 C 503.6 169.8, 499.5 176.8, 496.1 184.0 C 492.8 191.2, 490.2 198.7, 488.4 206.3 C 486.5 213.9, 485.4 221.7, 485.0 229.7 C 484.7 237.6, 485.0 245.9, 486.2 254.0 C 487.3 262.0, 489.2 270.4, 491.8 278.0 C 494.4 285.7, 497.8 293.3, 501.9 300.0 C 506.0 306.7, 510.9 313.0, 516.5 318.0 C 522.2 323.1, 528.7 327.2, 535.6 330.5 C 542.5 333.8, 550.2 336.0, 557.9 337.7 C 565.7 339.4, 574.0 340.2, 582.2 340.7 C 590.3 341.3, 598.7 341.1, 606.8 340.8 C 614.9 340.4, 622.9 339.6, 630.8 338.6 C 638.7 337.5, 646.5 336.1, 654.1 334.4 C 661.8 332.6, 669.3 330.6, 676.7 328.3 C 684.2 326.0, 691.5 323.3, 698.7 320.5 C 705.8 317.6, 712.9 314.4, 719.9 311.1 C 726.8 307.7, 733.6 304.1, 740.4 300.2 C 747.1 296.4, 753.7 292.4, 760.2 288.2 C 766.8 284.0, 773.2 279.6, 779.6 275.1 C 786.0 270.6, 792.3 265.9, 798.5 261.1 C 804.7 256.4, 810.9 251.5, 817.1 246.6 C 823.2 241.7, 829.3 236.6, 835.4 231.6 C 841.5 226.6, 847.5 221.5, 853.5 216.4 C 859.6 211.4, 865.6 206.3, 871.6 201.2 C 877.6 196.2, 883.6 191.1, 889.6 186.1 C 895.6 181.0, 901.6 176.0, 907.6 170.9 C 913.6 165.9, 919.5 160.8, 925.5 155.8 C 931.4 150.7, 937.3 145.7, 943.2 140.6 C 949.1 135.5, 955.0 130.4, 960.9 125.3 C 966.7 120.1, 972.6 115.0, 978.4 109.8 C 984.2 104.6, 989.9 99.4, 995.7 94.2 C 1001.4 89.0, 1007.1 83.7, 1012.8 78.4 C 1018.4 73.1, 1024.1 67.8, 1029.6 62.4 C 1035.2 57.0, 1040.8 51.6, 1046.3 46.1 C 1051.8 40.6, 1057.3 35.1, 1062.7 29.5 C 1068.1 24.0, 1073.5 18.3, 1078.8 12.6 C 1084.1 6.9, 1089.4 1.2, 1094.6 -4.6 C 1099.8 -10.5, 1105.0 -16.4, 1110.1 -22.3 C 1115.2 -28.3, 1120.2 -34.3, 1125.2 -40.4 C 1130.2 -46.5, 1137.5 -55.9, 1140.0 -59.0';

// Smooth acceleration and cruising ease
function easeFlight(x: number): number {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

export const HandDrawnAirplaneIntro: React.FC<HandDrawnAirplaneIntroProps> = ({ t, onOpen }) => {
  const [isFlying, setIsFlying] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(1400);

  // Airplane coordinates & orientation (nose aligned with flight path)
  const [planeTransform, setPlaneTransform] = useState<{ x: number; y: number; angle: number }>({
    x: 512.0,
    y: 341.0,
    angle: 13.5, // initial tilt at rest
  });

  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      if (len > 0) {
        setPathLength(len);
      }
    }
  }, []);

  const handleOpen = () => {
    if (isFlying) return;

    // 1. Play music immediately on user click gesture
    audioManager.tryPlay();

    // 2. Start plane animation & hide text/button
    setIsFlying(true);

    const startTime = performance.now();
    const flightDuration = 2400; // ms for full visible loop-the-loop and sky ascent

    const animateFlight = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / flightDuration, 1);
      const eased = easeFlight(rawProgress);

      setProgress(eased);

      if (pathRef.current) {
        const len = pathRef.current.getTotalLength();
        const currentLen = eased * len;
        const pt = pathRef.current.getPointAtLength(currentLen);
        const nextPt = pathRef.current.getPointAtLength(Math.min(currentLen + 4, len));
        const prevPt = pathRef.current.getPointAtLength(Math.max(currentLen - 4, 0));
        const tangentDeg = Math.atan2(nextPt.y - prevPt.y, nextPt.x - prevPt.x) * (180 / Math.PI);

        // Plane image nose is at -25.3°, so +25.3° aligns nose with tangent
        setPlaneTransform({
          x: pt.x,
          y: pt.y,
          angle: tangentDeg + 25.3,
        });
      }

      if (rawProgress < 1) {
        requestAnimationFrame(animateFlight);
      } else {
        // Plane is offscreen: dissolve intro screen smoothly
        setIsFadingOut(true);
        setTimeout(() => {
          onOpen();
        }, 400);
      }
    };

    requestAnimationFrame(animateFlight);
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
      {/* FULLSCREEN SVG CANVAS: Trajectory & Airplane (Responsive 1024x682 space) */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 1024 682"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Mask to reveal dotted trajectory behind plane as it executes the loop */}
          <mask id="trail-reveal-mask">
            <path
              d={TRAJECTORY_PATH}
              fill="none"
              stroke="#ffffff"
              strokeWidth="70"
              strokeDasharray={pathLength}
              strokeDashoffset={pathLength * (1 - progress)}
              strokeLinecap="round"
            />
          </mask>
        </defs>

        {/* Reference path for calculation */}
        <path ref={pathRef} d={TRAJECTORY_PATH} fill="none" stroke="none" />

        {/* Hand-drawn dotted trajectory matching user's sketch */}
        <path
          d={TRAJECTORY_PATH}
          fill="none"
          stroke="#262626"
          strokeWidth="4"
          strokeDasharray="4 14"
          strokeLinecap="round"
          mask="url(#trail-reveal-mask)"
          opacity={isFlying ? 0.85 : 0}
          style={{
            transition: 'opacity 0.2s ease',
          }}
        />

        {/* Paper Airplane: rendered directly in SVG coordinate space for zero jumping */}
        <g
          transform={`translate(${planeTransform.x}, ${planeTransform.y}) rotate(${planeTransform.angle})`}
          className="pointer-events-auto cursor-pointer"
          onClick={handleOpen}
        >
          {/* Large, impressive plane image: 260x176 in 1024x682 space */}
          <image
            href="/paper-plane.png"
            x="-130"
            y="-88"
            width="260"
            height="176"
            style={{
              filter: 'drop-shadow(2px 8px 18px rgba(0,0,0,0.22))',
            }}
          />
        </g>
      </svg>

      {/* CENTERED STACK: Title directly above plane -> plane click area -> Button directly below */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-xl transition-all duration-300 ${
          isFlying ? 'opacity-0 -translate-y-3 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Title directly above the plane */}
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-stone-900 font-medium tracking-normal leading-tight select-none mb-0"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic' }}
        >
          {t.title}
        </h1>

        {/* Airplane spatial spacer (centered directly over the SVG plane, clickable) */}
        <div
          className="w-64 sm:w-72 md:w-80 h-28 sm:h-32 md:h-36 cursor-pointer pointer-events-auto"
          onClick={handleOpen}
          title={t.openBtn}
        />

        {/* Button directly below the plane, slightly down */}
        <div className="mt-2 sm:mt-3 pointer-events-auto">
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
