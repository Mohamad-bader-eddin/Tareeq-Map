export type BirdEye = {
  id: string;
  name: string;
  last_name: string;
  current_lat: number;
  current_long: number;
  order_id?: number;
};

export type BirdEyePusher = {
  data: {
    id: string;
    name: string;
    last_name: string;
    lat: number;
    long: number;
    order_id?: number;
  };
};
