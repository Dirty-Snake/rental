import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Equipment } from '../../equipments/entities/equipment.entity';

@Entity()
export class Category {
  @ApiProperty({
    example: 'c75f4a69-e673-43c3-b00b-ecafd042e746',
    type: 'uuid',
    description: 'Уникальный идентификатор',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    example: 'Велосипеды',
    description: 'Название',
  })
  @Column()
  name: string;

  @OneToMany(() => Equipment, (equipment) => equipment.category)
  equipments: Equipment[];

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
