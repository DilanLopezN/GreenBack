import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResourceAlreadyExist } from 'src/core/errors/ResourceAlreadyExists';
import { ResourceNotFound } from 'src/core/errors/ResourceNotFound';
import { PrismaService } from 'src/core/prisma/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}


  async generateHashPassword (password: string) {
    return await bcrypt.hash(password, 6)
  }

  async findById(id: number): Promise<CreateUserDto> {
    const user =  await this.prismaService.user.findUnique({
      where: {id}
    })

    if(!user) {
      throw new ResourceNotFound("User")
    }

    return user
  }

  async findByEmail(email: string): Promise<CreateUserDto> {
    const user =  await this.prismaService.user.findUnique({
      where: {email}
    })

    if(!user) {
      throw new ResourceNotFound("User")
    }

    return user
  }

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {

    const emailAlreadyExists = await  this.prismaService.user.findUnique({
      where: {email: createUserDto.email }
    })



    if(emailAlreadyExists ) {
      throw new ResourceAlreadyExist("Email")
    }
 
    const user = this.prismaService.user.create({data: {
      ...createUserDto,
      password: await this.generateHashPassword(createUserDto.password)
    }})

    return user
  }

  async findAll(): Promise<CreateUserDto[]> {
    const users = await this.prismaService.user.findMany()
    return users
  }

 

  async update(id: number, updateUserDto: UpdateUserDto): Promise<CreateUserDto> {
  const user =  await this.prismaService.user.update({
      where: {id}, data: updateUserDto
    })

    return user
  }

  async  remove(id: number): Promise<void> {
    await this.prismaService.user.delete({
      where: {id}
    })
  }
}
