import { Router, request } from 'express';
import appointmentsRouter from './appointment.routes';
import userRouter from './user.routes';

const routes = Router();

routes.use('/agendamentos', appointmentsRouter)
routes.use('/users', userRouter)

export default routes;