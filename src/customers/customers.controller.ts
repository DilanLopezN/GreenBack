import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Res } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ResourceAlreadyExist } from 'src/core/errors/ResourceAlreadyExists';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
 async create(@Res() response, @Body() createCustomerDto: CreateCustomerDto) {
  try {
    const customer = await this.customersService.create(createCustomerDto);

    return response.status(HttpStatus.CREATED).json({
      message: "Customer created successfully",
      customer
    })
  } catch (error) {
    if(error instanceof ResourceAlreadyExist) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }
   
  }

  @Get()
  async findAll() {
    try {
      return this.customersService.findAll();
    } catch (error) {
      if(error instanceof Error || !!error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
    
  }

  @Get(':idOrCnpj')
  async findOne(@Param('idOrCnpj') idOrCnpj: number | string) {
    try {
      return this.customersService.findOne(idOrCnpj);
    } catch (error) {
      if(error instanceof Error || !!error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }

  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    try {
      return this.customersService.update(+id, updateCustomerDto);
    } catch (error) {
      if(error instanceof Error || !!error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
   
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') id: string) {
    try {

     await this.customersService.remove(+id);

      return response.status(HttpStatus.NO_CONTENT).json({
        message: "Customer deleted successfully",
 
      })
    
    } catch (error) {
      if(error instanceof Error || !!error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
   
  }
}
