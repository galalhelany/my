/* Accessible, dependency-free controls for case-study screenshot galleries. */
(() => {
  const galleries = document.querySelectorAll('[data-case-gallery]');

  galleries.forEach((gallery) => {
    if (gallery.dataset.galleryReady === 'true') return;

    const track = gallery.querySelector('[data-gallery-track]');
    const items = Array.from(gallery.querySelectorAll('[data-gallery-item]'));
    const previousButton = gallery.querySelector('[data-gallery-previous]');
    const nextButton = gallery.querySelector('[data-gallery-next]');
    const range = gallery.querySelector('[data-gallery-range]');

    if (!track || !items.length || !previousButton || !nextButton || !range) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 767px)');
    let page = 0;

    const itemsPerPage = () => (mobile.matches ? 1 : 2);
    const pageCount = () => Math.ceil(items.length / itemsPerPage());

    const updateControls = () => {
      const perPage = itemsPerPage();
      const first = page * perPage + 1;
      const last = Math.min(first + perPage - 1, items.length);

      range.textContent = first === last ? `${first}` : `${first}\u2013${last}`;
      previousButton.disabled = page === 0;
      nextButton.disabled = page >= pageCount() - 1;
    };

    const goToPage = (requestedPage, shouldMove = true) => {
      page = Math.max(0, Math.min(requestedPage, pageCount() - 1));
      const target = items[page * itemsPerPage()];

      if (shouldMove && target) {
        track.scrollTo({
          left: target.offsetLeft,
          behavior: reducedMotion.matches ? 'auto' : 'smooth',
        });
      }

      updateControls();
    };

    previousButton.addEventListener('click', () => goToPage(page - 1));
    nextButton.addEventListener('click', () => goToPage(page + 1));

    track.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToPage(page - 1);
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToPage(page + 1);
      }
    });

    let scrollFrame;
    track.addEventListener('scroll', () => {
      window.cancelAnimationFrame(scrollFrame);
      scrollFrame = window.requestAnimationFrame(() => {
        const perPage = itemsPerPage();
        const approximateItem = Math.round(track.scrollLeft / Math.max(track.clientWidth / perPage, 1));
        page = Math.min(Math.floor(approximateItem / perPage), pageCount() - 1);
        updateControls();
      });
    }, { passive: true });

    const handleBreakpointChange = () => {
      page = Math.min(page, pageCount() - 1);
      goToPage(page);
    };

    if (typeof mobile.addEventListener === 'function') {
      mobile.addEventListener('change', handleBreakpointChange);
    } else {
      mobile.addListener(handleBreakpointChange);
    }

    gallery.dataset.galleryReady = 'true';
    updateControls();
  });
})();
