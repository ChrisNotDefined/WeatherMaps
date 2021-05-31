import React, { useEffect, useState } from "react";
import GoogleMap from "google-map-react";
import styles from "./map_page.module.css";
import FavoritesBar from "../../components/favorites_bar/favorites_bar";
import CityDetails from "../../components/city_details/city_details";
import firebaseApp from "../../utils/firebaseApp";
import { useDispatch, useSelector } from "react-redux";
import { IRState } from "../../redux/reducers";
import {
  LOADED_DATA,
  LOADED_PLACES,
  LOADING_DATA,
} from "../../redux/actionTypes";
import { WEATHER_KEY } from "../../utils/credentials";
import { WeatherResponse } from "../../models/weather_response";

function MapPage() {
  const uid = useSelector<IRState>((state) => state.loggedInID) as string;
  const dispatch = useDispatch();

  const [center, setCenter] = useState({
    lat: 18.9,
    lng: -99.2,
  });

  const [selectedPlace, setSelectedPlace] = useState<WeatherResponse>();

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
        position: maps.ControlPosition.RIGHT_TOP,
      },
    };
  };

  const handleCoordClick = (value: GoogleMap.ClickEventValue) => {
    const { lat, lng } = value;

    setCenter({
      lat,
      lng,
    });

    dispatch({ type: LOADING_DATA });

    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_KEY}&lang=es`;

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch({ type: LOADED_DATA });
        setSelectedPlace(data)
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const userDoc = firebaseApp.firestore().collection("users").doc(uid);
    const snapshotSub = userDoc.onSnapshot((snapshot) => {
      const userData = snapshot.data();
      dispatch({ type: LOADED_PLACES, payload: userData });
    });

    return () => {
      snapshotSub();
    };
  }, [uid, dispatch]);

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
          center={center}
          defaultZoom={12}
          options={mapControlOptions}
          onClick={handleCoordClick}
        ></GoogleMap>
      </div>
      <div className={styles.desktopAside}>
        <CityDetails place={selectedPlace} />
      </div>
    </div>
  );
}

export default MapPage;
