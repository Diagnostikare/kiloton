import React, { useState } from "react";
import Image from "next/image";
import Button from "../Button/Button";
import styles from "./HeaderMobile.module.scss";

export default function HeaderMobile() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Header */}
      <header className={styles.headerMobile}>
        <div className={`container ${styles.headerMobileContainer}`}>
          <a href="#heroImage" className={styles.logo}>
            <Image
              className={styles.logo}
              raw="true"
              alt="Kilotón"
              width={344}
              height={128}
              src="/assets/brand/logo-default.png"
            />
          </a>

          <button type="button" className={styles.burger} onClick={handleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      {/* Menu */}
      <div className={`${styles.menu} ${isMenuOpen && styles.open}`}>
        <div className={styles.menuHeader}>
          <Image
            raw="true"
            src="/assets/brand/logo-white.png"
            width={108}
            height={40}
            alt="Kilotón"
          />
          <button type="button" className={styles.close} onClick={handleMenu}>
            <span></span>
            <span></span>
          </button>
        </div>
        <nav className={styles.mainMenu}>
          <ul className={styles.list}>
            <li>
              <a className={styles.item} href="#">
                Programa
              </a>
            </li>

            <li>
              <a className={styles.item} href="#">
                Testimonios
              </a>
            </li>
            <li>
              <a className={styles.item} href="#">
                Premios
              </a>
            </li>
            <li>
              <a className={styles.item} href="#">
                ¿Cómo participar?
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.menuFooter}>
          <Image
            raw="true"
            src="/assets/brand/salud-gs-white.png"
            width={73}
            height={40}
            alt="Kilotón"
          />
        </div>
      </div>
    </>
  );
}
