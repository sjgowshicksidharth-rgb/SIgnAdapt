import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

export const isAuth0Configured = Boolean(
  import.meta.env.VITE_AUTH0_DOMAIN &&
  import.meta.env.VITE_AUTH0_CLIENT_ID &&
  !import.meta.env.VITE_AUTH0_DOMAIN.includes('your-tenant') &&
  !import.meta.env.VITE_AUTH0_CLIENT_ID.includes('your-auth0')
);

export default function Auth0ProviderWithNavigate({ children }) {
  const navigate = useNavigate();

  // Load configuration from Vite environment variables
  const domain = import.meta.env.VITE_AUTH0_DOMAIN || 'signadapt.us.auth0.com';
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID || 'placeholder_client_id';
  const redirectUri = window.location.origin;

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || '/dashboard', { replace: true });
  };

  // Base authorization parameters for interactive user login
  // API audience is requested on-demand by API services via getAccessTokenSilently()
  const authorizationParams = {
    redirect_uri: redirectUri,
    scope: 'openid profile email'
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={authorizationParams}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      {children}
    </Auth0Provider>
  );
}
