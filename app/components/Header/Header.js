import styles from "./Header.module.scss";
import Button from "../Button/Button";

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="#" className={styles.logo}>
        logo
      </a>
      <ul className={styles.list}>
        <li>
          <a href="#">¿Cómo participar?</a>
        </li>
        <li>
          <a href="#">Premios</a>
        </li>
        <li>
          <a href="#">Testimonios</a>
        </li>
        <li>
          <Button href="#">Quiero participar</Button>
        </li>
      </ul>
    </header>
  );
}
