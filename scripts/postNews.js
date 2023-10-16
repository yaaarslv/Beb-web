document.getElementById('newsForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const subject = document.getElementById('subject').value;
    const text = document.getElementById('news-text').value;
    const data = {
        subject: subject,
        text: text
    };

    const newsForm = document.getElementById('newsForm');
    newsForm.classList.add('disabled');

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
                window.location.href = 'news.html';
            } else {
                alert('Ошибка: ' + data.error);
                newsForm.classList.remove('disabled');
            }
        })
        .catch(error => {
            console.error('Ошибка: ' + error);
        });
});
