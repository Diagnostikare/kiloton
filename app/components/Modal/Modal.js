"use client";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import MaterialField from "../form/MaterialField/MaterialField";
import styles from "./Modal.module.scss";

export default function Modal({ show, children }) {
  const [isShow, setShow] = useState(false);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setShow(show);
      setMounted(true);
    }

    return () => {
      mounted = false;
      setMounted(false);
    };
  }, [show]);

  if (!isMounted) return null;

  return (
    <>
      <div
        className={`${styles.modal} ${isShow && styles.show}`}
        tabIndex="-1"
        aria-labelledby="modalLabel"
        aria-hidden="true"
      >
        <div className={styles.dialog}>
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </>
  );
}
