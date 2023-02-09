"use client";
import React, { useContext, useState } from "react";
import styles from "./HeroImage.module.scss";
import Button from "../Button/Button";
import Image from "next/image";
import { scrollToElement } from "../../common/helpers";
import UserValidationModal from "../UserValidationModal/UserValidationModal";
import Context from "../../context/context";

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
                <span className={styles.uderline}>¡Inscríbete!</span>
              </h1>
              <p className={styles.content}>
                Participas todo el año, acumulas puntos y ganas premios
                increíbles
              </p>
              <div className={styles.buttons}>
                <Button
                  as="button"
                  href="#registration"
                  variant="primary"
                  onClick={(event) => {
                    scrollToElement(event);
                    setStep(0);
                  }}
                >
                  Quiero participar
                </Button>
                <Button variant="secondary" onClick={() => setOpenLogin(true)}>
                  Ya tengo cuenta
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <UserValidationModal />
    </>
  );
}
