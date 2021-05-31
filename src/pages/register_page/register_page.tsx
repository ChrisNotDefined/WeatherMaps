import React, { useState } from "react";
import { useHistory } from "react-router";
import { FormComponent } from "../../components/form_component/form_component";
import { Field } from "../../components/form_component/form_interface";
import Background from "../../components/landing_background/background";
import TextButton from "../../components/text_button/text_button";
import { validEmail } from "../../utils/validators";
import firebaseApp, { getAuthErrorMsg } from "../../utils/firebaseApp";
import styles from "./register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { IRState } from "../../redux/reducers";
import { LOADED_DATA, LOADING_DATA } from "../../redux/actionTypes";

function RegisterPage() {
  const history = useHistory();
  const isLoading = useSelector<IRState>((state) => state.isLoading) as boolean;

  const dispatch = useDispatch();

  const [errors, setErrors] = useState<string[]>([]);

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const changeRegisterData = (property: string, value: string) => {
    setRegisterData({
      ...registerData,
      [property]: value,
    });
  };

  const handleRegister = async () => {
    const { email, password, repeatPassword } = registerData;
    let catchedErrors: string[] = [];

    if (
      !email ||
      email === "" ||
      !password ||
      password === "" ||
      !repeatPassword ||
      repeatPassword === ""
    ) {
      catchedErrors = ["Favor de llenar todos los campos"];
      setErrors(catchedErrors);
      return;
    }

    if (password.length < 6) {
      catchedErrors.push("La contraseña es demasiado corta");
    }

    if (!validEmail(email)) {
      catchedErrors.push("El email no es válido");
    }

    if (password !== repeatPassword) {
      catchedErrors.push("Las contraseñas no coinciden");
    }

    if (catchedErrors.length > 0) {
      setErrors(catchedErrors);
      return;
    }

    dispatch({ type: LOADING_DATA });

    try {
      const res = await firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password);
      dispatch({ type: LOADED_DATA });
      console.log(res);
    } catch (err) {
      dispatch({ type: LOADED_DATA });
      setErrors([getAuthErrorMsg(err.code)]);
      console.error(err);
    }
  };

  const registerForm: Field[] = [
    {
      label: "Correo electrónico:",
      inputProps: {
        placeholder: "myEmail@email.com",
        value: registerData.email,
        onChange: (e) => {
          changeRegisterData("email", e.target.value);
        },
      },
    },
    {
      label: "Contraseña:",
      inputProps: {
        type: "password",
        value: registerData.password,
        onChange: (e) => {
          changeRegisterData("password", e.target.value);
        },
      },
    },
    {
      label: "Repetir Contraseña:",
      inputProps: {
        type: "password",
        value: registerData.repeatPassword,
        onChange: (e) => {
          changeRegisterData("repeatPassword", e.target.value);
        },
      },
    },
  ];

  return (
    <Background>
      <div className={styles.registerBody}>
        <div className={styles.desktopTitle}>
          <h1 className={styles.title}>Weather Maps</h1>
        </div>
        <div className={styles.desktopAside}>
          <h4 className={styles.indication}>Registrate</h4>
          <FormComponent values={registerForm} />
          <div className={styles.error}>
            {errors.map((err, ind) => (
              <p key={ind}>{err}</p>
            ))}
          </div>
          <button
            onClick={handleRegister}
            className={"button " + styles.action}
          >
            {isLoading && <i className="fas fa-snowflake spinning"></i>}
            <span>Registrarse</span>
          </button>
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
