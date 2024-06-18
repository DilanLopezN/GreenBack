import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResourceAlreadyExist } from 'src/core/errors/ResourceAlreadyExists';
import { ResourceNotFound } from 'src/core/errors/ResourceNotFound';
import { AuthGuard } from 'src/core/auth/auth.guard';


@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: "User created successfully",
        user
      })
    } catch (error) {
      if(error instanceof ResourceAlreadyExist) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
    }
    
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      return this.usersService.findById(+id);
    } catch (error) {
      if(error instanceof ResourceNotFound) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
   
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    try {
      return this.usersService.findByEmail(email);
    } catch (error) {
      if(error instanceof ResourceNotFound) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
   
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.update(+id, updateUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
   
  }

  @Delete(':id')
  async  remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
   
  }
}
