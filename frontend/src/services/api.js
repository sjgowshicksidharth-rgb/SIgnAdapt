/**
 * SignAdapt API Client Helper
 * Prepares frontend requests for integration with the FastAPI backend.
 * Automatically attaches Auth0 Bearer token when an authenticated session is active.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export async function fetchWithAuth(endpoint, options = {}, getAccessTokenSilently = null) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (typeof getAccessTokenSilently === 'function') {
    try {
      const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
      const token = await getAccessTokenSilently({
        authorizationParams: audience ? { audience } : undefined
      });
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (err) {
      // In guest mode or if audience is not configured, continue without token
      console.debug('[SignAdapt API] Token omitted or silent acquisition skipped:', err.message);
    }
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  return fetch(url, {
    ...options,
    headers
  });
}

export default {
  fetchWithAuth,
  API_BASE_URL
};
