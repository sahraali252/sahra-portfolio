document.documentElement.classList.add("js");

const typingTarget = document.querySelector(".typing-line");
const fullText = "hi, i’m sahra.";
const nameStart = fullText.indexOf("sahra");
let characterIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!typingTarget) return;
  const currentText = fullText.slice(0, characterIndex);
  typingTarget.innerHTML = `<span class="dark-text">${currentText.slice(0, nameStart)}</span><span class="pink-text">${currentText.slice(nameStart)}</span><span class="cursor" aria-hidden="true"></span>`;

  if (!isDeleting && characterIndex < fullText.length) {
    characterIndex += 1;
    window.setTimeout(typeLoop, 90);
  } else if (!isDeleting && characterIndex === fullText.length) {
    isDeleting = true;
    window.setTimeout(typeLoop, 1800);
  } else if (isDeleting && characterIndex > 0) {
    characterIndex -= 1;
    window.setTimeout(typeLoop, 50);
  } else {
    isDeleting = false;
    window.setTimeout(typeLoop, 450);
  }
}

const buildButton = document.querySelector(".build-toggle");
const buildLog = document.querySelector(".build-log");

if (buildButton && buildLog) {
  buildButton.addEventListener("click", () => {
    const isOpen = buildLog.classList.toggle("open");
    buildButton.textContent = isOpen ? "close build details" : "view build details";
    buildButton.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll("[data-gallery-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const gallery = document.getElementById(button.dataset.galleryToggle);
    if (!gallery) return;
    const isOpen = gallery.classList.toggle("open");
    const name = button.dataset.galleryToggle === "ctf-gallery" ? "ctf" : "event";
    button.textContent = isOpen ? "close photos" : `view ${name} photos`;
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = [...carousel.querySelectorAll(".carousel-slide")];
  const dotsContainer = carousel.querySelector(".carousel-dots");
  const counter = carousel.querySelector(".carousel-counter");
  let currentIndex = 0;
  let touchStartX = 0;
  if (!slides.length) return;

  function updateCarousel() {
    slides.forEach((slide, index) => slide.classList.toggle("active", index === currentIndex));
    carousel.querySelectorAll(".carousel-dot").forEach((dot, index) => dot.classList.toggle("active", index === currentIndex));
    if (counter) counter.textContent = `${currentIndex + 1} / ${slides.length}`;
  }

  function showPrevious() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % slides.length;
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
    dotsContainer?.appendChild(dot);
  });

  carousel.querySelector(".carousel-prev")?.addEventListener("click", showPrevious);
  carousel.querySelector(".carousel-next")?.addEventListener("click", showNext);
  carousel.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });
  carousel.addEventListener("touchend", (event) => {
    const difference = touchStartX - event.changedTouches[0].screenX;
    if (Math.abs(difference) >= 45) difference > 0 ? showNext() : showPrevious();
  }, { passive: true });

  updateCarousel();
});

const scrollProgressBar = document.querySelector(".scroll-progress-bar");

function updateScrollProgress() {
  if (!scrollProgressBar) return;

  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = scrollableHeight > 0
    ? (window.scrollY / scrollableHeight) * 100
    : 0;

  scrollProgressBar.style.width = `${Math.min(progress, 100)}%`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
window.addEventListener("load", () => {
  typeLoop();
  updateScrollProgress();
});

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealTargets = document.querySelectorAll(
  ".section-title-row, .card > p, .project-card, .activity-card, .love-grid, .contact-list"
);

revealTargets.forEach((element) => element.classList.add("scroll-reveal"));

if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

  revealTargets.forEach((element) => revealObserver.observe(element));
}

const navigationLinks = [...document.querySelectorAll(".topbar nav a[href^='#']")];
const linkedSections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;

    navigationLinks.forEach((link) => {
      const isCurrent = link.getAttribute("href") === `#${visible.target.id}`;
      link.classList.toggle("is-current", isCurrent);
      if (isCurrent) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-22% 0px -58%", threshold: [0, 0.15, 0.4] });

  linkedSections.forEach((section) => sectionObserver.observe(section));
}
