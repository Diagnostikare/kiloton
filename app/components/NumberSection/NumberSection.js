
import ItemNumberComponent from "../ItemNumberComponent/ItemNumberComponent";
import styles from "./NumberSection.module.scss";



export const NumberSection = ({ children, ...props }) => {

  const numbersArray = [
    {
      id:'1',
      title:'Regístrate',
      subtitle:'Realiza tu registro para comenzar'
    },
    {
      id:'2',
      title:'Responde tu kilotest ',
      subtitle:'Completa tu kilotest a partir del 23 de enero'
    },
    {
      id:'3',
      title:'Obtén puntos',
      subtitle:'Cada vez que subas tus avances al kilotest'
    },
    {
      id:'4',
      title:'Gana premios',
      subtitle:'Canjea tus puntos por distintos premios.'
    },
  ];


  const _renderNumbersItems = (data) => data.map((item,i) => {
    return (
      <ItemNumberComponent key={i} data={item} />
    )
  })

  return (
    <section className={styles.section} {...props}>
      <div className="container">
        <div className="row">
          <div className="col-12 mb-5">
            <h2 className={`title bold ${styles.title}`}>¿Cómo participar?</h2>
          </div>
          <>
            {_renderNumbersItems(numbersArray)}
          </>
        </div>
      </div>
    </section>
  )
}

