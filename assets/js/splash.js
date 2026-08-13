(function () {
  "use strict";
  var splash = document.getElementById("splash");
  if (!splash) {
    return;
  }
  if (window.localStorage && window.localStorage.getItem("abt-splash-seen")) {
    splash.parentNode.removeChild(splash);
    return;
  }
  var dismissed = false;
  function dismiss() {
    if (dismissed) {
      return;
    }
    dismissed = true;
    if (window.localStorage) {
      window.localStorage.setItem("abt-splash-seen", "1");
    }
    splash.classList.add("splash-hidden");
    window.setTimeout(function () {
      if (splash.parentNode) {
        splash.parentNode.removeChild(splash);
      }
    }, 300);
    document.removeEventListener("keydown", dismiss);
    document.removeEventListener("click", dismiss);
  }
  document.addEventListener("keydown", dismiss);
  document.addEventListener("click", dismiss);
  window.setTimeout(dismiss, 4000);
})();
