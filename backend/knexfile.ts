import { config } from 'dotenv';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

config();

const filename = fileURLToPath(import.meta.url);
const dirnameA = dirname(filename);

const knexConfig = {
  debug: process.env.NODE_ENV === 'development' || process.env.DB_DEBUG === 'true',
  client: process.env.DB_CLIENT,
  connection: process.env.DB_CONNECTION,
  migrations: {
    directory: `${dirnameA}/src/db/migrations`,
    tableName: 'knex_migrations',
  },
  pool: { min: 2, max: 10 },
};

export default knexConfig;
