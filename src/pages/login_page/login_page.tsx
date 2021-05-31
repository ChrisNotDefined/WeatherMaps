import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { FormComponent } from "../../components/form_component/form_component";
import { Field } from "../../components/form_component/form_interface";
import Background from "../../components/landing_background/background";
import TextButton from "../../components/text_button/text_button";
import { LOADED_DATA, LOADING_DATA } from "../../redux/actionTypes";
import { IRState } from "../../redux/reducers";
import firebaseApp, { getAuthErrorMsg } from "../../utils/firebaseApp";
import { validEmail } from "../../utils/validators";
import styles from "./login_page.module.css";

function LoginPage() {
  const history = useHistory();
  const isLoading = useSelector<IRState>((state) => state.isLoading) as boolean;

  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<string[]>([]);

  const changeProperty = (propName: string, value: string): void => {
    setLoginData({
      ...loginData,
      [propName]: value,
    });
  };

  const handleLogin = () => {
    const { email, password } = loginData;
    let catchedErrors: string[] = [];

    if (!email || email === "" || !password || password === "") {
      catchedErrors = ["Favor de llenar todos los campos"];
      setErrors(catchedErrors);
      return;
    }

    if (!validEmail(email)) {
      catchedErrors.push("El email no es válido");
    }

    if (catchedErrors.length > 0) {
      setErrors(catchedErrors);
      return;
    }

    dispatch({ type: LOADING_DATA });

    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((ans) => {
        dispatch({ type: LOADED_DATA });
      })
      .catch((err) => {
        dispatch({ type: LOADED_DATA });
        setErrors([getAuthErrorMsg(err.code)]);
      });
  };

  const loginForm: Field[] = [
    {
      label: "Correo electrónico: ",
      inputProps: {
        placeholder: "test@email.com",
        value: loginData.email,
        onChange: (e) => {
          changeProperty("email", e.target.value);
        },
      },
    },
    {
      label: "Contraseña:",
      inputProps: {
        type: "password",
        value: loginData.password,
        onChange: (e) => {
          changeProperty("password", e.target.value);
        },
      },
    },
  ];

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
            <div className={styles.error}>
              {errors.map((err, ind) => (
                <p key={ind}>{err}</p>
              ))}
            </div>
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={"button " + styles.action}
            >
              {isLoading && <i className="fas fa-snowflake spinning"></i>}
              <span>Ingresar</span>
            </button>
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
