import React, { Fragment, useState, useContext } from "react";

//contex
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  //obtener el state del formulario
  const proyectosContext = useContext(proyectoContext);

  const {
    formulario,
    errorFormulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext;

  const [proyecto, setProyecto] = useState({
    nombre: "",
  });

  const { nombre } = proyecto;

  const handleOnChangeProyecto = (e) => {
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nombre);

    //valir
    if (nombre === "") {
      mostrarError();
      return;
    }

    //agregar al state
    agregarProyecto(proyecto);

    //reinicar Form
    setProyecto({
      nombre: "",
    });
  };

  const handleOnClickFormulario = () => {
    mostrarFormulario();
  };

  return (
    <Fragment>
      <button
        className='btn btn-primario btn-block'
        type='button'
        onClick={handleOnClickFormulario}
      >
        Nuevo Proyecto
      </button>

      {formulario ? (
        <form className='formulario-nuevo-proyecto' onSubmit={handleSubmit}>
          <input
            className='input-text'
            type='text'
            name='nombre'
            placeholder='Nombre Proyecto'
            onChange={handleOnChangeProyecto}
            value={nombre}
          />

          <input
            className='btn btn-primario btn-block'
            type='submit'
            value='Agregar Proyecto'
          />
        </form>
      ) : null}

      {errorFormulario
      ?<p className="mensaje error">El nombre es Obligatorio!!!</p>
      :null 
      }
    </Fragment>
  );
};

export default NuevoProyecto;
