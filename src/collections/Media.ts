import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Mediendatei",
    plural: "Mediendateien",
  },
  upload: true,
  fields: [
    {
      name: "alt",
      label: "Alt-Text",
      type: "text",
      required: true,
    },
  ],
};
