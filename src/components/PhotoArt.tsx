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
  const imageSrc =
    id === 'merey'
      ? '/photos/merey.detsky.png'
      : id === 'manas'
      ? '/photos/manas.detsky.png'
      : '/photos/photo_2026-10-07_00-04-30.jpg';

  return (
    <div className={`relative ${className}`}>
      <div className={`relative w-full ${aspectRatio} overflow-hidden bg-stone-100 rounded-[1px]`}>
        <img
          src={imageSrc}
          alt={altText}
          loading="eager"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>

      {caption && (
        <div className="pt-2 pb-0.5 text-center">
          <span
            className="text-stone-900 text-[18px] sm:text-[19px] font-semibold leading-none select-none tracking-normal inline-block opacity-90"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            {caption}
          </span>
        </div>
      )}
    </div>
  );
};
