import styles from "./ErrorMessage.module.css";

type ErrorMessageTypes = {
  error: String;
};

export const ErrorMessage = ({ error }: ErrorMessageTypes) => {
  return <span className={styles.error}>{error}</span>;
};
