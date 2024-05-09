import React, { useEffect, useState } from "react";
import { app } from "./fb";
import Home from "./Home";
import Login from "./Login";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged((usuarioFirebase) => {
      console.log("Estado de autenticación cambiado:", usuarioFirebase);
      setUsuario(usuarioFirebase);
      setLoading(false); // Marcar como finalizada la carga cuando la autenticación se complete
    });

    return () => unsubscribe();
  }, []);

  // Mostrar pantalla de carga mientras se inicializa Firebase
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Una vez que la inicialización de Firebase esté completa, mostrar la aplicación normalmente
  return (
    <>
      {usuario ? <Home /> : <Login setUsuario={setUsuario} />}
    </>
  );
}

export default App;
