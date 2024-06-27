import { Loader2 } from "lucide-react";
import React from "react";

type CenterSpinnerProps = {
  message?: string;
};

const CenterSpinner = ({ message }: CenterSpinnerProps) => {
  return (
    <div className="h-dvh -m-12 grid items-center justify-center">
      <div className="flex flex-col gap-4 items-center text-muted-foreground">
        <Loader2 className="mr-2 h-16 w-16 animate-spin" />
        {message && <div className="text-2xl">{message}</div>}
      </div>
    </div>
  );
};

export default CenterSpinner;
