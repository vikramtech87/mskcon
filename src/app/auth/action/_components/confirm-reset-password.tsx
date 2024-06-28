"use client";

import FormCard from "@/components/form-card";
import LoadingButton from "@/components/loading-button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useConfirmResetPasswordForm } from "@/hooks/useConfirmResetPasswordForm";
import { useFormHandler } from "@/hooks/useFormHandler";
import WithGuest from "@/hooks/withGuest";
import { ConfirmResetPasswordData } from "@/schemas/confirmResetPassword";
import { performPasswordReset } from "@/services/authentication";
import { auth } from "@/services/firebase/client";
import { confirmPasswordReset, sendEmailVerification } from "firebase/auth";
import Link from "next/link";
import React, { useReducer, useState } from "react";

type ConfirmResetPasswordProps = {
  oobCode: string;
};

type ResetPasswordState = {
  completed: boolean;
  success: boolean;
};

type ResetPasswordAction =
  | {
      type: "SuccessfulCompletion";
    }
  | {
      type: "FailureCompletion";
    };

const reducer = (
  _: ResetPasswordState,
  action: ResetPasswordAction
): ResetPasswordState => {
  if (action.type === "SuccessfulCompletion") {
    return {
      completed: true,
      success: true,
    };
  }
  if (action.type === "FailureCompletion") {
    return {
      completed: true,
      success: false,
    };
  }
  throw new Error("Invaid action");
};

const ConfirmResetPassword = ({ oobCode }: ConfirmResetPasswordProps) => {
  const form = useConfirmResetPasswordForm();

  const { handleSubmit, control, reset } = form;
  const [state, dispatch] = useReducer(reducer, {
    completed: false,
    success: false,
  });

  const [isBusy, formHandler] = useFormHandler(
    async ({ password }: ConfirmResetPasswordData) => {
      const result = await performPasswordReset(oobCode, password);
      if (result.ok) {
        dispatch({ type: "SuccessfulCompletion" });
        return true;
      }
      dispatch({ type: "FailureCompletion" });
      return true;
    }
  );

  if (state.completed !== true) {
    return (
      <FormCard title="Reset password" description="Enter your new password">
        <Form {...form}>
          <form onSubmit={handleSubmit(formHandler)} className="space-y-4">
            <FormField
              name="password"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="confirm password"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2 pt-8">
              <LoadingButton isLoading={isBusy}>Reset password</LoadingButton>
            </div>
          </form>
        </Form>
      </FormCard>
    );
  }

  if (state.success === true) {
    return (
      <FormCard title="Reset password">
        <p>
          Your password is successfully reset. You can login with the new
          password
        </p>
      </FormCard>
    );
  }

  return (
    <FormCard title="Failed password reset">
      <p>
        Your reset link is expired or invalid. Please try again by{" "}
        <Link href="/auth/reset-password" className="text-primary underline">
          generating the link
        </Link>
        {""}.
      </p>
    </FormCard>
  );
};

export default WithGuest(ConfirmResetPassword);
