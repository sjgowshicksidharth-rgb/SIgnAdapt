# SignAdapt Machine Learning

This directory is intended for SignAdapt's machine-learning code, data preparation, training, evaluation, and inference utilities.

SignAdapt is ISL-first. Model choices and claims must be based on suitable data and measured results; support for ASL or other sign languages is a future extension unless separately implemented and evaluated.

## Responsibilities

The ML workflow may include:

- Dataset inspection and validation
- Video, image, audio, text, or landmark preprocessing as required by the selected task
- Baseline implementation
- Model training and experiment configuration
- Evaluation and error analysis
- Inference interfaces for integration with the FastAPI backend

Keep application routes in `backend/` and UI code in `frontend/`. Keep generated checkpoints and evaluation outputs in `artifacts/` when appropriate.

## Suggested organization

Adapt this structure to the actual codebase rather than creating unused folders:

```text
ml/
├── README.md
├── configs/
├── scripts/
├── src/
│   ├── data/
│   ├── models/
│   ├── training/
│   └── evaluation/
└── tests/
```

## Environment and dependencies

ML dependencies should be managed separately from the backend's lightweight API dependencies where possible. Create an ML-specific requirements file or environment when the selected framework and model are known. Avoid installing large GPU frameworks in the API environment unless the architecture requires it.

Before selecting CUDA/PyTorch packages, verify compatibility among the Python version, PyTorch build, NVIDIA driver, and available GPU memory. Start with a small reproducible baseline before scaling up.

## Recommended experiment workflow

1. **Define the task.** Specify whether the experiment is isolated-sign classification, continuous-sign recognition, sign-to-text translation, landmark-based recognition, or another task.
2. **Inspect the dataset.** Verify labels, language, licensing, class distribution, sample quality, and signer overlap.
3. **Create a baseline.** Establish a simple reference model or non-neural baseline before testing more complex approaches.
4. **Split data carefully.** Prevent leakage across train, validation, and test sets. Document whether splits are signer-independent.
5. **Train reproducibly.** Record random seeds, data version, preprocessing, model configuration, hyperparameters, environment, and checkpoint identifier.
6. **Evaluate.** Use metrics appropriate to the task and report results on held-out data.
7. **Analyze errors.** Inspect confusion patterns, class imbalance, signer variation, lighting, camera angle, occlusion, and other relevant failure cases.
8. **Integrate only supported behavior.** Define a stable inference interface and test latency, memory use, and error handling before connecting the model to the backend.

## Evaluation

Choose metrics according to the task:

- Classification: accuracy, precision, recall, F1-score, and a confusion matrix
- Sequence recognition or transcription: suitable sequence metrics such as word error rate (WER) or character error rate (CER), where applicable
- Runtime: latency, throughput, and resource consumption
- Coverage: supported labels, vocabulary, signers, conditions, and known unsupported inputs

Report the dataset and split alongside each metric. Do not compare numbers from incompatible datasets or evaluation protocols as if they were directly equivalent. Clearly label mock UI values and targets; never present them as experimental findings.

## ISL and sign-generation cautions

- ASL and ISL are distinct languages; dataset transfer requires explicit justification and evaluation.
- Word-by-word mapping from English to signs does not necessarily produce grammatical ISL.
- Sign recognition, sign-to-text translation, and avatar-based sign presentation are separate tasks with different data and evaluation requirements.
- Do not claim avatar output is available until a suitable representation, animation/content pipeline, and tested interface exist.
- Human evaluation may be needed to assess linguistic correctness and usefulness beyond automatic metrics.

## Data and artifact handling

Follow `../data/README.md` for dataset documentation and privacy practices. Store generated checkpoints and reports in `../artifacts/` when appropriate. Avoid committing large files or any data that cannot legally be redistributed.

## Current status

This README describes the intended workflow. It does not assert that a specific dataset, model architecture, trained checkpoint, benchmark score, or inference endpoint has already been completed.

