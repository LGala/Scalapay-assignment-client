import React, { useEffect, useState } from "react";

import { InputBox } from "./InputBox";

import "../styles/ConsumerForm.css";
import { ActionButton } from "./ActionButton";

export const ConsumerForm = ({ setConsumer, goNextForm, goodValidation, requiredMessage }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [givenNames, setGivenNames] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setConsumer({ phoneNumber, givenNames, surname, email });
  }, [setConsumer, phoneNumber, givenNames, surname, email]);

  return (
    <div className="consumer-container" data-cy={"consumer-container"}>
      <h3 className="details-title">We just need some details about you</h3>
      <InputBox placeholder={"Phone number"} setValue={setPhoneNumber} />
      <InputBox placeholder={"Given names"} setValue={setGivenNames} dataCy={"given-names"} />
      <InputBox placeholder={"Surname "} setValue={setSurname} dataCy={"surname"} />
      <InputBox placeholder={"Email"} setValue={setEmail} dataCy={"email"} />
      {!goodValidation && <label className="required-message">{requiredMessage}</label>}
      <ActionButton show={goodValidation} action={goNextForm} label={"NEXT"} dataCy={"go-billing-form"} />
    </div>
  );
};
