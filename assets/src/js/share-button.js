document.addEventListener("DOMContentLoaded", () => {
	const shareButtons = document.querySelectorAll(".share-button");
	const shareOptionsList = document.querySelectorAll(".share-options");
	const copyLinkButtons = document.querySelectorAll(".copy-link");
	const copyFeedbackElements = document.querySelectorAll(".copy-feedback");

	// Loop through each share button container 
	shareButtons.forEach((shareButton, index) => {
		const shareOptions = shareOptionsList[index];
		const copyLinkButton = copyLinkButtons[index];
		const copyFeedback = copyFeedbackElements[index];
		const shareLinks = shareOptions.querySelectorAll(".share-option");

		// Toggle dropdown visibility
		shareButton.addEventListener("click", () => {
			const isExpanded = shareButton.getAttribute("aria-expanded") === "true";
			shareButton.setAttribute("aria-expanded", !isExpanded);
			shareOptions.hidden = isExpanded;

			if (!isExpanded) {
				shareButton.focus();
			}
		});

		// Close dropdown when clicking outside
		document.addEventListener("click", (event) => {
			if (!shareButton.contains(event.target) && !shareOptions.contains(event.target)) {
				closeShareMenu();
			}
		});

		// Handle keyboard navigation within the dropdown
		shareButton.addEventListener("keydown", (event) => {
			if (event.key === "ArrowDown") {
				event.preventDefault();
				shareLinks[0].focus();
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
					shareButton.focus();
				}
			});
		});

		// Handle Copy Link functionality
		if (copyLinkButton) {
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
		}

		// Function to close the share menu
		function closeShareMenu() {
			shareButton.setAttribute("aria-expanded", "false");
			shareOptions.hidden = true;
		}
	});
});
