import { Form, Formik } from "formik";
import { useTareas } from "../contexto/TareasProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateTareaRequest } from "../api/tareas.api";

function TareasFormulario() {
  const { crearTarea, getTarea, actualizarTarea } = useTareas();
  const [tarea, setTarea] = useState({
    titulo: "",
    descripcion: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const cargarUnaTarea = async () => {
      if (params.id) {
        const laTarea = await getTarea(params.id);
        setTarea({
          titulo: laTarea.titulo,
          descripcion: laTarea.descripcion,
        });
      }
    };
    cargarUnaTarea();
  }, []);

  return (
    <div>
      <Formik
        initialValues={tarea}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          if (params.id) {
            await updateTareaRequest(params.id, values);
          } else {
            await crearTarea(values);
          }
          navigate("/");
          setTarea({
            titulo: "",
            descripcion: "",
          });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-zinc-400 max-w-sm rounded-md p-4 mx-auto mt-10"
          >
            <h1 className="text-xl font-bold uppercase text-center">{params.id ? "Editar tarea" : "Nueva tarea"}</h1>
            <label className="block px-2 py-1 rounded-md w-full">Titulo</label>
            <input
              type="text"
              name="titulo"
              placeholder="Escriba un título"
              onChange={handleChange}
              value={values.titulo}
              className="px-2 py-1 rounded-md w-full"
            />
            <label className="block px-2 py-1 rounded-md w-full">
              Descripcion
            </label>
            <textarea
              name="descripcion"
              rows="3"
              placeholder="Escriba una descripción"
              onChange={handleChange}
              value={values.descripcion}
              className="px-2 py-1 rounded-md w-full"
            ></textarea>
            <button className="block bg-indigo-500 px-2 py-1 w-full rounded-md" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TareasFormulario;
