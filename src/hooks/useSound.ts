import { useCallback } from 'react';

interface SoundOptions {
  volume?: number;
  playbackRate?: number;
}

class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private isEnabled: boolean = true;

  constructor() {
    // Only initialize sounds on client side
    if (typeof window !== 'undefined') {
      this.createSound('click', '/sounds/click.mp3');
      this.createSound('swoosh', '/sounds/swoosh.mp3');
      this.createSound('hover', '/sounds/hover.mp3');
      this.createSound('tab-switch', '/sounds/tab-switch.mp3');
      this.createSound('card-hover', '/sounds/card-hover.mp3');
    }
  }

  private createSound(name: string, src: string) {
    if (typeof window !== 'undefined') {
      const audio = new Audio(src);
      audio.preload = 'auto';
      audio.volume = 0.3;
      this.sounds.set(name, audio);
    }
  }

  play(name: string, options: SoundOptions = {}) {
    if (!this.isEnabled || typeof window === 'undefined') return;

    const sound = this.sounds.get(name);
    if (sound) {
      const { volume = 0.3, playbackRate = 1 } = options;
      sound.volume = volume;
      sound.playbackRate = playbackRate;
      sound.currentTime = 0;
      sound.play().catch(() => {
        // Silently fail if audio can't play
      });
    }
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }
}

// Global sound manager instance
const soundManager = new SoundManager();

export const useSound = () => {
  const playClick = useCallback(() => soundManager.play('click'), []);
  const playSwoosh = useCallback(() => soundManager.play('swoosh'), []);
  const playHover = useCallback(() => soundManager.play('hover'), []);
  const playTabSwitch = useCallback(() => soundManager.play('tab-switch'), []);
  const playCardHover = useCallback(() => soundManager.play('card-hover'), []);

  return {
    playClick,
    playSwoosh,
    playHover,
    playTabSwitch,
    playCardHover,
    toggleSound: () => soundManager.toggle(),
    setSoundEnabled: (enabled: boolean) => soundManager.setEnabled(enabled),
  };
};
