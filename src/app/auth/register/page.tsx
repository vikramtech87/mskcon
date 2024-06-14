"use client";
import FormCard from "@/components/form-card";
import FormContainer from "@/components/form-container";
import LoadingButton from "@/components/loading-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { RegisterFormData } from "@/schemas/register";
import { useState } from "react";

const Register = () => {
  const form = useRegisterForm();
  const { handleSubmit, control } = form;
  const [isRegistering, setIsRegistering] = useState(false);
  const onRegister = async (formData: RegisterFormData) => {
    setIsRegistering(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(formData);
    setIsRegistering(false);
  };

  return (
    <FormCard title="Register" description="Begin registration for MSKCon">
      <Form {...form}>
        <form onSubmit={handleSubmit(onRegister)} className="space-y-4">
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
            <LoadingButton isLoading={isRegistering}>Register</LoadingButton>
          </div>
        </form>
      </Form>
    </FormCard>
  );
};

export default Register;
