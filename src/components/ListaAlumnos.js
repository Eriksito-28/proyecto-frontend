import React from 'react';
import './ListaAlumnos.css';

const ListaAlumnos = ({ alumnos, cursos, onEditar, onEliminar }) => {
  // 🔹 helper para mostrar nombre del curso en vez del id
  const getCursoNombre = (cursoId) => {
    const curso = cursos.find(c => c.id === cursoId);
    return curso ? curso.nombre : 'Sin curso';
  };

  return (
    <table className="tabla-alumnos">
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Email</th>
          <th>Cargo</th>
          <th>Curso</th> {/* 🔹 Nueva columna */}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {alumnos.map(alumno => (
          <tr key={alumno.id}>
            <td>
              {alumno.foto ? (
                <img src={alumno.foto} alt="Foto" className="foto-alumno"/>
              ) : (
                <div className="foto-placeholder">Sin foto</div>
              )}
            </td>
            <td>{alumno.nombre}</td>
            <td>{alumno.edad}</td>
            <td>{alumno.email}</td>
            <td>{alumno.cargo}</td>
            <td>{getCursoNombre(alumno.cursoId)}</td> {/* 🔹 Mostrar curso */}
            <td>
              <span className="icono-editar" onClick={() => onEditar(alumno)}>✏️</span>
              <span className="icono-eliminar" onClick={() => onEliminar(alumno.id)}>🗑️</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListaAlumnos;
