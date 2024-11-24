import { Providers } from "./providers";
import DrawerLayout from "./Components/DrawerLayout";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; // Import Montserrat font
import "./globals.css";

// Initialize the Montserrat font
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Next.js 14 App",
  description: "Created with Next.js 14 and Montserrat font",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <DrawerLayout>{children}</DrawerLayout>
        </Providers>
      </body>
    </html>
  );
}
