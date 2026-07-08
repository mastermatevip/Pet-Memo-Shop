const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Inter:wght@400;600&display=swap";

/** Non-blocking Google Fonts — avoids render-blocking CSS in root layout. */
export function AsyncGoogleFonts() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preload" as="style" href={FONT_HREF} />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='${FONT_HREF}';document.head.appendChild(l);})();`,
        }}
      />
      <noscript>
        <link href={FONT_HREF} rel="stylesheet" />
      </noscript>
    </>
  );
}
