import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_y3btlp6QFfv3w3_O8ZZoQSuF5ZTJtdM",
  authDomain: "weather-maps-2e8d5.firebaseapp.com",
  projectId: "weather-maps-2e8d5",
  storageBucket: "weather-maps-2e8d5.appspot.com",
  messagingSenderId: "465382766108",
  appId: "1:465382766108:web:68d3cd5b6b4230558f11d9",
};

const loginCodes: { [key: string]: string } = {
  "auth/invalid-email": "El correo ingresado no es válido",
  "auth/user-disabled": "El usuario no está disponible",
  "auth/user-not-found": "El usuario no fué encontrado",
  "auth/wrong-password": "Las credenciales no son correctas",
  "auth/email-already-in-use": "Este correo ya está en uso",
  "auth/operation-not-allowed": "Accíon negada por el servidor",
  "auth/weak-password":
    "La contraseña es muy débil, escriba una com más carateres",
};

export const getAuthErrorMsg = (errorCode: string): string => {
  return loginCodes[errorCode];
};

export default firebase.initializeApp(firebaseConfig);
