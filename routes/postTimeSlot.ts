import {server} from "../server";
import {dbRequest} from "../db/util";

export const postTimeSlot = async (request, reply) => {
    const auth = request.headers.authorization;
    const token = auth.split(' ')[1];
    const {username} = server.jwt.decode(token);
    const {timeSlot} = request.body;
    await dbRequest(async (client)=>{
        await client.query(`call replace_slot($1,$2)`, [username,JSON.stringify(timeSlot)]);
    })

    reply.send({
        statusCode: 200,
        message: 'Time slot saved!'
    });
}
