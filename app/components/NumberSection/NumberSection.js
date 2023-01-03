import styles from "./NumberSection.module.scss";



export const NumberSection = ({ children, ...props }) => {
  return (
    <section className={styles.section} {...props}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className={`title bold ${styles.title}`}>¿Cómo participar?</h2>
          </div>
          <div className="col-4 d-flex">
            <div className={`${styles.circle}`}>
              <span className={`title bold ${styles.spanNumber}`}>
                1
              </span>
            </div>
            <div className={`${styles.textContainer}`}>
            <p className=""> <strong>Regístrate</strong></p>
            <p>Realiza tu registro para comenzar</p> 
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

