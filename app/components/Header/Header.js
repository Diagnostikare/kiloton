"use client";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import componentData from "./Header.json";
import Button from "../Button/Button";
import Image from "next/image";
import HeaderMobile from "../HeaderMobile/HeaderMobile";
import { scrollToElement } from "../../common/helpers";

export default function Header() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  let windowWidth;

  const handleResize = () => {
    windowWidth = window.innerWidth;
    setIsMobile(windowWidth < 768);
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
    let isMounted = true;

    if (isMounted) {
      windowWidth = window.innerWidth;
      handleResize();
      setIsLoading(false);
      // Add resize listener
      window.addEventListener("resize", handleResize);
    }

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
            src="/assets/brand/logo-default.png"
          />
        </a>

        <ul className={styles.list}>
          {_renderMenuOptions(componentData.menuOptions)}
          <li>
            <Button
              href="#registration"
              variant="primary"
              onClick={scrollToElement}
            >
              Quiero participar
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
