function loadOptions() {
	let getting = browser.storage.local.get();
	getting.then((options) => {
		// Options loaded
		document.querySelectorAll("input").forEach((i) => {
			// Fill each checkbox with saved value
			if (i.dataset.key in options) {
				i.checked = options[i.dataset.key];
			} else {
				// Fallback to default
				i.checked = (i.dataset.default === "true");
			}

			// Set up handler for updating options
			i.addEventListener("change", (e) => {
				let setting = browser.storage.local.set({ [e.target.dataset.key]: e.target.checked });
				setting.catch((error) => {
					console.log(`Failed to save extension option: ${error}`);
				});
			});
		});
	}, (error) => {
		console.log(`Failed to load extension options: ${error}`);
	});
}

document.addEventListener("DOMContentLoaded", loadOptions);
