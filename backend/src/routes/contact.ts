import { Router, Request, Response } from 'express';
import { ContactMessage } from '../models/index';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone, email, message } = req.body;
    if (!name || !phone || !message) {
      res.status(400).json({ message: 'שם, טלפון והודעה הם שדות חובה' });
      return;
    }
    const msg = new ContactMessage({ name, phone, email, message });
    await msg.save();
    res.status(201).json({ message: 'הודעתך נשלחה בהצלחה!' });
  } catch {
    res.status(500).json({ message: 'שגיאה בשליחת הודעה' });
  }
});

router.get('/', authMiddleware, async (_req: Request, res: Response): Promise<void> => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch {
    res.status(500).json({ message: 'שגיאת שרת' });
  }
});

router.patch('/:id/read', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!msg) { res.status(404).json({ message: 'הודעה לא נמצאה' }); return; }
    res.json(msg);
  } catch {
    res.status(400).json({ message: 'שגיאה בעדכון הודעה' });
  }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ message: 'הודעה נמחקה' });
  } catch {
    res.status(400).json({ message: 'שגיאה במחיקת הודעה' });
  }
});

export default router;
