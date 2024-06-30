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
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import WithGuest from "@/hooks/withGuest";
import { RegisterFormData } from "@/schemas/register";
import { signUpWithEmailPassword } from "@/services/authentication";
import Link from "next/link";
import { useRouter } from "next/navigation";

type RegisterProps = {};

const Register = (props: RegisterProps) => {
  const form = useRegisterForm();

  const { handleSubmit, control, reset } = form;
  const router = useRouter();

  const [isBusy, formHandler] = useFormHandler(
    async ({ email, password }: RegisterFormData) => {
      const signUpResult = await signUpWithEmailPassword(email, password);
      if (!signUpResult.ok) {
        const { error } = signUpResult;
        if (error.code === "auth/email-exists") {
          toast({
            variant: "destructive",
            title: "Email already exists!",
            description: "User with email is already registerd",
            action: (
              <ToastAction
                altText="login"
                onClick={() => {
                  reset();
                  router.push("/auth/login");
                  router.refresh();
                }}
              >
                Login
              </ToastAction>
            ),
          });
        } else {
          toast({
            variant: "destructive",
            title: "Unable to create account!",
            description: "Please try again later",
          });
        }

        return false;
      }

      reset();
      // router.push("/auth/verify-email");
      // router.refresh();

      return true;
    }
  );

  return (
    <FormCard title="Register" description="Begin registration for MSKCon">
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
          <div className="flex flex-col gap-4 pt-8">
            <LoadingButton isLoading={isBusy}>Register</LoadingButton>
            <div className="text-right flex flex-col gap-2 underline">
              <Link href="/auth/login">Already have an account?</Link>
            </div>
          </div>
        </form>
      </Form>
    </FormCard>
  );
};

export default WithGuest(Register);
