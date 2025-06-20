/**
 * Constant containing all the table names in the database.
 * The purpose of this constant is to store the table names in a centralized place to avoid typos and make it easier to change them if needed.
 */
const ZTableNames = {
  users: 'users',
  jobs: 'jobs',
  oasis: 'oasis'
} as const;

export default ZTableNames;
