import { useEffect, useState } from "react";
import styles from "./ChartBMI.module.scss";

export default function ChartBMI({ height, weight }) {
  const [BMI, setBMI] = useState(0);

  const getState = (value) => {
    if (value >= 18.5 && value < 25) {
      return "Normal";
    } else if (value >= 25 && value < 30) {
      return "Sobrepeso";
    } else if (value >= 30) {
      return "Obesidad";
    }
    return "";
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const heightInMeters = height / 100;
      const calcBMI = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      if (!isNaN(calcBMI)) setBMI(calcBMI);
    }

    return () => (isMounted = false);
  }, [height, weight]);

  return (
    <div className={styles.chart}>
      <div className={styles.graph}>
        <svg width="106" height="54" fill="none" viewBox="0 0 106 54">
          <g>
            <path
              className={`${styles.path} ${
                BMI >= 18.5 && BMI < 25 && styles.active
              }`}
              d="M54.5 99C44.7123 99 35.2105 95.6991 27.5309 89.6308C19.8512 83.5626 14.4425 75.0817 12.1791 65.5592C9.91571 56.0368 10.9299 46.0292 15.0578 37.1545C19.1857 28.2797 26.1859 21.0564 34.9269 16.6523"
              stroke="#C8FB66"
              strokeWidth="15"
            />
            <path
              className={`${styles.path} ${
                BMI >= 25 && BMI < 30 && styles.active
              }`}
              d="M33.4551 17.4306C40.3165 13.6372 48.0755 11.7688 55.9116 12.0229C63.7476 12.2769 71.3694 14.6441 77.9706 18.8739"
              stroke="#F2CC21"
              strokeWidth="15"
            />
            <path
              className={`${styles.path} ${BMI >= 30 && styles.active}`}
              d="M54.5 99C64.2877 99 73.7895 95.6991 81.4691 89.6308C89.1488 83.5626 94.5575 75.0817 96.8209 65.5592C99.0843 56.0368 98.0701 46.0292 93.9422 37.1545C89.8143 28.2797 82.8141 21.0564 74.0731 16.6523"
              stroke="#E45252"
              strokeWidth="15"
            />
          </g>
        </svg>
        <span className={styles.state}>{getState(BMI)}</span>
      </div>
      <div className={styles.data}>
        <span className={styles.value}>{BMI}</span>
        <span className={styles.label}>índice de masa corporal</span>
      </div>
    </div>
  );
}
