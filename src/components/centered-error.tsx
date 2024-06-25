import React from "react";

type CenteredErrorProps = {
  errorCode: number;
  errorMessage: string;
};

const CenteredError = ({ errorCode, errorMessage }: CenteredErrorProps) => {
  return (
    <div className="h-dvh -m-12 grid items-center justify-center">
      <div className="flex space-x-8 items-center">
        <div className="font-semibold text-2xl">{errorCode}</div>
        <div className="flex flex-col flex-wrap">
          <div>{errorMessage}</div>
        </div>
      </div>
    </div>
  );
};

export default CenteredError;
