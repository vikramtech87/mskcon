import { useState } from "react";

export const useFormHandler = <T>(
  formHandler: (formData: T) => Promise<boolean>
): [boolean, (formData: T) => Promise<void>] => {
  const [isBusy, setIsBusy] = useState(false);

  const formHandlerWithBusyState = async (formData: T) => {
    setIsBusy(true);
    const isHandledSuccessfully = await formHandler(formData);
    if (!isHandledSuccessfully) {
      setIsBusy(false);
    }
  };

  return [isBusy, formHandlerWithBusyState];
};
