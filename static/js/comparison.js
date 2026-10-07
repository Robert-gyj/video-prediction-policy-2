document.addEventListener('DOMContentLoaded', () => {
  const groups = [
    ['comparisons', '.comparison-video'],
    ['open-environment', '[data-example^="fig6-"] .open-environment-video'],
    ['robot-arm', '[data-example^="fig7-"] .open-environment-video'],
  ];
  groups.forEach(([id, selector]) => {
    const videos = [...document.querySelectorAll(selector)];
    document.getElementById(`replay-${id}`).addEventListener('click', () => {
      videos.forEach(video => { video.currentTime = 0; video.play().catch(() => {}); });
    });
    document.getElementById(`pause-${id}`).addEventListener('click', () => {
      videos.forEach(video => video.pause());
    });
  });
});
