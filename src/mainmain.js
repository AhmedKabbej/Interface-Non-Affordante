// import "./style.css";
// import { attachMusicToButton } from "./musique.js";

// // ---- Création de l'interface ----
// const app = document.querySelector("#app");

// const container = document.createElement("div");
// container.className = "container";

// const title = document.createElement("h1");
// title.textContent = "Interface Non-Affordante";

// const fakeButton = document.createElement("p");
// fakeButton.textContent = "peut-être qu'il se passe quelque chose ici...";
// fakeButton.className = "hidden-button";


// const vinyle = document.getElementById("vinyle");

// container.appendChild(title);
// container.appendChild(fakeButton);
// app.appendChild(container);

// let istransitioning = false;
// let changeside = false;

// // ---- Attacher la musique au bouton ----
// attachMusicToButton(fakeButton);

// // ---- Cercle draggable ----
// const dragBall = document.createElement("div");
// dragBall.className = "draggable";
// document.body.appendChild(dragBall);

// // ---- Animations GSAP ----
// gsap.to(title, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" });
// gsap.to(fakeButton, { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out" });
// gsap.to(dragBall, { opacity: 1, scale: 1, duration: 1, delay: 0.8, ease: "power2.out" });

// // ---- Hover sur le faux bouton ----
// fakeButton.addEventListener("mouseenter", () => {
//   gsap.to(fakeButton, { scale: 1.03, duration: 0.2 });
// });
// fakeButton.addEventListener("mouseleave", () => {
//   gsap.to(fakeButton, { scale: 1, duration: 0.2 });
// });

// // ---- Clic sur le bouton + compteur ----
// let clickCount = 0;
// fakeButton.addEventListener("click", () => {
//   clickCount++;

//   fakeButton.classList.add("active");
//   gsap.fromTo(fakeButton, { scale: 1 }, { scale: 1.2, duration: 0.2 });
//   fakeButton.textContent = "appuyer sur le bouton";

//   if (clickCount === 2) {
//     startHackerEffect();
//   }
// });

// // ---- Inversion fond selon position du cercle ----
// let firstRun = true;

// function updateBackground() {
//   const rect = vinyle.getBoundingClientRect();
//   const centerY = rect.top + rect.height / 2;
//   const middle = window.innerHeight / 2;

//   let bgColor, textColor, ballColor, shadow;

//   if (centerY < middle) {
//     // Partie haute → fond clair
//     bgColor = "#f7f7f7";
//     textColor = firstRun ? "#111" : "#111"; // premier run : noir
//     ballColor = "#111";
//     shadow = "0 0 30px rgba(0,0,0,0.3)";

//     if (istransitioning === false) {
//       morphtovinyle();
//     }
//     console.log(istransitioning); 
//   } else {
//     // Partie basse → fond sombre
//     bgColor = "#111";
//     textColor = firstRun ? "#111" : "#f7f7f7"; // premier run : noir
//     ballColor = "#f7f7f7";
//     shadow = "0 0 30px rgba(255,255,255,0.5)";
//     if (istransitioning === false) {
//       morphtocircle();
//     }
//   }

//   gsap.to(document.body, { backgroundColor: bgColor, duration: 0.2 });
//   gsap.to([title, fakeButton], { color: textColor, duration: 0.2 });
//   gsap.to(dragBall, { backgroundColor: ballColor, boxShadow: shadow, duration: 0.2 });

//   firstRun = false; // après la première mise à jour, on passe en mode contraste automatique
// }

// // ---- Draggable ----
// Draggable.create(vinyle, {
//   type: "x,y",
//   inertia: true,
//   edgeResistance: 0.65,
//   onDrag: updateBackground,
//   onThrowUpdate: updateBackground,
// });

// // ---- Initialisation ----
// updateBackground();

// // ---------------------------------------------------------------------------
// //                EFFET "HACKER" QUI APPARAÎT AU 2ᵉ CLIC
// // ---------------------------------------------------------------------------

// function startHackerEffect() {
//   setInterval(() => {
//     const num = Math.floor(Math.random() * 10);

//     const span = document.createElement("span");
//     span.textContent = num;
//     span.style.position = "absolute";
//     span.style.fontFamily = "monospace";
//     span.style.color = "#394ED1";
//     span.style.opacity = 0.8;

//     // position aléatoire
//     span.style.left = Math.random() * window.innerWidth + "px";
//     span.style.top = Math.random() * window.innerHeight + "px";
//     span.style.fontSize = Math.random() * 20 + 10 + "px";

//     document.body.appendChild(span);

//     // animation : défilement + disparition
//     gsap.to(span, {
//       y: "+=" + (Math.random() * 60 + 20),
//       opacity: 0,
//       duration: Math.random() * 2 + 1,
//       ease: "power1.out",
//       onComplete: () => span.remove(),
//     });
//   }, 50);
// }


// //part svg

// // Cercles cibles (formes simples)
// const simpleOuterCircle = "M 225.68,112.847 C 225.68,175.171 175.165,225.686 112.836,225.686 C 50.522,225.687 0,175.171 0,112.847 C 0,50.525 50.522,0 112.836,0 C 175.165,0 225.68,50.525 225.68,112.847 z";
// const simpleInnerCircle = "M 151.792,112.847 C 151.792,134.358 134.353,151.805 112.836,151.805 C 91.321,151.805 73.881,134.359 73.881,112.847 C 73.881,91.33 91.321,73.891 112.836,73.891 C 134.353,73.891 151.792,91.331 151.792,112.847 z";

// // Sauvegarder les paths originaux
// const decorativePaths = document.querySelectorAll('.decorative');
// const originalPaths = Array.from(decorativePaths).map(path => path.getAttribute('d'));

// function morphtovinyle() {
  
//   istransitioning = true;
//     const tl = gsap.timeline({onComplete: () => {istransitioning = false}});
    
    
//     // Faire disparaître progressivement les éléments décoratifs
//     tl.to('.decorative', {
//         opacity: 0,
//         duration: 0.8,
//         stagger: 0.02,
//         ease: "power2.inOut"
//     });
    
//     // Optionnel: animer légèrement les cercles pour un effet plus fluide
//     tl.to('#outerCircle', {
//         scale: 1.05,
//         duration: 0.3,
//         transformOrigin: "center",
//         ease: "power2.out"
//     }, "-=0.4")
//     .to('#outerCircle', {
//         scale: 1,
//         duration: 0.3,
//         ease: "power2.inOut"
//     });


//     //inner circle
//     tl.to('#innerCircle', {
//         fill: "black"
//     })
// };

// function morphtocircle() {
//   istransitioning = true;
//     const tl = gsap.timeline({onComplete: () => {istransitioning = false}});
    
//     // Réapparaître les éléments décoratifs
//     tl.to('.decorative', {
//         opacity: 1,
//         duration: 0.8,
//         stagger: 0.02,
//         ease: "power2.inOut"
//     });
//     //inner circle
//     tl.to('#innerCircle', {
//         fill: "white"
//     })
// };
