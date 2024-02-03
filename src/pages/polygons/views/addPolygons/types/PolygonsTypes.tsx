export type PolygonStore = {
  lat: number;
  long: number;
  zone_id: string;
};

export type PolygonsStore = {
  polygons: PolygonStore[];
};

export type Zone = {
  id: string;
  name: string;
  created_at: Date;
  polygons: Polygon[];
};

export type Polygon = {
  id: string;
  lat: number;
  long: number;
  zone_id: string;
  created_at?: Date;
};
