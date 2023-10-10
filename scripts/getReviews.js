async function fetchAndDisplayReviews() {
    const response = await fetch('https://petshop-backend-yaaarslv.vercel.app/reviews');
    const data = await response.json();
    const reviewsList = document.getElementById('reviews-list');

    if (data.reviews) {
        data.reviews.forEach((review) => {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'review';

            const authorDiv = document.createElement('div');
            authorDiv.innerHTML = `<b class="reviewer">${review.author}</b>`;

            const textDiv = document.createElement('div');
            textDiv.className = 'review-text';
            textDiv.textContent = review.text;

            reviewDiv.appendChild(authorDiv);
            reviewDiv.appendChild(textDiv);

            reviewsList.appendChild(reviewDiv);
        });
    }
}

window.addEventListener('DOMContentLoaded', fetchAndDisplayReviews);
