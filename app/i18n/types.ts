// Common locale type for all shared translations
export type Locale = {
  nav: {
    home: string;
    pricing: string;
    features: string;
    about: string;
    contact: string;
    signin: string;
    signup: string;
    dashboard: string;
    logout: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    delete: string;
    edit: string;
    back: string;
    next: string;
    previous: string;
    submit: string;
    reset: string;
    search: string;
    filter: string;
    sort: string;
    close: string;
    open: string;
    yes: string;
    no: string;
    or: string;
    and: string;
  };
  errors: {
    required: string;
    invalid: string;
    tooShort: string;
    tooLong: string;
    network: string;
    unauthorized: string;
    forbidden: string;
    notFound: string;
    serverError: string;
  };
  auth: {
    login: string;
    logout: string;
    register: string;
    forgotPassword: string;
    resetPassword: string;
    email: string;
    password: string;
    confirmPassword: string;
    rememberMe: string;
    loginWith: string;
    signupWith: string;
    alreadyHaveAccount: string;
    dontHaveAccount: string;
    termsAndConditions: string;
    privacyPolicy: string;
  };
  footer: {
    copyright: string;
    allRightsReserved: string;
    madeWith: string;
    by: string;
    followUs: string;
    newsletter: string;
    subscribe: string;
    enterEmail: string;
  };
};

// Page-specific locale type
export type PageLocale = Record<string, any>;

// Combined locale type for runtime usage
export type FullLocale = Locale & {
  page?: PageLocale;
};

// Supported languages
export type Language = "en" | "pt" | "zh";

// Page locale loader function type
export type PageLocaleLoader = (
  lang: Language,
  pageName: string,
) => Promise<PageLocale | null>;
