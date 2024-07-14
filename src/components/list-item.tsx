import clsx from "clsx";

type ListItemProps = {
  isSelected: boolean;
  disabled: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

const ListItem = ({
  isSelected,
  disabled,
  onClick,
  children,
}: ListItemProps) => {
  const classList = clsx({
    "py-2 px-4 rounded-lg": true,
    "border-neutral-100": disabled,
    border: true,
    "text-neutral-200": disabled,
    "border-primary": isSelected,
    "border-2": true,
    "cursor-pointer": !disabled,
    "cursor-not-allowed": disabled,
    "select-none": true,
  });

  const handleClick = () => {
    if (disabled) {
      return;
    }
    if (onClick !== undefined) {
      onClick();
    }
  };

  return (
    <li onClick={() => handleClick()} className={classList}>
      {children}
    </li>
  );
};

export default ListItem;
