// logoscroll.js

let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.style.top = '-60px'; // Hide the header
    } else if (scrollTop < lastScrollTop && scrollTop > 0) {
        // Scrolling up
        header.style.top = '0'; // Show the header
    } else if (scrollTop === 0) {
        // At the top of the page
        header.style.top = '0'; // Show the header
    }

    lastScrollTop = scrollTop;
});
