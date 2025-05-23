import type { ReactNode } from "react";
// import { preload } from "react-dom";
import "../styles.css";
// import { Provider } from "#components/audio/audio-player";
import { Footer } from "../footer";
import { Nav } from "../nav";

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
    <html lang="en" suppressHydrationWarning className="h-full">
      <head suppressHydrationWarning>
        <title>The Bikeshed Pod</title>
      </head>
      <body className="h-full flex flex-col">
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
