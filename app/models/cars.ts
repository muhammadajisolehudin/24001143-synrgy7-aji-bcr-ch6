import { Model } from 'objection';

export class CarsModel extends Model {
  static tableName = 'cars';

  id!: string;
  plat_no!: string;
  name!: string;
  color?: string;
  img?: string;
  tahun_produksi!: number;
  status!: boolean;
  price!: number;
  create_by!: string;
  update_by!: string;
  created_at!: string;
  updated_at!: string;

  static get relationMappings() {
    const UserModel = require('./user'); // Import your UserModel here

    return {
      createdBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'cars.create_by',
          to: 'users.id'
        }
      },
      updatedBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'cars.update_by',
          to: 'users.id'
        }
      }
    };
  }
}

export interface Car {
  id: string;
  plat_no: string;
  name: string;
  color?: string;
  img?: string;
  tahun_produksi: number;
  status: boolean;
  price: number;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}
