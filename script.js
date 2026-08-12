const typingTarget = document.querySelector(".typing-line");
const fullText = "hi, i’m sahra.";
const nameStart = fullText.indexOf("sahra");

let characterIndex = 0;

function typeOnce() {
  if (!typingTarget) return;

  const currentText = fullText.slice(0, characterIndex);
  const introduction = currentText.slice(0, nameStart);
  const name = currentText.slice(nameStart);

  typingTarget.innerHTML = `
    <span class="dark-text">${introduction}</span><span class="pink-text">${name}</span><span class="cursor" aria-hidden="true"></span>
  `;

  if (characterIndex < fullText.length) {
    characterIndex += 1;
    window.setTimeout(typeOnce, 85);
  }
}

const buildButton = document.querySelector(".build-toggle");
const buildLog = document.querySelector(".build-log");

if (buildButton && buildLog) {
  buildButton.addEventListener("click", () => {
    const isOpen = buildLog.classList.toggle("open");

    buildButton.textContent = isOpen
      ? "close build details"
      : "view build details";

    buildButton.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll("[data-gallery-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const galleryId = button.dataset.galleryToggle;
    const gallery = document.getElementById(galleryId);

    if (!gallery) return;

    const isOpen = gallery.classList.toggle("open");

    const galleryName =
      galleryId === "ctf-gallery"
        ? "ctf"
        : "event";

    button.textContent = isOpen
      ? "close photos"
      : `view ${galleryName} photos`;

    button.setAttribute("aria-expanded", String(isOpen));
  });
});

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = Array.from(
    carousel.querySelectorAll(".carousel-slide")
  );

  const previousButton = carousel.querySelector(".carousel-prev");
  const nextButton = carousel.querySelector(".carousel-next");
  const dotsContainer = carousel.querySelector(".carousel-dots");
  const counter = carousel.querySelector(".carousel-counter");

  let currentIndex = 0;
  let touchStartX = 0;

  if (!slides.length) return;

  function updateCarousel() {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentIndex);
    });

    carousel.querySelectorAll(".carousel-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    if (counter) {
      counter.textContent = `${currentIndex + 1} / ${slides.length}`;
    }
  }

  function showPrevious() {
    currentIndex =
      (currentIndex - 1 + slides.length) % slides.length;

    updateCarousel();
  }

  function showNext() {
    currentIndex =
      (currentIndex + 1) % slides.length;

    updateCarousel();
  }

  slides.forEach((_, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Go to photo ${index + 1}`);

    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });

    if (dotsContainer) {
      dotsContainer.appendChild(dot);
    }
  });

  if (previousButton) {
    previousButton.addEventListener("click", showPrevious);
  }

  if (nextButton) {
    nextButton.addEventListener("click", showNext);
  }

  carousel.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].screenX;
    },
    { passive: true }
  );

  carousel.addEventListener(
    "touchend",
    (event) => {
      const touchEndX = event.changedTouches[0].screenX;
      const difference = touchStartX - touchEndX;

      if (Math.abs(difference) < 45) return;

      if (difference > 0) {
        showNext();
      } else {
        showPrevious();
      }
    },
    { passive: true }
  );

  updateCarousel();
});

window.addEventListener("load", typeOnce);