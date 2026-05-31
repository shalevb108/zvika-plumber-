import { Router, Request, Response } from 'express';
import { Service } from '../models/index';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const services = await Service.find({ active: true }).sort({ order: 1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'שגיאת שרת' });
  }
});

router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: 'שגיאה ביצירת שירות' });
  }
});

router.put('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) { res.status(404).json({ message: 'שירות לא נמצא' }); return; }
    res.json(service);
  } catch (err) {
    res.status(400).json({ message: 'שגיאה בעדכון שירות' });
  }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'שירות נמחק' });
  } catch (err) {
    res.status(400).json({ message: 'שגיאה במחיקת שירות' });
  }
});

export default router;
