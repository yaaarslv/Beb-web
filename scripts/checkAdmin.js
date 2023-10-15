document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('token');
    if (token) {
        const role = localStorage.getItem('role');
        if (window.location.href.includes('add-news.html')) {
            if (role === "User") {
                window.location.href = '403.html';
            }
        } else if (window.location.href.includes('news.html')) {
            if (role === "Admin" || role === "Superadmin") {
                const newsForm = document.querySelector('h2');
                const newsButton = document.createElement('button');
                newsButton.className = 'add-news-button';
                newsButton.textContent = "Добавить новость";
                newsForm.appendChild(newsButton);
            }
        }
    }
});
