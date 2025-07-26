import { Router } from 'express';
import { authController } from '@/modules/auth/auth.module';
import { registerSchema } from '@/modules/auth/schemas/auth';
import { validateRequest } from '@/validators/request';

const router = Router();

router.post('/register', validateRequest(registerSchema), authController.register);

export default router;
