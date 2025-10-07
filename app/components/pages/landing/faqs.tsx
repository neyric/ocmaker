import { GridSection } from "~/components/ui/grid-section";
import { createFAQsSchema } from "~/utils/structured-data";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQsSectionProps {
  title: string;
  description: string;
  faqs: FAQ[];
}

export function FAQsSection({ title, description, faqs }: FAQsSectionProps) {
  const structure = createFAQsSchema(faqs);
  return (
    <GridSection
      borderY={false}
      borderX={false}
      compact
      className="py-6 sm:py-8 md:py-12"
    >
      {structure && (
        <script
          id="FAQPage"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structure) }}
        />
      )}
      <div className="relative">
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center mb-8">
          <h2 className="text-center font-bold text-2xl text-base-content sm:text-3xl sm:leading-[1.15] animate-slide-up-fade [--offset:20px] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in text-pretty [animation-delay:100ms]">
            {title}
          </h2>
          <p className="text-pretty text-sm text-base-content/70 sm:text-lg animate-slide-up-fade [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in">
            {description}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto mt-14 grid gap-8 md:grid-cols-2 md:gap-12">
          {faqs.map((faq, i) => (
            <div className="flex gap-4" key={i}>
              <span className="flex size-6 shrink-0 items-center justify-center rounded-sm border border-primary font-mono text-xs text-primary">
                {i + 1}
              </span>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold">{faq.question}</h3>
                </div>
                <p className="text-md text-muted-foreground">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GridSection>
  );
}
