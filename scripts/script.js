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

function getProductTemplate(i) {
    const product = products[i];
    return ` <div class="product-row">
            <div class="product-details">
                <h2>${product.name}</h2>
                <p>${product.ingredients}</p>
                <p class="orange-txt"><strong>${product.price.toFixed(2)} €</strong></p>
            </div>
            <div class="product-button">
                <button class="button-product" onclick="addToCart(${i})"> + </button>
            </div>
        </div>`;
}

function addToCart(productIndex) {
    const product = products[productIndex];
    let productExistsInCart = false;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === product.name) {
            cart[i].numberOfProducts++;
            productExistsInCart = true;
            break;
        }
    }

    if (!productExistsInCart) {
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

function renderCart(i) {
    let cartContentRef = document.getElementById('cartContent');
    cartContentRef.innerHTML = "";

    cartContentRef.innerHTML += `<h2>Cart</h2>`;


    checkCart(cartContentRef);
    
}

function checkCart(cartContentRef) {
    
    if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            cartContentRef.innerHTML += getCartTemplate(i);
        }
        cartContentRef.innerHTML += `<h3>Total: ${calculateTotalPrice()} €</h3>`;

       
    } 
}

function getCartTemplate(i) {
    const product = cart[i];
    const totalProductPrice = calculateProductPrice(product);
    return `<div>
            <h2>${product.name}</h2>
            <p>${product.ingredients}</p>
            <button onclick="productDecrement(${i})"> - </button>
            <span id="clicks-${i}">${product.numberOfProducts}x</span>
            <button onclick="productIncrement(${i})"> + </button>
            <button onclick="deleteProduct(${i})"> Delete </button>
            <span id="totalPrice-${i}">${totalProductPrice.toFixed(2)} €</span>
        </div>`;
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
    
    // Berechne den Preis für alle Produkte im Warenkorb
    for (let i = 0; i < cart.length; i++) {
        total += calculateProductPrice(cart[i]);
    }

    // Überprüfe, ob die Checkbox für das Sonderangebot aktiviert ist
    if (isSpecialOfferChecked()) {
        total += 5;  // Addiere 5 € zum Gesamtpreis, wenn die Checkbox aktiviert ist
    }

    return total.toFixed(2);  // Rückgabe des Gesamtpreises
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
        // Checkbox hinzufügen, wenn Produkte im Warenkorb sind
        cartContentRef.innerHTML += `
            <label for="specialOfferCheckbox">
                Add Delivery: <input type="checkbox" id="specialOfferCheckbox" ${isSpecialOfferChecked() ? 'checked' : ''}>
            </label><br><br>
        `;

        // Für jedes Produkt im Warenkorb das Template rendern
        for (let i = 0; i < cart.length; i++) {
            cartContentRef.innerHTML += getCartTemplate(i);
        }

        // Berechne und zeige den Gesamtpreis an
        cartContentRef.innerHTML += `<h3>Total: ${calculateTotalPrice()} €</h3>`;
    } 
}

function isSpecialOfferChecked() {
    const specialOfferCheckbox = document.getElementById('specialOfferCheckbox');
    return specialOfferCheckbox && specialOfferCheckbox.checked;
}

