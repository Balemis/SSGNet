# SSGNet online demo

`index.html` is a standalone, responsive audio demo inspired by the MAB-Net
supplementary page. It uses local HTML, CSS, JavaScript, images and FLAC files;
no frontend build or external CDN is required.

## Preview

From this directory:

```bash
python -m http.server 8000
```

Open `http://localhost:8000`. If the project is on a remote machine, forward port
8000 to the local browser. Opening `index.html` directly also works in browsers
that allow local media playback.

The page includes:

- The abstract directly below the paper title, authors and affiliation.
- All 11 entries displayed on one page: noisy, clean, RNNoise, Conv-TasNet,
  GTCRN, and each GRU/TCN/SSM Single-Branch and SSGNet pair.
- A dedicated spectrogram alongside every audio player. Each gated variant
  uses `W=64`, `H=32`. No method selector is needed to see all results.
- One audio stream at a time, optional
  playback-position transfer, a playback reset, and FLAC download links.
- Shared time cursors across every spectrogram, links to full-size previews,
  group navigation, and the model overview.

All samples are `p232_030`. The supplied RNNoise file is 3.83 s; the other files
are 3.8489375 s. Playback always uses the original files. Only the RNNoise
spectrogram preview is padded at the end to share the reference time axis.
All previews use the same Hann window (512 samples), hop (128 samples), and
magnitude range (−80 to 0 dB) with a shared reference. They are visualization
transforms, independent of a model's analysis settings.

Regenerate the previews and sample metadata after changing audio files:

```bash
python manuscript/SSGNet/generate_demo_assets.py
```

Run the command above from the AlphaSNN root with the `speech` environment. It
also renders `Latex_SPL/slow_fast.drawio.pdf` for the model overview. The website
is self-contained after generation. To host it as a static site, copy
`index.html`, `styles.css`, `demo.js`, `assets/` and `audio/` together.

## Generated audio

`audio/` contains the requested `p232_030` example, processed through GTCRN,
three Single-Branch systems, and three SSGNet systems with Slow STFT `W=64`, `H=32`.
The matching noisy input and clean reference are included for listening comparison.
The generated files are mono, 16 kHz, 24-bit FLAC, named
`p232_030_<model>.flac`. The separately supplied RNNoise and Conv-TasNet files
remain in their original 16-bit FLAC format.

Run from the AlphaSNN root with the existing `speech` environment:

```bash
CUDA_VISIBLE_DEVICES='' OPENBLAS_NUM_THREADS=2 OMP_NUM_THREADS=2 \
  python manuscript/SSGNet/generate_audio.py
```

`p232_030_audio_manifest.json` records the input, model configurations,
validation-selected checkpoints, checksums, and verified output sample counts.
Inference uses each system's existing `denoise()` interface with strict checkpoint
loading. Outputs receive no individual volume normalization. If PCM export requires
attenuation, the same gain is applied to all nine files and recorded in the manifest.

RNNoise and Conv-TasNet audio files were supplied separately and are used as-is.
