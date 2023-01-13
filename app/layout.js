import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import { Plus_Jakarta_Sans } from "@next/font/google";
import Header from "./components/Header/Header";
import Head from "./head";
import Footer from "./components/Footer/Footer";

const plus = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html>
      <Head />
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
