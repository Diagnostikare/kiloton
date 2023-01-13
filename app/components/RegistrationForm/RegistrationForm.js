"use client";
import React, { useState, useEffect } from "react";
import styles from "./RegistrationForm.module.scss";
import MaterialField from "../form/MaterialField/MaterialField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import UseFetch from "../../api/UseFetch";
import IconRadio from "../form/IconRadio/IconRadio";
import UseFetchGetUser from "../../api/useFetchGetUser";
import Image from "next/image";

export default function RegistrationForm({ children, ...props }) {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetchData, setFetchData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [statusDisabled, setstatusDisabled] = useState(false);

  const reasonOptions = [
    {
      label: "perder peso",
      value: "1",
      defaultIcon: "/assets/icons/landing/form/option-1-icon-default.svg",
      selectedIcon: "/assets/icons/landing/form/option-1-icon-selected.svg",
      color: "#30E8F4",
    },
    {
      label: "bajar talla",
      value: "2",
      defaultIcon: "/assets/icons/landing/form/option-2-icon-default.svg",
      selectedIcon: "/assets/icons/landing/form/option-2-icon-selected.svg",
      color: "#A968EA",
    },
    {
      label: "más energía",
      value: "3",
      defaultIcon: "/assets/icons/landing/form/option-3-icon-default.svg",
      selectedIcon: "/assets/icons/landing/form/option-3-icon-selected.svg",
      color: "#FF9744",
    },
    {
      label: "hábitos saludables",
      value: "4",
      defaultIcon: "/assets/icons/landing/form/option-4-icon-default.svg",
      selectedIcon: "/assets/icons/landing/form/option-4-icon-selected.svg",
      color: "#C8FB66",
    },
  ];

  const companyOptions = [
    {
      label: "Selecciona una opción",
      value: "0",
      color: "#",
    },
    {
      label: "Agencia I",
      value: "Agencia I",
      color: "#",
    },
    {
      label: "Italika",
      value: "Italika",
      color: "#",
    },
    {
      label: "ITK ENSAMBLIKA",
      value: "ITK ENSAMBLIKA",
      color: "#",
    },
    {
      label: "Presta prenda",
      value: "Presta prenda",
      color: "#",
    },
    {
      label: "Promo espacio",
      value: "Promo espacio",
      color: "#",
    },
    {
      label: "Punto Casa de Bolsa",
      value: "Punto Casa de Bolsa",
      color: "#",
    },
    {
      label: "Totalplay",
      value: "Totalplay",
      color: "#",
    },
    {
      label: "TV Azteca",
      value: "TV Azteca",
      color: "#",
    },
    {
      label: "Otros TVA",
      value: "Otros TVA",
      color: "#",
    },
    {
      label: "UPAX",
      value: "UPAX",
      color: "#",
    },
    {
      label: "BOFF y Despachos GS",
      value: "BOFF y Despachos GS",
      color: "#",
    },
    {
      label: "Despachos LAM",
      value: "Despachos LAM",
      color: "#",
    },
    {
      label: "Elektra marca",
      value: "Elektra marca",
      color: "#",
    },
    {
      label: "Red de Suministro",
      value: "Red de Suministro",
      color: "#",
    },
    {
      label: "Dragón",
      value: "Dragón",
      color: "#",
    },
    {
      label: "Neto",
      value: "Neto",
      color: "#",
    },
    {
      label: "Otros EKT",
      value: "Otros EKT",
      color: "#",
    },
    {
      label: "Red única",
      value: "Red única",
      color: "#",
    },
    {
      label: "BAZ Corporativo",
      value: "BAZ Corporativo",
      color: "#",
    },
    {
      label: "BAZ CyC",
      value: "BAZ CyC",
      color: "#",
    },
    {
      label: "Super App",
      value: "Super App",
      color: "#",
    },
    {
      label: "Afore y Seguros",
      value: "Afore y Seguros",
      color: "#",
    },
    {
      label: "BIG",
      value: "BIG",
      color: "#",
    },
    {
      label: "Red Digitial",
      value: "Red Digitial",
      color: "#",
    },
  ];

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
    console.log(values, "valueeeeeeeeeees");
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
    setLoading(true);
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
        // date_of_birth: data.date_of_birth,
        // height: data.height,
        // weight: data.weight,
      });

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
    }

    if (userData.status == 404) {
      setstatusDisabled(false);
    }
  };

  // REvisa el status que se negativo o respuesta incorrecta para manejra el estado en ionitial values

  const handleSubmit = async (values, actions) => {
    setLoading(true);
    const JSONdata = JSON.stringify({
      lead: {
        ...values,
        date_of_birth: values.date_of_birth.replaceAll("-", ""),
      },
    });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    setLoading(true);

    const data = await UseFetch("registrations", options);

    // If response returns error 401, redirect to login
    if (data.status === 404) {
      setErrorMessage("Usuario no encontrado");
      setError(true);
      // setFetchData(null);
      return;
    }

    if (data.status === 401) {
      setErrorMessage("Usuario no autorizado");
      setError(true);
      // setFetchData(null);
      return;
    }

    if (data.status === 409) {
      setErrorMessage("Usuario ya registrado");
      setError(true);
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
    height: Yup.string().required("Campo requerido"),
    weight: Yup.string().required("Campo requerido"),
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
        // validate={validate}
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
                    className="d-flex justify-content-between"
                    role="group"
                    aria-labelledby="my-radio-group"
                  >
                    {_renderReasonOptions(reasonOptions)}
                  </div>
                </div>
              </div>
            </div>
            <hr className="mb-5" />
            <div className="row">
              <div className="col-12 col-md-6">
                <MaterialField
                  className={`mb-4 ${styles.inputText}`}
                  name="employee_id"
                  type="text"
                  label="Número de Socio"
                  placeholder="Escribe tu Número de Socio de Salud GS"
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
                  {_renderCompanyOptions(companyOptions)}
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
                  label="Altura"
                  placeholder="En centímetros"
                />
              </div>
              <div className="col-12 col-md-6">
                <MaterialField
                  className={`mb-4 ${styles.inputText}`}
                  name="weight"
                  type="text"
                  label="Peso"
                  placeholder="En kilogramos"
                />
              </div>
            </div>
            {error && (
              <div className="row mb-5">
                <div className="d-flex justify-content-center flex-row">
                  <div
                    className={`${styles.messageErrorContainer} border border-danger`}
                  >
                    <span className={styles.spanError}>Error</span>
                    <b className={styles.spanError}>{errorMessage}</b>
                  </div>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <Button
                  as="button"
                  variant="primary"
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

// POST data fetch with next js 13
