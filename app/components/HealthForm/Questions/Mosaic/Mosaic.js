import styles from "./Mosaic.module.scss";
import RadioButton from "../../../form/RadioButton/RadioButton";

export default function Mosaic({ data, ...props }) {
  const { type, title, question, answers, note } = data;

  const _renderAnswers = (answers) =>
    answers.map((answer, index) => (
      <div className="col-6" key={index}>
        <RadioButton
          id={answer.name + index}
          name={answer.name}
          label={answer.label}
          type="radio"
          value={answer.value}
          icon={answer.icon}
        />
      </div>
    ));
  return (
    <>
      {title && (
        <>
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <strong className={`${styles.formTitle} mb-2`}>
                Queremos conocer tus hábitos
              </strong>
            </div>
          </div>
          <hr className="mb-4" />
        </>
      )}

      {question && (
        <div className="row">
          <div className="col-12 mb-4">
            <span className={styles.title}>{question}</span>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="row mb-4">{_renderAnswers(answers)}</div>

      {note && (
        <div className="row">
          <div className="col-12">
            <span className={styles.note}>{note}</span>
          </div>
        </div>
      )}
    </>
  );
}
