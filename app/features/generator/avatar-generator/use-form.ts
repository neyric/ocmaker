import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { avatarSchema } from "~/schema/generator";

export type ProfileGeneratorFormMethod = ReturnType<
  typeof useProfileGeneratorForm
>;

interface UseProfileGeneratorProps {
  id: string;
}

export function useProfileGeneratorForm(option: UseProfileGeneratorProps) {
  const form = useForm({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      id: option.id,
      prompt: "",
      aiOptimize: true,
      aspect: null,
      options: {},
    },
  });

  return form;
}
