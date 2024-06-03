import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '../../tags/entities/tag.entity';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';
import { Information } from '../../informations/entities/information.entity';

@Entity()
export class Equipment {
  @ApiProperty({
    example: 'c75f4a69-e673-43c3-b00b-ecafd042e746',
    type: 'uuid',
    description: 'Уникальный идентификатор',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    example: 'Велосипед MERIDA',
    description: 'Название',
  })
  @Column()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Какое-то описание',
    description: 'Описание',
  })
  @Column()
  description: string;

  @ApiProperty({
    type: Date,
    description: 'Забронирован до',
  })
  @Column()
  rent: Date;

  @OneToOne(() => Information)
  @JoinColumn()
  profile: Information;

  @ManyToOne(() => Tag, (tag) => tag.equipments)
  tag: Tag;

  @ManyToOne(() => Category, (category) => category.equipments)
  category: Category;

  @ManyToOne(() => User, (user) => user.equipments)
  user: User;

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
