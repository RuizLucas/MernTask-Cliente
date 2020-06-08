import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
//Context
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";

//types
import {
  AGREGAR_PROYECTOS,
  ELIMINAR_PROYECTO,
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  PROYECTO_ACTUAL,
  PROYECTO_ERROR,
  VALIDAR_FORMULARIO,
} from "../../types";

const ProyectoState = (props) => {
  const inicialState = {
    formulario: false,
    proyectos: [],
    errorFormulario: false,
    proyecto: null,
    mensaje: null,
  };

  //dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, inicialState);

  //serie de funciones para el crud
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  //obtener los proyectos
  const obtenerProyectos = async () => {
    try {
      const result = await clienteAxios.get("/api/proyectos");
      dispatch({
        type: OBTENER_PROYECTOS,
        payload: result.data.proyectos,
      });
    } catch (error) {
      const alerta = {
        msg: "Ocurrio un Error",
        categoria: "alerta-error",
      };

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  //agregar nuevo proyecto
  const agregarProyecto = async (proyecto) => {
    try {
      const result = await clienteAxios.post("/api/proyectos", proyecto);

      dispatch({
        type: AGREGAR_PROYECTOS,
        payload: result.data,
      });
    } catch (error) {
      const alerta = {
        msg: "Ocurrio un Error",
        categoria: "alerta-error",
      };

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  //validar Formulario por errores
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };

  //Selecionar el proyecto que el usuario hga click
  const proyectoActual = (proyectoID) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoID,
    });
  };

  //elimina un proyecto
  const eliminaProyecto = async (proyectoId) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      const alerta = {
        msg: "Ocurrio un Error",
        categoria: "alerta-error",
      };

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorFormulario: state.errorFormulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        agregarProyecto,
        mostrarError,
        mostrarFormulario,
        obtenerProyectos,
        proyectoActual,
        eliminaProyecto,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
