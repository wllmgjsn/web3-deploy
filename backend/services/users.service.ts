import { db } from "../src/prisma/db.ts";

export class UserService {
  
  static async getUsers() {
    return await db.orm.public.User.all();
  }
  
  static async getUserNameById(id: number) {
    const user = await db.orm.public.User.where({ id }).select("name").first();
    return user ? user.name : null;
  }
}
