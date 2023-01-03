import styles from "./Footer.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Footer(props) {
  return (
    <footer id="footer" className={styles.footer} {...props}>
      <div className="container">
        <div className="row">
          <div
            className={`${styles.footerLogos} col-12 col-sm-6 col-md-4 col-lg-3`}
          >
            <div className={styles.footerLogo}>
              <Image
                raw="true"
                src="/assets/brand/logo-white.png"
                width={108}
                height={40}
                alt="Kilotón"
              />
            </div>
            <div className={styles.footerLogo}>
              <Image
                raw="true"
                src="/assets/brand/diagnostikare-white.png"
                width={139}
                height={23}
                alt="Kilotón"
              />
            </div>
            <div className={styles.footerLogo}>
              <Image
                raw="true"
                src="/assets/brand/salud-gs-white.png"
                width={73}
                height={40}
                alt="Kilotón"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ul className={styles.footerList}>
              <li>
                <Link href="tel:+55 33 33 11 22">+55 33 33 11 22</Link>
              </li>
              <li>
                <Link href="mailto:kilotón@elektra.com.mx">
                  kilotón@elektra.com.mx
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ul className={styles.footerList}>
              <li>
                <Link href="#">Sobre el programa</Link>
              </li>
              <li>
                <Link href="#">Testimonios</Link>
              </li>
              <li>
                <Link href="#">Premios</Link>
              </li>
              <li>
                <Link href="#">¿Cómo participar?</Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ul className={styles.footerList}>
              <li>
                <Link href="#">Bases del kilotón</Link>
              </li>
              <li>
                <Link href="#">Términos y condiciones</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
