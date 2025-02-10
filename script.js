document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggle-btn");
    const expandBtn = document.getElementById("expand-btn");
    const sidebar = document.getElementById("sidebar");
    const collapsedSidebar = document.getElementById("collapsed-sidebar");
    const content = document.querySelector(".content");

    // Function to update content margin based on sidebar state
    function updateContentMargin() {
        if (sidebar.classList.contains("collapsed")) {
            content.style.marginLeft = "80px"; // Adjusted for collapsed sidebar
        } else {
            content.style.marginLeft = "250px"; // Default full sidebar width
        }
    }

    // Initialize content margin on page load
    updateContentMargin();

    // Toggle Sidebar Collapse/Expand
    toggleBtn.addEventListener("click", () => {
        sidebar.classList.add("collapsed");
        collapsedSidebar.classList.add("visible");
        updateContentMargin();
    });

    expandBtn.addEventListener("click", () => {
        sidebar.classList.remove("collapsed");
        collapsedSidebar.classList.remove("visible");
        updateContentMargin();
    });

    // Expense data for Pie Chart
    const userExpenses = JSON.parse(localStorage.getItem("userExpenses")) || {};
    const labels = Object.keys(userExpenses);
    const dataValues = Object.values(userExpenses);

    const expenseData = {
        labels: labels,
        datasets: [{
            label: "Expense Breakdown",
            data: dataValues, // Expense values
            backgroundColor: [
                "rgba(54, 162, 235, 0.6)",  // Blue
                "rgba(255, 99, 132, 0.6)",  // Red
                "rgba(255, 159, 64, 0.6)",  // Orange
                "rgba(75, 192, 192, 0.6)",   // Green
                "rgba(153, 102, 255, 0.6)",  // Purple
                "rgba(255, 205, 86, 0.6)"    // Yellow
            ].slice(0, labels.length),
            borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 205, 86, 1)"
            ].slice(0, labels.length),
            borderWidth: 1
        }]
    };

    // Ensure Chart.js is properly initialized
    const chartCanvas = document.getElementById("expensesChart");
    if (chartCanvas) {
        const ctx = chartCanvas.getContext("2d");
        new Chart(ctx, {
            type: "pie",
            data: expenseData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                let label = expenseData.labels[tooltipItem.dataIndex] || "";
                                if (label) {
                                    label += ": $" + expenseData.datasets[0].data[tooltipItem.dataIndex];
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    } else {
        console.error("Chart canvas element not found");
    }
});
