// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
});

// Cart Functionality
let cart = [];
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.querySelector('.cart-count');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.querySelector('.close-modal');
const cartItemsContainer = document.getElementById('cart-items');
const emptyCartMessage = document.getElementById('empty-cart');
const cartFooter = document.getElementById('cart-footer');
const cartTotal = document.getElementById('cart-total');
const toast = document.getElementById('toast');

// Add to Cart Buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const image = button.getAttribute('data-image');
        
        // Check if item already in cart
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                image,
                quantity: 1
            });
        }
        
        updateCart();
        showToast(`${name} added to cart`);
    });
});

// Update Cart
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart modal if open
    if (cartModal.style.display === 'flex') {
        renderCartItems();
    }
}

// Render Cart Items
function renderCartItems() {
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartItemsContainer.style.display = 'none';
        cartFooter.style.display = 'none';
    } else {
        emptyCartMessage.style.display = 'none';
        cartItemsContainer.style.display = 'table';
        cartFooter.style.display = 'flex';
        
        cartItemsContainer.innerHTML = `
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${cart.map(item => `
                    <tr>
                        <td>
                            <div style="display: flex; align-items: center;">
                                <div class="cart-item-image">
                                    <img src="${item.image}" alt="${item.name}">
                                </div>
                                <span style="margin-left: 1rem;">${item.name}</span>
                            </div>
                        </td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td>
                            <div class="quantity-control">
                                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                            </div>
                        </td>
                        <td>$${(item.price * item.quantity).toFixed(2)}</td>
                        <td><i class="fas fa-trash remove-item" data-id="${item.id}"></i></td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        
        // Calculate total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
        
        // Add event listeners to new buttons
        document.querySelectorAll('.quantity-btn.minus').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const item = cart.find(item => item.id === id);
                
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cart = cart.filter(item => item.id !== id);
                }
                
                updateCart();
            });
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const item = cart.find(item => item.id === id);
                item.quantity += 1;
                updateCart();
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                cart = cart.filter(item => item.id !== id);
                updateCart();
            });
        });
    }
}

// Show/Hide Cart Modal
cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.style.display = 'flex';
    renderCartItems();
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Toast Notification
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    
    // Here you would typically send the email to your server
    console.log('Subscribed email:', email);
    
    // Show success message
    showToast('Thanks for subscribing!');
    newsletterForm.reset();
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
let darkMode = true; // Starting in dark mode

darkModeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    updateDarkMode();
});

function updateDarkMode() {
    if (darkMode) {
        // Dark mode colors
        document.documentElement.style.setProperty('--primary', '#D4AF37');
        document.documentElement.style.setProperty('--secondary', '#8B4513');
        document.documentElement.style.setProperty('--accent', '#5D4037');
        document.documentElement.style.setProperty('--light', '#121212');
        document.documentElement.style.setProperty('--dark', '#E0E0E0');
        document.documentElement.style.setProperty('--white', '#1E1E1E');
        document.documentElement.style.setProperty('--highlight', '#3E2723');
        document.documentElement.style.setProperty('--text-light', '#E0E0E0');
        document.documentElement.style.setProperty('--text-muted', '#9E9E9E');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        // Light mode colors
        document.documentElement.style.setProperty('--primary', '#5D4037');
        document.documentElement.style.setProperty('--secondary', '#8D6E63');
        document.documentElement.style.setProperty('--accent', '#D7CCC8');
        document.documentElement.style.setProperty('--light', '#EFEBE9');
        document.documentElement.style.setProperty('--dark', '#3E2723');
        document.documentElement.style.setProperty('--white', '#FFFFFF');
        document.documentElement.style.setProperty('--highlight', '#BCAAA4');
        document.documentElement.style.setProperty('--text-light', '#3E2723');
        document.documentElement.style.setProperty('--text-muted', '#8D6E63');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}