
import styles from './ItemNumberComponent.module.scss'

const ItemNumberComponent = ({data,...props}) => {
  return (
    <div className={`${styles.mainContainer} col-12 col-md-4 col-lg-3`}>
      <div className={`${styles.circleContainer}`}>
      <div className={`${styles.circle}`}>
        <span className={`title bold ${styles.spanNumber}`}>
          {data.id}
        </span>
      </div>
      </div>
      <div className={`${styles.textContainer}`}>
        <div className='d-flex gap-0'>
        <p className={`${styles.spanTitle}`}><strong>{data.title}</strong></p>
        </div>

        <div className='d-flex gap-0'>
          <p className={`${styles.spanSubtitle}`}>{data.subtitle}</p>
        </div>
      </div>
    </div>
  
  )
}

export default ItemNumberComponent
