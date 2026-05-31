import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', (req: Request, res: Response): void => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const jwtSecret = process.env.JWT_SECRET || 'fallback-secret';

  if (!password) {
    res.status(400).json({ message: 'נדרשת סיסמה' });
    return;
  }

  if (password !== adminPassword) {
    res.status(401).json({ message: 'סיסמה שגויה' });
    return;
  }

  const token = jwt.sign({ admin: true }, jwtSecret, { expiresIn: '8h' });
  res.json({ token, message: 'התחברת בהצלחה' });
});

export default router;
