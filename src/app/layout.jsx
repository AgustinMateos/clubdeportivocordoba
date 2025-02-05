import "./globals.css";
import NavbarComponente from "@/components/NavbarComponente";

export const metadata = {
  title: "Club de Córdoba",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Montserrat&family=Inter&display=swap" 
          rel="stylesheet" 
        />
      </head>

      <body>
        <NavbarComponente />
        {children}
      </body>
    </html>
  );
}