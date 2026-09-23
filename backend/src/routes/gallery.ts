import { Router, Request, Response } from 'express';
import { GalleryItem, GalleryImage } from '../models/index';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await GalleryItem.find().sort({ order: 1 });
    res.json(items);
  } catch {
    res.status(500).json({ message: 'שגיאת שרת' });
  }
});

router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const item = new GalleryItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch {
    res.status(400).json({ message: 'שגיאה ביצירת פריט' });
  }
});

router.put('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) { res.status(404).json({ message: 'פריט לא נמצא' }); return; }
    res.json(item);
  } catch {
    res.status(400).json({ message: 'שגיאה בעדכון פריט' });
  }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await GalleryItem.findByIdAndDelete(req.params.id);
    // Clean up the associated stored image, if any (imageUrl like /api/images/<id>).
    const match = item?.imageUrl?.match(/^\/api\/images\/([a-f\d]{24})$/i);
    if (match) {
      await GalleryImage.findByIdAndDelete(match[1]).catch(() => {});
    }
    res.json({ message: 'פריט נמחק' });
  } catch {
    res.status(400).json({ message: 'שגיאה במחיקת פריט' });
  }
});

export default router;
