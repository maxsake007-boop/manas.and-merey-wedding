import React, { useState, useEffect } from 'react';
import { GiftIcon } from './Doodles';
import { CheckCircle2, RotateCcw, Loader2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { sendRsvp, RsvpPayload } from '../services/rsvpService';
import { Translations } from '../i18n/translations';

interface RsvpSectionProps {
  t: Translations['rsvp'];
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ t }) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  const [names, setNames] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const options = [
    t.optionWillAttend,
    t.optionWithPlusOne,
    t.optionCannotAttend,
  ];

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding_rsvp_response');
      if (saved) {
        const parsed: RsvpPayload = JSON.parse(saved);
        setNames(parsed.names);
        setIsSubmitted(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!names.trim()) {
      setError(t.errorRequired);
      return;
    }
    setError(null);
    setIsSubmitting(true);

    const currentAttendance = options[selectedOptionIndex] || t.optionWillAttend;

    const data: RsvpPayload = {
      attendance: currentAttendance,
      names: names.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      await sendRsvp(data);
      setIsSubmitted(true);
    } catch (err) {
      console.warn('RSVP send error:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  const isDeclined = selectedOptionIndex === 2;

  return (
    <div className="w-full max-w-[340px] mx-auto text-center pt-8 pb-4">
      {/* Gift Icon connecting wishes & RSVP */}
      <ScrollReveal animation="pop" delay={100} className="flex justify-center mb-6">
        <GiftIcon className="w-12 h-12" />
      </ScrollReveal>

      {/* Heading */}
      <ScrollReveal animation="fade-up" delay={200}>
        <h2
          className="text-[26px] sm:text-[28px] leading-[1.25] text-stone-900 mb-4"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic' }}
        >
          {t.title1}
          <br />
          {t.title2}
        </h2>
      </ScrollReveal>

      {/* Subtitle */}
      <ScrollReveal animation="fade-up" delay={300}>
        <div
          className="text-[13.5px] sm:text-[14px] leading-relaxed text-stone-800 space-y-1 mb-8"
          style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
        >
          <p>{t.subtitle1}</p>
          <p>{t.subtitle2}</p>
          <p className="pt-0.5">{t.deadline}</p>
        </div>
      </ScrollReveal>

      {isSubmitted ? (
        <ScrollReveal animation="zoom-in">
          <div className="bg-[#f7f5f0] border border-stone-200/80 rounded-2xl p-6 text-center shadow-xs">
            <CheckCircle2 className="w-10 h-10 text-[#6e7a63] mx-auto mb-3 animate-bounce" />
            <h3
              className="text-2xl text-stone-900 mb-1"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic' }}
            >
              {t.thankYouTitle}
            </h3>
            <p
              className="text-[14.5px] text-stone-700 mb-4"
              style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
            >
              {isDeclined ? t.thankYouDeclined(names) : t.thankYouAccepted(names)}
            </p>

            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 transition-colors py-1.5 px-3 rounded-lg hover:bg-stone-200/60 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.editResponseBtn}</span>
            </button>
          </div>
        </ScrollReveal>
      ) : (
        <form onSubmit={handleSubmit} className="text-left space-y-7">
          {/* Radio Group: Присутствие на торжестве */}
          <ScrollReveal animation="fade-left" delay={350}>
            <div>
              <label
                className="block text-[15.5px] font-semibold text-stone-900 mb-3.5"
                style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
              >
                {t.attendanceLabel}
              </label>

              <div className="space-y-3.5 pl-0.5">
                {options.map((opt, idx) => (
                  <div
                    key={idx}
                    className="transition-transform duration-300 hover:translate-x-1"
                    style={{ transitionDelay: `${idx * 40}ms` }}
                  >
                    <label className="flex items-center gap-3.5 cursor-pointer group select-none">
                      <input
                        type="radio"
                        name="attendance"
                        value={opt}
                        checked={selectedOptionIndex === idx}
                        onChange={() => setSelectedOptionIndex(idx)}
                        className="custom-radio shrink-0"
                      />
                      <span
                        className="text-[15.5px] text-stone-900 group-hover:text-stone-700 transition-colors"
                        style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
                      >
                        {opt}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Text Input: Имя и Фамилия */}
          <ScrollReveal animation="fade-left" delay={450}>
            <div>
              <label
                htmlFor="guest-name"
                className="block text-[15.5px] font-semibold text-stone-900 mb-1"
                style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
              >
                {t.nameLabel}
              </label>

              <p className="text-[11.5px] leading-snug text-stone-500 mb-3">
                {t.nameHelp}
              </p>

              <input
                id="guest-name"
                type="text"
                value={names}
                onChange={(e) => {
                  setNames(e.target.value);
                  if (error) setError(null);
                }}
                placeholder={t.namePlaceholder}
                className="w-full pb-2 pt-1 text-[16px] text-stone-900 placeholder:text-stone-400 input-underline focus:border-stone-900"
                style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
              />

              {error && (
                <p className="text-xs text-rose-600 mt-1.5 animate-in fade-in duration-150">
                  {error}
                </p>
              )}
            </div>
          </ScrollReveal>

          {/* Submit Button */}
          <ScrollReveal animation="fade-up" delay={550} className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-8 rounded-full btn-olive text-[16.5px] font-normal tracking-wide shadow-xs active:scale-[0.99] transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t.submittingBtn}</span>
                </>
              ) : (
                <span>{t.submitBtn}</span>
              )}
            </button>
          </ScrollReveal>
        </form>
      )}
    </div>
  );
};
