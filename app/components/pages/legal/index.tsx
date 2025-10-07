import type { RenderableTreeNodes } from "@markdoc/markdoc";
import { Link, Logo } from "~/components/common";
import { MarkdownArticle } from "~/components/markdown";

interface LegalProps {
  node: RenderableTreeNodes;
}

export const Legal = ({ node }: LegalProps) => {
  return (
    <div className="py-4 sm:py-16 md:py-24 bg-base-200">
      <div className="max-w-3xl mx-auto relative">
        <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
          <Link to="/">
            <Logo className="mr-2" size="lg" />
          </Link>
        </div>
        <MarkdownArticle
          className="bg-base-100 rounded-md border border-base-300 p-4 sm:p-6 md:p-8"
          node={node}
        />
      </div>
    </div>
  );
};
