const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;
console.log(slideWidth);

// LOOPS

// slides[0].style.left = slideWidth * 0 + "px";
// slides[1].style.left = slideWidth * 1 + "px";
// slides[2].style.left = slideWidth * 2 + "px";

// slides.forEach((slide, index) => {
//   slide.style.left = slideWidth * index + "px";
// });

for (let i = 0; i < slides.length; i++) {
  slides[i].style.left = slideWidth * i + "px";
}

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, focusDot) => {
  currentDot.classList.remove("current-slide");
  focusDot.classList.add("current-slide");
};

const hideShowArrow = (myIndex, slides, prevButton, nextButton) => {
  if (myIndex === 0) {
    prevButton.classList.add("hide-arrow");
    nextButton.classList.remove("hide-arrow");
  } else if (myIndex === slides.length - 1) {
    prevButton.classList.remove("hide-arrow");
    nextButton.classList.add("hide-arrow");
  } else {
    prevButton.classList.remove("hide-arrow");
    nextButton.classList.remove("hide-arrow");
  }
};

// when I click  left, move slides left
prevButton.addEventListener("click", () => {
  const currentSlide = track.querySelector(".current-slide");
  const previousSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === previousSlide);

  moveToSlide(track, currentSlide, previousSlide);
  updateDots(currentDot, prevDot);
  hideShowArrow(prevIndex, slides, prevButton, nextButton);
});

// when I click  right, move slides right
nextButton.addEventListener("click", () => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrow(nextIndex, slides, prevButton, nextButton);
});

// when I click the nav indicators, move that slide

dotsNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");

  //   if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrow(targetIndex, slides, prevButton, nextButton);
});
