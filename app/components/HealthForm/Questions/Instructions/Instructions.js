import styles from "./Instructions.module.scss";
import dataCopies from "./Instructions.json";
import Image from "next/image";

export default function Instructions(props) {
  const _renderInstructions = (instructions) =>
    instructions.map((item, index) => (
      <li key={index} className={styles.item}>
        <Image src={item.icon} alt={item.text} width={30} height={30} />
        <span>{item.text}</span>
      </li>
    ));

  return (
    <>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <strong className={`${styles.formTitle} mb-2`}>
            Antes de comenzar, ten a la mano:
          </strong>
        </div>
      </div>

      <hr className="mb-5" />

      <div className="row">
        <div className="col-12">
          <ul className={styles.list}>
            {_renderInstructions(dataCopies.instructions)}
          </ul>
        </div>
      </div>
    </>
  );
}
