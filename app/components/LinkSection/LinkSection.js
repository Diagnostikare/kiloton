import styles from "./LinkSection.module.scss";

export const LinkSection = ({ children, ...props }) => {
  return (
    <section className={styles.section} {...props}>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className={`${styles.body} col-12 gap-4 `}>
            <h2 className={styles.titleLink}>Conoce más sobre el kilotón</h2>
            <button className={styles.buttonLink}>
              <a
                className={`${styles.linkText}`}
                rel="noreferrer"
                target="_blank"
                href="https://www.movil.gs/kilotonTotalGS/bases"
              >
                Consulta las bases
              </a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
