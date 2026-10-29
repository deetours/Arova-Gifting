export type Collection = {
  slug: string;
  index: string;
  name: string;
  note: string;
  tone: string;
  description: string;
  occasions: string[];
};

export const collections: Collection[] = [
  {
    slug: "welcome-editions",
    index: "01",
    name: "The Welcome Edition",
    note: "For first days, made memorable",
    tone: "sand",
    description: "A considered starting point for employee onboarding and team welcomes. Final contents and branding are confirmed during quotation.",
    occasions: ["new-joiners", "milestones"],
  },
  {
    slug: "branded-essentials",
    index: "02",
    name: "Branded Essentials",
    note: "Useful objects, thoughtfully marked",
    tone: "blue",
    description: "An editable direction for branded merchandise. Methods, products and quantities are subject to confirmation for each brief.",
    occasions: ["client-appreciation", "recognition"],
  },
  {
    slug: "executive-objects",
    index: "03",
    name: "Executive Objects",
    note: "A gesture with a little more weight",
    tone: "wine",
    description: "A visual direction for leadership and client gifting. The exact selection is curated after quantity, budget and date are known.",
    occasions: ["client-appreciation", "milestones"],
  },
  {
    slug: "seasonal-hampers",
    index: "04",
    name: "Seasonal Hampers",
    note: "Gathered for the moment",
    tone: "olive",
    description: "A seasonal gifting direction that can be tailored to the occasion. Contents and availability must be confirmed before a quote is issued.",
    occasions: ["festive-gifting", "recognition"],
  },
];

export const occasions = [
  { slug: "new-joiners", label: "Welcome new joiners", short: "New employee joining", number: "01" },
  { slug: "client-appreciation", label: "Thank a client", short: "Client appreciation", number: "02" },
  { slug: "recognition", label: "Recognise a team", short: "Employee recognition", number: "03" },
  { slug: "festive-gifting", label: "Mark the season", short: "Festive gifting", number: "04" },
  { slug: "milestones", label: "Celebrate a milestone", short: "Company milestones", number: "05" },
];

export function collectionBySlug(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function occasionBySlug(slug: string) {
  return occasions.find((occasion) => occasion.slug === slug);
}
