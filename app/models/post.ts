import { Model } from 'objection';

export default (knex: any) => {
  class Post extends Model {
    static get tableName(): string {
      return 'posts';
    }

    static get jsonSchema(): any {
      return {
        type: 'object',
        required: ['title', 'body'],
        properties: {
          id: { type: 'integer' },
          title: { type: 'string' },
          body: { type: 'string' },
        },
      };
    }
  }

  return Post;
};
