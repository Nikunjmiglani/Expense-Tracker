console.log("lets write some javascript");

document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");
    const expenseCategorySelect = document.getElementById("expense-category");
    const newCategoryInput = document.getElementById("new-category");
    const addCategoryBtn = document.getElementById("add-category-btn");
    let expenses = [];

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("expense-name").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);
        const category = expenseCategorySelect.value;
        const date = document.getElementById("expense-date").value;

        const expense = {
            id: Date.now(),
            name,
            amount,
            category,
            date
        };

        expenses.push(expense);
        displayExpenses(expenses);
        updateTotalAmount();
        expenseForm.reset();
    });

    addCategoryBtn.addEventListener("click", () => {
        const newCategory = newCategoryInput.value.trim();
        if (newCategory !== "") {
            const option = document.createElement("option");
            option.value = newCategory;
            option.textContent = newCategory;
            expenseCategorySelect.appendChild(option);
            newCategoryInput.value = "";
        }
    });

    expenseList.addEventListener("click", (e) => {
        const target = e.target;
        const id = parseInt(target.dataset.id);

        if (target.classList.contains("delete-btn")) {
            expenses = expenses.filter(expense => expense.id !== id);
            displayExpenses(expenses);
            updateTotalAmount();
        } else if (target.classList.contains("edit-btn")) {
            const expense = expenses.find(expense => expense.id === id);

            document.getElementById("expense-name").value = expense.name;
            document.getElementById("expense-amount").value = expense.amount;
            document.getElementById("expense-category").value = expense.category;
            document.getElementById("expense-date").value = expense.date;

            expenses = expenses.filter(expense => expense.id !== id);
            displayExpenses(expenses);
            updateTotalAmount();
        }
    });

    function displayExpenses(expenses) {
        expenseList.innerHTML = "";
        expenses.forEach(expense => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${expense.name}</td>
                <td>$${expense.amount.toFixed(0)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="edit-btn" data-id="${expense.id}">Edit</button>
                    <button class="delete-btn" data-id="${expense.id}">Delete</button>
                </td>`;
            expenseList.appendChild(row);
        });
    }

    function updateTotalAmount() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmount.textContent = total.toFixed(0);
    }
});
