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
        validate={(values) => {
          let errores = {};
          if (!values.titulo) {
            errores.titulo = " ⚠️ Por favor ingresa título";
          }
          if (!values.descripcion) {
            errores.descripcion = "⚠️ Por favor ingresa una descripción";
          }

          return errores;
        }}
        enableReinitialize={true}
        onSubmit={async (values) => {
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
        {({ handleChange, handleBlur, touched, errors, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-zinc-400 max-w-sm rounded-md p-4 mx-auto mt-10"
          >
            <h1 className="text-xl font-bold uppercase text-center">
              {params.id ? "Editar tarea" : "Nueva tarea"}
            </h1>
            <label className="block px-2 py-1 rounded-md w-full">Titulo</label>
            <input
              type="text"
              name="titulo"
              placeholder="Escriba un título.."
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.titulo}
              className="px-2 py-1 rounded-md w-full"
            />
            {touched.titulo && errors.titulo && 
              <div className="inline-flex text-sm text-red-700">
                {errors.titulo}
              </div>
            }
            <label className="block px-2 py-1 rounded-md w-full">
              Descripción
            </label>
            <textarea
              name="descripcion"
              rows="3"
              placeholder="Escriba una descripción"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.descripcion}
              className="px-2 py-1 rounded-md w-full"
            ></textarea>
            {touched.descripcion && errors.descripcion && 
              <div className="inline-flex text-sm text-red-700">
                {errors.descripcion}
              </div>
            }
            <button
              className="block bg-indigo-500 px-2 py-1 w-full rounded-md"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TareasFormulario;
