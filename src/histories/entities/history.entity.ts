import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Equipment } from '../../equipments/entities/equipment.entity';

@Entity()
export class History {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор записи истории аренды',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.historiesUser)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, (user) => user.historiesAdmin)
  @JoinColumn({ name: 'admin_id' })
  admin: User;

  @ManyToOne(() => Equipment, (equipment) => equipment.histories)
  @JoinColumn({ name: 'equipment_id' })
  equipment: Equipment;

  @ApiProperty({
    type: Date,
    description: 'Дата начала аренды',
  })
  @Column({ type: 'timestamp without time zone', nullable: false })
  rental_start_date: Date;

  @ApiProperty({
    type: Date,
    description: 'Дата конца аренды',
  })
  @Column({ type: 'timestamp without time zone', nullable: false })
  rental_end_date: Date;

  @ApiProperty({
    type: String,
    example: 'Item returned in good condition',
    description: 'Примечание о состоянии инвентаря при возврате',
  })
  @Column({ type: 'text', nullable: true })
  return_note: string;

  @ApiProperty({
    example: '100.00',
    description: 'Сумма аренды',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  rental_amount: number;

  @ApiProperty({
    type: Date,
    description: 'Дата создания записи',
  })
  @CreateDateColumn()
  create_date: Date;
}
