import { Router } from "express";
import CategoriesService from "../services/categories.service.ts";

const router = Router();

router.get('/', async (_req, res) => {
    return res.json(await CategoriesService.getAll());
})

export default router;