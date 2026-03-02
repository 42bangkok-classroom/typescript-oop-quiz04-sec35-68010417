import { Injectable } from '@nestjs/common';
import { IUser } from './user.interface';

@Injectable()
export class UsersService {
  test() {
    return [];
  }

  findAll() : IUser[] {
    return [
      {
        "id": "1",
        "firstName": "สมชาย",
        "lastName": "ใจดี",
        "email": "somchai.jaidee@example.com",
        "username": "somchai_j"
      },
      {
        "id": "2",
        "firstName": "สมหญิง",
        "lastName": "รักเรียน",
        "email": "somying.rakrian@example.com",
        "username": "somying_r"
      },
      {
        "id": "3",
        "firstName": "วิชัย",
        "lastName": "พัฒนาการ",
        "email": "wichai.pattanakarn@example.com",
        "username": "wichai_p"
      },
      {
        "id": "4",
        "firstName": "มาลี",
        "lastName": "สวยงาม",
        "email": "malee.suayngam@example.com",
        "username": "malee_s"
      },
      {
        "id": "5",
        "firstName": "ประเสริฐ",
        "lastName": "ดีมาก",
        "email": "prasert.deemak@example.com",
        "username": "prasert_d"
      },
      {
        "id": "6",
        "firstName": "นิดา",
        "lastName": "ขยันหมั่นเพียร",
        "email": "nida.khayanmanpian@example.com",
        "username": "nida_k"
      },
      {
        "id": "7",
        "firstName": "ธีรพงษ์",
        "lastName": "เก่งมาก",
        "email": "teerapong.kengmak@example.com",
        "username": "teerapong_k"
      },
      {
        "id": "8",
        "firstName": "กมล",
        "lastName": "ใสสะอาด",
        "email": "kamol.saisaart@example.com",
        "username": "kamol_s"
      },
      {
        "id": "9",
        "firstName": "อรุณ",
        "lastName": "สว่างใส",
        "email": "arun.sawangsi@example.com",
        "username": "arun_s"
      },
      {
        "id": "10",
        "firstName": "ปิยะ",
        "lastName": "รุ่งเรือง",
        "email": "piya.rungruang@example.com",
        "username": "piya_r"
      }
    ];
  }
}
