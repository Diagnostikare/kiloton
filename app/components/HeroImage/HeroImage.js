"use client";
import React, { useContext, useState } from "react";
import styles from "./HeroImage.module.scss";
import buttonStyles from "../Button/Button.module.scss";
import Button from "../Button/Button";
import Image from "next/image";
import UserValidationModal from "../UserValidationModal/UserValidationModal";
import Context from "../../context/context";
import Link from "next/link";

export default function HeroImage(props) {
  const { setStep, setOpenLogin } = useContext(Context);
  const [showModal, setShowModal] = useState(false);

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
          src="/assets/images/landing/hero/kiloton2025.png"
        />
        <div className={`container ${styles.heroContent}`}>
          <div className="row d-flex flex-column-reverse flex-md-row">
            <div className="col-12 col-sm-10 col-lg-6">
              <h1 className={`title bold ${styles.title} opacity-0`}>
                Con kilotón
              </h1>
              <h1 className={`title bold ${styles.title} mb-4 opacity-0`}>
                <span className={styles.uderline}>¡gana todo el año!</span>
              </h1>
              <p className={`${styles.content} opacity-0`}>
                Participa a tu ritmo, gana puntos y canjéalos por increíbles premios
              </p>
              <div className={styles.buttons}>
                <Link
                  className={`${buttonStyles.button} ${buttonStyles.primary} ${styles.signUpButton}`}
                  href="https://reto.kilotontotal.com/registro"
                  variant="primary"
                  rel="noreferrer"
                >
                </Link>
                <Link
                  className={`${buttonStyles.button} ${buttonStyles.secondary} ${styles.loginButton}`}
                  variant="secondary"
                  href="https://reto.kilotontotal.com/login"
                  rel="noreferrer"
                >
                  <div className={`${styles.divText}`}>
                    <span>Quiero hacer mi &nbsp;</span>
                    <b>kilotest</b>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-12 col-sm-10 col-lg-6 d-flex">
              <div className="d-flex justify-content-end w-100 d-none">
                <Image
                  priority
                  className={'d-flex'}
                  raw="true"
                  alt="kilotón"
                  width={135}
                  height={96}
                  src="/assets/images/landing/hero/GrupoSalinas.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <UserValidationModal />
    </>
  );
}
