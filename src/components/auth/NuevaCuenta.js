import React, { useState, useContext, useEffect } from "react";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/auntenticacion/authContext";

import { Link } from "react-router-dom";

const NuevaCuenta = (props) => {
  const [usuario, setUsuario] = useState({
    confirmar: "",
    email: "",
    nombre: "",
    password: "",
  });

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  const { confirmar, email, nombre, password } = usuario;

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

    //validar que no exista campo vacio
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      confirmar.trim() === "" ||
      password.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios!!!", "alerta-error");
      return;
    }

    //password minimo 6 caracteres
    if (password.length < 6) {
      mostrarAlerta(
        "El password debe de ser al menos de 6 caracteres",
        "alerta-error"
      );
      return;
    }

    // los dos psw son iguales
    if (password !== confirmar) {
      mostrarAlerta("los passwords no son iguales", "alerta-error");
      return;
    }
    //pasar al action
    registrarUsuario({
      nombre,
      email,
      password,
    });
  };

  return (
    <div className='form-usuario'>
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className='contenedor-form sombra-dark'>
        <h1>Obtener una Cuenta</h1>

        <form onSubmit={handelSubmit}>
          <div className='campo-form'>
            <label htmlFor='email'>Nombre</label>
            <input
              id='nombre'
              name='nombre'
              onChange={handleOnChange}
              placeholder='Tu Nombre'
              type='text'
              value={nombre}
            />
          </div>

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
            <label htmlFor='confirmar'>Confirmar Password</label>
            <input
              id='confirmar'
              name='confirmar'
              onChange={handleOnChange}
              placeholder='Repite tu Password'
              type='password'
              value={confirmar}
            />
          </div>

          <div className='campo-form'>
            <input
              type='submit'
              className='btn btn-primario btn-block'
              value='Registrarme'
            />
          </div>
        </form>

        <Link to='/' className='enlace-cuenta'>
          Volver a iniciar Sesion
        </Link>
      </div>
    </div>
  );
};
export default NuevaCuenta;
