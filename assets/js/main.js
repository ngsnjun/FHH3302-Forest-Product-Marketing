/* =========================================================
   BAMBYTE — site script
   Shared header/footer, cart, reveal animations, forms.
   ========================================================= */
document.documentElement.classList.remove('no-js');

/* ---------- Product data (prices in RM) ---------- */
const PRODUCTS = {
  one: {
    id: 'one', name: 'BAMBYTE One', type: 'Bluetooth Speaker', flagship: true,
    img: 'assets/img/one-speaker.jpg', url: 'bambyte-one.html',
    price: 99, status: 'In stock · ships in 2–3 working days',
    short: 'A compact cylindrical speaker wrapped in natural bamboo. Our first collection piece.',
    usp: 'Every casing shows its own natural grain pattern.'
  },
  charge: {
    id: 'charge', name: 'BAMBYTE Charge', type: 'Wireless Charging Station',
    img: 'assets/img/charge-station.jpg', url: 'product.html?p=charge',
    price: 89, status: 'In stock · ships in 2–3 working days',
    short: 'A desk organiser and wireless charging station with a bamboo body, with space for pens and a small plant.',
    usp: 'Charges your phone and keeps your desk tidy.',
    long: 'BAMBYTE Charge turns the charging point into part of the desk. A bamboo base holds a phone upright for wireless charging and has compartments for pens and small objects, so the cable clutter disappears into a single natural-material piece.',
    points: ['Bamboo exterior desk organiser', '15 W Qi wireless charging cradle', 'Compartments for stationery and small objects', 'USB-C power input, adaptor included']
  },
  power: {
    id: 'power', name: 'BAMBYTE Power', type: 'Bamboo Exterior Power Bank',
    img: 'assets/img/power-bank.jpg', url: 'product.html?p=power',
    price: 79, status: 'In stock · ships in 2–3 working days',
    short: 'A slim power bank with a solid bamboo shell and a laser-engraved wireless charging mark.',
    usp: 'Portable power in a warm, tactile shell.',
    long: 'BAMBYTE Power puts a bamboo shell around a portable battery. The flat, slim block is designed to slip into a bag, with ports along one end and a single button on the side.',
    points: ['Solid bamboo exterior shell', 'Laser-engraved charging mark', 'Slim, flat form for bags and pockets', '10,000 mAh capacity with USB-C and USB-A ports']
  },
  connect: {
    id: 'connect', name: 'BAMBYTE Connect', type: 'Bamboo Charging Cable Set',
    img: 'assets/img/connect-cables.jpg', url: 'product.html?p=connect',
    price: 39, status: 'Limited stock · ships in 3–5 working days',
    short: 'A multi-connector cable kit stored in a pocket-sized bamboo case with a swivel lid.',
    usp: 'Every adaptor you need, in one bamboo case.',
    long: 'BAMBYTE Connect gathers the cables and adaptors that usually get lost in a bag into one pocket-sized bamboo case. A swivel lid keeps everything in place and a wrist strap makes it easy to carry.',
    points: ['Pocket-sized bamboo storage case', 'Swivel lid with carry strap', 'Multiple connector adaptors', 'USB-C, Lightning and Micro-USB tips, 60 W fast-charge cable']
  }
};

const MYR = n => 'RM ' + n.toFixed(2);
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- Icons ---------- */
const ICON = {
  logo: '<svg viewBox="0 0 22 30" aria-hidden="true"><rect x="3" y="1" width="16" height="28" rx="8" fill="#8B6845"/><rect x="3" y="12.5" width="16" height="2.4" fill="#F5F1E8"/><circle cx="11" cy="22" r="2.6" fill="#F5F1E8"/></svg>',
  logoLight: '<svg viewBox="0 0 22 30" aria-hidden="true"><rect x="3" y="1" width="16" height="28" rx="8" fill="#D8C09A"/><rect x="3" y="12.5" width="16" height="2.4" fill="#252722"/><circle cx="11" cy="22" r="2.6" fill="#252722"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 9h16M4 15h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14z"/><path d="M5 19l7-7"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8.1v3h2.5V21h2.9z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v2.6c-1.4.1-2.6-.3-3.9-1.1v5.3c0 6.6-7.2 8.7-10.1 4C4.6 14.6 6 9.6 11.4 9.4v2.8c-.4.1-.8.2-1.2.3-1.2.4-1.9 1.2-1.7 2.6.4 2.6 5.2 3.4 4.8-1.7V3h3.3z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.4z"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>'
};

/* ---------- Shared chrome ---------- */
const NAV = [
  ['index.html', 'Home', 'home'],
  ['products.html', 'Products', 'products'],
  ['bambyte-one.html', 'BAMBYTE One', 'one'],
  ['story.html', 'Our Story', 'story'],
  ['sustainability.html', 'Material & Sustainability', 'material']
];

function renderChrome() {
  const page = document.body.dataset.page;

  const top = document.createElement('div');
  top.innerHTML = `
    <a class="skip" href="#main">Skip to content</a>
    <div class="launch-bar"><span class="tag">Launch</span>Introducing BAMBYTE One — Discover Our First Collection.<a href="bambyte-one.html">Explore now →</a></div>
    <header class="site-header">
      <div class="wrap">
        <a class="logo" href="index.html" aria-label="BAMBYTE home">${ICON.logo}BAMBYTE</a>
        <nav class="nav" id="site-nav" aria-label="Main">
          ${NAV.map(([href, label, key]) => `<a href="${href}"${key === page ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
        </nav>
        <div class="header-actions">
          <div class="lang" role="group" aria-label="Language / Bahasa">
            <button type="button" data-lang="en" aria-pressed="true" title="English">EN</button>
            <button type="button" data-lang="ms" aria-pressed="false" title="Bahasa Melayu">BM</button>
          </div>
          <button class="icon-btn" data-cart-open aria-label="Open cart">${ICON.bag}<span class="cart-count" aria-hidden="true">0</span></button>
          <button class="icon-btn menu-toggle" aria-controls="site-nav" aria-expanded="false" aria-label="Open menu">${ICON.menu}</button>
        </div>
      </div>
    </header>`;
  document.body.prepend(...top.childNodes);

  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="wrap">
      <div class="footer-top">
        <div class="footer-brand">
          <a class="logo" href="index.html">${ICON.logoLight}BAMBYTE</a>
          <p>Nature Meets Technology. A bamboo electronics lifestyle brand, designed in Malaysia.</p>
        </div>
        <div class="footer-col"><h4>Shop</h4><ul>
          <li><a href="bambyte-one.html">BAMBYTE One</a></li>
          <li><a href="product.html?p=charge">BAMBYTE Charge</a></li>
          <li><a href="product.html?p=power">BAMBYTE Power</a></li>
          <li><a href="product.html?p=connect">BAMBYTE Connect</a></li>
        </ul></div>
        <div class="footer-col"><h4>Brand</h4><ul>
          <li><a href="story.html">Our Story</a></li>
          <li><a href="sustainability.html">Material & Sustainability</a></li>
          <li><a href="sustainability.html#lifecycle">Product Lifecycle</a></li>
        </ul></div>
      </div>
      <div class="footer-word" aria-hidden="true">BAMBYTE</div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} BAMBYTE. All rights reserved.</span>
        <span>Mock-up website · FHH3302 Forest Product Marketing</span>
        <span>Prepared by NG SHOU JUN · Matric No. 224057</span>
      </div>
    </div>`;
  document.body.append(footer);

  const cart = document.createElement('div');
  cart.innerHTML = `
    <div class="scrim" data-cart-close></div>
    <aside class="cart" role="dialog" aria-modal="true" aria-labelledby="cart-title" aria-hidden="true">
      <div class="cart__head">
        <h2 id="cart-title">Your bag</h2>
        <button class="icon-btn" data-cart-close aria-label="Close cart">${ICON.close}</button>
      </div>
      <div class="cart__items" id="cart-items"></div>
      <div class="cart__foot">
        <div class="cart__row"><span>Subtotal</span><span id="cart-subtotal">RM 0.00</span></div>
        <div class="cart__row muted"><span>Shipping</span><span>Calculated at launch</span></div>
        <div class="cart__row total"><span>Total</span><span id="cart-total">RM 0.00</span></div>
        <button class="btn btn--primary btn--block" id="checkout-btn">Continue to checkout ${ICON.arrow}</button>
        <div class="notice cart__checkout-msg small" id="checkout-msg">${ICON.info}<span>This is a mock-up store, so checkout ends here. No payment is taken.</span></div>
      </div>
    </aside>
    <div class="toast" role="status" aria-live="polite"><span id="toast-text"></span><button data-cart-open>View bag</button></div>`;
  document.body.append(...cart.childNodes);
}

/* ---------- Cart (front-end demo, stored in localStorage) ---------- */
const CART_KEY = 'bambyte-cart';
function readCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
}
function writeCart(items) {
  try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch { /* storage unavailable */ }
  renderCart();
}
let cartMemory = null; // fallback when storage is blocked
function getCart() { return cartMemory || readCart(); }
function setCart(items) { cartMemory = items; writeCart(items); }

function addToCart(id, qty = 1, finish = 'Natural') {
  const items = getCart();
  const hit = items.find(i => i.id === id && i.finish === finish);
  if (hit) hit.qty += qty; else items.push({ id, qty, finish });
  setCart(items);
  const count = $('.cart-count');
  count.classList.remove('bump'); void count.offsetWidth; count.classList.add('bump');
  toast(lang === 'ms' ? `${PRODUCTS[id].name} ditambah ke beg anda` : `${PRODUCTS[id].name} added to your bag`);
}

function renderCart() {
  const items = getCart();
  const list = $('#cart-items');
  const total = items.reduce((s, i) => s + PRODUCTS[i.id].price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const badge = $('.cart-count');
  badge.textContent = count;
  badge.classList.toggle('has-items', count > 0);
  $('#cart-subtotal').textContent = MYR(total);
  $('#cart-total').textContent = MYR(total);
  $('#checkout-btn').disabled = count === 0;
  $('#checkout-btn').style.opacity = count === 0 ? .4 : 1;

  if (!items.length) {
    list.innerHTML = `<div class="cart__empty">${ICON.bag}<p>Your bag is empty.</p><a class="btn btn--ghost" href="products.html">Browse products</a></div>`;
    $('#checkout-msg').classList.remove('show');
    return;
  }
  list.innerHTML = items.map((i, idx) => {
    const p = PRODUCTS[i.id];
    return `<div class="cart-item">
      <img src="${p.img}" alt="">
      <div>
        <h4>${p.name}</h4>
        <div class="meta">${t(p.type)} · ${t(i.finish)}</div>
        <div class="qty"><button data-q="${idx}" data-d="-1" aria-label="Decrease quantity">−</button><output>${i.qty}</output><button data-q="${idx}" data-d="1" aria-label="Increase quantity">+</button></div>
      </div>
      <div><div class="line">${MYR(p.price * i.qty)}</div><button class="remove" data-r="${idx}">Remove</button></div>
    </div>`;
  }).join('');
}

function openCart() {
  document.body.classList.add('cart-open');
  $('.cart').setAttribute('aria-hidden', 'false');
  $('.cart [data-cart-close]').focus();
}
function closeCart() {
  document.body.classList.remove('cart-open');
  $('.cart').setAttribute('aria-hidden', 'true');
}

let toastTimer;
function toast(msg) {
  const t = $('.toast');
  $('#toast-text').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

function bindCart() {
  document.addEventListener('click', e => {
    const open = e.target.closest('[data-cart-open]');
    const close = e.target.closest('[data-cart-close]');
    const add = e.target.closest('[data-add]');
    const q = e.target.closest('[data-q]');
    const r = e.target.closest('[data-r]');
    if (open) { e.preventDefault(); $('.toast').classList.remove('show'); openCart(); }
    if (close) closeCart();
    if (add) {
      e.preventDefault();
      const qty = +(add.dataset.qtyFrom ? $(add.dataset.qtyFrom).value : 1) || 1;
      const finish = add.dataset.finishFrom ? ($(add.dataset.finishFrom + ' [aria-pressed="true"]')?.dataset.finish || 'Natural') : 'Natural';
      addToCart(add.dataset.add, qty, finish);
    }
    if (q) {
      const items = getCart();
      const it = items[+q.dataset.q];
      it.qty += +q.dataset.d;
      if (it.qty < 1) items.splice(+q.dataset.q, 1);
      setCart(items);
    }
    if (r) { const items = getCart(); items.splice(+r.dataset.r, 1); setCart(items); }
  });
  $('#checkout-btn').addEventListener('click', () => $('#checkout-msg').classList.add('show'));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeCart(); closeMenu(); }
  });
  window.addEventListener('storage', e => { if (e.key === CART_KEY) { cartMemory = null; renderCart(); } });
}

/* ---------- Mobile menu ---------- */
function closeMenu() {
  document.body.classList.remove('menu-open');
  const b = $('.menu-toggle');
  if (b) { b.setAttribute('aria-expanded', 'false'); b.innerHTML = ICON.menu; b.setAttribute('aria-label', 'Open menu'); }
}
function bindMenu() {
  const b = $('.menu-toggle');
  b.addEventListener('click', () => {
    const open = !document.body.classList.contains('menu-open');
    if (!open) return closeMenu();
    document.body.style.setProperty('--nav-top', $('.site-header').getBoundingClientRect().bottom + 'px');
    document.body.classList.add('menu-open');
    b.setAttribute('aria-expanded', 'true');
    b.setAttribute('aria-label', 'Close menu');
    b.innerHTML = ICON.close;
  });
  $$('.nav a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (innerWidth > 920) closeMenu(); });
}

/* ---------- Header shadow + reveal + parallax ---------- */
function bindScroll() {
  const header = $('.site-header');
  const parallax = $$('[data-parallax]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onScroll = () => {
    header.classList.toggle('is-scrolled', scrollY > 8);
    if (!reduce) parallax.forEach(el => {
      const speed = +el.dataset.parallax || .08;
      el.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => io.observe(el));
}

/* ---------- Product catalogue filter ---------- */
function bindFilter() {
  const chips = $$('[data-filter]');
  if (!chips.length) return;
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.toggle('is-active', c === chip));
    const f = chip.dataset.filter;
    $$('.catalogue .product-card').forEach(card => {
      card.hidden = f !== 'all' && !card.dataset.tags.split(' ').includes(f);
      card.classList.remove('filter-in');
      if (!card.hidden) { void card.offsetWidth; card.classList.add('filter-in'); }
    });
  }));
}

/* ---------- Product option controls ---------- */
function bindOptions() {
  $$('.finish-options').forEach(group => group.addEventListener('click', e => {
    const btn = e.target.closest('.finish');
    if (!btn) return;
    $$('.finish', group).forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    const label = group.dataset.label && $(group.dataset.label);
    if (label) label.textContent = t(btn.dataset.finish);
    document.body.dataset.finish = btn.dataset.finish;
  }));
  $$('[data-step]').forEach(btn => btn.addEventListener('click', () => {
    const out = $(btn.dataset.target);
    out.value = Math.min(9, Math.max(1, (+out.value || 1) + +btn.dataset.step));
  }));
}

/* ---------- Sharing (digital marketing) ---------- */
function bindShare() {
  $$('[data-share]').forEach(row => {
    const url = encodeURIComponent(location.href.split('#')[0]);
    const text = encodeURIComponent(row.dataset.share);
    const map = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`
    };
    $$('a[data-net]', row).forEach(a => { a.href = map[a.dataset.net]; });
    const copy = $('[data-copy]', row);
    if (copy) copy.addEventListener('click', async () => {
      try {
        if (navigator.share) await navigator.share({ title: document.title, url: location.href });
        else { await navigator.clipboard.writeText(location.href); toast('Link copied to clipboard'); }
      } catch { /* share cancelled */ }
    });
  });
}

/* ---------- Forms ---------- */
function validate(form) {
  let ok = true;
  $$('[required]', form).forEach(input => {
    const field = input.closest('.field');
    let valid = input.type === 'checkbox' ? input.checked : input.value.trim() !== '';
    if (valid && input.type === 'email') valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    if (field) field.classList.toggle('invalid', !valid);
    if (!valid && ok) { input.focus(); ok = false; }
  });
  return ok;
}
function bindForms() {
  const enquiry = $('#enquiry-form');
  if (enquiry) {
    enquiry.addEventListener('input', e => e.target.closest('.field')?.classList.remove('invalid'));
    enquiry.addEventListener('submit', e => {
      e.preventDefault();
      if (!validate(enquiry)) return;
      const data = Object.fromEntries(new FormData(enquiry));
      try {
        const log = JSON.parse(localStorage.getItem('bambyte-enquiries') || '[]');
        log.push({ ...data, at: new Date().toISOString() });
        localStorage.setItem('bambyte-enquiries', JSON.stringify(log));
      } catch { /* storage unavailable */ }
      $('#sent-name').textContent = data.name.split(' ')[0];
      enquiry.closest('.form-card').classList.add('sent');
    });
    $('#send-another')?.addEventListener('click', () => {
      enquiry.reset();
      enquiry.closest('.form-card').classList.remove('sent');
    });
    // Enquiry-type shortcuts preselect the topic
    $$('[data-topic]').forEach(b => b.addEventListener('click', () => {
      $('#topic').value = b.dataset.topic;
      $('#contact-form').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => $('#name').focus({ preventScroll: true }), 600);
    }));
  }

  $$('.newsletter form').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    const input = $('input', form);
    const msg = form.parentElement.querySelector('.msg');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) { msg.textContent = 'Please enter a valid email address.'; msg.style.color = '#A3412F'; return; }
    msg.style.color = '';
    msg.textContent = 'Thanks — you\'re on the launch list.';
    form.reset();
  }));
}

/* ---------- Generic product page (product.html?p=...) ---------- */
function renderProductPage() {
  const root = $('#product-root');
  if (!root) return;
  const id = new URLSearchParams(location.search).get('p');
  const p = PRODUCTS[id];
  if (!p || p.flagship) { location.replace(p ? p.url : 'products.html'); return; }
  document.title = `${p.name} — ${p.type} | BAMBYTE`;
  $('meta[name="description"]').setAttribute('content', p.short);
  $$('[data-p]').forEach(el => { el.textContent = p[el.dataset.p]; });
  $('#p-img').src = p.img;
  $('#p-img').alt = `${p.name} ${p.type.toLowerCase()} with bamboo exterior`;
  $('#p-price').textContent = MYR(p.price);
  $('#p-points').innerHTML = p.points.map(t => `<li>${t}</li>`).join('');
  $('#p-add').dataset.add = p.id;
  $('#p-others').innerHTML = Object.values(PRODUCTS).filter(o => o.id !== p.id).map(cardHTML).join('');
}

function cardHTML(p) {
  return `<a class="product-card reveal in" href="${p.url}">
    <div class="product-card__media">${p.flagship ? '<span class="badge badge--green">Flagship</span>' : '<span class="badge">New</span>'}<img src="${p.img}" alt="${p.name}" loading="lazy"></div>
    <div class="product-card__body">
      <div class="product-card__type">${p.type}</div>
      <h3>${p.name}</h3>
      <p>${p.short}</p>
      <div class="product-card__foot"><span class="link-arrow">View product ${ICON.arrow}</span></div>
    </div></a>`;
}

/* ---------- Moisture demo (sustainability page) ---------- */
function bindMoisture() {
  const r = $('#rh');
  if (!r) return;
  const block = $('.moisture-block');
  const out = $('#rh-out');
  const note = $('#rh-note');
  const update = () => {
    const v = +r.value;
    out.textContent = v + '% RH';
    // Exaggerated for illustration only: swelling across the grain.
    block.style.transform = `scaleY(${0.86 + v / 100 * 0.32})`;
    note.textContent = v < 35 ? 'Dry air: the material gives up moisture and shrinks slightly.'
      : v > 70 ? 'Humid air: the material takes on moisture and swells slightly.'
      : 'Moderate humidity: the material sits close to its equilibrium.';
  };
  r.addEventListener('input', update);
  update();
}

/* ---------- Product hotspots (BAMBYTE One hero) ---------- */
function bindHotspots() {
  const wrap = $('.pdp-hero__img');
  if (!wrap) return;
  const card = $('.hotspot-card', wrap);
  const spots = $$('.hotspot', wrap);
  const close = () => { card.hidden = true; spots.forEach(s => s.classList.remove('is-on')); };
  spots.forEach(s => s.addEventListener('click', e => {
    e.stopPropagation();
    if (s.classList.contains('is-on')) return close();
    spots.forEach(o => o.classList.toggle('is-on', o === s));
    $('b', card).textContent = s.dataset.title;
    $('p', card).textContent = s.dataset.text;
    card.style.setProperty('--x', s.style.getPropertyValue('--x'));
    card.style.setProperty('--y', s.style.getPropertyValue('--y'));
    card.classList.toggle('flip', parseFloat(s.style.getPropertyValue('--x')) > 55);
    card.hidden = false;
    wrap.classList.add('explored');
  }));
  document.addEventListener('click', e => { if (!e.target.closest('.hotspot-card')) close(); });
}

/* ---------- Cutaway: link layer list and diagram ---------- */
function bindCutaway() {
  const root = $('.construct');
  if (!root) return;
  const items = $$('.layers li', root);
  const set = i => {
    if (i == null) delete root.dataset.active; else root.dataset.active = i;
    items.forEach((li, n) => li.classList.toggle('is-on', String(n) === String(i)));
  };
  items.forEach((li, i) => {
    li.tabIndex = 0;
    li.addEventListener('mouseenter', () => set(i));
    li.addEventListener('focus', () => set(i));
    li.addEventListener('click', () => set(root.dataset.active === String(i) ? null : i));
  });
  $$('.xsec [data-layer]', root).forEach(g => {
    g.addEventListener('mouseenter', () => set(g.dataset.layer));
    g.addEventListener('click', () => set(g.dataset.layer));
  });
  root.addEventListener('mouseleave', () => set(null));
}

/* ---------- Bamboo culm cross-section (sustainability) ---------- */
const CULM = {
  skin: 'A hard, waxy outer layer that protects the culm. It is planed away before the bamboo is laminated.',
  bundles: 'Fibre-sheathed channels that carry water and give bamboo its strength. They are packed most densely near the outside.',
  parenchyma: 'Soft ground tissue between the bundles. It stores starch, which is why bamboo is treated before use.',
  cavity: 'The hollow centre of the culm between nodes. It is why bamboo is so light for its strength.'
};
function bindCulm() {
  const root = $('.culm');
  if (!root) return;
  // Scatter vascular bundles: denser and smaller towards the outer wall.
  const g = $('#culm-bundles');
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  let dots = '';
  for (let i = 0; i < 260; i++) {
    const r = 60 + 42 * Math.sqrt(rnd());
    const a = rnd() * Math.PI * 2;
    const size = 1.2 + (104 - r) / 42 * 1.8;
    dots += `<circle cx="${(120 + r * Math.cos(a)).toFixed(1)}" cy="${(120 + r * Math.sin(a)).toFixed(1)}" r="${size.toFixed(2)}"/>`;
  }
  g.innerHTML = dots;
  const text = $('.culm-text', root);
  const set = part => {
    root.dataset.active = part;
    $$('.culm-chips .chip', root).forEach(c => c.classList.toggle('is-active', c.dataset.part === part));
    text.textContent = CULM[part];
  };
  $$('.culm-chips .chip', root).forEach(c => c.addEventListener('click', () => set(c.dataset.part)));
  $$('svg [data-part]', root).forEach(p => p.addEventListener('click', () => set(p.dataset.part)));
  set('skin');
}

/* ---------- Lifecycle stepper (sustainability) ---------- */
const LIFECYCLE = [
  'We favour suppliers who can show where and how their bamboo is grown and harvested.',
  "Strips are dried to a controlled moisture content to keep the casing stable in Malaysia's humid climate.",
  'BAMBYTE One uses a water-based lacquer. Adhesive choice is reviewed as part of every new design.',
  'Electronics sit inside a protective housing that can be separated from the bamboo casing.',
  'A durable finish, a 1-year warranty and clear care guidance help each product stay in use for longer.',
  'Batteries and electronics should go to e-waste collection. The casing is designed to come off first.'
];
function bindLifecycle() {
  const steps = $$('.lifecycle li');
  const panel = $('.lc-panel');
  if (!steps.length || !panel) return;
  // Keep the English stage names; the language layer translates whatever is shown.
  const names = steps.map(li => $('h3', li).textContent);
  const set = i => {
    steps.forEach((li, n) => { li.classList.toggle('is-on', n === i); li.setAttribute('aria-selected', String(n === i)); });
    $('.lc-title', panel).textContent = names[i];
    $('.lc-text', panel).textContent = LIFECYCLE[i];
  };
  steps.forEach((li, i) => {
    li.setAttribute('role', 'tab');
    li.tabIndex = 0;
    li.addEventListener('click', () => set(i));
    li.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); set(i); } });
  });
  set(0);
}

/* ---------- Product finder quiz (products page) ---------- */
function bindFinder() {
  const root = $('.finder');
  if (!root) return;
  const answers = {};
  const pick = () => {
    if (!answers.place || !answers.need) return null;
    if (answers.need === 'music') return 'one';
    if (answers.need === 'cables') return 'connect';
    return answers.place === 'go' ? 'power' : 'charge';
  };
  $$('.finder__opts', root).forEach(group => group.addEventListener('click', e => {
    const b = e.target.closest('.chip');
    if (!b) return;
    $$('.chip', group).forEach(c => c.classList.toggle('is-active', c === b));
    answers[group.dataset.q] = b.dataset.v;
    $$('.finder__dots i', root).forEach((d, i) => d.classList.toggle('on', i < Object.keys(answers).length));
    const id = pick();
    if (!id) return;
    const p = PRODUCTS[id];
    const card = $('.finder__card', root);
    card.href = p.url;
    $('img', card).src = p.img;
    $('img', card).alt = p.name;
    $('.finder__name', card).textContent = p.name;
    $('.finder__short', card).textContent = p.short;
    $('.finder__price', card).textContent = 'RM ' + p.price;
    $('.finder__empty', root).hidden = true;
    card.hidden = false;
    card.classList.remove('pop'); void card.offsetWidth; card.classList.add('pop');
  }));
}

/* ---------- Language (English / Bahasa Melayu) ----------
   Text is written in English in the HTML. In Malay mode every text element is
   looked up in I18N_MS (assets/js/i18n-ms.js) by its English content, so new
   content rendered later (cart, product pages, messages) is translated too. */
const LANG_KEY = 'bambyte-lang';
let lang = 'en';
try { lang = localStorage.getItem(LANG_KEY) === 'ms' ? 'ms' : 'en'; } catch { /* storage unavailable */ }

// Strings only produced by scripts (not present in the page HTML).
const I18N_EXTRA = {
  'Natural': 'Asli',
  'Caramel': 'Karamel',
  'Finish:': 'Kemasan:',
  'Prepared by NG SHOU JUN · Matric No. 224057': 'Disediakan oleh NG SHOU JUN · No. Matrik 224057',
  'Your bag is empty.': 'Beg anda kosong.',
  'Browse products': 'Lihat produk',
  "Thanks — you're on the launch list.": 'Terima kasih — anda kini dalam senarai pelancaran.',
  'Dry air: the material gives up moisture and shrinks slightly.': 'Udara kering: bahan membebaskan lembapan dan mengecut sedikit.',
  'Humid air: the material takes on moisture and swells slightly.': 'Udara lembap: bahan menyerap lembapan dan mengembang sedikit.',
  // Hotspots
  'Tap the dots to explore': 'Ketik titik untuk meneroka',
  'Bamboo speaker grille': 'Gril pembesar suara buluh',
  'Precision-drilled holes let sound pass through the solid bamboo top panel.': 'Lubang yang ditebuk dengan tepat membolehkan bunyi melalui panel atas buluh padu.',
  'Fabric carry strap': 'Tali bimbit fabrik',
  'A soft woven strap for carrying the speaker from room to room.': 'Tali tenunan lembut untuk membawa pembesar suara dari bilik ke bilik.',
  'Natural bamboo casing': 'Kelongsong buluh semula jadi',
  'Straight fibre grain runs the full height of the cylinder, so every unit is unique.': 'Ira serat lurus merentasi seluruh ketinggian silinder, jadi setiap unit adalah unik.',
  'Node markings': 'Tanda ruas',
  'Darker marks show where the bamboo stem had a node, a natural signature of the material.': 'Tanda gelap menunjukkan kedudukan ruas pada batang buluh, tanda semula jadi bahan ini.',
  // Cutaway
  'Hover or tap a layer to highlight it.': 'Halakan atau ketik pada lapisan untuk menyerlahkannya.',
  // Culm cross-section
  'Outer skin': 'Kulit luar',
  'Vascular bundles': 'Berkas vaskular',
  'Parenchyma': 'Parenkima',
  'Hollow cavity': 'Rongga berongga',
  'A hard, waxy outer layer that protects the culm. It is planed away before the bamboo is laminated.': 'Lapisan luar yang keras dan berlilin yang melindungi batang. Ia diketam sebelum buluh dilamina.',
  'Fibre-sheathed channels that carry water and give bamboo its strength. They are packed most densely near the outside.': 'Saluran bersarung serat yang membawa air dan memberikan kekuatan kepada buluh. Ia paling padat berhampiran bahagian luar.',
  'Soft ground tissue between the bundles. It stores starch, which is why bamboo is treated before use.': 'Tisu asas lembut di antara berkas. Ia menyimpan kanji, sebab itulah buluh dirawat sebelum digunakan.',
  'The hollow centre of the culm between nodes. It is why bamboo is so light for its strength.': 'Bahagian tengah batang yang berongga di antara ruas. Inilah sebabnya buluh begitu ringan berbanding kekuatannya.',
  'Cross-section of a bamboo culm. Tap a part to explore.': 'Keratan rentas batang buluh. Ketik satu bahagian untuk meneroka.',
  // Lifecycle stepper
  'BAMBYTE approach': 'Pendekatan BAMBYTE',
  'Tap any stage above to see how BAMBYTE handles it.': 'Ketik mana-mana peringkat di atas untuk melihat cara BAMBYTE mengendalikannya.',
  'We favour suppliers who can show where and how their bamboo is grown and harvested.': 'Kami mengutamakan pembekal yang dapat menunjukkan di mana dan bagaimana buluh mereka ditanam dan dituai.',
  "Strips are dried to a controlled moisture content to keep the casing stable in Malaysia's humid climate.": 'Jalur buluh dikeringkan kepada kandungan lembapan terkawal supaya kelongsong kekal stabil dalam iklim lembap Malaysia.',
  'BAMBYTE One uses a water-based lacquer. Adhesive choice is reviewed as part of every new design.': 'BAMBYTE One menggunakan lakuer berasaskan air. Pilihan pelekat dikaji semula bagi setiap reka bentuk baharu.',
  'Electronics sit inside a protective housing that can be separated from the bamboo casing.': 'Elektronik terletak di dalam perumah pelindung yang boleh dipisahkan daripada kelongsong buluh.',
  'A durable finish, a 1-year warranty and clear care guidance help each product stay in use for longer.': 'Kemasan tahan lama, waranti 1 tahun dan panduan penjagaan yang jelas membantu setiap produk digunakan lebih lama.',
  'Batteries and electronics should go to e-waste collection. The casing is designed to come off first.': 'Bateri dan elektronik perlu dihantar ke pusat pengumpulan e-sisa. Kelongsong direka untuk ditanggalkan terlebih dahulu.',
  // Product finder
  'Product finder': 'Pencari produk',
  'Find your BAMBYTE.': 'Cari BAMBYTE anda.',
  'Where will you use it most?': 'Di manakah anda paling kerap menggunakannya?',
  'At my desk': 'Di meja kerja',
  'On the go': 'Semasa bergerak',
  'Around the home': 'Di sekitar rumah',
  'What matters most to you?': 'Apakah yang paling penting bagi anda?',
  'Music and sound': 'Muzik dan bunyi',
  'Staying charged': 'Sentiasa bercas',
  'Tidy cables': 'Kabel yang kemas',
  'Answer both questions to see your match.': 'Jawab kedua-dua soalan untuk melihat padanan anda.',
  'Your match': 'Padanan anda'
};
const DICT = Object.assign({}, typeof I18N_MS === 'object' ? I18N_MS : {}, I18N_EXTRA);
const t = s => (lang === 'ms' && DICT[s]) || s;

const INLINE_TAGS = new Set(['STRONG', 'B', 'EM', 'I', 'A', 'SPAN', 'BR', 'SUP', 'SMALL']);
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'svg', 'SVG', 'TEXTAREA']);
const squash = s => s.replace(/\s+/g, ' ').trim();

// Swap one unit of text. `get`/`set` read and write it; state lives on `host`.
function swap(host, current, set) {
  if (host.__ms !== undefined && current === host.__ms) {
    if (lang === 'en') { set(host.__en); host.__ms = undefined; }
    return;
  }
  if (lang === 'ms' && DICT[current]) {
    host.__en = current;
    set(DICT[current]);
    host.__ms = null; // recorded below once the browser has normalised it
    return true;
  }
}

function translateTree(root) {
  const walk = el => {
    if (SKIP_TAGS.has(el.tagName) || el.closest?.('.lang')) return;
    const direct = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    if (direct && el !== document.body) {
      const simple = [...el.querySelectorAll('*')].every(c => INLINE_TAGS.has(c.tagName));
      if (simple) {
        if (swap(el, squash(el.innerHTML), v => { el.innerHTML = v; })) el.__ms = squash(el.innerHTML);
        return;
      }
      for (const n of el.childNodes) {
        if (n.nodeType !== 3 || !n.textContent.trim()) continue;
        const lead = n.textContent.match(/^\s*/)[0], tail = n.textContent.match(/\s*$/)[0];
        if (swap(n, squash(n.textContent), v => { n.textContent = lead + v + tail; })) n.__ms = squash(n.textContent);
      }
    }
    for (const c of el.children) walk(c);
  };
  walk(root);
  root.querySelectorAll?.('[placeholder]').forEach(inp => {
    swap(inp, inp.placeholder, v => { inp.placeholder = v; }) && (inp.__ms = inp.placeholder);
  });
}

let langObserver;
function applyLang() {
  langObserver?.disconnect();
  document.documentElement.lang = lang === 'ms' ? 'ms' : 'en';
  translateTree(document.body);
  const titleHost = document.documentElement;
  if (swap(titleHost, document.title, v => { document.title = v; })) titleHost.__ms = document.title;
  $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  const finish = $('#finish-label');
  if (finish) finish.textContent = t($('#finish [aria-pressed="true"]')?.dataset.finish || 'Natural');
  langObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
}

function initLang() {
  let queued = false;
  langObserver = new MutationObserver(() => {
    if (lang !== 'ms' || queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; applyLang(); });
  });
  document.addEventListener('click', e => {
    const b = e.target.closest('.lang button');
    if (!b || b.dataset.lang === lang) return;
    lang = b.dataset.lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch { /* storage unavailable */ }
    applyLang();
    renderCart();
  });
  applyLang();
}

/* ---------- Init ---------- */
renderChrome();
renderProductPage();
bindMenu();
bindCart();
renderCart();
bindScroll();
bindFilter();
bindOptions();
bindShare();
bindForms();
bindMoisture();
bindHotspots();
bindCutaway();
bindCulm();
bindLifecycle();
bindFinder();
initLang();

// Header is injected by JS, so re-apply any #anchor once layout settles
if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) requestAnimationFrame(() => t.scrollIntoView()); }
