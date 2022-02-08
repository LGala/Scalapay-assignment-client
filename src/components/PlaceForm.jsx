import React, { useEffect, useState } from "react";

import { InputBox } from "./InputBox";

import "../styles/PlaceForm.css";
import { ActionButton } from "./ActionButton";

export const PlaceForm = ({ title, setPlace, goNextForm, goodValidation, requiredMessage }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [name, setName] = useState("");
  const [postCode, setPostCode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [line1, setLine1] = useState("");

  useEffect(() => {
    setPlace({ phoneNumber, countryCode, name, postCode, suburb, line1 });
  }, [countryCode, line1, name, phoneNumber, postCode, setPlace, suburb]);

  return (
    <div className="place-form-container" data-cy="place-form-container">
      <h3>{title}</h3>
      <InputBox placeholder={"Phone number"} setValue={setPhoneNumber} />
      <InputBox placeholder={"Country code"} setValue={setCountryCode} dataCy={"country-code"} />
      <InputBox placeholder={"Name"} setValue={setName} dataCy={"name"} />
      <InputBox placeholder={"Post code"} setValue={setPostCode} dataCy={"post-code"} />
      <InputBox placeholder={"Suburb"} setValue={setSuburb} dataCy={"suburb"} />
      <InputBox placeholder={"Line1"} setValue={setLine1} dataCy={"line1"} />
      {!goodValidation && <label className="required-message">{requiredMessage}</label>}
      <ActionButton show={goodValidation} action={goNextForm} label={"NEXT"} dataCy={"go-shipping-or-discount-form"} />
    </div>
  );
};
