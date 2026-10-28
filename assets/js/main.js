/**
 * SEN 431: Data Mining — Master Client Application
 * Handles KaTeX math rendering, dark/light theme switching,
 * collapsible left navigation, telemetry gauge scrubber, and portal search.
 */
(function() {
  'use strict';

  // =========================================================================
  // 1. KaTeX Mathematics Auto-Rendering
  // =========================================================================
  function initKaTeX() {
    if (typeof renderMathInElement === 'function') {
      renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '\\[', right: '\\]', display: true },
          { left: '\\(', right: '\\)', display: false }
        ],
        throwOnError: false
      });
    } else {
      setTimeout(initKaTeX, 80);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKaTeX);
  } else {
    initKaTeX();
  }

  // =========================================================================
  // 2. Theme Switcher (Dark & Light)
  // =========================================================================
  var themeBtn = document.getElementById('sb-theme-toggle');

  function updateThemeUI(theme) {
    if (!themeBtn) return;
    var icon = themeBtn.querySelector('.theme-icon');
    var text = themeBtn.querySelector('.theme-text');
    if (theme === 'dark') {
      if (icon) icon.innerHTML = '&#x25D1;'; // ◑
      if (text) text.textContent = 'Theme: Dark';
    } else {
      if (icon) icon.innerHTML = '&#x25D0;'; // ◐
      if (text) text.textContent = 'Theme: Light';
    }
  }

  function toggleTheme() {
    var cur = document.documentElement.getAttribute('data-theme');
    var isDark = cur === 'dark' || (!cur && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    var next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('sen431_theme', next);
      localStorage.setItem('mis_theme', next);
    } catch (e) {}
    updateThemeUI(next);
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleTheme();
    });
  }

  // Initialize UI label
  var currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateThemeUI(currentTheme);

  // Keyboard shortcut: 'T' toggles theme
  document.addEventListener('keydown', function(e) {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    if (e.key === 't' || e.key === 'T') {
      e.preventDefault();
      toggleTheme();
    }
  });

  // =========================================================================
  // 3. Collapsible Left Navigation System (#core-sidebar)
  // =========================================================================
  var STORAGE_KEY = 'sen431_core_sidebar_open';
  var body = document.body;
  var toggleBtn = document.getElementById('sidebar-toggle-btn');
  var closeBtn = document.getElementById('sidebar-close-btn');
  var backdrop = document.getElementById('sidebar-backdrop');

  function isDesktop() {
    return window.innerWidth >= 1200;
  }

  function setSidebar(open) {
    if (open) {
      body.classList.add('sidebar-open');
    } else {
      body.classList.remove('sidebar-open');
    }
    try {
      localStorage.setItem(STORAGE_KEY, open ? '1' : '0');
    } catch (e) {}
  }

  // Restore sidebar state (desktop remembers state; mobile always starts closed for clean reading)
  var savedSidebar = null;
  try { savedSidebar = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  if (isDesktop()) {
    if (savedSidebar === '0') body.classList.remove('sidebar-open');
    else body.classList.add('sidebar-open'); // Default open on wide desktop screens
  } else {
    body.classList.remove('sidebar-open'); // Handheld & tablet: start closed with full content visibility
  }

  // Handle dynamic window resize transitions
  var prevWasDesktop = isDesktop();
  window.addEventListener('resize', function() {
    var nowDesktop = isDesktop();
    if (prevWasDesktop && !nowDesktop) {
      // Transitioning from desktop to mobile: close drawer
      body.classList.remove('sidebar-open');
    }
    prevWasDesktop = nowDesktop;
  });

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      setSidebar(!body.classList.contains('sidebar-open'));
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      setSidebar(false);
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', function() {
      setSidebar(false);
    });
  }

  // Keyboard shortcuts: '[' or '\' or Alt+M toggles; Escape closes
  document.addEventListener('keydown', function(e) {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    if (e.key === '[' || e.key === '\\\\' || (e.altKey && (e.key === 'm' || e.key === 'M'))) {
      e.preventDefault();
      setSidebar(!body.classList.contains('sidebar-open'));
    } else if (e.key === 'Escape' && body.classList.contains('sidebar-open')) {
      setSidebar(false);
    }
  });

  // Auto-adapt links based on current file naming scheme (legacy vs short)
  var currentPath = window.location.pathname;
  var isLegacyNaming = currentPath.indexOf('Data%20Mining%20Week') !== -1 || currentPath.indexOf('Data Mining Week') !== -1;
  if (isLegacyNaming) {
    var links = document.querySelectorAll('.sb-link[data-week]');
    links.forEach(function(a) {
      var wk = a.getAttribute('data-week');
      a.setAttribute('href', 'Data Mining Week ' + wk + ' Log.html');
    });
  }

  // Auto-close on small screens when a strata jump link is clicked
  var subLinks = document.querySelectorAll('.sb-sublist a');
  subLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (!isDesktop()) setSidebar(false);
    });
  });

  // =========================================================================
  // 4. Interactive Scrubber Gauge (Lecture Log Pages)
  // =========================================================================
  var deck = document.querySelector('.deck');
  var tape = deck ? deck.querySelector('.tape') : null;

  if (deck && tape) {
    var es = [].slice.call(document.querySelectorAll('.e'));
    var segs = [].slice.call(deck.querySelectorAll('.seg'));
    var clock = document.getElementById('clock');
    var play = document.getElementById('play');
    var dp = document.getElementById('dpt');

    var starts = segs.map(function(s) { return +s.getAttribute('data-s'); });
    var ends = segs.map(function(s) { return +s.getAttribute('data-e'); });

    function formatTime(s) {
      s = Math.round(s);
      var a = [Math.floor(s / 3600), Math.floor(s % 3600 / 60), s % 60];
      return a.map(function(n) { return (n < 10 ? '0' : '') + n; }).join(':');
    }

    var busy = false;
    function updateScrubber() {
      busy = false;
      var line = deck.getBoundingClientRect().bottom + 28;
      var t = 0;
      for (var i = 0; i < es.length; i++) {
        var r = es[i].getBoundingClientRect();
        if (r.top <= line) {
          var a = +es[i].getAttribute('data-t');
          var b = +es[i].getAttribute('data-e');
          var p = Math.max(0, Math.min(1, (line - r.top) / Math.max(1, r.height)));
          t = a + p * (b - a);
        } else {
          break;
        }
      }

      if (clock) clock.textContent = formatTime(t);
      if (dp) dp.textContent = (t / 60).toFixed(1) + ' m';

      var k = 0;
      for (var j = 0; j < starts.length; j++) {
        if (t >= starts[j]) k = j;
      }
      segs.forEach(function(s, n) {
        s.classList.toggle('on', n === k && t > 0);
      });

      if (segs[k] && play) {
        var sg = segs[k];
        var fr = Math.max(0, Math.min(1, (t - starts[k]) / Math.max(1, ends[k] - starts[k])));
        play.style.left = (sg.offsetLeft + fr * sg.offsetWidth) + 'px';
      }
    }

    function reqScrubber() {
      if (!busy) {
        busy = true;
        requestAnimationFrame(updateScrubber);
      }
    }

    window.addEventListener('scroll', reqScrubber, { passive: true });
    window.addEventListener('resize', reqScrubber);
    updateScrubber();
  }

  // =========================================================================
  // 5. Live Search & Filter (Portal Directory index.html)
  // =========================================================================
  var searchInput = document.getElementById('strata-search');
  var countLbl = document.getElementById('search-count');
  var cards = document.querySelectorAll('.idx-card:not(.upcoming)');

  if (searchInput && cards.length > 0) {
    searchInput.addEventListener('input', function() {
      var q = this.value.trim().toLowerCase();
      var visibleCards = 0;
      var totalMatchingStrata = 0;

      cards.forEach(function(card) {
        var titleElem = card.querySelector('.idx-card-title');
        var cardTitle = titleElem ? titleElem.textContent.toLowerCase() : '';
        var strataRows = card.querySelectorAll('.idx-stratum-row');
        var cardMatchCount = 0;

        strataRows.forEach(function(row) {
          var searchText = (row.getAttribute('data-search') || '').toLowerCase();
          if (!q || searchText.indexOf(q) !== -1 || cardTitle.indexOf(q) !== -1) {
            row.style.display = 'flex';
            cardMatchCount++;
          } else {
            row.style.display = 'none';
          }
        });

        if (!q || cardMatchCount > 0 || cardTitle.indexOf(q) !== -1) {
          card.style.display = 'flex';
          visibleCards++;
          totalMatchingStrata += cardMatchCount;
        } else {
          card.style.display = 'none';
        }
      });

      if (countLbl) {
        if (!q) {
          countLbl.textContent = 'Showing all 6 lecture study logs · 48 strata layers';
        } else {
          countLbl.textContent = 'Found ' + totalMatchingStrata + ' matching strata across ' + visibleCards + ' lecture logs';
        }
      }
    });
  }

})();
