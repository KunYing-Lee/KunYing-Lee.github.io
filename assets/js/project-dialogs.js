(() => {
  const dialog = document.getElementById("project-dialog");
  if (!dialog) return;

  let trigger;

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-project-dialog]");
    if (!button) return;
    const template = document.getElementById(`project-dialog-template-${button.dataset.projectDialog}`);
    trigger = button;
    dialog.replaceChildren(template.content.cloneNode(true));
    document.body.classList.add("project-dialog-open");
    dialog.showModal();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-project]")) {
      dialog.close();
    } else if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
        dialog.close();
      }
    }
  });

  dialog.addEventListener("close", () => {
    dialog.replaceChildren();
    document.body.classList.remove("project-dialog-open");
    trigger.focus({ preventScroll: true });
  });
})();
