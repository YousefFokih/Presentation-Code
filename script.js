const BASE_IMAGES_DIR = "./Images/";
const EXTENSIONS = ["jpg", "png", "jpeg", "webp"];

const slides = Array.from(document.querySelectorAll(".slide"));
const slideNumEl = document.getElementById("slideNum");
const slideTotalEl = document.getElementById("slideTotal");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const bgImg1 = document.getElementById("bgImg1");
const bgImg2 = document.getElementById("bgImg2");

slideTotalEl.textContent = slides.length;

let currentSlide = 0;
let currentStep = 0;

function loadImageWithFallback(indexNum, onSuccess, onFail) {
  let extIdx = 0;

  function tryNext() {
    if (extIdx >= EXTENSIONS.length) {
      if (onFail) onFail();
      return;
    }
    const url = `${BASE_IMAGES_DIR}${indexNum}.${EXTENSIONS[extIdx]}`;
    const tester = new Image();
    tester.onload = () => onSuccess(url);
    tester.onerror = () => {
      extIdx += 1;
      tryNext();
    };
    tester.src = url;
  }

  tryNext();
}

function hydrateSlideImages(slide) {
  const i1 = slide.dataset.img1;
  const i2 = slide.dataset.img2;

  if (i1) {
    loadImageWithFallback(i1, (url) => {
      bgImg1.style.backgroundImage = `url("${url}")`;
    });
  }

  if (i2) {
    loadImageWithFallback(i2, (url) => {
      bgImg2.style.backgroundImage = `url("${url}")`;
    });
  }

  const imgs = slide.querySelectorAll("img[data-img]");
  imgs.forEach((imgEl) => {
    const num = imgEl.dataset.img;
    loadImageWithFallback(
      num,
      (url) => {
        imgEl.src = url;
        imgEl.style.display = "";
      },
      () => {
        imgEl.style.display = "none";
      }
    );
  });
}

function getStepsForSlide(slide) {
  const reveals = Array.from(slide.querySelectorAll(".reveal"));
  const stepNums = [...new Set(reveals.map((el) => Number(el.dataset.step || 1)))].sort(
    (a, b) => a - b
  );
  return { reveals, stepNums };
}

function renderSlideState() {
  slides.forEach((s, idx) => {
    s.classList.toggle("active", idx === currentSlide);
  });

  const activeSlide = slides[currentSlide];
  hydrateSlideImages(activeSlide);

  const { reveals, stepNums } = getStepsForSlide(activeSlide);

  reveals.forEach((el) => {
    const stepVal = Number(el.dataset.step || 1);
    el.classList.toggle("shown", stepVal <= currentStep);
  });

  slideNumEl.textContent = currentSlide + 1;
}

function stepForward() {
  const activeSlide = slides[currentSlide];
  const { stepNums } = getStepsForSlide(activeSlide);
  const maxStep = stepNums.length ? Math.max(...stepNums) : 0;

  if (currentStep < maxStep) {
    currentStep += 1;
    renderSlideState();
  } else if (currentSlide < slides.length - 1) {
    currentSlide += 1;
    currentStep = 1;
    renderSlideState();
  }
}

function stepBackward() {
  if (currentStep > 1) {
    currentStep -= 1;
    renderSlideState();
  } else if (currentSlide > 0) {
    currentSlide -= 1;
    const { stepNums } = getStepsForSlide(slides[currentSlide]);
    currentStep = stepNums.length ? Math.max(...stepNums) : 0;
    renderSlideState();
  }
}

document.addEventListener("click", (e) => {
  if (e.target.closest("button")) return;
  stepForward();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
    e.preventDefault();
    stepForward();
  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault();
    stepBackward();
  }
});

nextBtn.addEventListener("click", stepForward);
prevBtn.addEventListener("click", stepBackward);

currentStep = 1;
renderSlideState();