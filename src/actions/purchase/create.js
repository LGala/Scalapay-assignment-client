export const BUY = "BUY";

export const purchase = items => async dispatch => {
  dispatch({ type: BUY, payload: items });
};
