import { Router } from "express";
import { UserService } from "../services/users.service.ts";

const router = Router();

router.get('/', async (_req, res) => {
    res.json(await UserService.getUsers());
})

export default router;