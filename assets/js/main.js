const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

document.addEventListener('click', async (event) => {
  const action = event.target?.dataset?.action;
  if (!action) return;

  if (action === 'play-visible') {
    const videos = [...document.querySelectorAll('.gesture-card video')];
    for (const video of videos) {
      video.muted = true;
      try { await video.play(); } catch (_) { /* Some browsers block autoplay; controls still work. */ }
    }
  }

  if (action === 'pause-all') {
    document.querySelectorAll('video').forEach((video) => video.pause());
  }

  if (action === 'copy-bibtex') {
    const text = document.querySelector('#bibtex-code')?.innerText ?? '';
    try {
      await navigator.clipboard.writeText(text);
      const old = event.target.textContent;
      event.target.textContent = 'Copied!';
      setTimeout(() => { event.target.textContent = old; }, 1200);
    } catch (_) {
      alert('Copy failed. Select the BibTeX text manually.');
    }
  }
});
