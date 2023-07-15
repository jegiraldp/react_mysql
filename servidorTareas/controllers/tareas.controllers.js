import { pool } from "../db.js";

export const getTareas = async (req, res) => {
  try {
    //throw new Error("error de conexion");
    const [resultado] = await pool.query(
      "SELECT * FROM tareas ORDER BY creado ASC"
    );
    res.json(resultado);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

export const getTarea = async (req, res) => {
  try {
    const [resultado] = await pool.query("SELECT * FROM tareas where id = ?", [
      req.params.id,
    ]);
    if (resultado.length === 0)
      return res.status(404).json({ mensaje: "tarea no existe" });
    res.json(resultado[0]);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

export const crearTarea = async (req, res) => {
  try {
    //console.log(req.body);
    const { titulo, descripcion } = req.body;
    const [resultado] = await pool.query(
      "INSERT INTO tareas (titulo, descripcion) VALUES (?,?)",
      [titulo, descripcion]
    );
    //res.send("Creando tareas");
    res.json({
      id: resultado.insertId,
      titulo,
      descripcion,
    });
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

export const actualizarTarea = async (req, res) => {
  try {
    const resultado = await pool.query("UPDATE tareas SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(resultado);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

export const borrarTarea = async (req, res) => {
  try {
    const [resultado] = await pool.query("DELETE FROM tareas where id = ?", [
      req.params.id,
    ]);
    if (resultado.affectedRows === 0)
      return res.status(404).json({ mensaje: "tarea no existe" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};
