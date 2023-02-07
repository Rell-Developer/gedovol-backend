import jwt from 'jsonwebtoken';

const generarJWT = (cedula)=>{
    return jwt.sign({cedula}, process.env.JWT_SECRET,{
        expiresIn:"30d",
    })
}

export default generarJWT;