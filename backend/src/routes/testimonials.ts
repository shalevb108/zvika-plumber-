import { Router, Request, Response } from 'express';
import { Testimonial } from '../models/index';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const testimonials = await Testimonial.find({ active: true }).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch {
    res.status(500).json({ message: 'שגיאת שרת' });
  }
});

router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const t = new Testimonial(req.body);
    await t.save();
    res.status(201).json(t);
  } catch {
    res.status(400).json({ message: 'שגיאה ביצירת המלצה' });
  }
});

router.put('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!t) { res.status(404).json({ message: 'המלצה לא נמצאה' }); return; }
    res.json(t);
  } catch {
    res.status(400).json({ message: 'שגיאה בעדכון המלצה' });
  }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'המלצה נמחקה' });
  } catch {
    res.status(400).json({ message: 'שגיאה במחיקת המלצה' });
  }
});

export default router;
