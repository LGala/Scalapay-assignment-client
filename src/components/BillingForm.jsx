import React from "react";

import { PlaceForm } from "./PlaceForm";

import "../styles/BillingForm.css";

export const BillingForm = ({
  setBilling,
  setBillingIsTheSameOfShipping,
  goNextForm,
  billingCanBeEqualToShipping,
  goodValidation,
  requiredMessage
}) => {
  const checkBox = billingCanBeEqualToShipping && (
    <div className="billing-shipping-equal-container">
      <input
        type={"checkbox"}
        onChange={e => {
          setBillingIsTheSameOfShipping(e.target.checked);
        }}
        data-cy="billing-shipping-equal-checkbox"
      />
      <label className="billing-shipping-label">Billing/shipping data are the same</label>
    </div>
  );

  return (
    <div className="billing-form-container" data-cy={"billing-form-container"}>
      {checkBox}
      <PlaceForm
        title={"we need just some billing info"}
        setPlace={setBilling}
        goNextForm={goNextForm}
        requiredMessage={requiredMessage}
        goodValidation={goodValidation}
      />
    </div>
  );
};
