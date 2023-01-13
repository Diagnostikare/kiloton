import Link from "next/link";
import styles from "./LinkSection.module.scss";

export const LinkSection = ({ children, ...props }) => {
  return (
    <section className={styles.section} {...props}>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className={`${styles.body} col-12 gap-4 `}>
            <h2 className={styles.titleLink}>Conoce más sobre el kilotón</h2>
            <Link
              className={`${styles.buttonLink}`}
              rel="noreferrer"
              target="_blank"
              href="https://www.movil.gs/kilotonTotalGS/bases"
            >
              Consulta las bases
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
