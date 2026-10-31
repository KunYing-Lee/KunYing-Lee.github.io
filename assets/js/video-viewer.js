(() => {
  const dialog = document.createElement("dialog");
  dialog.className = "video-viewer";
  dialog.setAttribute("aria-label", "Video player");
  const close = document.createElement("button");
  close.type = "button";
  close.className = "video-viewer-close";
  close.textContent = "×";
  close.setAttribute("aria-label", "Close video");
  dialog.append(close);
  document.body.append(dialog);
  let trigger;

  const open = (video, button) => {
    trigger = button;
    const player = video.cloneNode(true);
    player.removeAttribute("id");
    player.removeAttribute("tabindex");
    player.removeAttribute("role");
    player.removeAttribute("title");
    player.className = "video-viewer-player";
    player.controls = true;
    player.muted = true;
    player.autoplay = true;
    player.loop = true;
    player.playsInline = true;
    const position = video.currentTime;
    player.addEventListener(
      "loadedmetadata",
      () => {
        player.currentTime = position;
      },
      { once: true }
    );
    dialog.append(player);
    dialog.showModal();
    close.focus();
  };

  const prepare = () => {
    document.querySelectorAll("video:not(.video-viewer-player)").forEach((video) => {
      if (video.dataset.zoomReady) return;
      video.dataset.zoomReady = "true";
      if (!video.controls) {
        video.tabIndex = 0;
        video.setAttribute("role", "button");
        video.setAttribute("aria-haspopup", "dialog");
        video.setAttribute("aria-label", "Enlarge video: " + (video.getAttribute("aria-label") || "playback controls"));
        video.title = "Click to enlarge and seek";
        video.addEventListener("click", () => open(video, video));
        video.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            open(video, video);
          }
        });
      } else {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "video-enlarge";
        button.textContent = "Enlarge video";
        button.setAttribute("aria-haspopup", "dialog");
        button.addEventListener("click", () => open(video, button));
        video.after(button);
      }
    });
  };
  close.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
  });
  dialog.addEventListener("close", () => {
    const player = dialog.querySelector("video");
    player.pause();
    player.remove();
    trigger.focus({ preventScroll: true });
  });
  prepare();
  new MutationObserver(prepare).observe(document.body, { childList: true, subtree: true });
})();
