export const ensureAbsoluteUrl = (url?: string): string => {
  if (!url) return '#';
  
  const trimmed = url.trim();
  
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:')) {
    return trimmed;
  }
  
  // If it's a DOI
  if (trimmed.startsWith('10.')) {
    return `https://doi.org/${trimmed}`;
  }
  
  // Default to https
  return `https://${trimmed}`;
};

export const resolveImageUrl = (url?: string): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const API_BASE = import.meta.env.VITE_API_BASE || (isLocalhost ? 'http://localhost:3000' : 'https://portfolio-2-afjx.onrender.com');
  return url.startsWith('/') ? `${API_BASE}${url}` : `${API_BASE}/${url}`;
};
