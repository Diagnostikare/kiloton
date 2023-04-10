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
          src="/assets/images/landing/hero/hero-image.jpg"
        />
        <div className={`container ${styles.heroContent}`}>
          <div className="row">
            <div className="col-12 col-sm-10 col-lg-6">
              <h1 className={`title bold ${styles.title} mb-4`}>
                Con el nuevo kilotón, <br />
                todos ganan.
                <br />
                <span className={styles.uderline}>¡Regístrate!</span>
              </h1>
              <p className={styles.content}>
                Participas todo el año, acumulas puntos y ganas premios
                increíbles
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
                  {/* <span>Quiero hacer mi &nbsp;</span>
                  <b>kilotest</b> */}
                  
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <UserValidationModal />
    </>
  );
}
