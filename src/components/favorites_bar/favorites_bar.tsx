import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Place } from "../../models/DatabasePlace";
import { SET_POSITION } from "../../redux/actionTypes";
import { IRState } from "../../redux/reducers";
import firebaseApp from "../../utils/firebaseApp";
import styles from "./favorites_bar.module.css";

interface Props {
  onLocationClick: (coords: google.maps.LatLngLiteral) => void | Promise<void>
}


function FavoritesBar(props: Props) {
  const {onLocationClick} = props;
  const [expanded, setExpanded] = useState(false);
  const places = useSelector<IRState, Place[] | undefined>(
    (state) => state.places
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    firebaseApp.auth().signOut();
  };

  const handleListSelected = (coords: google.maps.LatLngLiteral) => {
    dispatch({ type: SET_POSITION, payload: coords });
    onLocationClick(coords);
  };

  return (
    <div className={styles.container + " " + (expanded ? styles.expanded : "")}>
      <div className={styles.bar}>
        <div className={styles.toggle} onClick={() => setExpanded(!expanded)}>
          <span>
            <i className="fas fa-chevron-right"></i>
            <span>Favoritos</span>
          </span>
        </div>
        <div className={styles.signOut} onClick={handleLogout}>
          Cerrar Sesión
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
      <div className={styles.scroll}>
        <ul className={styles.dropdown}>
          {places && places.length > 0 ? (
            places.map((p, i) => (
              <li
                key={p.mainName + i}
                onClick={() => handleListSelected(p.coords)}
              >
                <div>
                  {p.mainName}
                  <span>{p.secondName}</span>
                </div>
              </li>
            ))
          ) : (
            <p className={styles.dropInfo}>No tienes lugares guardados</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default FavoritesBar;
