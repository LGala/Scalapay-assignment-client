import React from "react";

import { PlaceForm } from "./PlaceForm";

export const ShippingForm = ({ setShipping, goNextForm, goodValidation, requiredMessage }) => {
  return (
    <PlaceForm
      title={"we need just some shipping info"}
      setPlace={setShipping}
      goNextForm={goNextForm}
      goodValidation={goodValidation}
      requiredMessage={requiredMessage}
    />
  );
};
