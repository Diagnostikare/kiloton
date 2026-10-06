import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const plus = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "kilotón total",
  description:
    "Activa tu mejor versión con kilotón total, el programa de bienestar de Grupo Salinas.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={plus.className}>
        <main>
          <Header />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
