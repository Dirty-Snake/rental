import { EntitySchema } from 'typeorm';
import { User } from './entities/user.entity';

export const UserSchema: EntitySchema<User> = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    deleteDate: {
      type: Date,
    },
    updateDate: {
      type: Date,
    },
    createDate: {
      type: Date,
    },
  },
});
