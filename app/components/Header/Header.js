"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Header.module.scss";
import buttonStyles from "../Button/Button.module.scss";
import componentData from "./Header.json";
import Button from "../Button/Button";
import Image from "next/image";
import HeaderMobile from "../HeaderMobile/HeaderMobile";
import { scrollToElement } from "../../common/helpers";
import Context from "../../context/context";
import Link from "next/link";

export default function Header() {
  const { setStep, setOpenLogin } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const _renderMenuOptions = (options) =>
    options.map((option, index) => (
      <li key={index}>
        <a className={styles.item} href={option.link} onClick={scrollToElement}>
          {option.name}
        </a>
      </li>
    ));

  useEffect(() => {
    handleResize();
    setIsLoading(false);
    // Add resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) return null;

  if (isMobile) return <HeaderMobile options={componentData.menuOptions} />;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <a href="#heroImage" className={styles.logo}>
          <Image
            className={styles.logo}
            raw="true"
            alt="kilotón"
            width={344}
            height={134}
            src="/assets/brand/logo-gray.png"
          />
        </a>

        <ul className={styles.list}>
          {_renderMenuOptions(componentData.menuOptions)}
          <li>
            <Link
              className={`${buttonStyles.button} ${buttonStyles.secondary}`}
              rel="noreferrer"
              href="https://reto.kilotontotal.com/login"
            >
              Iniciar sesión
            </Link>
          </li>
          <li>
            <Link
              className={`${buttonStyles.button} ${buttonStyles.primary}`}
              rel="noreferrer"
              href="https://reto.kilotontotal.com/registro"
            >
              Quiero participar
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
