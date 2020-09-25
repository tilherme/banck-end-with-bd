import User from '../models/User'

import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';


interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new Error('Email address alrdeady used.');
        }

        const hashedPassword = await hash(password, 8);
        const user = await usersRepository.create({
            name,
            password: hashedPassword,
            email,
        });
        await usersRepository.save(user);

        return user;
    }
}
export default CreateUserService;