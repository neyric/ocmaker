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
    <GridSection borderY={false}>
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
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow rounded-none border-b border-grid-border/50 last-of-type:border-b-0"
            >
              <input
                type="radio"
                name="faq-accordion"
                defaultChecked={index === 0}
              />
              <h3 className="collapse-title text-lg font-medium text-left">
                {faq.question}
              </h3>
              <div className="collapse-content">
                <p className="text-base-content/70 leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GridSection>
  );
}
