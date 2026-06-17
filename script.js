const storyVideo = document.getElementById("storyVideo");

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");

  if (id === "videoModal" && storyVideo) {
    storyVideo.pause();
  }
}

document.getElementById("playBtn").addEventListener("click", async () => {
  openModal("videoModal");

  if (!storyVideo) return;

  try {
    storyVideo.currentTime = 0;
    await storyVideo.play();
  } catch (error) {
    // iOS/Safari may require tapping play inside the video controls.
  }
});

document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.open));
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => closeModal(button.dataset.close));
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(modal.id);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelectorAll(".modal.show").forEach((modal) => closeModal(modal.id));
});
