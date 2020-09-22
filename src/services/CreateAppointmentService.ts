import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';
import { getCustomRepository} from 'typeorm';
import{ startOfHour } from 'date-fns';

interface Request {
    provider: string;
    date: Date;
}
class CreateAppointmentService{
    public  async execute({date, provider}: Request):Promise <Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository)

        const appoimentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appoimentDate
            );
        if (findAppointmentInSameDate){
             
            throw Error('This appointment is already booked');           
        }

        const appointment = appointmentsRepository.create({
            provider,
            date: appoimentDate,
        });
        await appointmentsRepository.save(appointment);

        return appointment;

    }

}
export default CreateAppointmentService;