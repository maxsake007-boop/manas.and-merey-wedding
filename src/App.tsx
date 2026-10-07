/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  DaisyDoodle,
  CarDoodle,
  HeartFormulaDoodle,
  KidsStickFigureDoodle,
  BanquetIcon,
} from './components/Doodles';
import { PhotoFrame } from './components/PhotoArt';
import { RsvpSection } from './components/RsvpSection';
import { WeddingCountdownCalendar } from './components/WeddingCountdownCalendar';
import { ScrollReveal, IntroReadyContext } from './components/ScrollReveal';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { HandDrawnAirplaneIntro } from './components/HandDrawnAirplaneIntro';
import { Language, translations } from './i18n/translations';
import { Volume2, VolumeX, ExternalLink, MapPin } from 'lucide-react';

import { audioManager } from './services/audioManager';

const yandexMapsUrl = 'https://yandex.ru/maps/org/tinchlik_plaza/11816632627?si=azm5gkzchh91458fvjetknjg1c';
const googleMapsUrl = 'https://maps.app.goo.gl/jiFTTkV7hQH4sr269';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('wedding_invitation_lang');
      if (saved === 'ru' || saved === 'kz' || saved === 'uz') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'ru';
  });

  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(() => audioManager.getIsPlaying());
  const [isIntroOpen, setIsIntroOpen] = useState<boolean>(false);

  useEffect(() => {
    return audioManager.subscribe((playing) => {
      setIsPlayingMusic(playing);
    });
  }, []);

  const t = translations[lang];

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem('wedding_invitation_lang', newLang);
    } catch {
      // ignore
    }
  };

  const toggleMusic = () => {
    audioManager.toggle();
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex justify-center py-0 sm:py-8 antialiased text-[#222222]">
      {/* Hand-Drawn Paper Airplane Intro Screen */}
      {!isIntroOpen && (
        <HandDrawnAirplaneIntro t={t.intro} onOpen={() => setIsIntroOpen(true)} />
      )}

      {/* Language Switcher floating elegantly in the top-right */}
      <LanguageSwitcher currentLang={lang} onLanguageChange={handleLanguageChange} />

      {/* Background ambient music button floating in the bottom-right corner (revealed once opened) */}
      {isIntroOpen && (
        <button
          type="button"
          onClick={toggleMusic}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-white/90 hover:bg-white text-stone-700 p-2.5 sm:p-3 rounded-full shadow-lg backdrop-blur-md transition-all border border-stone-200/70 flex items-center gap-1.5 text-xs select-none active:scale-95 cursor-pointer hover:shadow-xl"
          title={isPlayingMusic ? t.music.pauseTitle : t.music.playTitle}
          aria-label={isPlayingMusic ? t.music.pauseTitle : t.music.playTitle}
        >
          {isPlayingMusic ? (
            <>
              <Volume2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#6e7a63] animate-pulse" />
              <span className="hidden sm:inline text-[11px] font-sans text-stone-600 font-medium">{t.music.label}</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-stone-400" />
              <span className="hidden sm:inline text-[11px] font-sans text-stone-600 font-medium">{t.music.label}</span>
            </>
          )}
        </button>
      )}

      {/* Main Single-Column Wedding Invitation Container wrapped in IntroReadyContext */}
      <IntroReadyContext.Provider value={isIntroOpen}>
        <main className="w-full max-w-[420px] bg-white shadow-xl sm:rounded-[24px] sm:border sm:border-stone-200/50 overflow-hidden relative">
        
        {/* ========================================================= */}
        {/* SECTION 1: CHILDHOOD POLAROIDS & STORY                    */}
        {/* ========================================================= */}
        <section className="pt-8 px-6 sm:px-8">
          
          {/* Top row: Left polaroid (Мерей) + Daisy doodle */}
          <div className="flex items-start justify-between mb-8 pl-1 pr-4">
            {/* Top Polaroid: Мерей */}
            <ScrollReveal animation="polaroid-left" delay={100} duration={800}>
              <div className="w-[140px] sm:w-[146px] polaroid-card rounded-[2px]">
                <PhotoFrame
                  id="merey"
                  caption={t.section1.captionMerey}
                  aspectRatio="aspect-[4/5]"
                  altText={t.section1.photoMereyAlt}
                />
              </div>
            </ScrollReveal>

            {/* Daisy Doodle with bloom animation on scroll */}
            <ScrollReveal animation="bloom" delay={250} duration={850} className="pt-12 sm:pt-14 pr-5 sm:pr-7">
              <div className="relative -left-3 top-2">
                <DaisyDoodle className="w-16 h-16 sm:w-18 sm:h-18 cursor-pointer" />
              </div>
            </ScrollReveal>
          </div>

          {/* Middle formula: М + М = ❤️ in authentic crooked handwritten ink pen */}
          <ScrollReveal animation="fade-down" delay={200} duration={700} className="my-6">
            <HeartFormulaDoodle />
          </ScrollReveal>

          {/* Lower row: Car doodle + Right polaroid (Манас) */}
          <div className="flex items-center justify-between mb-10 pl-2 pr-1">
            {/* Blue Car Doodle with drive-in animation on scroll */}
            <ScrollReveal animation="drive" delay={200} duration={850} className="pt-3">
              <CarDoodle className="w-28 sm:w-32 h-auto cursor-pointer" />
            </ScrollReveal>

            {/* Bottom Polaroid: Манас */}
            <ScrollReveal animation="polaroid-right" delay={300} duration={800} className="mr-3 sm:mr-4">
              <div className="w-[140px] sm:w-[146px] polaroid-card rounded-[2px] relative -left-1 sm:-left-2">
                <PhotoFrame
                  id="manas"
                  caption={t.section1.captionManas}
                  aspectRatio="aspect-[4/5]"
                  altText={t.section1.photoManasAlt}
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Heading: Узнали этих ребятишек? */}
          <ScrollReveal animation="fade-up" delay={150} duration={700} className="text-center mt-6 mb-5">
            <h1
              className="text-[25px] sm:text-[27px] font-medium tracking-normal text-stone-900 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic' }}
            >
              {t.section1.heading}
            </h1>
          </ScrollReveal>

          {/* Story prose - Every paragraph reveals with distinct staggered scroll timing */}
          <div
            className="text-center text-[14.5px] sm:text-[15px] leading-[1.65] text-stone-800 space-y-3.5 max-w-[320px] mx-auto mb-8"
            style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
          >
            <ScrollReveal animation="fade-up" delay={200}>
              <p>
                {t.section1.p1_1}
                <br />
                {t.section1.p1_2}
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={280}>
              <p>
                {t.section1.p2_1}
                <br />
                {t.section1.p2_2}
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={360}>
              <p>
                {t.section1.p3_1}
                <br />
                {t.section1.p3_2}
                <br />
                {t.section1.p3_3}
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={440}>
              <p>
                {t.section1.p4_1}
                <br />
                {t.section1.p4_2}
              </p>
            </ScrollReveal>
          </div>

          {/* Wedding Date Pill Announcement */}
          <div className="text-center space-y-2 mb-8">
            <ScrollReveal animation="fade-up" delay={150}>
              <p
                className="text-[13px] tracking-[0.14em] text-stone-900 uppercase font-medium"
                style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
              >
                {t.section1.dateLabel}
              </p>
            </ScrollReveal>

            <ScrollReveal animation="pop" delay={250} className="inline-flex items-center justify-center">
              <div
                className="bg-[#f5efe6] text-stone-900 px-6 py-1.5 rounded-full text-[17px] leading-normal shadow-2xs select-none inline-block border border-stone-200/50"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic' }}
              >
                {t.section1.dateValue}
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={350}>
              <p
                className="text-[15.5px] text-stone-900 pt-1"
                style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
              >
                {t.section1.withLove}
              </p>
            </ScrollReveal>
          </div>

          {/* Drawn couple artwork with preserved sway and pop entrance animation */}
          <ScrollReveal animation="pop" delay={250} className="flex justify-center pb-12">
            <KidsStickFigureDoodle className="w-36 sm:w-44 h-auto" />
          </ScrollReveal>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: TIMING / ТАЙМИНГ                               */}
        {/* ========================================================= */}
        <section className="pt-6 px-6 sm:px-8 border-t border-stone-100/60">
          {/* Couple Portrait */}
          <ScrollReveal animation="blur-reveal" duration={900} className="w-[72%] max-w-[260px] mx-auto mb-8">
            <div className="polaroid-card rounded-[2px]">
              <PhotoFrame
                id="couple"
                aspectRatio="aspect-[4/5]"
                altText="Манас и Мерей"
              />
            </div>
          </ScrollReveal>

          {/* Section Heading: Тайминг */}
          <ScrollReveal animation="fade-up" delay={100} className="text-center mb-2">
            <h2
              className="text-[34px] sm:text-[36px] font-normal text-stone-900 tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic' }}
            >
              {t.timing.title}
            </h2>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal animation="fade-up" delay={200}>
            <p
              className="text-center text-[13px] sm:text-[13.5px] text-stone-700 leading-snug max-w-[290px] mx-auto mb-9"
              style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
            >
              {t.timing.subtitle}
            </p>
          </ScrollReveal>

          {/* Timeline: 18:00 */}
          <div className="max-w-[310px] mx-auto pb-14">
            <ScrollReveal animation="fade-left" delay={150}>
              <div className="flex items-start gap-5 group cursor-default">
                <div className="w-11 flex justify-center shrink-0 pt-0.5 transition-transform duration-300 group-hover:scale-110">
                  <BanquetIcon className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <p
                    className="text-[17.5px] text-stone-900 font-normal pb-1 border-b border-stone-300 group-hover:border-stone-500 transition-colors"
                    style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
                  >
                    {t.timing.banquetTime}
                  </p>
                  <p
                    className="text-[13px] text-stone-600 pt-1.5"
                    style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
                  >
                    {t.timing.banquetDesc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: LOCATION / ЛОКАЦИЯ                             */}
        {/* ========================================================= */}
        <section className="pt-6 px-6 sm:px-8 border-t border-stone-100/60 pb-12">
          {/* Section Heading: Локация */}
          <ScrollReveal animation="fade-up" className="text-center mb-8">
            <h2
              className="text-[34px] sm:text-[36px] font-normal text-stone-900 tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic' }}
            >
              {t.location.title}
            </h2>
          </ScrollReveal>

          <div className="max-w-[340px] mx-auto text-center">
            <ScrollReveal animation="flip-card" delay={150} className="space-y-4">
              <div className="bg-[#faf9f6] p-4 sm:p-5 rounded-2xl border border-stone-200/70 shadow-2xs">
                <div className="w-10 h-10 rounded-full bg-[#6e7a63]/10 text-[#6e7a63] flex items-center justify-center mx-auto mb-2.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <p
                  className="text-[21px] sm:text-[22px] font-medium text-stone-900"
                  style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
                >
                  {t.location.venueName}
                </p>
                <p
                  className="text-[14px] sm:text-[14.5px] text-stone-600 mt-0.5 mb-4"
                  style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
                >
                  {t.location.address}
                </p>

                {/* Главная кнопка: Открыть карту Google Maps */}
                <div className="mb-4">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-6 rounded-full border border-[#6e7a63] bg-white hover:bg-[#6e7a63] text-stone-800 hover:text-white text-[13.5px] tracking-[0.08em] uppercase font-medium inline-flex items-center justify-center gap-2 shadow-2xs active:scale-98 cursor-pointer w-full select-none transition-all duration-300"
                    style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
                  >
                    <span>{t.location.openMapBtn}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                </div>

                {/* Встроенная интерактивная карта Google Maps */}
                <div className="rounded-xl overflow-hidden border border-stone-200 shadow-2xs relative aspect-[4/3] bg-stone-100">
                  <iframe
                    title={t.location.mapIframeTitle}
                    src="https://maps.google.com/maps?q=40.1008987,65.3852887&hl=ru&z=17&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Запасной вариант: Яндекс Карты */}
                <div className="pt-3">
                  <a
                    href={yandexMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-stone-500 hover:text-stone-800 underline underline-offset-4 cursor-pointer transition-colors inline-flex items-center gap-1"
                    style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
                  >
                    <span>{t.location.yandexLink}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: WISHES / ПОЖЕЛАНИЯ                             */}
        {/* ========================================================= */}
        <section className="pt-6 px-6 sm:px-8 border-t border-stone-100/60 pb-4">
          <ScrollReveal animation="fade-up" className="text-center mb-6">
            <h2
              className="text-[34px] sm:text-[36px] font-normal text-stone-900 tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic' }}
            >
              {t.wishes.title}
            </h2>
          </ScrollReveal>

          <div
            className="text-center text-[14.5px] sm:text-[15px] leading-[1.65] text-stone-800 space-y-4 max-w-[315px] mx-auto"
            style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
          >
            <ScrollReveal animation="fade-up" delay={150}>
              <p>
                {t.wishes.p1_1}
                <br />
                {t.wishes.p1_2}
                <br />
                {t.wishes.p1_3}
                <br />
                {t.wishes.p1_4}
                <br />
                {t.wishes.p1_5}
                <br />
                {t.wishes.p1_6}
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={250}>
              <p>
                {t.wishes.p2_1}
                <br />
                {t.wishes.p2_2}
                <br />
                {t.wishes.p2_3}
                <br />
                {t.wishes.p2_4}
                <br />
                {t.wishes.p2_5}
                <br />
                {t.wishes.p2_6}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: RSVP / ПОДТВЕРЖДЕНИЕ ПРИСУТСТВИЯ               */}
        {/* ========================================================= */}
        <section className="px-6 sm:px-8 pb-4">
          <RsvpSection t={t.rsvp} />
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: CALENDAR & LIVE COUNTDOWN TIMER                */}
        {/* ========================================================= */}
        <WeddingCountdownCalendar t={t.calendar} />

      </main>
      </IntroReadyContext.Provider>
    </div>
  );
}
