document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('token');
    if (token) {
        const authButton = document.querySelector('.auth-button');
        authButton.textContent = 'Личный кабинет';

        const authForm = document.querySelector('.auth-form');
        authForm.action = 'profile.html'
    } else {
        if (window.location.href.includes('reviews.html')){
            const button = document.querySelector('.add-review-button');
            button.style.backgroundColor = "#ff001e"
        } else if (window.location.href.includes('manage-users.html') ||
            window.location.href.includes('profile.html') || window.location.href.includes('subscription.html')  ||
            window.location.href.includes('add-news.html')  || window.location.href.includes('add-product.html') ||
            window.location.href.includes('manage-products.html')) {
            window.location.href = 'auth.html';
        }
    }
});