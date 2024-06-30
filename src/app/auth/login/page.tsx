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
import { toast } from "@/components/ui/use-toast";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useLoginForm } from "@/hooks/useLoginForm";
import WithGuest from "@/hooks/withGuest";
import { LoginFormData } from "@/schemas/login";
import { loginWithEmailAndPassword } from "@/services/authentication";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type LoginPageProps = {};

const LoginPage = (props: LoginPageProps) => {
  const form = useLoginForm();
  const { handleSubmit, control, reset } = form;

  const router = useRouter();

  const [isBusy, formHandler] = useFormHandler(
    async ({ email, password }: LoginFormData) => {
      const loginResult = await loginWithEmailAndPassword(email, password);
      if (!loginResult.ok) {
        const { error } = loginResult;
        if (error.code === "auth/invalid-credential") {
          toast({
            variant: "destructive",
            title: "Unanle to sign in!",
            description: "Invalid email or password",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Unanle to sign in!",
            description: "Please try again later",
          });
        }
        return false;
      }

      reset();
      router.push("/");
      router.refresh();

      return true;
    }
  );

  return (
    <FormCard
      title="Sign In"
      description="Sign in if you already created an account"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(formHandler)} className="space-y-4">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="password"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4 pt-8">
            <LoadingButton isLoading={isBusy}>Sign In</LoadingButton>
            <div className="text-right flex flex-col gap-2 underline">
              <Link href="/auth/reset-password">Forgot password?</Link>
              <Link href="/auth/register">Do not have an account?</Link>
            </div>
          </div>
        </form>
      </Form>
    </FormCard>
  );
};

export default WithGuest(LoginPage);
