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
    const first = current.slice(0, beforeName.length);
    const second = current.slice(beforeName.length);

    target.innerHTML = `
      <span class="dark-text">${first}</span>
      <span class="pink-text">${second}</span>
      <span class="cursor">♡</span>
    `;
  }
}

function typeLoop() {
  if (!target) return;

  const current = fullText.slice(0, index);
  renderText(current);

  if (!isDeleting && index < fullText.length) {
    index++;
    setTimeout(typeLoop, 120);
  } else if (!isDeleting && index === fullText.length) {
    isDeleting = true;
    setTimeout(typeLoop, 1200);
  } else if (isDeleting && index > 0) {
    index--;
    setTimeout(typeLoop, 70);
  } else {
    isDeleting = false;
    setTimeout(typeLoop, 400);
  }
}

/* 4-bit computer build log */

const buildButton = document.querySelector(".build-toggle");
const buildLog = document.querySelector(".build-log");

if (buildButton && buildLog) {
  buildButton.addEventListener("click", () => {
    const isOpen = buildLog.classList.toggle("open");

    buildButton.textContent = isOpen
      ? "close build log ♡"
      : "view build log ✦";

    buildButton.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      setTimeout(() => {
        buildLog.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 100);
    }
  });
}

window.addEventListener("load", typeLoop);