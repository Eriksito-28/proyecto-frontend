import React, { useState, useEffect } from 'react';
import ListaAlumnos from './components/ListaAlumnos';
import FormularioAlumno from './components/FormularioAlumno';
import FormularioCurso from './components/FormularioCurso';

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoEditar, setAlumnoEditar] = useState(null);
  const [cursos, setCursos] = useState([]);

  // Cargar alumnos
  const cargarAlumnos = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/alumnos');
      const data = await res.json();

      // 🔹 Mapear para asegurar que cursoId exista
      const alumnosMapeados = data.map(a => ({
        ...a,
        cursoId: a.cursoId || (a.Curso ? a.Curso.id : '')
      }));

      setAlumnos(alumnosMapeados);
    } catch (error) {
      console.error('Error cargando alumnos:', error);
    }
  };

  // Cargar cursos
  const cargarCursos = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/cursos');
      const data = await res.json();
      setCursos(data);
    } catch (error) {
      console.error('Error cargando cursos:', error);
    }
  };

  useEffect(() => {
    cargarAlumnos();
    cargarCursos();
  }, []);

  // Eliminar alumno
  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este alumno?')) return;
    try {
      await fetch(`http://localhost:4000/api/alumnos/${id}`, { method: 'DELETE' });
      cargarAlumnos();
    } catch (error) {
      console.error('Error eliminando alumno:', error);
    }
  };

  // Guardar alumno (crear o editar)
  const handleGuardar = async (alumno) => {
    try {
      if (alumno.id) {
        await fetch(`http://localhost:4000/api/alumnos/${alumno.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(alumno),
        });
      } else {
        await fetch('http://localhost:4000/api/alumnos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(alumno),
        });
      }
      setAlumnoEditar(null);
      cargarAlumnos();
    } catch (error) {
      console.error('Error guardando alumno:', error);
    }
  };

  // Crear curso
  const handleCrearCurso = async (curso) => {
    try {
      const res = await fetch('http://localhost:4000/api/cursos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(curso),
      });

      const nuevoCurso = await res.json();
      setCursos((prev) => [...prev, nuevoCurso]);
    } catch (error) {
      console.error('Error creando curso:', error);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <div style={{ flex: 1 }}>
        <FormularioCurso onGuardar={handleCrearCurso} />

        <FormularioAlumno
          alumno={alumnoEditar}
          onGuardar={handleGuardar}
          cursos={cursos}
        />
      </div>
      <div style={{ flex: 2 }}>
        <ListaAlumnos
          alumnos={alumnos}
          cursos={cursos}
          onEditar={setAlumnoEditar}
          onEliminar={handleEliminar}
        />
      </div>
    </div>
  );
}

export default App;
