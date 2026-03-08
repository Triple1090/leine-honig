import type { CollectionConfig } from "payload";

export const FaqItems: CollectionConfig = {
  slug: "faq-items",
  labels: {
    singular: "FAQ-Eintrag",
    plural: "FAQ-Einträge",
  },
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "sortOrder"],
  },
  fields: [
    {
      name: "question",
      label: "Frage",
      type: "text",
      required: true,
    },
    {
      name: "answer",
      label: "Antwort",
      type: "textarea",
      required: true,
    },
    {
      name: "sortOrder",
      label: "Reihenfolge",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Kleinere Zahl = weiter oben in der Liste",
      },
    },
  ],
};
