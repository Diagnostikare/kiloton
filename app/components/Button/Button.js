import styles from "./Button.module.scss";
export default function Button({ children, variant, className, ...props }) {
  // If as prop is button, return a button element
  if (props.as && props.as === "button") {
    return (
      <button
        className={`${styles.button} ${
          variant && styles[variant]
        } ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  // else return an anchor element
  return (
    <a
      className={`${styles.button} ${variant && styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
