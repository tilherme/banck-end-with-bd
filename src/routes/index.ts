import { Router, request } from 'express';
import appointmentsRouter from './appointment.routes';

const routes = Router();

routes.use('/agendamentos', appointmentsRouter)


export default routes;