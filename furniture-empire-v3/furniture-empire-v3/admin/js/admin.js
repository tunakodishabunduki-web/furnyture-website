/* ============================================================
   FURNITURE EMPIRE — ADMIN PANEL JS v3.0
   Full CRUD · Auth · Audit Log · Orders · Inventory
   ============================================================ */

/* ──────────────────────────────────────────────────────────
   CONSTANTS & STATE
────────────────────────────────────────────────────────── */
const DEFAULT_CREDENTIALS = { username: 'admin', password: 'empire2025' };
const SESSION_KEY  = 'fe_admin_session';
const PRODUCTS_KEY = 'fe_products';
const CREDS_KEY    = 'fe_admin_creds';
const AUDIT_KEY    = 'fe_audit_log';

let products        = [];
let auditLog        = [];
let deleteTargetId  = null;
let currentPage     = 'dashboard';

/* ──────────────────────────────────────────────────────────
   DEFAULT PRODUCTS (mirrored from storefront)
────────────────────────────────────────────────────────── */
const DEFAULT_PRODUCTS = [
  { id:1,  name:'Ravello Sofa',          cat:'Living Room', style:'Contemporary', price:2840, oldPrice:3400, badge:'hot',  rating:4.8, reviews:124, desc:'Sink into cloud-like comfort. Hand-crafted linen upholstery meets precision joinery.',      imgA:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80', imgB:'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80' },
  { id:2,  name:'Meridian Dining Table', cat:'Dining',      style:'Scandinavian', price:1650, oldPrice:null, badge:'new',  rating:4.9, reviews:87,  desc:'Scandinavian precision meets raw oak warmth. Seats 6–8 with leaf extension.',               imgA:'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=600&q=80', imgB:'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=600&q=80' },
  { id:3,  name:'Lumina Floor Lamp',     cat:'Lighting',    style:'Art Deco',     price:480,  oldPrice:600,  badge:'sale', rating:4.7, reviews:203, desc:'Sculptural brass body with hand-blown glass shade. Dimmable.',                               imgA:'https://images.unsplash.com/photo-1513506003901-1e6a35ee2d25?auto=format&fit=crop&w=600&q=80', imgB:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80' },
  { id:4,  name:'Vero Lounge Chair',     cat:'Living Room', style:'Mid-Century',  price:1290, oldPrice:null, badge:'hot',  rating:4.9, reviews:156, desc:'Deep button tufting, solid walnut legs, and sumptuous velvet.',                              imgA:'https://images.unsplash.com/photo-1551298370-9d3d53740c72?auto=format&fit=crop&w=600&q=80', imgB:'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=600&q=80' },
  { id:5,  name:'Serene Bed Frame',      cat:'Bedroom',     style:'Japandi',      price:2100, oldPrice:2600, badge:'sale', rating:4.8, reviews:98,  desc:'Japandi minimalism distilled into solid walnut. Low-profile with woven headboard.',          imgA:'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=600&q=80', imgB:'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80' },
  { id:6,  name:'Cosmo Coffee Table',    cat:'Living Room', style:'Contemporary', price:760,  oldPrice:null, badge:'new',  rating:4.7, reviews:112, desc:'Carrara marble top on a powder-coated base.',                                               imgA:'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80', imgB:'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=600&q=80' },
  { id:7,  name:'Atlas Bookshelf',       cat:'Office',      style:'Industrial',   price:920,  oldPrice:null, badge:'new',  rating:4.6, reviews:64,  desc:'Open-frame industrial shelving with powder-coated steel and solid mango wood.',             imgA:'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80', imgB:'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80' },
  { id:8,  name:'Basalt Desk',           cat:'Office',      style:'Industrial',   price:1440, oldPrice:1700, badge:'sale', rating:4.7, reviews:71,  desc:'Cast concrete top on a blackened steel frame. Cable management built in.',                  imgA:'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=600&q=80', imgB:'https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=600&q=80' },
  { id:9,  name:'Drift Bar Stool',       cat:'Dining',      style:'Scandinavian', price:340,  oldPrice:420,  badge:'sale', rating:4.5, reviews:87,  desc:'Counter-height ash wood stools with swivel seat. Set of 2.',                               imgA:'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=600&q=80', imgB:'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=600&q=80' },
  { id:10, name:'Ethos Wardrobe',        cat:'Bedroom',     style:'Japandi',      price:1870, oldPrice:null, badge:'hot',  rating:4.8, reviews:55,  desc:'Sliding panel wardrobe in smoked oak veneer. Interior modular configuration.',             imgA:'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80', imgB:'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=600&q=80' },
  { id:11, name:'Vivid Side Table',      cat:'Living Room', style:'Mid-Century',  price:290,  oldPrice:null, badge:'hot',  rating:4.6, reviews:134, desc:'Hand-thrown ceramic base with tempered glass top.',                                         imgA:'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=600&q=80', imgB:'https://images.unsplash.com/photo-1551298370-9d3d53740c72?auto=format&fit=crop&w=600&q=80' },
  { id:12, name:'Haven Outdoor Sofa',    cat:'Living Room', style:'Modern',       price:3200, oldPrice:null, badge:'new',  rating:4.9, reviews:43,  desc:'Weather-resilient teak frame with Sunbrella® cushions.',                                    imgA:'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80', imgB:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80' },
];

const SAMPLE_ORDERS = [
  { id:'ORD-2025-001', customer:'Amara Osei',    email:'amara@email.com', items:2, total:4130, status:'delivered', date:'2025-10-12' },
  { id:'ORD-2025-002', customer:'Karim Nasser',  email:'karim@email.com', items:1, total:1650, status:'shipped',   date:'2025-10-14' },
  { id:'ORD-2025-003', customer:'Sofia Mensah',  email:'sofia@email.com', items:3, total:3870, status:'pending',   date:'2025-10-16' },
  { id:'ORD-2025-004', customer:'John Mwangi',   email:'john@email.com',  items:1, total:2840, status:'pending',   date:'2025-10-17' },
  { id:'ORD-2025-005', customer:'Lena Müller',   email:'lena@email.com',  items:4, total:5620, status:'processing',date:'2025-10-18' },
  { id:'ORD-2025-006', customer:'David Okonjo',  email:'david@email.com', items:2, total:2180, status:'delivered', date:'2025-10-09' },
];

/* ──────────────────────────────────────────────────────────
   INIT
────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  loadAuditLog();
  checkSession();
  initClock();

  // Password visibility toggle
  document.getElementById('togglePass')?.addEventListener('click', () => {
    const inp = document.getElementById('authPass');
    inp.type = inp.type === 'password' ? 'text' : 'password';
  });

  // Close modals on backdrop click
  document.getElementById('productModal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeProductModal();
  });
  document.getElementById('deleteModal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeDeleteModal();
  });

  // Keyboard close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeProductModal(); closeDeleteModal(); }
  });
});

/* ──────────────────────────────────────────────────────────
   CLOCK
────────────────────────────────────────────────────────── */
function initClock() {
  function update() {
    const now = new Date();
    const el = document.getElementById('topbarTime');
    if (el) el.textContent = now.toLocaleString('en-US', { weekday:'short', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' });
  }
  update();
  setInterval(update, 30000);
}

/* ──────────────────────────────────────────────────────────
   PERSISTENCE
────────────────────────────────────────────────────────── */
function loadProducts() {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  products = stored ? JSON.parse(stored) : JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
  if (!stored) localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

function saveProducts() {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

function loadAuditLog() {
  const stored = localStorage.getItem(AUDIT_KEY);
  auditLog = stored ? JSON.parse(stored) : [];
}

function saveAuditLog() {
  localStorage.setItem(AUDIT_KEY, JSON.stringify(auditLog.slice(0, 200)));
}

function addAuditEntry(action, details, severity = 'info') {
  const entry = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    action,
    user: getLoggedInUser(),
    details,
    severity,
  };
  auditLog.unshift(entry);
  saveAuditLog();
}

/* ──────────────────────────────────────────────────────────
   AUTH
────────────────────────────────────────────────────────── */
function getCredentials() {
  const stored = localStorage.getItem(CREDS_KEY);
  return stored ? JSON.parse(stored) : { ...DEFAULT_CREDENTIALS };
}

function getLoggedInUser() {
  const session = sessionStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session).username : 'unknown';
}

function checkSession() {
  const session = sessionStorage.getItem(SESSION_KEY);
  if (session) {
    const s = JSON.parse(session);
    // Auto-logout after 30 minutes
    if (Date.now() - s.loginTime > 30 * 60 * 1000) {
      sessionStorage.removeItem(SESSION_KEY);
      showAuth();
      return;
    }
    showAdmin(s.username);
  } else {
    showAuth();
  }
}

function showAuth() {
  document.getElementById('authScreen').style.display = 'flex';
  document.getElementById('adminLayout').style.display = 'none';
}

function showAdmin(username) {
  document.getElementById('authScreen').style.display = 'none';
  document.getElementById('adminLayout').style.display = 'flex';
  // Set username in sidebar
  document.getElementById('sidebarUserName').textContent = username || 'Admin';
  document.getElementById('avatarInitial').textContent = (username || 'A')[0].toUpperCase();
  // Render all pages
  renderDashboard();
  renderProductTable();
  renderOrderTable();
  renderInventoryTable();
  renderAuditTable();
  updateBadges();
}

function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('authUser').value.trim();
  const password = document.getElementById('authPass').value;
  const creds = getCredentials();
  const errorEl = document.getElementById('authError');
  const msgEl   = document.getElementById('authErrorMsg');

  if (username === creds.username && password === creds.password) {
    errorEl.classList.remove('show');
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username, loginTime: Date.now() }));
    addAuditEntry('LOGIN', `User "${username}" signed in`, 'info');
    showAdmin(username);
  } else {
    msgEl.textContent = 'Invalid username or password. Please try again.';
    errorEl.classList.add('show');
    // Shake animation
    const box = document.querySelector('.auth-box');
    box.style.animation = 'none';
    box.offsetWidth;
    box.style.animation = 'shake .4s ease';
  }
}

function handleLogout() {
  addAuditEntry('LOGOUT', `User "${getLoggedInUser()}" signed out`, 'info');
  sessionStorage.removeItem(SESSION_KEY);
  showAuth();
  document.getElementById('authUser').value = '';
  document.getElementById('authPass').value = '';
  document.getElementById('authError').classList.remove('show');
}

/* ──────────────────────────────────────────────────────────
   PAGE NAVIGATION
────────────────────────────────────────────────────────── */
function showAdminPage(page, btn) {
  currentPage = page;
  document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  if (btn) btn.classList.add('active');
  else {
    document.querySelectorAll('.sidebar-link').forEach(l => {
      if (l.textContent.toLowerCase().includes(page.toLowerCase())) l.classList.add('active');
    });
  }

  const titles = { dashboard:'Dashboard', products:'Products', orders:'Orders', customers:'Customers', inventory:'Inventory', analytics:'Analytics', promotions:'Promotions', settings:'Settings', audit:'Audit Log' };
  document.getElementById('topbarTitle').textContent = titles[page] || page;

  if (page === 'products')  renderProductTable();
  if (page === 'orders')    renderOrderTable();
  if (page === 'inventory') renderInventoryTable();
  if (page === 'audit')     renderAuditTable();
  if (page === 'dashboard') renderDashboard();
}

/* ──────────────────────────────────────────────────────────
   DASHBOARD
────────────────────────────────────────────────────────── */
function renderDashboard() {
  const pd = document.getElementById('dashProducts');
  const od = document.getElementById('dashOrders');
  if (pd) pd.textContent = products.length;
  if (od) od.textContent = SAMPLE_ORDERS.length;

  const tbody = document.getElementById('dashProductBody');
  if (!tbody) return;
  const recent = [...products].slice(0, 6);
  tbody.innerHTML = recent.map(p => `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:12px">
          <img class="td-img" src="${p.imgA}" alt="${p.name}" />
          <div>
            <div class="td-name">${p.name}</div>
            <div class="td-sub">${p.style}</div>
          </div>
        </div>
      </td>
      <td class="td-muted">${p.cat}</td>
      <td><strong>$${p.price.toLocaleString()}</strong></td>
      <td>${p.badge ? `<span class="badge ${badgeClass(p.badge)}">${p.badge}</span>` : '<span class="badge badge-muted">—</span>'}</td>
    </tr>`).join('');
}

/* ──────────────────────────────────────────────────────────
   PRODUCTS TABLE
────────────────────────────────────────────────────────── */
function renderProductTable() {
  const tbody  = document.getElementById('productTableBody');
  const countEl = document.getElementById('productCount');
  if (!tbody) return;

  const search = (document.getElementById('productSearch')?.value || '').toLowerCase();
  const catFilter = document.getElementById('productCatFilter')?.value || '';

  let filtered = products.filter(p => {
    const matchS = !search || p.name.toLowerCase().includes(search) || p.style.toLowerCase().includes(search);
    const matchC = !catFilter || p.cat === catFilter;
    return matchS && matchC;
  });

  if (countEl) countEl.textContent = filtered.length;

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--muted)">No products match your filters</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td><img class="td-img" src="${p.imgA}" alt="${p.name}" style="width:44px;height:44px;object-fit:cover" /></td>
      <td>
        <div class="td-name">${p.name}</div>
        <div class="td-sub">ID #${p.id}</div>
      </td>
      <td class="td-muted">${p.cat}</td>
      <td class="td-muted">${p.style}</td>
      <td>
        <strong>$${p.price.toLocaleString()}</strong>
        ${p.oldPrice ? `<div class="td-sub" style="text-decoration:line-through">$${p.oldPrice.toLocaleString()}</div>` : ''}
      </td>
      <td>${p.badge ? `<span class="badge ${badgeClass(p.badge)}">${p.badge}</span>` : '<span class="badge badge-muted">—</span>'}</td>
      <td>
        <div style="display:flex;align-items:center;gap:5px">
          <span style="font-size:13px;font-weight:600">${p.rating}</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="#D4A053" stroke="#D4A053" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span class="td-sub">(${p.reviews})</span>
        </div>
      </td>
      <td>
        <div class="action-btns">
          <button class="btn-admin btn-admin-outline btn-admin-sm" onclick="openProductModal(${p.id})">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Edit
          </button>
          <button class="btn-admin btn-admin-danger btn-admin-sm" onclick="openDeleteModal(${p.id})">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            Delete
          </button>
        </div>
      </td>
    </tr>`).join('');
}

/* ──────────────────────────────────────────────────────────
   PRODUCT MODAL — ADD / EDIT
────────────────────────────────────────────────────────── */
function openProductModal(id) {
  const modal = document.getElementById('productModal');
  const titleEl = document.getElementById('productModalTitle');
  const editId  = document.getElementById('editProductId');

  if (id) {
    // Edit mode
    const p = products.find(pr => pr.id === id);
    if (!p) return;
    titleEl.textContent = 'Edit Product';
    editId.value = id;
    document.getElementById('pName').value     = p.name;
    document.getElementById('pStyle').value    = p.style || '';
    document.getElementById('pCat').value      = p.cat;
    document.getElementById('pPrice').value    = p.price;
    document.getElementById('pOldPrice').value = p.oldPrice || '';
    document.getElementById('pBadge').value    = p.badge || '';
    document.getElementById('pRating').value   = p.rating;
    document.getElementById('pDesc').value     = p.desc || '';
    document.getElementById('pImgA').value     = p.imgA || '';
    document.getElementById('pImgB').value     = p.imgB || '';
  } else {
    // Add mode
    titleEl.textContent = 'Add New Product';
    editId.value = '';
    ['pName','pStyle','pCat','pPrice','pOldPrice','pBadge','pRating','pDesc','pImgA','pImgB']
      .forEach(id => { document.getElementById(id).value = ''; });
  }

  modal.classList.add('open');
}

function closeProductModal() {
  document.getElementById('productModal')?.classList.remove('open');
}

function saveProduct() {
  const editId   = document.getElementById('editProductId').value;
  const name     = document.getElementById('pName').value.trim();
  const style    = document.getElementById('pStyle').value.trim();
  const cat      = document.getElementById('pCat').value;
  const price    = parseFloat(document.getElementById('pPrice').value);
  const oldPrice = parseFloat(document.getElementById('pOldPrice').value) || null;
  const badge    = document.getElementById('pBadge').value || null;
  const rating   = parseFloat(document.getElementById('pRating').value) || 4.5;
  const desc     = document.getElementById('pDesc').value.trim();
  const imgA     = document.getElementById('pImgA').value.trim() || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80';
  const imgB     = document.getElementById('pImgB').value.trim() || imgA;

  // Validation
  if (!name)       { adminToast('Product name is required', 'error'); return; }
  if (!cat)        { adminToast('Please select a category', 'error'); return; }
  if (!price || price <= 0) { adminToast('Please enter a valid price', 'error'); return; }

  if (editId) {
    // Update existing
    const idx = products.findIndex(p => p.id === parseInt(editId));
    if (idx > -1) {
      products[idx] = { ...products[idx], name, style, cat, price, oldPrice, badge, rating, desc, imgA, imgB };
      addAuditEntry('PRODUCT_UPDATE', `Updated product "${name}" (ID #${editId})`, 'info');
      adminToast(`"${name}" updated successfully`, 'success');
    }
  } else {
    // Create new
    const newId = Math.max(0, ...products.map(p => p.id)) + 1;
    const newProduct = { id: newId, name, style, cat, price, oldPrice, badge, rating, reviews: 0, desc, imgA, imgB };
    products.push(newProduct);
    addAuditEntry('PRODUCT_CREATE', `Created new product "${name}" (ID #${newId})`, 'info');
    adminToast(`"${name}" added to catalog`, 'success');
  }

  saveProducts();
  closeProductModal();
  renderProductTable();
  renderDashboard();
  updateBadges();
}

/* ──────────────────────────────────────────────────────────
   DELETE PRODUCT
────────────────────────────────────────────────────────── */
function openDeleteModal(id) {
  deleteTargetId = id;
  const p = products.find(pr => pr.id === id);
  if (p) document.getElementById('deleteProductName').textContent = `"${p.name}"`;
  document.getElementById('deleteModal')?.classList.add('open');
}

function closeDeleteModal() {
  deleteTargetId = null;
  document.getElementById('deleteModal')?.classList.remove('open');
}

function confirmDelete() {
  if (!deleteTargetId) return;
  const p = products.find(pr => pr.id === deleteTargetId);
  products = products.filter(pr => pr.id !== deleteTargetId);
  saveProducts();
  addAuditEntry('PRODUCT_DELETE', `Deleted product "${p?.name}" (ID #${deleteTargetId})`, 'warning');
  adminToast(`"${p?.name}" removed from catalog`, 'success');
  closeDeleteModal();
  renderProductTable();
  renderDashboard();
  updateBadges();
}

/* ──────────────────────────────────────────────────────────
   ORDERS TABLE
────────────────────────────────────────────────────────── */
function renderOrderTable() {
  const tbody = document.getElementById('orderTableBody');
  if (!tbody) return;

  tbody.innerHTML = SAMPLE_ORDERS.map(o => `
    <tr>
      <td><span class="mono" style="font-size:12px;color:var(--accent)">${o.id}</span></td>
      <td>
        <div class="td-name">${o.customer}</div>
        <div class="td-sub">${o.email}</div>
      </td>
      <td>${o.items} item${o.items !== 1 ? 's' : ''}</td>
      <td><strong>$${o.total.toLocaleString()}</strong></td>
      <td>${orderStatusBadge(o.status)}</td>
      <td class="td-muted">${formatDate(o.date)}</td>
      <td>
        <div class="action-btns">
          <button class="btn-admin btn-admin-outline btn-admin-sm" onclick="adminToast('Order detail view — connect to API','info')">View</button>
          ${o.status === 'pending' ? `<button class="btn-admin btn-admin-green btn-admin-sm" onclick="updateOrderStatus('${o.id}','processing')">Process</button>` : ''}
        </div>
      </td>
    </tr>`).join('');
}

function updateOrderStatus(orderId, status) {
  const o = SAMPLE_ORDERS.find(o => o.id === orderId);
  if (o) { o.status = status; renderOrderTable(); adminToast(`Order ${orderId} marked as ${status}`, 'success'); }
}

function orderStatusBadge(status) {
  const map = {
    pending:    'badge-gold',
    processing: 'badge-blue',
    shipped:    'badge-accent',
    delivered:  'badge-green',
    cancelled:  'badge-red',
  };
  return `<span class="badge ${map[status] || 'badge-muted'}">${status}</span>`;
}

/* ──────────────────────────────────────────────────────────
   INVENTORY TABLE
────────────────────────────────────────────────────────── */
function renderInventoryTable() {
  const tbody = document.getElementById('inventoryTableBody');
  if (!tbody) return;

  // Simulate stock levels based on product id
  tbody.innerHTML = products.map(p => {
    const stock = ((p.id * 17) % 80) + 5; // deterministic pseudo-random 5–84
    const maxStock = 80;
    const pct = Math.round((stock / maxStock) * 100);
    const cls = pct > 50 ? 'stock-high' : pct > 20 ? 'stock-medium' : 'stock-low';
    const statusBadge = pct > 50 ? 'badge-green' : pct > 20 ? 'badge-gold' : 'badge-red';
    const statusLabel = pct > 50 ? 'In Stock' : pct > 20 ? 'Low Stock' : 'Critical';
    return `
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:12px">
            <img src="${p.imgA}" alt="${p.name}" style="width:36px;height:36px;object-fit:cover" />
            <div class="td-name">${p.name}</div>
          </div>
        </td>
        <td class="td-muted">${p.cat}</td>
        <td>$${p.price.toLocaleString()}</td>
        <td>
          <div style="display:flex;align-items:center;gap:10px">
            <div class="stock-bar ${cls}">
              <div class="stock-bar-fill" style="width:${pct}%"></div>
            </div>
            <span style="font-size:12px;color:var(--text-2)">${stock} units</span>
          </div>
        </td>
        <td><span class="badge ${statusBadge}">${statusLabel}</span></td>
      </tr>`;
  }).join('');
}

/* ──────────────────────────────────────────────────────────
   AUDIT LOG TABLE
────────────────────────────────────────────────────────── */
function renderAuditTable() {
  const tbody = document.getElementById('auditTableBody');
  if (!tbody) return;

  if (!auditLog.length) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--muted)">No audit entries yet. Actions will appear here.</td></tr>`;
    return;
  }

  tbody.innerHTML = auditLog.map(entry => `
    <tr>
      <td class="mono td-muted" style="font-size:11.5px;white-space:nowrap">${formatDateTime(entry.timestamp)}</td>
      <td><span class="badge badge-muted mono" style="font-size:10.5px">${entry.action}</span></td>
      <td class="td-muted">${entry.user}</td>
      <td style="font-size:13px">${entry.details}</td>
      <td>${severityBadge(entry.severity)}</td>
    </tr>`).join('');
}

function severityBadge(severity) {
  const map = { info: 'badge-blue', warning: 'badge-gold', error: 'badge-red', success: 'badge-green' };
  return `<span class="badge ${map[severity] || 'badge-muted'}">${severity}</span>`;
}

/* ──────────────────────────────────────────────────────────
   BADGES
────────────────────────────────────────────────────────── */
function updateBadges() {
  const pb = document.getElementById('productsBadge');
  if (pb) pb.textContent = products.length;
  const ob = document.getElementById('ordersBadge');
  if (ob) ob.textContent = SAMPLE_ORDERS.filter(o => o.status === 'pending').length;
}

function badgeClass(badge) {
  const map = { new: 'badge-blue', hot: 'badge-accent', sale: 'badge-red' };
  return map[badge] || 'badge-muted';
}

/* ──────────────────────────────────────────────────────────
   SETTINGS
────────────────────────────────────────────────────────── */
function saveCredentials() {
  const current   = document.getElementById('settingsCurrent').value;
  const newPass   = document.getElementById('settingsNew').value;
  const confirm   = document.getElementById('settingsConfirm').value;
  const username  = document.getElementById('settingsUsername').value.trim();
  const creds     = getCredentials();

  if (current !== creds.password) { adminToast('Current password is incorrect', 'error'); return; }
  if (newPass && newPass.length < 8) { adminToast('New password must be at least 8 characters', 'error'); return; }
  if (newPass !== confirm) { adminToast('New passwords do not match', 'error'); return; }

  const updated = { username: username || creds.username, password: newPass || creds.password };
  localStorage.setItem(CREDS_KEY, JSON.stringify(updated));
  addAuditEntry('CREDENTIALS_CHANGE', 'Admin credentials updated', 'warning');
  adminToast('Credentials updated successfully', 'success');

  // Clear fields
  ['settingsCurrent','settingsNew','settingsConfirm'].forEach(id => { document.getElementById(id).value = ''; });
}

/* ──────────────────────────────────────────────────────────
   TOAST
────────────────────────────────────────────────────────── */
function adminToast(message, type = 'info') {
  const icons = {
    success: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
    error:   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    info:    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    warning: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  };
  const container = document.getElementById('adminToastContainer');
  const toast = document.createElement('div');
  toast.className = `admin-toast admin-toast-${type}`;
  toast.innerHTML = `<span class="admin-toast-icon">${icons[type] || ''}</span>${message}`;
  container.appendChild(toast);
  toast.addEventListener('click', () => dismissAdminToast(toast));
  setTimeout(() => dismissAdminToast(toast), 4000);
}

function dismissAdminToast(toast) {
  toast.classList.add('removing');
  setTimeout(() => toast.remove(), 250);
}

/* ──────────────────────────────────────────────────────────
   HELPERS
────────────────────────────────────────────────────────── */
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
}

function formatDateTime(isoStr) {
  const d = new Date(isoStr);
  return d.toLocaleDateString('en-US', { month:'short', day:'numeric' }) + ' ' +
         d.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
}

/* Auth form shake animation */
const shakeStyle = document.createElement('style');
shakeStyle.textContent = '@keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }';
document.head.appendChild(shakeStyle);
