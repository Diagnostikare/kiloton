"use client";
import styles from "./RegistrationForm.module.scss";
import MaterialField from "../form/MaterialField/MaterialField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../Button/Button";

export default function RegistrationForm({ children, ...props }) {
  const initialValues = {
    reason: "",
    employee_id: "",
    employee_area: "",
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    height: "",
    weight: "",
    company_name: "grupo-salinas",
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
                <MaterialField
                  className={`mb-4`}
                  name="id"
                  type="text"
                  label="Número de socio"
                  placeholder="Escribe tu número de socio de Salud GS"
                  tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                />
              </div>
              <div className="col-12 col-md-6">
                <MaterialField
                  className={`mb-4`}
                  name="employee_area"
                  type="text"
                  as="select"
                  label="Unidad de negocio a la que perteneces"
                  tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                >
                  <option default>Elige una opción</option>
                  <option value="0">Opción 1</option>
                  <option value="1">Opción 2</option>
                  <option value="1">Opción 3</option>
                  <option value="1">Opción 4</option>
                </MaterialField>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <MaterialField
                  className={`mb-4`}
                  name="first_name"
                  type="text"
                  label="Nombre"
                  placeholder="Escribe tu nombre completo"
                />
              </div>
              <div className="col-12 col-md-6">
                <MaterialField
                  className={`mb-4`}
                  name="last_name"
                  type="text"
                  label="Nombre"
                  placeholder="Escribe tu apellido completo"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <MaterialField
                  className={`mb-4`}
                  name="email"
                  type="email"
                  label="Correo electrónico"
                  placeholder="Escribe tu correo electrónico"
                />
              </div>
              <div className="col-12 col-md-6">
                {/* Obligatorio y formato date de ruby año 19880927 YYYYMMDD*/}
                <MaterialField
                  className={`mb-4`}
                  name="date_of_birth"
                  type="date"
                  label="Fecha de nacimiento"
                  placeholder="DD/MM/AAAA"
                />
              </div>
            </div>
            <hr />
            <div className="row mb-5">
              <div className="col-12 col-md-6">
                <MaterialField
                  className={`mb-4`}
                  name="height"
                  type="text"
                  label="Altura"
                  placeholder="En centímetros"
                />
              </div>
              <div className="col-12 col-md-6">
                <MaterialField
                  className={`mb-4`}
                  name="weight"
                  type="text"
                  label="Peso"
                  placeholder="En kilogramos"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <Button
                  as="button"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  Unirme al kilotón
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
