import "./style.css";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

// ---- Enregistre le plugin MorphSVG ----
gsap.registerPlugin(MorphSVGPlugin, Draggable);

// ---- Création de l'interface ----
const app = document.querySelector("#app");

const container = document.createElement("div");
container.className = "container";

const title = document.createElement("h1");
title.textContent = "Interface Non-Affordante";

const fakeButton = document.createElement("p");
fakeButton.textContent = "peut-être qu'il se passe quelque chose ici...";
fakeButton.className = "hidden-button";

container.appendChild(title);
container.appendChild(fakeButton);
app.appendChild(container);

// ---- Cercle draggable ----
const dragBall = document.createElement("div");
dragBall.className = "draggable";
document.body.appendChild(dragBall);

// ---- Inline SVG pour morphing ----
let svgPath;
fetch("/src/platine.svg")
  .then(res => res.text())
  .then(svgText => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
    svgPath = svgDoc.querySelector("path");
    svgPath.id = "platine-path";
    document.body.appendChild(svgPath);
    svgPath.style.position = "absolute";
    svgPath.style.left = "-9999px"; // cache le SVG initial
  });

// ---- Animations GSAP ----
gsap.to(title, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" });
gsap.to(fakeButton, { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out" });
gsap.to(dragBall, { opacity: 1, scale: 1, duration: 1, delay: 0.8, ease: "power2.out" });

// ---- Hover sur le faux bouton ----
fakeButton.addEventListener("mouseenter", () => gsap.to(fakeButton, { scale: 1.03, duration: 0.2 }));
fakeButton.addEventListener("mouseleave", () => gsap.to(fakeButton, { scale: 1, duration: 0.2 }));

// ---- Clic sur le faux bouton + compteur ----
let clickCount = 0;
fakeButton.addEventListener("click", () => {
  clickCount++;
  fakeButton.classList.add("active");
  gsap.fromTo(fakeButton, { scale: 1 }, { scale: 1.2, duration: 0.2 });
  fakeButton.textContent = "appuyer sur le bouton";

  if (clickCount === 2) startHackerEffect();
});

// ---- Morphing du cercle au clic ----
dragBall.addEventListener("click", () => {
  if (!svgPath) return;
  const rect = dragBall.getBoundingClientRect();
  svgPath.style.left = rect.left + "px";
  svgPath.style.top = rect.top + "px";

  gsap.to(dragBall, {
    duration: 1,
    morphSVG: svgPath,
    ease: "power2.inOut",
  });
});

// ---- Inversion fond selon position du cercle ----
let firstRun = true;

function updateBackground() {
  const rect = dragBall.getBoundingClientRect();
  const centerY = rect.top + rect.height / 2;
  const middle = window.innerHeight / 2;

  let bgColor, textColor, ballColor, shadow;

  if (centerY < middle) {
    bgColor = "#f7f7f7";
    textColor = firstRun ? "#111" : "#111";
    ballColor = "#111";
    shadow = "0 0 30px rgba(0,0,0,0.3)";
  } else {
    bgColor = "#111";
    textColor = firstRun ? "#111" : "#f7f7f7";
    ballColor = "#f7f7f7";
    shadow = "0 0 30px rgba(255,255,255,0.5)";
  }

  gsap.to(document.body, { backgroundColor: bgColor, duration: 0.2 });
  gsap.to([title, fakeButton], { color: textColor, duration: 0.2 });
  gsap.to(dragBall, { backgroundColor: ballColor, boxShadow: shadow, duration: 0.2 });

  firstRun = false;
}

// ---- Draggable ----
Draggable.create(dragBall, {
  type: "x,y",
  inertia: true,
  edgeResistance: 0.65,
  onDrag: updateBackground,
  onThrowUpdate: updateBackground,
});

// ---- Initialisation ----
updateBackground();

// ---------------------------------------------------------------------------
//                EFFET "HACKER" QUI APPARAÎT AU 2ᵉ CLIC
// ---------------------------------------------------------------------------
function startHackerEffect() {
  setInterval(() => {
    const num = Math.floor(Math.random() * 10);
    const span = document.createElement("span");
    span.textContent = num;
    span.style.position = "absolute";
    span.style.fontFamily = "monospace";
    span.style.color = "#394ED1";
    span.style.opacity = 0.8;
    span.style.left = Math.random() * window.innerWidth + "px";
    span.style.top = Math.random() * window.innerHeight + "px";
    span.style.fontSize = Math.random() * 20 + 10 + "px";

    document.body.appendChild(span);

    gsap.to(span, {
      y: "+=" + (Math.random() * 60 + 20),
      opacity: 0,
      duration: Math.random() * 2 + 1,
      ease: "power1.out",
      onComplete: () => span.remove(),
    });
  }, 50);
}
