//All comments in this file are painstakingly hand written by me so don't assume this is AI generated code  


//Variables to store
let allTransactions = []
let allExpenses = 0
let allIncome = 0

//Elements Access
const incomeElement = document.getElementById('income')
const expenseElement = document.getElementById('expense')
const balanceElement = document.getElementById('balance')

const transactionParent = document.getElementById('transactions')

let currentCategory = 'category-spent'

//Constructor for transaction object
class Transaction {
    constructor(description, ammount, category) {
        this.description = description
        this.ammount = ammount
        this.category = category
    }
}

//Checking if there is no transaction
if (allTransactions.length === 0) {
    transactionParent.innerHTML = `<div id='message'>There is no transaction for now</div>`
    transactionParent.style.justifyContent = 'center'
}

//Set income and expense
incomeElement.innerText = `${allIncome}`
expenseElement.innerText = `${allExpenses}`

//Handles change in category
function setCategory() {
    if (currentCategory == 'category-spent') {
        currentCategory = 'category-recived'
        document.getElementById(currentCategory).style.background = '#e0e4d1 '
        document.getElementById('category-spent').style.background = '#FEFAE0 '

    } else {
        currentCategory = 'category-spent'
        document.getElementById(currentCategory).style.background = '#e0e4d1 '
        document.getElementById('category-recived').style.background = '#FEFAE0 '
    }

}

//Handles new transaction
function addTransaction() {

    //Getting values of new transaction if empty simply return
    const Description = document.getElementById('description-input').value
    const Ammount = Number(document.getElementById('ammount-input').value)
    
    if (!Description || !Ammount) return

    //Creating new transaction object and sacing new transaction values
    const ob = new Transaction(Description, Ammount, currentCategory)
    
    //Checking if ransactions array was empty before or not (if empty then remove message)
    if (allTransactions.length === 0) {
        transactionParent.innerHTML = ``
        transactionParent.style.justifyContent = ''
    }

    //Now add transaction to transactions array
    allTransactions.push(ob)
    
    //Create transaction element
    const transactionElement = document.createElement('div')
    transactionElement.className = 'transaction'
    transactionElement.innerHTML = `<span class="description">${Description}</span>`

    //Checking category of transaction based on which expence or income increased
    if (currentCategory == 'category-recived') {

        transactionElement.style.borderRight = "4px solid green"
        transactionElement.innerHTML += `<span class="ammount">+ $${Ammount}</span>`
        
        //Adding transaction to income 
        allIncome = allIncome + Ammount
        incomeElement.innerText = `${allIncome}`
    
    } else {

        transactionElement.innerHTML += `<span class="ammount">- $${Ammount}</span>`
        
        //Adding transaction to expense
        allExpenses = allExpenses + Ammount
        expenseElement.innerText = `${allExpenses}`
    
    }

    //Finally calculating remaining balance 
    balanceElement.innerText = `${allIncome - allExpenses}`
    transactionParent.append(transactionElement)
}
