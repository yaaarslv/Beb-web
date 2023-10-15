async function changeRole(userId) {
    const row = document.querySelector(`#user-${userId}`);
    const roleCell = row.querySelector('.role-cell');
    const role = roleCell.textContent;

    const editButton = row.querySelector('.edit-button');
    editButton.style.display = 'none'; // Скрыть кнопку "Изменить роль"

    const radios = document.createElement('div');
    radios.className = 'role-radios';

    const userRadio = document.createElement('label');
    userRadio.innerHTML = '<input type="radio" name="role" value="User" ' + (role === 'User' ? 'checked' : '') + '> User';

    const adminRadio = document.createElement('label');
    adminRadio.innerHTML = '<input type="radio" name="role" value="Admin" ' + (role === 'Admin' ? 'checked' : '') + '> Admin';

    const applyButton = document.createElement('button');
    applyButton.textContent = 'Применить';

    radios.appendChild(userRadio);
    radios.appendChild(adminRadio);
    radios.appendChild(applyButton);

    row.appendChild(radios);

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

    radios.appendChild(yesRadio);
    radios.appendChild(noRadio);
    radios.appendChild(applyButton);

    row.appendChild(radios);

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

// Функция для добавления нового пользователя
function addUser() {
    // Здесь можно реализовать логику добавления нового пользователя с использованием API сервера
    // Пример: открытие формы для ввода данных нового пользователя и добавление в таблицу
}


async function loadUserData() {
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
                row.id = `user-${user.id}`; // Устанавливаем id для строки
                row.innerHTML = `
                    <td class="id-cell">${user.id}</td>
                    <td class="email-cell">${user.email}</td>
                    <td class="role-cell">${user.role}</td>
                    <td>
                        <button class="edit-button" onclick="changeRole('${user.id}')">Изменить роль</button>
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
