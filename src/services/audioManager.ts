// Singleton Audio Manager for Wedding Invitation Background Music
// Completely decoupled from React render cycle and language changes.

type Listener = (isPlaying: boolean) => void;

class WeddingAudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private userMuted: boolean = false;
  private listeners: Set<Listener> = new Set();
  private isInitialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    const audio = new Audio('/music/wedding.mp3');
    audio.loop = true;
    audio.preload = 'auto';

    // Fallback if named music.mp3
    audio.addEventListener('error', () => {
      if (audio.src.endsWith('/music/wedding.mp3')) {
        audio.src = '/music/music.mp3';
        if (this.isPlaying) {
          audio.play().catch(() => {});
        }
      }
    });

    audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.notify();
    });

    audio.addEventListener('playing', () => {
      this.isPlaying = true;
      this.notify();
    });

    audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });

    audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.notify();
    });

    this.audio = audio;

    // First attempt to play immediately on load
    this.tryPlay();

    // Attach global gesture listeners to start music on the very first touch/click anywhere on the screen
    const unlockEvents = ['pointerdown', 'touchstart', 'touchend', 'mousedown', 'click', 'keydown'];
    
    const onFirstGesture = () => {
      if (!this.isPlaying && !this.userMuted) {
        this.tryPlay();
      }
    };

    unlockEvents.forEach((evt) => {
      window.addEventListener(evt, onFirstGesture, { capture: true, passive: true });
    });

    // Also try playing if tab becomes visible
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && !this.isPlaying && !this.userMuted) {
        this.tryPlay();
      }
    });
  }

  public tryPlay() {
    if (!this.audio || this.userMuted) return;

    if (!this.audio.paused) {
      this.isPlaying = true;
      this.notify();
      return;
    }

    const promise = this.audio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          this.isPlaying = true;
          this.notify();
        })
        .catch(() => {
          // Browser Autoplay Policy requires user gesture (tap/click anywhere)
          this.isPlaying = false;
          this.notify();
        });
    }
  }

  public toggle() {
    if (!this.audio) return;

    if (this.isPlaying) {
      this.userMuted = true;
      this.audio.pause();
    } else {
      this.userMuted = false;
      this.tryPlay();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }
}

export const audioManager = new WeddingAudioManager();
