import React, { useContext, useState } from "react";
import Image from "next/image";
import styles from "./HeaderMobile.module.scss";
import buttonStyles from "../Button/Button.module.scss";
import { scrollToElement } from "../../common/helpers";
import Button from "../Button/Button";
import Context from "../../context/context";
import Link from "next/link";

export default function HeaderMobile({ options }) {
  const { setOpenLogin } = useContext(Context);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const _renderMenuOptions = (options) =>
    options.map((option, index) => (
      <li key={index}>
        <a
          className={styles.item}
          href={option.link}
          onClick={(event) => (
            setMenuOpen(!isMenuOpen), scrollToElement(event, 57)
          )}
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

          <button
            type="button"
            className={styles.burger}
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
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
          <button
            type="button"
            className={styles.close}
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
        <nav className={styles.mainMenu}>
          <ul className={styles.list}>
            {_renderMenuOptions(options)}
            <li className="p-3">
              <Link
                className={`${buttonStyles.button} ${buttonStyles.secondary}`}
                rel="noreferrer"
                href="https://reto.kilotontotal.com/login"
              >
                <span>Quiero hacer mi &nbsp;</span>
                <b>kilotest</b>
              </Link>
            </li>
            <li className="p-3">
              <Link
                className={`${buttonStyles.button} ${buttonStyles.primary}`}
                rel="noreferrer"
                href="https://reto.kilotontotal.com/registro"
              >
                Inscríbete ya
              </Link>
            </li>
          </ul>
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
