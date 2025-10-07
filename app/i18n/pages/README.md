# Page Localization System

This directory contains page-specific translations that are loaded separately from the common locale files.

## Structure

```
pages/
├── en/           # English page translations
│   ├── home.ts
│   ├── dashboard.ts
│   └── ...
├── pt/           # Portuguese page translations
│   ├── home.ts
│   ├── dashboard.ts
│   └── ...
└── zh/           # Chinese page translations
    ├── home.ts
    ├── dashboard.ts
    └── ...
```

## Usage

### Server-side (in loaders)

```typescript
import { getI18nConetxt } from "~/.server/middleware/i18n-middleware";

export const loader = async ({ context }: Route.LoaderArgs) => {
  const i18n = getI18nConetxt(context);

  // Load page-specific locale
  const pageLocale = await i18n.getPageLocale("home");

  return {
    pageLocale,
  };
};
```

### Client-side with hooks

#### Option 1: Using usePageTranslate (Recommended)

```typescript
import { usePageTranslate } from "~/i18n";

function HomePage() {
  // Automatically merges page locale with base locale
  const t = usePageTranslate("home");

  return (
    <div>
      <h1>{t("hero.title")}</h1>
      <p>{t("hero.subtitle")}</p>
      {/* Can still access common translations */}
      <button>{t("common.submit")}</button>
    </div>
  );
}
```

#### Option 2: Using usePageLocale directly

```typescript
import { usePageLocale, useTranslate } from "~/i18n";

function HomePage() {
  const { pageLocale, loading } = usePageLocale("home");
  const t = useTranslate(pageLocale);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{t("hero.title")}</h1>
    </div>
  );
}
```

#### Option 3: Using with server-loaded data

```typescript
import { useTranslate } from "~/i18n";
import { useLoaderData } from "react-router";

function HomePage() {
  const { pageLocale } = useLoaderData<typeof loader>();
  const t = useTranslate(pageLocale);

  return (
    <div>
      <h1>{t("hero.title")}</h1>
    </div>
  );
}
```

## Creating New Page Locales

1. Create a new file in each language directory:

```typescript
// pages/en/pricing.ts
export default {
  title: "Pricing",
  plans: {
    basic: {
      name: "Basic Plan",
      price: "$9.99/month",
    },
    pro: {
      name: "Pro Plan",
      price: "$19.99/month",
    },
  },
};
```

2. Create corresponding files for other languages:

```typescript
// pages/pt/pricing.ts
export default {
  title: "Preços",
  plans: {
    basic: {
      name: "Plano Básico",
      price: "R$ 49,99/mês",
    },
    pro: {
      name: "Plano Pro",
      price: "R$ 99,99/mês",
    },
  },
};
```

## Benefits

- **Performance**: Page-specific translations are only loaded when needed
- **Organization**: Clear separation between common and page-specific content
- **Maintainability**: Easy to find and update translations for specific pages
- **Type Safety**: Full TypeScript support with proper type definitions