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
