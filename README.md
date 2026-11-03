
# SignAdapt 🤟
### Connect • Communicate • Learn

**SignAdapt** is an ISL-first multimodal communication and interactive sign-language learning platform designed to improve communication between Indian Sign Language (ISL) users and people who primarily communicate through text or speech.

The project combines multimodal input processing, sign-language recognition, speech processing, text-to-speech, avatar-based sign presentation, and interactive sign-learning in a modular, research-oriented application.

> **Current focus:** Building a reliable, testable ISL-first communication pipeline and an accessible learning experience. Features shown in the UI may remain under development until their underlying models and integrations are implemented and evaluated.

---

## 📌 Project Overview

Communication can be challenging when people use different primary communication methods. SignAdapt aims to bring supported text, voice, and sign-language workflows into one accessible application.

Users will be able to provide text, voice recordings, or supported ISL video input. The system will process each input through the appropriate pipeline and provide text and speech outputs. The platform also includes an avatar-based sign presentation experience for supported content and interactive ISL lessons with camera-based practice and model-assisted feedback.

SignAdapt is being developed as both a software application and an AI/ML research project. Model performance, dataset suitability, computational requirements, and system limitations will be evaluated rather than assumed.

## ✨ Planned Features

### Multimodal Communication
- **Text input:** Enter text through the application.
- **Voice input:** Record or upload supported audio for speech recognition.
- **ISL input:** Provide supported sign-language video or camera input.
- **Text output:** Display recognized or processed content.
- **Text-to-speech:** Generate speech from supported text.
- **Avatar-based sign presentation:** Display supported signs or phrases through an avatar interface.

### Interactive ISL Learning
- Structured lessons organized by topic or difficulty.
- Sign demonstrations and guided practice.
- Camera-based practice for supported signs.
- Model-assisted feedback, including retry and recognition states.
- Learning progress indicators where progress tracking is implemented.

### User Experience
- Login, signup, and account-management screens.
- Accessible dashboard and translation interface.
- Profile and preferences.
- Responsive layouts and clear error states.
- Authentication integration planned using Auth0, subject to final configuration.

**Note:** These are planned product capabilities, not a claim that every feature is currently implemented.

## 🧠 Research Focus

SignAdapt follows a research-oriented development process.

Areas of investigation include:

- ISL recognition using suitable computer-vision and deep-learning techniques.
- Speech-recognition quality for supported audio.
- Comparison of appropriate baseline and improved models.
- Recognition accuracy, precision, recall, F1-score, and confusion matrices where appropriate.
- Word Error Rate for suitable sequence-level tasks.
- Inference latency and computational requirements.
- Failure analysis, unsupported inputs, and generalization limitations.
- Evaluation of avatar sign coverage and practice-feedback behaviour.

Datasets, model architectures, and experimental protocols will be documented as they are selected and implemented. Performance results will be reported only after experiments have been conducted.

## 🏗️ Technology Stack

| Component | Technology |
|---|---|
| Frontend | React, Vite, JavaScript, CSS |
| Backend API | Python, FastAPI |
| API server | Uvicorn |
| Machine learning | Python; model libraries selected during research |
| Authentication | Auth0 planned |
| Data and artifacts | Separate raw/processed data and model-artifact directories |
| Testing | Pytest and appropriate frontend/backend tests |

The final database, model architectures, and deployment configuration will be documented once selected. SignAdapt does not assume a database or a specific ML model before the relevant design decisions are made.

## 🗂️ Repository Structure

```text
SignAdapt/
├── README.md
├── PRD.md
├── architecture.md
├── .gitignore
├── Research.xlsx
│
├── frontend/
│   └── React + Vite application
│
├── backend/
│   ├── app/
│   ├── tests/
│   ├── .env.example
│   ├── requirements.txt
│   └── README.md
│
├── ml/
│   └── Data preparation, training,
│       inference, and evaluation
│
├── data/
│   ├── raw/
│   ├── processed/
│   └── splits/
│
├── artifacts/
│   ├── models/
│   ├── metrics/
│   └── plots/
│
└── docs/
    ├── research-plan.md
    ├── experiment-log.md
    └── current-status.md
```

This tree describes the intended organization. Some directories or files may not yet be implemented; retain the actual existing repository structure when making changes.

## ⚙️ Getting Started

### Prerequisites

Install the following before running the application:

- Python version compatible with the backend dependencies.
- Node.js and npm compatible with the frontend project.
- Git.
- A code editor such as Visual Studio Code.

### 1. Clone or open the existing repository

If you already have the repository cloned, open that folder directly. Do not initialize a second Git repository.

```bash
cd SignAdapt
```

### 2. Set up the backend

```bash
cd backend
python -m venv .venv
```

Activate the environment.

**Windows PowerShell:**

```powershell
.\.venv\Scripts\Activate.ps1
```

Install the backend dependencies:

```bash
python -m pip install -r requirements.txt
```

Create a local `.env` file based on `.env.example` when the backend configuration requires it. Never commit credentials, private keys, or real secrets.

### 3. Run the backend

Once the FastAPI entry point exists at `app/main.py`, run:

```bash
uvicorn app.main:app --reload
```

The API documentation will normally be available at:

- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

These commands assume the entry point and routes have been implemented. Adjust the module path if the existing application uses a different entry point.

### 4. Set up the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite. These commands assume the frontend contains a valid `package.json` with the corresponding scripts.

## 🔐 Authentication and Security

Auth0 is the current candidate for managed authentication.

The planned authentication flow is:

1. The user signs in through the frontend.
2. The frontend obtains an appropriate access token.
3. The frontend sends the token when calling protected backend endpoints.
4. FastAPI verifies the token using the configured issuer, audience, and signing keys.
5. The backend applies authorization checks before returning protected resources.

Authentication must be verified by the backend. A protected page or hidden frontend button alone does not secure an API.

Audio, video, and camera input must be handled carefully. Data retention, external processing, and permissions should be explained to users.

## 📊 Dataset and Model Policy

ISL is the initial target language.

Before selecting a dataset, assess:

- Vocabulary and sign coverage.
- Annotation format and label quality.
- Dataset size and class distribution.
- Subject diversity and recording conditions.
- License and permitted use.
- Suitability of training, validation, and test splits.

Keep original data separate from processed data. Document preprocessing, dataset versions, and experiment splits. Where appropriate, use subject-independent evaluation to reduce data leakage.

ASL and other sign languages are future extensions requiring suitable language-specific data and evaluation.

## 🧪 Testing and Evaluation

Testing will cover:

- Input validation and supported file formats.
- API behaviour and error handling.
- Authentication and protected endpoints, once integrated.
- Speech-recognition and sign-recognition pipelines.
- Text-to-speech playback.
- Avatar presentation for supported signs.
- Learning-practice feedback.
- Performance and resource usage.

Results must be measured using a defined protocol. Mock UI scores must never be presented as actual model results.

## ⚠️ Limitations

- Recognition is limited to the vocabulary, datasets, and models actually supported.
- Sign recognition and avatar-based sign generation are separate technical tasks.
- Word-by-word conversion from English to signs does not guarantee grammatically correct ISL.
- Model predictions may be uncertain or incorrect.
- Camera, audio, and video performance may vary across devices and recording conditions.
- SignAdapt is not a replacement for qualified interpreters in high-stakes situations.

## 🛣️ Development Roadmap

1. Finalize the PRD and technical architecture.
2. Establish the FastAPI backend and React + Vite frontend.
3. Build the UI based on the approved SignAdapt design.
4. Implement text and speech workflows.
5. Select, prepare, and evaluate a suitable ISL dataset.
6. Integrate and test the sign-recognition pipeline.
7. Implement avatar presentation for a defined supported vocabulary.
8. Develop interactive lessons and camera-based practice.
9. Integrate authentication and protect relevant resources.
10. Conduct systematic evaluation and document results.

The order may change as technical dependencies and research findings become clearer.

## 📚 Project Documentation

- **Product requirements:** `PRD.md`
- **Technical architecture:** `architecture.md`
- **Backend instructions:** `backend/README.md`
- **Research plan:** `docs/research-plan.md`
- **Experiment log:** `docs/experiment-log.md`
- **Current implementation status:** `docs/current-status.md`

Documentation should be updated as design decisions, implementations, and experiments evolve.

## 🤝 Development Principles

- Build modular, testable components.
- Keep the UI separate from model inference.
- Preserve the existing repository and Git history.
- Keep secrets out of source control.
- Document dataset provenance and licensing.
- Report actual experimental results without fabricating performance.
- Clearly distinguish implemented features from planned features.

---

**SignAdapt — Connect • Communicate • Learn**

*An ISL-first multimodal communication and interactive sign-language learning project.*
