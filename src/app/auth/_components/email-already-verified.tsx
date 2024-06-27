import FormCard from "@/components/form-card";
import { Button } from "@/components/ui/button";
import React from "react";

const EmailAlreadyVerified = () => {
  return (
    <FormCard title="Email already verified">
      <div className="flex-col flex">
        <p>Your email is already verified.</p>
        <div className="pt-8 flex flex-col">
          <Button>Continue with registration</Button>
        </div>
      </div>
    </FormCard>
  );
};

export default EmailAlreadyVerified;
