const target = document.querySelector(".typing-line");

const phrases = [
  "Hi, I'm Sahra Ali.",
  "I’m learning cybersecurity.",
  "I build software systems.",
  "I explore data science.",
  "I want to make change with tech."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!target) return;

  const currentPhrase = phrases[phraseIndex];
  const currentText = currentPhrase.slice(0, charIndex);

  target.innerHTML = `
    <span class="terminal-prompt">></span>
    <span class="typed-text">${currentText}</span>
    <span class="terminal-cursor">_</span>
  `;

  if (!isDeleting && charIndex < currentPhrase.length) {
    charIndex++;
    setTimeout(typeLoop, 90);

  } else if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(typeLoop, 1400);

  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeLoop, 45);

  } else {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeLoop, 300);
  }
}

window.addEventListener("load", typeLoop);