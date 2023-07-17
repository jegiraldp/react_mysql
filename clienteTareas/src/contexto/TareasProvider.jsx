import { useContext, useState } from "react";
import {
  getTareasRequest,
  borrarTareaRequest,
  crearTareaRequest,
  getUnaTareaRequest,
  updateTareaRequest,
  updateTareaEstadoRequest,
} from "../api/tareas.api.js";
import { TareasContexto } from "./TareasContexto.jsx";

export const useTareas = () => {
  const contexto = useContext(TareasContexto);
  if (!contexto) {
    throw new Error("useTareas debe estar dentro de un TareasContextoProvider");
  }
  return contexto;
};

export const TareasContextoProvider = ({ children }) => {
  const [tareas, setTareas] = useState([]);

  async function cargarTareas() {
    const respuesta = await getTareasRequest();
    setTareas(respuesta.data);
  }

  const borrarTarea = async (id) => {
    try {
      await borrarTareaRequest(id);
      setTareas(tareas.filter((tareas) => tareas.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarTarea = async (id, nuevosCampos) => {
    try {
      await updateTareaRequest(id, nuevosCampos);
    } catch (error) {
      console.error(error);
    }
  };

  const crearTarea = async (tarea) => {
    try {
      await crearTareaRequest(tarea);
      //setTareas([...tareas, respuesta.data])
    } catch (error) {
      console.log(error);
    }
  };

  const getTarea = async (id) => {
    try {
      const respuesta = await getUnaTareaRequest(id);
      return respuesta.data;
    } catch (error) {
      console.log(error);
    }
  };

  const cambiarEstado = async (id) => {
    try {
      const tareaFound = tareas.find((tarea) => tarea.id === id);
      await updateTareaEstadoRequest(id, tareaFound.hecho === 0 ? 1 : 0);
      const respuesta = await getTareasRequest();
      setTareas(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TareasContexto.Provider
      value={{
        tareas,
        cargarTareas,
        borrarTarea,
        crearTarea,
        getTarea,
        actualizarTarea,
        cambiarEstado,
      }}
    >
      {children}
    </TareasContexto.Provider>
  );
};
