const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggle-sidebar-btn");
const themeToggle = document.getElementById("theme-toggle");

// Toggle Sidebar Collapse
toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");

    if (sidebar.classList.contains("collapsed")) {
        toggleBtn.style.left = "5px"; // Move button when collapsed
    } else {
        toggleBtn.style.left = "245px"; // Move button when expanded
    }
});

// Toggle Theme
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }
});

// Set Username
document.getElementById("user-name").textContent = "John Doe";



// Search Transactions
document.getElementById("search").addEventListener("input", function () {
    let filter = this.value.toLowerCase();
    let rows = document.querySelectorAll("#transactions-table tbody tr");

    rows.forEach(row => {
        let text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
    });
});

// Sort by Date
document.getElementById("sort-date").addEventListener("click", function () {
    let rows = Array.from(document.querySelectorAll("#transactions-table tbody tr"));
    rows.sort((a, b) => new Date(a.cells[0].textContent) - new Date(b.cells[0].textContent));

    let tbody = document.querySelector("#transactions-table tbody");
    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));
});

// Sort by Amount
document.getElementById("sort-amount").addEventListener("click", function () {
    let rows = Array.from(document.querySelectorAll("#transactions-table tbody tr"));
    rows.sort((a, b) => parseFloat(b.cells[3].textContent) - parseFloat(a.cells[3].textContent));

    let tbody = document.querySelector("#transactions-table tbody");
    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));
});




// Handle Form Submission
document.getElementById("add-details-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let date = document.getElementById("date").value;
    let amount = document.getElementById("amount").value;
    let description = document.getElementById("description").value;
    let category = document.getElementById("category").value;

    if (!date || !amount || !description || !category) {
        alert("Please fill in all fields.");
        return;
    }

    // Show success message
    let successMessage = document.getElementById("success-message");
    successMessage.classList.remove("hidden");

    // Reset Form After 2 Seconds
    setTimeout(() => {
        successMessage.classList.add("hidden");
        document.getElementById("add-details-form").reset();
    }, 2000);
});


// AI Financial Advice Chat
document.getElementById("send-btn").addEventListener("click", function () {
    let userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    let chatbox = document.getElementById("chatbox");

    // Add User Message
    let userMessage = document.createElement("div");
    userMessage.classList.add("chat-message", "user-message");
    userMessage.innerHTML = `<strong>You:</strong> ${userInput}`;
    chatbox.appendChild(userMessage);

    // Clear input field
    document.getElementById("user-input").value = "";

    // Add Loading Animation
    let botMessage = document.createElement("div");
    botMessage.classList.add("chat-message", "bot-message");
    botMessage.innerHTML = `<strong>AI:</strong> <span class="loading">...</span>`;
    chatbox.appendChild(botMessage);

    // Scroll to bottom
    chatbox.scrollTop = chatbox.scrollHeight;

    // Simulate AI Response Delay
    setTimeout(() => {
        botMessage.innerHTML = `<strong>AI:</strong> ${getAIResponse(userInput)}`;
        chatbox.scrollTop = chatbox.scrollHeight;
    }, 2000);
});

// Simulated AI Response Function
function getAIResponse(userInput) {
    const responses = [
        "Based on your past trends, consider reducing your entertainment expenses.",
        "Your food expenses are higher than average. Try meal planning to save money.",
        "Investing 20% of your savings can lead to long-term wealth growth.",
        "You spent more than you earned last month. Consider budgeting better."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}




document.addEventListener("DOMContentLoaded", function () {
    // Sample Data for Bar Chart (Earnings vs. Expenses)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const earnings = [500, 700, 800, 650, 900, 1200, 1100, 950, 980, 1020, 1050, 1100];
    const expenses = [300, 400, 500, 350, 600, 700, 800, 750, 720, 740, 760, 800];

    // Bar Chart: Monthly Earnings vs. Expenses
    const barChart = new Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
            labels: months,
            datasets: [
                {
                    label: "Earnings (₹)",
                    data: earnings,
                    backgroundColor: "rgba(0, 123, 255, 0.6)",
                    borderColor: "rgba(0, 123, 255, 1)",
                    borderWidth: 2
                },
                {
                    label: "Expenses (₹)",
                    data: expenses,
                    backgroundColor: "rgba(255, 99, 132, 0.6)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Sample Data for Pie Chart (Expense Categories)
    const categories = ["Rent", "Food", "Entertainment", "Travel", "Shopping", "Misc"];
    const categoryExpenses = [5000, 3000, 1500, 2000, 1000, 500];

    // Pie Chart: Expense Breakdown
    const pieChart = new Chart(document.getElementById("pieChart"), {
        type: "pie",
        data: {
            labels: categories,
            datasets: [
                {
                    data: categoryExpenses,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"]
                }
            ]
        },
        options: {
            responsive: true
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const receiptInput = document.getElementById("receipt-input");
    const receiptPreview = document.getElementById("receipt-preview");
    const receiptList = document.getElementById("receipt-list");

    // Handle File Upload
    receiptInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                displayReceipt(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Capture Receipt from Camera (Mobile Only)
    document.getElementById("capture-receipt").addEventListener("click", function () {
        receiptInput.click();
    });

    // Function to Display Receipt
    function displayReceipt(src) {
        // Preview the uploaded receipt
        receiptPreview.innerHTML = `<img src="${src}" alt="Receipt Image">`;

        // Add to Saved Receipts
        const receiptItem = document.createElement("div");
        receiptItem.classList.add("receipt-item");
        receiptItem.innerHTML = `
            <img src="${src}" alt="Receipt">
            <button onclick="deleteReceipt(this)">🗑️</button>
        `;
        receiptList.appendChild(receiptItem);
    }

    // Delete Receipt
    window.deleteReceipt = function (btn) {
        btn.parentElement.remove();
    };
});



