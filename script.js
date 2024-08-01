document.addEventListener('DOMContentLoaded', function() {
    const addExpenseButton = document.getElementById('addExpense');
    const expenseTable = document.getElementById('expenseTable');
    const totalAmount = document.getElementById('totalAmount');
    const filterCategory = document.getElementById('filterCategory');

    let expenses = [];

    function updateTotal() {
        const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        totalAmount.textContent = `$${total.toFixed(2)}`;
    }

    function renderTable() {
        expenseTable.innerHTML = '';
        const filteredExpenses = filterCategory.value === 'All' 
            ? expenses 
            : expenses.filter(expense => expense.category === filterCategory.value);

        filteredExpenses.forEach((expense, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>$${parseFloat(expense.amount).toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editExpense(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button>
                </td>
            `;

            expenseTable.appendChild(row);
        });

        updateTotal();
    }

    addExpenseButton.addEventListener('click', () => {
        const name = document.getElementById('expenseName').value;
        const amount = document.getElementById('amount').value;
        const category = document.getElementById('category').value;
        const date = document.getElementById('date').value;

        if(name && amount && category && date) {
            expenses.push({ name, amount, category, date });
            renderTable();
            clearForm();
        }
    });

    filterCategory.addEventListener('change', renderTable);

    window.editExpense = (index) => {
        const expense = expenses[index];
        document.getElementById('expenseName').value = expense.name;
        document.getElementById('amount').value = expense.amount;
        document.getElementById('category').value = expense.category;
        document.getElementById('date').value = expense.date;

        expenses.splice(index, 1);
        renderTable();
    };

    window.deleteExpense = (index) => {
        expenses.splice(index, 1);
        renderTable();
    };

    function clearForm() {
        document.getElementById('expenseName').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('category').value = '';
        document.getElementById('date').value = '';
    }
});
