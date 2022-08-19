export enum GeolocationType {
  CITY = 'city',
  REGION = 'region',
  COUNTRY = 'country',
}

export type GeolocationBBox = [number, number, number, number];
export type GeolocationCenter = [number, number];

export interface Geolocation {
  id: string;
  name: string;
  fullName: string;
  type: GeolocationType;
  parent?: Geolocation;
  children: Geolocation[];
  bbox: GeolocationBBox;
  center: GeolocationCenter;
}
