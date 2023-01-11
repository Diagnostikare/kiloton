import styles from "./IconRadio.module.scss";
import Image from "next/image";
import { useFormikContext, Field, useField, useFormik } from "formik";

export default function IconRadio({
  name,
  type,
  label,
  value,
  defaultIcon,
  selectedIcon,
  placeholder,
  tooltip,
  className,
  children,
  validate,
  ...props
}) {
  const { values } = useFormikContext();
  const [field, meta] = useField(name);

  return (
    <div className={`${styles.formGroup} form-check form-check-inline`}>
      <label className={`${styles.radio} form-check-label`}>
        {values[name] === value && (
          <Image
            className={styles.icon}
            raw="true"
            src={selectedIcon}
            width={72}
            height={72}
            alt="Selected icon"
          />
        )}

        {values[name] !== value && (
          <Image
            className={styles.icon}
            raw="true"
            src={defaultIcon}
            width={72}
            height={72}
            alt="Default icon"
          />
        )}

        {label && (
          <span
            className={styles.label}
            //Style validation for selected radio
            style={{
              color: values[name] === value ? props.color : "white",
            }}
          >
            {label}
          </span>
        )}

        <Field
          className={styles.field}
          type="radio"
          name={name}
          id={name}
          value={value}
        />
      </label>
    </div>
  );
}
