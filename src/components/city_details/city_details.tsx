import React, { useState } from "react";
import styles from "./city_details.module.css";

function CityDetails() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={styles.container + " " + (expanded ? styles.expanded : " ")}
    >
      <div className={styles.iconUp} onClick={() => setExpanded(!expanded)}>
        <i className="fas fa-chevron-up"></i>
        <h3 className={styles.cityTitle}>Cuernavaca</h3>
      </div>
      <div>
        <div className={styles.cityDetails}>
          <div className={styles.cityData}>
            <div>Lluvioso</div>
            <div>19 °C | 38°F</div>
            <div>34 mm</div>
          </div>
          <div className={styles.climateImg}>
            <img src="./assets/img/lluvia.svg" />
          </div>
        </div>
        <button className={"button " + styles.action}>Guardar</button>
      </div>
    </div>
  );
}

export default CityDetails;
