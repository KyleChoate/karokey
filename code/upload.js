const popup = document.getElementById("upload_screen");
const openBtn = document.getElementById("begin_upload_button");
const closeBtn = document.getElementById("complete_upload_button");
const videoInput = document.getElementById("video_link_input");
const videoContainer = document.getElementById("video_container");

// Open popup
openBtn.onclick = () => {
  popup.style.display = "flex";
  videoInput.value = ""; // clear input on open
  closeBtn.classList.remove("enabled");
  closeBtn.style.cursor = "not-allowed";
};

// Close popup and embed video
closeBtn.onclick = () => {
  if (!closeBtn.classList.contains("enabled")) return;
  popup.style.display = "none";

  // Extract YouTube video ID from input
  const link = videoInput.value.trim();
  let videoID = null;

  // Check different URL formats
  if (link.includes("youtube.com/watch?v=")) {
    videoID = link.split("v=")[1].split("&")[0];
  } else if (link.includes("youtu.be/")) {
    videoID = link.split("youtu.be/")[1].split("?")[0];
  }

  // Embed video if valid
  if (videoID) {
    videoContainer.innerHTML = `<iframe id="embedded_video" src="https://www.youtube.com/embed/${videoID}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else {
    alert("Invalid YouTube link");
  }
};

// Enable button when input has text
videoInput.oninput = () => {
  if (videoInput.value.trim() !== "") {
    closeBtn.classList.add("enabled");
    closeBtn.style.cursor = "pointer";
  } else {
    closeBtn.classList.remove("enabled");
    closeBtn.style.cursor = "not-allowed";
  }
};

// Close popup by clicking outside
window.onclick = (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
};
