const validar=joischema=>async(req,res,next)=>{
    try {
         await joischema.validateAsync(req.body);
        
        next()
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:error.message})
    }

}

    module.exports={validar}