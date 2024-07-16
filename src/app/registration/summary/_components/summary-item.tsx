import React from "react";

type SummaryItemProps = {
  prompt?: string;
  children: React.ReactNode;
};

const SummaryItem = ({ prompt, children }: SummaryItemProps) => {
  return (
    <>
      <dt className="text-muted-foreground">{prompt}</dt>
      <dd className="col-span-2 font-medium">{children}</dd>
    </>
  );
};

export default SummaryItem;
