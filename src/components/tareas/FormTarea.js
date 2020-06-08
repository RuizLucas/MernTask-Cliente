import React, { useContext, useState, useEffect } from "react";

//constext
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //useContext de tareas
  const tareasContext = useContext(tareaContext);
  const {
    actualizarTarea,
    agregarTarea,
    errorTarea,
    obtenerTarea,
    tareaSeleccionada,
    validarTarea,
    limpiarTarea,
  } = tareasContext;

  //State Formulario
  const [tarea, setTarea] = useState({
    nombre: "",
  });

  // effect que detecta si hay una tarea seleccionada

  useEffect(() => {
    if (tareaSeleccionada !== null) {
      setTarea(tareaSeleccionada);
    } else {
      setTarea({
        nombre: "",
      });
    }
  }, [tareaSeleccionada]);

  //extraer nombre del proyecto
  const { nombre } = tarea;

  const handleChange = (e) => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  if (!proyecto) {
    return null;
  }

  //array destructoring
  const [proyectoAcutal] = proyecto;

  const handleOnSubmit = (e) => {
    e.preventDefault();

    //validaciones
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    //es edicion o new task

    if (tareaSeleccionada === null) {
      //agregar tarea
      tarea.proyecto = proyectoAcutal._id;
      agregarTarea(tarea);
    } else {
      actualizarTarea(tarea);
      // Elimina tareaseleccionada del state
      limpiarTarea();
    }
    obtenerTarea(proyectoAcutal._id);
    setTarea({
      nombre: "",
    });
  };

  return (
    <div className='formulario'>
      <form onSubmit={handleOnSubmit}>
        <div className='contenedor-input'>
          <input
            className='input-text'
            type='text'
            name='nombre'
            value={nombre}
            onChange={handleChange}
            placeholder='Nombre tarea ...'
          />
        </div>
        <div className='contenedor-input'>
          <input
            className='btn btn-primario btn-block'
            type='submit'
            value={tareaSeleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {errorTarea ? (
        <p className='mensaje error'>Debe Ingresar un nombre de Tarea!!!</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
