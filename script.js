// Simple script to demonstrate automated testing
function getCurrentDate() {
    const date = new Date();

    return date.toLocaleDateString("en-GB");
}

function updateFooter() {
    const footer = document.querySelector("footer p");

    if (footer) {
        footer.innerHTML += ` | Last updated: ${getCurrentDate()}`;
    }
}

// Run when page loads
document.addEventListener("DOMContentLoaded", () => {
    updateFooter();
    console.log("Website loaded successfully! ✅");
});

// Export for testing (if using Node.js testing environment)
if (typeof module !== "undefined" && module.exports) {
    module.exports = { getCurrentDate };
}