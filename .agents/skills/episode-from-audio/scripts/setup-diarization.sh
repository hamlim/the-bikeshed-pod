#!/usr/bin/env bash
# Download the ONNX models that sherpa-onnx-node needs for speaker diarization.
# These are converted/repackaged by the sherpa-onnx project from pyannote and
# 3D-Speaker — no HuggingFace token required.
#
# Default install location: ~/.cache/bikeshed-diarization
# Override with: MODELS_DIR=/some/path ./setup-diarization.sh

set -euo pipefail

MODELS_DIR="${MODELS_DIR:-$HOME/.cache/bikeshed-diarization}"
mkdir -p "$MODELS_DIR"
cd "$MODELS_DIR"

SEG_DIR="pyannote-segmentation-3.0"
SEG_TARBALL="sherpa-onnx-pyannote-segmentation-3-0.tar.bz2"
SEG_URL="https://github.com/k2-fsa/sherpa-onnx/releases/download/speaker-segmentation-models/${SEG_TARBALL}"

EMBED_FILE="3dspeaker_speech_eres2net_base_sv_zh-cn_3dspeaker_16k.onnx"
EMBED_URL="https://github.com/k2-fsa/sherpa-onnx/releases/download/speaker-recongition-models/${EMBED_FILE}"

echo "Models dir: $MODELS_DIR"

if [ ! -f "${SEG_DIR}/model.onnx" ]; then
  echo "Downloading pyannote segmentation model..."
  curl -fL -o "${SEG_TARBALL}" "${SEG_URL}"
  tar -xjf "${SEG_TARBALL}"
  rm -f "${SEG_TARBALL}"
  # The extracted folder is named sherpa-onnx-pyannote-segmentation-3-0 — rename it.
  if [ -d "sherpa-onnx-pyannote-segmentation-3-0" ]; then
    rm -rf "${SEG_DIR}"
    mv "sherpa-onnx-pyannote-segmentation-3-0" "${SEG_DIR}"
  fi
else
  echo "Segmentation model already present."
fi

if [ ! -f "${EMBED_FILE}" ]; then
  echo "Downloading speaker embedding model..."
  curl -fL -o "${EMBED_FILE}" "${EMBED_URL}"
else
  echo "Embedding model already present."
fi

echo
echo "Done. Models installed under: $MODELS_DIR"
echo "  - ${SEG_DIR}/model.onnx"
echo "  - ${EMBED_FILE}"
