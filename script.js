const billAmount = document.getElementById('billAmount');
const tipButtons = document.querySelectorAll('.tip-btn');
const customInput = document.querySelector('.custom-input');
const numPeopleInput = document.getElementById('numPeople');
const tipPerPersonDisplay = document.getElementById('tipPerPerson');
const totalPerPersonDisplay = document.getElementById('totalPerPerson');
const resetButton = document.querySelector('.reset-btn');

//creating a variable to store the selected tip percentage
let selectedTip = 15;

function calculateTip(){
    //get bill from input and convert it to a number 
    const bill = parseFloat(billAmount.value) || 0;
    const people = parseInt(numPeopleInput.value) || 1;
    const tipPercent = selectedTip;

    //calculate the total tip amount
    const tipAmount = (bill * tipPercent) / 100;

    //calculate the total bill (original + tip)
    const total = bill + tipAmount;

    //tip per person
    const tipPerPersonAmount = tipAmount / people;

    //total per person
    const totalPerPersonAmount = total / people;

   
    //update the display
    tipPerPersonDisplay.textContent = `$${tipPerPersonAmount.toFixed(2)}`;

    totalPerPersonDisplay.textContent = `$${totalPerPersonAmount.toFixed(2)}`;
}

// event listeners to tip buttons
// loop through each tip button

tipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        //remove active class from buttons
        tipButtons.forEach(b => b.classList.remove('active'));

        
        //add active to the clicked button
        btn.classList.add('active');

        //get tip percentage
        selectedTip = parseInt(btn.dataset.tip);

        //clear custom tip input
        customInput.value = '';

        //recalculate everything with the new tip
        calculateTip();
    });
});

//add event listeners to bill and people input
billAmount.addEventListener('input', calculateTip);
numPeopleInput.addEventListener('input', calculateTip);

customInput.addEventListener('input', () => {
    //remove active from all buttons
    tipButtons.forEach(b => b.classList.remove('active'));
    
    //get custom tip value
    selectedTip = parseFloat(customInput.value) || 0;
    
    //recalculate
    calculateTip();
});

//add event listeners to reset button 
// also clear everything
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

//calculate with the default value
calculateTip();