"use client";
import React, { useState, useEffect } from "react";
import styles from "./RegistrationForm.module.scss";
import MaterialField from "../form/MaterialField/MaterialField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../Button/Button";
import UseFetch from "../../api/UseFetch";
import IconRadio from "../form/IconRadio/IconRadio";
import UseFetchGetUser from "../../api/useFetchGetUser";

export default function RegistrationForm({ children, ...props }) {
  const [error, setError] = useState(false);
  const [errorMessage,setErrorMessage] = useState("")
  const [loading, setLoading] = useState(true);
  const [fetchData, setFetchData] = useState(null);
  const [succeess, setSuccess] = useState(false);
  const [statusDisabled, setstatusDisabled] = useState(false);
  // const initialValues = {
  //   reason: "",
  //   employee_id: "",
  //   employee_area: "",
  //   first_name: "",
  //   last_name: "",
  //   email: "",
  //   date_of_birth: "",
  //   height: "",
  //   weight: "",
  //   company_name: "grupo-salinas",
  // };

  const initialValues = {
    employee_id: "",
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    height: "",
    weight: "",
    company_name: "",
    kiloton_reason: ""
  };

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

  const handleSubmitCheckEmployeeId = async (values, actions, initialValues) => {
    setLoading(true);
    const optionsUsers = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const userData = await UseFetchGetUser(optionsUsers, values.employee_id);

    const { data } = userData
    if (userData.status === 302 || userData.status === 201 || userData.status === 200) {
      actions.setValues({
        ...values,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        // date_of_birth: data.date_of_birth,
        // height: data.height,
        // weight: data.weight,
      });

      setstatusDisabled(true)
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
    setstatusDisabled(false)
  }

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
    if (data.status === 401) {
      setErrorMessage('Usuario no autorizado')
      setError(true)
      // setFetchData(null);
      return;
    }

    if (data.status === 409) {
      setErrorMessage('Usuario ya registrado')
      setError(true)
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
    setFetchData(data.data);
    setError(false);
    setLoading(false);
    actions.setSubmitting(false);
    setSuccess(true);
  };


  const validate = (values) => {
    const errors = {};
    if (!values.employee_id) {
      errors.employee_id = 'Campo requerido';
    }
    if (!values.first_name) {
      errors.first_name = 'Campo requerido';
    }
    if (!values.last_name) {
      errors.last_name = 'Campo requerido';
    }
    if (!values.email) {
      errors.email = 'Campo requerido';
    }
    if (!values.date_of_birth) {
      errors.date_of_birth = 'Campo requerido';
    }
    if (!values.height) {
      errors.height = 'Campo requerido';
    }
    if (!values.weight) {
      errors.weight = 'Campo requerido';
    }
    if (!values.company_name) {
      errors.company_name = 'Campo requerido';
    }
    if (!values.kiloton_reason) {
      errors.kiloton_reason = 'Campo requerido';
    }
    return errors;
  }
  


  if (succeess) {
    return (
      <div className={styles.form}>
        <div className={styles.message}>
          <h3 className={styles.messageTitle}>¡Tu registro está listo!</h3>
          <div className="my-auto">
            <p>
              Recibirás en tu correo electrónico:{" "}
              <b>{fetchData && fetchData.data.email}</b> toda la información sobre
              los siguientes pasos para ser parte del kilotón 2013
            </p>
            <strong className={`${styles.accent} bold`}>¡Mucho éxito!</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.form}>
      <Formik 
      initialValues={initialValues} 
      validate={validate}
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
                <strong className="mb-4">
                  Razón por la que quieres participar
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
                  label="Número de socio"
                  placeholder="Escribe tu número de socio de Salud GS"
                  tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                  onKeyUp={(e) => { handleChangeID(formik.values, formik, initialValues) }}
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
                  label="Unidad de negocio a la que perteneces"
                  tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                >
                  <option default>Elige una opción</option>
                  <option value="0">Opción 1</option>
                  <option value="1">Opción 2</option>
                  <option value="2">Opción 3</option>
                  <option value="3">Opción 4</option>
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
                <div className="d-flex justify-content-center flex-column w-50">
                <span className={`${styles.spanError}`}>Error</span>
                <div className={` ${styles.messageErrorContainer} d-flex justify-content-center border border-danger`}>
                  {errorMessage}
                </div>
                </div>
              </div>
            )}
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

// POST data fetch with next js 13
