import { Router, Request, Response } from 'express';
import { FaqItem } from '../models/index';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const faqs = await FaqItem.find({ active: true }).sort({ order: 1 });
    res.json(faqs);
  } catch {
    res.status(500).json({ message: 'שגיאת שרת' });
  }
});

router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const item = new FaqItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch {
    res.status(400).json({ message: 'שגיאה ביצירת שאלה' });
  }
});

router.put('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await FaqItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) { res.status(404).json({ message: 'שאלה לא נמצאה' }); return; }
    res.json(item);
  } catch {
    res.status(400).json({ message: 'שגיאה בעדכון שאלה' });
  }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    await FaqItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'שאלה נמחקה' });
  } catch {
    res.status(400).json({ message: 'שגיאה במחיקת שאלה' });
  }
});

export default router;
