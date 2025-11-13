const API_URL = 'http://localhost:3000/api/clientes';
/* Funcion para obtner clientes de la api */
async function fetchClientes() {
    try {
        const response = await fetch(API_URL);
        const clientes = await response.json();
        return clientes;
    } catch (error) {
        console.error('Error fetching clientes:', error);
        return [];
    }   
}
/* Funcion para crear clientes */
async function createCliente(clienteData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteData)
        });
        const newCliente = await response.json();
        console.log('Cliente creado:', newCliente);//Devolvemos el clientes
        return newCliente;
    } catch (error) {
        console.error('Error al crear el cliente:', error);
        return error;
    }  
}

/* Funcion para mostrar clientes. */
async function displayClientes() {
    const clientes = await fetchClientes();
    const tablaClientes = document.querySelector("#tabla-clientes tbody");
    tablaClientes.innerHTML = ' ';  

    clientes.forEach(cliente => {
        const row = document.createElement('tr');

        row.innerHTML = `   
            <td>${cliente.id}</td>
            <td>${cliente.tipo_documento}</td>
            <td>${cliente.doc_identidad}</td>
            <td>${cliente.nombres}</td>
            <td>${cliente.apellidos}</td>
            <td>${cliente.direccion}</td>
            <td>${cliente.telefono}</td>
            <td class="text-center">
                <button class="btn btn-outline-warning edit-btn fs-5" data-id="${cliente.id}"><i class="fa-regular fa-pen-to-square"></i></button>
                <button class="btn btn-outline-danger delete-btn" data-id="${cliente.id}"><i class="fas fa-trash-alt action-icon delete"></i></button>
            </td>`;
        tablaClientes.appendChild(row);
    });
    attachEventListeners();
}
/* Funcion para manejar acciones*/
function attachEventListeners() {
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', () => {
            const clienteId = button.getAttribute('data-id');
            // Lógica para editar cliente
            console.log('Editar cliente con ID:', clienteId);
        });
    }); 
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async () => {
            const clienteId = button.getAttribute('data-id');   
            try {
                const response = await fetch(`${API_URL}/${clienteId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    console.log('Cliente eliminado con ID:', clienteId);
                    displayClientes(); 
                } else {
                    console.error('Error al eliminar cliente con ID:', clienteId);
                }   
            } catch (error) {
                console.error('Error al eliminar cliente:', error);
            }
        });
    });

    document.getElementById('formCliente').addEventListener('submit', async (e) => {
        e.preventDefault(); 
        let newCliente = {};//Creamos un objeto vacio para el nuevo cliente
        newCliente['tipo_documento'] = document.getElementById('tipo_documento').value;
        newCliente['doc_identidad'] = document.getElementById('doc_identidad').value;
        newCliente['nombres'] = document.getElementById('nombres').value;
        newCliente['apellidos'] = document.getElementById('apellidos').value;
        newCliente['direccion'] = document.getElementById('direccion').value;
        newCliente['telefono'] = document.getElementById('telefono').value;

        const createdCliente = await createCliente(newCliente);
        if (createdCliente && createdCliente.id) {
            alert('Cliente creado con éxito con ID: ' + createdCliente.id);
            document.getElementById('formCliente').reset();
            displayClientes(); 
        } else {
            alert('Error al crear el cliente.');
        }
    });
};



document.addEventListener('DOMContentLoaded', () => {
    displayClientes();
});