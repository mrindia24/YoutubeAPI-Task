import type { ReactNode } from "react";
import { CollectionProvider } from "./context/CollectionContext";
import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CollectionProvider>
          {children}
        </CollectionProvider>
      </body>
    </html>
  );
}
