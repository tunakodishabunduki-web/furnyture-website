/* ============================================================
   FURNITURE EMPIRE — MAIN APP JS v3.0
   ============================================================ */

/* ──────────────────────────────────────────────────────────
   PRODUCT DATA (synced with localStorage so admin changes persist)
────────────────────────────────────────────────────────── */
const DEFAULT_PRODUCTS = [
  { id:1,  name:"Ravello Sofa",          cat:"Living Room", style:"Contemporary", price:2840, oldPrice:3400, badge:"hot",  rating:4.8, reviews:124, desc:"Sink into cloud-like comfort. Hand-crafted linen upholstery meets precision joinery. Available in sage, cream, and cognac.",      imgA:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80", imgB:"https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80" },
  { id:2,  name:"Meridian Dining Table", cat:"Dining",      style:"Scandinavian", price:1650, oldPrice:null, badge:"new",  rating:4.9, reviews:87,  desc:"Scandinavian precision meets raw oak warmth. Seats 6–8 with leaf extension. Solid oak with hand-oiled finish.",               imgA:"https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=600&q=80", imgB:"https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=600&q=80" },
  { id:3,  name:"Lumina Floor Lamp",     cat:"Lighting",    style:"Art Deco",     price:480,  oldPrice:600,  badge:"sale", rating:4.7, reviews:203, desc:"Sculptural brass body with hand-blown glass shade. Dimmable. A statement in every room.",                                        imgA:"https://images.unsplash.com/photo-1513506003901-1e6a35ee2d25?auto=format&fit=crop&w=600&q=80", imgB:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80" },
  { id:4,  name:"Vero Lounge Chair",     cat:"Living Room", style:"Mid-Century",  price:1290, oldPrice:null, badge:"hot",  rating:4.9, reviews:156, desc:"Icon reborn. Deep button tufting, solid walnut legs, and sumptuous velvet. Available in cognac and forest green.",              imgA:"https://images.unsplash.com/photo-1551298370-9d3d53740c72?auto=format&fit=crop&w=600&q=80", imgB:"https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=600&q=80" },
  { id:5,  name:"Serene Bed Frame",      cat:"Bedroom",     style:"Japandi",      price:2100, oldPrice:2600, badge:"sale", rating:4.8, reviews:98,  desc:"Japandi minimalism distilled into solid walnut. Low-profile with woven headboard. Available in Queen and King.",                imgA:"https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=600&q=80", imgB:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80" },
  { id:6,  name:"Cosmo Coffee Table",    cat:"Living Room", style:"Contemporary", price:760,  oldPrice:null, badge:"new",  rating:4.7, reviews:112, desc:"Carrara marble top on a powder-coated base. The room's quiet centerpiece. Available in black and brass bases.",                imgA:"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80", imgB:"https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=600&q=80" },
  { id:7,  name:"Atlas Bookshelf",       cat:"Office",      style:"Industrial",   price:920,  oldPrice:null, badge:"new",  rating:4.6, reviews:64,  desc:"Open-frame industrial shelving with powder-coated steel and solid mango wood shelves. 6-tier.",                               imgA:"https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80", imgB:"https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80" },
  { id:8,  name:"Basalt Desk",           cat:"Office",      style:"Industrial",   price:1440, oldPrice:1700, badge:"sale", rating:4.7, reviews:71,  desc:"Cast concrete top on a blackened steel frame. The serious maker's desk. Cable management built in.",                          imgA:"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=600&q=80", imgB:"https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=600&q=80" },
  { id:9,  name:"Drift Bar Stool",       cat:"Dining",      style:"Scandinavian", price:340,  oldPrice:420,  badge:"sale", rating:4.5, reviews:87,  desc:"Counter-height ash wood stools with swivel seat. Set of 2. Seat height: 65cm. Max load: 120kg.",                              imgA:"https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=600&q=80", imgB:"https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=600&q=80" },
  { id:10, name:"Ethos Wardrobe",        cat:"Bedroom",     style:"Japandi",      price:1870, oldPrice:null, badge:"hot",  rating:4.8, reviews:55,  desc:"Sliding panel wardrobe in smoked oak veneer. Interior modular configuration. 220 × 60 × 230cm.",                             imgA:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80", imgB:"https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=600&q=80" },
  { id:11, name:"Vivid Side Table",      cat:"Living Room", style:"Mid-Century",  price:290,  oldPrice:null, badge:"hot",  rating:4.6, reviews:134, desc:"Hand-thrown ceramic base with tempered glass top. Each piece uniquely imperfect. Two sizes available.",                       imgA:"https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=600&q=80", imgB:"https://images.unsplash.com/photo-1551298370-9d3d53740c72?auto=format&fit=crop&w=600&q=80" },
  { id:12, name:"Haven Outdoor Sofa",    cat:"Living Room", style:"Modern",       price:3200, oldPrice:null, badge:"new",  rating:4.9, reviews:43,  desc:"Weather-resilient teak frame with Sunbrella® cushions. Built for seasons. Modular configuration.",                          imgA:"https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80", imgB:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80" },
];

/* ──────────────────────────────────────────────────────────
   STATE
────────────────────────────────────────────────────────── */
let products     = [];
let cart         = [];
let wishlist     = [];
let currentCat   = 'All';
let arItems      = [];
let arSelected   = null;
let arDragging   = null;
let arDragOffset = { x:0, y:0 };
let adminTriggerCount = 0;
let adminTriggerTimer = null;
let secretKeyBuffer  = '';
let secretKeyTimer   = null;

/* ──────────────────────────────────────────────────────────
   INIT
────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  loadCart();
  loadTheme();
  renderNewArrivals();
  renderBestsellers();
  renderCatalog();
  initScrollReveal();
  initNav();
  initSearch();
  initCart();
  initAdminTrigger();
  initKeyboardShortcut();
  updateCartUI();
});

/* ──────────────────────────────────────────────────────────
   PRODUCT LOADING
────────────────────────────────────────────────────────── */
function loadProducts() {
  const stored = localStorage.getItem('fe_products');
  products = stored ? JSON.parse(stored) : DEFAULT_PRODUCTS;
}

function saveProducts() {
  localStorage.setItem('fe_products', JSON.stringify(products));
}

/* ──────────────────────────────────────────────────────────
   PAGE NAVIGATION
────────────────────────────────────────────────────────── */
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top:0, behavior:'smooth' });
    if (page === 'catalog') {
      renderCatalog();
      initScrollReveal();
    }
  }
}

/* ──────────────────────────────────────────────────────────
   PRODUCT CARD BUILDER
────────────────────────────────────────────────────────── */
function buildProductCard(p, delay = 0) {
  const isWished = wishlist.includes(p.id);
  const stars = buildStars(p.rating);
  const badge = p.badge ? `<span class="prod-badge prod-badge-${p.badge}">${p.badge === 'new' ? 'New' : p.badge === 'sale' ? 'Sale' : 'Hot'}</span>` : '';
  const oldPrice = p.oldPrice ? `<span class="prod-old-price">$${p.oldPrice.toLocaleString()}</span>` : '';

  return `
    <div class="prod-card reveal reveal-d${(delay % 4) + 1}">
      <div class="prod-img-wrap">
        <img class="prod-img-primary" src="${p.imgA}" alt="${p.name}" loading="lazy" />
        <img class="prod-img-hover"   src="${p.imgB}" alt="${p.name}" loading="lazy" />
        ${badge}
        <button class="prod-wish${isWished ? ' active' : ''}" onclick="toggleWishlist(${p.id},this)" title="Wishlist">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="${isWished ? '#fff' : 'none'}" stroke="${isWished ? '#fff' : 'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <div class="prod-actions">
          <button class="prod-add" id="add-${p.id}" onclick="addToCart(${p.id},this)">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Add to Cart
          </button>
          <button class="prod-add" style="flex:0;padding:10px 12px;background:var(--text-2)" onclick="openQuickView(${p.id})">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>
      <div class="prod-info">
        <div class="prod-style">${p.style}</div>
        <div class="prod-name">${p.name}</div>
        <div class="prod-stars">${stars}<span class="prod-review-count">(${p.reviews})</span></div>
        <div class="prod-price-row">
          <span class="prod-price">$${p.price.toLocaleString()}</span>
          ${oldPrice}
        </div>
      </div>
    </div>`;
}

function buildStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.round(rating);
    html += `<svg width="12" height="12" viewBox="0 0 24 24" fill="${filled ? '#D4A053' : 'none'}" stroke="#D4A053" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  }
  return html;
}

/* ──────────────────────────────────────────────────────────
   RENDER GRIDS
────────────────────────────────────────────────────────── */
function renderNewArrivals() {
  const grid = document.getElementById('newArrivalsGrid');
  if (!grid) return;
  const items = products.filter(p => p.badge === 'new').slice(0, 4);
  if (!items.length) {
    const items2 = products.slice(0, 4);
    grid.innerHTML = items2.map((p, i) => buildProductCard(p, i)).join('');
  } else {
    grid.innerHTML = items.map((p, i) => buildProductCard(p, i)).join('');
  }
  initScrollReveal();
}

function renderBestsellers() {
  const grid = document.getElementById('bestsellersGrid');
  if (!grid) return;
  const items = products.filter(p => p.rating >= 4.8).slice(0, 4);
  grid.innerHTML = items.map((p, i) => buildProductCard(p, i)).join('');
  initScrollReveal();
}

/* ──────────────────────────────────────────────────────────
   CATALOG
────────────────────────────────────────────────────────── */
function renderCatalog() {
  const grid = document.getElementById('catalogGrid');
  if (!grid) return;

  const search = (document.getElementById('catalogSearch')?.value || '').toLowerCase();
  const sort   = document.getElementById('catalogSort')?.value || 'featured';

  let filtered = products.filter(p => {
    const catMatch  = currentCat === 'All' || p.cat === currentCat;
    const srcMatch  = !search || p.name.toLowerCase().includes(search) || p.style.toLowerCase().includes(search) || p.cat.toLowerCase().includes(search);
    return catMatch && srcMatch;
  });

  if (sort === 'price-asc')  filtered.sort((a,b) => a.price - b.price);
  if (sort === 'price-desc') filtered.sort((a,b) => b.price - a.price);
  if (sort === 'rating')     filtered.sort((a,b) => b.rating - a.rating);

  const count = document.getElementById('catalogCount');
  if (count) count.textContent = `${filtered.length} piece${filtered.length !== 1 ? 's' : ''}`;

  if (!filtered.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:80px 0;color:var(--muted)"><p style="font-family:Cormorant Garamond,serif;font-size:22px;font-style:italic">No pieces found</p><p style="font-size:13px;margin-top:8px">Try adjusting your filters</p></div>';
    return;
  }

  grid.innerHTML = filtered.map((p, i) => buildProductCard(p, i)).join('');
  initScrollReveal();
}

function filterCatalog(cat, btn) {
  currentCat = cat || currentCat;
  if (btn) {
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
  }
  renderCatalog();
}

/* ──────────────────────────────────────────────────────────
   QUICK VIEW MODAL
────────────────────────────────────────────────────────── */
function openQuickView(id) {
  const p = products.find(pr => pr.id === id);
  if (!p) return;

  const modal = document.getElementById('quickViewModal');
  const inner = document.getElementById('modalInner');

  const stars = buildStars(p.rating);
  const oldPrice = p.oldPrice ? `<span class="old-price">$${p.oldPrice.toLocaleString()}</span>` : '';

  inner.innerHTML = `
    <div class="modal-img">
      <img src="${p.imgA}" alt="${p.name}" />
    </div>
    <div class="modal-info">
      <span class="eyebrow">${p.style}</span>
      <h2 class="serif" style="font-family:'Cormorant Garamond',serif">${p.name}</h2>
      <div class="stars-row">${stars}<span style="font-size:12px;color:var(--subtle);margin-left:8px">(${p.reviews} reviews)</span></div>
      <div class="price-row">
        <span class="price">$${p.price.toLocaleString()}</span>
        ${oldPrice}
      </div>
      <p class="desc">${p.desc}</p>
      <button class="btn btn-primary add-to-cart" onclick="addToCart(${p.id},null);closeModal()" style="width:100%;justify-content:center;margin-bottom:12px">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/></svg>
        Add to Cart
      </button>
      <button class="btn btn-outline" onclick="toggleWishlist(${p.id},null)" style="width:100%;justify-content:center">
        Add to Wishlist
      </button>
    </div>`;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('quickViewModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.getElementById('quickViewModal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
});

/* ──────────────────────────────────────────────────────────
   CART
────────────────────────────────────────────────────────── */
function loadCart() {
  const stored = localStorage.getItem('fe_cart');
  cart = stored ? JSON.parse(stored) : [];
}

function saveCartData() {
  localStorage.setItem('fe_cart', JSON.stringify(cart));
}

function addToCart(id, btn) {
  const p = products.find(pr => pr.id === id);
  if (!p) return;

  const existing = cart.find(i => i.id === id);
  if (existing) { existing.qty++; } else { cart.push({ ...p, qty:1 }); }
  saveCartData();
  updateCartUI();

  // Button feedback
  if (btn) {
    btn.classList.add('added');
    btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Added';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/></svg> Add to Cart';
    }, 1800);
  }

  // Cart bounce
  const cartBtn = document.getElementById('cartBtn');
  cartBtn?.classList.remove('cart-bounce');
  void cartBtn?.offsetWidth;
  cartBtn?.classList.add('cart-bounce');
  setTimeout(() => cartBtn?.classList.remove('cart-bounce'), 500);

  showToast(`${p.name} added to cart`, 'cart');
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCartData();
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // Nav badge
  const badge = document.getElementById('cartCount');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }

  // Drawer head count
  const headCount = document.getElementById('cartHeadCount');
  if (headCount) headCount.textContent = count;

  // Drawer body
  const body = document.getElementById('cartBody');
  const foot = document.getElementById('cartFoot');
  const totalEl = document.getElementById('cartTotal');

  if (body) {
    if (!cart.length) {
      body.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></div><p>Your cart is empty</p></div>`;
      if (foot) foot.style.display = 'none';
    } else {
      body.innerHTML = cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-img"><img src="${item.imgA}" alt="${item.name}" /></div>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-style">${item.style}</div>
            <div class="cart-item-bottom">
              <span class="cart-item-price">$${(item.price * item.qty).toLocaleString()}</span>
              <div style="display:flex;align-items:center;gap:12px">
                <span class="cart-item-qty">×${item.qty}</span>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>`).join('');
      if (foot) foot.style.display = 'block';
      if (totalEl) totalEl.textContent = `$${total.toLocaleString()}`;
    }
  }
}

function initCart() {
  document.getElementById('cartBtn')?.addEventListener('click', () => {
    document.getElementById('cartOverlay')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  document.getElementById('cartClose')?.addEventListener('click', closeCart);
  document.getElementById('cartBackdrop')?.addEventListener('click', closeCart);
}

function closeCart() {
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function chatOnWhatsApp() {
  const phone = '255698741459'; // +255 698 741 459
  let message = 'Hello! I am interested in your furniture. ';

  if (cart.length > 0) {
    message += 'Here are the items in my cart:\n\n';
    cart.forEach(item => {
      message += `${item.name} (${item.style}) - Qty: ${item.qty} - $${(item.price * item.qty).toLocaleString()}\n`;
    });
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    message += `\nTotal: $${total.toLocaleString()}\n\n`;
  } else {
    message += 'I would like to inquire about your products.\n\n';
  }

  message += 'Please assist me with my order.';

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

/* ──────────────────────────────────────────────────────────
   WISHLIST
────────────────────────────────────────────────────────── */
function toggleWishlist(id, btn) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(i => i !== id);
    if (btn) { btn.classList.remove('active'); btn.querySelector('svg').setAttribute('fill','none'); }
    showToast('Removed from wishlist', 'heart');
  } else {
    wishlist.push(id);
    if (btn) { btn.classList.add('active'); btn.querySelector('svg').setAttribute('fill','#fff'); }
    showToast('Added to wishlist', 'heart');
  }
}

/* ──────────────────────────────────────────────────────────
   THEME
────────────────────────────────────────────────────────── */
function loadTheme() {
  const saved = localStorage.getItem('fe_theme') || 'light';
  applyTheme(saved);
}

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  const sun  = document.getElementById('iconSun');
  const moon = document.getElementById('iconMoon');
  if (sun)  sun.style.display  = t === 'dark'  ? 'block' : 'none';
  if (moon) moon.style.display = t === 'light' ? 'block' : 'none';
  localStorage.setItem('fe_theme', t);
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
});

/* ──────────────────────────────────────────────────────────
   NAV SCROLL
────────────────────────────────────────────────────────── */
function initNav() {
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Mobile menu
  document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
    document.getElementById('mobileMenu')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  document.getElementById('mobileMenuClose')?.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
  document.getElementById('mobileMenu')?.classList.remove('open');
  document.body.style.overflow = '';
}

/* ──────────────────────────────────────────────────────────
   SEARCH
────────────────────────────────────────────────────────── */
function initSearch() {
  document.getElementById('searchBtn')?.addEventListener('click', openSearch);
  document.getElementById('searchClose')?.addEventListener('click', closeSearch);

  const overlay = document.getElementById('searchOverlay');
  overlay?.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });

  document.getElementById('searchInput')?.addEventListener('input', e => {
    const q = e.target.value.trim();
    if (q.length < 2) {
      document.getElementById('searchContent').style.display = 'block';
      document.getElementById('searchResults').style.display = 'none';
    } else {
      doSearch(q);
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeSearch();
      closeCart();
      closeModal();
    }
  });
}

function openSearch() {
  document.getElementById('searchOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('searchInput')?.focus(), 80);
}

function closeSearch() {
  document.getElementById('searchOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
  if (document.getElementById('searchInput')) document.getElementById('searchInput').value = '';
  document.getElementById('searchContent').style.display = 'block';
  document.getElementById('searchResults').style.display = 'none';
}

function doSearch(q) {
  const input = document.getElementById('searchInput');
  if (input) input.value = q;

  const results = products.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.style.toLowerCase().includes(q.toLowerCase()) ||
    p.cat.toLowerCase().includes(q.toLowerCase())
  );

  document.getElementById('searchContent').style.display = 'none';
  const resultsEl = document.getElementById('searchResults');
  resultsEl.style.display = 'block';

  if (!results.length) {
    resultsEl.innerHTML = `<p style="color:var(--subtle);font-family:'Cormorant Garamond',serif;font-size:18px;font-style:italic;text-align:center;padding:32px 0">No results for "${q}"</p>`;
    return;
  }

  resultsEl.innerHTML = `
    <div class="search-label">${results.length} result${results.length !== 1 ? 's' : ''} for "${q}"</div>
    <div class="search-result-grid">
      ${results.slice(0,6).map(p => `
        <div class="search-result-item" onclick="closeSearch();openQuickView(${p.id})">
          <img src="${p.imgA}" alt="${p.name}" loading="lazy" />
          <div class="name">${p.name}</div>
          <div class="price">$${p.price.toLocaleString()}</div>
        </div>`).join('')}
    </div>`;
}

/* ──────────────────────────────────────────────────────────
   SCROLL REVEAL
────────────────────────────────────────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
}

/* ──────────────────────────────────────────────────────────
   NEWSLETTER
────────────────────────────────────────────────────────── */
function subscribeNewsletter(e) {
  e.preventDefault();
  document.querySelector('.newsletter-form').style.display = 'none';
  document.getElementById('newsletterSuccess').style.display = 'flex';
  showToast('Subscribed! Welcome to the Empire.', 'check');
}

/* ──────────────────────────────────────────────────────────
   TOAST
────────────────────────────────────────────────────────── */
function showToast(message, type = 'info') {
  const icons = {
    cart:  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/></svg>',
    heart: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
    warn:  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>',
  };
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icons[type] || ''}</span>${message}`;
  container.appendChild(toast);
  toast.addEventListener('click', () => dismissToast(toast));
  setTimeout(() => dismissToast(toast), 3500);
}

function dismissToast(toast) {
  toast.classList.add('removing');
  setTimeout(() => toast.remove(), 300);
}

/* ──────────────────────────────────────────────────────────
   AR PLANNER
────────────────────────────────────────────────────────── */
function arAddPiece(piece) {
  const uid = Date.now() + Math.random();
  const item = { ...piece, uid, x:60, y:60, scale:1, rotation:0 };
  arItems.push(item);
  arSelected = uid;
  renderArItems();
  arUpdateControls();
  document.getElementById('arEmpty')?.remove();
}

function renderArItems() {
  const canvas = document.getElementById('arCanvas');
  document.querySelectorAll('.ar-item').forEach(el => el.remove());

  arItems.forEach(item => {
    const el = document.createElement('div');
    el.className = `ar-item${item.uid === arSelected ? ' selected' : ''}`;
    el.dataset.uid = item.uid;
    el.style.cssText = `left:${item.x}px;top:${item.y}px;width:${item.w * item.scale}px;height:${item.h * item.scale}px;transform:rotate(${item.rotation}deg);font-size:${Math.max(22, 44 * item.scale)}px`;
    el.textContent = item.emoji;
    el.addEventListener('mousedown', e => arStartDrag(e, item.uid));
    el.addEventListener('click', e => { e.stopPropagation(); arSelected = item.uid; renderArItems(); arUpdateControls(); });
    canvas.appendChild(el);
  });

  const controls = document.getElementById('arControls');
  if (controls) controls.style.display = arSelected ? 'flex' : 'none';
}

function arStartDrag(e, uid) {
  e.preventDefault();
  const canvas = document.getElementById('arCanvas');
  const rect = canvas.getBoundingClientRect();
  const item = arItems.find(i => i.uid === uid);
  arDragOffset = { x: e.clientX - rect.left - item.x, y: e.clientY - rect.top - item.y };
  arDragging = uid;
  arSelected = uid;

  const onMove = (ev) => {
    if (!arDragging) return;
    const r = canvas.getBoundingClientRect();
    const nx = ev.clientX - r.left - arDragOffset.x;
    const ny = ev.clientY - r.top  - arDragOffset.y;
    const itm = arItems.find(i => i.uid === arDragging);
    if (itm) { itm.x = Math.max(0, nx); itm.y = Math.max(0, ny); renderArItems(); }
  };

  const onUp = () => { arDragging = null; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
}

function arUpdateScale(val) {
  const item = arItems.find(i => i.uid === arSelected);
  if (item) { item.scale = parseFloat(val); renderArItems(); }
  document.getElementById('arScaleVal').textContent = Math.round(val * 100);
}

function arUpdateRot(val) {
  const item = arItems.find(i => i.uid === arSelected);
  if (item) { item.rotation = parseInt(val); renderArItems(); }
  document.getElementById('arRotVal').textContent = val;
}

function arDeleteSelected() {
  arItems = arItems.filter(i => i.uid !== arSelected);
  arSelected = null;
  renderArItems();
  if (!arItems.length) {
    const canvas = document.getElementById('arCanvas');
    const empty = document.createElement('div');
    empty.className = 'ar-empty'; empty.id = 'arEmpty';
    empty.innerHTML = '<div class="ar-empty-icon">🪑</div><p>Add furniture from the panel</p>';
    canvas.appendChild(empty);
  }
}

function arUpdateControls() {
  const item = arItems.find(i => i.uid === arSelected);
  if (!item) return;
  document.getElementById('arSelEmoji').textContent = item.emoji;
  document.getElementById('arScaleSlider').value = item.scale;
  document.getElementById('arScaleVal').textContent = Math.round(item.scale * 100);
  document.getElementById('arRotSlider').value = item.rotation;
  document.getElementById('arRotVal').textContent = item.rotation;
}

// Deselect on canvas click
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('arCanvas')?.addEventListener('click', e => {
    if (e.target === e.currentTarget || e.target.classList.contains('ar-canvas-bg') || e.target.classList.contains('ar-floor')) {
      arSelected = null; renderArItems();
    }
  });
});

/* ──────────────────────────────────────────────────────────
   SECRET ADMIN TRIGGER
   Method 1: Click the ··· button 3 times within 2 seconds
   Method 2: Type "empire" anywhere on the page
   Method 3: Ctrl+Shift+A
────────────────────────────────────────────────────────── */
function initAdminTrigger() {
  // Method 1: Three-dot button
  const trigger = document.getElementById('adminTrigger');
  if (trigger) {
    trigger.addEventListener('click', () => {
      adminTriggerCount++;
      clearTimeout(adminTriggerTimer);
      if (adminTriggerCount >= 3) {
        adminTriggerCount = 0;
        openAdminLogin();
        return;
      }
      adminTriggerTimer = setTimeout(() => { adminTriggerCount = 0; }, 2000);
    });
  }
}

function initKeyboardShortcut() {
  // Method 2: Type secret word
  document.addEventListener('keypress', e => {
    secretKeyBuffer += e.key.toLowerCase();
    if (secretKeyBuffer.length > 8) secretKeyBuffer = secretKeyBuffer.slice(-8);
    clearTimeout(secretKeyTimer);
    secretKeyTimer = setTimeout(() => { secretKeyBuffer = ''; }, 3000);
    if (secretKeyBuffer.includes('empire')) {
      secretKeyBuffer = '';
      openAdminLogin();
    }
  });

  // Method 3: Ctrl+Shift+A
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      e.preventDefault();
      openAdminLogin();
    }
  });
}

function openAdminLogin() {
  // Navigate to admin panel
  window.location.href = 'admin/index.html';
}
