import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ListaAlumnos.css";

function ListaAlumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nuevoAlumno, setNuevoAlumno] = useState({ nombre: "", edad: "", email: "" });

  // ✅ Cargar alumnos
  const fetchAlumnos = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000/api/alumnos");
      setAlumnos(response.data);
    } catch (err) {
      setError("Error al cargar los alumnos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  // ✅ Agregar alumno
  const handleAgregar = async () => {
    try {
      await axios.post("http://localhost:4000/api/alumnos", nuevoAlumno);
      setNuevoAlumno({ nombre: "", edad: "", email: "" });
      fetchAlumnos(); // refrescar
    } catch (err) {
      alert("Error al agregar alumno");
    }
  };

  // ✅ Eliminar alumno
  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este alumno?")) {
      try {
        await axios.delete(`http://localhost:4000/api/alumnos/${id}`);
        fetchAlumnos();
      } catch (err) {
        alert("Error al eliminar alumno");
      }
    }
  };

  // ✅ Editar alumno (ejemplo simple: solo actualizar edad)
  const handleEditar = async (id) => {
    const nuevaEdad = prompt("Ingrese la nueva edad:");
    if (!nuevaEdad) return;
    try {
      await axios.put(`http://localhost:4000/api/alumnos/${id}`, { edad: nuevaEdad });
      fetchAlumnos();
    } catch (err) {
      alert("Error al editar alumno");
    }
  };

  if (loading) return <p>Cargando alumnos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="lista-container">
      <h2>Gestión de Alumnos</h2>

      {/* FORMULARIO AGREGAR */}
      <div className="form-agregar">
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoAlumno.nombre}
          onChange={(e) => setNuevoAlumno({ ...nuevoAlumno, nombre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Edad"
          value={nuevoAlumno.edad}
          onChange={(e) => setNuevoAlumno({ ...nuevoAlumno, edad: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={nuevoAlumno.email}
          onChange={(e) => setNuevoAlumno({ ...nuevoAlumno, email: e.target.value })}
        />
        <button className="btn btn-agregar" onClick={handleAgregar}>
          + Agregar
        </button>
      </div>

      {/* TABLA */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumno) => (
            <tr key={alumno.id}>
              <td>{alumno.id}</td>
              <td>{alumno.nombre}</td>
              <td>{alumno.edad}</td>
              <td>{alumno.email}</td>
              <td>
                <button className="btn btn-editar" onClick={() => handleEditar(alumno.id)}>
                  Editar
                </button>
                <button className="btn btn-eliminar" onClick={() => handleEliminar(alumno.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaAlumnos;
