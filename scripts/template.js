function getProductTemplate(i) {
    const product = products[i];
    return ` <div class="product-row padding-left-20">
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


function getCartTemplate(i) {
    const product = cart[i];
    const totalProductPrice = calculateProductPrice(product);
    return `<div>
            <h2>${product.name}</h2>
            <p>${product.ingredients}</p>
            <div class="btn-span-position">
            <button class="border-none-btn" onclick="productDecrement(${i})"> <img class="img-size" src="./img/images/minus.png"></button>
            <span id="clicks-${i}">${product.numberOfProducts}x</span>
            <button class="border-none-btn" onclick="productIncrement(${i})"><img class="img-size" src="./img/images/plus.png"></button>
            <span class="orange-txt" id="totalPrice-${i}"><strong>${totalProductPrice.toFixed(2)} €</strong></span>
            <button class="border-none-btn" onclick="deleteProduct(${i})"><img class="img-size" src="./img/images/garbage.png"></button>
            </div>
        </div>`;
}


function messageTemplate() {
    const messageRef = document.getElementById('message');
    const cartBtn = document.getElementById('cartButton');

    messageRef.innerHTML += `
    <img class="order-complete" src="./img/images/order-complete.png">
    <h2>Thank you for your order! Your Pizza will be delivered soon.</h2>
    <a href="./index.html">Homepage</a>`;
    messageRef.style.display = 'flex';
    cartBtn.style.display = 'none';
}
