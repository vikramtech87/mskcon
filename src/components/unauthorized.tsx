import React from "react";
import CenteredError from "./centered-error";

const Unauthorized = () => {
  return <CenteredError errorCode={401} errorMessage="Unauthorized!" />;
};

export default Unauthorized;
