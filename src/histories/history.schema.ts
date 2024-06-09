import { EntitySchema } from 'typeorm';
import { History } from './entities/history.entity';
import { Equipment } from '../equipments/entities/equipment.entity';
import { User } from '../users/entities/user.entity';
export const HistorySchema: EntitySchema<History> = new EntitySchema<History>({
  name: 'History',
  target: History,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: true,
    },
    rental_start_date: {
      type: Date,
      nullable: false,
    },
    rental_end_date: {
      type: Date,
      nullable: true,
    },
    return_note: {
      type: String,
      nullable: true,
    },
    rental_amount: {
      type: 'decimal',
      precision: 10,
      scale: 2,
      nullable: false,
    },
    create_date: {
      type: Date,
    },
  },
  relations: {
    admin: {
      type: 'many-to-one',
      target: User,
      joinColumn: {
        name: 'admin_id',
      },
      nullable: false,
    },
    user: {
      type: 'many-to-one',
      target: User,
      joinColumn: {
        name: 'user_id',
      },
      nullable: false,
    },
    equipment: {
      type: 'many-to-one',
      target: Equipment,
      joinColumn: {
        name: 'equipment_id',
      },
      nullable: false,
    },
  },
});
