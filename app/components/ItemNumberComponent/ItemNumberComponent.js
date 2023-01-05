
import styles from './ItemNumberComponent.module.scss'

const ItemNumberComponent = ({data,...props}) => {
  return (
    <div className='col-3 d-flex'>
      <div className={`${styles.circleContainer}`}>
      <div className={`${styles.circle}`}>
        <span className={`title bold ${styles.spanNumber}`}>
          {data.id}
        </span>
      </div>
      </div>
      <div className={`${styles.textContainer}`}>
        <p className=""><strong>{data.title}</strong></p>
        <p>{data.subtitle}</p>
      </div>
    </div>
  
  )
}

export default ItemNumberComponent
