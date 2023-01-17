import styles from "./Loader.module.scss";

export default function Loader({ className, ...props }) {
  return (
    <div className={`${styles.loader} ${className}`} {...props}>
      {/* Text */}
    </div>
  );
}
