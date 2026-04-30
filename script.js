// WhatsApp Configuration
const WHATSAPP_NUMBER = "16134900811";

// Products Database
const products = [
    {
        id: 1,
        name: "EcoFlow River 2",
        price: 299.99,
        weight: "4.5 lbs",
        image: "https://cdn.shopify.com/s/files/1/0561/0415/6549/products/EF-RIVER2-UK-PortablePowerStation-1560x1372_8.jpg?v=1672278503",
        description: "Estación portátil de energía de 256Wh",
        specs: {
            "Capacidad": "256Wh",
            "Potencia": "600W",
            "Salidas": "6 puertos",
            "Peso": "4.5 lbs (2 kg)",
            "Tiempo de carga": "1 hora"
        }
    },
    {
        id: 2,
        name: "EcoFlow Delta 2",
        price: 799.99,
        weight: "14 lbs",
        image: "https://m.media-amazon.com/images/I/71HbF8zGDP-L._AC_SL1500_.jpg",
        description: "Estación de energía premium 1024Wh",
        specs: {
            "Capacidad": "1024Wh",
            "Potencia": "1800W",
            "Salidas": "15 puertos",
            "Peso": "14 lbs (6.4 kg)",
            "Tiempo de carga": "1.6 horas"
        }
    },
    {
        id: 3,
        name: "Panel Solar Portátil 110W",
        price: 199.99,
        weight: "6 lbs",
        image: "https://res.cloudinary.com/greenweee/image/upload/q_auto:low/s718zeobsbwo1ps9q4rb.jpg",
        description: "Panel solar plegable de alta eficiencia",
        specs: {
            "Potencia": "110W",
            "Eficiencia": "21.5%",
            "Peso": "6 lbs (2.7 kg)",
            "Dimensión plegada": "27 x 19 x 2 pulgadas",
            "Entrada USB": "Sí"
        }
    },
    {
        id: 4,
        name: "Panel Solar 160W NextGen",
        price: 349.99,
        weight: "9 lbs",
        image: "https://images.thdstatic.com/productImages/1d95d1d2-2b91-4b3c-9e39-7dbe564e2af7/svn/ecoflow-solar-panels-2ng160w-64_1000.jpg",
        description: "Panel solar de última generación con 25% eficiencia",
        specs: {
            "Potencia": "160W",
            "Eficiencia": "25%",
            "Peso": "9 lbs (4 kg)",
            "Voltaje": "21.3V",
            "Resistencia": "IP68 impermeable"
        }
    },
    {
        id: 5,
        name: "Baterías y Accesorios EcoFlow",
        price: 399.99,
        weight: "5 lbs",
        image: "https://es.ecoflow.com/cdn/shop/files/DELTA_3_Max-Plus_Smart_Extra_Battery.jpg?v=1686652787",
        description: "Kit completo de baterías y accesorios de expansión",
        specs: {
            "Capacidad": "2048Wh expandible",
            "Compatible": "Modelos DELTA",
            "Peso": "5 lbs (2.3 kg)",
            "Garantía": "11 años",
            "Incluye": "Cables y fundas"
        }
    },
    {
        id: 6,
        name: "Bicipower Evolution Topmac 48V 45Ah",
        price: 1299.99,
        weight: "65 lbs",
        image: "https://via.placeholder.com/400x300?text=Bicipower+Evolution+48V",
        description: "E-bike de alta potencia con autonomía extrema",
        specs: {
            "Voltaje": "48V",
            "Capacidad": "45Ah",
            "Velocidad máxima": "45-55 km/h",
            "Autonomía": "100-120 km",
            "Peso": "65 lbs (29 kg)"
        }
    },
    {
        id: 7,
        name: "Triciclo Eléctrico 75V 58Ah",
        price: 1599.99,
        weight: "120 lbs",
        image: "https://via.placeholder.com/400x300?text=Triciclo+Electrico+75V",
        description: "Triciclo de carga pesada con gran autonomía",
        specs: {
            "Voltaje": "75V",
            "Capacidad": "58Ah",
            "Motor": "2000W",
            "Velocidad máxima": "50 km/h",
            "Capacidad de carga": "1000 kg",
            "Autonomía": "80 km"
        }
    }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
});

// Render products to the grid
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" onclick="openProductDetail(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x300?text=${product.name}'">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-weight"><strong>Peso:</strong> ${product.weight}</p>
                <p class="product-description">${product.description}</p>
                <button class="btn-whatsapp" onclick="event.stopPropagation(); openWhatsApp('Estoy interesado en: ${product.name}')">
                    <i class="fab fa-whatsapp"></i> Solicitar
                </button>
            </div>
        </div>
    `).join('');
}

// Open product detail modal
function openProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('modalImage').src = product.image;
    
    const specsHtml = Object.entries(product.specs)
        .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
        .join('');
    document.getElementById('modalSpecs').innerHTML = specsHtml;

    document.getElementById('modalWhatsappBtn').onclick = () => {
        openWhatsApp(`Quiero comprar: ${product.name} ($${product.price.toFixed(2)}). Peso: ${product.weight}`);
    };

    document.getElementById('productModal').classList.add('show');
}

// Open WhatsApp with pre-written message
function openWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
}

// Setup event listeners
function setupEventListeners() {
    // Close modals when clicking X
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.onclick = function() {
            this.closest('.modal').classList.remove('show');
        };
    });

    // Close modals when clicking outside
    window.onclick = function(event) {
        const productModal = document.getElementById('productModal');
        const paymentModal = document.getElementById('paymentModal');
        
        if (event.target === productModal) {
            productModal.classList.remove('show');
        }
        if (event.target === paymentModal) {
            paymentModal.classList.remove('show');
        }
    };

    // Payment form submission
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.onsubmit = function(e) {
            e.preventDefault();
            alert('Pago procesado exitosamente. Serás redirigido a WhatsApp para confirmar tu pedido.');
            openWhatsApp('Acabo de procesar mi pago. Quiero confirmar mi orden.');
            document.getElementById('paymentModal').classList.remove('show');
            paymentForm.reset();
        };
    }
}

// Format credit card input
document.addEventListener('input', function(e) {
    if (e.target.placeholder === '1234 5678 9012 3456') {
        let value = e.target.value.replace(/\s+/g, '');
        value = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = value;
    }
    
    if (e.target.placeholder === 'MM/AA') {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    }
});

// Smooth scroll behavior for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .shipping-card, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});
