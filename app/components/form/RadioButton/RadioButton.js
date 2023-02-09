import React, { useEffect, useState } from "react";
import styles from "./RadioButton.module.scss";
import { ErrorMessage, Field, useField } from "formik";
import Image from "next/image";

const RadioButton = ({
  id,
  name,
  type,
  label,
  placeholder,
  tooltip,
  className,
  children,
  validate,
  icon,
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
      } ${isFilled && styles.filled}`}
    >
      <div className={styles.fieldContainer}>
        {/* Field */}
        <Field
          className={`${styles.field} ${type === "date" && styles.fieldDate} ${
            meta.touched && meta.error && styles.error
          }`}
          name={name}
          id={id || name}
          type={type}
          placeholder={placeholder}
          {...props}
        >
          {children && props.as === "select" && children}
        </Field>

        {/* Label */}
        {label && (
          <label
            className={`${styles.label} ${
              meta.touched && meta.error && styles.error
            } ${icon && styles.withIcon}`}
            htmlFor={id}
          >
            {icon && (
              <Image
                // raw="true"
                src={icon}
                width={116}
                height={50}
                alt="info"
                className={styles.icon}
              />
            )}

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

export default RadioButton;
