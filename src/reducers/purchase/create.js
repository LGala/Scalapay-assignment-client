import { BUY } from "../../actions/purchase/create";

export const purchase = (state = [], { type, payload }) => {
  switch (type) {
    case BUY:
      return payload;
    default:
      return state;
  }
};
