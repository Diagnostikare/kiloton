import RegistrationForm from "../RegistrationForm/RegistrationForm";
import styles from "./FormSection.module.scss";

export const FormSection = ({ children, ...props }) => {
  return (
    <section className={styles.section} {...props}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-10 col-lg-4 my-auto">
            <h2 className={`title bold ${styles.title}`}>
              ¡Participa y gana salud!
            </h2>
            <p className={styles.content}>
              Al unirte al kilotón obtienes grandes beneficios para cuidar tu
              salud y recibes recompensas por hacerlo.
            </p>
          </div>
          <div className="col-12 col-sm-10 col-lg-8">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
