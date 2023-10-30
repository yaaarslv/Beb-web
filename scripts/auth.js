document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const data = {
        email: email,
        password: password
    };

    const loginForm = document.getElementById('loginForm');
    loginForm.classList.add('disabled');

    fetch('https://petshop-backend-yaaarslv.vercel.app/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role)
                localStorage.setItem('isBanned', data.isBanned)
                localStorage.setItem('email', email)
                localStorage.setItem('emailConfirmed', data.emailConfirmed)
                window.location.href = 'index.html';
            } else {
                alert('Ошибка входа: ' + data.error);
                loginForm.classList.remove('disabled');
            }
        })
        .catch(error => {
            console.error('Ошибка: ' + error);
        });
});