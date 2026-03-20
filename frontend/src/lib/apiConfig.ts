export const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Default para producción (Vercel Build o Runtime)
  if (process.env.NODE_ENV === 'production') {
    return 'https://paginamovimiento.onrender.com';
  }
  
  // Fallback para el lado del cliente basado en el hostname
  if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
    return 'https://paginamovimiento.onrender.com';
  }

  return 'http://localhost:3001';
};
