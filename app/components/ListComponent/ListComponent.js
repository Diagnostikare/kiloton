import React from 'react'
import styles from './ListComponent.module.scss'

const ListComponent = ({data}) => {


  const _renderListChild = (data) => data.map((item,i) => {
    return (
      <li key={i} className={styles.listChild}>
        {item.content}
      </li>
    )
  })

  return (
    <li className={styles.listClass}>
      <span
      className={styles.spanText}
      dangerouslySetInnerHTML={{ __html: data.content }}
      >
      </span>
        {data.anotherChild && 
        <ol>
          {(_renderListChild(data.listItems))}
        </ol>
        }
    </li>
  )
}

export default ListComponent