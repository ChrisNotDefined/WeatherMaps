import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Place } from "../../models/DatabasePlace";
import { WeatherResponse } from "../../models/weather_response";
import { IRState } from "../../redux/reducers";
import {
  kelvinToCelsius,
  kelvinToFahren,
  sentenceCapitalize,
} from "../../utils/converters";
import firebaseApp from "../../utils/firebaseApp";
import styles from "./city_details.module.css";

interface props {
  weatherData?: WeatherResponse;
  locationData?: google.maps.GeocoderResult;
}

function CityDetails(props: props) {
  const { weatherData, locationData } = props;

  const selectedPosition = useSelector<IRState, google.maps.LatLngLiteral>(
    (state) => state.selectedPosition
  );

  const places = useSelector<IRState, Place[] | undefined>(
    (state) => state.places
  );

  const userID = useSelector<IRState, string | null>(
    (state) => state.loggedInID
  );

  const isLoading = useSelector<IRState>((state) => state.isLoading);
  const [expanded, setExpanded] = useState(false);

  const handleAddLocation = () => {
    const newLocation: Place = {
      mainName: weatherData!.name,
      secondName: locationData ? locationData.formatted_address : " ",
      coords: selectedPosition,
    };

    const userDoc = firebaseApp.firestore().collection("users").doc(userID!);

    if (places) {
      userDoc.set({ places: [...places, newLocation] });
    } else {
      userDoc.set({ places: [newLocation] });
    }
  };

  const handleRemoveLocation = () => {
    const filteredPlaces = places!.filter(
      (p) =>
        p.mainName !== weatherData!.name &&
        p.secondName !== (locationData ? locationData.formatted_address : " ")
    );

    const userDoc = firebaseApp.firestore().collection("users").doc(userID!);

    userDoc.set({ places: filteredPlaces });
  };

  const isInList = (): boolean => {
    if (!places || !weatherData) return false;

    return places.some(
      (p) =>
        p.mainName === weatherData.name &&
        p.secondName === (locationData ? locationData.formatted_address : " ")
    );
  };

  return (
    <div
      className={
        styles.container +
        " " +
        (isLoading || !weatherData || expanded ? styles.expanded : "")
      }
    >
      {isLoading ? (
        <div className={styles.information}>
          <i className="fas fa-snowflake spinning"></i> Cargando
        </div>
      ) : !weatherData ? (
        <div className={styles.information}>Seleccione un lugar</div>
      ) : (
        <>
          <div className={styles.iconUp} onClick={() => setExpanded(!expanded)}>
            <i className="fas fa-chevron-up"></i>
            <h3 className={styles.cityTitle}>{weatherData?.name}</h3>
            <p className={styles.preciseName}>
              {locationData?.formatted_address}
            </p>
          </div>
          <div className={styles.desktopExpanded}>
            <h3 className={styles.desktopTitle}>{weatherData?.name}</h3>
            <p className={styles.preciseName + " " + styles.desktopTitle}>
              {locationData?.formatted_address}
            </p>
            <div className={styles.cityDetails}>
              <div className={styles.cityData}>
                <div>
                  {sentenceCapitalize(weatherData.weather[0].description)}
                </div>
                <div className={styles.temp}>
                  <div>
                    {kelvinToCelsius(weatherData.main.temp).toFixed(1) + " °C "}
                  </div>
                  <div>
                    {kelvinToFahren(weatherData.main.temp).toFixed(1) + " °F"}
                  </div>
                </div>
                <div>{weatherData.main.humidity} mm</div>
              </div>
              <div className={styles.climateImg + " " + (weatherData.weather[0].icon.charAt(2) === 'd' ? styles.day : styles.night)}>
                <img
                  alt="weather-icon"
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                />
              </div>
            </div>

            <button
              onClick={!isInList() ? handleAddLocation : handleRemoveLocation}
              className={
                "button " +
                styles.action +
                " " +
                (isInList() ? styles.remove : "")
              }
            >
              {!isInList() ? "Guardar" : "Quitar"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CityDetails;
