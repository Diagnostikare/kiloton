import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import { Plus_Jakarta_Sans } from "@next/font/google";
import Header from "./components/Header/Header";

const plus = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body className={plus.className}>
        <main>
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
