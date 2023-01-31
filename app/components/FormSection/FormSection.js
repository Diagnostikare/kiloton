import { useState } from "react";
import HealthForm from "../HealthForm/HealthForm";
// import RegistrationForm from "../RegistrationForm/RegistrationForm";
import dataCopies from "./formSection.json";
import styles from "./FormSection.module.scss";

export const FormSection = ({ children, ...props }) => {
  const [step, setStep] = useState(0);

  return (
    <section id="registration" className={styles.section} {...props}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-10 col-lg-4 my-auto">
            <h2 className={`title bold ${styles.title}`}>
              {dataCopies.copies[step].title}
            </h2>
            <p className={styles.content}>{dataCopies.copies[step].content}</p>
          </div>
          <div className="col-12 col-sm-10 col-lg-8 d-flex justify-content-end">
            {/* <RegistrationForm /> */}
            <HealthForm />
          </div>
        </div>
      </div>
    </section>
  );
};
