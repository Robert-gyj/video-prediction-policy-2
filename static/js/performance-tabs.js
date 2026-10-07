document.addEventListener('DOMContentLoaded', () => {
  const tabs = [...document.querySelectorAll('.performance-tab')];
  const resumeVideos = new Set();
  function selectTab(nextTab) {
    tabs.forEach(tab => {
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      const selected = tab === nextTab;
      if (!selected && !panel.hidden) {
        panel.querySelectorAll('video').forEach(video => {
          if (!video.paused) resumeVideos.add(video);
          video.pause();
        });
      }
      panel.hidden = !selected;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected) {
        panel.querySelectorAll('video').forEach(video => {
          const firstPlay = video.dataset.autoplay === 'true' && !video.dataset.started;
          if (resumeVideos.delete(video) || firstPlay) {
            video.dataset.started = 'true';
            video.play().catch(() => {});
          }
        });
      }
    });
    document.dispatchEvent(new CustomEvent('performance-tab-change', { detail: { panelId: nextTab.getAttribute('aria-controls') } }));
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      selectTab(tabs[next]);
      tabs[next].focus();
    });
  });
});
