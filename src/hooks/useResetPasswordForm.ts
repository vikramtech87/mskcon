import {
  ResetPasswordData,
  ResetPasswordSchema,
} from "@/schemas/resetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useResetPasswordForm = () =>
  useForm<ResetPasswordData>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
