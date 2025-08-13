// Función para cargar y mostrar citas
async function loadCitas() {
  const response = await fetch('http://localhost:3000/citas');
  const citas = await response.json();
  
  const tbody = document.querySelector('#citas-table tbody');
  tbody.innerHTML = '';
  
  citas.forEach(cita => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${cita.paciente}</td>
      <td>${cita.medico}</td>
      <td>${cita.especialidad}</td>
      <td>${cita.fecha} ${cita.hora}</td>
      <td>${cita.estatus}</td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="deleteCita(${cita.id_cita})">
          Eliminar
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Función para crear nueva cita
async function createCita() {
  const paciente = document.getElementById('paciente').value;
  const medico = document.getElementById('medico').value;
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const motivo = document.getElementById('motivo').value;

  await fetch('http://localhost:3000/citas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paciente, medico, fecha, hora, motivo })
  });

  loadCitas(); // Recargar la lista
}

// Función para eliminar cita
async function deleteCita(id) {
  await fetch(`http://localhost:3000/citas/${id}`, { method: 'DELETE' });
  loadCitas(); // Recargar la lista
}

// Cargar citas al iniciar
document.addEventListener('DOMContentLoaded', () => {
  loadCitas();
});