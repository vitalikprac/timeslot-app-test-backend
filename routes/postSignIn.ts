import * as bcrypt from "bcrypt";
import {errorBadRequest} from "../validation/authParamsValidation";
import {pool, server} from "../server";
import {dbRequest} from "../db/util";

export const postSignIn = async (request, reply) => {
    const {username, password} = request.body;

    await dbRequest(async(client)=>{
        const result = await client.query(`select password
                                               from public.user
                                               where username = $1`, [username]);
        const hashPassword = result.rows?.[0]?.password;
        let correctPassword = false;
        if (hashPassword) {
            correctPassword = await bcrypt.compare(password, hashPassword);
        }
        if (!hashPassword || !correctPassword) {
            reply.status(400).send(errorBadRequest('Incorrect username or password'));
        }
    })
    const token = server.jwt.sign({username, password});
    reply.send({
        statusCode: 200,
        token
    });
}
