import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

import { Users } from "./src/collections/Users";
import { Media } from "./src/collections/Media";
import { HoneySorts } from "./src/collections/HoneySorts";
import { FaqItems } from "./src/collections/FaqItems";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, HoneySorts, FaqItems],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  upload: {
    limits: {
      fileSize: 5_000_000, // 5 MB
    },
  },
});
