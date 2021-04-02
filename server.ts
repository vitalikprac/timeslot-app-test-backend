import * as dotenv from 'dotenv';
dotenv.config();
import Fastify, {RouteShorthandOptions} from 'fastify';
import {Pool} from 'pg';
import fastifyJWT from "fastify-jwt";
import fastifyCors from "fastify-cors";
import {authValidation} from "./validation/authValidation";
import {authParamsValidation} from "./validation/authParamsValidation";
import {postAuth} from "./routes/postAuth";
import {postSignIn} from "./routes/postSignIn";
import {postTimeSlot} from "./routes/postTimeSlot";
import {getTimeSlot} from "./routes/getTimeSlot";
export const pool = new Pool();
export const server = Fastify({});

server.register(fastifyJWT, {
    secret: process.env.SECRET
})
server.register(fastifyCors);


interface IAuthBody {
    username: string,
    password: string
}

interface ITimeSlotBody{
    timeSlot: {}
}

const authOpts: RouteShorthandOptions = {
    preValidation: authParamsValidation,
    schema: {
        body: {
            type: 'object',
            properties: {
                username: {
                    type: 'string'
                },
                password: {
                    type: 'string'
                }
            }
        }
    }
}

server.post<{ Body: IAuthBody }>('/auth', authOpts, postAuth );

server.post<{ Body: IAuthBody }>('/signIn', authOpts, postSignIn);

server.post<{ Body: ITimeSlotBody }>('/timeslot', {preValidation: authValidation}, postTimeSlot);

server.get('/timeslot', {preValidation: authValidation}, getTimeSlot);


const start = async () => {
    try {
        const port = process.env.PORT || 3000
        await server.listen(port)
        console.log(`Server run at port ${port}`)
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start();

