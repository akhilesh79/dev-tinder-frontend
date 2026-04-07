import { VITE_API_BASE_URL } from '../constants/common';

export const getImageUrl = (imageValue) => {
  if (!imageValue || typeof imageValue !== 'string') {
    return '';
  }

  if (/^(https?:|data:|blob:)/i.test(imageValue)) {
    return imageValue;
  }

  const assetOrigin = new URL(VITE_API_BASE_URL, window.location.origin).origin;
  const normalizedPath = imageValue.replace(/\\/g, '/').replace(/^\/+/, '');
  const resolvedPath = normalizedPath.includes('/') ? normalizedPath : `uploads/profile-images/${normalizedPath}`;

  return new URL(resolvedPath, `${assetOrigin}/`).toString();
};
