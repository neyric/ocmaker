import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { fotoProfissionalSchema } from "~/schema/generator/foto-profissional";

export type FormMethod = ReturnType<typeof useFPForm>;

export function useFPForm() {
  const form = useForm({
    resolver: zodResolver(fotoProfissionalSchema),
  });

  return form;
}
