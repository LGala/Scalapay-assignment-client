export const BUY = "BUY";

export const purchase = purchase => async dispatch => {
  dispatch({ type: BUY, payload: purchase });
};
