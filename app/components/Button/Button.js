import styles from "./Button.module.scss";
export default function Button({ children, variant, ...props }) {
  return (
    <a className={`${styles.button} ${variant && styles[variant]}`} {...props}>
      {children}
    </a>
  );
}
