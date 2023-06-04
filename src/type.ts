export interface ResponseType {
  code: number;
  msg: string;
  data: any;
}

export interface StationInfo {
  id: string;
  keys: string;
  keys_cn: string;
  lat: number;
  lon: number;
  name: string;
  name_en: string;
  prediction: number;
  start_time: string;
  type: string;
}

export type YangtzeWaterLevelRes = {
  station: string;
  time: string;
  waterLevel: number | null;
  flow: number | null;
};

export type JSWaterLevelRes = {
  station: string;
  time: string;
  upstreamWaterLevel: number | null;
  downstreamWaterLevel: number | null;
  flow: number | null;
};

export type ZJWaterLevelRes = {
  station: string;
  time: string;
  rainfall: number | null;
  waterLevel: number | null;
  input: number | null;
  output: number | null;
};

export type AHWaterLevelRes = YangtzeWaterLevelRes;
export type HBWaterLevelRes = YangtzeWaterLevelRes;
