let slideIndex = 1;        // Tracks current slide (1-5)
let slideInterval;         // Stores the auto-slide timer reference

 // Initialize slideshow
showSlides(slideIndex);    // Show first slide immediately
autoSlide();              // Start automatic slideshow

// Auto slide function
function autoSlide() {
    slideInterval = setInterval(() => {
        slideIndex++;                    // Move to next slide
        if (slideIndex > 5) slideIndex = 1;  // Loop back to first slide
        showSlides(slideIndex);          // Display the new slide
    }, 3000); // Execute every 3 seconds
}

// Manual slide control
function currentSlide(n) {
    clearInterval(slideInterval);  // Stop auto-slide
    slideIndex = n;               // Jump to selected slide
    showSlides(slideIndex);       // Display selected slide
    autoSlide();                  // Restart auto-slide timer
}

// Show slides function
function showSlides(n) {
    const slides = document.querySelectorAll('.slide');  // Get all slide elements
    const dots = document.querySelectorAll('.dot');      // Get all dot elements
    
    // Boundary checking
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    
    // Hide all slides and deactivate all dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide and activate corresponding dot
    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');
}

// Mobile menu toggle
function onClickMenu() {
    const nav = document.getElementById("nav");
    const menu = document.getElementById("menu");
    
    nav.classList.toggle("active");
    menu.classList.toggle("active");
}

// Pause slideshow when user hovers over the header
const header = document.querySelector('.header');
// Pause on hover
header.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);  // Stop auto-slide when mouse enters
});

// Resume on mouse leave
header.addEventListener('mouseleave', () => {
    autoSlide();  // Restart auto-slide when mouse leaves
});