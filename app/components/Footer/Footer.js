import styles from "./Footer.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Footer(props) {
  const columnsOneOptions = [
    {
      name: "¿Cómo participar?",
      link: "#howToParticipate",
    },
    {
      name: "Bases",
      link: "#bases",
    },
  ];

  const columnsTwoOptions = [
    {
      name: "Testimonios",
      link: "#successStories",
    },
    {
      name: "Premios",
      link: "#prizes",
    },
  ];

  const _renderMenuOptions = (options) =>
    options.map((option, index) => (
      <li key={index}>
        <a className={styles.item} href={option.link}>
          {option.name}
        </a>
      </li>
    ));

  return (
    <footer id="footer" className={styles.footer} {...props}>
      <div className="container">
        <div className="row">
          <div
            className={`${styles.footerLogos} col-12 col-sm-6 col-md-4 col-lg-2`}
          >
            <div className={styles.footerLogo}>
              <Image
                raw="true"
                src="/assets/brand/logo-white.png"
                width={216}
                height={124}
                alt="kilotón"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ul className={styles.footerList}>
              <li>
                <Link href="mailto:kilotón@elektra.com.mx">
                  kilotón@elektra.com.mx
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ul className={styles.footerList}>
              {_renderMenuOptions(columnsOneOptions)}
            </ul>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ul className={styles.footerList}>
              {_renderMenuOptions(columnsTwoOptions)}
            </ul>
          </div>
          <div
            className={`${styles.footerLogos} col-12 col-sm-6 col-md-4 col-lg-1 border-none`}
          >
            <div className={styles.footerLogo}>
              <Image
                raw="true"
                src="/assets/brand/salud-gs-white.png"
                width={73}
                height={40}
                alt="kilotón"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
