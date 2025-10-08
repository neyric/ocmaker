import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { profileSchema } from "~/schema/generator";

export type ProfileGeneratorFormMethod = ReturnType<
  typeof useProfileGeneratorForm
>;

interface UseProfileGeneratorOption {
  id: string;
  prompt: string;
}

export function useProfileGeneratorForm(options: UseProfileGeneratorOption) {
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      id: options.id,
      prompt: options.prompt,
    },
  });

  return form;
}
