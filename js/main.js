/* =========================================================================
   CEJA FARMS — main.js
   1. Mobile navigation drawer
   2. Missing-image placeholders
   3. Footer year
   4. Hero background video (wide screens only)
   5. Project category filter
   6. Quote request form
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

  /* ---------------------------- 3. Footer year ---------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* --------------------------- 4. Hero background video ---------------------------
     The <video> ships with no <source>, so nothing downloads until we decide it's
     worth it. We attach the source only after the page has loaded, and only when:
       - the viewport is wide enough that a background video earns its bandwidth
       - the visitor hasn't asked for reduced motion
       - the browser isn't reporting Save-Data / a 2g-class connection
     Everywhere else the poster image underneath simply stays put.
  ------------------------------------------------------------------------------ */
  var hero = document.getElementById('heroVideo');
  if (hero) {
    var mq = function (q) {
      return window.matchMedia ? window.matchMedia(q).matches : false;
    };
    var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var thrifty = !!(conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '')));

    var startHeroVideo = function () {
      if (!mq('(min-width: 781px)') || mq('(prefers-reduced-motion: reduce)') || thrifty) return;

      var mp4 = hero.getAttribute('data-mp4');
      if (!mp4 || hero.querySelector('source')) return;

      var src = document.createElement('source');
      src.src = mp4;
      src.type = 'video/mp4';
      hero.appendChild(src);
      hero.load();

      hero.addEventListener('playing', function () {
        hero.classList.add('is-playing');
      });

      var attempt = hero.play();
      if (attempt && attempt.catch) {
        // Autoplay refused (some power-saving modes): leave the poster showing.
        attempt.catch(function () {});
      }
    };

    if (document.readyState === 'complete') startHeroVideo();
    else window.addEventListener('load', startHeroVideo);
  }

  /* ------------------------ 5. Project category filter ------------------------ */
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

  /* --------------------------- 6. Quote request form ---------------------------
     The site is static, so there is no server to post to. Until a form backend is
     wired up (Formspree, Netlify Forms, Basin, …) this hands the details to the
     visitor's mail app, pre-addressed and pre-filled. To switch to a real backend,
     give the <form> an action + method and delete this block.
  --------------------------------------------------------------------------- */
  var form = document.getElementById('quoteForm');
  if (form) {
    var status = document.getElementById('formStatus');

    var say = function (msg) {
      if (!status) return;
      status.textContent = msg;
      status.hidden = false;
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var val = function (id) {
        var el = document.getElementById(id);
        return el && el.value ? el.value.trim() : '';
      };

      var lines = [
        'Name: ' + val('name'),
        'Phone: ' + val('phone'),
        'Email: ' + val('email'),
        'Location: ' + val('location'),
        'Service: ' + val('service'),
        'Acreage: ' + val('acreage'),
        '',
        'Details:',
        val('message')
      ];

      var subject = 'Quote request' + (val('service') ? ' — ' + val('service') : '');
      var href = 'mailto:info@cejafarms.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(lines.join('\n'));

      window.location.href = href;
      say('Opening your email app with these details ready to send. If nothing happens, email info@cejafarms.com or call 209-625-5191.');
    });
  }
})();
