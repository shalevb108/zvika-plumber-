import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { GalleryImage } from '../models/index';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Upload a compressed image (admin only). Body: { data: "<base64>", contentType: "image/jpeg" }
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, contentType } = req.body || {};
    if (!data || !contentType) {
      res.status(400).json({ message: 'חסרים נתוני תמונה' });
      return;
    }
    const buffer = Buffer.from(data, 'base64');
    const image = new GalleryImage({ data: buffer, contentType });
    await image.save();
    res.status(201).json({ url: `/api/images/${image._id}` });
  } catch {
    res.status(400).json({ message: 'שגיאה בהעלאת תמונה' });
  }
});

// Serve an image (public — must be viewable without auth).
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(404).json({ message: 'תמונה לא נמצאה' });
      return;
    }
    const image = await GalleryImage.findById(req.params.id);
    if (!image) {
      res.status(404).json({ message: 'תמונה לא נמצאה' });
      return;
    }
    res.set('Content-Type', image.contentType);
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(image.data);
  } catch {
    res.status(500).json({ message: 'שגיאת שרת' });
  }
});

export default router;
