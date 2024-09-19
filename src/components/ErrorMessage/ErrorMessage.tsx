
import React from "react";
import css from "./ErrorMessage.module.css";

const ErrorMessage: React.FC = () => {
  return (
    <p className={css.errorMessage}>
      Oops! Something went wrong. Try refreshing the page or come back later.
    </p>
  );
};

export default ErrorMessage;
