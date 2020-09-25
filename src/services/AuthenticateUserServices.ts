import User from '../models/User';
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
    
    public  async execute({email, password}:Request) :Promise<Response>{
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if(!user){
            throw new Error ('INCORRECT email or password combination. ')
        }
        
        const passwordMatch = await compare(password, user.password); 

        if (!passwordMatch) {
            throw new Error('INCORRECT email or password combination. ')
        }
        const token = sign({ }, '375ba0d18829a249d230ddf0dc0f190a',{
            subject: user.id,
            expiresIn: '1d'
        });

        return {
            user,
            token,
        };
    }
}
export default AthenticateUserService;