import React, { useState, useEffect } from 'react';

const FormularioAlumno = ({ alumno, onGuardar, cursos }) => {
  const [form, setForm] = useState({
    nombre: '',
    edad: '',
    email: '',
    cargo: '',
    foto: '',
    cursoId: '',
  });

  useEffect(() => {
    if (alumno) {
      setForm({
        id: alumno.id || '',
        nombre: alumno.nombre || '',
        edad: alumno.edad || '',
        email: alumno.email || '',
        cargo: alumno.cargo || '',
        foto: alumno.foto || '',
        cursoId: alumno.cursoId ? String(alumno.cursoId) : '', // string para <select>
      });
    }
  }, [alumno]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar({
      ...form,
      cursoId: form.cursoId ? parseInt(form.cursoId, 10) : null, // número para Sequelize
    });

    setForm({
      nombre: '',
      edad: '',
      email: '',
      cargo: '',
      foto: '',
      cursoId: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      <h3>{form.id ? 'Editar Alumno' : 'Crear Alumno'}</h3>

      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        name="edad"
        type="number"
        value={form.edad}
        onChange={handleChange}
        placeholder="Edad"
        required
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        name="cargo"
        value={form.cargo}
        onChange={handleChange}
        placeholder="Cargo"
      />
      <input
        name="foto"
        value={form.foto}
        onChange={handleChange}
        placeholder="URL Foto"
      />

      <select name="cursoId" value={form.cursoId} onChange={handleChange}>
        <option value="">-- Seleccionar curso --</option>
        {cursos.map((curso) => (
          <option key={curso.id} value={curso.id}>
            {curso.nombre}
          </option>
        ))}
      </select>

      <button
        type="submit"
        style={{
          padding: '10px',
          borderRadius: '5px',
          background: 'blue',
          color: 'white',
        }}
      >
        {form.id ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
};

export default FormularioAlumno;
