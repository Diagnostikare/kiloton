"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "./components/Header/Header";
import Head from "./head";
import Footer from "./components/Footer/Footer";
import Context from "./context/context";
import { useState } from "react";

const plus = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(0);
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <Context.Provider
      value={{ user, setUser, step, setStep, openLogin, setOpenLogin }}
    >
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
    </Context.Provider>
  );
}
