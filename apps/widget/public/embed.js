// apps/widget/public/embed.js
(function () {
  function init() {
    var script = document.currentScript;
    if (!script) return;

    var ds = script.dataset || {};

    // Parametri configurabili da WordPress
    var hotel = ds.hotel || "SV001";
    var room = ds.room || "A1";
    var lang = ds.lang || "it";
    var mode = ds.mode || "default";

    // Calcola l'origine del widget da src dello script
    var origin = "https://widget.nextsphere.it";
    try {
      origin = new URL(script.src).origin;
    } catch (e) {
      // fallback: usiamo quello di default
    }

    // Costruisci l'URL del widget vero e proprio
    // es: https://widget.nextsphere.it/?hotel=SV001&room=A1&lang=it&mode=default
    var url =
      origin.replace(/\/+$/, "") +
      "/?hotel=" +
      encodeURIComponent(hotel) +
      "&room=" +
      encodeURIComponent(room) +
      "&lang=" +
      encodeURIComponent(lang) +
      "&mode=" +
      encodeURIComponent(mode);

    // Crea l'iframe "a pallino nell'angolo"
    var iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.title = "NextSphere Concierge";
    iframe.setAttribute("aria-label", "Chat concierge S&V Apartments");

    // Stili fixed in basso a destra, sopra la pagina
    var s = iframe.style;
    s.position = "fixed";
    s.bottom = "16px";
    s.right = "12px";
    s.width = "360px";
    s.maxWidth = "calc(100% - 24px)"; // 12px di margine per lato
    s.height = "520px";
    s.border = "none";
    s.background = "transparent";
    s.zIndex = "2147483647"; // il più alto possibile

    // Aggiungi al body
    document.body.appendChild(iframe);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
