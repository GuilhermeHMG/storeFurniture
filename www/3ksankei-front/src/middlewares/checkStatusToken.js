import { useAuth } from '../store/Autentication/auth';
import Cookies from 'js-cookie';

export const authMiddleware = async (to, from, next) => {
    const auth = useAuth();
    const accessToken = Cookies.get('access_token');
    if (to.meta.requiresAuth && !accessToken) {
        return next('/login');
    }

    if (to.path == '/redefinirSenha') {
        return next();
    }

    if (to.meta.requiresAuth && accessToken) {
        try {
          const response = await auth.verifyTokenStatus(accessToken);
          console.log('response',response)
            if (!response.success) {
                return next('/login');
            }

          Cookies.set('access_token', response.data.access_token, { expires: 7 })
        } catch (error) {
            return next('/login');
        }
    }
    next();
    return
};
