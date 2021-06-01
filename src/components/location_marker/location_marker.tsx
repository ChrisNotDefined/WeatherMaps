import React from "react";
import styles from "./location_marker.module.css";

interface Props  {
  lat?: number,
  lng?: number,
  onClick: () => void
}

const LocationMarker = (props: Props) => {
  return (
    <>
      <div onClick={props.onClick} className={styles.location}></div>
    </>
  );
};

export default LocationMarker;
