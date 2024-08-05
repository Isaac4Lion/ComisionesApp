import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT = (id, rol) => {
    return jwt.sign({id, rol}, process.env.JWT_SECRET, {expiresIn: '1d'});
}

export default JWT;