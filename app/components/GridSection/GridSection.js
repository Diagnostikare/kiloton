import GridItemComponent from "../GridItemComponent/GridItemComponent";
import styles from "./GridSection.module.scss";
import componentData from "./gridSection.json";

export const GridSection = ({ children, ...props }) => {
  const _renderGridItems = (data) =>
    data.map((item, i) => {
      return <GridItemComponent key={i} data={item} />;
    });

  return (
    <section id="bases" className={styles.section} {...props}>
      <div className={`${styles.mainContainer} container position-relative`}>
        <div className={`${styles.gridContainer} row`}>
          {_renderGridItems(componentData.data)}
        </div>
        <div className={`${styles.cross}`}></div>
      </div>
    </section>
  );
};
