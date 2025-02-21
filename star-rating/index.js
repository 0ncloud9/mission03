export default function StarRating($container) {
    // #4. star 요소의 갯수를 지정
    const maxRating = Number($container.dataset.maxRating) || 5;
    let currentRating = 0;

    $container.innerHTML = '';

    // #1. star-rating 요소를 동적 생성
    const stars = Array.from({ length: maxRating }, (_, i) => {
        const star = document.createElement('span');
        // #10. star 요소는 'boxicons' 를 사용해 구현
        star.innerHTML = "<i class='bx bxs-star'></i>";
        star.dataset.rating = i + 1;
        star.style.cursor = 'pointer';
        star.style.fontSize = '3rem';
        star.style.color = '#dcdcdc';

        // #5. star 요소에 마우스가 올라오면 해당 star 요소와 이전 star 요소 모두 color를 변경
        star.addEventListener('mouseover', () => {
            highlightStars(i + 1);
        });

        // #7. 특정 star 요소를 클릭하면 해당 star 요소와 이전 star 요소 모두 color를 변경
        star.addEventListener('click', () => {
            currentRating = i + 1;
            updateStars();

            // #8. 클릭 시 커스텀 이벤트를 통해 이를 캐치 후 화면에 표시
            $container.dispatchEvent(new CustomEvent('rating-change', { detail: currentRating }));
        });

        // #6. star-rating 요소에서 마우스가 벗어나면 모든 star 요소의 color를 변경
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
