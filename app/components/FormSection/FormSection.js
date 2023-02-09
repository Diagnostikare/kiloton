import { useContext, useState } from "react";
import Context from "../../context/context";
import HealthForm from "../HealthForm/HealthForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import dataCopies from "./formSection.json";
import styles from "./FormSection.module.scss";

export const FormSection = ({ children, ...props }) => {
  // Step state controls which form is shown
  const { step, setStep } = useContext(Context);

  const _renderStep = (step) => {
    if (step === 0) {
      return <RegistrationForm />;
    } else {
      return <HealthForm />;
    }
  };

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
            {_renderStep(step)}
          </div>
        </div>
      </div>
    </section>
  );
};
