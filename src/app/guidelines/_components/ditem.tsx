type ItemProps = {
  children: React.ReactNode;
};

const DItem = ({ children }: ItemProps) => {
  return <div className="px-4 py-6 grid grid-cols-6 gap-4">{children}</div>;
};

export default DItem;
