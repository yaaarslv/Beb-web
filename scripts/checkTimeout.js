let timeout;

function resetSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('role')
}

function resetTimeout() {
    clearTimeout(timeout);
    timeout = setTimeout(resetSession, 1000 * 60 * 10);
}

document.addEventListener('mousemove', resetTimeout);
document.addEventListener('keydown', resetTimeout);

resetTimeout();
