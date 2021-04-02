export const authValidation = async(request, reply, done) =>{
    try{
        await request.jwtVerify();
    }catch(err){
        reply.send(err);
    }
}
