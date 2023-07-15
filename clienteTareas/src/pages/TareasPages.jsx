import { useEffect } from "react";
import TareasCard from "../componentes/TareasCard.jsx";
import { useTareas } from "../contexto/TareasProvider.jsx";

function TareasPages() {
const {tareas, cargarTareas} = useTareas()

  useEffect(() => {
    cargarTareas();
  }, []);

  function renderMain() {
    if(tareas.length===0) return <h2>No hay tareas registradas</h2>
    return tareas.map((tarea) => <TareasCard tarea={tarea} key={tarea.id} />);
  }

  return (
    <div>
      <h1 className="text-5xl text-blue-800 font-bold text-center">Tareas</h1><hr />
      <div className="grid grid-cols-3 gap-2">
      {renderMain()}
      </div>
    </div>
  );
}

export default TareasPages;
