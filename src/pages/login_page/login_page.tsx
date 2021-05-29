import React from "react";
import { useHistory } from "react-router";
import { FormComponent } from "../../components/form_component/form_component";
import { Field } from "../../components/form_component/form_interface";
import Background from "../../components/landing_background/background";
import TextButton from "../../components/text_button/text_button";
import styles from "./login_page.module.css";

function LoginPage() {
  const loginForm: Field[] = [
    {
      label: "Correo electrónico: ",
      inputProps: {
        placeholder: "test@email.com",
        onChange: (e) => {
          console.log(e.target.value);
        },
      },
    },
    {
      label: "Contraseña:",
      inputProps: {
        type: "password",
      },
    },
  ];

  const history = useHistory();

  return (
    <>
      <Background>
        <div className={styles.loginBody}>
          <div className={styles.desktopTitle}>
            <h1 className={styles.title}>Weather Maps</h1>
          </div>
          <div className={styles.desktopAside}>
            <h5 className={styles.indication}>
              Inicia sesión para ver tus ciudades
            </h5>
            <FormComponent values={loginForm} />
            <button className="button">Ingresar</button>
            <div className={styles.last}>
              <TextButton
                onClick={() => {
                  history.push("/register");
                }}
              >
                Registrarse
              </TextButton>
            </div>
          </div>
        </div>
      </Background>
    </>
  );
}

export default LoginPage;
