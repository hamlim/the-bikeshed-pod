import type { ReactNode } from "react";
import { preload } from "react-dom";
import "../styles.css";
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

function WIPBanner() {
  return (
    <div className="wip-banner py-2 flex justify-center items-center">
      <style precedence="high" href="hack">{`.wip-banner {
  background: repeating-linear-gradient(
    -45deg,
    var(--uchu-yellow-4) 0,
    var(--uchu-yellow-4) 10px,
    var(--uchu-yin-7) 10px,
    var(--uchu-yin-7) 20px
  );
}`}</style>
      <p className=" text-white bg-black text-center font-bold px-4">
        ⚠️ This site is a work in progress! ⚠️
      </p>
    </div>
  );
}

export default function Root({ children }: { children: ReactNode }) {
  // @TODO: Make sure this preload is used below in the body!
  // geist-regular / geist sans isn't used currently
  // preload(`/geist-regular.woff2`, { as: "font" });
  preload(`/geistmono-regular.woff2`, { as: "font" });
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <title>The Bikeshed Pod</title>
        <meta
          name="description"
          content="Where developers debate the small stuff that matters"
        />
      </head>
      <body className="font-(family-name:--font-geist-mono)">
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: `(${themeCheck.toString()})()` }}
        />
        <WIPBanner />
        <Nav />
        {children}
      </body>
    </html>
  );
}
