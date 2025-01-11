import { Nav } from "~/components/nav";
import "./globals.css";

export const metadata = {
  title: "Bikeshed Pod",
  description: "Where developers debate the small stuff that matters",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
