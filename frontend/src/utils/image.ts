// Compress and resize an image file in the browser before upload.
// Scales the longest edge down to `maxEdge` and re-encodes as JPEG, returning the
// base64 payload (without the "data:" prefix) plus its content type.
export async function compressImage(
  file: File,
  maxEdge = 1400,
  quality = 0.8
): Promise<{ data: string; contentType: string }> {
  const dataUrl: string = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('קריאת הקובץ נכשלה'));
    reader.readAsDataURL(file);
  });

  const img: HTMLImageElement = await new Promise((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error('טעינת התמונה נכשלה'));
    el.src = dataUrl;
  });

  const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
  const width = Math.round(img.width * scale);
  const height = Math.round(img.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('דחיסת התמונה נכשלה');
  ctx.drawImage(img, 0, 0, width, height);

  const jpegDataUrl = canvas.toDataURL('image/jpeg', quality);
  const data = jpegDataUrl.split(',')[1]; // strip "data:image/jpeg;base64," prefix
  return { data, contentType: 'image/jpeg' };
}
