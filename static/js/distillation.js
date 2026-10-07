document.addEventListener('DOMContentLoaded', () => {
  const panel = document.getElementById('policy-performance-panel');
  const videos = [...document.querySelectorAll('.distillation-video')];
  const leader = videos[0];
  let wanted = true;
  let active = false;
  let generation = 0;

  function pause() {
    generation += 1;
    active = false;
    videos.forEach(video => video.pause());
  }

  function ready(video) {
    if (video.readyState >= 3) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const cleanup = () => {
        video.removeEventListener('canplay', loaded);
        video.removeEventListener('error', failed);
      };
      const loaded = () => { cleanup(); resolve(); };
      const failed = () => { cleanup(); reject(new Error('Unable to load comparison video')); };
      video.addEventListener('canplay', loaded);
      video.addEventListener('error', failed);
      video.load();
    });
  }

  async function start() {
    pause();
    const current = generation;
    try {
      await Promise.all(videos.map(ready));
      if (generation !== current || panel.hidden || !wanted) return;
      videos.forEach(video => { video.currentTime = 0; });
      await Promise.all(videos.map(video => video.play()));
      if (generation !== current || panel.hidden || !wanted) {
        videos.forEach(video => video.pause());
        return;
      }
      active = true;
    } catch {
      if (generation === current) pause();
    }
  }

  // One shared loop boundary and timeline keep both sides of every pair aligned.
  leader.addEventListener('ended', () => {
    if (wanted && !panel.hidden) start();
  });
  setInterval(() => {
    if (!active || panel.hidden || leader.paused || leader.seeking) return;
    videos.slice(1).forEach(video => {
      if (Math.abs(video.currentTime - leader.currentTime) > 0.07) {
        video.currentTime = leader.currentTime;
      }
    });
  }, 100);

  document.getElementById('replay-distillation').addEventListener('click', () => {
    wanted = true;
    start();
  });
  document.getElementById('pause-distillation').addEventListener('click', () => {
    wanted = false;
    pause();
  });
  document.addEventListener('performance-tab-change', () => {
    if (panel.hidden) pause();
    else if (wanted) start();
  });
});
