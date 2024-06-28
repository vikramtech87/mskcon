"use client";

import FormCard from "@/components/form-card";
import LoadingButton from "@/components/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useResetPasswordForm } from "@/hooks/useResetPasswordForm";
import WithGuest from "@/hooks/withGuest";
import { ResetPasswordData } from "@/schemas/resetPassword";
import { auth } from "@/services/firebase/client";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

type ResetPasswordPageProps = {};

const ResetPasswordPage = (props: ResetPasswordPageProps) => {
  const form = useResetPasswordForm();
  const { handleSubmit, control, reset } = form;
  const [emailSent, setEmailSent] = useState(false);

  const [isBusy, formHandler] = useFormHandler(
    async ({ email }: ResetPasswordData) => {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
      return true;
    }
  );

  if (!emailSent) {
    return (
      <FormCard
        title="Reset password"
        description="Reset your password if you forget it"
      >
        <Form {...form}>
          <form onSubmit={handleSubmit(formHandler)} className="space-y-4">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email you used to register</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe@unknown.nos"
                      {...field}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2 pt-8">
              <LoadingButton isLoading={isBusy}>
                Send password reset link
              </LoadingButton>
            </div>
          </form>
        </Form>
      </FormCard>
    );
  }

  return (
    <FormCard title="Reset link sent">
      <div className="flex-col flex">
        <p>
          Instructions to reset your password has been sent to your mail. Knidly
          check your email. If you do not receive the mail, kindly check your
          spam folder also.
        </p>
      </div>
    </FormCard>
  );
};

export default WithGuest(ResetPasswordPage);
