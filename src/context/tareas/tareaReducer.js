import {
  TAREA_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,  
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case TAREA_PROYECTO:
      return {
        ...state,
        tareasProyecto: action.payload,
      };

    case AGREGAR_TAREA:
      return {
        ...state,
        tareasProyecto: [action.payload, ...state.tareasProyecto],
        errorTarea: false,
      };
    case VALIDAR_TAREA:
      return {
        ...state,
        errorTarea: true,
      };
    case ELIMINAR_TAREA:
      return {
        ...state,
        tareasProyecto: state.tareasProyecto.filter(
          (tarea) => tarea._id !== action.payload
        ),
      };
    case ACTUALIZAR_TAREA:    
      return {
        ...state,
        tareasProyecto: state.tareasProyecto.filter((tarea) =>
          tarea._id === action.payload ? action.payload : tarea
        ),
        tareaSeleccionada: null,
      };
    case TAREA_ACTUAL:
      return {
        ...state,
        tareaSeleccionada: action.payload,
      };

    default:
      return state;
  }
};
