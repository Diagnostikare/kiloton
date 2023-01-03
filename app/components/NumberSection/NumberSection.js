import styles from "./NumberSection.module.scss";



export const NumberSection = ({ children, ...props }) => {
  return (
    <section className={styles.section} {...props}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className={`title bold ${styles.title}`}>¿Cómo participar?</h2>
          </div>
        </div>
      </div>
    </section>
  )
}

