import { Loader2 } from "lucide-react";
import React from "react";

const CenterSpinner = () => {
  return (
    <div className="h-dvh -m-12 grid items-center justify-center">
      <Loader2 className="mr-2 h-16 w-16 text-muted-foreground animate-spin" />
    </div>
  );
};

export default CenterSpinner;
