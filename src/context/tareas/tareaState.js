import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
//Context
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";

import {
  TAREA_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  LIMPIAR_TAREA,
  ACTUALIZAR_TAREA,
} from "../../types";

const TareaState = (props) => {
  const intialState = {
    tareasProyecto: [],
    errorTarea: false,
    tareaSeleccionada: null,
  };

  //create dispatch and state
  const [state, dispatch] = useReducer(TareaReducer, intialState);

  //obtener tareas del proyecto
  const obtenerTarea = async (proyecto) => {
    try {
      const result = await clienteAxios.get("/api/tareas/", {
        params: { proyecto },
      });
      console.log(result);

      dispatch({
        type: TAREA_PROYECTO,
        payload: result.data.tareas,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //agregar una tarea
  const agregarTarea = async (tarea) => {
    try {
      const result = await clienteAxios.post("/api/tareas", tarea);
      console.log(result);
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //valida y muestra un error

  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  //Eliminar tarea
  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Edita o modifica una tarea
  const actualizarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea
      );

      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //extraela tarea actual para edicion
  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  // Elimina la tareaseleccionada
  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };

  return (
    <TareaContext.Provider
      value={{
        errorTarea: state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,
        tareasProyecto: state.tareasProyecto,
        actualizarTarea,
        agregarTarea,
        eliminarTarea,
        guardarTareaActual,
        obtenerTarea,
        validarTarea,
        limpiarTarea,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
