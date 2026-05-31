import { Router, Request, Response } from 'express';
import { PriceItem } from '../models/index';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const prices = await PriceItem.find().sort({ category: 1, order: 1 });
    res.json(prices);
  } catch {
    res.status(500).json({ message: 'שגיאת שרת' });
  }
});

router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const item = new PriceItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch {
    res.status(400).json({ message: 'שגיאה ביצירת פריט מחיר' });
  }
});

router.put('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await PriceItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) { res.status(404).json({ message: 'פריט לא נמצא' }); return; }
    res.json(item);
  } catch {
    res.status(400).json({ message: 'שגיאה בעדכון פריט מחיר' });
  }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    await PriceItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'פריט נמחק' });
  } catch {
    res.status(400).json({ message: 'שגיאה במחיקת פריט' });
  }
});

export default router;
