import Knex from 'knex';
import { Model } from 'objection';

const knexInstance = Knex({
  client: 'pg',
  connection: {
    database: 'ch6_bcr',
    user: 'postgres',
    password: '020402',
  },
});

Model.knex(knexInstance);

export default knexInstance;
