export type BirdEye = {
  id: string;
  name: string;
  current_lat: number;
  current_long: number;
};

export type BirdEyePusher = {
  data: {
    id: string;
    name: string;
    lat: number;
    long: number;
  };
};
