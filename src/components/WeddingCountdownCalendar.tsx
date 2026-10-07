import React, { useState, useEffect } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { Translations } from '../i18n/translations';

// Target wedding date: October 22, 2026 at 18:00 (Банкет в Tinchlik Plaza, Навои, UTC+5)
const WEDDING_TARGET_DATE = new Date('2026-10-22T18:00:00+05:00').getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date().getTime();
  const difference = WEDDING_TARGET_DATE - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

interface WeddingCountdownCalendarProps {
  t: Translations['calendar'];
}

export const WeddingCountdownCalendar: React.FC<WeddingCountdownCalendarProps> = ({ t }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format numbers into two separate digits for the card display
  const formatDigits = (value: number): [string, string] => {
    const str = String(Math.max(0, value)).padStart(2, '0');
    return [str[0] || '0', str[1] || '0'];
  };

  const [daysTens, daysOnes] = formatDigits(timeLeft.days);
  const [hoursTens, hoursOnes] = formatDigits(timeLeft.hours);
  const [minsTens, minsOnes] = formatDigits(timeLeft.minutes);
  const [secsTens, secsOnes] = formatDigits(timeLeft.seconds);

  // October 2026 calendar data:
  // Weekdays: ПН ВТ СР ЧТ ПТ СБ ВС
  // October 1, 2026 is a Thursday (ЧТ) -> 3 empty slots (ПН, ВТ, СР)
  const calendarCells = [
    null, null, null, 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, null
  ];

  return (
    <section className="pt-8 pb-14 px-5 sm:px-8 border-t border-stone-200/60 bg-white">
      
      {/* ========================================================= */}
      {/* 1. CALENDAR MONTH WITH HEART ON OCTOBER 22               */}
      {/* ========================================================= */}
      <div className="max-w-[340px] mx-auto">
        {/* Month & Year Title */}
        <ScrollReveal animation="fade-up" duration={700} className="text-center mb-6">
          <h2
            className="text-[28px] sm:text-[30px] font-normal text-stone-900 tracking-[0.08em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {t.monthTitle}
          </h2>
        </ScrollReveal>

        {/* Calendar Grid */}
        <ScrollReveal animation="zoom-in" delay={150} duration={800} className="mb-12">
          <div className="bg-white/70 backdrop-blur-xs rounded-2xl p-4 sm:p-5 shadow-2xs border border-stone-100">
            {/* Weekdays Row */}
            <div className="grid grid-cols-7 gap-y-3 mb-3 text-center">
              {t.weekdays.map((day) => (
                <div
                  key={day}
                  className="text-[14px] sm:text-[15px] text-stone-700 font-medium tracking-wide select-none"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-y-2.5 sm:gap-y-3 text-center items-center">
              {calendarCells.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} className="h-9 w-9 sm:h-10 sm:w-10" />;
                }

                // Wedding Day 22 is marked with a heart matching site's olive/sage color scheme
                if (day === 22) {
                  return (
                    <div
                      key={day}
                      className="relative flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 mx-auto select-none"
                    >
                      {/* Heart icon background */}
                      <svg
                        viewBox="0 0 100 90"
                        className="w-9 h-9 sm:w-10 sm:h-10 text-[#6e7a63] fill-current drop-shadow-xs transition-transform duration-300 hover:scale-110 cursor-pointer animate-pulse-gentle"
                      >
                        <path d="M 50 85 C 50 85 10 56 3 34 C -4 14 15 2 32 8 C 42 12 47 20 50 24 C 53 20 58 12 68 8 C 85 2 104 14 97 34 C 90 56 50 85 50 85 Z" />
                      </svg>
                      {/* Day number centered inside the heart */}
                      <span
                        className="absolute inset-0 flex items-center justify-center text-white font-semibold text-[15px] sm:text-[16px] pt-1 pointer-events-none"
                        style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
                      >
                        22
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={day}
                    className="flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 mx-auto text-stone-800 text-[17px] sm:text-[18px] select-none hover:text-[#6e7a63] transition-colors"
                    style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ========================================================= */}
      {/* 2. LIVE COUNTDOWN TIMER TO THE WEDDING                    */}
      {/* ========================================================= */}
      <div className="max-w-[360px] mx-auto text-center pt-2">
        {/* Timer Heading matching Reference 2 */}
        <ScrollReveal animation="fade-up" delay={100} duration={700} className="mb-7">
          <h3
            className="text-[25px] sm:text-[27px] font-normal text-stone-900 tracking-[0.05em] uppercase leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {t.timerTitle}
          </h3>
          <p
            className="text-[22px] sm:text-[24px] font-normal text-stone-800 tracking-[0.03em] uppercase mt-0.5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic' }}
          >
            {t.timerSubtitle}
          </p>
        </ScrollReveal>

        {/* 4 Digit Card Groups: Дней, Часов, Минут, Секунд */}
        <ScrollReveal animation="fade-up" delay={200} duration={800}>
          <div className="grid grid-cols-4 gap-2 sm:gap-3.5 items-start justify-center select-none">
            
            {/* Days Block */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-0.5 sm:gap-1">
                <DigitCard digit={daysTens} />
                <DigitCard digit={daysOnes} />
              </div>
              <span className="text-[12px] sm:text-[12.5px] text-stone-600 mt-2 font-sans tracking-wide">
                {t.days}
              </span>
            </div>

            {/* Hours Block */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-0.5 sm:gap-1">
                <DigitCard digit={hoursTens} />
                <DigitCard digit={hoursOnes} />
              </div>
              <span className="text-[12px] sm:text-[12.5px] text-stone-600 mt-2 font-sans tracking-wide">
                {t.hours}
              </span>
            </div>

            {/* Minutes Block */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-0.5 sm:gap-1">
                <DigitCard digit={minsTens} />
                <DigitCard digit={minsOnes} />
              </div>
              <span className="text-[12px] sm:text-[12.5px] text-stone-600 mt-2 font-sans tracking-wide">
                {t.minutes}
              </span>
            </div>

            {/* Seconds Block */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-0.5 sm:gap-1">
                <DigitCard digit={secsTens} />
                <DigitCard digit={secsOnes} isSecond />
              </div>
              <span className="text-[12px] sm:text-[12.5px] text-stone-600 mt-2 font-sans tracking-wide">
                {t.seconds}
              </span>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

interface DigitCardProps {
  digit: string;
  isSecond?: boolean;
}

const DigitCard: React.FC<DigitCardProps> = ({ digit, isSecond = false }) => {
  return (
    <div
      className={`w-[34px] sm:w-[38px] h-[52px] sm:h-[58px] bg-[#faf8f4] border border-stone-300/80 rounded-[7px] shadow-2xs flex items-center justify-center transition-all ${
        isSecond ? 'hover:border-[#6e7a63]/70' : ''
      }`}
    >
      <span
        className="text-[26px] sm:text-[29px] font-medium text-stone-800 leading-none select-none tracking-normal font-sans"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {digit}
      </span>
    </div>
  );
};
