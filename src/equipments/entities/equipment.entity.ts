import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '../../tags/entities/tag.entity';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';
import { IsOptional, IsString } from 'class-validator';
import { History } from '../../histories/entities/history.entity';

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
    required: false,
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    type: Number,
    example: '1000.00',
    description: 'Цена за час',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    example: 'Потёртости на корпусе',
    type: String,
    description: 'Состояние велосиеда',
  })
  @Column({ nullable: true })
  condition: string;

  @ApiProperty({
    example: 'M',
    type: String,
    description: 'Размер',
    required: false,
  })
  @IsString()
  @IsOptional()
  size: string;

  @ApiProperty({
    type: Boolean,
  })
  @Column({ default: false })
  availability: boolean;

  @ApiProperty({
    type: Date,
    description: 'Дата начала аренды',
  })
  @Column({
    type: 'timestamp without time zone',
    nullable: true,
  })
  rental_start_date: Date;

  @ApiProperty({
    type: Date,
    description: 'Дата конца аренды',
  })
  @Column({
    type: 'timestamp without time zone',
    nullable: true,
  })
  rental_end_date: Date;

  @OneToMany(() => History, (history) => history.equipment)
  histories: History[];

  @ApiProperty({
    type: () => Tag,
    required: false,
  })
  @ManyToOne(() => Tag, (tag) => tag.equipments)
  @JoinColumn({
    name: 'tag_id',
  })
  tag: Tag;

  @ApiProperty({
    type: () => Category,
  })
  @ManyToOne(() => Category, (category) => category.equipments)
  @JoinColumn({
    name: 'category_id',
  })
  category: Category;

  @ApiProperty({
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.equipments)
  @JoinColumn({
    name: 'user_id',
  })
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
