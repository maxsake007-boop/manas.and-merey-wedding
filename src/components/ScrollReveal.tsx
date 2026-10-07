import React, { useEffect, useRef, useState } from 'react';

export type AnimationType =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'polaroid-left'
  | 'polaroid-right'
  | 'pop'
  | 'bloom'
  | 'drive'
  | 'blur-reveal'
  | 'flip-card';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number; // milliseconds
  duration?: number; // milliseconds
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 750,
  className = '',
  threshold = 0.15,
  rootMargin = '0px 0px -50px 0px',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  // Generate appropriate transform and opacity based on animation type and isVisible state
  const getStyles = (): React.CSSProperties => {
    const transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms ease-out ${delay}ms`;

    if (isVisible) {
      switch (animation) {
        case 'polaroid-left':
          return {
            opacity: 1,
            transform: 'translateY(0) rotate(-2deg) scale(1)',
            filter: 'blur(0)',
            transition,
          };
        case 'polaroid-right':
          return {
            opacity: 1,
            transform: 'translateY(0) rotate(2deg) scale(1)',
            filter: 'blur(0)',
            transition,
          };
        default:
          return {
            opacity: 1,
            transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)',
            filter: 'blur(0)',
            transition,
          };
      }
    }

    // Hidden / Initial state before scrolling into view
    switch (animation) {
      case 'fade-up':
        return {
          opacity: 0,
          transform: 'translate3d(0, 32px, 0)',
          transition,
        };
      case 'fade-down':
        return {
          opacity: 0,
          transform: 'translate3d(0, -28px, 0)',
          transition,
        };
      case 'fade-left':
        return {
          opacity: 0,
          transform: 'translate3d(-35px, 0, 0)',
          transition,
        };
      case 'fade-right':
        return {
          opacity: 0,
          transform: 'translate3d(35px, 0, 0)',
          transition,
        };
      case 'zoom-in':
        return {
          opacity: 0,
          transform: 'scale(0.85) translate3d(0, 15px, 0)',
          filter: 'blur(4px)',
          transition,
        };
      case 'polaroid-left':
        return {
          opacity: 0,
          transform: 'translate3d(0, 45px, 0) rotate(-9deg) scale(0.9)',
          transition,
        };
      case 'polaroid-right':
        return {
          opacity: 0,
          transform: 'translate3d(0, 45px, 0) rotate(9deg) scale(0.9)',
          transition,
        };
      case 'pop':
        return {
          opacity: 0,
          transform: 'scale(0.65)',
          transition: `opacity ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
        };
      case 'bloom':
        return {
          opacity: 0,
          transform: 'scale(0.4) rotate(-35deg)',
          transition: `opacity ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
        };
      case 'drive':
        return {
          opacity: 0,
          transform: 'translate3d(-50px, 0, 0) scale(0.88)',
          transition,
        };
      case 'blur-reveal':
        return {
          opacity: 0,
          filter: 'blur(10px)',
          transform: 'scale(0.96)',
          transition,
        };
      case 'flip-card':
        return {
          opacity: 0,
          transform: 'perspective(600px) rotateX(18deg) translate3d(0, 25px, 0)',
          transition,
        };
      default:
        return {
          opacity: 0,
          transform: 'translate3d(0, 25px, 0)',
          transition,
        };
    }
  };

  return (
    <div ref={ref} style={getStyles()} className={className}>
      {children}
    </div>
  );
};
