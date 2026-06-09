import jwt from 'jsonwebtoken';

const SECRET_KEY = 'mi_clave_secreta_super_segura';

const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.status(401).send('Token requerido');

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).send('Token inválido o expirado');

        req.user = decoded;
        next();
    });
};

export default verificarToken;
export { SECRET_KEY };