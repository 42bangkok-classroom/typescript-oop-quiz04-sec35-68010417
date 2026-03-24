import { Injectable,NotFoundException } from '@nestjs/common';
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

  findOne(id: string, fields?: string[]): Partial<IUser> {
    // 1. ดึงข้อมูลทั้งหมดมาก่อน
    const users = this.findAll();

    // 2. ใช้ .find() หา User ที่มี id ตรงกับที่ขอมา
    const user = users.find((u) => u.id === id);

    // 3. ถ้าหาไม่เจอ ให้โยน Error 404 (NotFoundException) ทิ้งไปเลย
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // 4. ถ้าเจอ User แล้ว และมีการระบุ fields ที่ต้องการมาด้วย
    if (fields && fields.length > 0) {
      const filteredUser: any = {};
      
      // เอา fields มาวนลูป เพื่อดึงเฉพาะค่าที่ผู้ใช้ขอ
      fields.forEach((field) => {
        // ดึงค่าจากตัวแปร user มายัดใส่ filteredUser
        if (user[field as keyof IUser] !== undefined) {
          filteredUser[field] = user[field as keyof IUser];
        }
      });
      
      return filteredUser; // คืนค่าเฉพาะบาง field
    }

    // 5. ถ้าไม่ได้ระบุ fields ก็แปลว่าขอข้อมูลเต็มๆ ก็คืนค่า user ทั้งก้อนไปเลย
    return user;
  }
  
  create(dto: CreateUserDto): IUser {
    // 1. ดึงข้อมูลผู้ใช้ปัจจุบันทั้งหมด
    const users = this.findAll();

    // 2. หา ID ที่มากที่สุด แล้ว +1 เพื่อเป็น ID ถัดไป
const allIds = users.map(user => parseInt(user.id, 10)); // แปลง id ทุกคนเป็นตัวเลข
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
