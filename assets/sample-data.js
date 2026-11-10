window.SSGNET_SAMPLE = {
  "id": "p232_030",
  "duration": 3.8489375,
  "sampleRate": 16000,
  "display": {
    "nFft": 512,
    "hop": 128,
    "dbRange": [
      -80,
      0
    ],
    "sharedReference": 0.24072781205177307,
    "maximumFrequencyKHz": 8
  },
  "methods": [
    {
      "id": "noisy",
      "label": "Noisy",
      "variant": "reference",
      "family": "",
      "note": "Input mixture",
      "audio": "audio/p232_030_noisy.flac",
      "spectrogram": "assets/spectrogram-noisy.png",
      "duration": 3.8489375,
      "sampleRate": 16000,
      "sha256": "36fd45062c24d1763921f60c9dc969a3c7a2bab9e249ba30b65b56e3f27d73c7"
    },
    {
      "id": "clean",
      "label": "Clean",
      "variant": "reference",
      "family": "",
      "note": "Reference speech",
      "audio": "audio/p232_030_clean.flac",
      "spectrogram": "assets/spectrogram-clean.png",
      "duration": 3.8489375,
      "sampleRate": 16000,
      "sha256": "14c7ccdd7c5bc54f6f2a45ad252424752a0e1c8dfa57d78a65d782016719d04b"
    },
    {
      "id": "rnnoise",
      "label": "RNNoise",
      "variant": "baseline",
      "family": "",
      "note": "Baseline",
      "audio": "audio/p232_030_RNNoise.flac",
      "spectrogram": "assets/spectrogram-rnnoise.png",
      "duration": 3.83,
      "sampleRate": 16000,
      "sha256": "e0f11ec8680787e57f5fe1cf9126f9b7f17d4afd07fa64ffb3cc4a2b44e77c09"
    },
    {
      "id": "convtasnet",
      "label": "Conv-TasNet",
      "variant": "baseline",
      "family": "",
      "note": "Baseline",
      "audio": "audio/p232_030_Conv-TasNet.flac",
      "spectrogram": "assets/spectrogram-convtasnet.png",
      "duration": 3.8489375,
      "sampleRate": 16000,
      "sha256": "76d443f0b2e1591458e7cf801617923d68d2ebfc7d5dc8f724f1dc36d84bbe01"
    },
    {
      "id": "gtcrn",
      "label": "GTCRN",
      "variant": "baseline",
      "family": "",
      "note": "Baseline",
      "audio": "audio/p232_030_GTCRN.flac",
      "spectrogram": "assets/spectrogram-gtcrn.png",
      "duration": 3.8489375,
      "sampleRate": 16000,
      "sha256": "c22d837da8b8357de2c0abbfe40a06599dc00e0045c49afbcbe02e4a81905a0b"
    },
    {
      "id": "gru-single",
      "label": "Single-Branch GRU",
      "variant": "single",
      "family": "GRU",
      "note": "Without spectral gating",
      "audio": "audio/p232_030_SSGNet-GRU-single.flac",
      "spectrogram": "assets/spectrogram-gru-single.png",
      "duration": 3.8489375,
      "sampleRate": 16000,
      "sha256": "1fef1c15e9c5b33ebbfda772531a0c9116c39eef038640174e1685b012cbfa25"
    },
    {
      "id": "tcn-single",
      "label": "Single-Branch TCN",
      "variant": "single",
      "family": "TCN",
      "note": "Without spectral gating",
      "audio": "audio/p232_030_SSGNet-TCN-single.flac",
      "spectrogram": "assets/spectrogram-tcn-single.png",
      "duration": 3.8489375,
      "sampleRate": 16000,
      "sha256": "3d496e57580f0c8c11bf1221573217f9ad988a481a6fe1a711ecdb55b3ede3ea"
    },
    {
      "id": "ssm-single",
      "label": "Single-Branch SSM",
      "variant": "single",
      "family": "SSM",
      "note": "Without spectral gating",
      "audio": "audio/p232_030_SSGNet-SSM-single.flac",
      "spectrogram": "assets/spectrogram-ssm-single.png",
      "duration": 3.8489375,
      "sampleRate": 16000,
      "sha256": "f02156c994606fd0a594b9cd42ec0b30286f7883902fa4673e14d004f713fd44"
    },
    {
      "id": "gru-ssg",
      "label": "SSGNet-GRU",
      "variant": "ssg",
      "family": "GRU",
      "note": "Slow spectral gating \u00b7 W = 64",
      "audio": "audio/p232_030_SSGNet-GRU64.flac",
      "spectrogram": "assets/spectrogram-gru-ssg.png",
      "duration": 3.8489375,
      "sampleRate": 16000,
      "sha256": "9467d1dfec4ed5bf7f6e06bb4a01cbd5ed83d012cb8a0f1e7c91c5746a564980"
    },
    {
      "id": "tcn-ssg",
      "label": "SSGNet-TCN",
      "variant": "ssg",
      "family": "TCN",
      "note": "Slow spectral gating \u00b7 W = 64",
      "audio": "audio/p232_030_SSGNet-TCN-64.flac",
      "spectrogram": "assets/spectrogram-tcn-ssg.png",
      "duration": 3.8489375,
      "sampleRate": 16000,
      "sha256": "b2eac3296bc2016d9f2f2bf3c2195b9a84f0ee8f8e7c8618fc1437d6c8847b97"
    },
    {
      "id": "ssm-ssg",
      "label": "SSGNet-SSM",
      "variant": "ssg",
      "family": "SSM",
      "note": "Slow spectral gating \u00b7 W = 64",
      "audio": "audio/p232_030_SSGNet-SSM-64.flac",
      "spectrogram": "assets/spectrogram-ssm-ssg.png",
      "duration": 3.8489375,
      "sampleRate": 16000,
      "sha256": "bbed4ff1aeb5193dfde3ef3fd0daf9fdf44ca22717ab2db0876860c3f476e19e"
    }
  ]
};
