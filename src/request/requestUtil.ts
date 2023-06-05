import { get, post, del, patch } from "./axiosUtil";

export const getAllStation = async () => {
  return await get(`/multiSource/getAllStation`, true);
};

export const getWaterLevelByStationAndTime = async (
  type: string,
  station: string,
  startTime: string,
  endTime: string
) => {
  return await get(
    `/multiSource/getWaterLevelByStationAndTime/${type}/${station}/${startTime}/${endTime}`,
    true
  );
};

export const getPrediction = async (stationName: string) => {
  return await get(`/multiSource/getPrediction/${stationName}`, true);
};
