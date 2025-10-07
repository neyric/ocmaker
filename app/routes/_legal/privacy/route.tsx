import { parseMarkdown } from "~/.server/libs/markdown";

import { Legal } from "~/components/pages/legal";
import { createCanonical } from "~/utils/meta";
import type { Route } from "./+types/route";
import content from "./content.md?raw";

export const meta: Route.MetaFunction = ({ matches }) => {
  return [
    { title: "Política de Privacidade - FotoProfissional" },
    {
      name: "description",
      content:
        "Saiba como o FotoProfissional coleta, usa e protege seus dados pessoais. Sua privacidade é importante para nós—leia nossa política para entender seus direitos e nossas práticas.",
    },
    createCanonical("/legal/privacy", matches[0].data.DOMAIN),
  ];
};

export const loader = (_: Route.LoaderArgs) => {
  const { node } = parseMarkdown(content);
  return { node };
};

export default function Page({ loaderData: { node } }: Route.ComponentProps) {
  return <Legal node={node} />;
}
