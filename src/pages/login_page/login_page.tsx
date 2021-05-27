import React from "react";
import { FormComponent } from "../../components/form_component/form_component";
import { Field } from "../../components/form_component/form_interface";
import styles from "./login_page.module.css";

function LoginPage() {
  const loginForm: Field[] = [
    {
      label: "Correo electrónico: ",
      inputProps: {
        placeholder: "test@email.com",
      },
    },
    {
      label: "Contraseña",
      inputProps: {
        type: "password",
      },
    },
  ];

  return (
    <>
      <Background>
        <h1 className="caption">Weather Maps</h1>
        <h5 className={styles.indication}>
          Inicia Sesión para ver tus ciudades
        </h5>
        <FormComponent values={loginForm} />
        <button>Ingresar</button>
      </Background>
    </>
  );
}

const Background: React.FC = ({ children }) => {
  return <div className={styles.background}>{children}</div>;
};

export default LoginPage;
