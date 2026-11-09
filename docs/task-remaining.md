# SignAdapt — Tasks Remaining

**Last Updated:** 2026-11-09  
**Current Phase:** Stage 2 Frontend Integration Complete; Awaiting Stage 3

---

## FRONTEND — Stage 2 (Completed)
- [x] F-01 — Project configuration (`package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`)
- [x] F-02 — Global styles (`src/styles/index.css`)
- [x] F-03 — Entry points (`src/main.jsx`, `src/App.jsx`)
- [x] F-04 — Shared AppShell layout (`src/layouts/AppShell.jsx`)
- [x] F-05 — Welcome & Login page (`src/pages/WelcomePage.jsx`)
- [x] F-06 — Dashboard page (`src/pages/DashboardPage.jsx`)
- [x] F-07 — Translation Hub page (`src/pages/TranslationHubPage.jsx`)
- [x] F-08 — Sign Learning page (`src/pages/SignLearningPage.jsx`)
- [x] F-09 — Practice Mode page (`src/pages/PracticeModePage.jsx`)
- [x] F-10 — Profile & Settings page (`src/pages/ProfileSettingsPage.jsx`)
- [x] F-11 — Shared UI components (`DonutGauge`, `ToggleSwitch`, `SampleDataBadge`)
- [x] F-12 — Routing & navigation configuration
- [x] F-13 — Package installation and production build validation (`npm run build` passed)

---

## BACKEND — Stage 3 (Next Phase)

- [ ] B-01 — Setup virtual environment & install requirements from `backend/requirements.txt`
- [ ] B-02 — Implement FastAPI application entry point in `backend/app/main.py` with CORS configuration for frontend (`http://localhost:3000`)
- [ ] B-03 — Implement health check route (`/health`)
- [ ] B-04 — Implement text processing route (`/api/v1/text`)
- [ ] B-05 — Implement voice input / transcription route (`/api/v1/voice`)
- [ ] B-06 — Implement sign recognition route (`/api/v1/sign`)
- [ ] B-07 — Implement speech generation route (`/api/v1/speech`)
- [ ] B-08 — Connect frontend service layer (`src/services/api.js`, `signService.js`, `textService.js`, `voiceService.js`) to backend endpoints

---

## ML & DATA — Stage 4

- [ ] M-01 — Dataset selection and preparation for Indian Sign Language (ISL)
- [ ] M-02 — Establish feature extraction pipeline (MediaPipe landmarks / temporal sequences)
- [ ] M-03 — Train / configure baseline recognition model
- [ ] M-04 — Implement model evaluation metrics (Accuracy, F1, latency, confusion matrix)
- [ ] M-05 — Model artifact storage and inference integration with backend

---

## Notes
- `stitch-designs/` remains preserved as the immutable reference design suite.
- Frontend is verified and can be launched locally with `npm run dev` inside `SIgnAdapt/frontend`.
