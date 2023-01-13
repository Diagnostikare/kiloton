import React, { useState } from "react";
import Image from "next/image";
import Button from "../Button/Button";
import styles from "./HeaderMobile.module.scss";

export default function HeaderMobile({ options }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const scrollToOffset = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("href");
    const element = document.querySelector(target);
    const offset = 57;
    window.scrollTo({
      top: element.offsetTop - offset,
      behavior: "smooth",
    });
  };

  const _renderMenuOptions = (options) =>
    options.map((option, index) => (
      <li key={index}>
        <a
          className={styles.item}
          href={option.link}
          onClick={(event) => (handleMenu(), scrollToOffset(event))}
        >
          {option.name}
        </a>
      </li>
    ));

  return (
    <>
      {/* Header */}
      <header className={styles.headerMobile}>
        <div className={`container ${styles.headerMobileContainer}`}>
          <a href="#heroImage" className={styles.logo}>
            <Image
              className={styles.logo}
              raw="true"
              alt="kilotón"
              width={344}
              height={134}
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
            className={styles.logoWhite}
            raw="true"
            src="/assets/brand/logo-white.png"
            width={216}
            height={124}
            alt="kilotón"
          />
          <button type="button" className={styles.close} onClick={handleMenu}>
            <span></span>
            <span></span>
          </button>
        </div>
        <nav className={styles.mainMenu}>
          <ul className={styles.list}>{_renderMenuOptions(options)}</ul>
        </nav>
        <div className={styles.menuFooter}>
          <Image
            raw="true"
            src="/assets/brand/salud-gs-white.png"
            width={73}
            height={40}
            alt="kilotón"
          />
        </div>
      </div>
    </>
  );
}
