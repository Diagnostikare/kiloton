"use client";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import MaterialField from "../form/MaterialField/MaterialField";
import styles from "./Modal.module.scss";

const modalRoot = document.querySelector(".modal-root");

export default function Modal({ show, children }) {
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setShow(show);
    }

    return () => {
      isMounted = false;
    };
  }, [show]);

  return (
    <>
      {createPortal(
        <div
          className={`${styles.modal} ${isShow && styles.show}`}
          tabIndex="-1"
          aria-labelledby="modalLabel"
          aria-hidden="true"
        >
          <div className={styles.dialog}>
            <div className="modal-content">{children}</div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
