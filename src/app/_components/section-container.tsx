import Container from "@/components/container";
import React from "react";

type SectionContainerProps = {
  title: string;
  children: React.ReactNode;
};

const SectionContainer = ({ children, title }: SectionContainerProps) => {
  return (
    <Container>
      <div className="py-8 sm:py-12 space-y-4 sm:space-y-8 text-center">
        <h2 className="text-3xl sm:text-4xl">{title}</h2>
        {children}
      </div>
    </Container>
  );
};

export default SectionContainer;
