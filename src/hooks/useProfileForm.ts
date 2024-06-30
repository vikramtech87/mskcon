import { ProfileFormData, ProfileSchema } from "@/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useProfileForm = () =>
  useForm<ProfileFormData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      designation: "",
      title: "",
      firstName: "",
      lastName: "",
      medicalCouncil: "",
      medicalCouncilNumber: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      college: "",
      country: "",
      mobileNumber: "",
      postalCode: "",
    },
  });
