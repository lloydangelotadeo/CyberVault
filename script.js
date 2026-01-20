// =====================
// PRODUCT DATA
// =====================
const products = [
    {
        id: 1,
        name: "HP Victus 15-FA2401TX ",
        price: 62990,
        img: "images/victus.jpg",
        desc: "Intel Core i5-13420H • RTX 5050 • 16GB 5200Mhz RAM • 512GB SSD • 15.6 Full-HD IPS 144Hz Display"
    },
    {
        id: 2,
        name: "Logitech G1012 Gaming Mouse",
        price: 1060,
        img: "images/mouse.jpg",
        desc: "200-8000 DPI • RGB Lighting • Ergonomic Design"
    },
    {
        id: 3,
        name: "HyperX CLoud Stinger 2",
        price: 1700,
        img: "iamges/headset.jpg",
        desc: "Spatial Audio • Easy Access Audio Controls • Crisp, Clear in-game sound"
    },
    {
        id: 4,
        name: "Lenovo Legion 5 15IRX10",
        price: 81995,
        img: "images/legion.jpg",
        desc: "Intel i7-13650HX • RTX 5050 • 16GB 4800Mhz RAM • 512GB SSD • 15.3 WUXGA (1920x1200) IPS 165Hz Display"
    },
    {
        id: 5,
        name: "Asus FA401KH-RG009WSM TUF Gaming A14",
        price: 95995,
        img: "images/tuf14.jpg",
        desc: "AMD Ryzen Ai 7-350 • RTX 5050 • 16GB RAM • 1TB SSD • 14 Full-HD 165Hz"
    },
    {
        id: 6,
        name: "TTRacing Duo V4 Pro Air Threads Fabric Gaming Chair",
        price: 4499,
        img: "images/chair.jpg",
        desc: "Cold Cure Foam • Machine Embroidery • Heavy Duty Nylon Base "
    },
    {
        id: 7,
        name: "Aula S2022 Mechanical Keyboard",
        price: 1299,
        img: "images/keyboard.jpg",
        desc: "Two-color injection molded PBT keycaps • Gaming Mechanical Keyboard • 104 Keys, 100% layout"
    }
];

let selectedProduct = null;
let cart = [];

// =====================
// PRODUCT MODAL
// =====================
function openProduct(id) {
    selectedProduct = products.find(p => p.id === id);
    document.getElementById("modal-img").src = selectedProduct.img;
    document.getElementById("modal-title").innerText = selectedProduct.name;
    document.getElementById("modal-desc").innerText = selectedProduct.desc;
    document.getElementById("modal-price").innerText = "₱" + selectedProduct.price;
    document.getElementById("product-modal").style.display = "flex";
}

function closeProduct() {
    document.getElementById("product-modal").style.display = "none";
}

// =====================
// CART TOGGLE
// =====================
function toggleCart() {
    document.getElementById("cart").classList.toggle("active");
}

document.getElementById("cart-btn").onclick = toggleCart;

// =====================
// CART LOGIC
// =====================
function addToCart() {
    const item = cart.find(i => i.id === selectedProduct.id);

    if (item) {
        item.qty++;
    } else {
        cart.push({ ...selectedProduct, qty: 1 });
    }

    updateCart();
    closeProduct();
    toggleCart(); // auto-open cart
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;

        cartItems.innerHTML += `
            <div class="cart-item">
                <strong>${item.name}</strong><br>
                Qty: ${item.qty}<br>
                ₱${item.price * item.qty}<br>
                <button onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;
    });

    document.getElementById("cart-total").innerText = total;
    document.getElementById("cart-count").innerText = count;
}

// =====================
// PRODUCT FILTER
// =====================
const laptopBtn = document.getElementById("laptop-btn");
const accessoryBtn = document.getElementById("accessory-btn");
const homeBtn = document.getElementById("home-btn");
const productCards = document.querySelectorAll(".product-card");
const categoryTitles = document.querySelectorAll(".category-title");

function showCategory(category) {
    productCards.forEach(product => {
        if (product.dataset.category === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });

    categoryTitles.forEach(title => {
        if (category === "laptop" && title.textContent.includes("Laptop")) {
            title.style.display = "block";
        } else if (category === "accessory" && title.textContent.includes("Accessory")) {
            title.style.display = "block";
        } else {
            title.style.display = "none";
        }
    });
}

function showAll() {
    productCards.forEach(product => product.style.display = "block");
    categoryTitles.forEach(title => title.style.display = "block");
}

// BUTTON EVENTS
laptopBtn.addEventListener("click", e => {
    e.preventDefault();
    showCategory("laptop");
});

accessoryBtn.addEventListener("click", e => {
    e.preventDefault();
    showCategory("accessory");
});

homeBtn.addEventListener("click", e => {
    e.preventDefault();
    showAll();
});
