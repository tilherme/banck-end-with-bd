import User from '../models/User';
import authConfig from '../config/auth'
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';


interface Request{
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AthenticateUserService {
    
    public  async execute({  email,  password }:Request) :Promise<Response>{
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if(!user){
            throw new Error ('INCORRECT email or password combination. ')
        }
        
        const passwordMatch = await compare(password, user.password); 

        if (!passwordMatch) {
            throw new Error('INCORRECT email or password combination. ')
        }

        const {secret, expiresIn} = authConfig.jwt;

        const token = sign({ }, secret,{
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token,
        };
    }
}
export default AthenticateUserService;