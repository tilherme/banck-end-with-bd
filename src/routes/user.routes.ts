import { Router } from 'express';

import CreateUserService from '../services/CreateUserServices';

const userRouter = Router();




userRouter.post('/', async (request, response) => {
    try {
        const {name, email, password} = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({ 
            name ,
            email,
            password,
        });



        response.json(user)
         
    } catch (err) {
        return response.status(400).json({ error: err.message });

    }
})


export default userRouter;