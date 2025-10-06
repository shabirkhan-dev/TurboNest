import { Router } from "express";
import { authController } from "@/modules/auth/auth.module";
import { loginSchema, registerSchema } from "@/modules/auth/schemas/auth";
import { validateRequest } from "@/validators/request";

const router = Router();

router.post("/register", validateRequest(registerSchema), authController.register);
router.post("/login", validateRequest(loginSchema), authController.login);

export default router;
