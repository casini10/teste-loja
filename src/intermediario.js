const jwt=require('jsonwebtoken')
const senhajwt=require('./senha/senha')
const token=async(req,res,next)=>{
    // const x=req.headers
    // console.log(x)
    const {authorization}=req.headers
    const tokenGerado=authorization.split(" ")[1]
    const {id}=jwt.verify(tokenGerado,senhajwt)
    req.usuario=id
    next()

}

module.exports={token}

