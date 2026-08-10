'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { AUDIO_CONFIG, AudioId, AudioTrack } from '../lib/audioConfig';
import { SoundAsset } from '@/lib/sound-types';

interface AudioContextType {
  isAudioEnabled: boolean;
  isSubtitlesEnabled: boolean;
  toggleAudio: () => void;
  toggleSubtitles: () => void;
  playAmbient: (id: AudioId) => void;
  stopAmbient: () => void;
  playTriggered: (id: AudioId) => void;
  currentSubtitle: string | null;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const MIN_SUBTITLE_DURATION = 2000;
const AUDIO_ENABLED_KEY = 'app-audio-enabled';
const SUBTITLES_ENABLED_KEY = 'app-subtitles-enabled';

const getAudioSrc = (src: string | SoundAsset): string => {
  if (typeof src === 'string') return src;
  return src?.dataUri || '';
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem(AUDIO_ENABLED_KEY);
    return saved !== null ? saved === 'true' : true;
  });

  const [isSubtitlesEnabled, setIsSubtitlesEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem(SUBTITLES_ENABLED_KEY);
    return saved !== null ? saved === 'true' : true;
  });

  const [activeSounds, setActiveSounds] = useState<string[]>([]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const bufferCacheRef = useRef<Record<string, AudioBuffer>>({});

  const ambientSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const currentAmbientId = useRef<string | null>(null);
  const triggeredSourcesRef = useRef<Record<string, AudioBufferSourceNode[]>>({});

  const soundStartTimesRef = useRef<Record<string, number>>({});
  const activeTimeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);

    audioCtxRef.current = ctx;
    gainNodeRef.current = masterGain;

    masterGain.gain.value = isAudioEnabled ? 1.0 : 0.0;

    Object.entries(AUDIO_CONFIG).forEach(async ([id, track]) => {
      try {
        const src = getAudioSrc(track.src);
        if (!src) return;

        const response = await fetch(src);
        const arrayBuffer = await response.arrayBuffer();
        
        ctx.decodeAudioData(arrayBuffer, (buffer) => {
          bufferCacheRef.current[id] = buffer;
        }, (err) => {
          console.error(`Failed to decode audio buffer for ${id}:`, err);
        });
      } catch (err) {
        console.error(`Failed to fetch audio asset for ${id}:`, err);
      }
    });

    return () => {
      if (ctx.state !== 'closed') {
        ctx.close();
      }
      Object.values(activeTimeoutsRef.current).forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isAudioEnabled ? 1.0 : 0.0;
    }
    localStorage.setItem(AUDIO_ENABLED_KEY, String(isAudioEnabled));
  }, [isAudioEnabled]);

  useEffect(() => {
    localStorage.setItem(SUBTITLES_ENABLED_KEY, String(isSubtitlesEnabled));
  }, [isSubtitlesEnabled]);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isAudioEnabled ? 1.0 : 0.0;
    }
  }, [isAudioEnabled]);

  const resumeContext = async () => {
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      await audioCtxRef.current.resume();
    }
  };

  const playAmbient = async (id: string) => {
    await resumeContext();
    const ctx = audioCtxRef.current;
    const masterGain = gainNodeRef.current;
    const buffer = bufferCacheRef.current[id];

    if (!ctx || !masterGain || !buffer) return;

    if (ambientSourceRef.current && currentAmbientId.current !== id) {
      ambientSourceRef.current.stop();
      setActiveSounds((prev) => prev.filter((sid) => sid !== currentAmbientId.current));
    }

    if (currentAmbientId.current === id && ambientSourceRef.current) return;

    currentAmbientId.current = id;

    const trackGain = ctx.createGain();
    trackGain.gain.value = AUDIO_CONFIG[id]?.volume ?? 1.0;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    source.connect(trackGain);
    trackGain.connect(masterGain);
    
    source.start(0);
    ambientSourceRef.current = source;

    setActiveSounds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const stopAmbient = () => {
    if (ambientSourceRef.current) {
      ambientSourceRef.current.stop();
      ambientSourceRef.current = null;
      if (currentAmbientId.current) {
        const id = currentAmbientId.current;
        setActiveSounds((prev) => prev.filter((sid) => sid !== id));
        currentAmbientId.current = null;
      }
    }
  };

  const playTriggered = async (id: AudioId) => {
    await resumeContext();
    const ctx = audioCtxRef.current;
    const masterGain = gainNodeRef.current;
    const buffer = bufferCacheRef.current[id];

    if (!ctx || !masterGain || !buffer) {
      console.warn(`Audio buffer for ${id} is not loaded yet.`);
      return;
    }

    if (activeTimeoutsRef.current[id]) {
      clearTimeout(activeTimeoutsRef.current[id]);
      delete activeTimeoutsRef.current[id];
    }

    if (triggeredSourcesRef.current[id]) {
      triggeredSourcesRef.current[id].forEach(src => {
        try { src.stop(); } catch(e) {}
      });
      triggeredSourcesRef.current[id] = [];
    }

    const trackGain = ctx.createGain();
    trackGain.gain.value = AUDIO_CONFIG[id]?.volume ?? 1.0;

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    source.connect(trackGain);
    trackGain.connect(masterGain);

    soundStartTimesRef.current[id] = Date.now();

    setActiveSounds((prev) => (prev.includes(id) ? prev : [...prev, id]));

    source.onended = () => {
      const elapsed = Date.now() - (soundStartTimesRef.current[id] || Date.now());
      const remainingTime = MIN_SUBTITLE_DURATION - elapsed;

      const removeSound = () => {
        setActiveSounds((prev) => prev.filter((sid) => sid !== id));
        delete soundStartTimesRef.current[id];
        delete activeTimeoutsRef.current[id];
      };

      if (remainingTime > 0) {
        activeTimeoutsRef.current[id] = setTimeout(removeSound, remainingTime);
      } else {
        removeSound();
      }

      if (triggeredSourcesRef.current[id]) {
        triggeredSourcesRef.current[id] = triggeredSourcesRef.current[id].filter(s => s !== source);
      }
    };

    source.start(0);
    
    if (!triggeredSourcesRef.current[id]) {
      triggeredSourcesRef.current[id] = [];
    }
    triggeredSourcesRef.current[id].push(source);
  };

  const currentSubtitle = (() => {
    if (!isSubtitlesEnabled || activeSounds.length === 0) return null;

    let highestTrack: AudioTrack | null = null;
    activeSounds.forEach((id) => {
      const track = AUDIO_CONFIG[id];
      if (track) {
        if (!highestTrack || track.priority >= highestTrack.priority) {
          highestTrack = track;
        }
      }
    });

    return highestTrack ? (highestTrack as AudioTrack).subtitle : null;
  })();

  const toggleAudio = () => setIsAudioEnabled((prev) => !prev);
  const toggleSubtitles = () => setIsSubtitlesEnabled((prev) => !prev);

  return (
    <AudioContext.Provider
      value={{
        isAudioEnabled,
        isSubtitlesEnabled,
        toggleAudio,
        toggleSubtitles,
        playAmbient,
        stopAmbient,
        playTriggered,
        currentSubtitle,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used inside AudioProvider');
  return context;
};
