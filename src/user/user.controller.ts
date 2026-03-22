import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test') // เอาเครื่องหมาย : ออก เพื่อให้เป็น exact path
  test() {
    return this.userService.test();
  }
}