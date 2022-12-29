import styles from "./Header.module.scss";
import Button from "../Button/Button";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <a href="#" className={styles.logo}>
          <Image
            className={styles.logo}
            raw
            alt="Kilotón"
            width={344}
            height={128}
            src="/assets/images/brand/logo-default.png"
          />
        </a>

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
          <li>
            <Button href="#" variant="primary">
              Quiero participar
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
