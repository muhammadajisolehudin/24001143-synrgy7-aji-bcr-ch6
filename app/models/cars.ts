import { Model } from 'objection';
import { v4 as uuidv4 } from 'uuid';

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
  created_at: Date;
  updated_at: Date;
}

export class CarsModel extends Model {
  // static tableName = 'cars';

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
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return "cars";
  }

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
   $beforeInsert() {
    this.id = uuidv4();
    this.status = true;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}


