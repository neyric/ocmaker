import { parseMarkdown } from "~/.server/libs/markdown";

import { Legal } from "~/components/pages/legal";
import { createCanonical } from "~/utils/meta";
import type { Route } from "./+types/route";
import content from "./content.md?raw";

export const meta: Route.MetaFunction = ({ matches }) => {
  return [
    { title: "Política de Reembolso - FotoProfissional" },
    {
      name: "description",
      content:
        "Revise a Política de Reembolso do FotoProfissional, descrevendo nossa garantia de reembolso de 3 dias e o processo para solicitar reembolsos em nossos serviços de transformação de fotos com IA.",
    },
    createCanonical("/legal/refund", matches[0].data.DOMAIN),
  ];
};

export const loader = (_: Route.LoaderArgs) => {
  const { node } = parseMarkdown(content);
  return { node };
};

export default function Page({ loaderData: { node } }: Route.ComponentProps) {
  return <Legal node={node} />;
}
