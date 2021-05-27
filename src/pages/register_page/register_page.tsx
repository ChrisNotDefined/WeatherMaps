import React from "react";
import { useHistory } from "react-router";
import { FormComponent } from "../../components/form_component/form_component";
import { Field } from "../../components/form_component/form_interface";
import Background from "../../components/landing_background/background";
import TextButton from "../../components/text_button/text_button";
import styles from "./register.module.css";

function RegisterPage() {
  const history = useHistory();

  const registerForm: Field[] = [
    {
      label: "Correo electrónico:",
      inputProps: {
        placeholder: "myEmail@email.com",
      },
    },
    {
      label: "Contraseña:",
      inputProps: {
        type: "password",
      },
    },
    {
      label: "Repetir Contraseña:",
      inputProps: {
        type: "password",
      },
    },
  ];

  return (
    <Background>
      <div className={styles.registerBody}>
        <div className={styles.desktopTitle}>
          <h2 className={styles.title}>Registro</h2>
        </div>
        <div className={styles.desktopAside}>
          <FormComponent values={registerForm} />
          <button>Registrarse</button>
          <div className={styles.last}>
            <TextButton
              onClick={() => {
                history.replace("/login");
              }}
            >
              Iniciar Sesión
            </TextButton>
          </div>
        </div>
      </div>
    </Background>
  );
}

export default RegisterPage;
