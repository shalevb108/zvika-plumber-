import { Router, Request, Response } from 'express';
import { SiteInfo } from '../models/index';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    let info = await SiteInfo.findOne();
    if (!info) {
      info = new SiteInfo({});
      await info.save();
    }
    res.json(info);
  } catch {
    res.status(500).json({ message: 'שגיאת שרת' });
  }
});

router.put('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const info = await SiteInfo.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(info);
  } catch {
    res.status(400).json({ message: 'שגיאה בעדכון מידע האתר' });
  }
});

export default router;
