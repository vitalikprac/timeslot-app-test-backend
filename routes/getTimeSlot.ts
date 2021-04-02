import {server} from "../server";
import {dbRequest} from "../db/util";

export const getTimeSlot = async (request, reply) => {
    const auth = request.headers.authorization;
    const token = auth.split(' ')[1];
    const {username} = server.jwt.decode(token);
    let result;
    await dbRequest(async(client)=>{
        result = await client.query(
            `select value from public.slot where user_id=(select id from public.user where username=$1)`, [username]);
    })
    reply.send({
        statusCode: 200,
        timeSlot: result.rows?.[0]?.value
    })
}
