import React from "react";

type FormActionProps = {
  children: React.ReactNode;
};

const FormAction = ({ children }: FormActionProps) => {
  return <div className="flex flex-col gap-4 pt-8">{children}</div>;
};

export default FormAction;
