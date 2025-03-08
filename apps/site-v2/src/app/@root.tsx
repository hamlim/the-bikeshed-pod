import type { ReactNode } from "react";
import { preload } from "react-dom";
import "../styles.css";
import { Provider } from "#components/audio/audio-player";
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
  // @TODO: Make sure this preload is used below in the body!
  // geist-regular / geist sans isn't used currently
  // preload(`/geist-regular.woff2`, { as: "font" });

  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <title>The Bikeshed Pod</title>
        <meta
          name="description"
          content="Where developers debate the small stuff that matters"
        />
      </head>
      <body>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: `(${themeCheck.toString()})()` }}
        />
        <Nav />
        <Provider>{children}</Provider>
        <Footer />
      </body>
    </html>
  );
}
