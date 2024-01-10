"use client";
import styles from "./SuccessStoriesSection.module.scss";
import QuoteCarousel from "../QuoteCarousel/QuoteCarousel";
import Image from "next/image";
import componentData from "./successStories.json";

export default function SuccessStoriesSection({ children, ...props }) {
  return (
    <section id="successStories" className={styles.successStories} {...props}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4">
            <Image
              className={styles.quoteIcon}
              raw="true"
              src="/assets/icons/landing/success-stories/quote-icon.svg"
              width={56}
              height={48}
              alt="quote icon"
            />
            <h3 className={styles.title}>Casos de éxito con el programa</h3>
            <p className={styles.content}>
              Más de 13,718 socios se han inscrito a kilotón.
            </p>
          </div>
          <div className="col-12 col-md-8 d-flex justify-content-end">
            <QuoteCarousel data={componentData.quotes} />
          </div>
        </div>
      </div>
    </section>
  );
}
