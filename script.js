// Section highlight in the sticky nav, the scroll "XP bar", and gallery focus.
// Progressive enhancement only: the page works fully without it.
(function () {
  "use strict";

  var root = document.documentElement;
  var links = document.querySelectorAll("[data-nav-link]");
  var sections = document.querySelectorAll("[data-nav]");

  // ---- XP bar (scroll progress) ----
  var ticking = false;
  function updateProgress() {
    var max = root.scrollHeight - root.clientHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    root.style.setProperty("--progress", p.toFixed(4));
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateProgress);
    }
  }, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  // ---- Galleries ----
  // The markup ships every gallery as a focusable, labelled region so a phone
  // strip can be scrolled from the keyboard even without this script. Where a
  // gallery doesn't scroll (wider screens), drop the extra tab stop and landmark.
  var tracks = document.querySelectorAll(".gallery-track, .shelf__track");
  tracks.forEach(function (t) {
    if (t.hasAttribute("aria-label")) t.setAttribute("data-label", t.getAttribute("aria-label"));
  });
  function syncTracks() {
    tracks.forEach(function (t) {
      var ox = window.getComputedStyle(t).overflowX;
      if ((ox === "auto" || ox === "scroll") && t.scrollWidth > t.clientWidth + 1) {
        t.setAttribute("tabindex", "0");
        t.setAttribute("role", "region");
        t.setAttribute("aria-label", t.getAttribute("data-label") || "Screenshots");
      } else {
        t.removeAttribute("tabindex");
        t.removeAttribute("role");
        t.removeAttribute("aria-label");
      }
    });
  }
  var trackTimer = null;
  window.addEventListener("resize", function () {
    window.clearTimeout(trackTimer);
    trackTimer = window.setTimeout(syncTracks, 150);
  });
  syncTracks();

  // ---- Scroll spy ----
  if (!("IntersectionObserver" in window) || !links.length || !sections.length) return;

  var visible = new Map();

  function setActive(key) {
    links.forEach(function (a) {
      var on = a.getAttribute("data-nav-link") === key;
      a.classList.toggle("is-active", on);
      if (on) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) visible.set(entry.target, entry.intersectionRatio);
      else visible.delete(entry.target);
    });

    // Pick the topmost section that is currently in the band.
    var best = null;
    var bestTop = Infinity;
    visible.forEach(function (_ratio, el) {
      var top = el.getBoundingClientRect().top;
      if (top < bestTop) { bestTop = top; best = el; }
    });
    setActive(best ? best.getAttribute("data-nav") : null);
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

  sections.forEach(function (s) { observer.observe(s); });
})();
