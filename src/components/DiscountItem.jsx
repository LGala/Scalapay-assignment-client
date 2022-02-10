import React, { useState, useEffect } from "react";
import "../styles/DiscountItem.css";

import { InputBox } from "./InputBox";

export const DiscountItem = ({ setDiscounts, id }) => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const rightAmount = amount > 0 ? amount : "";

    setDiscounts(prev => {
      prev[id] = { amount: { amount: rightAmount, currency }, displayName };
      setDiscounts([...prev]);
    });
  }, [amount, currency, displayName, id, setDiscounts]);

  return (
    <div className="discount-item" data-cy={"discount-item"}>
      <InputBox placeholder={"amount"} dataCy={"discount-amount"} setValue={setAmount} />
      <InputBox placeholder={"currency (should be EUR)"} dataCy={"discount-currency"} setValue={setCurrency} />
      <InputBox placeholder={"displayName"} dataCy={"discount-displayName"} setValue={setDisplayName} />
    </div>
  );
};
