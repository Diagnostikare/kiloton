import { useEffect, useState } from "react";
import styles from "./ChartKilograms.module.scss";

export default function ChartKilograms({ height, weight }) {
  // Centimeters to lose
  const [BMI, setBMI] = useState(0);
  const [kilogramsToLose, setKilogramsToLose] = useState(0);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const heightInMeters = height / 100;
      const calcBMI = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      if (!isNaN(calcBMI)) setBMI(calcBMI);
    }
  }, [height, weight]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (BMI <= 24.9) {
        // average
        const initialAverage = (weight * 0) / 100;
        const finalAverage = (weight * 3) / 100;
        const average = (initialAverage + finalAverage) / 2;
        setKilogramsToLose(average.toFixed(2));
      } else if (BMI >= 25 && BMI < 30) {
        // Average
        const initialAverage = (weight * 3) / 100;
        const finalAverage = (weight * 5) / 100;
        const average = (initialAverage + finalAverage) / 2;
        setKilogramsToLose(average.toFixed(2));
      } else if (BMI >= 30 && BMI < 35) {
        // Average
        const initialAverage = (weight * 5) / 100;
        const finalAverage = (weight * 7) / 100;
        const average = (initialAverage + finalAverage) / 2;
        setKilogramsToLose(average.toFixed(2));
      } else if (BMI >= 35 && BMI < 40) {
        // Average
        const initialAverage = (weight * 7) / 100;
        const finalAverage = (weight * 10) / 100;
        const average = (initialAverage + finalAverage) / 2;
        setKilogramsToLose(average.toFixed(2));
      } else if (BMI >= 40) {
        // Average
        const average = (weight * 10) / 100;
        setKilogramsToLose(average.toFixed(2));
      }
    }
  }, [BMI, weight]);

  return (
    <div className={styles.chart}>
      <div className={styles.square}>{kilogramsToLose} kg</div>
    </div>
  );
}
