import React from "react";
import "../styles/ErrorPage.css";
import page_not_found from "../assets/img/page_not_found.svg";

export const ErrorPage = () => (
  <div className="not-found-container" data-cy="not-found-container">
    <img src={page_not_found} className="page-not-found-img" alt="page not found" />
    <h2 className="page-not-found-h2">ERROR</h2>
    <p className="page-not-found-explanation">
      Something bad with the payment happened or more probably you mistyped the url
    </p>
  </div>
);
