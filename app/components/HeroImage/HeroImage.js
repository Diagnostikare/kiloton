"use client";
import React, { useState } from "react";
import styles from "./HeroImage.module.scss";
import Button from "../Button/Button";
import Image from "next/image";
import { scrollToElement } from "../../common/helpers";
import Modal from "../Modal/Modal";
import { Form, Formik } from "formik";
import MaterialField from "../form/MaterialField/MaterialField";
import modalStyles from "../Modal/Modal.module.scss";
import UseFetch from "../../api/UseFetch";
import * as Yup from "yup";
import Loader from "../Loader/Loader";

export default function HeroImage(props) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, actions) => {
    setLoading(true);
    const data = await UseFetch(`leads/${values.employee_id}`, values);
    setLoading(false);
    console.log(data);
    if (data.status === 404) {
      actions.setFieldError("employee_id", "El número de empleado no existe");
      return;
    }

    if (data.status === 500) {
      actions.setFieldError("employee_id", "Algo salió mal, intenta más tarde");
      return;
    }

    setShowModal(false);
  };

  return (
    <>
      <section id="heroImage" className={styles.hero} {...props}>
        <Image
          priority
          className={styles.image}
          raw="true"
          alt="kilotón"
          width={1440}
          height={792}
          src="/assets/images/landing/hero/hero-image.jpg"
        />
        <div className={`container ${styles.heroContent}`}>
          <div className="row">
            <div className="col-12 col-sm-10 col-lg-6">
              <h1 className={`title bold ${styles.title} mb-4`}>
                Con el nuevo kilotón, <br />
                todos ganan.
                <br />
                <span className={styles.uderline}>¡Inscríbete!</span>
              </h1>
              <p className={styles.content}>
                Participas todo el año, acumulas puntos y ganas premios
                increíbles
              </p>
              <Button
                as="button"
                href="#registration"
                variant="primary"
                onClick={scrollToElement}
              >
                Quiero participar
              </Button>
              <Button
                className={styles.secondaryButton}
                variant="secondary"
                onClick={() => setShowModal(true)}
              >
                Ya tengo cuenta
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Modal show={showModal}>
        <Formik
          initialValues={{
            employee_id: "",
          }}
          validationSchema={Yup.object({
            employee_id: Yup.string().required("Este campo es requerido"),
          })}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <div className={modalStyles.header}>
                <h3>Ya soy parte de kilotón</h3>
              </div>
              <div className={modalStyles.body}>
                <div className="row">
                  <div className="col-12 mb-4">
                    <MaterialField
                      type="text"
                      name="employee_id"
                      label="Número de Socio"
                      placeholder="Escribe tu Número de Socio"
                    />
                  </div>
                </div>
              </div>
              <div className={modalStyles.footer}>
                <Button
                  as="button"
                  type="submit"
                  variant={loading ? "" : "primary"}
                  className="mb-4"
                  disabled={formik.isSubmitting || loading}
                >
                  {loading && <Loader />}
                  {loading ? (
                    <span className="px-2">Verificando...</span>
                  ) : (
                    "Ingresar"
                  )}
                </Button>
                <Button onClick={() => setShowModal(false)}>Cancelar</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
