"use client";

import { useEffect } from "react";

const GTM_ID = "GTM-TMKW8PTT";
const GTM_SCRIPT_ATTR = "data-petmemoshop-gtm";

const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

/** Storefront only — mount from `[locale]/layout`, not admin. */
function loadGtm() {
  if (document.querySelector(`script[${GTM_SCRIPT_ATTR}]`)) return;

  const script = document.createElement("script");
  script.setAttribute(GTM_SCRIPT_ATTR, GTM_ID);
  script.text = gtmScript;
  document.head.prepend(script);

  const noscript = document.createElement("noscript");
  noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
  document.body.prepend(noscript);
}

export function StorefrontGoogleTagManager() {
  useEffect(() => {
    const schedule =
      typeof window.requestIdleCallback === "function"
        ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 3000 })
        : (cb: () => void) => window.setTimeout(cb, 2000);

    const idleId = schedule(loadGtm);
    return () => {
      if (typeof window.requestIdleCallback === "function" && typeof idleId === "number") {
        window.cancelIdleCallback(idleId);
      } else if (typeof idleId === "number") {
        window.clearTimeout(idleId);
      }
    };
  }, []);

  return null;
}
