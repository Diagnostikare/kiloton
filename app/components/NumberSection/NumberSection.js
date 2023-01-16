import ItemNumberComponent from "../ItemNumberComponent/ItemNumberComponent";
import styles from "./NumberSection.module.scss";
import componentData from "./NumberSection.json";

export const NumberSection = ({ children, ...props }) => {
  const _renderNumbersItems = (data) =>
    data.map((item, i) => {
      return <ItemNumberComponent key={i} data={item} />;
    });

  return (
    <section id="howToParticipate" className={styles.section} {...props}>
      <div className="container">
        <div className="row">
          <div className="col-12 mb-5">
            <h2 className={`title bold ${styles.title}`}>¿Cómo participar?</h2>
          </div>
          <>{_renderNumbersItems(componentData.numbersArray)}</>
        </div>
      </div>
    </section>
  );
};
