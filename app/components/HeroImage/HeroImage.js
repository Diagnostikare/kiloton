import styles from "./HeroImage.module.scss";
import buttonStyles from "../Button/Button.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function HeroImage(props) {
  return (
    <section id="heroImage" className={styles.hero} {...props}>
      <Image
        priority
        className={styles.image}
        alt="kilotón"
        width={1920}
        height={1080}
        src="/assets/images/landing/hero/kiloton2026.png"
      />
      <div className={`container ${styles.heroContent}`}>
        <div className="row d-flex flex-column-reverse flex-md-row">
          <div className="col-12 col-sm-10 col-lg-6">
            <h1 className={`title bold ${styles.title}`}>
              ¡Activa tu mejor versión!
            </h1>
            <h3 className="text-white">
              Con <strong className="bold">kilotón total,</strong> cada cambio
              cuenta.
              <br />
              Acumula puntos y <strong>gana premios</strong> <br /> durante todo
              el año
            </h3>
            <div className={styles.buttons}>
              <Link
                className={`${buttonStyles.button} ${buttonStyles.primary} ${styles.signUpButton}`}
                href="https://reto.kilotontotal.com/registro"
                rel="noreferrer"
                target="_blank"
                aria-label="Quiero participar"
              />
              <Link
                className={`${buttonStyles.button} ${buttonStyles.primary} ${styles.loginButton}`}
                href="https://reto.kilotontotal.com/login"
                rel="noreferrer"
                target="_blank"
              >
                <div className={styles.divText}>
                  <span>Quiero hacer mi &nbsp;</span>
                  <b>kilotest</b>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-12 col-sm-10 col-lg-6" />
        </div>
      </div>
    </section>
  );
}
