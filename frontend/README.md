# SignAdapt Frontend

The frontend is intended to provide SignAdapt's user interface for communication, sign-language learning, and practice. The planned interface uses React and Vite.

## Planned user experiences

Depending on implementation progress, the frontend may include:

- Welcome and sign-in screens
- A dashboard for navigation and learning progress
- A translation hub for supported text, voice, and ISL-video workflows
- Sign-learning lessons and demonstrations
- Camera-based practice and feedback
- Profile and preference settings

These are product goals, not confirmation that every screen or integration is currently functional.

## Technology

- React
- Vite
- JavaScript or TypeScript, according to the existing project configuration
- CSS or the styling system selected by the project

Use the existing `package.json` and lockfile as the source of truth for installed packages and commands.

## Setup

Open a terminal in the frontend directory:

```powershell
cd frontend
npm install
npm run dev
```

Vite will print the local development URL in the terminal. Use the command scripts defined in `frontend/package.json` if they differ from these examples.

To create a production build, if the project defines the standard Vite build script:

```powershell
npm run build
```

## Backend connection

The frontend should call the backend through a configurable API base URL rather than hard-coding a machine-specific address throughout the code.

If environment configuration is used, document the expected variable in a frontend `.env.example`. Vite exposes variables prefixed with `VITE_` to client-side code, so **never put secrets in frontend environment variables**.

Handle loading, empty, success, and error states for API-driven screens. If the backend or model is unavailable, show an honest status rather than fabricated translation output or evaluation scores.

## Authentication

Auth0 is a candidate authentication provider, not necessarily configured. If it is adopted, follow its official React setup and use access tokens for protected backend requests. Authorization must still be enforced by the backend.

## Accessibility and usability

- Use clear labels, readable contrast, keyboard-accessible controls, and visible focus states.
- Provide understandable feedback when camera or microphone permission is denied.
- Explain why camera or microphone access is requested.
- Include text alternatives or instructions wherever a visual demonstration alone is insufficient.
- Do not imply that generated sign output is a fluent or grammatically accurate ISL translation unless validated.

## Development checks

Use the scripts present in `package.json` for linting, tests, and builds. Before merging a UI change, check the main supported viewport sizes, keyboard navigation, loading/error states, and API failure behavior.

## Related documentation

- `../PRD.md` — product requirements
- `../architecture.md` — system architecture
- `../backend/README.md` — backend setup and API notes

