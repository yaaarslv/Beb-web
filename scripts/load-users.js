async function changeRole(userId) {
    const row = document.querySelector(`#user-${userId}`);
    const roleCell = row.querySelector('.role-cell');
    const role = roleCell.textContent;

    const editButton = row.querySelector('.edit-button');
    editButton.style.display = 'none';

    const radios = document.createElement('div');
    radios.className = 'role-radios';

    const userRadio = document.createElement('label');
    userRadio.innerHTML = '<input type="radio" name="role" value="User" ' + (role === 'User' ? 'checked' : '') + '> User';

    const adminRadio = document.createElement('label');
    adminRadio.innerHTML = '<input type="radio" name="role" value="Admin" ' + (role === 'Admin' ? 'checked' : '') + '> Admin';

    const applyButton = document.createElement('button');
    applyButton.textContent = 'Применить';

    const cancelChangeRoleButton = document.createElement('button');
    cancelChangeRoleButton.textContent = 'Отмена';

    radios.appendChild(userRadio);
    radios.appendChild(adminRadio);
    radios.appendChild(applyButton);
    radios.appendChild(cancelChangeRoleButton);

    row.appendChild(radios);

    cancelChangeRoleButton.addEventListener('click', () => {
        radios.style.display = 'none'
        editButton.style.display = 'initial';
        cancelChangeRoleButton.style.display = "none"
    });

    applyButton.addEventListener('click', async () => {
        const selectedRole = radios.querySelector('input[name="role"]:checked').value;

        const data = {
            userId: userId,
            action: "change_role",
            newRole: selectedRole
        };

        await fetch(`https://petshop-backend-yaaarslv.vercel.app/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message)
                    roleCell.textContent = selectedRole
                } else {
                    alert('Ошибка: ' + data.error);
                }
            }).catch(error => {
                console.error('Ошибка: ' + error);
            });

        row.removeChild(radios)
        editButton.style.display = 'initial';
    });
}

async function changeIsBanned(userId) {
    const row = document.querySelector(`#user-${userId}`);
    const isBannedCell = row.querySelector('.isBanned-cell');
    const isBanned = isBannedCell.textContent;

    const banButton = row.querySelector('.ban-button');
    banButton.style.display = 'none';

    const radios = document.createElement('div');
    radios.className = 'isBanned-radios';

    const banRadio = document.createElement('label');
    banRadio.innerHTML = '<input type="radio" name="isBanned" value="true" ' + (isBanned === 'true' ? 'checked' : '') + '> Забанить';

    const unbanRadio = document.createElement('label');
    unbanRadio.innerHTML = '<input type="radio" name="isBanned" value="false" ' + (isBanned === 'false' ? 'checked' : '') + '> Разбанить';

    const applyButton = document.createElement('button');
    applyButton.textContent = 'Применить';

    const cancelIsBannedButton = document.createElement('button');
    cancelIsBannedButton.textContent = 'Отмена';

    radios.appendChild(banRadio);
    radios.appendChild(unbanRadio);
    radios.appendChild(applyButton);
    radios.appendChild(cancelIsBannedButton);

    row.appendChild(radios);

    cancelIsBannedButton.addEventListener('click', () => {
        radios.style.display = 'none'
        banButton.style.display = 'initial';
        cancelIsBannedButton.style.display = "none"
    });

    applyButton.addEventListener('click', async () => {
        const selectedIsBanned = radios.querySelector('input[name="isBanned"]:checked').value;

        const data = {
            userId: userId,
            action: "change_user_is_banned",
            isBanned: selectedIsBanned
        };

        await fetch(`https://petshop-backend-yaaarslv.vercel.app/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message)
                    isBannedCell.textContent = selectedIsBanned
                } else {
                    alert('Ошибка: ' + data.error);
                }
            }).catch(error => {
                console.error('Ошибка: ' + error);
            });

        row.removeChild(radios)
        banButton.style.display = 'initial';
    });
}

async function deleteUser(userId) {
    const row = document.querySelector(`#user-${userId}`);

    const deleteButton = row.querySelector('.delete-button');
    deleteButton.style.display = 'none'; // Скрыть кнопку "Изменить роль"

    const radios = document.createElement('div');
    radios.className = 'delete-radios';

    const yesRadio = document.createElement('label');
    yesRadio.innerHTML = '<input type="radio" name="choice" value="Да"> Да';

    const noRadio = document.createElement('label');
    noRadio.innerHTML = '<input type="radio" name="choice" value="Нет" checked> Нет';

    const applyButton = document.createElement('button');
    applyButton.textContent = 'Применить';
    applyButton.classList.add('disabled');

    const cancelDeleteUserButton = document.createElement('button');
    cancelDeleteUserButton.textContent = 'Отмена';

    radios.appendChild(yesRadio);
    radios.appendChild(noRadio);
    radios.appendChild(applyButton);
    radios.appendChild(cancelDeleteUserButton);

    row.appendChild(radios);

    cancelDeleteUserButton.addEventListener('click', () => {
        radios.style.display = 'none'
        deleteButton.style.display = 'initial';
        cancelDeleteUserButton.style.display = "none"
    });

    yesRadio.querySelector('input').addEventListener('change', () => {
        applyButton.classList.remove('disabled');
    });

    noRadio.querySelector('input').addEventListener('change', () => {
        applyButton.classList.add('disabled');
    });

    applyButton.addEventListener('click', async () => {
        const selectedChoice = radios.querySelector('input[name="choice"]:checked').value;
        if (selectedChoice === "Да") {
            const data = {
                userId: userId,
                action: "delete_user",
            };

            await fetch(`https://petshop-backend-yaaarslv.vercel.app/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert(data.message)
                        row.style.display = 'none'
                    } else {
                        alert('Ошибка: ' + data.error);
                    }
                }).catch(error => {
                    console.error('Ошибка: ' + error);
                });

            row.removeChild(radios)
            deleteButton.style.display = 'initial';
        }
    });
}

document.getElementById('addUserForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {
        email: email,
        password: password,
    };

    const addUserForm = document.getElementById('addUserForm');
    addUserForm.classList.add('disabled');

    fetch('https://petshop-backend-yaaarslv.vercel.app/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const id = data.id;
                const email = data.email;
                const role = data.role;
                const userTableBody = document.getElementById('userTableBody');
                const row = document.createElement('tr');
                row.id = `user-${id}`;
                row.innerHTML = `
                    <td class="id-cell">${id}</td>
                    <td class="email-cell">${email}</td>
                    <td class="role-cell">${role}</td>
                    <td>
                        <button class="edit-button" onclick="changeRole('${id}')">Изменить роль</button>
                        <button class="delete-button" onclick="deleteUser('${id}')">Удалить</button>
                    </td>
                `;
                userTableBody.appendChild(row);
                cancelAddUser()

            } else {
                alert('Ошибка добавления пользователя: ' + data.error);
                addUserForm.classList.remove('disabled');
            }
        })
        .catch(error => {
            console.error('Ошибка: ' + error);
        });
});

function addUser() {
    const addUserButton = document.querySelector('.addUserButton');
    addUserButton.style.display = 'none'

    const addUserForm = document.querySelector('.add-user-form');
    addUserForm.style.display = 'block'

}

function cancelAddUser() {
    const addUserForm = document.querySelector('.add-user-form');
    addUserForm.style.display = 'none'

    const addUserButton = document.querySelector('.addUserButton');
    addUserButton.style.display = 'block'
}


async function loadUserData() {
    const token = localStorage.getItem('token');
    if (!token){
        window.location.href = 'auth.html';
    }

    const role = localStorage.getItem('role');
    const isBanned = localStorage.getItem('isBanned');
    if (role === "User" || isBanned === "true") {
        window.location.href = '403.html';
    }

    const loader = document.querySelector('.loader');

    try {
        loader.style.display = 'block';
        const response = await fetch('https://petshop-backend-yaaarslv.vercel.app/users');
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }

        const userData = await response.json();
        const userTableBody = document.getElementById('userTableBody');

        userTableBody.innerHTML = '';

        if (userData.users) {
            userData.users.forEach(user => {
                const row = document.createElement('tr');
                row.id = `user-${user.id}`;
                row.innerHTML = `
                    <td class="id-cell">${user.id}</td>
                    <td class="email-cell">${user.email}</td>
                    <td class="role-cell">${user.role}</td>
                    <td class="isBanned-cell">${user.isBanned}</td>
                    <td>
                        <button class="edit-button" onclick="changeRole('${user.id}')">Изменить роль</button>
                        <button class="ban-button" onclick="changeIsBanned('${user.id}')">Управлять баном</button>
                        <button class="delete-button" onclick="deleteUser('${user.id}')">Удалить</button>
                    </td>
                `;
                userTableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error(error);
    } finally {
        loader.style.display = 'none';
    }
}

window.addEventListener('DOMContentLoaded', loadUserData);
