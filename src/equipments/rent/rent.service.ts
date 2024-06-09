import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager, FindOptionsRelations } from 'typeorm';
import { RentEquipmentDto } from './dto/rent-equipment.dto';
import { Equipment } from '../entities/equipment.entity';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/enums/role.enum';
import { ReturnEquipmentDto } from './dto/return-equipment.dto';
import { History } from '../../histories/entities/history.entity';
import * as moment from 'moment-timezone';
@Injectable()
export class RentService {
  constructor(private readonly entityManager: EntityManager) {}

  async rentEquipment(id: string, dto: RentEquipmentDto): Promise<Equipment> {
    return await this.entityManager.transaction(
      async (entityManager: EntityManager): Promise<Equipment> => {
        const user = await this.findUser(dto.user_id, entityManager);
        const equipment = await this.findEquipment(id, {}, entityManager);
        const currentDate = new Date();
        if (!equipment.availability) {
          throw new BadRequestException('Этот инвентарь занят');
        }
        if (currentDate > dto.rental_end_date) {
          throw new BadRequestException('Неправильная дата окончания аренды');
        }
        equipment.rental_start_date = this.getDateUTC(currentDate);
        equipment.rental_end_date = this.getDateUTC(dto.rental_end_date);
        equipment.availability = false;
        equipment.user = user;
        return entityManager.save<Equipment>(equipment);
      },
    );
  }

  async returnEquipment(id: string, userId: string, dto: ReturnEquipmentDto) {
    return await this.entityManager.transaction(
      async (entityManager: EntityManager): Promise<Equipment> => {
        const equipment = await this.findEquipment(
          id,
          { user: true },
          entityManager,
        );
        if (equipment.availability) {
          throw new BadRequestException('Этот инвентарь свободен');
        }
        const admin = await this.findAdminUser(userId, entityManager);
        const history = this.createHistory(
          equipment,
          admin,
          dto?.rental_end_date,
          dto?.return_note,
        );
        await entityManager.save(history);
        equipment.rental_start_date = null;
        equipment.rental_end_date = null;
        equipment.availability = true;
        return await entityManager.save(equipment);
      },
    );
  }

  private getDateUTC(date: Date) {
    return moment.tz(date, 'Europe/Moscow').utc().toDate();
  }

  private createHistory(
    equipment: Equipment,
    admin: User,
    rental_end_date?: Date,
    return_note?: string,
  ): History {
    const history = new History();
    history.user = equipment.user;
    history.admin = admin;
    history.rental_start_date = equipment.rental_start_date;
    const endDate =
      rental_end_date !== undefined
        ? rental_end_date
        : equipment.rental_end_date;
    history.rental_end_date = endDate;
    const amount = this.calculatePrice(
      endDate,
      equipment.rental_start_date,
      equipment.price,
    );
    history.rental_amount = amount;
    history.equipment = equipment;
    history.return_note = return_note;
    return history;
  }

  private calculatePrice(
    endDate: Date,
    startDate: Date,
    costPerHour: number,
  ): number {
    console.log(endDate, startDate);
    const endDateTime = this.getDateUTC(endDate).getTime();
    const startDateTime = this.getDateUTC(startDate).getTime();
    if (endDateTime < startDateTime) {
      throw new BadRequestException(
        'Дата окончания аренды не может быть раньше чем начало аренды',
      );
    }
    const dateDifference: number = endDateTime - startDateTime;
    const numberHours = Number((dateDifference / (1000 * 60 * 60)).toFixed(2));
    return Number((numberHours * costPerHour).toFixed(2));
  }

  private async findEquipment(
    id: string,
    relations: FindOptionsRelations<Equipment>,
    entityManager: EntityManager,
  ): Promise<Equipment> {
    const equipment = await entityManager.findOne<Equipment>(Equipment, {
      where: {
        id,
      },
      relations: relations,
    });
    return equipment;
  }

  private async findAdminUser(id: string, entityManager: EntityManager) {
    const user: Promise<User> = entityManager.findOne<User>(User, {
      where: {
        id,
        role: Role.ADMIN,
      },
    });
    if (!user) {
      throw new BadRequestException('Нет такого пользователя');
    }
    return user;
  }

  private async findUser(
    id: string,
    entityManager: EntityManager,
  ): Promise<User> {
    if (!id) return null;
    const user: Promise<User> = entityManager.findOne<User>(User, {
      where: {
        id,
      },
    });
    if (!user) {
      throw new BadRequestException('Нет такого пользователя');
    }
    return user;
  }
}
