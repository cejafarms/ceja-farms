/* =========================================================================
   CEJA FARMS — main.js
   1. Mobile navigation drawer
   2. Missing-image placeholders
   3. Footer year
   4. Project category filter
   5. Quote request form
   ========================================================================= */
(function () {
  'use strict';

  /* ------------------------- 1. Mobile navigation ------------------------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');

  if (toggle && nav) {
    var setNav = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    toggle.addEventListener('click', function () {
      setNav(nav.classList.contains('is-open') === false);
    });

    // Close after tapping a link in the drawer.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && window.matchMedia('(max-width: 1024px)').matches) {
        setNav(false);
      }
    });

    // Close on Escape.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setNav(false);
        toggle.focus();
      }
    });

    // Reset state when resizing back up to the desktop layout.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1024 && nav.classList.contains('is-open')) setNav(false);
    });
  }

  /* --------------------- 2. Missing-image placeholders ---------------------
     Each photo slot is <div class="media" data-ph="filename · WxH"><img ...>.
     Until the real photo is dropped into /images/, the wrapper is flagged and
     CSS paints a labelled placeholder at the correct aspect ratio.
  ------------------------------------------------------------------------ */
  var flag = function (img) {
    var wrap = img.closest('.media');
    if (wrap) wrap.classList.add('is-placeholder');
  };

  Array.prototype.forEach.call(document.querySelectorAll('.media img'), function (img) {
    if (img.complete) {
      if (!img.naturalWidth) flag(img);          // already failed
    } else {
      img.addEventListener('error', function () { flag(img); });
    }
  });

  /* ------------------------ 2b. Home hero drone loop ------------------------
     The <source>s ship with data-src, so nothing downloads until we decide
     the visitor should get motion: not for reduced-motion or data-saver
     users, where the still photo underneath simply stays. The loop pauses
     while scrolled out of view, and the button lets anyone stop it.
  ------------------------------------------------------------------------ */
  var heroVideo = document.querySelector('.hero__video');
  var heroMotion = document.querySelector('.hero__motion');
  if (heroVideo) {
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var conn = navigator.connection;
    var lean = conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ''));

    if (!calm && !lean) {
      var userPaused = false;
      var inView = true;

      Array.prototype.forEach.call(heroVideo.querySelectorAll('source[data-src]'), function (s) {
        s.src = s.getAttribute('data-src');
      });
      heroVideo.muted = true;   // the attribute alone doesn't satisfy every autoplay policy
      heroVideo.preload = 'auto';
      heroVideo.load();

      var sync = function () {
        if (!userPaused && inView) {
          var p = heroVideo.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          heroVideo.pause();
        }
      };

      heroVideo.addEventListener('playing', function () {
        heroVideo.classList.add('is-playing');
        if (heroMotion) heroMotion.hidden = false;
      });

      if (heroMotion) {
        heroMotion.addEventListener('click', function () {
          userPaused = !userPaused;
          heroMotion.classList.toggle('is-paused', userPaused);
          heroMotion.setAttribute('aria-label', userPaused ? 'Play background video' : 'Pause background video');
          sync();
        });
      }

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          inView = entries[0].isIntersecting;
          sync();
        }).observe(heroVideo);
      }

      sync();
    }
  }

  /* ---------------------------- 3. Footer year ---------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ------------------------ 4. Project category filter ------------------------ */
  var grid = document.getElementById('projectGrid');
  if (grid) {
    var buttons = document.querySelectorAll('.filter');
    var projects = grid.querySelectorAll('.project');
    var empty = document.getElementById('projectEmpty');

    var applyFilter = function (want) {
      var shown = 0;
      Array.prototype.forEach.call(projects, function (p) {
        var cats = (p.getAttribute('data-cat') || '').split(/\s+/);
        var match = want === 'all' || cats.indexOf(want) !== -1;
        p.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    };

    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener('click', function () {
        Array.prototype.forEach.call(buttons, function (b) {
          var on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', String(on));
        });
        applyFilter(btn.getAttribute('data-filter'));
      });
    });
  }

  /* --------------------------- 5. Quote request form ---------------------------
     Submits to Netlify Forms over fetch() so the visitor stays on the page — no
     mail client, no full reload. Netlify registers the form by scanning the
     static markup at deploy time (name + data-netlify + the hidden form-name
     input), so this script only handles the transport and the confirmation.

     With JS off, the form still posts normally and Netlify shows its own
     success page, so the fallback path stays intact.
  --------------------------------------------------------------------------- */
  var form = document.getElementById('quoteForm');
  if (form) {
    var status = document.getElementById('formStatus');
    var submitBtn = document.getElementById('quoteSubmit');

    var say = function (msg, kind) {
      if (!status) return;
      status.textContent = msg;
      status.classList.remove('form__status--ok', 'form__status--err');
      if (kind) status.classList.add('form__status--' + kind);
      status.hidden = false;
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var label = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      })
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          form.reset();
          say('Thanks — your request is in. We’ll be in touch shortly. If it’s urgent, call 209-625-5191.', 'ok');
        })
        .catch(function () {
          say('Sorry, that didn’t go through. Please call 209-625-5191 or email info@cejafarms.com and we’ll get right on it.', 'err');
        })
        .then(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = label;
          }
        });
    });
  }
})();
