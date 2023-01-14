"use client";
import styles from "./SuccessStoriesSection.module.scss";
import QuoteCarousel from "../QuoteCarousel/QuoteCarousel";
import Image from "next/image";

export default function SuccessStoriesSection({ children, ...props }) {
  const quotes = [
    {
      author: "Lilia Oliva Sosa",
      location: "Azteca Estacionamientos",
      data: "61 años, <b>29 kg menos</b>",
      content:
        "Soy hipertensa, tenía que bajar 20 kg sí o sí y con el kilotón lo logré en 1 año",

      image: "/assets/images/landing/successStories/lilia-oliva-sosa.jpg",
    },
    {
      author: "Verónica Amigón",
      location: "Bienestar GS",
      data: "40 años, <b>5 kg menos</b>",
      content:
        "Después de mi embarazo subí varios kilogramos y decidí meterme al kilotón para recuperar mi peso",

      image: "/assets/images/landing/successStories/veronica-amigon.jpg",
    },
    {
      author: "Juan Pablo Gutiérrez",
      location: "Diseño Bienestar GS",
      data: "38 años, <b>5 kg menos</b>",
      content:
        "Desde que inicié el kilotón, pienso dos veces lo que me llevo a la boca. Lo natural es lo principal, hay que evitar lo procesado",
      image: "/assets/images/landing/successStories/juan-pablo-gutierrez.jpg",
    },
    {
      author: "Martha Gutiérrez López",
      location: "Prosperidad Incluyente",
      data: "52 años, <b>6 kg menos</b>",
      content:
        "Con el kilotón tomas conciencia de lo que estás comiendo. Además, ganas por todos lados, en premios y en salud",

      image: "/assets/images/landing/successStories/martha-gutierrez-lopez.jpg",
    },
    {
      author: "Rodrigo Ventura",
      location: "Comunicación Bienestar GS",
      data: "40 años, <b>6 kg menos</b>",
      content:
        "El kilotón me ayudó muchísimo, porque además de bajar de peso, gane músculo, tonalidad y hubo cambios muy visibles en mi cara",

      image: "/assets/images/landing/successStories/rodrigo-ventura.jpg",
    },
    {
      author: "Alejandra Fernández Ramírez",
      location: "Italika",
      data: "44 años, <b>12 kg menos</b>",
      content:
        "El kilotón cambió mi vida. Perder peso te hace ver más joven, te da otro aspecto y te hace sentir mejor contigo mismo",

      image:
        "/assets/images/landing/successStories/alejandra-fernandez-ramirez.jpg",
    },
  ];
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
              Más de 13,718 Socios se han inscrito a kilotón.
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
