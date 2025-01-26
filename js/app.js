const API_URL = 'http://localhost:3000/users'; // URL de la API

// Función para obtener todos los usuarios
async function getUsers() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        displayUsers(data);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
}

// Función para mostrar usuarios en la tabla
function displayUsers(users) {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Limpiar la tabla

    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.age}</td>
            <td>
                <button onclick="selectUser(${user.id})">Seleccionar</button>
              
            </td>
        `;
        userList.appendChild(tr);
    });
}

// Función para buscar un usuario por nombre
async function searchUser() {
    const searchName = document.getElementById('searchName').value;
    try {
        const response = await fetch(`${API_URL}?name=${searchName}`);
        const data = await response.json();
        displayUsers(data);
    } catch (error) {
        console.error('Error al buscar usuarios:', error);
    }
}

// Función para crear un nuevo usuario
async function createUser(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;

    const user = { name, email, age };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const newUser = await response.json();
        alert(`Usuario creado con ID: ${newUser.id}`);
        getUsers(); // Actualizar la lista de usuarios
    } catch (error) {
        console.error('Error al crear usuario:', error);
    }
}

// Función para eliminar un usuario
async function deleteUser(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        const data = await response.json();
        alert(data.message);
        getUsers(); // Actualizar la lista de usuarios
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
    }
}

// Función para seleccionar un usuario y mostrar su ID en el campo de eliminar
function selectUser(id) {
    document.getElementById('deleteId').value = id;
}

// Agregar eventos
document.getElementById('createUserForm').addEventListener('submit', createUser);
document.getElementById('searchButton').addEventListener('click', searchUser);

// Inicializar la lista de usuarios
getUsers();
