import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Macadam Test Google",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <script
          type="text/javascript"
          src="../node_modules/tw-elements/dist/js/tw-elements.umd.min.js"></script>
      </body>
    </html>
  );
}
