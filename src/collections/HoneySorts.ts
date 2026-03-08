import type { CollectionConfig } from "payload";

export const HoneySorts: CollectionConfig = {
  slug: "honey-sorts",
  labels: {
    singular: "Honigsorte",
    plural: "Honigsorten",
  },
  admin: {
    useAsTitle: "sorte",
    defaultColumns: ["sorte", "price500", "price250", "available"],
  },
  fields: [
    {
      name: "sorte",
      label: "Sortenname",
      type: "text",
      required: true,
    },
    {
      name: "price500",
      label: "Preis 500g",
      type: "text",
      required: true,
    },
    {
      name: "price250",
      label: "Preis 250g",
      type: "text",
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
    {
      name: "available",
      label: "Verfügbar / In Saison",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};
