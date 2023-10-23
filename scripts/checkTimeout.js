let timeout;

function resetSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('isBanned');
    location.reload();
}

function resetTimeout() {
    clearTimeout(timeout);
    timeout = setTimeout(resetSession, 1000 * 60 * 10);
}

document.addEventListener('mousemove', resetTimeout);
document.addEventListener('keydown', resetTimeout);

resetTimeout();
