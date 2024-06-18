import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ResourceAlreadyExist } from 'src/core/errors/ResourceAlreadyExists';

@Injectable()
export class CustomersService {
  constructor(private prismaService: PrismaService) {}


 async create(createCustomerDto: CreateCustomerDto): Promise<CreateCustomerDto | ResourceAlreadyExist> {

  const customerAlreadyExists = await this.prismaService.customers.findUnique({
    where: {cnpj: createCustomerDto.cnpj }
  })
    
  if(customerAlreadyExists) {
    throw new ResourceAlreadyExist('Customer')
  }

    const customer = await this.prismaService.customers.create({data: createCustomerDto})
    return customer
  }

  async findAll(): Promise<CreateCustomerDto[]>{
    const customers = await this.prismaService.customers.findMany()
    return customers
  }

  async findOne(idOrCnpj: number | string): Promise<CreateCustomerDto | null> {
   const customer = await this.prismaService.customers.findFirst({
      where: {
        ...(typeof idOrCnpj === 'number' ? {id: idOrCnpj} : {cnpj: idOrCnpj})
      }
    })

    return customer
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<CreateCustomerDto> {

   const updatedCustomer =  await this.prismaService.customers.update({
      where: {id}, data: {...updateCustomerDto}
    })

    return updatedCustomer
  }

  async remove(id: number): Promise<void>  {
    await this.prismaService.customers.delete({where: {id}})
  }


}
