document.getElementById('newsForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const subject = document.getElementById('subject').value;
    const text = document.getElementById('news-text').value;
    const data = {
        subject: subject,
        text: text
    };

    fetch('https://petshop-backend-yaaarslv.vercel.app/news', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Новость отправлена!")
                window.location.href = 'news.html';
            } else {
                alert('Ошибка: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Ошибка: ' + error);
        });
});
