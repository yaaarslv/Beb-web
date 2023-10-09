(function() {
    var startTime = performance.now();

    window.addEventListener('load', function() {
        var endTime = performance.now();
        var loadTime = endTime - startTime;

        var loadTimeElement = document.createElement('load-time');
        loadTimeElement.innerHTML = 'Страница загружена за <span class="load-time-text">' + (loadTime / 1000).toFixed(4) + '</span> секунд';

        document.body.appendChild(loadTimeElement);
    });
})();
