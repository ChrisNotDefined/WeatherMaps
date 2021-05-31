import React, { useState } from "react";
import { useSelector } from "react-redux";
import { WeatherResponse } from "../../models/weather_response";
import { IRState } from "../../redux/reducers";
import { kelvinToCelsius, kelvinToFahren, sentenceCapitalize } from "../../utils/converters";
import styles from "./city_details.module.css";

interface props {
  place: WeatherResponse | undefined;
}

function CityDetails(props: props) {
  const { place } = props;

  const isLoading = useSelector<IRState>((state) => state.isLoading);

  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={styles.container + " " + ((isLoading || !place || expanded) ? styles.expanded : " ")}
    >
      {isLoading ? (
        <div className={styles.information}>Cargando</div>
      ) : !place ? (
        <div className={styles.information}>Seleccione un lugar</div>
      ) : (
        <>
          <div className={styles.iconUp} onClick={() => setExpanded(!expanded)}>
            <i className="fas fa-chevron-up"></i>
            <h3 className={styles.cityTitle}>{place?.name}</h3>
          </div>
          <div className={styles.desktopExpanded}>
            <h3 className={styles.desktopTitle}>{place?.name}</h3>
            <div className={styles.cityDetails}>
              <div className={styles.cityData}>
                <div>{sentenceCapitalize(place.weather[0].description)}</div>
                <div>
                  {kelvinToCelsius(place.main.temp).toFixed(1) + " °C "}
                  {" | "}
                  {kelvinToFahren(place.main.temp).toFixed(1) + " °F"}
                </div>
                <div>{place.main.humidity} mm</div>
              </div>
              <div className={styles.climateImg}>
                <img alt="weather-icon" src="./assets/img/lluvia.svg" />
              </div>
            </div>
            <button className={"button " + styles.action}>Guardar</button>
          </div>{" "}
        </>
      )}
    </div>
  );
}

export default CityDetails;
