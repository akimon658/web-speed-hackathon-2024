const SUPPORTED_MAGIKA_LABEL_LIST = ['bmp', 'jpeg', 'png', 'webp', 'avif', 'jxl'];

export async function isSupportedImage(image: File): Promise<boolean> {
  // Check file extension
  const extension = image.name.split('.').pop();
  if (extension && SUPPORTED_MAGIKA_LABEL_LIST.includes(extension)) {
    return true;
  }

  return false;
}
