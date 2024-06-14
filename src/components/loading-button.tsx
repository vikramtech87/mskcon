import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";

type LoadingButtonProps = {
  isLoading?: boolean;
} & ButtonProps;

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading = false,
  children,
  ...buttonProps
}) => (
  <Button type="submit" disabled={isLoading} {...buttonProps}>
    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
    {children}
  </Button>
);

export default LoadingButton;
