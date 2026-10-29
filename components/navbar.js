/**
 * SiteNav Web Component (<site-nav></site-nav>)
 * SEN 431: Data Mining Study Core
 *
 * Encapsulates the collapsible navigation sidebar, telemetry, lecture list,
 * active page detection, strata bars, and portal links.
 * 100% vanilla JavaScript with zero external dependencies.
 */

(function () {
  'use strict';

  var WEEKS_DATA = [
    {
      week: 1,
      badge: 'W01',
      title: 'Orientation, AI Dilemma & Foundations',
      meta: '106.7 m &middot; 01:46:44',
      colors: ['#A9825A', '#D0814F', '#E0B04A', '#3FB5A5', '#6F9ADB', '#A98BD6', '#8FBF7A', '#D9607A'],
      sublist: [
        { href: '#part-a', marker: 'A', label: 'Orientation, Ethics, and the Digital Lab' },
        { href: '#part-b', marker: 'B', label: 'Industry 4.0 and Smart Autonomous Systems' },
        { href: '#part-c', marker: 'C', label: 'Data as the New Oil and the Carbon Cost' },
        { href: '#part-d', marker: 'D', label: 'Decision Support Systems and Machine Learning' },
        { href: '#part-e', marker: 'E', label: 'The Illusion of Trust and AI Hallucinations' },
        { href: '#part-f', marker: 'F', label: 'The Art of the Prompt and Cambridge Curricula' },
        { href: '#part-g', marker: 'G', label: 'The Billion-Dollar Prompt: 5 Models Tested' },
        { href: '#part-h', marker: 'H', label: 'The 1986 Calculator Panic and the Lab Rats' },
        { href: '#errata', marker: '&para;', label: 'Speech Errata' },
        { href: '#video-lab', marker: '&#9654;', label: 'Curated Video Lab' }
      ]
    },
    {
      week: 2,
      badge: 'W02',
      title: 'KDD Process, DIKW Hierarchy & Taxonomy',
      meta: '128.5 m &middot; 02:08:32',
      colors: ['#A9825A', '#D0814F', '#E0B04A', '#3FB5A5', '#6F9ADB', '#A98BD6', '#8FBF7A', '#D9607A'],
      sublist: [
        { href: '#part-a', marker: 'A', label: 'Why Data Mining? Evolution from File Cabinets' },
        { href: '#part-b', marker: 'B', label: 'The KDD Process: Fayyad\u2019s 5-Stage Architecture' },
        { href: '#part-c', marker: 'C', label: 'The Data Mining Task Taxonomy: 4 Pillars' },
        { href: '#part-d', marker: 'D', label: 'The DIKW Pyramid & Epistemology of Knowledge' },
        { href: '#part-e', marker: 'E', label: 'Association vs. Causation: Simpson\u2019s Paradox' },
        { href: '#part-f', marker: 'F', label: 'Business & Real-World Use Cases: Churn & Fraud' },
        { href: '#part-g', marker: 'G', label: 'Data Mining Architecture: DB, DW & Engine' },
        { href: '#part-h', marker: 'H', label: 'Emerging Challenges & Synthesis: Scalability' },
        { href: '#errata', marker: '&para;', label: 'Speech Errata' },
        { href: '#video-lab', marker: '&#9654;', label: 'Curated Video Lab' }
      ]
    },
    {
      week: 3,
      badge: 'W03',
      title: 'Data Types, Dirty Data & Normalization',
      meta: '106.6 m &middot; 01:46:36',
      colors: ['#A9825A', '#D0814F', '#E0B04A', '#3FB5A5', '#6F9ADB', '#A98BD6', '#8FBF7A', '#D9607A'],
      sublist: [
        { href: '#part-a', marker: 'A', label: 'Week 2 Review &amp; KDD Bridge' },
        { href: '#part-b', marker: 'B', label: 'Matrices, Terminology, and Play Tennis' },
        { href: '#part-c', marker: 'C', label: 'Density, Sparsity, and Class Imbalance' },
        { href: '#part-d', marker: 'D', label: 'Benchmark Repositories: UCI vs. Kaggle' },
        { href: '#part-e', marker: 'E', label: 'Dataset File Formats: CSV, ARFF, and Weka' },
        { href: '#part-f', marker: 'F', label: 'Data Quality: Missing Values, Noise & Outliers' },
        { href: '#part-g', marker: 'G', label: 'GIGO and Occam\u2019s Razor' },
        { href: '#part-h', marker: 'H', label: 'Feature Normalization: Min\u2013Max vs. Z-Score' },
        { href: '#errata', marker: '&para;', label: 'Speech Errata' },
        { href: '#video-lab', marker: '&#9654;', label: 'Curated Video Lab' }
      ]
    },
    {
      week: 4,
      badge: 'W04',
      title: 'Classification, Lazy vs Eager, ZeroR &amp; OneR',
      meta: '115.7 m &middot; 01:55:40',
      colors: ['#A9825A', '#D0814F', '#E0B04A', '#3FB5A5', '#6F9ADB', '#A98BD6', '#8FBF7A', '#D9607A'],
      sublist: [
        { href: '#part-a', marker: 'A', label: 'From Data Preparation to the Four Core Tasks' },
        { href: '#part-b', marker: 'B', label: 'Classifiers vs. Regressors &amp; Learning Paradigms' },
        { href: '#part-c', marker: 'C', label: 'Lazy vs. Eager Learners and the Two Phases' },
        { href: '#part-d', marker: 'D', label: 'Decision Boundaries in 2D, 3D, and Hyperplanes' },
        { href: '#part-e', marker: 'E', label: 'White-Box Transparency vs. Black-Box Power' },
        { href: '#part-f', marker: 'F', label: 'The Baseline Benchmark: Zero Rule (ZeroR)' },
        { href: '#part-g', marker: 'G', label: 'One Rule (OneR) and Single-Feature Testing' },
        { href: '#part-h', marker: 'H', label: 'Resampling, Bootstrap, and Quantization' },
        { href: '#errata', marker: '&para;', label: 'Speech Errata' },
        { href: '#video-lab', marker: '&#9654;', label: 'Curated Video Lab' }
      ]
    },
    {
      week: 5,
      badge: 'W05',
      title: 'Distance Metrics, k-NN &amp; Voronoi',
      meta: '102.6 m &middot; 01:42:33',
      colors: ['#A9825A', '#D0814F', '#E0B04A', '#3FB5A5', '#6F9ADB', '#A98BD6', '#8FBF7A', '#D9607A'],
      sublist: [
        { href: '#part-a', marker: 'A', label: 'The Geometry of Distance and Euclidean Metric' },
        { href: '#part-b', marker: 'B', label: 'Manhattan, City-Blocks, and Grid Navigation' },
        { href: '#part-c', marker: 'C', label: 'Minkowski, Chebyshev, and Mahalanobis Spaces' },
        { href: '#part-d', marker: 'D', label: 'k-Nearest Neighbors (k-NN) Foundations' },
        { href: '#part-e', marker: 'E', label: 'Categorical k-NN &amp; Play Tennis Walkthrough' },
        { href: '#part-f', marker: 'F', label: 'The Voting Mechanism: Odd k &amp; Bias\u2013Variance' },
        { href: '#part-g', marker: 'G', label: 'Voronoi Diagrams: 1-NN &amp; Dirichlet Cells' },
        { href: '#part-h', marker: 'H', label: 'Linear Regression, OLS, and Exam Practice' },
        { href: '#errata', marker: '&para;', label: 'Speech Errata' },
        { href: '#video-lab', marker: '&#9654;', label: 'Curated Video Lab' }
      ]
    },
    {
      week: 6,
      badge: 'W06',
      title: 'Decision Trees, Purity, CART &amp; SVM',
      meta: '103.3 m &middot; 01:43:17',
      colors: ['#A9825A', '#D0814F', '#E0B04A', '#3FB5A5', '#6F9ADB', '#A98BD6', '#8FBF7A', '#D9607A'],
      sublist: [
        { href: '#part-a', marker: 'A', label: 'Week 5 Retrospective &amp; Exam Boundaries' },
        { href: '#part-b', marker: 'B', label: 'Foundations &amp; The Learner Triad' },
        { href: '#part-c', marker: 'C', label: 'Recursive Partitioning &amp; Node Purity' },
        { href: '#part-d', marker: 'D', label: 'Shannon Entropy &amp; Hand Calculations' },
        { href: '#part-e', marker: 'E', label: 'Information Gain &amp; ID3 Induction' },
        { href: '#part-f', marker: 'F', label: 'Gini Impurity, CART &amp; Hybrid Models' },
        { href: '#part-g', marker: 'G', label: 'Tree Depth, Overfitting &amp; Pruning' },
        { href: '#part-h', marker: 'H', label: 'Alternative Classifiers &amp; Interview Defense' },
        { href: '#errata', marker: '&para;', label: 'Speech Errata' },
        { href: '#video-lab', marker: '&#9654;', label: 'Curated Video Lab' }
      ]
    },
    {
      week: 7,
      badge: 'W07',
      title: 'Performance Evaluation &amp; Confusion Matrix',
      meta: '105.5 m &middot; 01:45:30',
      colors: ['#A9825A', '#D0814F', '#E0B04A', '#3FB5A5', '#6F9ADB', '#A98BD6', '#8FBF7A', '#D9607A'],
      sublist: [
        { href: '#part-a', marker: 'A', label: 'Midterm Architecture &amp; Review' },
        { href: '#part-b', marker: 'B', label: 'Evaluation Philosophy &amp; Ground Truth' },
        { href: '#part-c', marker: 'C', label: 'Confusion Matrix &amp; 4 Outcomes' },
        { href: '#part-d', marker: 'D', label: '2x2 Contingency &amp; Core Metrics' },
        { href: '#part-e', marker: 'E', label: 'Live Board 8-Patient COVID Benchmark' },
        { href: '#part-f', marker: 'F', label: 'Multiclass 3x3 Animal Matrix' },
        { href: '#part-g', marker: 'G', label: 'Lion One-vs-Rest &amp; F1 Proof' },
        { href: '#part-h', marker: 'H', label: 'CIFAR-10 Diagnostics &amp; Synthesis' },
        { href: '#video-lab', marker: '&#9654;', label: 'Curated Video Lab' },
        { href: '#terms', marker: '&sect;', label: 'Key Terms' },
        { href: '#errata', marker: '&para;', label: 'Speech Errata' }
      ]
    }
  ];

  class SiteNav extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.render();
      this.bindInteractions();
    }

    detectPage() {
      var rawPath = window.location.pathname || '';
      var decoded = '';
      try {
        decoded = decodeURIComponent(rawPath);
      } catch (e) {
        decoded = rawPath;
      }
      var filename = decoded.split('/').pop().toLowerCase();

      var isShortNaming = /week-0?\d+/i.test(filename);
      var wkMatch = filename.match(/week[\s_-]*0?(\d+)/i);
      var activeWeek = wkMatch ? parseInt(wkMatch[1], 10) : null;
      var isIndex = !activeWeek && (!filename || filename === 'index.html' || filename === 'index' || filename.endsWith('/'));

      return {
        activeWeek: activeWeek,
        isShortNaming: isShortNaming,
        isIndex: isIndex,
        filename: filename
      };
    }

    render() {
      var info = this.detectPage();
      var activeWeek = info.activeWeek;
      var isShort = info.isShortNaming;
      var isIndex = info.isIndex;

      var itemsHtml = WEEKS_DATA.map(function (w) {
        var isActive = (activeWeek === w.week);
        var href = isShort ? ('week-0' + w.week + '.html') : ('Data Mining Week ' + w.week + ' Log.html');

        var strataHtml = w.colors.map(function (c) {
          return '<span class="sb-seg" style="background:' + c + '"></span>';
        }).join('');

        var sublistHtml = '';
        if (isActive && w.sublist && w.sublist.length > 0) {
          sublistHtml = '<ul class="sb-sublist">\n' + w.sublist.map(function (s) {
            return '    <li><a class="sb-sublink" href="' + s.href + '"><span class="sb-marker">' + s.marker + '</span><span>' + s.label + '</span></a></li>';
          }).join('\n') + '\n  </ul>';
        }

        var itemClass = isActive ? 'sb-item active' : 'sb-item';
        var linkClass = isActive ? 'sb-link active' : 'sb-link';

        return '  <li class="' + itemClass + '">\n' +
          '    <a class="' + linkClass + '" data-week="' + w.week + '" href="' + href + '">\n' +
          '      <span class="sb-wk-badge">' + w.badge + '</span>\n' +
          '      <div class="sb-wk-body">\n' +
          '        <span class="sb-wk-title">' + w.title + '</span>\n' +
          '        <span class="sb-wk-meta">' + w.meta + '</span>\n' +
          '        <div class="sb-strata-bar">' + strataHtml + '</div>\n' +
          '      </div>\n' +
          '    </a>\n' +
          (sublistHtml ? '  ' + sublistHtml + '\n' : '') +
          '  </li>';
      }).join('\n');

      var portalClass = isIndex ? 'sb-portal-link active' : 'sb-portal-link';

      this.innerHTML =
        '<aside aria-label="Course Lecture Archive" id="core-sidebar">\n' +
        '  <div class="sb-head">\n' +
        '    <a class="sb-brand" href="index.html">\n' +
        '      <span class="sb-drill-icon">&#x2BD0;</span>\n' +
        '      <div class="sb-brand-meta">\n' +
        '        <span class="sb-brand-sub">SEN 431 &middot; IAU</span>\n' +
        '        <span class="sb-brand-title">Study Core Log</span>\n' +
        '      </div>\n' +
        '    </a>\n' +
        '    <button aria-label="Close Navigation" class="sb-close-btn" id="sidebar-close-btn" type="button">&times;</button>\n' +
        '  </div>\n\n' +
        '  <div class="sb-telemetry">\n' +
        '    <div class="sb-tele-col">\n' +
        '      <span class="sb-tele-lbl">CORE DRILLED</span>\n' +
        '      <span class="sb-tele-val">768.9 m</span>\n' +
        '    </div>\n' +
        '    <div class="sb-tele-col">\n' +
        '      <span class="sb-tele-lbl">STRATA INDEXED</span>\n' +
        '      <span class="sb-tele-val">56 Layers</span>\n' +
        '    </div>\n' +
        '  </div>\n\n' +
        '  <nav class="sb-scroll" aria-label="Course Lecture Archive">\n' +
        '    <div class="sb-nav-lbl">\n' +
        '      <span>LECTURE ARCHIVE</span>\n' +
        '      <span>7 / 14 WKS</span>\n' +
        '    </div>\n' +
        '    <ul class="sb-list">\n' +
        itemsHtml + '\n' +
        '    </ul>\n' +
        '  </nav>\n\n' +
        '  <div class="sb-footer">\n' +
        '    <a class="' + portalClass + '" href="index.html">\n' +
        '      <span>&#x25C7;</span> Master Portal Index\n' +
        '    </a>\n' +
        '    <button class="sb-theme-toggle" id="sb-theme-toggle" title="Toggle Light / Dark Mode (Shortcut: T)" type="button">\n' +
        '      <span class="theme-icon">&#x25D1;</span>\n' +
        '      <span class="theme-text">Theme: Dark</span>\n' +
        '    </button>\n' +
        '    <div class="sb-keyhint">\n' +
        '      Shortcut: Press <kbd>[</kbd> to toggle &middot; <kbd>T</kbd> for theme\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</aside>\n' +
        '<div id="sidebar-backdrop"></div>';
    }

    bindInteractions() {
      // Sync theme icon and text to current document theme
      var curTheme = document.documentElement.getAttribute('data-theme');
      if (!curTheme) {
        try { curTheme = localStorage.getItem('sen431_theme'); } catch (e) {}
      }
      if (!curTheme) curTheme = 'dark';

      var themeBtn = this.querySelector('#sb-theme-toggle');
      if (themeBtn) {
        var icon = themeBtn.querySelector('.theme-icon');
        var text = themeBtn.querySelector('.theme-text');
        if (curTheme === 'dark') {
          if (icon) icon.innerHTML = '&#x25D1;';
          if (text) text.textContent = 'Theme: Dark';
        } else {
          if (icon) icon.innerHTML = '&#x25D0;';
          if (text) text.textContent = 'Theme: Light';
        }
      }

      // Close button handler (backup if main.js hasn't bound yet)
      var closeBtn = this.querySelector('#sidebar-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          document.body.classList.remove('sidebar-open');
          try { localStorage.setItem('sen431_core_sidebar_open', '0'); } catch (e) {}
        });
      }

      // Backdrop handler (backup if main.js hasn't bound yet)
      var backdrop = this.querySelector('#sidebar-backdrop');
      if (backdrop) {
        backdrop.addEventListener('click', function () {
          document.body.classList.remove('sidebar-open');
          try { localStorage.setItem('sen431_core_sidebar_open', '0'); } catch (e) {}
        });
      }

      // Auto-close on handheld when sublink clicked
      var subLinks = this.querySelectorAll('.sb-sublist a');
      subLinks.forEach(function (link) {
        link.addEventListener('click', function () {
          if (window.innerWidth < 1200) {
            document.body.classList.remove('sidebar-open');
          }
        });
      });
    }
  }

  // Register Custom Element
  if (!customElements.get('site-nav')) {
    customElements.define('site-nav', SiteNav);
  }
})();
