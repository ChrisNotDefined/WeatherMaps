export interface Place {
  mainName: string;
  secondName?: string;
  coords: google.maps.LatLngLiteral
}

export interface PlaceDocument {
  places: Place[]
}