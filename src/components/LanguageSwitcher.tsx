import React from 'react';
import { Language } from '../i18n/translations';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  const languages: { code: Language; label: string }[] = [
    { code: 'kz', label: 'KZ' },
    { code: 'uz', label: 'UZ' },
    { code: 'ru', label: 'RU' },
  ];

  return (
    <div
      className="fixed top-4 right-4 z-40 bg-white/90 hover:bg-white text-stone-700 p-1 rounded-full shadow-md backdrop-blur-md transition-all border border-stone-200/70 flex items-center gap-0.5 select-none"
      role="group"
      aria-label="Выбор языка"
    >
      {languages.map(({ code, label }) => {
        const isActive = currentLang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => onLanguageChange(code)}
            className={`text-[11px] font-sans px-2.5 py-1 rounded-full transition-all cursor-pointer select-none active:scale-95 ${
              isActive
                ? 'bg-[#6e7a63] text-white font-semibold shadow-xs'
                : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100/70'
            }`}
            title={`Переключить на ${label}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
