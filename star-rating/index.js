export default function StarRating($container) {
    const maxRating = Number($container.dataset.maxRating) || 5;
    let currentRating = 0;

    $container.innerHTML = '';

    const stars = Array.from({ length: maxRating }, (_, i) => {
        const star = document.createElement('span');
        star.innerHTML = "<i class='bx bxs-star'></i>";
        star.dataset.rating = i + 1;
        star.style.cursor = 'pointer';
        star.style.fontSize = '3rem';
        star.style.color = '#dcdcdc';

        star.addEventListener('mouseover', () => {
            highlightStars(i + 1);
        });

        star.addEventListener('click', () => {
            currentRating = i + 1;
            updateStars();
            $container.dispatchEvent(new CustomEvent('rating-change', { detail: currentRating }));
        });

        star.addEventListener('mouseleave', () => {
            updateStars();
        });

        return star;
    });

    stars.forEach(star => $container.appendChild(star));

    function updateStars() {
        stars.forEach((star, i) => {
            star.style.color = i < currentRating ? '#db5b33' : '#dcdcdc';
        });
    }

    function highlightStars(rating) {
        stars.forEach((star, i) => {
            star.style.color = i < rating ? '#a7a7a7' : '#dcdcdc';
        });
    }
}
