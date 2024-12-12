document.addEventListener("DOMContentLoaded", () => {
    const shareButton = document.getElementById("shareButton");
    const shareOptions = document.getElementById("shareOptions");
    const shareLinks = document.querySelectorAll(".share-option");
    const copyLinkButton = document.querySelector(".copy-link");
    const copyFeedback = document.querySelector(".copy-feedback");
  
    // Toggle dropdown visibility
    shareButton.addEventListener("click", () => {
      const isExpanded = shareButton.getAttribute("aria-expanded") === "true";
      shareButton.setAttribute("aria-expanded", !isExpanded);
      shareOptions.hidden = isExpanded;
      if (!isExpanded) {
        shareLinks[0].focus(); // Focus on the first share option when opened
      }
    });
  
    // Close dropdown when clicking outside
    document.addEventListener("click", (event) => {
      if (!shareButton.contains(event.target) && !shareOptions.contains(event.target)) {
        closeShareMenu();
      }
    });
  
    // Handle keyboard navigation
    shareButton.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        shareLinks[0].focus(); // Focus first share option on ArrowDown
      }
    });
  
    shareLinks.forEach((link, index) => {
      link.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          const nextIndex = (index + 1) % shareLinks.length;
          shareLinks[nextIndex].focus();
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          const prevIndex = (index - 1 + shareLinks.length) % shareLinks.length;
          shareLinks[prevIndex].focus();
        } else if (event.key === "Escape") {
          closeShareMenu();
          shareButton.focus(); // Return focus to the button
        }
      });
    });
  
    // Handle Copy Link
    copyLinkButton.addEventListener("click", () => {
      const link = window.location.href; 
      navigator.clipboard.writeText(link)
        .then(() => {
          copyFeedback.hidden = false; 
          setTimeout(() => {
            copyFeedback.hidden = true; 
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy link: ", err);
        });
    });
  
    function closeShareMenu() {
      shareButton.setAttribute("aria-expanded", "false");
      shareOptions.hidden = true;
    }
  });
  