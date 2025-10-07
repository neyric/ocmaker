import { Link } from "~/components/common";
import { GridSection } from "~/components/ui/grid-section";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQsSectionProps {
  title: string;
  description: string;
  supportEmail: string;
  faqs: FAQ[];
}

export function FAQsSection({
  title,
  description,
  supportEmail,
  faqs,
}: FAQsSectionProps) {
  return (
    <GridSection borderX={false} borderY={false}>
      <div className="pointer-events-none absolute inset-0 sm:border-x border-grid-border [mask-image:linear-gradient(black,transparent)]"></div>
      <div className="relative">
        <div className="absolute -top-12" id="faqs" />
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center mb-8">
          <h2 className="text-center font-bold text-2xl text-base-content sm:text-3xl sm:leading-[1.15] animate-slide-up-fade [--offset:20px] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in text-pretty [animation-delay:100ms]">
            {title}
          </h2>
          <p className="text-pretty text-sm text-base-content/70 sm:text-base max-w-screen-md animate-slide-up-fade [--offset:10px] [animation-delay:200ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in">
            {description}{" "}
            <Link className="underline" to={`mailto:${supportEmail}`}>
              {supportEmail}
            </Link>
          </p>
        </div>

        {/* FAQ Accordion using DaisyUI */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow rounded-none border-b border-grid-border/50 last-of-type:border-b-0 animate-slide-up-fade [--offset:20px] [animation-fill-mode:both] motion-reduce:animate-fade-in"
              style={{
                animationDelay: `${300 + index * 100}ms`,
                animationDuration: "1s",
              }}
            >
              <input
                type="radio"
                name="dashboard-faq-accordion"
                defaultChecked={index === 0}
              />
              <h3 className="collapse-title text-lg font-medium text-left">
                {faq.question}
              </h3>
              <div className="collapse-content">
                <p className="text-base-content/70 leading-relaxed">
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
