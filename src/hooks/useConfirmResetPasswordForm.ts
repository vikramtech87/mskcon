import {
  ConfirmResetPasswordData,
  ConfirmResetPasswordSchema,
} from "@/schemas/confirmResetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useConfirmResetPasswordForm = () =>
  useForm<ConfirmResetPasswordData>({
    resolver: zodResolver(ConfirmResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
