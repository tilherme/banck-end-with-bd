import { Router} from 'express';

import sessionsRouter from './sessions.routes';
import appointmentsRouter from './appointment.routes';
import userRouter from './user.routes';

const routes = Router();

routes.use('/agendamentos', appointmentsRouter)
routes.use('/users', userRouter)
routes.use('/sessions', sessionsRouter)
export default routes;