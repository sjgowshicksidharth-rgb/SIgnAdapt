# SignAdapt Data

This directory is reserved for datasets and data-preparation resources used in SignAdapt research and development.

Sign-language datasets can have important licensing, consent, privacy, and usage restrictions. Review the terms for each dataset before downloading, processing, sharing, or using it in training.

## Suggested organization

Use a structure that reflects the actual datasets acquired for the project. For example:

```text
data/
├── README.md
├── raw/          # Original datasets; usually not committed to Git
├── processed/    # Prepared data; often reproducible from scripts
├── samples/      # Small, permitted examples for development
└── manifests/    # Dataset sources, versions, labels, and checksums
```

These are suggested directories, not a claim that they already exist.

## Data workflow

1. **Identify the source.** Record the dataset name, publisher, official source, version, and download date.
2. **Verify permissions.** Check the license and any restrictions on research, commercial use, redistribution, or derivative works.
3. **Document the contents.** Record languages/sign languages, modalities, label format, number of examples, and known limitations.
4. **Keep data splits separate.** Use reproducible train/validation/test splits and avoid leakage between splits. Where the same signer appears in multiple samples, consider signer-independent evaluation when appropriate.
5. **Preprocess reproducibly.** Keep scripts and configuration in `ml/` or the relevant code directory rather than relying on undocumented manual edits.
6. **Track changes.** Record dataset versions and checksums where practical.

## Privacy and security

- Do not commit private recordings, personal identifiers, credentials, or data without permission.
- Do not upload participant recordings to third-party services unless the applicable consent, license, and project policy permit it.
- Restrict access to sensitive data and remove unnecessary identifying metadata.
- Follow dataset-specific rules for attribution, citation, retention, and redistribution.

## Sign-language considerations

SignAdapt is ISL-first. Do not assume that an ASL dataset can directly train or evaluate an ISL system. Sign languages differ in vocabulary, grammar, and linguistic structure. Any future ASL or other sign-language extension needs suitable data, adaptation, and separate evaluation.

Record whether a dataset supports isolated-sign recognition, continuous sign recognition, fingerspelling, sign-to-text translation, pose/landmark modeling, or another task. These tasks are not interchangeable.

## Dataset inventory

Maintain an inventory for each dataset with fields such as:

| Field | What to record |
|---|---|
| Name and source | Official dataset name and source page |
| Version and date | Release/version and acquisition date |
| License | Exact license and relevant restrictions |
| Sign language | ISL, ASL, or another language |
| Modality | Video, image, landmarks, text, audio, or combinations |
| Task and labels | Intended task and label schema |
| Split strategy | Train/validation/test and signer overlap policy |
| Preprocessing | Steps and script/configuration used |
| Citation | Required academic citation or attribution |

## Current status

No particular dataset, license, or dataset size is asserted by this README. Update the inventory only after checking the actual source and contents.

