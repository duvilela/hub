// Ducell - Store Engine & SPA Router

// --- CATALOG FALLBACK DATA ---
const DEFAULT_PRODUCTS = [
    {
        "id": 1,
        "name": "iPhone 15 Pro Max",
        "brand": "Apple",
        "price": 7999.00,
        "image": "images/iphone15.png",
        "stock": 15,
        "description": "Chip A17 Pro, titânio aeroespacial, tela Super Retina XDR, câmera tripla de 48MP e zoom óptico de 5x."
    },
    {
        "id": 2,
        "name": "Galaxy S24 Ultra",
        "brand": "Samsung",
        "price": 6899.00,
        "image": "images/s24ultra.png",
        "stock": 10,
        "description": "Galaxy AI integrada (inteligência artificial), processador Snapdragon 8 Gen 3, câmera de 200MP e caneta S Pen inclusa."
    },
    {
        "id": 3,
        "name": "Xiaomi 14 Ultra",
        "brand": "Xiaomi",
        "price": 5999.00,
        "image": "images/xiaomi14.png",
        "stock": 8,
        "description": "Lente óptica Leica Summilux de nível profissional, sensor principal de 1 polegada, Snapdragon 8 Gen 3 e super carregamento de 90W."
    },
    {
        "id": 4,
        "name": "iPhone 13",
        "brand": "Apple",
        "price": 3799.00,
        "image": "images/iphone13.png",
        "stock": 20,
        "description": "Tela Super Retina XDR de 6,1 polegadas, chip A15 Bionic ultrarrápido, modo Cinema e sistema avançado de câmera dupla."
    }
];

// --- APP STATE INITIALIZATION ---
let products = JSON.parse(localStorage.getItem('ducell_products'));
if (!products || !Array.isArray(products) || products.length === 0) {
    products = DEFAULT_PRODUCTS;
    localStorage.setItem('ducell_products', JSON.stringify(products));
}

let cart = JSON.parse(localStorage.getItem('ducell_cart')) || [];
let users = JSON.parse(localStorage.getItem('ducell_users')) || [];
let session = JSON.parse(localStorage.getItem('ducell_session')) || null;
let orders = JSON.parse(localStorage.getItem('ducell_orders')) || [];

// Active brand filter state
let currentFilter = 'all';

// --- DOM ELEMENTS REFERENCE ---
const viewHome = document.getElementById('view-home');
const viewProductDetail = document.getElementById('view-product-detail');
const viewAuth = document.getElementById('view-auth');
const viewCheckout = document.getElementById('view-checkout');
const viewSuccess = document.getElementById('view-success');
const viewAdmin = document.getElementById('view-admin');

const navSearchBox = document.getElementById('nav-search-box');
const searchInput = document.getElementById('search-input');
const productsGrid = document.getElementById('products-grid');
const productDetailContent = document.getElementById('product-detail-content');
const userSessionInfo = document.getElementById('user-session-info');
const btnAdminDashboard = document.getElementById('btn-admin-dashboard');
const btnToggleCart = document.getElementById('btn-toggle-cart');
const cartCount = document.getElementById('cart-count');
const cartDrawer = document.getElementById('cart-drawer');
const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
const cartDrawerItems = document.getElementById('cart-drawer-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const btnGoCheckout = document.getElementById('btn-go-checkout');

// Toast Notification
const toastNotification = document.getElementById('toast-notification');
const toastIcon = document.getElementById('toast-icon');
const toastMsg = document.getElementById('toast-msg');

// Auth elements
const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');
const formLogin = document.getElementById('form-login');
const formRegister = document.getElementById('form-register');
const loginUsernameInput = document.getElementById('login-username');
const loginPasswordInput = document.getElementById('login-password');

// Checkout elements
const formCheckout = document.getElementById('form-checkout');
const checkoutItemsList = document.getElementById('checkout-items-list');
const checkoutSubtotal = document.getElementById('checkout-subtotal');
const checkoutDiscount = document.getElementById('checkout-discount');
const pixDiscountRow = document.getElementById('pix-discount-row');
const checkoutTotal = document.getElementById('checkout-total');
const btnSubmitOrder = document.getElementById('btn-submit-order');
const cardInstallmentsSelect = document.getElementById('card-installments');

// Success page elements
const successOrderId = document.getElementById('success-order-id');
const successPaymentMethod = document.getElementById('success-payment-method');
const successTotal = document.getElementById('success-total');
const btnSuccessHome = document.getElementById('btn-success-home');

// CMS Elements
const tabCmsProducts = document.getElementById('tab-cms-products');
const tabCmsOrders = document.getElementById('tab-cms-orders');
const cmsProductsPanel = document.getElementById('cms-products-panel');
const cmsOrdersPanel = document.getElementById('cms-orders-panel');
const cmsProductsList = document.getElementById('cms-products-list');
const cmsOrdersList = document.getElementById('cms-orders-list');
const statSales = document.getElementById('stat-sales');
const statProductsCount = document.getElementById('stat-products-count');
const statOrdersCount = document.getElementById('stat-orders-count');
const productModal = document.getElementById('product-modal');
const formProduct = document.getElementById('form-product');
const modalTitle = document.getElementById('modal-title');
const customBrandGroup = document.getElementById('custom-brand-group');
const prodBrand = document.getElementById('prod-brand');
const prodImage = document.getElementById('prod-image');
const prodImageCustom = document.getElementById('prod-image-custom');

// --- HELPER FUNCTIONS ---
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function showToast(message, isError = false) {
    toastMsg.textContent = message;
    if (isError) {
        toastNotification.classList.add('error');
        toastIcon.className = "fa-solid fa-circle-exclamation toast-icon";
    } else {
        toastNotification.classList.remove('error');
        toastIcon.className = "fa-solid fa-circle-check toast-icon";
    }
    toastNotification.classList.add('show');
    
    setTimeout(() => {
        toastNotification.classList.remove('show');
    }, 3000);
}

// --- SPA VIEW ROUTING ---
function showView(viewId) {
    // Hide all sections
    const views = [viewHome, viewProductDetail, viewAuth, viewCheckout, viewSuccess, viewAdmin];
    views.forEach(view => {
        view.classList.remove('active');
        view.style.display = 'none';
    });

    // Show selected section
    const activeView = document.getElementById(viewId);
    if (activeView) {
        activeView.style.display = viewId === 'view-auth' ? 'flex' : 'block';
        // Trigger reflow for transition
        void activeView.offsetWidth;
        activeView.classList.add('active');
    }

    // Toggle Search Bar in Navbar (Only active on Home View)
    if (viewId === 'view-home') {
        navSearchBox.style.display = 'block';
    } else {
        navSearchBox.style.display = 'none';
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
    closeCart();
}

// --- SESSION MANAGEMENT ---
function updateNavbarSession() {
    if (session) {
        userSessionInfo.innerHTML = `
            <div class="user-badge" id="btn-user-dropdown">
                <i class="fa-solid fa-circle-user"></i>
                <span>Olá, ${session.name.split(' ')[0]}</span>
                <i class="fa-solid fa-angle-down" style="font-size:0.75rem;"></i>
            </div>
            <div class="user-dropdown-menu" id="user-dropdown-menu" style="display: none;">
                <button id="btn-logout" class="dropdown-item">
                    <i class="fa-solid fa-right-from-bracket"></i> Sair
                </button>
            </div>
        `;
        
        // Show CMS dashboard button if administrator
        if (session.role === 'admin') {
            btnAdminDashboard.style.display = 'flex';
        } else {
            btnAdminDashboard.style.display = 'none';
        }

        // Setup drop dropdown click
        const userBadge = document.getElementById('btn-user-dropdown');
        const dropdownMenu = document.getElementById('user-dropdown-menu');
        if (userBadge && dropdownMenu) {
            userBadge.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
            });
        }
    } else {
        userSessionInfo.innerHTML = `
            <button class="btn-login" id="btn-login-view">
                <i class="fa-regular fa-user"></i>
                <span>Entrar</span>
            </button>
        `;
        btnAdminDashboard.style.display = 'none';
        
        // Re-attach event listener
        const btnLoginView = document.getElementById('btn-login-view');
        if (btnLoginView) {
            btnLoginView.addEventListener('click', () => showView('view-auth'));
        }
    }
}

// Logout handler (Global delegation)
document.addEventListener('click', (e) => {
    const dropdownMenu = document.getElementById('user-dropdown-menu');
    if (dropdownMenu && !e.target.closest('#btn-user-dropdown')) {
        dropdownMenu.style.display = 'none';
    }

    if (e.target.closest('#btn-logout')) {
        session = null;
        localStorage.removeItem('ducell_session');
        updateNavbarSession();
        showToast("Sessão encerrada com sucesso.");
        showView('view-home');
    }
});

// --- CATALOG RENDERING & SEARCH ---
function renderProducts(filteredProducts) {
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products-msg" style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem; color: var(--text-secondary);">
                <i class="fa-solid fa-ban" style="font-size: 2.5rem; margin-bottom: 1rem; display: block; color: var(--text-muted);"></i>
                <p>Nenhum smartphone encontrado com os filtros selecionados.</p>
            </div>
        `;
        return;
    }

    filteredProducts.forEach(product => {
        const hasStock = product.stock > 0;
        const isLowStock = product.stock > 0 && product.stock <= 5;
        
        let stockBadgeHtml = '';
        if (!hasStock) {
            stockBadgeHtml = `<span class="card-stock-status stock-out">Esgotado</span>`;
        } else if (isLowStock) {
            stockBadgeHtml = `<span class="card-stock-status stock-low">Poucas unidades</span>`;
        }

        // Image fallback handler renders placeholder in case target file not found
        const fallbackId = `fallback-card-${product.id}`;
        const imgId = `img-card-${product.id}`;

        const card = document.createElement('div');
        card.className = `product-card ${!hasStock ? 'disabled-card' : ''}`;
        card.innerHTML = `
            ${stockBadgeHtml}
            <div class="card-img-wrapper">
                <img id="${imgId}" src="${product.image}" alt="${product.name}" class="card-img" 
                     onerror="document.getElementById('${imgId}').style.display='none'; document.getElementById('${fallbackId}').style.display='flex';">
                
                <div id="${fallbackId}" class="phone-fallback-box" style="display:none; flex-direction:column; align-items:center; justify-content:center; width:100%; height:100%; border-radius:8px; background:linear-gradient(135deg, #f5f5f7, #e5e5ea);">
                    <i class="fa-solid fa-mobile-screen-button phone-placeholder-icon"></i>
                    <span style="font-size:0.75rem; font-weight:600; color:var(--text-secondary); text-transform:uppercase; margin-top:0.5rem;">${product.brand}</span>
                </div>
            </div>
            <div class="card-info">
                <span class="card-brand">${product.brand}</span>
                <h3 class="card-title">${product.name}</h3>
                <p class="card-desc">${product.description}</p>
                <div class="card-footer">
                    <div class="card-price-box">
                        <span class="card-price-label">A partir de</span>
                        <span class="card-price">${formatCurrency(product.price)}</span>
                    </div>
                    <button class="btn-card-buy add-to-cart-btn" data-id="${product.id}" ${!hasStock ? 'disabled' : ''} title="Adicionar ao Carrinho">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;

        // Click on card displays detail (except if clicking add to cart button)
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.add-to-cart-btn')) {
                renderProductDetail(product.id);
            }
        });

        productsGrid.appendChild(card);
    });
}

function filterAndSearchProducts() {
    const query = searchInput.value.toLowerCase().trim();
    
    const filtered = products.filter(p => {
        const matchesBrand = (currentFilter === 'all' || p.brand.toLowerCase() === currentFilter.toLowerCase());
        const matchesQuery = p.name.toLowerCase().includes(query) || 
                             p.brand.toLowerCase().includes(query) || 
                             p.description.toLowerCase().includes(query);
        return matchesBrand && matchesQuery;
    });

    renderProducts(filtered);
}

// Attach filters listeners
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.getAttribute('data-brand');
        filterAndSearchProducts();
    });
});

searchInput.addEventListener('input', filterAndSearchProducts);

// --- PRODUCT DETAIL RENDER ---
function renderProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        showToast("Produto não encontrado.", true);
        return;
    }

    const hasStock = product.stock > 0;
    const isLowStock = product.stock > 0 && product.stock <= 5;
    
    let stockIndicatorHtml = '';
    if (!hasStock) {
        stockIndicatorHtml = `<span class="detail-stock-indicator out-of-stock"><i class="fa-solid fa-circle-xmark"></i> Produto esgotado</span>`;
    } else if (isLowStock) {
        stockIndicatorHtml = `<span class="detail-stock-indicator low-stock"><i class="fa-solid fa-circle-exclamation"></i> Poucas unidades em estoque (${product.stock} restantes)</span>`;
    } else {
        stockIndicatorHtml = `<span class="detail-stock-indicator in-stock"><i class="fa-solid fa-circle-check"></i> Em estoque (${product.stock} disponíveis)</span>`;
    }

    const fallbackId = `fallback-detail-${product.id}`;
    const imgId = `img-detail-${product.id}`;

    productDetailContent.innerHTML = `
        <div class="detail-grid">
            <div class="detail-img-panel">
                <img id="${imgId}" src="${product.image}" alt="${product.name}" class="detail-img" 
                     onerror="document.getElementById('${imgId}').style.display='none'; document.getElementById('${fallbackId}').style.display='flex';">
                
                <div id="${fallbackId}" class="phone-fallback-box" style="display:none; flex-direction:column; align-items:center; justify-content:center; width:100%; height:100%; border-radius:12px; background:linear-gradient(135deg, #f5f5f7, #e5e5ea);">
                    <i class="fa-solid fa-mobile-screen-button phone-placeholder-icon" style="font-size:6rem;"></i>
                    <span style="font-size:1rem; font-weight:600; color:var(--text-secondary); text-transform:uppercase; margin-top:0.75rem;">${product.brand}</span>
                </div>
            </div>
            
            <div class="detail-info-panel">
                <span class="detail-brand">${product.brand}</span>
                <h1 class="detail-title">${product.name}</h1>
                <p class="detail-description">${product.description}</p>
                
                <div class="detail-specs-box">
                    <div class="spec-item">
                        <span class="spec-label">Conectividade</span>
                        <span class="spec-value">5G / Wi-Fi 6E / Bluetooth 5.3</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Garantia oficial</span>
                        <span class="spec-value">12 meses de garantia do fabricante</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Condição</span>
                        <span class="spec-value">Novo, Lacrado na Caixa</span>
                    </div>
                </div>

                <div class="detail-price-box">
                    <span class="detail-price-label">Preço à vista</span>
                    <span class="detail-price">${formatCurrency(product.price)}</span>
                </div>

                <div class="detail-actions">
                    <button class="btn-primary btn-large add-to-cart-btn-detail" data-id="${product.id}" ${!hasStock ? 'disabled' : ''}>
                        <i class="fa-solid fa-bag-shopping"></i> Adicionar ao Carrinho
                    </button>
                    ${stockIndicatorHtml}
                </div>
            </div>
        </div>
    `;

    // Add detail buy event listener
    const btnBuyDetail = productDetailContent.querySelector('.add-to-cart-btn-detail');
    if (btnBuyDetail) {
        btnBuyDetail.addEventListener('click', () => {
            addToCart(product.id);
            openCart();
        });
    }

    showView('view-product-detail');
}

// --- CART MANAGEMENT ---
function openCart() {
    cartDrawer.classList.add('active');
    cartDrawerOverlay.classList.add('active');
}

function closeCart() {
    cartDrawer.classList.remove('active');
    cartDrawerOverlay.classList.remove('active');
}

function updateCartBadge() {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalQty;
}

function saveCart() {
    localStorage.setItem('ducell_cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
}

function renderCart() {
    cartDrawerItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartDrawerItems.innerHTML = `
            <div class="cart-empty-state">
                <i class="fa-solid fa-bag-shopping cart-empty-icon"></i>
                <p>Seu carrinho está vazio.</p>
                <button class="btn-secondary" id="btn-cart-continue-shopping">Ver produtos</button>
            </div>
        `;
        cartSubtotal.textContent = formatCurrency(0);
        btnGoCheckout.disabled = true;

        const btnContinue = document.getElementById('btn-cart-continue-shopping');
        if (btnContinue) {
            btnContinue.addEventListener('click', () => {
                closeCart();
                showView('view-home');
            });
        }
        return;
    }

    btnGoCheckout.disabled = false;
    let subtotalSum = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return;

        const itemTotal = product.price * item.quantity;
        subtotalSum += itemTotal;

        const fallbackId = `fallback-cart-item-${product.id}`;
        const imgId = `img-cart-item-${product.id}`;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <img id="${imgId}" src="${product.image}" alt="${product.name}" class="cart-item-img"
                 onerror="document.getElementById('${imgId}').style.display='none'; document.getElementById('${fallbackId}').style.display='flex';">
            
            <div id="${fallbackId}" class="phone-fallback-box" style="display:none; flex-direction:column; align-items:center; justify-content:center; width:60px; height:60px; border-radius:6px; background-color:var(--bg-secondary); padding:4px;">
                <i class="fa-solid fa-mobile-screen-button" style="font-size:1.5rem; color:var(--text-muted);"></i>
            </div>

            <div class="cart-item-info">
                <h4 class="cart-item-title">${product.name}</h4>
                <div class="cart-item-price">${formatCurrency(product.price)}</div>
                
                <div class="cart-item-controls">
                    <div class="qty-control">
                        <button class="qty-btn btn-qty-dec" data-id="${product.id}">-</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn btn-qty-inc" data-id="${product.id}">+</button>
                    </div>
                    <button class="cart-item-remove btn-qty-remove" data-id="${product.id}">Remover</button>
                </div>
            </div>
        `;

        cartDrawerItems.appendChild(cartItemDiv);
    });

    cartSubtotal.textContent = formatCurrency(subtotalSum);

    // Quantity adjustments listeners
    cartDrawerItems.querySelectorAll('.btn-qty-dec').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            changeCartQty(id, -1);
        });
    });

    cartDrawerItems.querySelectorAll('.btn-qty-inc').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            changeCartQty(id, 1);
        });
    });

    cartDrawerItems.querySelectorAll('.btn-qty-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(id);
        });
    });
}

function addToCart(productId, qty = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (product.stock <= 0) {
        showToast("Desculpe, este produto está temporariamente indisponível.", true);
        return;
    }

    const existingItem = cart.find(item => item.productId === productId);
    const currentQtyInCart = existingItem ? existingItem.quantity : 0;
    
    if (currentQtyInCart + qty > product.stock) {
        showToast(`Desculpe, limite de estoque atingido. Temos apenas ${product.stock} unidades.`, true);
        return;
    }

    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({ productId, quantity: qty });
    }

    saveCart();
    showToast(`${product.name} adicionado ao carrinho!`);
}

function changeCartQty(productId, delta) {
    const product = products.find(p => p.id === productId);
    const item = cart.find(i => i.productId === productId);
    if (!product || !item) return;

    const newQty = item.quantity + delta;

    if (newQty <= 0) {
        removeFromCart(productId);
        return;
    }

    if (newQty > product.stock) {
        showToast(`Limite de estoque atingido (${product.stock} unidades).`, true);
        return;
    }

    item.quantity = newQty;
    saveCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    saveCart();
    showToast("Produto removido do carrinho.");
}

// Global button buy click handler delegation
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart-btn');
    if (btn) {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'));
        addToCart(id);
    }
});

// --- AUTHENTICATION FLOW (LOGIN & REGISTER) ---
tabLogin.addEventListener('click', () => {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    formLogin.classList.add('active');
    formRegister.classList.remove('active');
});

tabRegister.addEventListener('click', () => {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    formRegister.classList.add('active');
    formLogin.classList.remove('active');
});

// Form login submit
formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const userOrEmail = loginUsernameInput.value.trim();
    const password = loginPasswordInput.value;

    // Admin testing account bypass
    if (userOrEmail === 'admin' && password === 'admin123') {
        session = { username: 'admin', name: 'Administrador CMS', role: 'admin' };
        localStorage.setItem('ducell_session', JSON.stringify(session));
        updateNavbarSession();
        showToast("Logado como Administrador!");
        // Load CMS dashboard
        initCMS();
        showView('view-admin');
        formLogin.reset();
        return;
    }

    // Regular users checking
    const foundUser = users.find(u => (u.username === userOrEmail || u.email === userOrEmail) && u.password === password);
    if (foundUser) {
        session = { username: foundUser.username, name: foundUser.name, role: 'user' };
        localStorage.setItem('ducell_session', JSON.stringify(session));
        updateNavbarSession();
        showToast(`Bem vindo de volta, ${foundUser.name}!`);
        
        // Return to home or checkout if cart is not empty
        if (cart.length > 0) {
            initCheckout();
            showView('view-checkout');
        } else {
            showView('view-home');
        }
        formLogin.reset();
    } else {
        showToast("Usuário ou senha incorretos.", true);
    }
});

// Form register submit
formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value.trim();
    const username = document.getElementById('register-username').value.trim().toLowerCase();
    const email = document.getElementById('register-email').value.trim().toLowerCase();
    const password = document.getElementById('register-password').value;

    if (password.length < 6) {
        showToast("A senha precisa ter pelo menos 6 caracteres.", true);
        return;
    }

    // Check if username/email already exists
    if (username === 'admin' || users.some(u => u.username === username)) {
        showToast("Este nome de usuário já está em uso.", true);
        return;
    }
    if (users.some(u => u.email === email)) {
        showToast("Este e-mail já está cadastrado.", true);
        return;
    }

    const newUser = { name, username, email, password, role: 'user' };
    users.push(newUser);
    localStorage.setItem('ducell_users', JSON.stringify(users));

    showToast("Cadastro realizado! Faça login com seus dados.");
    // Switch to login tab automatically
    formRegister.reset();
    tabLogin.click();
    loginUsernameInput.value = username;
});

// --- CHECKOUT SIMULATION ---
let selectedPaymentMethod = 'credit-card';

// Switch payment method inputs
document.querySelectorAll('input[name="payment-method"]').forEach(input => {
    input.addEventListener('change', (e) => {
        selectedPaymentMethod = e.target.value;
        
        // Hide all fields
        document.getElementById('payment-credit-card').style.display = 'none';
        document.getElementById('payment-pix').style.display = 'none';
        document.getElementById('payment-boleto').style.display = 'none';
        
        // Uncheck active label classes
        document.querySelectorAll('.payment-option-label').forEach(lbl => lbl.classList.remove('active'));
        e.target.closest('.payment-option-label').classList.add('active');

        // Show active payment fields
        if (selectedPaymentMethod === 'credit-card') {
            document.getElementById('payment-credit-card').style.display = 'block';
            pixDiscountRow.style.display = 'none';
        } else if (selectedPaymentMethod === 'pix') {
            document.getElementById('payment-pix').style.display = 'block';
            pixDiscountRow.style.display = 'flex';
        } else if (selectedPaymentMethod === 'boleto') {
            document.getElementById('payment-boleto').style.display = 'block';
            pixDiscountRow.style.display = 'none';
        }

        recalculateCheckoutTotals();
    });
});

function calculateTotals() {
    let subtotal = 0;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
            subtotal += product.price * item.quantity;
        }
    });

    let discount = 0;
    if (selectedPaymentMethod === 'pix') {
        discount = subtotal * 0.05; // 5% Pix discount
    }

    const total = subtotal - discount;
    return { subtotal, discount, total };
}

function recalculateCheckoutTotals() {
    const { subtotal, discount, total } = calculateTotals();
    
    checkoutSubtotal.textContent = formatCurrency(subtotal);
    checkoutDiscount.textContent = `- ${formatCurrency(discount)}`;
    checkoutTotal.textContent = formatCurrency(total);
}

function initCheckout() {
    checkoutItemsList.innerHTML = '';
    
    let subtotalSum = 0;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return;

        subtotalSum += product.price * item.quantity;

        const fallbackId = `fallback-chk-item-${product.id}`;
        const imgId = `img-chk-item-${product.id}`;

        const row = document.createElement('div');
        row.className = 'checkout-item-row';
        row.innerHTML = `
            <img id="${imgId}" src="${product.image}" alt="${product.name}" class="checkout-item-img"
                 onerror="document.getElementById('${imgId}').style.display='none'; document.getElementById('${fallbackId}').style.display='flex';">
            
            <div id="${fallbackId}" class="phone-fallback-box" style="display:none; flex-direction:column; align-items:center; justify-content:center; width:44px; height:44px; border-radius:4px; background-color:var(--bg-secondary); padding:2px;">
                <i class="fa-solid fa-mobile-screen-button" style="font-size:1.1rem; color:var(--text-muted);"></i>
            </div>

            <div class="checkout-item-details">
                <h4 class="checkout-item-name">${product.name}</h4>
                <span class="checkout-item-qty">Qtd: ${item.quantity}</span>
            </div>
            <div class="checkout-item-price">${formatCurrency(product.price * item.quantity)}</div>
        `;
        checkoutItemsList.appendChild(row);
    });

    // Generate credit card installment options
    cardInstallmentsSelect.innerHTML = '';
    for (let i = 1; i <= 12; i++) {
        const installmentVal = subtotalSum / i;
        const interestText = i <= 6 ? 'sem juros' : 'com juros de 1.99% a.m.';
        const installmentText = `${i}x de ${formatCurrency(installmentVal)} ${interestText}`;
        
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = installmentText;
        cardInstallmentsSelect.appendChild(opt);
    }

    recalculateCheckoutTotals();
}

// Copy Pix key simulation
document.getElementById('btn-copy-pix').addEventListener('click', () => {
    const keyVal = document.getElementById('pix-key-val');
    keyVal.select();
    keyVal.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(keyVal.value);
    showToast("Chave Pix copiada!");
});

// Submit simulated order
btnSubmitOrder.addEventListener('click', () => {
    // Check if session exists, otherwise redirect to Auth
    if (!session) {
        showToast("Faça login ou cadastre-se para finalizar sua compra.", true);
        showView('view-auth');
        return;
    }

    // Validate shipping fields
    const cep = document.getElementById('checkout-cep').value.trim();
    const street = document.getElementById('checkout-street').value.trim();
    const number = document.getElementById('checkout-number').value.trim();
    const city = document.getElementById('checkout-city').value.trim();
    const state = document.getElementById('checkout-state').value.trim();

    if (!cep || !street || !number || !city || !state) {
        showToast("Por favor, preencha todos os campos do endereço.", true);
        return;
    }

    // Credit Card validation check
    if (selectedPaymentMethod === 'credit-card') {
        const cardNum = document.getElementById('card-number').value.trim();
        const cardName = document.getElementById('card-name').value.trim();
        const cardExpiry = document.getElementById('card-expiry').value.trim();
        const cardCvv = document.getElementById('card-cvv').value.trim();

        if (!cardNum || !cardName || !cardExpiry || !cardCvv) {
            showToast("Por favor, preencha os dados do cartão de crédito.", true);
            return;
        }
    }

    // Deduct stock levels and save
    let stockValid = true;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
            if (product.stock < item.quantity) {
                showToast(`Desculpe, o item ${product.name} esgotou em estoque no meio do processo.`, true);
                stockValid = false;
            }
        }
    });

    if (!stockValid) return;

    // Complete deduction
    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
            product.stock -= item.quantity;
        }
    });
    localStorage.setItem('ducell_products', JSON.stringify(products));

    // Calculate totals
    const totals = calculateTotals();
    
    // Save order
    const orderId = `LC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
        id: orderId,
        user: session.name,
        address: `${street}, Nº ${number} - ${city}/${state}`,
        total: totals.total,
        method: selectedPaymentMethod === 'credit-card' ? 'Cartão' : selectedPaymentMethod === 'pix' ? 'Pix' : 'Boleto',
        date: new Date().toLocaleDateString('pt-BR')
    };

    orders.push(newOrder);
    localStorage.setItem('ducell_orders', JSON.stringify(orders));

    // Clear cart
    cart = [];
    localStorage.removeItem('ducell_cart');
    updateCartBadge();

    // Render success view details
    successOrderId.textContent = `#${orderId}`;
    successPaymentMethod.textContent = newOrder.method;
    successTotal.textContent = formatCurrency(totals.total);

    showView('view-success');
    showToast("Compra finalizada com sucesso!");
});

// --- ADMIN PANEL (CMS) ---
function initCMS() {
    updateCMSStats();
    renderCMSProducts();
    renderCMSOrders();
}

function updateCMSStats() {
    const totalSalesSum = orders.reduce((sum, o) => sum + o.total, 0);
    statSales.textContent = formatCurrency(totalSalesSum);
    statProductsCount.textContent = products.length;
    statOrdersCount.textContent = orders.length;
}

function renderCMSProducts() {
    cmsProductsList.innerHTML = '';
    
    if (products.length === 0) {
        cmsProductsList.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: var(--text-secondary); padding: 2rem;">
                    Nenhum produto cadastrado no momento.
                </td>
            </tr>
        `;
        return;
    }

    products.forEach(p => {
        const fallbackId = `fallback-cms-${p.id}`;
        const imgId = `img-cms-${p.id}`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <img id="${imgId}" src="${p.image}" alt="${p.name}" class="cms-img"
                     onerror="document.getElementById('${imgId}').style.display='none'; document.getElementById('${fallbackId}').style.display='flex';">
                
                <div id="${fallbackId}" class="phone-fallback-box" style="display:none; flex-direction:column; align-items:center; justify-content:center; width:44px; height:44px; border-radius:4px; background-color:var(--bg-secondary); padding:2px;">
                    <i class="fa-solid fa-mobile-screen-button" style="font-size:1.1rem; color:var(--text-muted);"></i>
                </div>
            </td>
            <td style="font-weight: 600;">${p.name}</td>
            <td>${p.brand}</td>
            <td>${formatCurrency(p.price)}</td>
            <td>${p.stock} un</td>
            <td>
                <button class="cms-action-btn edit btn-cms-edit" data-id="${p.id}" title="Editar"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="cms-action-btn delete btn-cms-delete" data-id="${p.id}" title="Excluir"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;

        // Action edit listener
        tr.querySelector('.btn-cms-edit').addEventListener('click', () => {
            openProductModal(p.id);
        });

        // Action delete listener
        tr.querySelector('.btn-cms-delete').addEventListener('click', () => {
            if (confirm(`Tem certeza que deseja excluir o smartphone "${p.name}" do catálogo?`)) {
                deleteProduct(p.id);
            }
        });

        cmsProductsList.appendChild(tr);
    });
}

function renderCMSOrders() {
    cmsOrdersList.innerHTML = '';
    
    if (orders.length === 0) {
        cmsOrdersList.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: var(--text-secondary); padding: 2rem;">
                    Nenhum pedido realizado até o momento.
                </td>
            </tr>
        `;
        return;
    }

    // Display newest orders first
    [...orders].reverse().forEach(o => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${o.id}</td>
            <td style="font-weight: 600;">${o.user}</td>
            <td style="font-size: 0.8rem; max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${o.address}">${o.address}</td>
            <td>${formatCurrency(o.total)}</td>
            <td><span class="badge-payment">${o.method}</span></td>
            <td>${o.date}</td>
        `;
        cmsOrdersList.appendChild(tr);
    });
}

// Product Modal logic
function openProductModal(productId = null) {
    formProduct.reset();
    customBrandGroup.style.display = 'none';
    prodImageCustom.style.display = 'none';

    if (productId) {
        modalTitle.textContent = "Editar Produto";
        const product = products.find(p => p.id === productId);
        if (product) {
            document.getElementById('prod-id').value = product.id;
            document.getElementById('prod-name').value = product.name;
            document.getElementById('prod-price').value = product.price;
            document.getElementById('prod-stock').value = product.stock;
            document.getElementById('prod-description').value = product.description;

            // Brand selection matching
            const brandSelect = document.getElementById('prod-brand');
            const predefinedBrands = ['Apple', 'Samsung', 'Xiaomi'];
            if (predefinedBrands.includes(product.brand)) {
                brandSelect.value = product.brand;
            } else {
                brandSelect.value = 'Outro';
                customBrandGroup.style.display = 'block';
                document.getElementById('prod-custom-brand').value = product.brand;
            }

            // Image selection matching
            const imageSelect = document.getElementById('prod-image');
            const predefinedImages = ['images/iphone15.png', 'images/s24ultra.png', 'images/xiaomi14.png', 'images/iphone13.png'];
            if (predefinedImages.includes(product.image)) {
                imageSelect.value = product.image;
            } else {
                imageSelect.value = 'custom';
                prodImageCustom.style.display = 'block';
                prodImageCustom.value = product.image;
            }
        }
    } else {
        modalTitle.textContent = "Adicionar Novo Produto";
        document.getElementById('prod-id').value = '';
    }

    productModal.classList.add('active');
}

// Modal closing
document.getElementById('btn-close-product-modal').addEventListener('click', () => {
    productModal.classList.remove('active');
});

// Brand selection dropdown conditional visibility
prodBrand.addEventListener('change', () => {
    if (prodBrand.value === 'Outro') {
        customBrandGroup.style.display = 'block';
    } else {
        customBrandGroup.style.display = 'none';
    }
});

// Image selection dropdown conditional visibility
prodImage.addEventListener('change', () => {
    if (prodImage.value === 'custom') {
        prodImageCustom.style.display = 'block';
    } else {
        prodImageCustom.style.display = 'none';
    }
});

// Add modal triggers
document.getElementById('btn-add-product-modal').addEventListener('click', () => openProductModal());

// Form submit Save Product
formProduct.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const idInput = document.getElementById('prod-id').value;
    const name = document.getElementById('prod-name').value.trim();
    const price = parseFloat(document.getElementById('prod-price').value);
    const stock = parseInt(document.getElementById('prod-stock').value);
    const description = document.getElementById('prod-description').value.trim();
    
    // Brand resolver
    let brand = prodBrand.value;
    if (brand === 'Outro') {
        brand = document.getElementById('prod-custom-brand').value.trim() || 'Outro';
    }

    // Image resolver
    let image = prodImage.value;
    if (image === 'custom') {
        image = prodImageCustom.value.trim() || 'images/iphone15.png';
    }

    if (idInput) {
        // Edit mode
        const pId = parseInt(idInput);
        const index = products.findIndex(p => p.id === pId);
        if (index !== -1) {
            products[index] = { id: pId, name, brand, price, image, stock, description };
            showToast("Smartphone editado com sucesso!");
        }
    } else {
        // Create mode
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProduct = { id: newId, name, brand, price, image, stock, description };
        products.push(newProduct);
        showToast("Novo smartphone adicionado ao catálogo!");
    }

    localStorage.setItem('ducell_products', JSON.stringify(products));
    productModal.classList.remove('active');
    
    // Re-render views
    filterAndSearchProducts();
    initCMS();
});

function deleteProduct(productId) {
    products = products.filter(p => p.id !== productId);
    localStorage.setItem('ducell_products', JSON.stringify(products));
    showToast("Smartphone excluído com sucesso!");
    
    // Clear deleted product from cart if there
    cart = cart.filter(item => item.productId !== productId);
    saveCart();
    
    filterAndSearchProducts();
    initCMS();
}

// CMS Sub tabs toggling
tabCmsProducts.addEventListener('click', () => {
    tabCmsProducts.classList.add('active');
    tabCmsOrders.classList.remove('active');
    cmsProductsPanel.classList.add('active');
    cmsOrdersPanel.classList.remove('active');
});

tabCmsOrders.addEventListener('click', () => {
    tabCmsOrders.classList.add('active');
    tabCmsProducts.classList.remove('active');
    cmsOrdersPanel.classList.add('active');
    cmsProductsPanel.classList.remove('active');
});

document.getElementById('btn-admin-logout').addEventListener('click', () => {
    session = null;
    localStorage.removeItem('ducell_session');
    updateNavbarSession();
    showToast("Sessão do Painel encerrada.");
    showView('view-home');
});

// --- GLOBAL EVENT LISTENERS & SETUP ---

// Go to Checkout transition
btnGoCheckout.addEventListener('click', () => {
    closeCart();
    if (!session) {
        showToast("Por favor, faça login para continuar para o checkout.", true);
        showView('view-auth');
    } else {
        initCheckout();
        showView('view-checkout');
    }
});

// Drawer toggle open/close
btnToggleCart.addEventListener('click', openCart);
document.getElementById('btn-close-cart').addEventListener('click', closeCart);
cartDrawerOverlay.addEventListener('click', closeCart);

// Back home buttons
document.getElementById('btn-back-to-home').addEventListener('click', () => showView('view-home'));
btnSuccessHome.addEventListener('click', () => showView('view-home'));
document.getElementById('brand-link').addEventListener('click', (e) => {
    e.preventDefault();
    showView('view-home');
});

// CMS access check
btnAdminDashboard.addEventListener('click', () => {
    if (session && session.role === 'admin') {
        initCMS();
        showView('view-admin');
    } else {
        showToast("Acesso restrito para administradores.", true);
    }
});

// Initial boot logic
window.addEventListener('DOMContentLoaded', () => {
    updateNavbarSession();
    updateCartBadge();
    renderProducts(products);
    renderCart();
});
