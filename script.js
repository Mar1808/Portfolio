const nav = document.querySelector(".nav");
const navMenu = document.querySelector(".nav-items");
const workEls = document.querySelectorAll(".work-box");
const workImgs = document.querySelectorAll(".work-img");
const mainEl = document.querySelector("main");
const yearEl = document.querySelector(".footer-text span");

// Animation des éléments work-box au scroll
workImgs.forEach((workImg) => workImg.classList.add("transform"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const [textbox, picture] = Array.from(entry.target.children);

      if (entry.isIntersecting) {
        picture.classList.remove("transform");
        Array.from(textbox.children).forEach(
          (el) => (el.style.animationPlayState = "running")
        );
      } else {
        picture.classList.add("transform");
        Array.from(textbox.children).forEach(
          (el) => (el.style.animationPlayState = "paused")
        );
      }
    });
  },
  { threshold: 0.3 }
);

workEls.forEach((workEl) => {
  observer.observe(workEl);
});

// Empêche de sortir du menu avec Tab
const lastFocusedEl = document.querySelector('a[data-focused="last-focused"]');

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && document.activeElement === lastFocusedEl) {
    e.preventDefault();
    // Plus besoin de référencer btnToggleNav
  }
});

// Animation de rotation des logos
const logosWrappers = document.querySelectorAll(".logo-group");

const sleep = (number) => new Promise((res) => setTimeout(res, number));

logosWrappers.forEach(async (logoWrapper, i) => {
  const logos = Array.from(logoWrapper.children);
  await sleep(1400 * i);
  setInterval(() => {
    let temp = logos[0];
    logos[0] = logos[1];
    logos[1] = logos[2];
    logos[2] = temp;
    logos[0].classList.add("hide", "to-top");
    logos[1].classList.remove("hide", "to-top", "to-bottom");
    logos[2].classList.add("hide", "to-bottom");
  }, 1400 * 4);
});

yearEl.textContent = new Date().getFullYear();
