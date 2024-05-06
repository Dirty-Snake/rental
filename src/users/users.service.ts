import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsSelect, Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password, firstname, lastname } = createUserDto;
    const user = new User();
    const hashPassword = await this.hashPassword(password);
    user.password = hashPassword;
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
  async findAll() {
    return await this.userRepository.find({
      order: {
        username: 'ASC',
      },
    });
  }

  async findOne(id: string, password?: boolean): Promise<User> {
    const select: FindOptionsSelect<User> = {};
    if (password) {
      select.username = true;
      select.email = true;
      select.password = true;
    }
    const result = await this.userRepository.findOne({
      select: select,
      where: {
        id: id,
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
      },
      where: {
        username: username,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
