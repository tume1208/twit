// starcount.js

function rateStory(element, rating, starCountId) {
    const stars = element.parentElement.querySelectorAll('.fa-star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });

    // Ensure the star count element exists
    const starCountElement = document.getElementById(starCountId);
    if (starCountElement) {
        const currentCount = parseInt(starCountElement.querySelector('b').textContent);
        const newCount = currentCount + rating;
        starCountElement.querySelector('b').textContent = newCount;
    } else {
        console.error(`Star count element with ID ${starCountId} not found.`);
    }
}
