import * as bcrypt from "bcrypt";
import {errorBadRequest} from "../validation/authParamsValidation";
import {server} from "../server";
import {dbRequest} from "../db/util";


export const postAuth = async (request, reply) => {
    const {username, password} = request.body;

    await dbRequest(async(client)=>{
        const hash = await bcrypt.hash(password, 10);
        const result = await client.query(`select id
                                               from public.user
                                               where username = $1`, [username]);
        if (result.rowCount === 0) {
            await client.query(`insert into public.user (username, password)
                                    values ($1, $2);`, [username, hash])
        } else {
            reply.status(400).send(errorBadRequest('User already exist'));
        }
    })

    const token = server.jwt.sign({username, password});
    reply.send({
        statusCode: 200,
        token
    });
}
