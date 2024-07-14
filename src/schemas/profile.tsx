import { z } from "zod";

export const ProfileSchema = z.object({
  designation: z
    .string({ required_error: "Designation is required" })
    .min(8, "Designation is required"),
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Titile is required")
    .max(20, "Title is too long"),
  firstName: z
    .string({ required_error: "First name is required" })
    .min(1, "First name is required")
    .max(80, "First name is too long"),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(1, "Last name is required")
    .max(80, "Last name is too long"),
  college: z
    .string({
      required_error: "Name of the institute / hospital is required",
    })
    .min(1, "Name of the institute / hospital is required")
    .max(200, "Name of the institute / hospital is too long"),
  medicalCouncilNumber: z
    .string({
      required_error: "Medical council number is required",
    })
    .min(1, "Medical council number is required")
    .max(20, "Medical council number is too long"),
  medicalCouncil: z
    .string({ required_error: "Medical council name is required" })
    .min(1, "Medical council name is required")
    .max(200, "Medical council name is too long"),
  addressLine1: z
    .string({ required_error: "Address line 1 is required" })
    .min(1, "Address line 1 is required")
    .max(320, "Address line 1 length is too long"),
  addressLine2: z.string().max(320, "Address line 2 is too long").optional(),
  city: z
    .string({ required_error: "City is required" })
    .min(1, "City name is required")
    .max(320, "City name is too long"),
  state: z
    .string({ required_error: "State is required" })
    .min(1, "State is required")
    .max(320, "State is required"),
  postalCode: z
    .string({ required_error: "Postal code is required" })
    .min(1, "Postal code is required")
    .max(30, "Postal code is too long"),
  country: z
    .string({ required_error: "Country name is required" })
    .min(1, "Country is required")
    .max(320, "Country name is too long"),
  mobileNumber: z.string().max(14, "Mobile number is too long").optional(),
});

export type ProfileFormData = z.infer<typeof ProfileSchema>;
