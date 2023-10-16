function is_valid_input(input) {
    const pattern = /^[A-Za-zА-Яа-я0-9\s]+$/;
    return pattern.test(input);
}

document.getElementById('reviewForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const author = document.getElementById('author').value;
    const text = document.getElementById('review-text').value;
    const data = {
        author: author,
        text: text
    };

    if (!is_valid_input(author) || !is_valid_input(text)) {
        alert('Ошибка: Ввод содержит недопустимые символы.');
        return;
    }

    const reviewForm = document.getElementById('reviewForm');
    reviewForm.classList.add('disabled');

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
                reviewForm.classList.remove('disabled');
            }
        })
        .catch(error => {
            console.error('Ошибка: ' + error);
        });
});
