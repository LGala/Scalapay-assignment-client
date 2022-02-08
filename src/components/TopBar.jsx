import React from "react";
import "../styles/TopBar.css";
import scalapay_logo from "../assets/img/scalapay_logo.svg";

export const TopBar = () => (
  <div className="topbar">
    <img src={scalapay_logo} className="scalapay-logo" alt="scalapay" />
  </div>
);
