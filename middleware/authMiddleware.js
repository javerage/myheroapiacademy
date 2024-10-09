import jwt from 'jsonwebtoken'

const secretKey = 'M1_Cl4v3_Ultr4_53cr3t4' // debe ser igual a la de authService y debe guardarse en un archivo de configuración

export function authenticateJWT (req, res, next){
    const authorization = req.header('Authorization') 
    if(!authorization) return res.status(403).json({error : 'Es necesario proporcionar un token'})
        
    const token = req.header('Authorization').split(' ')[1]

    if(!token) return res.status(403).json({error : 'Es necesario proporcionar un token'})

    try{
        const decoded = jwt.verify(token, secretKey)
        req.user = decoded
        next()
    }catch(error){
        res.status(401).json({error : 'Token Invalido.'})
    }
}