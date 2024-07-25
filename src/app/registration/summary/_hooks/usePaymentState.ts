import { useReducer } from "react";

type PaymentState = {
  buttonDisabled: boolean;
  buttonText:
    | "Make Payment"
    | "Getting payment link"
    | "Saving transaction data"
    | "Redirecting";
  isLoading: boolean;
};

type PaymentAction =
  | "INITIAL"
  | "MODE_SELECTED"
  | "GET_LINK"
  | "SAVE_DATA"
  | "REDIRECT";

const initialState: PaymentState = {
  buttonDisabled: true,
  buttonText: "Make Payment",
  isLoading: false,
};

const paymentStateReducer = (
  state: PaymentState,
  action: PaymentAction
): PaymentState => {
  switch (action) {
    case "INITIAL":
      return initialState;
    case "MODE_SELECTED":
      return {
        buttonDisabled: false,
        buttonText: "Make Payment",
        isLoading: false,
      };
    case "GET_LINK":
      return {
        buttonDisabled: true,
        buttonText: "Getting payment link",
        isLoading: true,
      };
    case "SAVE_DATA":
      return {
        buttonDisabled: true,
        isLoading: true,
        buttonText: "Saving transaction data",
      };
    case "REDIRECT":
      return {
        buttonDisabled: true,
        buttonText: "Redirecting",
        isLoading: true,
      };
    default:
      throw new Error("Invalid action");
  }
};

export const usePaymentStateReducer = () =>
  useReducer(paymentStateReducer, initialState);
