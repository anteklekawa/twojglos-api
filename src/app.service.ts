import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async createUser(createUserDto: CreateUserDto) {}
}
