let slideIndex = 0; 
const slides = document.getElementsByClassName("carousel-image");
const dots = document.getElementsByClassName("dot");

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 8000); 
}

function currentSlide(n) {
    slideIndex = n - 1;
    showSlides();
}

for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', function () {
        currentSlide(i + 1);
    });
}

showSlides();
