/* ================= DEFAULT PRODUCTS ================= */

let products = JSON.parse(localStorage.getItem("skProducts")) || [

    {
        id: 1,
        name: "Premium Black Shirt",
        category: "Shirts",
        price: 799,
        oldPrice: 999,
        discount: "20%",
        image: "images/shirt1.jpg"
    },

    {
        id: 2,
        name: "Classic White Shirt",
        category: "Shirts",
        price: 899,
        oldPrice: 1199,
        discount: "25%",
        image: "images/shirt2.jpg"
    },

    {
        id: 3,
        name: "Blue Denim Jeans",
        category: "Jeans",
        price: 1299,
        oldPrice: 1599,
        discount: "19%",
        image: "images/jeans1.jpg"
    },

    {
        id: 4,
        name: "Premium Black T-Shirt",
        category: "T-Shirts",
        price: 599,
        oldPrice: 799,
        discount: "25%",
        image: "images/tshirt1.jpg"
    }

];


/* ================= CART ================= */

let cart = JSON.parse(localStorage.getItem("skCart")) || [];


/* ================= WISHLIST ================= */

let wishlist =
    JSON.parse(localStorage.getItem("skWishlist")) || [];


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(list = products) {

    const container =
        document.getElementById("productContainer");

    if (!container) return;

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML =
            "<h3>No products found.</h3>";

        return;
    }

    list.forEach(product => {

        const liked =
            wishlist.includes(product.id);

        container.innerHTML += `

        <div class="product-card">

            <span class="discount">
                -${product.discount}
            </span>

            <button
                class="wishlist-btn"
                onclick="toggleWishlist(${product.id})">

                ${liked ? "♥" : "♡"}

            </button>

            <img
                src="${product.image}"
                class="product-image"
                alt="${product.name}">

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <div class="category">
                    ${product.category}
                </div>

                <div class="price">

                    <span class="current-price">
                        ₹${product.price}
                    </span>

                    <span class="old-price">
                        ₹${product.oldPrice}
                    </span>

                </div>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})">

                    ADD TO CART

                </button>

            </div>

        </div>

        `;

    });

}


/* ================= CATEGORY ================= */

function filterCategory(category) {

    if (category === "All") {

        displayProducts(products);

        return;
    }

    const filtered =
        products.filter(
            p => p.category === category
        );

    displayProducts(filtered);

}


/* ================= SEARCH ================= */

function openSearch() {

    const box =
        document.getElementById("searchBox");

    box.style.display =
        box.style.display === "block"
            ? "none"
            : "block";

    document
        .getElementById("searchInput")
        .focus();

}


function searchProducts() {

    const text =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const result =
        products.filter(p =>
            p.name.toLowerCase().includes(text) ||
            p.category.toLowerCase().includes(text)
        );

    displayProducts(result);

}


/* ================= CART ================= */

function addToCart(id) {

    const product =
        products.find(p => p.id === id);

    if (!product) return;

    cart.push(product);

    localStorage.setItem(
        "skCart",
        JSON.stringify(cart)
    );

    updateCounts();

    alert(product.name + " added to cart!");

}


function showCart() {

    document
        .getElementById("cartSection")
        .scrollIntoView({
            behavior: "smooth"
        });

    displayCart();

}


function displayCart() {

    const container =
        document.getElementById("cartContainer");

    if (!container) return;

    container.innerHTML = "";

    if (cart.length === 0) {

        container.innerHTML =
            "<h3>Your cart is empty.</h3>";

        document.getElementById("cartTotal")
            .innerText = "0";

        return;
    }

    let total = 0;

    cart.forEach((item, index) => {

        total += Number(item.price);

        container.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}">

            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ₹${item.price}
                </p>

            </div>

            <button
                class="remove-cart"
                onclick="removeCart(${index})">

                Remove

            </button>

        </div>

        `;

    });

    document.getElementById("cartTotal")
        .innerText = total;

}


function removeCart(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "skCart",
        JSON.stringify(cart)
    );

    updateCounts();

    displayCart();

}


/* ================= WISHLIST ================= */

function toggleWishlist(id) {

    if (wishlist.includes(id)) {

        wishlist =
            wishlist.filter(
                item => item !== id
            );

    } else {

        wishlist.push(id);

    }

    localStorage.setItem(
        "skWishlist",
        JSON.stringify(wishlist)
    );

    updateCounts();

    displayProducts();

}


function showWishlist() {

    const section =
        document.getElementById(
            "wishlistSection"
        );

    section.scrollIntoView({
        behavior: "smooth"
    });

    const container =
        document.getElementById(
            "wishlistContainer"
        );

    container.innerHTML = "";

    const items =
        products.filter(
            p => wishlist.includes(p.id)
        );

    if (items.length === 0) {

        container.innerHTML =
            "<h3>No wishlist products.</h3>";

        return;
    }

    items.forEach(product => {

        container.innerHTML += `

        <div class="product-card">

            <img
                src="${product.image}"
                class="product-image">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>
                    ₹${product.price}
                </p>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})">

                    ADD TO CART

                </button>

            </div>

        </div>

        `;

    });

}


/* ================= WHATSAPP ================= */

function orderWhatsApp() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    let message =
        "Hello SK Men's Zone,%0A%0AI want to order:%0A";

    let total = 0;

    cart.forEach(item => {

        message +=
            "- " +
            item.name +
            " - ₹" +
            item.price +
            "%0A";

        total += Number(item.price);

    });

    message +=
        "%0ATotal: ₹" +
        total +
        "%0A%0AThank you!";

    const phone =
        "917200048460";

    window.open(
        "https://wa.me/" +
        phone +
        "?text=" +
        message,
        "_blank"
    );

}


/* ================= COUNTS ================= */

function updateCounts() {

    document.getElementById(
        "cartCount"
    ).innerText = cart.length;

    document.getElementById(
        "wishlistCount"
    ).innerText = wishlist.length;

}


/* ================= SHOP BUTTON ================= */

function goProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================= START ================= */

displayProducts();

updateCounts();

displayCart();