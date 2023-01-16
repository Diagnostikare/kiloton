"use client";
import styles from "./HeroImage.module.scss";
import Button from "../Button/Button";
import Image from "next/image";
import { scrollToElement } from "../../common/helpers";

export default function HeroImage(props) {
  return (
    <section id="heroImage" className={styles.hero} {...props}>
      <Image
        priority
        className={styles.image}
        raw="true"
        alt="kilotón"
        width={1440}
        height={792}
        src="/assets/images/landing/hero/hero-image.jpg"
      />
      <div className={`container ${styles.heroContent}`}>
        <div className="row">
          <div className="col-12 col-sm-10 col-lg-6">
            <h1 className={`title bold ${styles.title} mb-4`}>
              Con el nuevo kilotón, <br />
              todos ganan.
              <br />
              <span className={styles.uderline}>¡Inscríbete!</span>
            </h1>
            <p className={styles.content}>
              Participas todo el año, acumulas puntos y ganas premios increíbles
            </p>
            <Button
              href="#registration"
              variant="primary"
              onClick={scrollToElement}
            >
              Quiero participar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
