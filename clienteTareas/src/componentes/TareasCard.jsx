import { useTareas } from "../contexto/TareasProvider.jsx";
import { useNavigate } from "react-router-dom";

function TareasCard({ tarea }) {
  const { borrarTarea, cambiarEstado } = useTareas();
  const navigate = useNavigate();

  const handleHecho = async () => {
    await cambiarEstado(tarea.id);
  };

  return (
    <div className="bg-zinc-400 p-4 rounded-md">
      <header className="flex justify-between">
        <h2 className="text-xl font-bold">{tarea.titulo}</h2>
        <span>{tarea.hecho == 1 ? "✔️" : "❌"}</span>
      </header>
      <p className="text-xs">{tarea.descripcion}</p>
      <span>{tarea.creado}</span>
      <div className="flex gap-2">
        <button
          className="bg-zinc-500 px-2 py-2 text-white rounded-md"
          onClick={() => borrarTarea(tarea.id)}
        >
          Eliminar
        </button>
        <button
          className="bg-zinc-500 px-2 py-2 text-white rounded-md"
          onClick={() => navigate(`/edit/${tarea.id}`)}
        >
          Editar
        </button>
        <button
          className="bg-zinc-500 px-2 py-2 text-white rounded-md"
          onClick={() => handleHecho(tarea.hecho)}
        >
          CambiarEstado
        </button>
      </div>
     
    </div>
  );
}

export default TareasCard;
