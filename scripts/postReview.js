document.getElementById('reviewForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const author = document.getElementById('author').value;
    const text = document.getElementById('review-text').value;
    const data = {
        author: author,
        text: text
    };

    fetch('https://petshop-backend-yaaarslv.vercel.app/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Отзыв отправлен!")
                window.location.href = 'reviews.html';
            } else {
                alert('Ошибка: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Ошибка: ' + error);
        });
});
