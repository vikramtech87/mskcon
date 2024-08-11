import { Switch } from "@/components/ui/switch";
import { ApiError } from "@/lib/errors/apiError";
import { toAmount } from "@/lib/utilfuncs";
import { PaymentDataResponse } from "@/schemas/paymentDataResponse";
import { fetchPaymentData } from "@/services/api";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import React, { useEffect, useReducer, useState } from "react";

type PaymentDataState = {
  isLoading: boolean;
  error: ApiError | undefined;
  data: PaymentDataResponse | undefined;
};

type PaymentDataAction =
  | {
      action: "Loading";
    }
  | {
      action: "Error";
      error: ApiError;
    }
  | {
      action: "Success";
      data: PaymentDataResponse;
    };

const paymentDataReducer = (
  _: PaymentDataState,
  action: PaymentDataAction
): PaymentDataState => {
  switch (action.action) {
    case "Error":
      return {
        isLoading: false,
        error: action.error,
        data: undefined,
      };
    case "Loading":
      return {
        isLoading: true,
        error: undefined,
        data: undefined,
      };
    case "Success":
      return {
        isLoading: false,
        error: undefined,
        data: action.data,
      };
    default:
      throw new Error("Invalid action");
  }
};

const initialState: PaymentDataState = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

type FeeCalculatorProps = {};

const FeeCalculator = (props: FeeCalculatorProps) => {
  const [state, dispatch] = useReducer(paymentDataReducer, initialState);

  const [isEarlyBird, setIsEarlyBird] = useState(true);
  const [isPostgraduate, setIsPostgraduate] = useState(false);
  const [isWorkshop, setIsWorkshop] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ action: "Loading" });
      const result = await fetchPaymentData();

      if (!result.ok) {
        dispatch({ action: "Error", error: result.error });
        return;
      }

      dispatch({ action: "Success", data: result.value });
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (state.data !== undefined) {
      const {
        consultant,
        consultantEarly,
        postgraduate,
        postgraduateEarly,
        workshop,
      } = state.data;

      let total = isPostgraduate ? postgraduateEarly : consultantEarly;

      if (!isEarlyBird) {
        total = isPostgraduate ? postgraduate : consultant;
      }

      total += isWorkshop ? workshop : 0;
      setTotalAmount(total);
    }
  }, [state, isPostgraduate, isEarlyBird, isWorkshop]);

  return (
    <section>
      <h3 className="text-xl font-medium">Fee calculator</h3>
      <div className="">
        <dl className="divide-y divide-y-gray-100">
          <DItem>
            <Dt>Registering on or before Sep 31?</Dt>
            <Dd>
              <Switch
                checked={isEarlyBird}
                onCheckedChange={(checked) => setIsEarlyBird(checked)}
              />
            </Dd>
          </DItem>
          <DItem>
            <Dt>Are you a Postgraduate?</Dt>
            <Dd>
              <Switch
                checked={isPostgraduate}
                onCheckedChange={(checked) => setIsPostgraduate(checked)}
              />
            </Dd>
          </DItem>
          <DItem>
            <Dt>Are you attending workshop?</Dt>
            <Dd>
              <Switch
                checked={isWorkshop}
                onCheckedChange={(checked) => setIsWorkshop(checked)}
              />
            </Dd>
          </DItem>
          <DItem>
            <Dt isFooter={true}>Total fee</Dt>
            <Dd>
              {state.isLoading && (
                <Loader2 className="animate-spin text-muted-foreground" />
              )}
              {state.error && (
                <Loader2 className="animate-spin text-muted-foreground" />
              )}
              {state.data && (
                <span className="text-base font-bold">
                  {toAmount(totalAmount)}
                </span>
              )}
            </Dd>
          </DItem>
        </dl>
      </div>
    </section>
  );
};

type ItemProps = {
  children: React.ReactNode;
};

const DItem = ({ children }: ItemProps) => {
  return <div className="px-4 py-6 grid grid-cols-4 gap-4">{children}</div>;
};

type DtProps = {
  children: React.ReactNode;
  isFooter?: boolean;
};

const Dt = ({ children, isFooter }: DtProps) => {
  const isEm = isFooter ?? false;

  const classList = clsx({
    "text-sm": true,
    "font-medium": !isEm,
    "font-bold": isEm,
    "leading-6": true,
    "text-gray-900": !isEm,
    "col-span-3": true,
  });
  return <dt className={classList}>{children}</dt>;
};

type DdProps = {
  children: React.ReactNode;
};

const Dd = ({ children }: DdProps) => {
  return <dd className="leading-6">{children}</dd>;
};

export default FeeCalculator;
