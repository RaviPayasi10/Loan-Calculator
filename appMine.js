
// Listen for submit
const btn = document.querySelector('.btn-block');
// console.log(btn);
btn.addEventListener('click', function(e){
    // Hide results
    document.getElementById('results').style.display = 'none';

    // Show loading
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults,2000);

    e.preventDefault();
});

function calculateResults(){

    // UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    // console.log(amount,interest,years);
    
    const principle = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute Monthly payments 
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principle * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2); 
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);

        // Show result
        document.getElementById('results').style.display = 'block';

        // Hide Loading
        document.getElementById('loading').style.display = 'none';
    }else{
        // console.log('Please check your numbers');
        showError("Please check your numbers");
        // Hide loading - option 1
        document.getElementById('loading').style.display = 'none';
    }

    // e.preventDefault();
}

function showError(error){
    // Hide results and loading - option 2
    // Hide results
    document.getElementById('results').style.display = 'none';

    // Hide loading
    document.getElementById('loading').style.display = 'none';

    // Create a div
    const errordiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errordiv.className = 'alert alert-danger';

    // Create text node and append div
    const errorText = document.createTextNode(error);
    errordiv.appendChild(errorText);

    // Insert error above heading
    card.insertBefore(errordiv,heading);

    // Clear error after 3 seconds
    setTimeout(clearError,3000);
}

function clearError(){
    document.querySelector('.alert').remove();
}