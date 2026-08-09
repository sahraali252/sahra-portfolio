const target = document.querySelector(".typing-line");

const fullText = "hi i’m sahra";
const beforeName = "hi i’m";

let index = 0;
let isDeleting = false;

function renderText(current) {
  if (!target) return;

  if (current.length <= beforeName.length) {
    target.innerHTML = `
      <span class="dark-text">${current}</span>
      <span class="cursor">♡</span>
    `;
  } else {
    const first = current.slice(
      0,
      beforeName.length
    );

    const second = current.slice(
      beforeName.length
    );

    target.innerHTML = `
      <span class="dark-text">${first}</span>
      <span class="pink-text">${second}</span>
      <span class="cursor">♡</span>
    `;
  }
}

function typeLoop() {
  if (!target) return;

  const current = fullText.slice(
    0,
    index
  );

  renderText(current);

  if (
    !isDeleting &&
    index < fullText.length
  ) {
    index++;

    setTimeout(
      typeLoop,
      120
    );
  } else if (
    !isDeleting &&
    index === fullText.length
  ) {
    isDeleting = true;

    setTimeout(
      typeLoop,
      1200
    );
  } else if (
    isDeleting &&
    index > 0
  ) {
    index--;

    setTimeout(
      typeLoop,
      70
    );
  } else {
    isDeleting = false;

    setTimeout(
      typeLoop,
      400
    );
  }
}

const buildButton =
  document.querySelector(
    ".build-toggle"
  );

const buildLog =
  document.querySelector(
    ".build-log"
  );

if (
  buildButton &&
  buildLog
) {
  buildButton.addEventListener(
    "click",
    () => {
      const isOpen =
        buildLog.classList.toggle(
          "open"
        );

      buildButton.textContent =
        isOpen
          ? "close build log ♡"
          : "view build log ✦";

      buildButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      if (isOpen) {
        setTimeout(
          () => {
            buildLog.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          },
          100
        );
      }
    }
  );
}

const galleryButtons =
  document.querySelectorAll(
    "[data-gallery-toggle]"
  );

galleryButtons.forEach(
  (button) => {
    button.addEventListener(
      "click",
      () => {
        const galleryId =
          button.dataset.galleryToggle;

        const gallery =
          document.getElementById(
            galleryId
          );

        if (!gallery) return;

        const isOpen =
          gallery.classList.toggle(
            "open"
          );

        button.textContent =
          isOpen
            ? "close photos ♡"
            : galleryId === "ctf-gallery"
              ? "view ctf photos ✦"
              : "view event photos ✦";

        button.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

        if (isOpen) {
          setTimeout(
            () => {
              gallery.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
              });
            },
            100
          );
        }
      }
    );
  }
);

const carousels =
  document.querySelectorAll(
    "[data-carousel]"
  );

carousels.forEach(
  (carousel) => {
    const slides =
      Array.from(
        carousel.querySelectorAll(
          ".carousel-slide"
        )
      );

    const previousButton =
      carousel.querySelector(
        ".carousel-prev"
      );

    const nextButton =
      carousel.querySelector(
        ".carousel-next"
      );

    const dotsContainer =
      carousel.querySelector(
        ".carousel-dots"
      );

    const counter =
      carousel.querySelector(
        ".carousel-counter"
      );

    let currentIndex = 0;

    if (!slides.length) return;

    slides.forEach(
      (_, slideIndex) => {
        const dot =
          document.createElement(
            "button"
          );

        dot.type = "button";

        dot.className =
          "carousel-dot";

        dot.setAttribute(
          "aria-label",
          `go to photo ${slideIndex + 1}`
        );

        dot.addEventListener(
          "click",
          () => {
            currentIndex =
              slideIndex;

            updateCarousel();
          }
        );

        if (dotsContainer) {
          dotsContainer.appendChild(
            dot
          );
        }
      }
    );

    function updateCarousel() {
      slides.forEach(
        (slide, slideIndex) => {
          slide.classList.toggle(
            "active",
            slideIndex === currentIndex
          );
        }
      );

      const dots =
        carousel.querySelectorAll(
          ".carousel-dot"
        );

      dots.forEach(
        (dot, dotIndex) => {
          dot.classList.toggle(
            "active",
            dotIndex === currentIndex
          );
        }
      );

      if (counter) {
        counter.textContent =
          `${currentIndex + 1} / ${slides.length}`;
      }
    }

    if (previousButton) {
      previousButton.addEventListener(
        "click",
        () => {
          currentIndex =
            (
              currentIndex -
              1 +
              slides.length
            ) %
            slides.length;

          updateCarousel();
        }
      );
    }

    if (nextButton) {
      nextButton.addEventListener(
        "click",
        () => {
          currentIndex =
            (
              currentIndex +
              1
            ) %
            slides.length;

          updateCarousel();
        }
      );
    }

    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener(
      "touchstart",
      (event) => {
        touchStartX =
          event.changedTouches[0].screenX;
      },
      {
        passive: true
      }
    );

    carousel.addEventListener(
      "touchend",
      (event) => {
        touchEndX =
          event.changedTouches[0].screenX;

        const difference =
          touchStartX -
          touchEndX;

        if (
          Math.abs(difference) <
          45
        ) {
          return;
        }

        if (difference > 0) {
          currentIndex =
            (
              currentIndex +
              1
            ) %
            slides.length;
        } else {
          currentIndex =
            (
              currentIndex -
              1 +
              slides.length
            ) %
            slides.length;
        }

        updateCarousel();
      },
      {
        passive: true
      }
    );

    updateCarousel();
  }
);

window.addEventListener(
  "load",
  typeLoop
);