const loadingText = document.querySelector('.loading-text');
let animationStep = 0;

function updateLoadingText() {
    if (animationStep === 0) {
        loadingText.textContent = 'Загрузка';
        animationStep = 1;
    } else if (animationStep === 1) {
        loadingText.textContent = 'Загрузка.';
        animationStep = 2;
    } else if (animationStep === 2) {
        loadingText.textContent = 'Загрузка..';
        animationStep = 3;
    } else if (animationStep === 3) {
        loadingText.textContent = 'Загрузка...';
        animationStep = 0;
    }
}

setInterval(updateLoadingText, 200);
