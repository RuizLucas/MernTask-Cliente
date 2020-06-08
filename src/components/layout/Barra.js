import React, { useContext, useEffect } from "react";

//context
import AuthContext from "../../context/auntenticacion/authContext";

const Barra = () => {
  //extraer informacion para autentcacion
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    //eslint-disable-next-line
  }, []);

  return (
    <header className='app-header'>
      {usuario ? (
        <p className='nombre-usuario'>
          Hola <span>{usuario.nombre}</span>
        </p>
      ) : null}

      <nav className='nav-principal'>
        <button
          className='btn btn-blank cerrar-sesion'
          type='button'
          onClick={() => {
            cerrarSesion();
          }}
        >
          Cerrar Sesíon
        </button>
      </nav>
    </header>
  );
};

export default Barra;
