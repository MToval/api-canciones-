import express from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === '1234') {
        const user = { id: 1, name: 'Heber' };

        const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });

        res.json({ message: 'Login exitoso', token });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
});

export default router;