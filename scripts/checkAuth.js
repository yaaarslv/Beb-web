document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('token');
    if (token) {
        const authButton = document.querySelector('.auth-button');
        authButton.textContent = 'Личный кабинет';

        const authForm = document.querySelector('.auth-form');
        authForm.action = 'profile.html'
    } else {
        if (window.location.href.includes('profile.html')) {
            window.location.href = 'auth.html';
        }
    }
});