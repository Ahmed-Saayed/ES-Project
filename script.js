/* ============================================
   SHOPZONE E-COMMERCE - JavaScript
   Multi-page version using localStorage
   ============================================ */

// ===== PRODUCT DATA =====
const products = [
    { id: 1, name: "Wireless Headphones", price: 99.99, category: "electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop", desc: "Premium wireless headphones with active noise cancellation and 30-hour battery life." },
    { id: 2, name: "Smart Watch Pro", price: 249.99, category: "electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop", desc: "Feature-packed smartwatch with health monitoring, GPS, and AMOLED display." },
    { id: 3, name: "Leather Jacket", price: 189.99, category: "clothing", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop", desc: "Genuine leather jacket with a classic design, perfect for any season." },
    { id: 4, name: "JavaScript Mastery", price: 34.99, category: "books", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop", desc: "Comprehensive guide to modern JavaScript, from ES6 to advanced patterns." },
    { id: 5, name: "Running Shoes", price: 129.99, category: "clothing", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop", desc: "Lightweight and comfortable running shoes with superior cushioning technology." },
    { id: 6, name: "Sunglasses", price: 79.99, category: "accessories", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop", desc: "UV-protected polarized sunglasses with a sleek titanium frame." },
    { id: 7, name: "Bluetooth Speaker", price: 59.99, category: "electronics", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop", desc: "Portable waterproof Bluetooth speaker with rich 360° sound." },
    { id: 8, name: "Canvas Backpack", price: 64.99, category: "accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop", desc: "Durable canvas backpack with laptop compartment and multiple pockets." },
    { id: 9, name: "Design Patterns Book", price: 42.99, category: "books", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop", desc: "Master the art of software design with classic and modern patterns." },
    { id: 10, name: "Winter Hoodie", price: 54.99, category: "clothing", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop", desc: "Cozy fleece-lined hoodie, perfect for cold weather adventures." },
    { id: 11, name: "Mechanical Keyboard", price: 139.99, category: "electronics", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop", desc: "RGB mechanical keyboard with tactile switches and customizable macros." },
    { id: 12, name: "Silver Watch", price: 199.99, category: "accessories", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop", desc: "Elegant silver analog watch with sapphire crystal glass." }
];

// ===== CART HELPERS (localStorage) =====
function getCart() {
    return JSON.parse(localStorage.getItem('shopzone_cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('shopzone_cart', JSON.stringify(cart));
}

// ===== AUTH =====
function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;
    const errorEl = document.getElementById('reg-error');

    if (password.length < 6) {
        errorEl.textContent = 'Password must be at least 6 characters';
        return false;
    }
    if (password !== confirm) {
        errorEl.textContent = 'Passwords do not match!';
        return false;
    }

    const user = { username, email, phone, password };
    localStorage.setItem('shopzone_user', JSON.stringify(user));
    errorEl.textContent = '';
    showToast('Account created successfully! 🎉');
    setTimeout(() => { window.location.href = 'login.html'; }, 800);
    return false;
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');

    const saved = JSON.parse(localStorage.getItem('shopzone_user'));
    if (!saved) {
        errorEl.textContent = 'No account found. Please register first.';
        return false;
    }
    if (saved.email !== email || saved.password !== password) {
        errorEl.textContent = 'Invalid email or password!';
        return false;
    }

    localStorage.setItem('shopzone_logged_in', 'true');
    errorEl.textContent = '';
    showToast('Welcome back, ' + saved.username + '! 👋');
    setTimeout(() => { window.location.href = 'index.html'; }, 800);
    return false;
}

// ===== SLIDER =====
let currentSlide = 0;
let sliderInterval = null;

function initSlider() {
    const dots = document.getElementById('slider-dots');
    const slides = document.querySelectorAll('.slide');
    if (!dots || slides.length === 0) return;
    dots.innerHTML = '';
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        dots.appendChild(dot);
    });
}

function changeSlide(dir) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + dir + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    updateDots();
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    updateDots();
}

function updateDots() {
    document.querySelectorAll('.slider-dots .dot').forEach((d, i) => {
        d.classList.toggle('active', i === currentSlide);
    });
}

function startSlider() {
    if (sliderInterval) clearInterval(sliderInterval);
    sliderInterval = setInterval(() => changeSlide(1), 4000);
}

// ===== PRODUCTS =====
function renderProducts(category) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    grid.innerHTML = filtered.map(p => `
        <div class="product-card" onclick="viewProduct(${p.id})">
            <div class="product-card-img-wrapper">
                <img class="product-card-img" src="${p.image}" alt="${p.name}" loading="lazy">
            </div>
            <div class="product-card-body">
                <h3>${p.name}</h3>
                <p class="price">$${p.price.toFixed(2)}</p>
                <span class="category-tag">${p.category}</span>
                <button class="btn-add" onclick="event.stopPropagation(); addToCart(${p.id})">
                    <i class="fas fa-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function filterProducts(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(category);
}

function viewProduct(id) {
    localStorage.setItem('shopzone_view_product', id);
    window.location.href = 'product.html';
}

// ===== PRODUCT DETAIL =====
let detailQty = 1;

function loadProductDetail() {
    const id = parseInt(localStorage.getItem('shopzone_view_product'));
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('detail-img').src = product.image;
    document.getElementById('detail-img').alt = product.name;
    document.getElementById('detail-name').textContent = product.name;
    document.getElementById('detail-price').textContent = '$' + product.price.toFixed(2);
    document.getElementById('detail-category').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    document.getElementById('detail-desc').textContent = product.desc;
    document.getElementById('detail-qty').textContent = '1';
    detailQty = 1;
}

function changeDetailQty(dir) {
    detailQty = Math.max(1, detailQty + dir);
    document.getElementById('detail-qty').textContent = detailQty;
}

function addToCartFromDetail() {
    const id = parseInt(localStorage.getItem('shopzone_view_product'));
    const product = products.find(p => p.id === id);
    if (!product) return;

    let cart = getCart();
    const existing = cart.find(c => c.id === product.id);
    if (existing) {
        existing.qty += detailQty;
    } else {
        cart.push({ ...product, qty: detailQty });
    }
    saveCart(cart);
    updateCartCount();
    showToast(`${product.name} added to cart! 🛒`);
}

// ===== CART =====
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    let cart = getCart();
    const existing = cart.find(c => c.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart(cart);
    updateCartCount();
    showToast(`${product.name} added to cart! 🛒`);
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(c => c.id !== id);
    saveCart(cart);
    renderCart();
    showToast('Item removed from cart');
}

function changeCartQty(id, dir) {
    let cart = getCart();
    const item = cart.find(c => c.id === id);
    if (!item) return;
    item.qty = Math.max(1, item.qty + dir);
    saveCart(cart);
    renderCart();
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById('cart-count');
    if (badge) badge.textContent = count;
    document.querySelectorAll('.cart-count-sync').forEach(el => el.textContent = count);
}

function renderCart() {
    const itemsEl = document.getElementById('cart-items');
    const summaryEl = document.getElementById('cart-summary');
    const emptyEl = document.getElementById('cart-empty');
    if (!itemsEl) return;

    const cart = getCart();
    updateCartCount();

    if (cart.length === 0) {
        itemsEl.style.display = 'none';
        summaryEl.style.display = 'none';
        emptyEl.style.display = 'block';
        return;
    }

    itemsEl.style.display = 'flex';
    summaryEl.style.display = 'block';
    emptyEl.style.display = 'none';

    itemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p class="item-price">$${(item.price * item.qty).toFixed(2)}</p>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn" onclick="changeCartQty(${item.id}, -1)">−</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="changeCartQty(${item.id}, 1)">+</button>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    document.getElementById('cart-total').textContent = '$' + total.toFixed(2);
}

// ===== BUY NOW =====
function buyNow() {
    const cart = getCart();
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const orderId = 'SZ-' + Date.now().toString(36).toUpperCase();
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    localStorage.setItem('shopzone_order', JSON.stringify({
        id: orderId,
        total: '$' + total.toFixed(2),
        delivery: deliveryDate.toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        })
    }));

    // Clear cart
    saveCart([]);
    window.location.href = 'shipped.html';
}

// ===== ORDER DETAILS =====
function loadOrderDetails() {
    const order = JSON.parse(localStorage.getItem('shopzone_order'));
    if (!order) return;
    const idEl = document.getElementById('order-id');
    const totalEl = document.getElementById('order-total');
    const deliveryEl = document.getElementById('order-delivery');
    if (idEl) idEl.textContent = order.id;
    if (totalEl) totalEl.textContent = order.total;
    if (deliveryEl) deliveryEl.textContent = order.delivery;
}

// ===== TOAST =====
function showToast(message, isError = false) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast' + (isError ? ' error' : '');
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}
