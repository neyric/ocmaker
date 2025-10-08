import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type ProfileGeneratorFormValues,
  profileGeneratorSchema,
} from "~/schema/generator/profile-generator";

export type ProfileGeneratorFormMethod = ReturnType<
  typeof useProfileGeneratorForm
>;

export function useProfileGeneratorForm() {
  const form = useForm<ProfileGeneratorFormValues>({
    resolver: zodResolver(profileGeneratorSchema),
    defaultValues: {
      prompt: "",
    },
  });

  return form;
}
