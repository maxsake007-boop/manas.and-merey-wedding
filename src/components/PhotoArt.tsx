import React from 'react';

interface PhotoProps {
  id: 'merey' | 'manas' | 'couple';
  caption?: string;
  className?: string;
  aspectRatio?: string;
  altText?: string;
}

export const PhotoFrame: React.FC<PhotoProps> = ({
  id,
  caption,
  className = '',
  aspectRatio = 'aspect-[3/4]',
  altText = 'Фотография',
}) => {
  const webpSrc =
    id === 'merey'
      ? '/photos/merey.detsky.webp'
      : id === 'manas'
      ? '/photos/manas.detsky.webp'
      : '/photos/photo_2026-10-07_00-04-30.webp';

  const fallbackSrc =
    id === 'merey'
      ? '/photos/merey.detsky.png'
      : id === 'manas'
      ? '/photos/manas.detsky.png'
      : '/photos/photo_2026-10-07_00-04-30.jpg';

  return (
    <div className={`relative ${className}`}>
      <div className={`relative w-full ${aspectRatio} overflow-hidden bg-stone-100 rounded-[1px]`}>
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={fallbackSrc}
            alt={altText}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </picture>
      </div>

      {caption && (
        <div className="pt-2 pb-0.5 text-center">
          <span
            className="text-stone-900 text-[21px] sm:text-[23px] font-semibold leading-none select-none tracking-normal inline-block opacity-90"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            {caption}
          </span>
        </div>
      )}
    </div>
  );
};
