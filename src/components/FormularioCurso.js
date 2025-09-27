// src/components/FormularioCurso.js
import React, { useState } from 'react';

const FormularioCurso = ({ onGuardar }) => {
  const [form, setForm] = useState({ nombre: '', descripcion: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) return alert('El nombre del curso es obligatorio');
    // Llama a la función pasada desde App.js
    if (typeof onGuardar === 'function') {
      setLoading(true);
      try {
        onGuardar(form);
        setForm({ nombre: '', descripcion: '' });
      } catch (err) {
        console.error('Error en onGuardar:', err);
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Prop onGuardar no definida en FormularioCurso');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        border: '1px solid #ccc',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}
    >
      <h3 style={{ margin: 0 }}>{/* título pequeño */}Crear Curso</h3>

      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre del curso"
        required
      />

      <textarea
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
        placeholder="Descripción (opcional)"
        rows={3}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: '10px',
          borderRadius: '6px',
          background: '#2e8b57',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Guardando...' : 'Guardar Curso'}
      </button>
    </form>
  );
};

export default FormularioCurso;
