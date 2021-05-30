import React from "react";
import GoogleMap from "google-map-react";
import styles from "./map_page.module.css";
import FavoritesBar from "../../components/favorites_bar/favorites_bar";
import CityDetails from "../../components/city_details/city_details";

function MapPage() {
  const mapControlOptions = (maps: GoogleMap.Maps): GoogleMap.MapOptions => {
    return {
      fullscreenControlOptions: {
        position: maps.ControlPosition.RIGHT_CENTER,
      },
      zoomControlOptions: {
        position: maps.ControlPosition.LEFT_CENTER,
      },
      mapTypeControl: true,
      mapTypeControlOptions: {
        position: maps.ControlPosition.RIGHT_TOP
      }
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles.barSpace}>
        <FavoritesBar />
      </div>
      <div className={styles.map}>
        <GoogleMap
          bootstrapURLKeys={{
            key: "AIzaSyAlAfjkEyZc3T2vLRARL5f4QYJj3ZPai6Q",
          }}
          defaultCenter={{
            lat: 18.9,
            lng: -99.2,
          }}
          defaultZoom={12}
          options={mapControlOptions}
        ></GoogleMap>
      </div>
      <div className={styles.desktopAside}>
        <CityDetails />
      </div>
    </div>
  );
}

export default MapPage;
