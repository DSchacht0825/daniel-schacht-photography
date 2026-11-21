(function () {
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && !nav.classList.contains('solid')) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 40); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // gallery filters
  var filterBtns = document.querySelectorAll('.filters button');
  filterBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      filterBtns.forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      var f = b.getAttribute('data-filter');
      document.querySelectorAll('.gallery figure').forEach(function (fig) {
        fig.classList.toggle('hide', f !== 'all' && fig.getAttribute('data-cat') !== f);
      });
    });
  });

  // lightbox
  var lb = document.querySelector('.lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var idx = 0;
    var visible = function () {
      return Array.prototype.slice.call(document.querySelectorAll('.gallery figure:not(.hide) img'));
    };
    var show = function (i) {
      var list = visible();
      if (!list.length) return;
      idx = (i + list.length) % list.length;
      lbImg.src = list[idx].getAttribute('data-full') || list[idx].src;
      lbImg.alt = list[idx].alt;
    };
    document.querySelectorAll('.gallery figure').forEach(function (fig) {
      fig.addEventListener('click', function () {
        show(visible().indexOf(fig.querySelector('img')));
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    var close = function () { lb.classList.remove('open'); document.body.style.overflow = ''; };
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }
})();
