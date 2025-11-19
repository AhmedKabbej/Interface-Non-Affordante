import './style.css'; // styles pour la vidéo si nécessaire

export function attachMusicToButton(button) {
  let videoActive = false;

  button.addEventListener('click', () => {
    if (!videoActive) {
      videoActive = true;
      startMusicVideo();
    }
  });

  function startMusicVideo() {
    const video = document.createElement('video');
    video.src = '/AbeltonPush.mp4'; // ton fichier dans /public
    video.autoplay = true;
    video.loop = false;
    video.muted = false;
    video.style.position = 'fixed';
    video.style.width = '200px';
    video.style.height = '200px';
    video.style.borderRadius = '50%';
    video.style.pointerEvents = 'none';
    video.style.transform = 'translate(-50%, -50%)';
    video.style.boxShadow = '0 0 20px rgba(255,255,255,0.5)';
    document.body.appendChild(video);

    video.play();

    let timer;

    function moveVideo(e) {
      // La vidéo suit la souris
      video.style.left = e.clientX + 'px';
      video.style.top = e.clientY + 'px';

      // Reset du timer à chaque mouvement
      clearTimeout(timer);
      timer = setTimeout(() => {
        video.pause();
        video.remove();
        videoActive = false;
        window.removeEventListener('mousemove', moveVideo);
      }, 3000); // 3 secondes sans mouvement = arrêt
    }

    // Début de suivi seulement après le clic
    window.addEventListener('mousemove', moveVideo);
  }
}
