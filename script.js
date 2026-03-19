const target = document.querySelector(".typing-line");

const fullText = "hi i’m sahra";
const beforeName = "hi i’m";

let index = 0;
let isDeleting = false;

function renderText(current) {
  if (current.length <= beforeName.length) {
    target.innerHTML = `<span class="dark-text">${current}</span><span class="cursor">♡</span>`;
  } else {
    const first = current.slice(0, beforeName.length);
    const second = current.slice(beforeName.length);
    target.innerHTML = `<span class="dark-text">${first}</span><span class="pink-text">${second}</span><span class="cursor">♡</span>`;
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

window.addEventListener("load", typeLoop);