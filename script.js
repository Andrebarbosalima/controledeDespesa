
 const transactiosUl = document.querySelector('#transactions');
 const incomeDisplay = document.querySelector('#money-plus');
 const expenseDisplay = document.querySelector('#money-minus');
  const balanceDisplay = document.querySelector('#balance');
 const form = document.querySelector('#form');
 const inputTransactionName = document.querySelector('#text');
 const inputTransactionAmount = document.querySelector('#amount');

  const localStorageTransactions = JSON.parse(localStorage
   .getItem('transactions'))
  let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []

 const removeTransaction = ID => {
  transactions = transactions.filter(transaction => transaction.id !== ID)
  updateLocalStorage()
  init();
}

 const addTransactionIntDom = transaction =>{
 const operator = transaction.amount < 0 ? '-': '+';
 const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
 const amontWithoutOperator = Math.abs(transaction.amount);
 const li = document.createElement('li');
 li.classList.add(CSSClass);
 li.innerHTML = ` ${transaction.name} <span>${operator} R$ ${amontWithoutOperator}</span>
<button class="delete-btn" onclick="removeTransaction(${transaction.id})">
 x
 </button>
  `
  transactiosUl.append(li);
 }

 const updateBalaceValues = () => {
 const transactionsAmounts = transactions.map(transaction => transaction.amount);
 const total = transactionsAmounts.reduce((acumulador, transaction) => acumulador + transaction, 0)
 .toFixed(2)
 const income = transactionsAmounts
 .filter(value => value > 0)
 .reduce((accumulator, value)=> accumulator + value , 0)
  .toFixed(2)
  const expense = transactionsAmounts
  .filter(value=> value < 0)
  .reduce((accumulator, value) => accumulator + value, 0)
  .toFixed(2)

  balanceDisplay.textContent = `R$ ${total}`;
  incomeDisplay.textContent = `R$ ${income}`;
  expenseDisplay.textContent = `R$ ${expense}`;
 }

 
 const init = () => {
 transactiosUl.innerHTML = ''
 transactions.forEach(addTransactionIntDom)
  updateBalaceValues()
 }

 init()

 const updateLocalStorage= () =>{

 localStorage.setItem('transactions', JSON.stringify(transactions))
 }
 const generateID = () => Math.round(Math.random() * 1000)

 form.addEventListener('submit', event =>{
     event.preventDefault()
   const transactionName = inputTransactionName.value.trim();
   const transactionAmount = inputTransactionAmount.value.trim()
  
   if(transactionName === '' || transactionAmount === '' ){
      alert('Por favor, Preencha o nome e o valor da transação');
      return
}
  const transaction = {
   id:generateID() , 
   name:transactionName, 
   amount:Number(transactionAmount)
  }
   transactions.push(transaction );
   init();
   updateLocalStorage()
   inputTransactionName.value='';
   inputTransactionAmount.value= '';
 });