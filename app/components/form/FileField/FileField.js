import React, { useEffect, useState } from "react";
import styles from "./FileField.module.scss";
import { ErrorMessage, Field, useField } from "formik";
import Image from "next/image";

const FileField = ({
  name,
  type,
  label,
  placeholder,
  tooltip,
  helper,
  className,
  children,
  validate,
  ...props
}) => {
  const [field, meta] = useField(name);
  const [isFilled, setFilled] = useState(false);

  // Toggle the filled state when the field meta changes
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (!props.as && meta.value) {
        setFilled(meta.value.length > 0);
      }
    }
  }, [meta, props]);

  return (
    <div
      className={`${styles.fielGroup} ${className}  ${
        props.as === "select" && styles.select
      }`}
    >
      <div className={`${styles.fieldContainer} ${isFilled && styles.filled}`}>
        {label && (
          <span
            className={`${styles.label} ${
              meta.touched && meta.error && styles.error
            }`}
          >
            {label}

            {/* Tootip */}
            {tooltip && (
              <div className={styles.tooltip}>
                <Image
                  raw="true"
                  src="/assets/icons/landing/form/info-icon.svg"
                  width={20}
                  height={20}
                  alt="info"
                />
                <span dangerouslySetInnerHTML={{ __html: tooltip }} />
              </div>
            )}
          </span>
        )}
        {/* Label */}
        <label
          className={`${styles.field} ${
            meta.touched && meta.error && styles.error
          }`}
          htmlFor={name}
        >
          {meta.value ? meta.value?.name : placeholder}
        </label>

        {/* Field */}
        <Field
          name={name}
          id={name}
          type={type}
          hidden={true}
          value=""
          placeholder={placeholder}
          {...props}
        >
          {children && props.as === "select" && children}
        </Field>
        {helper && <small className={styles.helper}>{helper}</small>}
      </div>
      {/* Errormessage */}
      {meta.touched && meta.error && validate !== false && (
        <div className={styles.errorMessage}>
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};

export default FileField;
