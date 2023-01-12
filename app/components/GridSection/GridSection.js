import GridItemComponent from "../GridItemComponent/GridItemComponent";
import styles from "./GridSection.module.scss";

export const GridSection = ({ children, ...props }) => {
  const data = [
    {
      title: "Bases",
      subtitle: null,
      items: [
        {
          id: "1",
          content: "Contesta tu <b>kilotest</b> a partir del 30 de enero",
          anotherChild: false,
        },
        {
          id: "2",
          content: "Para contestar tu <b>kilotest</b> necesitarás tener:",
          anotherChild: true,
          listItems: [
            {
              id: "1",
              content:
                "Foto de la báscula o ticket de tu peso (en kilogramos, no libras)",
            },
            {
              id: "2",
              content:
                "Foto de cuerpo completo (con ropa ajustada, no suelta ni holgada)",
            },
            {
              id: "3",
              content:
                "Medida de tu circunferencia abdominal (necesitarás una cinta métrica)",
            },
          ],
        },
      ],
      footer:
        "Importante: el <b>kilotest</b> es requisito indispensable para poder participar en el kilotón",
    },
    {
      title: "Puntos",
      subtitle: null,
      items: [
        {
          id: "1",
          content:
            "Obtén puntos mostrando tus avances a través del <b>kilotest</b> o cada 15 días para incrementar tu puntaje",
          anotherChild: false,
        },
        {
          id: "2",
          content: "En total deberán ser 7 interacciones durante 12 semanas.",
          anotherChild: false,
        },
        {
          id: "3",
          content:
            "Entre más puntos tengas, podrás canjearlos por premios más grandes.",
          anotherChild: false,
        },
      ],
      footer: null,
    },
    {
      title: "Premios",
      subtitle: null,
      items: [
        {
          id: "1",
          content:
            "<b>A partir de tu semana 12</b>, podrás canjear tus puntos por distintos premios.",
          anotherChild: false,
        },
        {
          id: "2",
          content:
            "Si lo decides, puedes acumular tus puntos para ir por premios más grandes.",
          anotherChild: false,
        },
        {
          id: "3",
          content:
            "Para no perder tus puntos, tendrás que redimirlos antes del <b>31 de diciembre de 2023.</b> *Después de esta fecha comenzarás desde cero.",
          anotherChild: false,
        },
        {
          id: "4",
          content:
            "Una vez que canjees tus puntos, <b>el área de Bienestar te contactará</b> para hacerte llegar tu premio.",
          anotherChild: false,
        },
        {
          id: "5",
          content:
            "Cualquier duda o comentario, puedes escribir a <b>kilotón@elektra.com.mx</b>",
          anotherChild: false,
        },
      ],
      footer: null,
    },

    {
      title: "Beneficios",
      subtitle: "Solo por participar en el kilotón Total, tienes acceso a:",
      items: [
        {
          id: "2",
          content:
            "Consultas remotas completamente gratis con <b>doctores, nutriólogos y psicólogos</b>, que te ayudarán a alcanzar tu objetivo.",
          anotherChild: false,
        },
      ],
      footer: null,
      image: {
        url: "asdasdasdadsa",
        width: "230px",
      },
    },
  ];

  // const _renderGridItems = data.map((item,i) => {

  // })

  const _renderGridItems = (data) =>
    data.map((item, i) => {
      return <GridItemComponent key={i} data={item} />;
    });

  return (
    <section id="bases" className={styles.section} {...props}>
      <div className={`${styles.mainContainer} container position-relative`}>
        <div className={`${styles.gridContainer} row`}>
          {_renderGridItems(data)}
        </div>
        <div className={`${styles.cross}`}></div>
      </div>
    </section>
  );
};
