import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  Repository,
} from 'typeorm';
import { Role } from '../roles/enums/role.enum';
import { Tag } from '../tags/entities/tag.entity';
import { PaginatedResultDto } from '../common/dto/paginated-result.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password, firstname, lastname } = createUserDto;
    const user = new User();
    if (password) {
      user.password = await this.hashPassword(password);
    }
    user.username = username;
    user.email = email;
    user.firstname = firstname;
    user.lastname = lastname;
    return await this.userRepository.save(user);
  }
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
  async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }
  async findAll(
    page = 1,
    limit = 10,
    order?: FindOptionsOrder<User>,
    relations?: FindOptionsRelations<User>,
  ): Promise<PaginatedResultDto<User>> {
    const [data, total] = await this.userRepository.findAndCount({
      relations: relations,
      skip: (page - 1) * limit,
      take: limit,
      order: order,
    });
    return <PaginatedResultDto<User>>{
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string, role?: Role, password?: boolean): Promise<User> {
    const select: FindOptionsSelect<User> = {};
    if (password) {
      select.username = true;
      select.email = true;
      select.password = true;
      select.role = true;
    }
    const result = await this.userRepository.findOne({
      select: select,
      where: {
        id: id,
        role: role,
      },
    });
    if (!result) {
      throw new BadRequestException('Такого пользователя не существует');
    }
    return result;
  }

  async findUser(username: string) {
    return await this.userRepository.findOne({
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        role: true,
      },
      where: {
        username: username,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id, Role.USER);
    user.firstname = updateUserDto?.firstname ?? user.firstname;
    user.lastname = updateUserDto?.lastname ?? user.lastname;
    user.email = updateUserDto?.email ?? user.email;
    return await this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id, Role.USER);
    return await this.userRepository.softRemove(user);
  }
}
