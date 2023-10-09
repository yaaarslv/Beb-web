document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const data = {
        email: email,
        password: password
    };

    fetch('http://localhost:63340/register', {
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
                window.location.href = 'index.html';
            } else {
                alert('Ошибка регистрации: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Ошибка: ' + error);
        });
});