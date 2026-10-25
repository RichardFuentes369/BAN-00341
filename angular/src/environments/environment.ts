// Si 'window' no está tipado globalmente, puedes declararlo así:
declare const window: any;

// Intentamos leer de window.__env, si existe usamos ese, de lo contrario el respaldo
const browserEnv = typeof window !== 'undefined' ? window.__env : undefined;

export const environment = {
  production: false,
  apiUrl: (browserEnv && browserEnv.apiUrl) 
    ? browserEnv.apiUrl 
    : 'http://localhost:3000/api/',
};