import React, { useReducer } from "react";

//Context
import AuthContext from "./authContext";
//redurcer
import AuthReducer from "./authReducer";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //registrar usuario
  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });
      //obtener usuario
      usuarioAutenticado();
    } catch (error) {
      const alerta = {
        msg: error.response.data.msj,
        categoria: "alerta-error",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  //retorna un usuario
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      tokenAuth(token);
    }

    try {
      const resp = await clienteAxios.get("/api/auth");
      dispatch({
        type: OBTENER_USUARIO,
        payload: resp.data.usuario,
      });
    } catch (error) {
      console.log(error);

      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  // Cuando el usuario inicia sesión
  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);

      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      });

      // Obtener el usuario
      usuarioAutenticado();
    } catch (error) {
      console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };

      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };

  //cierra session
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        autenticado: state.autenticado,
        mensaje: state.mensaje,
        toke: state.token,
        usuario: state.usuario,
        cargando: state.cargando,
        cerrarSesion,
        iniciarSesion,
        registrarUsuario,
        usuarioAutenticado,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
