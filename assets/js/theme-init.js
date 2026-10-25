(function(){
  var s = null;
  try { s = localStorage.getItem('sen431_theme') || localStorage.getItem('mis_theme'); } catch(e) {}
  var t = s || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', t);
})();
