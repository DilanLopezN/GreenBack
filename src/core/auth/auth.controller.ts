import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

export class SigninDTO {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService,) {}


  @Post('login')
  async login(@Body() data: LoginDto) {
    return this.authServices.login(data);
  }


}
