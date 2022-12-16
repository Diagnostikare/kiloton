import styles from "./HeroImage.module.scss";

export default function HeroImage(props) {
  return (
    <section className={styles.heroImage} {...props}>
      <h1>
        Creemos en el poder de un estilo de vida <span>saludable</span>
      </h1>
    </section>
  );
}
