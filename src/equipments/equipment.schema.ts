import { EntitySchema } from 'typeorm';
import { Equipment } from './entities/equipment.entity';
import { Category } from '../categories/entities/category.entity';
import { User } from '../users/entities/user.entity';
import { Tag } from '../tags/entities/tag.entity';

export const EquipmentSchema: EntitySchema<Equipment> =
  new EntitySchema<Equipment>({
    name: 'Equipment',
    target: Equipment,
    columns: {
      id: {
        type: 'uuid',
        primary: true,
        generated: 'uuid',
      },
      name: {
        type: String,
        nullable: false,
      },
      description: {
        type: String,
        nullable: true,
      },
      size: {
        type: String,
        nullable: true
      },
      condition: {
        type: String,
        nullable: true
      },
      price: {
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
      },
      availability: {
        type: Boolean,
        default: false,
      },
      rental_start_date: {
        type: Date,
        nullable: true,
      },
      rental_end_date: {
        type: Date,
        nullable: true,
      },
      delete_date: {
        type: Date,
        nullable: true,
        select: false,
      },
      update_date: {
        type: Date,
        createDate: true,
      },
      create_date: {
        type: Date,
        updateDate: true,
      },
    },
    relations: {
      tag: {
        type: 'many-to-one',
        target: Tag,
      },
      category: {
        type: 'many-to-one',
        target: Category,
      },
      user: {
        type: 'many-to-one',
        target: User,
      },
    },
  });
