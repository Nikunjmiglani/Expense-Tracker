console.log("lets write some javascript")

document.addEventListener("DOMContentLoaded", ()=>{  //here domcontentloaded means when html is loaded here
    const expenseform = document.getElementById("expense-form")
    const expenselist = document.getElementById("expense-list") 
    const totalamount = document.getElementById("total-amount")
    let expenses = []

    expenseform.addEventListener("submit", (e)=>{
        e.preventDefault()
        
    

    const name = document.getElementById("expense-name").value
    const amount = parseFloat(document.getElementById("expense-amount").value)
    const category = document.getElementById("expense-category").value
    const date = document.getElementById("expense-date").value

    const expense = {
        id: Date.now(),
        name,
        amount,
        category,
        date

    }

    

    expenses.push(expense);
    displayexpenses(expenses);
    updatetotalamount();
    expenseform.reset()



})
expenselist.addEventListener("click", (e)=>{
    if(e.target.classList.contains("delete-btn")){
        const id = parseInt(e.target.dataset.id)
        expenses = expenses.filter(expense => expense.id !== id)
        displayexpenses(expenses)
        updatetotalamount()
    }
    if(e.target.classList.contains("edit-btn")){
        const id = parseInt(e.target.dataset.id)
        const expense = expenses.find(expense=> expense.id === id)

       document.getElementById("expense-name").value = expense.name
       document.getElementById("expense-amount").value = expense.amount
       document.getElementById("expense-category").value = expense.category
       document.getElementById("expense-date").value = expense.date

       expenses = expenses.filter(expense=>expense.id !== id)
       displayexpenses(expenses)
       updatetotalamount()
    }

})

function displayexpenses(expenses){
    expenselist.innerHTML = ""
    expenses.forEach(expense => {
        const row = document.createElement("tr")
         
        row.innerHTML =               ` <td>${expense.name}</td>
        <td>$${expense.amount.toFixed(0)}</td>
        <td>${expense.category}</td>
        <td>${expense.date}</td>
        <td>
            <button class="edit-btn" data-id="${expense.id}">Edit</button>
            <button class="delete-btn" data-id="${expense.id}">Delete</button>
        </td>`
        expenselist.appendChild(row)

    });

}
function updatetotalamount(){
    const total = expenses.reduce((sum, expense)=> sum + expense.amount, 0)
    totalamount.textcontent = total.toFixed(0)
}



})
