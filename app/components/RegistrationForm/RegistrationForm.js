"use client";
import styles from "./RegistrationForm.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function RegistrationForm({ children, ...props }) {
  const initialValues = {
    reason: "",
    id: "",
    area: "",
    name: "",
    lastname: "",
    email: "",
    dateOfBirth: "",
    height: "",
    weight: "",
  };

  return (
    <div className={styles.form}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {(formik) => (
          <Form onReset={formik.handleReset} onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-12">
                <span>Razón por la que quieres participar</span>
              </div>
              <div className="col-12">
                <Field type="text" name="reason" placeholder="Razón" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <Field type="text" name="id" placeholder="Número de socio" />
              </div>
              <div className="col-12 col-md-6">
                <Field
                  type="text"
                  name="area"
                  placeholder="Unidad de negocio a la que perteneces"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <Field type="text" name="name" placeholder="Name" />
              </div>
              <div className="col-12 col-md-6">
                <Field type="text" name="lastName" placeholder="Apellido" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <Field
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                />
              </div>
              <div className="col-12 col-md-6">
                <Field
                  type="date"
                  name="dateOfBirth"
                  placeholder="Fecha de nacimiento"
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-12 col-md-6">
                <Field type="text" name="height" placeholder="Estatura" />
              </div>
              <div className="col-12 col-md-6">
                <Field type="text" name="Peso" placeholder="Peso" />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button type="submit" disabled={formik.isSubmitting}>
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
