(() => {
  "use strict";
  const sample = window.SSGNET_SAMPLE;
  if (!sample) return;
  const methods = new Map(sample.methods.map(method => [method.id, method]));
  const status = document.getElementById("playback-status");
  const positionOption = document.getElementById("keep-position");
  let activeAudio = null;
  let lastPosition = 0;

  function updatePlayhead(time) {
    const percent = Math.min(100, Math.max(0, time / sample.duration * 100));
    document.querySelectorAll(".playhead").forEach(head => {
      head.style.left = `${percent}%`;
      head.classList.toggle("visible", time > 0);
    });
  }

  function highlightMethod(id) {
    document.querySelectorAll(".sample-row").forEach(row => {
      row.classList.toggle("selected", row.dataset.method === id);
    });
  }

  function connectAudio(audio) {
    audio.addEventListener("play", () => {
      const previous = activeAudio;
      const previousTime = previous ? previous.currentTime : lastPosition;
      document.querySelectorAll("audio").forEach(other => {
        if (other !== audio) other.pause();
      });
      if (previous !== audio && positionOption.checked && previousTime > 0) {
        const seek = () => {
          const desired = previousTime < audio.duration - 0.08 ? previousTime : 0;
          if (Number.isFinite(desired)) audio.currentTime = desired;
        };
        if (audio.readyState >= 1) seek();
        else audio.addEventListener("loadedmetadata", seek, { once: true });
      }
      activeAudio = audio;
      highlightMethod(audio.dataset.method);
      status.textContent = `Playing ${methods.get(audio.dataset.method).label}`;
    });
    audio.addEventListener("timeupdate", () => {
      if (activeAudio === audio) {
        lastPosition = audio.currentTime;
        updatePlayhead(lastPosition);
      }
    });
    audio.addEventListener("pause", () => {
      if (activeAudio === audio && !audio.ended) {
        status.textContent = `Paused · ${methods.get(audio.dataset.method).label}`;
      }
    });
    audio.addEventListener("ended", () => {
      if (activeAudio === audio) {
        lastPosition = 0;
        status.textContent = "Playback finished";
      }
    });
    audio.addEventListener("error", () => {
      status.textContent = "Audio could not be played. Use the FLAC download link.";
    });
  }

  function makeSpectrogram(method) {
    const figure = document.createElement("figure");
    figure.className = "row-spectrogram";
    figure.setAttribute("aria-label", `${method.label} spectrogram`);
    const frame = document.createElement("div");
    frame.className = "spectrogram-frame";
    const frequencies = document.createElement("div");
    frequencies.className = "frequency-ticks";
    frequencies.setAttribute("aria-hidden", "true");
    for (const value of ["8", "4", "0"]) {
      const tick = document.createElement("span");
      tick.textContent = value;
      frequencies.append(tick);
    }
    const link = document.createElement("a");
    link.className = "spectrogram-link";
    link.href = method.spectrogram;
    link.target = "_blank";
    link.rel = "noopener";
    link.setAttribute("aria-label", `Open ${method.label} spectrogram at full size`);
    const image = document.createElement("img");
    image.src = method.spectrogram;
    image.alt = `Spectrogram of ${method.label} speech`;
    image.loading = "lazy";
    image.width = 483;
    image.height = 257;
    link.append(image);
    const playhead = document.createElement("span");
    playhead.className = "playhead";
    playhead.setAttribute("aria-hidden", "true");
    frame.append(frequencies, link, playhead);
    const axis = document.createElement("div");
    axis.className = "time-axis";
    axis.setAttribute("aria-label", "Time in seconds");
    const times = [0, ...Array.from({ length: Math.floor(sample.duration) }, (_, i) => i+1), sample.duration];
    times.forEach((time, index) => {
      const tick = document.createElement("span");
      tick.style.left = `${time/sample.duration*100}%`;
      tick.textContent = index === times.length-1 ? `${time.toFixed(2)} s` : String(time);
      if (index === times.length-1) tick.className = "last-tick";
      axis.append(tick);
    });
    figure.append(frame, axis);
    return figure;
  }

  function makeRow(method) {
    const row = document.createElement("div");
    row.className = `sample-row variant-${method.variant}`;
    row.dataset.method = method.id;
    row.dataset.family = method.family;
    const label = document.createElement("div");
    label.className = "method-label";
    const name = document.createElement("h4");
    name.className = "method-name";
    name.textContent = method.label;
    const note = document.createElement("small");
    note.textContent = method.note;
    label.append(name, note);
    const cell = document.createElement("div");
    cell.className = "audio-cell";
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.preload = "metadata";
    audio.dataset.method = method.id;
    audio.setAttribute("aria-label", `Play ${method.label}`);
    const source = document.createElement("source");
    source.src = method.audio;
    source.type = "audio/flac";
    audio.append(source);
    const download = document.createElement("a");
    download.className = "download-link";
    download.href = method.audio;
    download.download = "";
    download.textContent = "Download FLAC ↓";
    download.setAttribute("aria-label", `Download ${method.label} FLAC`);
    cell.append(audio, download);
    row.append(label, cell, makeSpectrogram(method));
    connectAudio(audio);
    return row;
  }

  const groups = [
    ["reference-rows", ["noisy", "clean"]],
    ["baseline-rows", ["rnnoise", "convtasnet", "gtcrn"]],
    ["gru-rows", ["gru-single", "gru-ssg"]],
    ["tcn-rows", ["tcn-single", "tcn-ssg"]],
    ["ssm-rows", ["ssm-single", "ssm-ssg"]],
  ];
  for (const [container, ids] of groups) {
    document.getElementById(container).replaceChildren(...ids.map(id => makeRow(methods.get(id))));
  }
  document.getElementById("reset-playback").addEventListener("click", () => {
    document.querySelectorAll("audio").forEach(audio => {
      audio.pause();
      if (audio.readyState >= 1) audio.currentTime = 0;
    });
    activeAudio = null;
    lastPosition = 0;
    highlightMethod(null);
    updatePlayhead(0);
    status.textContent = "Playback reset";
  });
})();
