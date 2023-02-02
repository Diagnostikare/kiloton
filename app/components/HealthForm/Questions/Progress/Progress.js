import MaterialField from "../../../form/MaterialField/MaterialField";
import styles from "./Progress.module.scss";
import { useFormikContext, useField } from "formik";

export default function Progress() {
  const { setFieldValue } = useFormikContext();

  const getFieldValue = (name) => {
    const field = useField(name);
    return field.value;
  };

  return (
    <>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <strong className={`${styles.formTitle} mb-2`}>
            Queremos conocer tus hábitos
          </strong>
        </div>
      </div>
      <hr className="mb-3" />

      <div className="row">
        <div className="col-12 mb-5">
          <span className={styles.title}>
            Esta información nos ayudará a evaluar tu progreso
          </span>
        </div>
      </div>

      {/* Form */}
      <div className="row mb-4">
        <div className="col-12 col-md-6">
          <MaterialField
            name="data.weight"
            label="Peso al día de hoy (kg)"
            type="text"
          />
        </div>
        <div className="col-12 col-md-6">
          <MaterialField
            name="weight_image"
            label="Sube una imagen de cuerpo entero"
            type="file"
            value={getFieldValue("weight_image")}
            accept=".jpg, .jpeg, .png"
            helper="jpeg, jpg, png, máximo 10MB"
            // save image in formik
            onChange={(e) => {
              console.log(e.currentTarget.files[0]);
              setFieldValue("weight_image", e.currentTarget.files[0]);
            }}
          />
        </div>
        <div className="col-12 col-md-6">
          <MaterialField
            name="data.waist_centimeters"
            label="Circunferencia de cintura (cm)"
            type="text"
          />
        </div>
        <div className="col-12 col-md-6">
          <MaterialField
            name="waist_image"
            label="Sube foto de la báscula o ticket de tu peso"
            type="file"
            value={getFieldValue("waist_image")}
            accept=".jpg, .jpeg, .png"
            helper="jpeg, jpg, png, máximo 10MB"
            onChange={(e) => {
              console.log(e.currentTarget.files[0]);
              setFieldValue("waist_image", e.currentTarget.files[0]);
            }}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <span className={styles.note}>
            *Las fotos deberán tomarse de cuerpo completo donde tu cara sea
            visible.
          </span>
        </div>
      </div>
    </>
  );
}
