"use client";
import { useContext, useState } from "react";
import { Form, Formik } from "formik";
import Button from "../Button/Button";
import MaterialField from "../form/MaterialField/MaterialField";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import * as Yup from "yup";
import modalStyles from "../Modal/Modal.module.scss";
import UseFetch from "../../api/UseFetch";
import Context from "../../context/context";
import { scrollToElement } from "../../common/helpers";

export default function UserValidationModal(props) {
  const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
  const { setUser, setStep, openLogin, setOpenLogin } = useContext(Context);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, actions) => {
    setLoading(true);
    const data = await UseFetch(
      `leads/${values.employee_id}?password=${TOKEN}`
    );
    setLoading(false);

    if (data.status === 404) {
      setStep(0);
      setUser(null);
      actions.setFieldError("employee_id", "El número de empleado no existe");
      return;
    }

    if (data.status === 500) {
      setStep(0);
      setUser(null);
      actions.setFieldError("employee_id", "Algo salió mal, intenta más tarde");
      return;
    }

    setUser(data.data.data);
    setStep(1);
    setOpenLogin(false);
    scrollToElement("#registration");
  };

  return (
    <Modal show={openLogin}>
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
              <h3>Ya soy parte del kilotón</h3>
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
              <Button onClick={() => setOpenLogin(false)}>Cancelar</Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
