(function () {
  var root = document.documentElement;

  /* ------------------------------------------------------------
   * Dark / light theme toggle (persisted in localStorage;
   * the site defaults to dark)
   * ------------------------------------------------------------ */
  var stored = null;
  try { stored = localStorage.getItem('theme'); } catch (e) {}
  if (stored === 'dark' || stored === 'light') {
    root.setAttribute('data-theme', stored);
  }

  function effectiveTheme() {
    var attr = root.getAttribute('data-theme');
    if (attr === 'dark' || attr === 'light') return attr;
    return 'dark';
  }

  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ------------------------------------------------------------
   * Selected / All publication filter (from graceluo.net)
   * ------------------------------------------------------------ */
  var toggle = document.querySelector('.project-toggle');
  var filterButtons = document.querySelectorAll('.project-toggle-option');
  var thumb = document.querySelector('.project-toggle-thumb');
  var pubItems = document.querySelectorAll('.pub-item');

  function updateThumb(activeBtn) {
    if (!thumb || !activeBtn) return;
    thumb.style.width = activeBtn.offsetWidth + 'px';
    thumb.style.transform = 'translateX(' + activeBtn.offsetLeft + 'px)';
  }

  function applyFilter(filter) {
    var activeBtn = null;
    filterButtons.forEach(function (btn) {
      var isActive = btn.getAttribute('data-filter') === filter;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (isActive) activeBtn = btn;
    });
    updateThumb(activeBtn);
    pubItems.forEach(function (item) {
      var tags = (item.getAttribute('data-tags') || '').trim();
      var hasSelected = tags.split(/\s+/).indexOf('selected') >= 0;
      item.style.display = (filter === 'selected' && !hasSelected) ? 'none' : '';
    });
  }

  if (toggle && filterButtons.length && pubItems.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyFilter(this.getAttribute('data-filter'));
      });
    });
    applyFilter('selected');
    window.addEventListener('resize', function () {
      updateThumb(document.querySelector('.project-toggle-option.is-active'));
    });
    window.addEventListener('load', function () {
      updateThumb(document.querySelector('.project-toggle-option.is-active'));
    });
  }

  /* ------------------------------------------------------------
   * Research statement selector ("How do you see AI?")
   * Click a pill to reveal its statement; click it again to
   * close; clicking the other pill switches.
   * ------------------------------------------------------------ */
  var stmtButtons = document.querySelectorAll('.stmt-btn');
  var stmtActive = null;
  stmtButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.stmt-card');
      if (card) card.classList.add('clicked');
      var panel = document.getElementById('stmt-' + btn.getAttribute('data-stmt'));
      if (card) card.querySelectorAll('.stmt-panel').forEach(function (p) { p.hidden = true; });
      stmtButtons.forEach(function (b) { b.classList.remove('active'); });
      if (stmtActive === btn) {
        stmtActive = null;
        return;
      }
      if (panel) panel.hidden = false;
      btn.classList.add('active');
      stmtActive = btn;
    });
  });

  /* ------------------------------------------------------------
   * [...] expander for Education + Experience (as on pingchuan.ma)
   * ------------------------------------------------------------ */
  var moreTrigger = document.getElementById('more-trigger');
  var moreContent = document.getElementById('more-content');
  if (moreTrigger && moreContent) {
    moreTrigger.addEventListener('click', function (e) {
      e.preventDefault();
      moreContent.hidden = !moreContent.hidden;
      if (!moreContent.hidden) moreContent.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------
   * Collapsible abstract + BibTeX blocks
   * ------------------------------------------------------------ */
  document.querySelectorAll('[data-bibtex], [data-abs]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var id = link.getAttribute('data-bibtex') || link.getAttribute('data-abs');
      var target = document.getElementById(id);
      if (target) target.hidden = !target.hidden;
    });
  });

  /* ------------------------------------------------------------
   * Copy-to-clipboard buttons for BibTeX
   * ------------------------------------------------------------ */
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wrapper = btn.closest('.bibtex');
      var code = wrapper && wrapper.querySelector('code');
      if (!code) return;
      var text = code.textContent;
      function done() {
        btn.textContent = 'copied!';
        setTimeout(function () { btn.textContent = 'copy'; }, 1200);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        done();
      }
    });
  });

  /* ------------------------------------------------------------
   * Auto-updating copyright year
   * ------------------------------------------------------------ */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
