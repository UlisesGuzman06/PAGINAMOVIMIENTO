export const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Hardcoded fallback for production to avoid localhost errors if env var is missing
  if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
    return 'https://paginamovimiento.onrender.com';
  }

  return 'http://localhost:3001';
};
