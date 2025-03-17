import type { ReactNode } from "react";
// import { preload } from "react-dom";
import "../styles.css";
// import { Provider } from "#components/audio/audio-player";
import { Footer } from "./footer";
import { Nav } from "./nav";

function themeCheck() {
  let prefersDarkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  let preferred = prefersDarkModeQuery.matches ? "dark" : "light";
  document.documentElement.classList.add(preferred);
  prefersDarkModeQuery.addEventListener("change", (e) => {
    let newPreferred = e.matches ? "dark" : "light";
    document.documentElement.classList.remove(preferred);
    document.documentElement.classList.add(newPreferred);
    preferred = newPreferred;
  });
}

export default function Root({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <title>The Bikeshed Pod</title>
        <meta
          name="description"
          content="Where developers debate the small stuff that matters"
        />
        <meta property="og:title" content="The Bikeshed Pod" />
        <meta
          property="og:description"
          content="Where developers debate the small stuff that matters"
        />
        <meta property="og:image" content="/bikeshed-pod-square.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bikeshedpod.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/bikeshed-pod-square.png" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: `(${themeCheck.toString()})()` }}
        />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
