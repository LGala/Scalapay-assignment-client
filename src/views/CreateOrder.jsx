import React, { useEffect, useState } from "react";

import { ErrorPage } from "../views/ErrorPage";

import { connect } from "react-redux";

import { ConsumerForm } from "../components/ConsumerForm";
import { BillingForm } from "../components/BillingForm";
import { ShippingForm } from "../components/ShippingForm";
import { DiscountsForm } from "../components/DiscountsForm";

import { createOrderCall } from "../actions/orders/create";

import { getTotalAmount } from "../testable-functions/functions/getTotalAmount";

const CreateOrder = ({ items, createOrderCall, createOrderCallResult }) => {
  const [currentForm, setCurrentForm] = useState(0);

  const [submit, setSubmit] = useState(false);

  const [billingIsTheSameOfShipping, setBillingIsTheSameOfShipping] = useState(false);

  const [orderDataConsumer, setOrderDataConsumer] = useState({});
  const [orderDataBilling, setOrderDataBilling] = useState({});
  const [orderDataShipping, setOrderDataShipping] = useState({});
  const [orderDataDiscounts, setOrderDiscounts] = useState([]);

  const showErrorPage = !items.length || !!createOrderCallResult?.error;

  const goNextForm = () => {
    if (billingIsTheSameOfShipping) {
      setCurrentForm(prev => prev + 2);
    } else {
      setCurrentForm(prev => prev + 1);
    }
  };

  const getTotalDiscount = discounts =>
    discounts.map(({ amount }) => amount.amount).reduce((prev, curr) => Number(prev) + Number(curr), 0);

  useEffect(() => {
    if (billingIsTheSameOfShipping) {
      setOrderDataShipping(orderDataBilling);
    }
  }, [billingIsTheSameOfShipping, orderDataBilling]);

  useEffect(() => {
    if ("token" in createOrderCallResult) {
      window.location = createOrderCallResult.checkoutUrl;
    }
  }, [createOrderCallResult]);

  useEffect(() => {
    if (submit) {
      const orderData = {
        totalAmount: {
          amount: getTotalAmount(items).toString(),
          currency: "EUR"
        },
        consumer: orderDataConsumer,
        billing: orderDataBilling,
        shipping: orderDataShipping,
        items,
        discounts: orderDataDiscounts,
        merchant: {
          redirectConfirmUrl: "https://portal.staging.scalapay.com/success-url",
          redirectCancelUrl: "https://portal.staging.scalapay.com/failure-url"
        },
        merchantReference: "102322",
        shippingAmount: { amount: "100", currency: "EUR" },
        taxAmount: { amount: "100", currency: "EUR" },
        orderExpiryMilliseconds: 60 * 1000
      };

      createOrderCall(orderData);
    }
  }, [createOrderCall, items, orderDataBilling, orderDataConsumer, orderDataDiscounts, orderDataShipping, submit]);

  const forms = [
    <ConsumerForm
      setConsumer={setOrderDataConsumer}
      goNextForm={goNextForm}
      requiredMessage={"Required: Given names, Surname, Email in a@a.a format"}
      goodValidation={
        orderDataConsumer?.givenNames &&
        orderDataConsumer?.surname &&
        (orderDataConsumer?.email.length === 0 ||
          (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderDataConsumer?.email) &&
            orderDataConsumer?.email.split(".").length === 2))
      }
    />,
    <BillingForm
      setBilling={setOrderDataBilling}
      goNextForm={goNextForm}
      setBillingIsTheSameOfShipping={setBillingIsTheSameOfShipping}
      goodValidation={orderDataBilling?.countryCode?.length === 2 || orderDataBilling?.countryCode?.length === 0}
      requiredMessage={"CountryCode shoud 2 letters long or empty"}
      billingCanBeEqualToShipping={
        orderDataBilling?.countryCode?.length === 2 &&
        orderDataBilling?.name &&
        orderDataBilling?.postCode &&
        orderDataBilling?.line1
      }
    />,
    <ShippingForm
      setShipping={setOrderDataShipping}
      goNextForm={goNextForm}
      requiredMessage={"Required: Country code (2 letters), Name, Post code, line1"}
      goodValidation={
        orderDataShipping?.countryCode?.length === 2 &&
        orderDataShipping?.postCode &&
        orderDataShipping?.name &&
        orderDataShipping?.line1
      }
    />,
    <DiscountsForm
      discounts={orderDataDiscounts}
      setDiscounts={setOrderDiscounts}
      setSubmit={setSubmit}
      currentTotal={getTotalAmount(items) - getTotalDiscount(orderDataDiscounts)}
      requiredMessage={"Required: Amount, Currency"}
      goodValidation={orderDataDiscounts.every(({ amount }) => amount.amount.length && amount.currency.length)}
    />
  ];

  return <>{!showErrorPage ? forms[currentForm] : <ErrorPage />}</>;
};

const mapDispatchToProps = {
  createOrderCall
};

const mapStateToProps = state => ({
  items: state.purchase,
  createOrderCallResult: state.createOrderCall
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
