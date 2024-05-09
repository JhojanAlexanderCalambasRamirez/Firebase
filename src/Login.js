import React, { useState } from "react";
import { app } from "./fb";

const Login = (props) => {
  const [isRegistrando, setIsRegistrando] = useState(false);
  const [error, setError] = useState("");

  const crearUsuario = (correo, password) => {
    app
      .auth()
      .createUserWithEmailAndPassword(correo, password)
      .then((usuarioFirebase) => {
        console.log("usuario creado:", usuarioFirebase);
        props.setUsuario(usuarioFirebase);
      })
      .catch((error) => {
        setError(error.message); // Guarda el mensaje de error en el estado
      });
  };

  const iniciarSesion = (correo, password) => {
    app
      .auth()
      .signInWithEmailAndPassword(correo, password)
      .then((usuarioFirebase) => {
        console.log("sesión iniciada con:", usuarioFirebase.user);
        props.setUsuario(usuarioFirebase);
      })
      .catch((error) => {
        setError(error.message); // Guarda el mensaje de error en el estado
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const correo = e.target.emailField.value;
    const password = e.target.passwordField.value;

    // Limpiar el mensaje de error antes de realizar un nuevo intento
    setError("");

    if (isRegistrando) {
      crearUsuario(correo, password);
    } else {
      iniciarSesion(correo, password);
    }
  };

  return (
    <div>
      <h1>{isRegistrando ? "Regístrate" : "Inicia sesión"}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar el mensaje de error si existe */}
      <form onSubmit={submitHandler}>
        <label htmlFor="emailField">Correo</label>
        <input type="email" id="emailField" required />
        <label htmlFor="passwordField">Contraseña</label>
        <input type="password" id="passwordField" required />
        <button type="submit">{isRegistrando ? "Regístrate" : "Inicia sesión"}</button>
      </form>
      <button onClick={() => setIsRegistrando(!isRegistrando)}>
        {isRegistrando ? "¿Ya tienes cuenta? ¡Inicia sesión" : "¿No tienes cuenta? ¡Regístrate gratis!"}
      </button>
    </div>
  );
};

export default Login;
