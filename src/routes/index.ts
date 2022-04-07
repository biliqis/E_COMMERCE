import { Router } from "express";
const router = Router()
import indexRouter from './v1'

router.use(indexRouter);

export default router;
