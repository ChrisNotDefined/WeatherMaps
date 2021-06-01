import React, { FC } from "react";
import styles from "./markers.module.css";

interface MarkerProps {
  lat: number;
  lng: number;
  onClick?: () => void;
}

export const SelectionMarker: FC<MarkerProps> = (props: MarkerProps) => {
  return (
    <div className={styles.selection} onClick={props.onClick}>
      <img src="./assets/img/marker2.svg" alt="Current location" />
    </div>
  );
};

export const LocationMarker: FC<MarkerProps> = (props: MarkerProps) => {
  return (
    <div className={styles.selection} onClick={props.onClick}>
      <img src="./assets/img/marker.svg" alt="Current location" />
    </div>
  );
};

export const PlaceMarker: FC<MarkerProps> = (props: MarkerProps) => {
  return (
    <div className={styles.selection} onClick={props.onClick}>
      <img src="./assets/img/marker1.svg" alt="Current location" />
    </div>
  );
};
