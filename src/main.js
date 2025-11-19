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

// Hover et click sur le bouton
fakeButton.addEventListener("mouseenter", () => {
  gsap.to(fakeButton, { scale: 1.03, duration: 0.2, ease: "power2.out" });
});
fakeButton.addEventListener("mouseleave", () => {
  gsap.to(fakeButton, { scale: 1, duration: 0.2 });
});
fakeButton.addEventListener("click", () => {
  fakeButton.classList.add("active");
  gsap.fromTo(fakeButton, { scale: 1 }, { scale: 1.2, duration: 0.2, ease: "power2.out" });
  fakeButton.textContent = "tu as trouvé le bouton.";
});

// ---- Draggable avec inversion de fond ----
Draggable.create(dragBall, {
  type: "x,y",
  inertia: true,
  edgeResistance: 0.65,
  onDrag: updateBackground,
  onThrowUpdate: updateBackground,
});

// Fonction pour inverser les couleurs selon la partie de la page où le cercle est
function updateBackground() {
  // Centre du cercle
  const yPos = dragBall.getBoundingClientRect().top + dragBall.offsetHeight / 2;
  const middle = window.innerHeight / 2;

  if (yPos < middle) {
    // Cercle dans la moitié haute -> fond clair, cercle sombre
    gsap.to(document.body, { backgroundColor: "#f7f7f7", duration: 0.2 });
    gsap.to(dragBall, { backgroundColor: "#111", boxShadow: "0 0 30px rgba(0,0,0,0.3)", duration: 0.2 });
    gsap.to([title, fakeButton], { color: "#111", duration: 0.2 });
  } else {
    // Cercle dans la moitié basse -> fond sombre, cercle clair
    gsap.to(document.body, { backgroundColor: "#111", duration: 0.2 });
    gsap.to(dragBall, { backgroundColor: "#f7f7f7", boxShadow: "0 0 30px rgba(255,255,255,0.5)", duration: 0.2 });
    gsap.to([title, fakeButton], { color: "#f7f7f7", duration: 0.2 });
  }
}

// Draggable avec update seulement quand le cercle dépasse le middle
Draggable.create(dragBall, {
  type: "x,y",
  inertia: true,
  edgeResistance: 0.65,
  onDrag: updateBackground,
  onThrowUpdate: updateBackground,
});

// Initialisation du background au chargement
updateBackground();
