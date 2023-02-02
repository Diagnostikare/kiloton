import React, { useContext, useState } from "react";
import styles from "./HealthForm.module.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import UseFetch from "../../api/UseFetch";
import Image from "next/image";
import Loader from "../Loader/Loader";
import Instructions from "./Questions/Instructions/Instructions";
import Context from "../../context/context";
import Progress from "./Questions/Progress/Progress";
import Multiple from "./Questions/Multiple/Multiple";
import dataHealth from "./HealthForm.json";
import { validationSchema } from "./HealthFormValidations";
import Mosaic from "./Questions/Mosaic/Mosaic";
import Results from "./Questions/Results/Results";

export default function HealthForm({ children, ...props }) {
  const { user, setUser, step, setStep } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const initialValues = {
    weight_image: null,
    waist_image: null,
    data: {
      sex: "",
      weight: "",
      waist_centimeters: "",
      questions: {
        exercise_answer_id: "",
        smoke_answer_id: "",
        avrg_sleep_answer_id: "",
        water_intake_answer_id: "",
        alcohol_intake_answer_id: "",
        self_eval_answer_id: "",
        health_state_answer_id: "",
        nourish_type_answer_id: "",
      },
    },
  };

  const _renderQuestion = (step) => {
    switch (dataHealth.questions[step].type) {
      case "info":
        return <Instructions />;
      case "fields":
        return <Progress />;
      case "multiple":
        return <Multiple data={dataHealth.questions[step]} />;
      case "mosaic":
        return <Mosaic data={dataHealth.questions[step]} />;
      case "results":
        return <Results />;
      default:
        return <Multiple data={dataHealth.questions[step]} />;
    }
  };

  const handleSubmit = async (values, actions) => {
    // Go to next step
    if (dataHealth.questions[step].type === "info") {
      setStep(step + 1);
      actions.setSubmitting(false);
      return;
    }

    setLoading(true);
    actions.setSubmitting(true);

    // Udate user data in context
    setUser({ ...user, ...values });

    const formData = new FormData();
    formData.append("lead[weight_image]", values.weight_image);
    formData.append("lead[waist_image]", values.waist_image);
    formData.append("lead[data][weight]", values.data.weight);
    formData.append(
      "lead[data][waist_centimeters]",
      values.data.waist_centimeters
    );
    formData.append("lead[data][sex]", values.data.sex);
    formData.append(
      "lead[data][questions][exercise_answer_id]",
      values.data.questions.exercise_answer_id
    );
    formData.append(
      "lead[data][questions][smoke_answer_id]",
      values.data.questions.smoke_answer_id
    );
    formData.append(
      "lead[data][questions][avrg_sleep_answer_id]",
      values.data.questions.avrg_sleep_answer_id
    );
    formData.append(
      "lead[data][questions][water_intake_answer_id]",
      values.data.questions.water_intake_answer_id
    );
    formData.append(
      "lead[data][questions][alcohol_intake_answer_id]",
      values.data.questions.alcohol_intake_answer_id
    );
    formData.append(
      "lead[data][questions][self_eval_answer_id]",
      values.data.questions.self_eval_answer_id
    );
    formData.append(
      "lead[data][questions][health_state_answer_id]",
      values.data.questions.health_state_answer_id
    );
    formData.append(
      "lead[data][questions][nourish_type_answer_id]",
      values.data.questions.nourish_type_answer_id
    );
    const options = {
      method: "PUT",
      body: formData,
    };

    // PUT request
    const data = await UseFetch(`/leads/${user.employee_id}`, options);

    if (data.status === 200) {
      if (step < dataHealth.questions.length - 1) {
        setStep(step + 1);
      }
    }

    if (data.status === 500) {
      if (data.data.message === "Waist image no puede ser mayor a 10MB") {
        actions.setFieldError(
          "waist_image",
          "La imagen no puede ser mayor a 10MB"
        );
      }

      if (data.data.message === "Weight image no puede ser mayor a 10MB") {
        actions.setFieldError(
          "weight_image",
          "La imagen no puede ser mayor a 10MB"
        );
      }

      if (
        data.data.message ===
        "Weight image no puede ser mayor a 10MB y Waist image no puede ser mayor a 10MB"
      ) {
        actions.setFieldError(
          "waist_image",
          "La imagen no puede ser mayor a 10MB"
        );
        actions.setFieldError(
          "weight_image",
          "La imagen no puede ser mayor a 10MB"
        );
      }
    }

    setLoading(false);
    actions.setSubmitting(false);
  };

  if (success) {
    return (
      <div className={styles.message}>
        <Image
          className={styles.messageImage}
          src="/assets/images/landing/form/success-message.jpg"
          width={2000}
          height={2000}
          alt="Registro completado"
        />
      </div>
    );
  }

  return (
    <div className={styles.form}>
      <Formik
        initialValues={initialValues}
        validationSchema={() => validationSchema(step)}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form
            onReset={formik.handleReset}
            onSubmit={formik.handleSubmit}
            className="w-100"
          >
            <div className={styles.container}>
              {_renderQuestion(step)}

              {dataHealth.questions[step].type !== "results" && (
                <div className={`${styles.footer}`}>
                  <Button
                    as="button"
                    variant="secondary"
                    type="button"
                    onClick={() => setStep(step - 1)}
                  >
                    Atrás
                  </Button>
                  <Button
                    as="button"
                    variant={loading ? "" : "primary"}
                    type="submit"
                    disabled={formik.isSubmitting || loading}
                  >
                    {loading && <Loader />}
                    {loading ? (
                      <span className="px-2">Guardando...</span>
                    ) : (
                      "Siguiente"
                    )}
                  </Button>
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
