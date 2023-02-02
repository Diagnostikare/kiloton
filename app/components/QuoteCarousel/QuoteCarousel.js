import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import styles from "./QuoteCarousel.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

export default function QuoteCarousel({ children, ...props }) {
  const swiperRef = useRef();
  const [isMobile, setIsMobile] = useState(false);
  let windowWidth;

  const _renderAuthorPicture = (image) => (
    <div className={styles.quotePicture}>
      <Image
        className={styles.quoteImg}
        raw="true"
        src={image}
        width={600}
        height={600}
        alt="Author picture"
      />
    </div>
  );

  // Function for reder each slide
  const _renderSlides = (data) =>
    data.map((slide, index) => (
      <SwiperSlide className={styles.slide} key={index}>
        <div key={index} className={styles.quote}>
          {!isMobile && _renderAuthorPicture(slide.image)}
          <div className={styles.quoteText}>
            <p className={styles.quoteContent}>"{slide.content}"</p>
            {/* Author data */}
            <div className={styles.quoteAuthorData}>
              {isMobile && _renderAuthorPicture(slide.image)}
              <div className={styles.quoteAuthorDataContent}>
                <span className={styles.quoteAuthor}>{slide.author}</span>
                <span className="">{slide.location}</span>
                <span
                  className={styles.quoteData}
                  dangerouslySetInnerHTML={{ __html: slide.data }}
                />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    ));

  const handleResize = () => {
    windowWidth = window.innerWidth;
    setIsMobile(windowWidth < 768);
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      windowWidth = window.innerWidth;
      handleResize();
      // Add resize listener
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // If there is no data, return null
  if (!props.data) return null;

  return (
    <Swiper
      className={styles.carousel}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
      {...props}
    >
      {/* Slides */}
      {_renderSlides(props.data)}

      {/* Navigation */}
      {props.data.length > 1 && (
        <div className={styles.carouselNavigation}>
          <button
            className={styles.swiperPrev}
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <Image
              raw="true"
              src="/assets/icons/landing/success-stories/angle-left-icon.svg"
              width={32}
              height={32}
              alt="Previous"
            />
          </button>
          <button
            className={styles.swiperNext}
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <Image
              raw="true"
              src="/assets/icons/landing/success-stories/angle-right-icon.svg"
              width={32}
              height={32}
              alt="Next"
            />
          </button>
        </div>
      )}
    </Swiper>
  );
}
