//Menu
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = document.querySelector('.menu-icon');
  
    if (navMenu.classList.contains('open')) {
        // Close the menu
        navMenu.classList.remove('open');
        menuIcon.innerHTML = '&#9776;'; // Change back to hamburger icon
    } else {
        // Open the menu
        navMenu.classList.add('open');
        menuIcon.innerHTML = '✕'; // Change to close icon
    }
  }
  
document.addEventListener('DOMContentLoaded', (event) => {
    // Get cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('bytecart')) || [];
    
    let itemCount = 0;
    let totalAmount = 0;

    // Calculate item count and total amount
    cart.forEach(item => {
        itemCount += item.quantity;
        totalAmount += item.price * item.quantity;
    });

    // Update order summary
    document.getElementById('itemCount').innerText = `Total Items: ${itemCount}`;
    document.getElementById('totalAmount').innerText = `Amount: ₦${totalAmount.toFixed(2)}`;
    const shippingFee = 0;
    const finalAmount = totalAmount + shippingFee;
    document.getElementById('finalAmount').innerText = `Total Amount: ₦${finalAmount.toFixed(2)}`;
    
    // Handle form submission
    document.getElementById('checkoutForm').addEventListener('submit', function(event) {
        // Add cart items as hidden inputs
        cart.forEach((item, index) => {
            const inputName = document.createElement('input');
            inputName.type = 'hidden';
            inputName.name = `item${index + 1}Name`;
            inputName.value = item.name;
            this.appendChild(inputName);

            const inputQuantity = document.createElement('input');
            inputQuantity.type = 'hidden';
            inputQuantity.name = `item${index + 1}Quantity`;
            inputQuantity.value = item.quantity;
            this.appendChild(inputQuantity);
        });

        // Add order summary as hidden inputs
        const orderSummary = {
            itemCount: itemCount,
            totalAmount: totalAmount.toFixed(2),
            shippingFee: shippingFee,
            finalAmount: finalAmount.toFixed(2)
        };

        Object.entries(orderSummary).forEach(([key, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            this.appendChild(input);
        });

        // Form data is automatically collected and sent to the specified URL
    });
});
