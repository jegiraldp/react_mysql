import axios from "axios";

export const getTareasRequest = async () =>
  await axios.get("http://localhost:4000/tareas");

export const crearTareaRequest = async (tarea) =>
  await axios.post("http://localhost:4000/tareas", tarea);

export const borrarTareaRequest = async (id) =>
  await axios.delete(`http://localhost:4000/tareas/${id}`);

export const getUnaTareaRequest = async (id) =>
  await axios.get(`http://localhost:4000/tareas/${id}`);

export const updateTareaRequest = async (id, nuevosCampos) =>
  await axios.put(`http://localhost:4000/tareas/${id}`, nuevosCampos);

export const updateTareaEstadoRequest = async (id, hecho) =>
  await axios.put(`http://localhost:4000/tareas/${id}`, {
    hecho,
  });
