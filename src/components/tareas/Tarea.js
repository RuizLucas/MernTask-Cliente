import React, { useContext } from "react";

//constext
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Tarea = ({ tarea }) => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //useContext de tareas
  const tareasContext = useContext(tareaContext);
  const { eliminarTarea, obtenerTarea, guardarTareaActual,actualizarTarea } = tareasContext;

  //extraer proeycto
  const [proyectoActual] = proyecto;

  //funcion eliminar
  const handleEliminarTarea = (id) => {
    eliminarTarea(id, proyectoActual._id);
    obtenerTarea(proyectoActual.id);
  };

  //funcion modifica tareas
  const handleCambiarEstado = (tarea) => {
    tarea.estado = !tarea.estado;
    actualizarTarea(tarea);
  };

  //funcion editar tarea

  const handleSelecionarTarea = (tarea) => {
    guardarTareaActual(tarea);
  };

  return (
    <li className='tarea sombra' key={tarea.id}>
      <p>{tarea.nombre}</p>
      <div className='estado'>
        {tarea.estado ? (
          <button
            className='completo'
            type='button'
            onClick={() => handleCambiarEstado(tarea)}
          >
            Completo
          </button>
        ) : (
          <button
            className='incompleto'
            type='button'
            onClick={() => handleCambiarEstado(tarea)}
          >
            Incompleto
          </button>
        )}
      </div>
      <div className='acciones'>
        <button
          className='btn btn-primario'
          type='button'
          onClick={() => {
            handleSelecionarTarea(tarea);
          }}
        >
          Editar
        </button>
        <button
          className='btn btn-secundario'
          type='button'
          onClick={() => {
            handleEliminarTarea(tarea._id);
          }}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
