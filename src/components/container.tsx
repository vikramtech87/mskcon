import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-screen-lg w-full mx-auto px-6 lg:px-0">
      {children}
    </div>
  );
};

export default Container;
