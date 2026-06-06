import jwt from 'jsonwebtoken'


//admin authentication middleware

const authAdmin = async(req,res,next)=>{
    try {
        
        const {atoken} = req.headers

        if(!atoken){
            console.log("No atoken found - returning unauthorized");
            return res.json({success:false,message:"Not Authorized,Login Again"})
        }
        const token_decode = jwt.verify(atoken,process.env.JWT_SECRET)
    
        if(token_decode!==(process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD)){
            console.log("Token validation failed");
            return res.json({success:false,message:"Not Authorized,Login Again"})
        }
        console.log("Authorization passed");
        next();
    } catch (error) {
        console.log("Auth error:", error);
        res.json({success:false,message:error.message})
    }
}
export default authAdmin