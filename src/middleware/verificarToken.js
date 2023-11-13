import jwt from 'jsonwebtoken'
import { SECRET_KET } from '../config.js';


// Función de middleware para verificar el token
export function verificarToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        const usuarioVerificado = jwt.verify(token, SECRET_KET);
        req.usuario = usuarioVerificado;
        next();
    } catch (error) {
        console.log(error)
        res.status(400).json({ mensaje: 'Token no válido.' });
    }
}

