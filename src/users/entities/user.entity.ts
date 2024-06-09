import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Equipment } from '../../equipments/entities/equipment.entity';
import { Role } from '../../roles/enums/role.enum';
import { History } from '../../histories/entities/history.entity';

@Entity('users')
export class User {
  @ApiProperty({
    example: '766be24d-6f78-4d8a-b838-74d066d39429',
    type: 'uuid',
    description: 'Уникальный идентификатор',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'admin',
    type: String,
    description: 'Логин',
  })
  @Column()
  username: string;

  @ApiProperty({
    example: 'test@email.ru',
    type: String,
    description: 'Эл. почта',
  })
  @Column()
  email: string;

  @Column({ select: false, nullable: true })
  password: string;

  @ApiProperty({
    type: String,
    example: 'Иванов',
    description: 'Фамилия',
    required: false,
  })
  @Column({ nullable: true })
  lastname: string;

  @ApiProperty({
    type: String,
    example: 'Максим',
    description: 'Имя',
    required: false,
  })
  @Column({ nullable: true })
  firstname: string;

  @OneToMany(() => Equipment, (equipment) => equipment.user)
  equipments: Equipment[];

  @OneToMany(() => History, (history) => history.user)
  historiesUser: History[];

  @OneToMany(() => History, (history) => history.admin)
  historiesAdmin: History[];

  @ApiProperty({
    enum: Role,
    default: Role.USER,
  })
  @Column({ enum: Role, type: 'enum', default: Role.USER })
  role: Role;

  @DeleteDateColumn({ select: false })
  delete_date: Date;

  @ApiProperty({
    type: Date,
    description: 'Дата обновления',
  })
  @UpdateDateColumn()
  update_date: Date;

  @ApiProperty({
    type: Date,
    description: 'Дата создания',
  })
  @CreateDateColumn()
  create_date: Date;
}
