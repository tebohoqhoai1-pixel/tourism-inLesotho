// Shared JavaScript for the Maletsunyane Falls student website
document.addEventListener("DOMContentLoaded", function () {
  // Update the copyright year automatically.
  document.querySelectorAll(".current-year").forEach(function (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  });

  // Gallery: open a Bootstrap modal and move between pictures.
  const galleryButtons = Array.from(document.querySelectorAll(".gallery-button"));
  const modalElement = document.getElementById("imageModal");

  if (galleryButtons.length > 0 && modalElement && window.bootstrap) {
    const imageModal = new bootstrap.Modal(modalElement);
    const modalImage = document.getElementById("modalImage");
    const modalCaption = document.getElementById("modalCaption");
    const modalTitle = document.getElementById("imageModalLabel");
    let activeImageIndex = 0;

    function showImage(index) {
      activeImageIndex = (index + galleryButtons.length) % galleryButtons.length;
      const selectedButton = galleryButtons[activeImageIndex];
      modalImage.src = selectedButton.dataset.image;
      modalImage.alt = selectedButton.querySelector("img").alt;
      modalCaption.textContent = selectedButton.dataset.caption;
      modalTitle.textContent = "Photo " + (activeImageIndex + 1) + " of " + galleryButtons.length;
    }

    galleryButtons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        showImage(index);
        imageModal.show();
      });
    });

    document.getElementById("previousImage").addEventListener("click", function () {
      showImage(activeImageIndex - 1);
    });
    document.getElementById("nextImage").addEventListener("click", function () {
      showImage(activeImageIndex + 1);
    });
  }

  // Contact form: browser-side validation only. No message is sent or stored.
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const visitDate = document.getElementById("visitDate");
    if (visitDate) {
      const today = new Date();
      const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
        .toISOString().split("T")[0];
      visitDate.min = localToday;
    }

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const messageBox = document.getElementById("formMessage");
      contactForm.classList.add("was-validated");

      if (!contactForm.checkValidity()) {
        messageBox.className = "mt-3 alert alert-danger";
        messageBox.textContent = "Please check the highlighted fields and try again.";
        return;
      }

      messageBox.className = "mt-3 alert alert-success";
      messageBox.textContent = "Thank you, " + document.getElementById("fullName").value.trim() +
        ". The form is valid. This demonstration does not send your enquiry.";
      contactForm.reset();
      contactForm.classList.remove("was-validated");
      if (visitDate) visitDate.min = new Date().toISOString().split("T")[0];
    });

    contactForm.addEventListener("reset", function () {
      const messageBox = document.getElementById("formMessage");
      if (messageBox) {
        messageBox.textContent = "";
        messageBox.className = "mt-3";
      }
      contactForm.classList.remove("was-validated");
    });
  }
});
