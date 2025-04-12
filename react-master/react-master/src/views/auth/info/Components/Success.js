import React from "react";
import { Link } from "react-router-dom";

import Styles from "./style.module.css";

export const Success = () => {
  return (
    <div className={`${Styles.pageSt1} text-center`}>
      <h3 className={Styles.headSt}>Success</h3>
      <h1>Thank You For Your Submission</h1>
      <p>You will get an email with further instructions</p>
      <Link to="/" className={`${Styles.btnSt} btn`}>
        Back to Home Page
      </Link>
    </div>
  );
};
