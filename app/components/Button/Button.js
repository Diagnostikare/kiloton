import styles from "./Button.module.scss";
export default function Button({ children, ...props }) {
  return (
    <a className={styles.button} {...props}>
      {children}
    </a>
  );
}
