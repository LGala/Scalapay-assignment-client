import React, { useEffect, useState } from "react";

import { ErrorPage } from "../views/ErrorPage";

import { connect } from "react-redux";

import { ConsumerForm } from "../components/ConsumerForm";
import { BillingForm } from "../components/BillingForm";
import { ShippingForm } from "../components/ShippingForm";
import { DiscountsForm } from "../components/DiscountsForm";

import { createOrderCall } from "../actions/orders/create";

const CreateOrder = ({ items, totalAmountWithoutDiscounts, createOrderCall, createOrderCallResult }) => {
  const [currentForm, setCurrentForm] = useState(0);

  const [submit, setSubmit] = useState(false);

  const [billingIsTheSameOfShipping, setBillingIsTheSameOfShipping] = useState(false);

  const [orderDataConsumer, setOrderDataConsumer] = useState({});
  const [orderDataBilling, setOrderDataBilling] = useState({});
  const [orderDataShipping, setOrderDataShipping] = useState({});
  const [orderDataDiscounts, setOrderDiscounts] = useState([]);

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

  const getTotalDiscount = discounts =>
    discounts.map(({ amount }) => amount.amount).reduce((prev, curr) => Number(prev) + Number(curr), 0);

  const totalAmountWithDiscounts = totalAmountWithoutDiscounts - getTotalDiscount(orderDataDiscounts);

  useEffect(() => {
    if (submit) {
      const orderData = {
        totalAmount: {
          amount: totalAmountWithDiscounts.toString(),
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
        shippingAmount: { amount: "10", currency: "EUR" },
        taxAmount: { amount: "10", currency: "EUR" },
        orderExpiryMilliseconds: 60 * 1000
      };

      createOrderCall(orderData);
    }
  }, [
    createOrderCall,
    items,
    orderDataBilling,
    orderDataConsumer,
    orderDataDiscounts,
    orderDataShipping,
    submit,
    totalAmountWithDiscounts
  ]);

  const goNextForm = () => {
    setCurrentForm(prev => prev + (billingIsTheSameOfShipping ? 2 : 1));
  };

  const shippingWouldBeGoodValidated = orderData =>
    orderData?.countryCode?.length === 2 && orderData?.postCode && orderData?.name && orderData?.line1;

  const forms = [
    <ConsumerForm
      setConsumer={setOrderDataConsumer}
      goNextForm={goNextForm}
      requiredMessage={"Required: Given names, Surname, Email (empty or valid)"}
      goodValidation={
        orderDataConsumer?.givenNames &&
        orderDataConsumer?.surname &&
        (!orderDataConsumer?.email.length ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(orderDataConsumer?.email))
      }
    />,
    <BillingForm
      setBilling={setOrderDataBilling}
      goNextForm={goNextForm}
      setBillingIsTheSameOfShipping={setBillingIsTheSameOfShipping}
      requiredMessage={"CountryCode should 2 letters long or empty"}
      goodValidation={[0, 2].includes(orderDataBilling?.countryCode?.length)}
      billingCanBeEqualToShipping={shippingWouldBeGoodValidated(orderDataBilling)}
    />,
    <ShippingForm
      setShipping={setOrderDataShipping}
      goNextForm={goNextForm}
      requiredMessage={"Required: Country code (2 letters), Name, Post code, line1"}
      goodValidation={shippingWouldBeGoodValidated(orderDataShipping)}
    />,
    <DiscountsForm
      discounts={orderDataDiscounts}
      setDiscounts={setOrderDiscounts}
      setSubmit={setSubmit}
      currentTotal={totalAmountWithDiscounts}
      requiredMessage={"Required: Amount (positive number), Currency"}
    />
  ];

  const showErrorPage = !!!items?.length || !!createOrderCallResult?.error;

  return <>{!showErrorPage ? forms[currentForm] : <ErrorPage />}</>;
};

const mapDispatchToProps = {
  createOrderCall
};

const mapStateToProps = state => ({
  items: state.purchase.items,
  totalAmountWithoutDiscounts: state.purchase.totalAmountWithoutDiscounts,
  createOrderCallResult: state.createOrderCall
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
