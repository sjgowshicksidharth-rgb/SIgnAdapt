# Model Artifacts

This directory is reserved for generated files produced by SignAdapt's machine-learning workflows.

## What belongs here?

Examples of artifacts that may be stored here once the relevant pipeline exists:

- Trained model checkpoints and weights
- Tokenizers, label maps, and model configuration files
- Exported inference models
- Evaluation reports and experiment outputs
- Small metadata files required to reproduce an experiment

Keep raw datasets in `data/`, training and inference code in `ml/`, and research notes or reports in `docs/`.

## Recommended organization

Adapt this layout to the models and experiments actually used by the project:

```text
artifacts/
├── README.md
├── checkpoints/
├── exports/
├── evaluation/
└── metadata/
```

Do not create empty folders solely to match this example; add them when they are needed.

## Artifact management guidelines

1. **Do not commit large model files by default.** Check repository limits and team storage arrangements first. Consider Git LFS or an approved artifact store if needed.
2. **Do not commit secrets or personal data.** Model files and reports must not contain credentials, private user recordings, or identifiable data without appropriate authorization.
3. **Record provenance.** For each artifact, document the model/version, dataset version, configuration, training date, and evaluation results.
4. **Keep results honest.** Clearly distinguish measured evaluation results from mock values, examples, or planned targets.
5. **Make experiments reproducible.** Link artifacts to the corresponding code and experiment log when available.

## Current status

This directory is a designated location for future/generated outputs. The presence of this README does not imply that trained models or exported inference artifacts are already available.

