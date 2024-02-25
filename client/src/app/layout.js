import { Inter } from "next/font/google";
import "./globals.css";
import { CookiesProvider } from 'next-client-cookies/server';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Course Advising Portal",
  description: "CS518 Project",
};

export default function RootLayout({ children }) {
  return (
    <CookiesProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </CookiesProvider>
  );
}
