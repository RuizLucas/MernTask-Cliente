import React, { Fragment, useContext } from "react";

import { CSSTransition, TransitionGroup } from "react-transition-group";

//constext
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

//componets
import Tarea from "./Tarea";

const ListadoTarea = () => {
  //useContext de Proyecto
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminaProyecto } = proyectosContext;

  //useContext de tareas
  const tareasContext = useContext(tareaContext);
  const { tareasProyecto } = tareasContext;

  if (!proyecto) {
    return <h2>Selecciona un proyecto</h2>;
  }

  //array destructoring
  const [proyectoAcutal] = proyecto;

  const onClickEliminar = () => {
    eliminaProyecto(proyectoAcutal._id);
  };

  return (
    <Fragment>
      <h2>Proyecto : {proyectoAcutal.nombre}</h2>
      <ul className='listado-tareas'>
        {tareasProyecto.length === 0 ? (
          <li className='tarea'>
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasProyecto.map((tarea) => (
              <CSSTransition key={tarea.id} timeout={200} classNames='tarea'>
                <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>

      <button
        className='btn btn-primario'
        type='button'
        onClick={onClickEliminar}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListadoTarea;
