const billAmount = document.getElementById('billAmount');
const tipButtons = document.querySelectorAll('.tip-btn');
const customInput = document.querySelector('.custom-input');
const numPeopleInput = document.getElementById('numPeople');
const tipPerPersonDisplay = document.getElementById('tipPerPerson');
const totalPerPersonDisplay = document.getElementById('totalPerPerson');
const resetButton = document.querySelector('.reset-btn');
const errorMessage = document.getElementById('errorMessage');

//creating a variable to store the selected tip percentage
let selectedTip = 15;

function calculateTip(){
    //get bill from input and convert it to a number 
    const bill = parseFloat(billAmount.value) || 0;
    let people = parseInt(numPeopleInput.value);
    const tipPercent = selectedTip;

    //checking if number of people is zero, empty, or negative
    if(people <= 0 || numPeopleInput.value === '' || isNaN(people)){
        //show error message
        errorMessage.classList.add('show');
        numPeopleInput.classList.add('error');
        
        //DON'T calculate - just show $0.00
        tipPerPersonDisplay.textContent = `$0.00`;
        totalPerPersonDisplay.textContent = `$0.00`;
        
        return; // Exit the function - don't calculate anything
    } else {
        //hide error message
        errorMessage.classList.remove('show');
        numPeopleInput.classList.remove('error');
    }

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
    
    //remove error state if showing
    errorMessage.classList.remove('show');
    numPeopleInput.classList.remove('error');

    //reset tip to zero
    selectedTip = 0;

    //recalculate
    calculateTip();
});

//calculate with the default value
calculateTip();