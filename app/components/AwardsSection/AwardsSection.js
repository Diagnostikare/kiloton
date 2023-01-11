import Image from "next/image";
import styles from "./AwardSection.module.scss";

export const AwardsSection = ({ children, ...props }) => {
  return (
    <section id="prizes" className={styles.sectionContainer} {...props}>
      <Image
        priority
        className={styles.image}
        raw="true"
        alt="Kilotón"
        width={1440}
        height={792}
        src="/assets/images/landing/award/awards.png"
      />

      <div className="container">
        <div className={`${styles.rowContainer} row`}>
          <div className={`${styles.bodyContainer} col-12`}>
            <div className={`${styles.imageContainer}`}>
              <Image
                priority
                className={styles.imageStar}
                raw="true"
                alt="estrellas"
                width={47}
                height={45}
                src="/assets/images/landing/award/star.svg"
              />
              <Image
                priority
                className={styles.imageStar}
                raw="true"
                alt="estrellas"
                width={78}
                height={75}
                src="/assets/images/landing/award/star.svg"
              />
              <Image
                priority
                className={styles.imageStar}
                raw="true"
                alt="estrellas"
                width={47}
                height={45}
                src="/assets/images/landing/award/star.svg"
              />
            </div>
            <h1 className={`bold ${styles.title}`}>
              kilotón Total premia tu esfuerzo
            </h1>
          </div>

          <div className={`${styles.termsContainer} col-12`}>
            <small className={`${styles.terms}`}>
              *Cada 3 meses encuentra nuevos premios
            </small>
          </div>
        </div>
      </div>
    </section>
  );
};
