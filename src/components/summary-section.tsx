import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";

type SummarySectionProps = {
  heading: string;
  children: React.ReactNode;
  editLink?: string;
};

const SummarySection = ({
  heading,
  editLink,
  children,
}: SummarySectionProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="uppercase font-medium">{heading}</h3>
        {editLink && (
          <Link
            className="flex items-center gap-1 text-primary"
            href={editLink}
          >
            <Pencil size={14} />
          </Link>
        )}
      </div>
      <dl className="text-sm grid grid-cols-3 gap-2">{children}</dl>
    </div>
  );
};

export default SummarySection;
