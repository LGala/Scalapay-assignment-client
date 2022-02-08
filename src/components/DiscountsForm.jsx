import { useState } from "react";
import { ActionButton } from "./ActionButton";
import { DiscountItem } from "./DiscountItem";

import "../styles/DiscountsForm.css";

export const DiscountsForm = ({
  discounts,
  setDiscounts,
  setSubmit,
  requiredMessage,
  goodValidation,
  currentTotal
}) => {
  const [discountsComponents, setDiscountsComponents] = useState([]);

  return (
    <div className="discounts-items-container" data-cy="discounts-items-container">
      {!isNaN(currentTotal) && (
        <h3>
          {`total is ${currentTotal}, `}
          {currentTotal > 0 ? "any discount?" : "consider to delete a discount entry"}
        </h3>
      )}
      {discountsComponents}
      <ActionButton
        label={"create a new discount entry"}
        show={true}
        action={() => {
          setDiscountsComponents(prev => [
            ...prev,
            <DiscountItem setDiscounts={setDiscounts} key={discounts.length} id={discounts.length} />
          ]);
        }}
        dataCy={"create-new-entry"}
      />
      {!goodValidation && <label className="required-message">{requiredMessage}</label>}
      <ActionButton
        show={goodValidation && currentTotal > 0}
        label={"I'm done!"}
        dataCy={"submit-entire-flow"}
        action={() => {
          setSubmit(true);
        }}
      />
    </div>
  );
};
