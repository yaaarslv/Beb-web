async function fetchAndDisplayNews() {
    const response = await fetch('https://petshop-backend-yaaarslv.vercel.app/news');
    const data = await response.json();
    const newsList = document.getElementById('news-list');

    if (data.news) {
        data.news.forEach((news_) => {
            const newsDiv = document.createElement('div');
            newsDiv.className = 'news_';

            const subjectDiv = document.createElement('div');
            subjectDiv.innerHTML = `<b class="news_subject">${news_.subject}</b>`;

            const textDiv = document.createElement('div');
            textDiv.className = 'news-text';
            textDiv.textContent = news_.text;

            const dateDiv = document.createElement('div');
            dateDiv.innerHTML = `<b class="news_date">${news_.date}</b>`;

            newsDiv.appendChild(subjectDiv);
            newsDiv.appendChild(textDiv);
            newsDiv.appendChild(dateDiv);

            newsList.appendChild(newsDiv);
        });
    }
}

window.addEventListener('DOMContentLoaded', fetchAndDisplayNews);
