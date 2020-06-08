import React, { useState, useContext, useEffect } from "react";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/auntenticacion/authContext";

import { Link } from "react-router-dom";

const Login = (props) => {
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const { email, password } = usuario;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
      //eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  //handle´s
  const handleOnChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    //validar campos vacios
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
    }

    //pasar acction
    iniciarSesion({email, password});
  };

  return (
    <div className='form-usuario'>
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}

      <div className='contenedor-form sombra-dark'>
        <h1>Iniciar Sesion</h1>

        <form onSubmit={handelSubmit}>
          <div className='campo-form'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              name='email'
              onChange={handleOnChange}
              placeholder='Tu email'
              type='email'
              value={email}
            />
          </div>

          <div className='campo-form'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              name='password'
              onChange={handleOnChange}
              placeholder='Tu Clave'
              type='password'
              value={password}
            />
          </div>

          <div className='campo-form'>
            <input
              type='submit'
              className='btn btn-primario btn-block'
              value='iniciar Sesion'
            />
          </div>
        </form>

        <Link to='/nueva-cuenta' className='enlace-cuenta'>
          Obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
