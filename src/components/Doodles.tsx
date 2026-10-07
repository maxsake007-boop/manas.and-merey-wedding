import React from 'react';


/**
 * Hand-drawn daisy doodle using uploaded romashka.jpg with preserved animations
 */
export const DaisyDoodle: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <div className={`inline-block select-none ${className}`}>
    <img
      src="/icons-photos/romashka.jpg"
      alt="Ромашка"
      loading="eager"
      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 hover:rotate-12 hover:scale-110 active:scale-95 cursor-pointer"
    />
  </div>
);

/**
 * Hand-drawn blue car doodle using uploaded car image with preserved animations
 */
export const CarDoodle: React.FC<{ className?: string }> = ({ className = 'w-28 h-auto' }) => (
  <div className={`inline-block select-none ${className}`}>
    <img
      src="/icons-photos/car.png"
      alt="Голубая машинка"
      loading="eager"
      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 hover:translate-x-1.5 hover:scale-105 active:scale-95 cursor-pointer"
    />
  </div>
);

/**
 * "М + М = ❤️" in authentic handwritten, slightly crooked cursive script
 */
export const HeartFormulaDoodle: React.FC<{ className?: string }> = ({ className = 'h-11' }) => (
  <div className={`flex items-center justify-center gap-2 select-none ${className}`}>
    <div className="flex items-center select-none font-handwritten">
      <span
        className="text-[35px] sm:text-[38px] font-bold text-stone-900 inline-block -rotate-6 transition-transform hover:rotate-0 cursor-default leading-none select-none"
        style={{ fontFamily: "'Caveat', 'Marck Script', cursive" }}
      >
        М
      </span>
      <span
        className="text-[27px] sm:text-[29px] font-bold text-stone-800 inline-block rotate-3 mx-1.5 select-none leading-none"
        style={{ fontFamily: "'Caveat', 'Marck Script', cursive" }}
      >
        +
      </span>
      <span
        className="text-[36px] sm:text-[39px] font-bold text-stone-900 inline-block rotate-5 transition-transform hover:rotate-0 cursor-default leading-none select-none"
        style={{ fontFamily: "'Caveat', 'Marck Script', cursive" }}
      >
        М
      </span>
      <span
        className="text-[26px] sm:text-[28px] font-bold text-stone-800 inline-block -rotate-2 ml-1.5 mr-1 select-none leading-none"
        style={{ fontFamily: "'Caveat', 'Marck Script', cursive" }}
      >
        =
      </span>
    </div>

    {/* Sketchy hand-drawn red heart with gentle heartbeat pulse */}
    <div className="inline-block animate-heartbeat cursor-pointer hover:scale-125 transition-transform shrink-0">
      <svg
        viewBox="0 0 54 48"
        className="w-8 h-8 sm:w-9 sm:h-9 inline-block translate-y-[-2px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Red heart outer stroke */}
        <path
          d="M 27 44 
             C 27 44 7 30 4 19 
             C 1 8 11 2 20 6 
             C 24 8 26 12 27 14 
             C 28 12 30 8 34 6 
             C 43 2 53 8 50 19 
             C 47 30 27 44 27 44 Z"
          fill="#ffffff"
          stroke="#1a1a1a"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Red sketchy hatch fill texture */}
        <g stroke="#d82b3d" strokeWidth="2.6" strokeLinecap="round">
          <path d="M 12 12 L 23 23" />
          <path d="M 17 8 L 30 21" />
          <path d="M 26 8 L 37 19" />
          <path d="M 33 8 L 44 19" />
          <path d="M 10 18 L 27 35" />
          <path d="M 16 23 L 33 40" />
          <path d="M 22 28 L 29 35" />
          <path d="M 38 15 L 47 24" />
          <path d="M 34 23 L 42 31" />
        </g>
        {/* Subtle heart contour accent */}
        <path
          d="M 27 44 
             C 27 44 7 30 4 19 
             C 1 8 11 2 20 6 
             C 24 8 26 12 27 14 
             C 28 12 30 8 34 6 
             C 43 2 53 8 50 19 
             C 47 30 27 44 27 44 Z"
          stroke="#d82b3d"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
);

/**
 * Hand-drawn couple artwork using user-uploaded image with preserved sway animation
 */
export const KidsStickFigureDoodle: React.FC<{ className?: string }> = ({ className = 'w-36 sm:w-40 h-auto' }) => (
  <div className="animate-stick-sway origin-bottom inline-block">
    <img
      src="/icons-photos/drawn-couple.jpg"
      alt="Нарисованная пара — Манас и Мерей"
      loading="eager"
      className={`${className} object-contain mix-blend-multiply mx-auto transition-transform duration-300 hover:scale-105 select-none`}
    />
  </div>
);

/**
 * Wedding diamond ring icon matching Screenshot 3
 */
export const RingIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} transition-transform duration-300 hover:rotate-12`}
    aria-label="Кольцо с бриллиантом"
  >
    {/* Diamond gem on top */}
    <path
      d="M 26 18 L 38 18 L 44 24 L 32 30 L 20 24 Z"
      stroke="#1a1a1a"
      strokeWidth="2.4"
      strokeLinejoin="round"
      fill="#ffffff"
    />
    <path d="M 26 18 L 32 30 L 38 18" stroke="#1a1a1a" strokeWidth="2" strokeLinejoin="round" />
    {/* Ring circle */}
    <circle cx="32" cy="40" r="15" stroke="#1a1a1a" strokeWidth="2.6" fill="none" />
    {/* Inner ring highlight */}
    <circle cx="32" cy="40" r="11" stroke="#1a1a1a" strokeWidth="1.8" fill="none" />
  </svg>
);

/**
 * Champagne clinking flutes icon matching Screenshot 3
 */
export const ChampagneIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} transition-transform duration-300 hover:scale-110`}
    aria-label="Бокалы с шампанским"
  >
    {/* Left flute tilted right */}
    <g transform="translate(18, 30) rotate(15)">
      <path d="M -6 -18 L 6 -18 L 4 2 C 3 8 -3 8 -4 2 Z" stroke="#1a1a1a" strokeWidth="2.4" fill="#ffffff" />
      <path d="M 0 6 L 0 18" stroke="#1a1a1a" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M -6 18 L 6 18" stroke="#1a1a1a" strokeWidth="2.4" strokeLinecap="round" />
    </g>
    {/* Right flute tilted left */}
    <g transform="translate(46, 30) rotate(-15)">
      <path d="M -6 -18 L 6 -18 L 4 2 C 3 8 -3 8 -4 2 Z" stroke="#1a1a1a" strokeWidth="2.4" fill="#ffffff" />
      <path d="M 0 6 L 0 18" stroke="#1a1a1a" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M -6 18 L 6 18" stroke="#1a1a1a" strokeWidth="2.4" strokeLinecap="round" />
    </g>
    {/* Cheers sparkle */}
    <circle cx="32" cy="18" r="1.5" fill="#1a1a1a" />
    <path d="M 32 12 L 32 15 M 32 21 L 32 24 M 27 18 L 30 18 M 34 18 L 37 18" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Plate, fork, and knife icon matching Screenshot 3
 */
export const BanquetIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} transition-transform duration-300 hover:scale-105`}
    aria-label="Банкетные приборы"
  >
    {/* Fork (left) */}
    <path
      d="M 17 18 L 17 28 C 17 31 23 31 23 28 L 23 18 M 20 18 L 20 28 M 20 31 L 20 46"
      stroke="#1a1a1a"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Plate (center) */}
    <circle cx="32" cy="32" r="13" stroke="#1a1a1a" strokeWidth="2.4" fill="#ffffff" />
    <circle cx="32" cy="32" r="9" stroke="#1a1a1a" strokeWidth="1.8" fill="none" />
    {/* Knife (right) */}
    <path
      d="M 46 18 C 43 23 43 30 43 33 L 43 46 M 46 18 L 46 33"
      stroke="#1a1a1a"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Gift box icon matching Screenshot 5 & 6
 */
export const GiftIcon: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} animate-gift-wiggle transition-transform hover:scale-110`}
    aria-label="Подарок"
  >
    {/* Bow loops */}
    <path
      d="M 32 19 C 28 11 20 11 23 18 C 26 21 31 19 32 19 Z"
      stroke="#1a1a1a"
      strokeWidth="2.4"
      strokeLinejoin="round"
      fill="#ffffff"
    />
    <path
      d="M 32 19 C 36 11 44 11 41 18 C 38 21 33 19 32 19 Z"
      stroke="#1a1a1a"
      strokeWidth="2.4"
      strokeLinejoin="round"
      fill="#ffffff"
    />
    {/* Box lid */}
    <rect x="18" y="21" width="28" height="6" stroke="#1a1a1a" strokeWidth="2.4" fill="#ffffff" rx="1" />
    {/* Box body */}
    <rect x="20" y="27" width="24" height="22" stroke="#1a1a1a" strokeWidth="2.4" fill="#ffffff" />
    {/* Vertical ribbon */}
    <path d="M 32 21 L 32 49" stroke="#1a1a1a" strokeWidth="2.4" />
  </svg>
);
