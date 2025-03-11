document.addEventListener('DOMContentLoaded', function() {
    // Image Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let isAnimating = false;

    // Function to update dots
    function updateDots(index) {
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        dots[index].classList.add('active');
    }

    // Function to show a specific slide with smooth transition
    function showSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        // Update current slide index
        currentSlide = index;

        // Update dots
        updateDots(currentSlide);

        // Hide all slides except current
        slides.forEach(slide => {
            if (slide.classList.contains('active')) {
                setTimeout(() => {
                    slide.classList.remove('active');
                }, 50); // Small delay to ensure smooth transition
            }
        });

        // Show the new slide
        setTimeout(() => {
            slides[index].classList.add('active');
            setTimeout(() => {
                isAnimating = false;
            }, 900); // Release lock just before transition ends
        }, 100);
    }

    // Function to show the next slide
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }

    // Function to show the previous slide
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        showSlide(prevIndex);
    }

    // Event listeners for the next and previous buttons
    nextBtn.addEventListener('click', function() {
        clearInterval(slideInterval); // Stop auto-sliding when manually navigating
        nextSlide();
        // Restart auto-sliding after manual navigation
        slideInterval = setInterval(nextSlide, 4000);
    });

    prevBtn.addEventListener('click', function() {
        clearInterval(slideInterval); // Stop auto-sliding when manually navigating
        prevSlide();
        // Restart auto-sliding after manual navigation
        slideInterval = setInterval(nextSlide, 4000);
    });

    // Event listeners for dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-index'));
            clearInterval(slideInterval);
            showSlide(slideIndex);
            slideInterval = setInterval(nextSlide, 4000);
        });
    });

    // Auto-slide functionality - start after a short delay
    let slideInterval;

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
    }

    // Start auto-sliding after a short delay
    setTimeout(startAutoSlide, 1000);

    // Pause auto-slide on hover/touch
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        clearInterval(slideInterval); // Clear any existing interval
        slideInterval = setInterval(nextSlide, 4000);
    });

    // Add touch swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval);
    }, {passive: true});

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        slideInterval = setInterval(nextSlide, 4000);
    }, {passive: true});

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance required for a swipe
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - show next slide
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - show previous slide
            prevSlide();
        }
    }
    
    // Login Button Functionality
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.addEventListener('click', function() {
        alert('Login functionality would be implemented here!');
        // You can redirect to a login page or show a login modal
        // window.location.href = 'login.html';
    });
    
    // Navigation Buttons Hover Effect
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 4px 8px rgba(187, 134, 252, 0.3)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
});