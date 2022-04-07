import { Router } from 'express';
const router = Router();
import versionOne from './v1'

router.use(versionOne);

module.exports = router;
