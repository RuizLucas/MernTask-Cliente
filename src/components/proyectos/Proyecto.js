import React, { useContext } from "react";
//contex
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  //obtener el state de proyecto
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;

  //funcion de tareas
  const tareasContext = useContext(tareaContext);
  const { obtenerTarea } = tareasContext;

  //funcion para agregarle el proyecto actual
  const seleccionarProyecto = (id) => {
    proyectoActual(id);
    obtenerTarea(id);
  };

  return (
    <li>
      <button
        className='btn btn-blank'
        type='button'
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
