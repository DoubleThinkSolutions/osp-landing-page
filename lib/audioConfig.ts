import { click8bitSound } from "@/lib/click-8bit";
import { clickSoftSound } from "@/lib/click-soft";
import { SoundAsset } from "@/lib/sound-types";

export interface AudioTrack {
  id: AudioId;
  src: string | SoundAsset;
  priority: number;
  subtitle: string;
  volume: number;
}

export enum AudioId {
    CLICK = "click",
    TICK = "tick",
    CLACK = "clack",
}

export const AUDIO_CONFIG: Record<string, AudioTrack> = {
  click: {
    id: AudioId.CLICK,
    src: clickSoftSound,
    priority: 10,
    subtitle: '[click]',
    volume: 0.1,
  },
    tick: {
    id: AudioId.TICK,
    src: click8bitSound,
    priority: 10,
    subtitle: '[tick]',
    volume: 0.07,
  },
   clack: {
    id: AudioId.CLACK,
    src: click8bitSound,
    priority: 10,
    subtitle: '[clack]',
    volume: 0.1,
  },
};
