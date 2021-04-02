import {pool, server} from "../server";

export const dbRequest = async (requestBody)=>{
    try {
        const client = await pool.connect();
        try {
            return await requestBody(client);
        } catch (err) {
            server.log.error(err);
        } finally {
            client.release();
        }
    } catch (err) {
        server.log.error(err);
    }
}

