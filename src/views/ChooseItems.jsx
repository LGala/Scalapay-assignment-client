import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { itemsData } from "../assets/mocks/shoes";
import { ShopItem } from "../components/ShopItem";
import { getItemsToBuy } from "../testable-functions/functions/ChooseItems";
import { purchase } from "../actions/purchase/create";
import { ActionButton } from "../components/ActionButton";

import "../styles/ChooseItems.css";
import { getTotalAmount } from "../testable-functions/functions/getTotalAmount";

const ChooseItems = ({ purchase }) => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(Object.fromEntries(itemsData.map(({ sku }) => [sku, 0])));

  const cartLength = Object.values(cart).reduce((prev, curr) => prev + curr, 0);

  const totalAmount = getTotalAmount(getItemsToBuy(cart, itemsData));

  const itemsComponents = itemsData.map(itemData => (
    <ShopItem key={itemData.sku} {...itemData} quantity={cart[itemData.sku]} setCart={setCart} />
  ));

  return (
    <>
      <div className="items-container" data-cy="items-container">
        {itemsComponents}
      </div>
      <div className="buy-items-button-container">
        <ActionButton
          show={!!cartLength && totalAmount <= 1000}
          action={() => {
            purchase(getItemsToBuy(cart, itemsData));
            navigate("/create-order");
          }}
          label={`BUY  ${cartLength}  ITEMS  FOR  ${totalAmount} €  (MAX 1000 €)`}
          dataCy={"buy-items"}
        />
      </div>
    </>
  );
};

const mapDispatchToProps = {
  purchase
};

export default connect(null, mapDispatchToProps)(ChooseItems);
