import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  // กำหนด path ไปที่ไฟล์ data/users.json โดยเริ่มจาก root ของโปรเจกต์
  private readonly dataPath = path.join(process.cwd(), 'data', 'users.json');

  test() {
    return [];
  }

  findAll(): IUser[] {
    // อ่านข้อมูลจากไฟล์
    const rawData = fs.readFileSync(this.dataPath, 'utf-8');
    // แปลงข้อมูลจาก String เป็น JSON Array
    const users = JSON.parse(rawData) as IUser[];
    return users;
  }
}