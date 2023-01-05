import Image from 'next/image'
import ListComponent from '../ListComponent/ListComponent'
import styles from './GridItemComponent.module.scss'


const GridItemComponent = ({ data, ...props }) => {
  console.log(data.items, "desde items")
  const { title,subtitle } = data

  const _renderListItems = (data) => data.map((item, i) => {
    return (
      <ListComponent key={i} data={item} />
    )
  })

  return (
    <div className={`${styles.gridContainer} col-6 d-flex flex-column p-4`}>
      <h2 className=''>{title}</h2>
      {subtitle && (
        <p className='mt-4'>{subtitle}</p>
      )}
      <ul className="">
        {_renderListItems(data.items)}
      </ul>

      {data.footer && (
         <span
         className={styles.spanText}
         dangerouslySetInnerHTML={{ __html: data.footer }}
         >
         </span>
      )}

      {data.image && (
        <Image
        raw="true"
        src="/assets/images/landing/gridSection/Diagnostikare_Powered_Gray.svg"
        width={150}
        height={48}
        alt="quote icon"
        />

      )}

    </div>
  )
}

export default GridItemComponent