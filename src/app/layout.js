import localFont from "next/font/local";
import "./globals.css";

const eduFont = localFont({
  src: "./fonts/EduAUVICWANTHand-VariableFont_wght.ttf",
  variable: "--font-edu",
  weight: "100 900",
  // ^here we specify the font weight range
})
// ^we use this version of loading fonts into our site rather than @font-face as it's better optimisied 

export const metadata = {
  title: "Pubs and Bars",
  description: "Pubs and bars recommendation site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${eduFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
