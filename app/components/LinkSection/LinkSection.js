import styles from './LinkSection.module.scss'

export const LinkSection = ({ children, ...props }) => {
  return (
    <section className={styles.section} {...props}>
      <div className='container'>
        <div className='row align-items-center justify-content-center'>
          <div className='col-12 d-flex justify-content-around gap-4 align-items-center'>
            <h2 className={styles.titleLink}>
              Conoce más sobre el kilotón
            </h2>
            <button className={styles.buttonLink}>
              <a>
                Consulta las bases
              </a>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
