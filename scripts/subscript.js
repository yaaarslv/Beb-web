document.getElementById('subscriptionForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const data = {
        email: email,
    };

    fetch('https://petshop-backend-yaaarslv.vercel.app/subscript', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Подписка оформлена!")
                window.location.href = 'index.html';
            } else {
                alert('Ошибка: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Ошибка: ' + error);
        });
});
