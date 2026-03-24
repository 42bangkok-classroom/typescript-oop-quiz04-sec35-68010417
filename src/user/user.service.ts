import { Injectable, NotFoundException } from '@nestjs/common';
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

  findOne(id: string, fields?: string[]) {
    const filePath = path.join(process.cwd(), 'data', 'users.json');
    // eslint-disable-next-line
    const users: IUser[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const user = users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (fields) {
      // ระบุ Type ให้ชัดเจนว่าเป็น Partial<IUser> เพื่อแก้ Error ลินเตอร์
      const filteredUser: Partial<IUser> = {};
      fields.forEach((field) => {
        const key = field as keyof IUser;
        if (user[key] !== undefined) {
          filteredUser[key] = user[key];
        }
      });
      return filteredUser;
    }

    return user;
  }

  create(dto: CreateUserDto): IUser {
    // 1. ดึงข้อมูลผู้ใช้ปัจจุบันทั้งหมด
    const users = this.findAll();

    // 2. หา ID ที่มากที่สุด แล้ว +1 เพื่อเป็น ID ถัดไป
    const allIds = users.map((user) => parseInt(user.id, 10)); // แปลง id ทุกคนเป็นตัวเลข
    const maxId = Math.max(0, ...allIds); // หาค่าที่มากที่สุด (ถ้าไม่มีใครเลยให้เริ่มที่ 0)
    const newId = (maxId + 1).toString(); // บวก 1 แล้วแปลงกลับเป็น String

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
