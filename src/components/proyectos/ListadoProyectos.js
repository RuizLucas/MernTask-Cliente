import React, { useContext, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Proyecto from "./Proyecto";
//context
import proyectoContext from "../../context/proyectos/proyectoContext";
import AlertaContext from "../../context/alertas/alertaContext";

const ListadoProyectos = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyectos, mensaje, obtenerProyectos } = proyectosContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerProyectos();
      //eslint-disable-next-line
  }, [mensaje]);

  if (proyectos.leght === 0) return <p>No hay Proyecto comienza creando uno</p>;

  return (
    <ul className='listado-proyectos'>
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg} </div>
      ) : null}
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto._id} timeout={200} classNames='proyecto'>
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
