import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  getTest() {
    return this.userService.test();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('fields') fields?: string) {
    // ถ้ามี fields ส่งมา (เช่น "firstName,lastName") ให้หั่นเป็น Array ด้วยเครื่องหมายลูกน้ำ
    const fieldsArray = fields ? fields.split(',') : undefined;

    // ส่งข้อมูล id และ fieldsArray ไปให้ Service จัดการต่อ
    return this.userService.findOne(id, fieldsArray);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe()) // เปิดใช้ระบบตรวจสอบความถูกต้อง
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
