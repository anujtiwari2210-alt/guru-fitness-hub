import { Anton, Barlow } from "next/font/google";
import IntroProvider from "@/components/Intro";
import constants from "@/data/constants.json";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata = {
  title: constants.seo.title,
  description: constants.seo.description,
  icons: {
    icon: constants.favicon,
    shortcut: constants.favicon,
    apple: constants.favicon,
  },
};
export const viewport = { themeColor: "#0A0A0A" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${anton.variable} ${barlow.variable}`}>
      <body>
        <IntroProvider>{children}</IntroProvider>
      </body>
    </html>
  );
}
