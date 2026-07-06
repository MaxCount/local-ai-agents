import path from 'path';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { slateEditor } from '@payloadcms/richtext-slate';
import { Users } from './src/collections/Users';
import { Products } from './src/collections/Products';
import { Categories } from './src/collections/Categories';
import { Media } from './src/collections/Media';

// This config is for Payload CMS - enable admin by uncommenting lines below
// and running: npm run payload:dev
// For now, the site uses mock data from src/lib/queries.ts

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-build',
  // Admin is disabled for static build - uncomment to enable:
  // admin: {
  //   user: Users.slug,
  //   meta: {
  //     titleSuffix: '- LINUCHI Admin',
  //   },
  // },
  editor: slateEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || 'postgresql://localhost/linuchi',
    },
  }),
  collections: [Users, Products, Categories, Media],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  upload: {
    limits: {
      fileSize: 5000000,
    },
  },
});
