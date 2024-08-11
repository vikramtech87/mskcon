import React from "react";
import Container from "./container";

type PageContainerProps = {
  children: React.ReactNode;
  title: string;
};

const PageContainer = ({ children, title }: PageContainerProps) => {
  return (
    <Container>
      <main className="py-8">
        <h2 className="text-3xl sm:text-4xl mb-4 tracking-tight">{title}</h2>
        <div>{children}</div>
      </main>
    </Container>
  );
};

export default PageContainer;
