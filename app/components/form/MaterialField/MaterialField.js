import React, { useEffect, useState } from "react";
import styles from "./MaterialField.module.scss";
import { ErrorMessage, Field, useField } from "formik";
import Image from "next/image";

const MaterialField = ({
  name,
  type,
  label,
  placeholder,
  tooltip,
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

    return () => (isMounted = false);
  }, [meta, props]);

  return (
    <div
      className={`${styles.fielGroup} ${className}  ${
        props.as === "select" && styles.select
      }`}
    >
      <div className={`${styles.fieldContainer} ${isFilled && styles.filled}`}>
        {/* Label */}
        {label && (
          <label
            className={`${styles.label} ${
              meta.touched && meta.error && styles.error
            }`}
            htmlFor={name}
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
          </label>
        )}

        {/* Field */}
        <Field
          className={`${styles.field} ${type === "date" && styles.dateField} ${
            type === "file" && styles.fileField
          } ${meta.touched && meta.error && styles.error}`}
          name={name}
          id={name}
          type={type}
          placeholder={placeholder}
          {...props}
        >
          {children && props.as === "select" && children}
        </Field>
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

export default MaterialField;
