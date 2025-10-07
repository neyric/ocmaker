// Organization Structured Options
interface OrganizationData {
  url: string;
  logo: string;
  name: string;
  email: string;
  sameAs?: string[];
}

// Generate Organization structured data
export function createOrganizationSchema(data: OrganizationData) {
  const schema: Record<string, unknown> = {
    "@context": "http://schema.org",
    "@type": "Organization",
    url: data.url,
    logo: data.logo,
    name: data.name,
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: data.email,
        contactType: "Technical support",
      },
    ],
    sameAs: data.sameAs,
  };

  return schema;
}

// Generate FAQPage structured data
export function createFAQsSchema(
  faqs: Array<{ question: string; answer: string }>,
): object {
  return {
    "@context": "http://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: [faq.question],
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
