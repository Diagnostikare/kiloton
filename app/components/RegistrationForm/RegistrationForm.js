"use client";
import React, { useState } from "react";
import styles from "./RegistrationForm.module.scss";
import componentData from "./registrationForm.json";
import MaterialField from "../form/MaterialField/MaterialField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import UseFetch from "../../api/UseFetch";
import IconRadio from "../form/IconRadio/IconRadio";
import UseFetchGetUser from "../../api/useFetchGetUser";
import Image from "next/image";
import Chart from "../Chart/Chart";
import { formatDate, replaceSpecialCharacters } from "../../common/helpers";
import Loader from "../Loader/Loader";

export default function RegistrationForm({ children, ...props }) {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searcherLoading, setSearcherLoading] = useState(false);
  const [fetchData, setFetchData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [statusDisabled, setstatusDisabled] = useState(false);

  const _renderCompanyOptions = (options) =>
    options.map((option, index) =>
      option.value == "0" ? (
        <option key={index} className={`${styles.optionSelect}`} default>
          {option.label}
        </option>
      ) : (
        <option
          key={index}
          value={option.value}
          className={`${styles.optionSelect}`}
        >
          {option.label}
        </option>
      )
    );

  const _renderReasonOptions = (options) =>
    options.map((option, index) => (
      <IconRadio
        key={index}
        name="kiloton_reason"
        label={option.label}
        value={option.value}
        defaultIcon={option.defaultIcon}
        selectedIcon={option.selectedIcon}
        color={option.color}
      />
    ));

  const handleChangeID = (values, actions, initialValues) => {
    setTimeout(() => {
      if (values.employee_id.length > 5) {
        handleSubmitCheckEmployeeId(values, actions, initialValues);
      }
    }, 0);
  };

  const handleSubmitCheckEmployeeId = async (
    values,
    actions,
    initialValues
  ) => {
    setSearcherLoading(true);
    const optionsUsers = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const userData = await UseFetchGetUser(optionsUsers, values.employee_id);
    const { data } = userData;
    if (
      userData.status === 302 ||
      userData.status === 201 ||
      userData.status === 200
    ) {
      actions.setValues({
        ...values,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      });

      setSearcherLoading(false);
      setstatusDisabled(true);
    } else {
      actions.setFieldValue({
        ...values,
        first_name: "",
        last_name: "",
        email: "",
        kiloton_reason: values.kiloton_reason,
        employee_id: values.employee_id,
      });

      actions.setFieldValue("first_name", initialValues.first_name);
      actions.setFieldValue("last_name", initialValues.last_name);
      actions.setFieldValue("email", initialValues.email);
      setSearcherLoading(false);
    }

    if (userData.status == 404) {
      setstatusDisabled(false);
      setSearcherLoading(false);
    }
  };

  // Revisa el status que sea negativo o respuesta incorrecta para manejar el estado en initial values
  const handleSubmit = async (values, actions) => {
    setLoading(true);

    const JSONdata = JSON.stringify({
      lead: {
        ...values,
        date_of_birth: formatDate(values.date_of_birth),
      },
    });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const data = await UseFetch("registrations", options);

    // If response returns error 401, redirect to login
    if (data.status === 404) {
      setErrorMessage("Usuario no encontrado");
      setError(true);
      setLoading(false);

      // setFetchData(null);
      return;
    }

    if (data.status === 401) {
      setErrorMessage(
        "Usuario no autorizado, favor de verificar que los datos sean correctos"
      );
      setError(true);
      setLoading(false);
      // setFetchData(null);
      return;
    }

    if (data.status === 409) {
      setErrorMessage("Usuario ya registrado");
      setError(true);
      setLoading(false);
      // setFetchData(null);
      return;
    }

    // If response is not ok, show error
    if (data.status !== 200 && data.status !== 201) {
      setFetchData(null);
      setError(true);
      setLoading(false);
      return;
    }

    // if response is ok, update lead data
    setFetchData(data.data.lead);
    setError(false);
    setLoading(false);
    actions.setSubmitting(false);
    setSuccess(true);
  };

  const initialValues = {
    employee_id: "",
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    height: "",
    weight: "",
    company_name: "",
    kiloton_reason: "",
  };

  const validationSchema = Yup.object({
    employee_id: Yup.string().required("Campo requerido"),
    first_name: Yup.string().required("Campo requerido"),
    last_name: Yup.string().required("Campo requerido"),
    email: Yup.string().email("Correo inválido").required("Campo requerido"),
    date_of_birth: Yup.string().required("Campo requerido"),
    height: Yup.string()
      .matches(
        /^[\d]*$/,
        "No se permiten letras o caracteres especiales ( . , : ; )"
      )
      .required("Campo requerido"),
    weight: Yup.string()
      .matches(/^[^abc]*$/, "No se permiten letras")
      .required("Campo requerido"),
    company_name: Yup.string().required("Campo requerido"),
    kiloton_reason: Yup.string().required("Campo requerido"),
  });

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
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form
            onReset={formik.handleReset}
            onSubmit={formik.handleSubmit}
            className="w-100"
          >
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <strong className={`${styles.formTitle} mb-4`}>
                  Elige una razón por la que quieres participar
                </strong>
              </div>
              <div className="col-12">
                <div className="mb-4">
                  <div
                    className={`${
                      formik.touched?.kiloton_reason &&
                      formik.errors?.kiloton_reason &&
                      styles.error
                    } d-flex justify-content-between py-2`}
                    role="group"
                    aria-labelledby="my-radio-group"
                  >
                    {_renderReasonOptions(componentData.reasonOptions)}
                  </div>
                </div>
              </div>
            </div>
            <hr className="mb-5" />
            <div className="row">
              <div
                className={`${styles.searcherLoaderContainer} col-12 col-md-6`}
              >
                {searcherLoading && (
                  <Loader className={styles.searcherLoader} />
                )}
                <MaterialField
                  className={`mb-4 ${styles.inputText}`}
                  name="employee_id"
                  type="text"
                  label="Número de Socio"
                  placeholder="Escribe tu Número de Socio"
                  onKeyUp={(e) => {
                    handleChangeID(formik.values, formik, initialValues);
                  }}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                />
              </div>
              <div className="col-12 col-md-6">
                <MaterialField
                  className={`mb-4 ${styles.inputText}`}
                  name="company_name"
                  type="text"
                  as="select"
                  label="Unidad de Negocio a la que perteneces"
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                >
                  {_renderCompanyOptions(componentData.companyOptions)}
                </MaterialField>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <MaterialField
                  className={`mb-4 ${styles.inputText}`}
                  name="first_name"
                  type="text"
                  label="Nombre"
                  placeholder="Escribe tu nombre completo"
                  disabled={statusDisabled}
                />
              </div>
              <div className="col-12 col-md-6">
                <MaterialField
                  className={`mb-4 ${styles.inputText}`}
                  name="last_name"
                  type="text"
                  label="Apellido"
                  placeholder="Escribe tu apellido completo"
                  disabled={statusDisabled}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <MaterialField
                  className={`mb-4 ${styles.inputText}`}
                  name="email"
                  type="email"
                  label="Correo electrónico"
                  placeholder="Escribe tu correo electrónico"
                  disabled={statusDisabled}
                />
              </div>
              <div className="col-12 col-md-6">
                {/* Obligatorio y formato date de ruby año 19880927 YYYYMMDD*/}
                <MaterialField
                  className={`mb-4 ${styles.inputText}`}
                  name="date_of_birth"
                  type="date"
                  max="2005-01-01"
                  label="Fecha de nacimiento"
                  placeholder="DD/MM/AAAA"
                />
              </div>
            </div>
            <hr />
            <div className="row mb-5">
              <div className="col-12 col-md-6">
                <MaterialField
                  className={`mb-4 ${styles.inputText}`}
                  name="height"
                  type="text"
                  label="Altura (cm)"
                  placeholder="En centímetros"
                  maxlength="3"
                  onKeyUp={(e) => {
                    formik.setFieldValue(
                      "height",
                      replaceSpecialCharacters(e.target.value)
                    );
                  }}
                />
              </div>
              <div className="col-12 col-md-6">
                <MaterialField
                  className={`mb-4 ${styles.inputText}`}
                  name="weight"
                  type="text"
                  label="Peso (kg)"
                  placeholder="En kilogramos"
                  maxlength="6"
                />
              </div>
              <div className="col-12 col-md-6">
                <Chart
                  height={formik.values.height}
                  weight={formik.values.weight}
                />
              </div>
            </div>
            {error && (
              <div className="row mb-5">
                <div className="d-flex justify-content-center flex-row">
                  <div
                    className={`${styles.messageErrorContainer} border border-danger`}
                  >
                    <b className={styles.spanError}>{errorMessage}</b>
                  </div>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <Button
                  as="button"
                  variant={loading ? "secondary" : "primary"}
                  type="submit"
                  disabled={formik.isSubmitting || loading}
                >
                  {loading && <Loader />}
                  {loading && (
                    <span className="px-2">Enviando información...</span>
                  )}
                  {!loading && "Unirme al kilotón"}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
