
const toggleBtn = document.getElementById("toggle-btn");
const expandBtn = document.getElementById("expand-btn");
const sidebar = document.getElementById("sidebar");
const collapsedSidebar = document.getElementById("collapsed-sidebar");
const content = document.querySelector(".content");

// Initialize content margin based on sidebar state on page load
if (sidebar.classList.contains("collapsed")) {
    content.style.marginLeft = "100px";  // Adjusted for collapsed sidebar
} else {
    content.style.marginLeft = "290px";  // Default full sidebar width
}

toggleBtn.addEventListener("click", () => {
    sidebar.classList.add("collapsed");
    collapsedSidebar.classList.add("visible");
    content.style.marginLeft = "100px";  // Adjusted for collapsed sidebar
});

expandBtn.addEventListener("click", () => {
    sidebar.classList.remove("collapsed");
    collapsedSidebar.classList.remove("visible");
    content.style.marginLeft = "290px";  // Reset to full sidebar width
});





        