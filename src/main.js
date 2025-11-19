import "./style.css";

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

// ---- Animations GSAP ----
gsap.to(title, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" });
gsap.to(fakeButton, { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out" });
gsap.to(dragBall, { opacity: 1, scale: 1, duration: 1, delay: 0.8, ease: "power2.out" });

// ---- Hover sur le faux bouton ----
fakeButton.addEventListener("mouseenter", () => {
  gsap.to(fakeButton, { scale: 1.03, duration: 0.2 });
});
fakeButton.addEventListener("mouseleave", () => {
  gsap.to(fakeButton, { scale: 1, duration: 0.2 });
});

// ---- Clic sur le bouton + compteur ----
let clickCount = 0;
fakeButton.addEventListener("click", () => {
  clickCount++;

  fakeButton.classList.add("active");
  gsap.fromTo(fakeButton, { scale: 1 }, { scale: 1.2, duration: 0.2 });
  fakeButton.textContent = "tu as trouvé le bouton.";

  if (clickCount === 2) {
    startHackerEffect();
  }
});

// ---- Inversion fond selon position du cercle ----
function updateBackground() {
  const rect = dragBall.getBoundingClientRect();
  const centerY = rect.top + rect.height / 2;
  const middle = window.innerHeight / 2;

  if (centerY < middle) {
    // Cercle dans la partie haute → mode clair
    gsap.to(document.body, { backgroundColor: "#f7f7f7", duration: 0.2 });
    gsap.to([title, fakeButton], { color: "#111", duration: 0.2 });
    gsap.to(dragBall, {
      backgroundColor: "#111",
      boxShadow: "0 0 30px rgba(0,0,0,0.3)",
      duration: 0.2,
    });
  } else {
    // Cercle dans la partie basse → mode sombre
    gsap.to(document.body, { backgroundColor: "#111", duration: 0.2 });
    gsap.to([title, fakeButton], { color: "#f7f7f7", duration: 0.2 });
    gsap.to(dragBall, {
      backgroundColor: "#f7f7f7",
      boxShadow: "0 0 30px rgba(255,255,255,0.5)",
      duration: 0.2,
    });
  }
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

    // position aléatoire
    span.style.left = Math.random() * window.innerWidth + "px";
    span.style.top = Math.random() * window.innerHeight + "px";
    span.style.fontSize = Math.random() * 20 + 10 + "px";

    document.body.appendChild(span);

    // animation : défilement + disparition
    gsap.to(span, {
      y: "+=" + (Math.random() * 60 + 20),
      opacity: 0,
      duration: Math.random() * 2 + 1,
      ease: "power1.out",
      onComplete: () => span.remove(),
    });
  }, 50);
}
