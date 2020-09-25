import { Router } from 'express';

import AuthenticateUserServices from '../services/AuthenticateUserServices';
const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

     const authenticateUserServices = new AuthenticateUserServices();
      const { user, token } = await authenticateUserServices.execute({
            email, 
            password, 
        })

        return response.json({ user, token });

    } catch (err) {
        return response.status(400).json({ error: err.message });

    }
})


export default sessionsRouter;