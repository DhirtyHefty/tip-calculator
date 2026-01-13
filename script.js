const billAmount = document.getElementById('billAmount');
const tipButtons = document.querySelectorAll('.tip-btn');
const customInput = document.querySelector('.custom-input');
const numPeopleInput = document.getElementById('numPeople');
const tipPerPerson = document.getElementById('tipPerPerson');
const totalPerPerson = document.getElementById('totalPerPerson');
const resetButton = document.querySelector('reset-btn')

//creating a varible to store the selected tip percentage
let selectedTip = 15
function calculateTip(){
    //get bill from input and convert it to a number 
    const bill = parseFloat(billAmount.value) || 0;
    const people = parseInt(numPeopleInput.value) || 1;
    const tipPercent = selectedTip;

    //calculate the total tip amount
    const tipAmount = (bill * tipPercent) / 100;

    //calculate the total tip amount
    const total = bill + tipAmount;

    //tip per person
    const tipPerPerson = tipAmount / people;

    //total per person
    const totalPerPerson = total / people;

    //update the display
    tipPerPerson.textContent = `$${tipPerPerson.toFixed(2)};`

    totalPerPerson.textContent = `$${totalPerPerson.toFixed(2)}`;

}

// event listeners to tip buttons
// loop through eash tip button

tipButtons.forEach (btn => {
    btn.addEventListener('click', () =>{
        //remove active class from buttons
        tipButtons.forEach(b => b.classList.remove('active'));

        //add active to the clicked button
        btn.classList('active');

        //get tip percentage
        selectedTip = parseInt(btn.dataset.tip);

        //clear custom tip input
        customInput.value = '';

        //recalculate everything with the new tip
        calculateTip();
    });

    //add event listeners to bill and people input
    billAmount.addEventListener('input', calculateTip);
    numPeopleInput.addEventListener('input', calculateTip);

    //add event listeners to reset button 
    // also clear everthing

    resetButton.addEventListener('click', () => {
        //reset all values
        billAmount.value = '0';
        numPeopleInput.value = '1';
        customInput.value = '';

        //remove active state from all buttons
        tipButtons.forEach(b => b.classList.remove('active'));

        //reset tip to zero
        selectedTip = 0;

        //recalculate
        calculateTip();
    });

    //calculate with the default calue
    calculateTip()
});