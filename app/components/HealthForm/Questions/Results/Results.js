import styles from "./Results.module.scss";
import ChartBMI from "../../../ChartBMI/ChartBMI";
import ChartCentimeters from "../../../ChartCentimeters/ChartCentimeters";
import ChartKilograms from "../../../ChartKilograms/ChartKilograms";
import { useContext } from "react";
import Context from "../../../../context/context";

export default function Results(props) {
  const { user } = useContext(Context);

  return (
    <>
      <div className="row">
        <div className="col-12 mb-3">
          <span className={`bold`}>Tu índice de masa corporal:</span>
        </div>
        <div className="col-12 col-md-6">
          <ChartBMI height={user.height} weight={user.data.weight} />
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-12 mb-3">
          <span className={`bold`}>
            Resultado de la circunferencia abdominal:
          </span>
        </div>
        <div className="col-12 col-md-6">
          <ChartCentimeters
            sex={user.data.sex}
            waist={user.data.waist_centimeters}
          />
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-12 mb-3">
          <span className={`bold`}>
            Promedio recomendado de pérdida de peso
          </span>
          <small className="d-block">(con base en el IMC, cifra en kg)</small>
        </div>
        <div className="col-12 col-md-6">
          <ChartKilograms height={user.height} weight={user.data.weight} />
        </div>
      </div>

      <hr className="mb-5" />

      <div className="row">
        <div className={`${styles.note} col-12 col-md-8 mb-3 mx-auto`}>
          <span className="mb-3">
            Pronto recibirás tu informe completo y las instrucciones para subir
            tu progreso
          </span>
          <small>
            A partir del 3 de marzo podrás entrar al kilotón para empezar a
            obtener puntos.
          </small>
        </div>
      </div>
    </>
  );
}
