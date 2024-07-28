"use client";

import FormCard from "@/components/form-card";
import LoadingButton from "@/components/loading-button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useProfileForm } from "@/hooks/useProfileForm";
import { ProfileFormData } from "@/schemas/profile";
import { saveProfile } from "@/services/user";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type ProfileFormProps = {
  profileState?: ProfileFormData;
  authUserId: string;
  authEmail: string;
};

const ProfileForm = ({
  profileState,
  authEmail,
  authUserId,
}: ProfileFormProps) => {
  const form = useProfileForm(profileState);

  const { handleSubmit, control, watch } = form;

  const [agreeTerms, setAgreeTerms] = useState(false);

  const router = useRouter();

  const [isBusy, formHandler] = useFormHandler(
    async (formData: ProfileFormData) => {
      await saveProfile(authUserId, authEmail, formData);
      router.push("/registration/next");
      router.refresh();
      return true;
    }
  );

  const action = profileState === undefined ? "Save details" : "Update details";
  const isPostgraduate = watch("designation") === "postgraduate";
  const isDisabled = isBusy || (isPostgraduate && !agreeTerms);

  return (
    <FormCard title="User details" description="Enter details for registration">
      <Form {...form}>
        <form onSubmit={handleSubmit(formHandler)} className="space-y-4">
          <FormField
            control={control}
            name="designation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registering as</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your designation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="postgraduate">
                          Postgraduate
                        </SelectItem>
                        <SelectItem value="consultant">Consultant</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Eg: Dr" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      {...field}
                      autoComplete="given-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      {...field}
                      autoComplete="family-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name="college"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of the Institute / Hospital</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="organization" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <FormField
              control={control}
              name="medicalCouncil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical council</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Eg: Tamil Nadu medical council"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="medicalCouncilNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical council number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Eg: 12345"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address line 1</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Address line 1"
                    {...field}
                    autoComplete="address-line1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="addressLine2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address line 2 &#40;optional&#41;</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Address line 2"
                    {...field}
                    autoComplete="address-line2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <FormField
              control={control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="City"
                      {...field}
                      autoComplete="address-level2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="State"
                      {...field}
                      autoComplete="address-level1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <FormField
              control={control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Eg: India"
                      {...field}
                      autoComplete="country-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Eg: 600001"
                      {...field}
                      autoComplete="postal-code"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile number &#40;optional&#41;</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Eg: 9876543210"
                    {...field}
                    autoComplete="mobile tel"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isPostgraduate && (
            <div className="flex items-start space-x-4 mt-2">
              <Checkbox
                className="mt-1"
                checked={agreeTerms}
                disabled={isBusy}
                onCheckedChange={() => setAgreeTerms((prev) => !prev)}
              />
              <div className="leading-0">
                By registering as a post graduate, I agree to produce bonafide
                certificate from my department on the day of conference.
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4 pt-8">
            <LoadingButton isLoading={isBusy} disabled={isDisabled}>
              {action}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </FormCard>
  );
};

export default ProfileForm;
