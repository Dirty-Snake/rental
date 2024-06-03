import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { FindUserDto } from './dto/find-user.dto';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/enums/role.enum';

@ApiHeader({
  name: 'Authorization',
  description: 'Access токен',
})
@ApiTags('users')
@Controller('users')
@Roles(Role.ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @ApiResponse({ type: [User] })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiResponse({ type: User })
  @Get(':id')
  findOne(@Param() { id }: FindUserDto) {
    return this.usersService.findOne(id);
  }

  @ApiResponse({ type: User })
  @Patch(':id')
  update(@Param() { id }: FindUserDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() { id }: FindUserDto) {
    return this.usersService.remove(id);
  }
}
