// iPhone 17 Landing Page - JavaScript

// Mobile menu toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Smooth scroll helper
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = 70;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition - bodyRect - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
}

// Pre-order handler
function handlePreOrder() {
    const btns = document.querySelectorAll('#buy button');
    
    btns.forEach(btn => {
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Processando...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '✓ Adicionado ao carrinho!';
            btn.style.backgroundColor = '#16a34a';
            btn.style.color = 'white';

            setTimeout(() => {
                // Reset
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
                btn.disabled = false;

                // Show confirmation alert
                showOrderConfirmation();
            }, 1800);
        }, 1200);
    });
}

// Order confirmation modal / alert
function showOrderConfirmation() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/60 flex items-center justify-center z-[100]';
    modal.innerHTML = `
        <div class="bg-white rounded-3xl max-w-sm w-full mx-4 p-8 text-center shadow-2xl">
            <div class="mx-auto w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </div>
            
            <h3 class="font-semibold text-2xl tracking-tight">Pedido confirmado!</h3>
            <p class="text-gray-600 mt-2 text-sm leading-relaxed">Obrigado! Seu iPhone 17 Pro Max será entregue entre 12 e 15 de setembro de 2026.</p>
            
            <div class="mt-6 text-xs text-gray-400">Número do pedido: #IP17-${Math.floor(100000 + Math.random() * 900000)}</div>
            
            <button onclick="this.closest('.fixed').remove()" 
                    class="mt-8 w-full bg-black text-white py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors">
                Voltar para a página
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Keyboard support for modal
document.addEventListener('keydown', function(e) {
    const videoModal = document.getElementById('video-modal');
    if (e.key === 'Escape' && videoModal && videoModal.open) {
        videoModal.close();
    }
});

// Console message
console.log('%c[iPhone 17] Landing page carregada com sucesso. Conceito fictício para 2026.', 'color:#666;font-size:10px');