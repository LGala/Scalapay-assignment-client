import React from "react";
import "../styles/ShopItem.css";

export const ShopItem = ({ price, name, sku, brand, imageName, setCart, quantity }) => {
  const addCurrentItemToCart = e => {
    setCart(previous => ({ ...previous, [sku]: previous[sku] + 1 }));
  };
  const removeCurrentItemFromCart = e => {
    setCart(previous => ({ ...previous, [sku]: previous[sku] ? previous[sku] - 1 : previous[sku] }));
  };

  return (
    <div className="item-container">
      <img className="shoe-img" src={require(`../assets/img/${imageName}`)} alt="shoe" />
      <div className="item-description">
        <p>{`${brand} ${name}`}</p>
        <p>{`${price.amount} ${price.currency}`}</p>
        <button className="cart-add" onClick={addCurrentItemToCart} data-cy="cart-add">
          {quantity || "+"}
        </button>
        <button className="cart-remove" onClick={removeCurrentItemFromCart} data-cy="cart-remove">
          -
        </button>
      </div>
    </div>
  );
};
