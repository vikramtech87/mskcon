import PageContainer from "@/components/page-container";
import { Separator } from "@/components/ui/separator";
import React from "react";

const ContactUsPage = () => {
  return (
    <PageContainer title="Contact Us">
      <div className="border rounded w-full max-w-md mx-auto">
        <ContactItem prompt="Registration" value="bstp2024@gmail.com" />
        <ContactItem prompt="Payment" value="finance.bstp2024@gmail.com" />
        <ContactItem prompt="Posters" value="posters.bstp2024@gmail.com" />
        <ContactItem
          prompt="Accomodation"
          value="transport.bstp2024@gmail.com"
        />
        <ContactItem
          prompt="Telephone"
          value="0416-2282005 (Mon-Fri 8AM-4PM)"
        />
      </div>
    </PageContainer>
  );
};

type ContactItemProps = {
  prompt: string;
  value: string;
};

const ContactItem = ({ prompt, value }: ContactItemProps) => {
  return (
    <>
      <div className="grid grid-cols-3 items-center text-sm gap-4 pt-4">
        <div>
          <div className="text-muted-foreground text-right">{prompt}</div>
        </div>
        <div className="font-medium col-span-2">{value}</div>
      </div>
      <Separator className="mt-4" />
    </>
  );
};

export default ContactUsPage;
