export const errorBadRequest = (message:string) => ({
    statusCode: 400,
    error: 'Bad Request',
    message: message
})


export const authParamsValidation = async(request, reply, done) =>{
    const {username,password} = request.body;
    if (!username || !password){
        reply.status(400).send(errorBadRequest('Bad Auth params'));
        done();
    }
}
