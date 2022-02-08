import { CREATE_ORDER_SUCCESS, CREATE_ORDER_ERROR } from "../../actions/orders/create";

export const createOrderCall = (state = {}, { type, payload }) => {
  switch (type) {
    case CREATE_ORDER_SUCCESS:
      return { error: false, ...payload };

    case CREATE_ORDER_ERROR:
      return { error: true };
    default:
      return { ...state };
  }
};
