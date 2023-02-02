import { useEffect, useState } from "react";
import styles from "./ChartCentimeters.module.scss";

export default function ChartCentimeters({ sex, waist }) {
  // Centimeters to lose
  const [centimetersToLose, setCentimetersToLose] = useState(0);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (sex === "male") {
        setCentimetersToLose(waist - 80);
      } else {
        setCentimetersToLose(waist - 90);
      }
    }
  }, [sex, waist]);

  return (
    <div className={styles.chart}>
      <div className={styles.circle}>
        {centimetersToLose > 0 ? centimetersToLose : 0} cm
      </div>
      <div className={styles.content}>
        Centímetros a bajar para alcanzar objetivo
      </div>
    </div>
  );
}
