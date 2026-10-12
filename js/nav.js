/* Mobile navigation: accessible disclosure pattern.
   - button[aria-expanded] controls the full-screen panel
   - Esc closes, focus is trapped while open, focus returns to the button
   - body scroll locks while open; state resets when resized to desktop */
(function () {
  var btn = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!btn || !nav) { return; }

  function isOpen() {
    return btn.getAttribute("aria-expanded") === "true";
  }

  function setOpen(open, focusTarget) {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.documentElement.classList.toggle("nav-open", open);
    if (open) {
      var first = nav.querySelector("a");
      if (first) { first.focus(); }
    } else if (focusTarget !== false) {
      btn.focus();
    }
  }

  btn.addEventListener("click", function () {
    setOpen(!isOpen());
  });

  document.addEventListener("keydown", function (e) {
    if (!isOpen()) { return; }
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "Tab") {
      var items = [btn].concat(
        Array.prototype.slice.call(nav.querySelectorAll("a")));
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });

  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) { setOpen(false, false); }
  });

  var mq = window.matchMedia("(min-width: 841px)");
  function onChange(ev) {
    if (ev.matches && isOpen()) { setOpen(false, false); }
  }
  if (mq.addEventListener) { mq.addEventListener("change", onChange); }
  else if (mq.addListener) { mq.addListener(onChange); }
})();
