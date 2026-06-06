import jwt from 'jsonwebtoken'


//admin authentication middleware

const authUser = async(req,res,next)=>{
    try {
        
        const headerToken = req.headers.authorization;
        const token = headerToken?.startsWith('Bearer ') ? headerToken.slice(7) : req.headers.token;

        if(!token){
            return res.json({success:false,message:"Not Authorized,Login Again"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)

        console.log(token_decode)
        // jwt payload is created as: jwt.sign({ id: user._id }, ...)
        req.userId = token_decode.id

        next();
    } catch (error) {
        console.log("Auth error:", error);
        res.json({success:false,message:error.message})
    }
}
export default authUser