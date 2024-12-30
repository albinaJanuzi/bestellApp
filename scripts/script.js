function init() {
    loadCartFromLocalStorage();
    renderProducts();
    renderCart();
}


function renderProducts() {
    let productContentRef = document.getElementById('productContent');
    productContentRef.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
        productContentRef.innerHTML += getProductTemplate(i);
    }
}


function addToCart(productIndex) {
    const product = products[productIndex];

    if (!updateCartIfProductExists(product)) {
        cart.push({
            name: product.name,
            ingredients: product.ingredients,
            price: product.price,
            numberOfProducts: 1
        });
    }

    renderCart();
    saveCartToLocalStorage();
}


function updateCartIfProductExists(product) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === product.name) {
            cart[i].numberOfProducts++;
            return true;
        }
    }
    return false;
}


function renderCart(i) {
    let cartContentRef = document.getElementById('cartContent');
    cartContentRef.innerHTML = "";

    cartContentRef.innerHTML += `<h1>Cart</h1>`;
    checkCart(cartContentRef);
}

function checkCart(cartContentRef) {
    if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            cartContentRef.innerHTML += getCartTemplate(i);
        }
        cartContentRef.innerHTML += `<h3>Total: ${calculateTotalPrice()} €</h3><button onclick="completeOrder()">Order Now</button>`;
    } else {
        cartContentRef.innerHTML = "<p>Your cart is empty. Add some items to your cart!</p>";
    }
}




function productIncrement(i) {
    cart[i].numberOfProducts += 1;
    updateCart(i);
    saveCartToLocalStorage();
}


function productDecrement(i) {
    if (cart[i].numberOfProducts > 1) {
        cart[i].numberOfProducts -= 1;
    } else {
        cart.splice(i, 1);
    }

    renderCart();
    saveCartToLocalStorage();
}


function deleteProduct(i) {
    cart.splice(i, 1);
    renderCart();
    saveCartToLocalStorage();
}


function updateCart(i) {
    document.getElementById(`clicks-${i}`).innerHTML = cart[i].numberOfProducts + "x";
    const totalPrice = calculateProductPrice(cart[i]);
    document.getElementById(`totalPrice-${i}`).innerHTML = totalPrice.toFixed(2) + " €";
    renderCart();
}


function calculateProductPrice(product) {
    return product.price * product.numberOfProducts;
}


function calculateTotalPrice() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += calculateProductPrice(cart[i]);
    }
    return total.toFixed(2);
}


function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    } else {
        cart = [];
    }
}


function checkCart(cartContentRef) {
    if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            cartContentRef.innerHTML += getCartTemplate(i);
        }
        cartContentRef.innerHTML += `<h3>Total: ${calculateTotalPrice()} €</h3>
        <div class="js-center"><button  class="order-btn" onclick="completeOrder()">Order Now</button></div>`;
    }
}


function completeOrder() {
    const productContainerRef = document.getElementById('productContainer');
    productContainerRef.style.display = 'none';

    const cartContentRef = document.getElementById('cartContent');
    cartContentRef.style.display = 'none';

    completeOrderArray();
    messageTemplate();
}


function completeOrderArray() {
    cart = [];
    saveCartToLocalStorage();
    renderCart();
}


function toggleCart() {
    const cartContentRef = document.getElementById('cartContent');
    const productContentRef = document.getElementById('productContainer');
   

    if (cartContentRef.style.display === 'none') {
        cartContentRef.style.display = 'block';
        cartContentRef.style.width = '100%';
        productContentRef.style.display = 'none';
       
        
        

    } else {
        cartContentRef.style.display = 'none';
        productContentRef.style.display = 'block';
    }
}