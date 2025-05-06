document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("useStremioApp");
  const saveButton = document.getElementById("save");

  // Load current preference
  browser.storage.local.get("useStremioApp", (result) => {
    checkbox.checked = result.useStremioApp || false;
  });

  // Save preference on button click
  saveButton.addEventListener("click", () => {
    const useApp = checkbox.checked;
    browser.storage.local.set({ useStremioApp: useApp }, () => {
      alert("Preferences saved!");
    });
  });
});