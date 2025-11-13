const API_URL = 'http://localhost:3000/api/clientes';
const formClienteDoc = document.getElementById('formClienteDoc');
const tablaClientes = document.querySelector("#tabla-clientes tbody");

formClienteDoc.addEventListener('submit', async (e) => {
    e.preventDefault()//Evitamoe el envio del formulario
    const documento = formClienteDoc.querySelector('input').value.trim();//Obtenemos el valor del input documento
    displayClientes(documento);//Mostramos los clientes segun el documento
});

/* Funcion para obtner clientes de la api */
async function fetchClientes(documento) {
    if (!documento) {
        try {
            const response = await fetch(API_URL);
            const clientes = await response.json();
            return clientes;
        } catch (e) {
            console.error('Error fetching clientes:', e);
            return [];
        }   
    }

    /* Caso de que si se haya insertado el documento se traeran los resultados de la bsuqueda */
    try {
        const response = await fetch(`${API_URL}/${documento}`);
        const cliente = await response.json();
        return cliente;
    } catch (e) {
        console.error('Error fetching clientes by documento:', e);
        return [];
    }
}
/* Funcion para mostrar clientes. */
async function displayClientes(documento) {
    const clientes = await fetchClientes(documento);
    console.log(clientes);
    tablaClientes.innerHTML = ' ';  

    if(clientes.mensaje === 'No se encontraron registros'){
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="8" class="text-center">No se encontraron clientes.</td>`;
        tablaClientes.appendChild(row);
        return
    }

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
    return [];    

    
}
/* Funcion para manejar los eventos de los botones*/
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
};

document.addEventListener('DOMContentLoaded', () => {
    displayClientes();
});