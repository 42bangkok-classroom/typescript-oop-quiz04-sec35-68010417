import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { IUser } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly dataPath = path.join(process.cwd(), 'data', 'users.json');

  test() {
    return [];
  }

  findAll(): IUser[] {
    const rawData = fs.readFileSync(this.dataPath, 'utf-8');
    const users = JSON.parse(rawData) as IUser[];
    return users;
  }

  create(dto: CreateUserDto): IUser {
    // 1. ดึงข้อมูลผู้ใช้ปัจจุบันทั้งหมด
    const users = this.findAll();

    // 2. หา ID ที่มากที่สุด แล้ว +1 เพื่อเป็น ID ถัดไป
    const maxId = users.reduce((max, user) => {
      const currentId = parseInt(user.id, 10);
      return currentId > max ? currentId : max;
    }, 0);
    const newId = (maxId + 1).toString();

    // 3. สร้าง Object User ใหม่
    const newUser: IUser = {
      id: newId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      username: dto.username,
    };

    // 4. บันทึกข้อมูลกลับลงไปในไฟล์ JSON
    users.push(newUser);
    fs.writeFileSync(this.dataPath, JSON.stringify(users, null, 2), 'utf-8');

    return newUser;
  }
}
