import channelsData from '../../osp-sensors/channels.json';

export interface ComponentIndexRange {
  start: number;
  endInclusive: number;
}

export interface SensorComponent {
  name: string;
  unit: string;
  indices: ComponentIndexRange;
  type: string;
  possibleValues: Record<string, string> | null;
}

export interface SensorChannel {
  id: string;
  code: string;
  name: string;
  components: SensorComponent[];
  sampleType: 'CONTINUOUS' | 'TRIGGER' | string;
  rateHz: number;
  maxSampleCount: number;
  androidSensorType: number | null;
  description: string;
  flags: string[];
  dims: number;
}

export const SENSOR_CHANNELS: SensorChannel[] = (channelsData as any[]).map((channel) => ({
  id: channel.id,
  code: channel.id,
  name: channel.name,
  components: channel.components || [],
  sampleType: channel.sampleType,
  rateHz: channel.rateHz,
  maxSampleCount: channel.maxSampleCount,
  androidSensorType: channel.androidSensorType,
  description: channel.description,
  flags: channel.flags || [],
  dims: channel.dims,
}));
