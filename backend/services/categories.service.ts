import { db } from "../src/prisma/db.ts";

class CategoriesService {

    public static async getAll() {
        return await db.orm.public.Category.all();
    }

}

export default CategoriesService;