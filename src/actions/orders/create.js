import { API_URL } from "../../env";

export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_ERROR = "CREATE_ORDER_ERROR";

export const createOrderCall = userOrder => async dispatch => {
  const result = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userOrder)
  });

  const body = await result.json();

  if (body?.statusCode) {
    dispatch({
      type: CREATE_ORDER_ERROR
    });
  } else {
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: body
    });
  }
};
