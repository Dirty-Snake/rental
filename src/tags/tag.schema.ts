import { EntitySchema } from 'typeorm';
import { Equipment } from '../equipments/entities/equipment.entity';
import { Tag } from './entities/tag.entity';

export const TagSchema: EntitySchema<Tag> = new EntitySchema<Tag>({
  name: 'Tag',
  target: Tag,
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
