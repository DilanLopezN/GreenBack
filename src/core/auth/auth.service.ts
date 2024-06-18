import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}


  async login(data: LoginDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      throw new Error('Invalid credentials');
    }


    const { password, ...result } = user;

    return {
      access_token: this.jwtService.sign(result),
    };
  }
}
