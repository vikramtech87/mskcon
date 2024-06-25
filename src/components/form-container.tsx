import React from "react";

type FormContainerProps = {
  children: React.ReactNode;
};

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <div className=" max-w-sm w-full mx-auto px-2 sm:px-0">{children}</div>
  );
};

export default FormContainer;
