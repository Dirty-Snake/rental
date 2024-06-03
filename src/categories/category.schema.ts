import { EntitySchema } from 'typeorm';
import { Category } from './entities/category.entity';
import { Equipment } from '../equipments/entities/equipment.entity';

export const CategorySchema: EntitySchema<Category> =
  new EntitySchema<Category>({
    name: 'Category',
    target: Category,
    columns: {
      name: {
        type: String,
      },
      delete_date: {
        type: Date,
      },
      update_date: {
        type: Date,
      },
      create_date: {
        type: Date,
      },
    },
    relations: {
      equipments: {
        type: 'one-to-many',
        target: Equipment,
      },
    },
  });
