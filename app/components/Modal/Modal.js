"use client";
import { useEffect, useState } from "react";
import styles from "./Modal.module.scss";

export default function Modal({ show, children }) {
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setShow(show);
    }
  }, [show]);

  if (!show) return null;

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
