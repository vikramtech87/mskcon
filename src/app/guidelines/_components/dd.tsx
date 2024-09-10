type DdProps = {
  children: React.ReactNode;
};

const Dd = ({ children }: DdProps) => {
  return <dd className="leading-6 col-span-2">{children}</dd>;
};

export default Dd;
