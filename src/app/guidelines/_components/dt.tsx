import clsx from "clsx";

type DtProps = {
  children: React.ReactNode;
  isFooter?: boolean;
};

const Dt = ({ children, isFooter }: DtProps) => {
  const isEm = isFooter ?? false;

  const classList = clsx({
    "text-sm": true,
    "font-medium": !isEm,
    "font-bold": isEm,
    "leading-6": true,
    "text-gray-900": !isEm,
    "col-span-4": true,
  });
  return <dt className={classList}>{children}</dt>;
};

export default Dt;
