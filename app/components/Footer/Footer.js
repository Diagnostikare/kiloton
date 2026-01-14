"use client";
import styles from "./Footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import componentData from "./footer.json";
import { scrollToElement } from "../../common/helpers";

export default function Footer(props) {
  const _renderMenuOptions = (options) =>
    options.map((option, index) => (
      <li key={index}>
        <a className={styles.item} href={option.link} onClick={scrollToElement}>
          {option.name}
        </a>
      </li>
    ));

    let today = new Date();
    let year = today.getFullYear();


  return (
    <footer id="footer" className={styles.footer} {...props}>
      <div className="container">
        <div className="row">
          <div
            className={`${styles.footerLogos} col-12 col-sm-6 col-md-4 col-lg-2`}
          >
            <div className={styles.footerLogo}>
              <Image
                raw="true"
                src="/assets/brand/logo-white.png"
                width={216}
                height={124}
                alt="kilotón"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ul className={styles.footerList}>
              <li>
                <Link href="mailto:kiloton@elektra.com.mx">
                  kiloton@elektra.com.mx
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ul className={styles.footerList}>
              {_renderMenuOptions(componentData.columnsOneOptions)}
            </ul>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ul className={styles.footerList}>
              {_renderMenuOptions(componentData.columnsTwoOptions)}
            </ul>
          </div>
          <div
            className={`${styles.footerLogos} col-12 col-sm-6 col-md-4 col-lg-1 border-none`}
          >
            <div className={styles.footerLogo}>
              <Image
                raw="true"
                src="/assets/brand/salud-gs-white.png"
                width={73}
                height={40}
                alt="kilotón"
              />
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className={`${styles.footerText} col-12`}>
            <small>
            Diagnostikare © {year}.
            </small>
            <br></br>
            <small>
            Diagnostikare es una marca registrada
            propiedad de Servicios Clínicos Inteligentes DXKARE, S.A.P.I. de
            C.V.
            </small>
            <br></br>
            <small>
            El programa kilotón Total y la plataforma Salud GS son
            propiedad de Grupo Salinas y empresas afiliadas, para uso exclusivo
            de sus respectivos Colaboradores.
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}
