"use client";
import styles from "./SuccessStoriesSection.module.scss";
import QuoteCarousel from "../QuoteCarousel/QuoteCarousel";
import Image from "next/image";

export default function SuccessStoriesSection({ children, ...props }) {
  const quotes = [
    {
      content:
        "Tengo poco tiempo para organizarme y comer saludable, gracias al kilotón entendí qué haciendo pequeños cambios en mi alimentación podía mejorar mis hábitos.",
      author: "Luis  Martínez",
      data: "Salud GS, <b>18 kg</b> perdidos en kilotón 2022",
      image: "/assets/images/landing/success-stories/author-picture.jpg",
    },
    {
      content:
        "Tengo poco tiempo para organizarme y comer saludable, gracias al kilotón entendí qué haciendo pequeños cambios en mi alimentación podía mejorar mis hábitos.",
      author: "Luis  Martínez",
      data: "Salud GS, <b>18 kg</b> perdidos en kilotón 2022",
      image: "/assets/images/landing/success-stories/author-picture.jpg",
    },
  ];
  return (
    <section className={styles.successStories} {...props}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4">
            <Image
              raw="true"
              src="/assets/icons/landing/success-stories/quote-icon.svg"
              width={56}
              height={48}
              alt="quote icon"
            />
            <h3 className={styles.title}>Casos de éxito con el programa</h3>
            <p className={styles.content}>
              Más de 13,718 socios se han inscrito a Kilotón.
            </p>
          </div>
          <div className="col-12 col-md-8 d-flex justify-content-end">
            <QuoteCarousel data={quotes} />
          </div>
        </div>
      </div>
    </section>
  );
}
