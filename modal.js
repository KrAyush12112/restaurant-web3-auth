let currentQuantity = 1;
let currentPrice = 0;
let currentFood = '';
const foodDescriptions = {
    burger: "Juicy beef patty with fresh lettuce, tomatoes, onions, and our special sauce in a toasted bun.",
    thali: "Traditional Indian complete meal with rice, dal, vegetables, roti, and accompaniments.",
    pizza: "Wood-fired pizza with fresh mozzarella, tomato sauce, and your choice of toppings.",
    briyani: "Aromatic basmati rice cooked with tender meat/vegetables and traditional spices.",
    paneer: "Fresh cottage cheese curry prepared with rich tomato gravy and Indian spices.",
    cake: "Freshly baked cake with premium ingredients, perfect for celebrations.",
    rolls: "Crispy rolls filled with fresh vegetables or meat, served with chutneys.",
    noodles: "Stir-fried noodles with vegetables and your choice of protein in savory sauce.",
    dosa: "Crispy South Indian crepe served with sambar and coconut chutney.",
    "ice-cream": "Creamy premium ice cream available in various delicious flavors."
}
function openModal(foodName, price, imgSrc) {
    currentFood = foodName;
    currentPrice = price;
    currentQuantity = 1;
    
    document.getElementById('modalTitle').textContent = foodName.charAt(0).toUpperCase() + foodName.slice(1);
    document.getElementById('modalImg').src = imgSrc;
    document.getElementById('quantityDisplay').textContent = currentQuantity;
    document.getElementById('descriptionText').textContent = foodDescriptions[foodName] || "Delicious food item prepared with care.";
    document.getElementById('specialInstructions').value = '';
    updateTotalPrice();
    
    document.getElementById('modalOverlay').classList.add('active');
    document.body.classList.add('blurred');
}
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.classList.remove('blurred');
}
function increaseQuantity() {
    currentQuantity++;
    document.getElementById('quantityDisplay').textContent = currentQuantity;
    updateTotalPrice();
}
function decreaseQuantity() {
    if (currentQuantity > 1) {
        currentQuantity--;
        document.getElementById('quantityDisplay').textContent = currentQuantity;
        updateTotalPrice();
    }
}
function updateTotalPrice() {
    const total = currentPrice * currentQuantity;
    document.getElementById('totalPrice').textContent = `₹${total}`;
}
function addToOrder() {
    const instructions = document.getElementById('specialInstructions').value;
    const orderData = {
        food: currentFood,
        quantity: currentQuantity,
        price: currentPrice,
        total: currentPrice * currentQuantity,
        instructions: instructions
    };
    
    alert(`Added to order:\n${orderData.food} x${orderData.quantity}\nTotal: ₹${orderData.total}\n${instructions ? 'Instructions: ' + instructions : ''}`);
    closeModal();
}
function showMoreItems() {
    const hiddenItems = document.querySelectorAll('.hidden-item');
    hiddenItems.forEach(item => {
        item.style.display = 'block';
        item.classList.remove('hidden-item');
    });
    document.querySelector('.view-more').style.display = 'none';
}
// Add click event listeners to all food items
document.addEventListener('DOMContentLoaded', function() {
    const foodItems = document.querySelectorAll('.food-item');
    foodItems.forEach(item => {
        item.addEventListener('click', function() {
            const foodName = this.dataset.food;
            const price = parseInt(this.dataset.price);
            const imgSrc = this.querySelector('img').src;
            
            if (foodName && price) {
                openModal(foodName, price, imgSrc);
            }
        });
    });
})
// Close modal when clicking outside
document.getElementById('modalOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
})
// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
})