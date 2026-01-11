// RBAC => Role Base Access Control

// OrderSystemProject => Roles -> Admin || Users



export const AuthorizeRole = (...allowedRoles)=>{
return (req,res,next)=>{

   try {
     if(!req.user || !req.user.role){
        return res.status(401).json({
           message:"Unauthourized",
           success:false 
        })
    }
    if(!allowedRoles.includes(req.user.role))
        return res.status(403).json({message:"Access Denied",success:false})

    next()
   } 
   
   
   catch (error) {
    res.status(500).json({message:"Server error",success:false})
   }
}


}





