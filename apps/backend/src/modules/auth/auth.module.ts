import { AuthController } from '@/modules/auth/controllers/auth';
import { AuthService } from '@/modules/auth/services/auth';

const authService = new AuthService();
const authController = new AuthController(authService);

export { authController, authService };
