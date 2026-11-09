# SignAdapt — Auth0 Integration Audit & Implementation Plan

**Date:** 2026-11-09  
**Status:** Implementation Complete & Production Build Verified  
**Target:** Frontend Authentication Integration for SignAdapt

---

## 1. Existing Frontend Architecture

| Property | Current Specification | Reference File |
| :--- | :--- | :--- |
| **Framework** | **React 18.3.1** (Functional components with hooks) | `frontend/package.json` |
| **Language** | **JavaScript (ES Modules / JSX)** | `frontend/src/main.jsx` |
| **Build System** | **Vite 5.4.11** with `@vitejs/plugin-react` | `frontend/vite.config.js` |
| **Package Manager** | **npm 11.19.0** (Node.js v24.21.0) | Working environment |
| **Routing** | **React Router DOM v6.28.0** (`BrowserRouter`, `<Routes>`, `<Route>`, `<Outlet>`) | `frontend/src/App.jsx` |
| **Styling** | **Tailwind CSS v3.4.15** with compiled custom Stitch design tokens | `frontend/tailwind.config.js` |
| **Current Auth State** | Visual mock in `WelcomePage.jsx` (`authMode: 'login' | 'signup'`, form `handleSubmit` navigates to `/dashboard`, `handleGuestLogin` navigates to `/dashboard`). No Auth SDK installed. | `frontend/src/pages/WelcomePage.jsx` |

---

## 2. Recommended Auth0 SDK

### **`@auth0/auth0-react`** (v2.x)

- **Why:** This is Auth0’s official, maintained client-side SDK for React Single-Page Applications (SPAs).
- **Architecture Alignment:**
  - Implements the **Authorization Code Flow with Proof Key for Code Exchange (PKCE)**, which is the OAuth 2.0 / OpenID Connect security standard for browser-based SPAs.
  - Exposes `<Auth0Provider>` and the `useAuth0()` hook (`user`, `isAuthenticated`, `isLoading`, `loginWithRedirect`, `logout`, `getAccessTokenSilently`).
  - Integrates directly with Vite environment variables (`import.meta.env.VITE_*`).
  - Issues JWT access tokens for protected FastAPI backend requests (`PyJWT` is already specified in `backend/requirements.txt`).

---

## 3. Page Accessibility Matrix (Public vs. Protected)

| Route | Page Component | Access Level | Unauthenticated / Guest Behavior |
| :--- | :--- | :--- | :--- |
| `/` | `WelcomePage` | **Public** | Auth entry point |
| `/login` | `WelcomePage` | **Public** | Dedicated login route |
| `/dashboard` | `DashboardPage` | **Protected / Guest-Allowed** | Accessible if authenticated or in guest mode |
| `/translation`| `TranslationHubPage`| **Protected / Guest-Allowed** | Accessible if authenticated or in guest mode |
| `/learn` | `SignLearningPage` | **Protected / Guest-Allowed** | Accessible if authenticated or in guest mode |
| `/practice` | `PracticeModePage` | **Protected / Guest-Allowed** | Accessible if authenticated or in guest mode |
| `/profile` | `ProfileSettingsPage`| **Protected** | Requires Auth0 authentication or guest profile fallback |
| `/settings` | `ProfileSettingsPage`| **Protected** | Requires Auth0 authentication or guest profile fallback |

> **PRD §5.1 & §10 alignment:**  
> *"Optional guest or unauthenticated access to public/demo features, if enabled by the implementation."*  
> The "Continue as Guest" button from the Stitch design activates an unauthenticated guest session so users can evaluate demo features without an account, while full authenticated accounts receive persistent identity and secure tokens.

---

## 4. User Information Retrieval & Display

| UI Location | Stitch Design Default | Auth0 User Property | Guest / Fallback State |
| :--- | :--- | :--- | :--- |
| **Top Header Avatar** | Material icon / avatar circle | `user?.picture` | Default user avatar |
| **Dashboard Greeting** | `"Hello, User! 👋"` | `user?.name || user?.nickname` | `"Hello, User! 👋"` |
| **Dashboard User Chip** | `"Aarav Patel"` / `"Learner"` | `user?.name`, email or role | `"Guest User"` / `"Learner"` |
| **Profile Name** | `"SignAdapt User"` | `user?.name || user?.nickname` | `"Guest User"` |
| **Profile Email** | `"user@example.com"` | `user?.email` | `"guest@signadapt.local"` |
| **Profile Picture** | Static Indian tech portrait | `user?.picture` | Preserved Stitch portrait |

---

## 5. Files to Modify & Files to Create

```text
SIgnAdapt/frontend/
├── .env.example                       [MODIFY] Add VITE_AUTH0_* variables
├── .env                               [CREATE] Local environment config (git-ignored)
├── package.json                       [MODIFY] Add @auth0/auth0-react dependency
└── src/
    ├── main.jsx                       [MODIFY] Wrap app in <Auth0ProviderWithNavigate>
    ├── App.jsx                        [MODIFY] Add <ProtectedRoute> guard for AppShell routes
    ├── components/
    │   └── auth/
    │       ├── Auth0ProviderWithNavigate.jsx [CREATE] Router-aware Auth0 provider
    │       └── ProtectedRoute.jsx            [CREATE] Guard supporting Auth0 & Guest mode
    ├── layouts/
    │   └── AppShell.jsx               [MODIFY] Connect user avatar & real Auth0 logout
    └── pages/
        ├── WelcomePage.jsx            [MODIFY] Connect Login, Signup & Google to Auth0
        ├── DashboardPage.jsx          [MODIFY] Dynamic user name & avatar from useAuth0
        └── ProfileSettingsPage.jsx    [MODIFY] Dynamic name, email & picture from useAuth0
```

---

## 6. Required Environment Variables

To be defined in `frontend/.env.example` and configured in `frontend/.env`:

```env
# Backend API Base URL
VITE_API_BASE_URL=http://127.0.0.1:8000

# Auth0 Configuration (Client-side safe; never put client secrets here)
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-spa-client-id
VITE_AUTH0_AUDIENCE=http://127.0.0.1:8000
VITE_AUTH0_CALLBACK_URL=http://localhost:3000/dashboard
```

> [!CAUTION]
> As per strict security guidelines, **no client secrets** (`AUTH0_CLIENT_SECRET`) are ever placed in Vite frontend code or `.env` files. SPAs utilize PKCE flow where client secrets are neither required nor permitted.

---

## 7. Required Auth0 Dashboard Configuration

When setting up the Auth0 dashboard application:

1. **Application Type:** Select **Single Page Application (SPA)**.
2. **Allowed Callback URLs:**
   ```
   http://localhost:3000, http://localhost:3000/dashboard, http://127.0.0.1:3000, http://127.0.0.1:3000/dashboard
   ```
3. **Allowed Logout URLs:**
   ```
   http://localhost:3000, http://localhost:3000/login, http://127.0.0.1:3000, http://127.0.0.1:3000/login
   ```
4. **Allowed Web Origins:**
   ```
   http://localhost:3000, http://127.0.0.1:3000
   ```
5. **API Identifier (Audience):**
   * Create an API in Auth0 (e.g. `http://127.0.0.1:8000` or `https://api.signadapt.com`) using RS256 signing so the FastAPI backend can verify incoming Bearer tokens with `PyJWT`.

---

## 8. Preserving the Stitch UI During Integration

To ensure the approved Stitch visual presentation is **not redesigned or altered**:

1. **Welcome Screen (`WelcomePage.jsx`):**
   - **Google button:** Triggers `loginWithRedirect({ authorizationParams: { connection: 'google-oauth2' } })`.
   - **Login / Sign Up tab & form:**
     - Submitting the email/password form delegates to Auth0 with `loginWithRedirect({ authorizationParams: { screen_hint: authMode === 'signup' ? 'signup' : 'login', login_hint: email } })`.
   - **Continue as Guest:** Activates client-side guest session and routes directly to `/dashboard`.
2. **Sidebar Logout (`AppShell.jsx`):**
   - Replaces static `<Link to="/login">` with a click handler that calls Auth0's `logout({ logoutParams: { returnTo: window.location.origin } })` or clears the guest session.
3. **User Profile & Header:**
   - Automatically displays live Auth0 profile picture/name when logged in, or gracefully displays the Stitch default illustration when in guest mode.

---

## 9. Potential Integration Issues & Mitigations

| Potential Issue | Impact | Mitigation Strategy |
| :--- | :--- | :--- |
| **Auth0 Domain / Client ID not yet configured** | App crashes on launch if Provider requires config | Implement fallback mode: if `VITE_AUTH0_DOMAIN` is a placeholder, display a non-blocking console notice and allow Guest mode to function normally without breaking development. |
| **Redirect loop after Auth0 callback** | User stuck in reload loop | Implement `onRedirectCallback` in `Auth0ProviderWithNavigate` using `navigate(appState?.returnTo || '/dashboard')`. |
| **Token expiration during practice session** | Live camera session interrupted | Use Auth0 silent authentication with Refresh Token rotation (`useRefreshTokens={true}`). |
| **Cross-Origin Auth with embedded forms** | Browser blocks third-party cookies | Use Auth0's recommended redirect flow with `screen_hint` and `login_hint` to avoid deprecated third-party cookie restrictions. |

---

## 10. Step-by-Step Implementation Sequence

1. **Install SDK:**
   Run `npm install @auth0/auth0-react` in `SIgnAdapt/frontend`.
2. **Environment Configuration:**
   Add variables to `frontend/.env.example` and prepare `frontend/.env`.
3. **Create Auth Provider Wrapper:**
   Implement `src/components/auth/Auth0ProviderWithNavigate.jsx` integrating `useNavigate()` with `<Auth0Provider>`.
4. **Create Route Guard:**
   Implement `src/components/auth/ProtectedRoute.jsx` for protecting AppShell routes while supporting Guest access.
5. **Update Entry Points:**
   Wrap `App` with `Auth0ProviderWithNavigate` in `src/main.jsx`.
6. **Connect `WelcomePage.jsx`:**
   Wire Google login, form submission (with pre-filled email/screen hint), and Guest mode.
7. **Connect `AppShell.jsx`:**
   Wire header profile avatar and sidebar Logout button.
8. **Connect `DashboardPage.jsx` & `ProfileSettingsPage.jsx`:**
   Wire `useAuth0()` user state for name, email, and picture.
9. **Build & Test:**
   Execute `npm run build` and test routing, guest flow, and Auth0 redirect flow.

