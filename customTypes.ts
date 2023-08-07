import { LatLngTuple } from "leaflet";

export interface singleEvent {
  id: string;
  title: string;
  description: string | null;
  link: string;
  closed: string | null;
  categories: [
    {
      id: string;
      title: string;
    }
  ];
  sources: [
    {
      id: string;
      url: string;
    }
  ];
  geometry: geometry[];
}

export interface geometry {
  magnitudeValue: number;
  magnitudeUnit: string;
  date: string;
  type: string;
  coordinates: LatLngTuple;
}
