import React, { useState } from "react";
import firebaseApp from "../../utils/firebaseApp";
import styles from "./favorites_bar.module.css";

function FavoritesBar() {
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    firebaseApp.auth().signOut().then(res => {
      console.log('Sign out: ', res);
    });
  }

  return (
    <div className={styles.container + " " + (expanded ? styles.expanded : "")}>
      <div className={styles.bar}>
        <div
          className={styles.toggle}
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <span>
            <i className="fas fa-chevron-right"></i>
            <span>Favoritos</span>
          </span>
        </div>
        <div
          className={styles.signOut}
          onClick={handleLogout}
        >
          Cerrar Sesión
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
      <div className={styles.scroll}>
        <ul className={styles.dropdown}>
          <li>Leon</li>
          <li>NewYork</li>
          <li>Mexico</li>
        </ul>
      </div>
    </div>
  );
}

export default FavoritesBar;
