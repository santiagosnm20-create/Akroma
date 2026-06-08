/* ===== Akroma Coffee — lógica del menú ===== */

/* --- Configuración del negocio (edítala fácilmente) --- */
const CONFIG = {
  whatsapp: "573026026027",            // <-- número en formato internacional, sin + ni espacios
  msgGeneral: "¡Hola Akroma! Quiero hacer un pedido ☕",
  msgItem: name => `¡Hola Akroma! Quiero pedir un *${name}* ☕`
};
const waLink = msg => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

/* --- Iconos SVG reutilizables --- */
const ICON = {
  bean: `<svg viewBox="0 0 48 48" fill="none" stroke="#e0a85e" stroke-width="2.2" stroke-linecap="round"><ellipse cx="24" cy="24" rx="13" ry="18" transform="rotate(28 24 24)"/><path d="M17 14c5 6 5 14 0 20" /></svg>`,
  cherry: `<svg viewBox="0 0 48 48" fill="none" stroke="#e0a85e" stroke-width="2.2" stroke-linecap="round"><circle cx="24" cy="28" r="12"/><path d="M24 16c0-5 4-8 9-8"/><path d="M19 24c2-2 8-2 10 0"/></svg>`,
  v60: `<svg viewBox="0 0 48 48" fill="none" stroke="#e0a85e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 14h24l-10 16h-4z"/><path d="M22 30v6"/><path d="M18 40h12"/></svg>`,
  aeropress: `<svg viewBox="0 0 48 48" fill="none" stroke="#e0a85e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="12" width="16" height="22" rx="2"/><path d="M16 12h16l-2-5H18z"/><path d="M18 34l2 6h8l2-6"/></svg>`,
  espresso: `<svg viewBox="0 0 48 48" fill="none" stroke="#e0a85e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 18h22v8a8 8 0 0 1-8 8h-6a8 8 0 0 1-8-8z"/><path d="M34 20h4a4 4 0 0 1 0 8h-4"/><path d="M14 40h22"/></svg>`,
  milkcup: `<svg viewBox="0 0 48 48" fill="none" stroke="#e0a85e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 16h22v16a6 6 0 0 1-6 6H19a6 6 0 0 1-6-6z"/><path d="M35 19h3a4 4 0 0 1 0 8h-3"/><path d="M18 11c2 2 0 4 2 6M27 11c2 2 0 4 2 6"/></svg>`,
  iced: `<svg viewBox="0 0 48 48" fill="none" stroke="#e0a85e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14h18l-2 26H17z"/><rect x="20" y="20" width="6" height="6" rx="1"/><rect x="24" y="28" width="6" height="6" rx="1"/></svg>`
};

/* --- Explicaciones de métodos --- */
const METHOD_INFO = {
  v60: {
    name: "V60",
    text: "Filtrado por goteo en cono de Hario. Vertemos agua a ~92°C de forma manual y circular sobre 20 g de café molido medio. El agua atraviesa el filtro de papel por gravedad, regalando una taza limpia, brillante y aromática que resalta las notas florales y frutales.",
    steps: ["20 g de café, molienda media", "Enjuague del filtro + 'bloom' con 40 ml (40 s)", "Vertidos circulares hasta 300 ml", "Tiempo total: 2:30 – 3:00 min"]
  },
  aeropress: {
    name: "Aeropress",
    text: "Método de inmersión y presión. El café reposa sumergido en agua y luego se empuja con un émbolo a través de un filtro. Resultado: un café de cuerpo medio, suave, muy equilibrado y sin amargor.",
    steps: ["20 g de café, molienda media-fina", "Inmersión con 220 ml de agua a ~88°C", "Reposo y agitado: 1:00 – 1:30 min", "Presión suave del émbolo: 20 – 30 s"]
  },
  espresso: {
    name: "Espresso",
    text: "Extracción a presión: ~9 bares empujan agua a ~93°C a través de café finamente molido y compactado. En 25–30 segundos obtenemos un shot concentrado, con cuerpo y una crema dorada que es la base de todas nuestras bebidas con leche.",
    steps: ["18 g de Café Castillo, molienda fina", "Compactado (tamper) uniforme", "Extracción: 9 bares · 25–30 s", "Rendimiento: ~36 ml de espresso doble"]
  },
  coldbrew: {
    name: "Cold Brew",
    text: "Extracción en frío durante 12–18 horas. Sin calor, el café libera dulzor y suavidad con muy baja acidez y nada de amargor. Servido sobre hielo.",
    steps: ["70 g de café por litro, molienda gruesa", "Reposo en agua fría: 12–18 h", "Filtrado fino", "Servido sobre hielo"]
  }
};

/* --- Datos de las bebidas --- */
const DRINKS = [
  /* ===== FILTRADOS — single origin ===== */
  {
    id:"castillo", cat:"filtrado", name:"Castillo Honey", price:7000, art:"cherry",
    methods:["v60","aeropress"],
    desc:"Avellana, panela, limoncillo, miel y vainilla. Suave, dulce y muy equilibrado.",
    tags:["Honey","Tostión media","Acevedo–Huila"],
    notes:["Avellana","Panela","Limoncillo","Miel","Vainilla"],
    profile:"Tostión media con el equilibrio perfecto entre cuerpo y acidez. Su dulzor se realza gracias al delicado proceso Honey: una experiencia sofisticada y un verdadero tesoro en cada taza.",
    specs:[["Origen","Acevedo · Huila"],["Variedad","Castillo"],["Proceso","Honey"],["Altitud","1.580 msnm"]],
    sca:null
  },
  {
    id:"bourbon", cat:"filtrado", name:"Bourbon Naranja", price:9000, art:"cherry",
    methods:["v60","aeropress"],
    desc:"Flor de naranja, caramelo, toronja, cítrico y panela. Vibrante y con dulzor sedoso.",
    tags:["Honey 120h","SCA 86.5","San Adolfo–Huila"],
    notes:["Flor de naranja","Caramelo","Toronja","Cítrico","Panela"],
    profile:"Café balanceado y vibrante, con un dulzor sedoso incomparable potenciado por un fermento de 120 horas. La tostión media resalta su complejidad frutal y las notas dulces del proceso Honey. Selección artesanal por finca.",
    specs:[["Origen","San Adolfo · Huila"],["Variedad","Bourbon Naranja"],["Proceso","Honey · fermento 120 h"],["Altitud","1.720 msnm"]],
    sca:86.5
  },
  {
    id:"geisha", cat:"filtrado", name:"Geisha Honey", price:10000, art:"cherry",
    methods:["v60","aeropress"],
    desc:"Frutos rojos, floral y jazmín. Acidez alta y elegante, textura sedosa.",
    tags:["Honey 25 días","SCA 87+","San Adolfo–Huila"],
    notes:["Frutos rojos","Floral","Jazmín"],
    profile:"Acidez alta pero equilibrada, con mucha dulzura por su proceso Honey. Cuerpo ligero a medio con textura sedosa y un aroma intenso y complejo. El Geisha es una experiencia única para los paladares más exigentes.",
    specs:[["Origen","San Adolfo · Huila"],["Variedad","Geisha"],["Proceso","Honey · secado 25 días"],["Fermento","24 horas"],["Altitud","1.750 msnm"]],
    sca:87
  },
  {
    id:"wush", cat:"filtrado", name:"Wush Wush Natural", price:11000, art:"cherry",
    methods:["v60","aeropress"],
    desc:"Chocolate negro, manzana verde, frutales y el dulzor único del zapote.",
    tags:["Natural 180h","SCA 87+","Cantarito–Huila"],
    notes:["Chocolate negro","Manzana verde","Notas frutales","Zapote"],
    profile:"Una combinación vibrante con notas marcadas a chocolate negro y manzana verde, toques frutales y el dulzor único del zapote. Proceso natural con fermentación extendida de 180 horas y tostión media para balancear su complejidad.",
    specs:[["Origen","Cantarito · Acevedo, Huila"],["Variedad","Wush Wush"],["Proceso","Natural · fermento 180 h"],["Altitud","1.580 msnm"]],
    sca:87
  },

  /* ===== ESPRESSO & DERIVADOS — Café Castillo de la casa ===== */
  {
    id:"espresso", cat:"espresso", name:"Espresso", price:3500, art:"espresso",
    base:"espresso",
    desc:"Shot puro de café Castillo. Concentrado, con cuerpo y crema dorada.",
    tags:["Single shot","9 bares"],
    recipe:"Un shot de espresso (~9 g de café). La forma más pura de probar nuestro café de la casa.",
    specs:[["Café","Castillo de la casa"],["Volumen","~30 ml"],["Extracción","25–30 s"]]
  },
  {
    id:"doppio", cat:"espresso", name:"Espresso Doble", price:4500, art:"espresso",
    base:"espresso",
    desc:"Doble shot para los que necesitan más energía y sabor.",
    tags:["Doppio","18 g"],
    recipe:"Doble shot de espresso (18 g de café) para una taza más intensa y con más cuerpo.",
    specs:[["Café","Castillo de la casa"],["Volumen","~60 ml"],["Extracción","25–30 s"]]
  },
  {
    id:"americano", cat:"espresso", name:"Americano", price:4000, art:"espresso",
    base:"espresso",
    desc:"Espresso alargado con agua caliente. Suave y de buen volumen.",
    tags:["Sin leche","Suave"],
    recipe:"Un shot de espresso al que se le añade agua caliente, conservando los aromas pero con menor intensidad. Ideal para acompañar largas jornadas de estudio.",
    specs:[["Café","Castillo de la casa"],["Volumen","~150 ml"],["Leche","No"]]
  },
  {
    id:"macchiato", cat:"espresso", name:"Macchiato", price:4500, art:"milkcup",
    base:"espresso",
    desc:"Espresso 'manchado' con un toque de espuma de leche.",
    tags:["Mucho café","Toque de leche"],
    recipe:"Espresso coronado con una pequeña cucharada de leche espumada. Suaviza el shot sin esconder su carácter.",
    specs:[["Café","Castillo de la casa"],["Leche","~15 ml espuma"],["Volumen","~45 ml"]]
  },
  {
    id:"cortado", cat:"espresso", name:"Cortado", price:5000, art:"milkcup",
    base:"espresso",
    desc:"Espresso 'cortado' con igual cantidad de leche vaporizada.",
    tags:["1:1","Equilibrado"],
    recipe:"Partes iguales de espresso y leche vaporizada (1:1). El balance perfecto entre fuerza del café y suavidad de la leche.",
    specs:[["Café","Castillo de la casa"],["Leche","~30 ml vaporizada"],["Volumen","~70 ml"]]
  },
  {
    id:"cappuccino", cat:"espresso", name:"Cappuccino", price:6000, art:"milkcup",
    base:"espresso",
    desc:"Espresso, leche vaporizada y una generosa capa de espuma cremosa.",
    tags:["1:1:1","Espumoso"],
    recipe:"El clásico: un tercio de espresso, un tercio de leche vaporizada y un tercio de espuma sedosa. Cremoso y reconfortante.",
    specs:[["Café","Castillo de la casa"],["Leche","~120 ml + espuma"],["Volumen","~150 ml"]]
  },
  {
    id:"flatwhite", cat:"espresso", name:"Flat White", price:6500, art:"milkcup",
    base:"espresso",
    desc:"Doble espresso con microespuma fina. Sedoso e intenso.",
    tags:["Doble shot","Microespuma"],
    recipe:"Doble espresso con leche texturizada en microespuma muy fina y poca capa de espuma. Más café que un latte, con textura aterciopelada.",
    specs:[["Café","Castillo de la casa"],["Leche","~130 ml microespuma"],["Volumen","~160 ml"]]
  },
  {
    id:"latte", cat:"espresso", name:"Latte", price:6500, art:"milkcup",
    base:"espresso",
    desc:"Espresso con bastante leche vaporizada. Suave y cremoso.",
    tags:["Suave","Cremoso"],
    recipe:"Un shot de espresso con abundante leche vaporizada y una fina capa de espuma. La opción más suave y cremosa, perfecta para empezar el día.",
    specs:[["Café","Castillo de la casa"],["Leche","~200 ml vaporizada"],["Volumen","~220 ml"]]
  },
  {
    id:"mocha", cat:"espresso", name:"Mocha", price:7500, art:"milkcup",
    base:"espresso",
    desc:"Espresso, chocolate y leche vaporizada. Dulce y reconfortante.",
    tags:["Con chocolate","Dulce"],
    recipe:"Espresso combinado con chocolate y leche vaporizada. El antojo dulce ideal para premiarte después de un parcial.",
    specs:[["Café","Castillo de la casa"],["Extra","Chocolate"],["Volumen","~220 ml"]]
  },

  /* ===== FRÍOS ===== */
  {
    id:"coldbrew", cat:"frio", name:"Cold Brew", price:8000, art:"iced",
    base:"coldbrew",
    desc:"Extracción en frío 12–18 h con café Castillo. Dulce, suave y refrescante.",
    tags:["Frío","Baja acidez"],
    recipe:"Café Castillo extraído en frío durante 12 a 18 horas y servido sobre hielo. Naturalmente dulce, suave y sin amargor.",
    specs:[["Café","Castillo de la casa"],["Extracción","12–18 h en frío"],["Servido","Sobre hielo"]]
  },
  {
    id:"icedlatte", cat:"frio", name:"Iced Latte", price:7000, art:"iced",
    base:"espresso",
    desc:"Espresso sobre hielo y leche fría. Cremoso y refrescante.",
    tags:["Frío","Cremoso"],
    recipe:"Espresso vertido sobre hielo y leche fría. Refrescante y cremoso, ideal para los días soleados del campus.",
    specs:[["Café","Castillo de la casa"],["Leche","~200 ml fría"],["Servido","Sobre hielo"]]
  },
  {
    id:"affogato", cat:"frio", name:"Affogato", price:8000, art:"iced",
    base:"espresso",
    desc:"Helado de vainilla 'ahogado' en un shot de espresso caliente.",
    tags:["Postre","Café + helado"],
    recipe:"Una bola de helado de vainilla bañada con un shot de espresso caliente. El contraste frío–caliente convierte el café en un delicioso postre.",
    specs:[["Café","Castillo de la casa"],["Extra","Helado de vainilla"],["Servido","Postre"]]
  }
];

/* --- Utilidades --- */
const fmt = n => "$" + n.toLocaleString("es-CO");
const $ = sel => document.querySelector(sel);

/* --- SCA explicación según puntaje --- */
function scaLabel(p){
  if(p>=90) return "Excepcional";
  if(p>=85) return "Excelente";
  return "Muy bueno";
}

/* --- Render de tarjetas --- */
function cardHTML(d){
  const tags = d.tags.map(t => {
    const isSca = /SCA/.test(t);
    return `<span class="tag${isSca?' sca':''}">${t}</span>`;
  }).join("");
  return `
    <article class="card" data-id="${d.id}" tabindex="0" role="button" aria-label="Ver detalles de ${d.name}">
      <div class="card-art">${ICON[d.art]}</div>
      <div class="card-info">
        <div class="card-title"><h3>${d.name}</h3><span class="price">${fmt(d.price)}</span></div>
        <p class="card-desc">${d.desc}</p>
        <div class="card-tags">${tags}</div>
      </div>
      <span class="card-more">Toca para ver +</span>
    </article>`;
}

function renderCards(){
  const groups = {filtrado:"#cards-filtrado", espresso:"#cards-espresso", frio:"#cards-frio"};
  Object.entries(groups).forEach(([cat,sel])=>{
    $(sel).innerHTML = DRINKS.filter(d=>d.cat===cat).map(cardHTML).join("");
  });
}

/* --- Construcción del modal --- */
function modalHTML(d){
  let html = `
    <div class="m-hero">
      <div class="m-art">${ICON[d.art]}</div>
      <div class="m-title">
        <h3>${d.name}</h3>
        <div class="m-price">${fmt(d.price)}</div>
      </div>
    </div>`;

  /* --- FILTRADOS (single origin) --- */
  if(d.cat==="filtrado"){
    html += `
      <div class="m-section">
        <h4>Notas de cata</h4>
        <div class="m-notes">${d.notes.map(n=>`<span class="m-note">${n}</span>`).join("")}</div>
      </div>
      <div class="m-section">
        <h4>Perfil</h4>
        <p>${d.profile}</p>
      </div>
      <div class="m-section">
        <h4>Origen y proceso</h4>
        <ul class="m-specs">${d.specs.map(([k,v])=>`<li><b>${k}</b><span>${v}</span></li>`).join("")}</ul>
      </div>`;

    /* Métodos de preparación disponibles */
    d.methods.forEach(mk=>{
      const m = METHOD_INFO[mk];
      html += `
        <div class="m-section">
          <h4>Preparación · ${m.name}</h4>
          <p>${m.text}</p>
          <ol class="m-steps">${m.steps.map(s=>`<li>${s}</li>`).join("")}</ol>
        </div>`;
    });

    if(d.sca){
      html += `<div class="m-sca">⭐ <b>SCA ${d.sca}+ · ${scaLabel(d.sca)}.</b> Calificado por catadores certificados sobre 100 puntos. Todo lo que supere 80 es café de especialidad.</div>`;
    }
  }

  /* --- ESPRESSO Y FRÍOS --- */
  else {
    const m = METHOD_INFO[d.base];
    html += `
      <p class="m-method">Café Castillo de la casa</p>
      <div class="m-section">
        <h4>La bebida</h4>
        <p>${d.recipe}</p>
      </div>
      <div class="m-section">
        <h4>Detalles</h4>
        <ul class="m-specs">${d.specs.map(([k,v])=>`<li><b>${k}</b><span>${v}</span></li>`).join("")}</ul>
      </div>
      <div class="m-section">
        <h4>¿Cómo se prepara la base? · ${m.name}</h4>
        <p>${m.text}</p>
        <ol class="m-steps">${m.steps.map(s=>`<li>${s}</li>`).join("")}</ol>
      </div>`;
  }

  /* CTA de pedido por WhatsApp */
  html += `<a class="m-order" href="${waLink(CONFIG.msgItem(d.name))}" target="_blank" rel="noopener">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2Z"/></svg>
    Pedir ${d.name} · ${fmt(d.price)}
  </a>`;

  return html;
}

/* --- Control del modal --- */
const modal = $("#modal");
const modalBody = $("#modalBody");
let lastFocus = null;

function openModal(id){
  const d = DRINKS.find(x=>x.id===id);
  if(!d) return;
  lastFocus = document.activeElement;
  modalBody.innerHTML = modalHTML(d);
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  $(".modal-close").focus();
}
function closeModal(){
  modal.hidden = true;
  document.body.style.overflow = "";
  if(lastFocus) lastFocus.focus();
}

/* --- Eventos --- */
function bindEvents(){
  /* Click en tarjetas */
  document.querySelectorAll(".cards").forEach(c=>{
    c.addEventListener("click", e=>{
      const card = e.target.closest(".card");
      if(card) openModal(card.dataset.id);
    });
    c.addEventListener("keydown", e=>{
      if((e.key==="Enter"||e.key===" ") && e.target.closest(".card")){
        e.preventDefault();
        openModal(e.target.closest(".card").dataset.id);
      }
    });
  });

  /* Cerrar modal */
  modal.querySelectorAll("[data-close]").forEach(el=>el.addEventListener("click", closeModal));
  document.addEventListener("keydown", e=>{ if(e.key==="Escape" && !modal.hidden) closeModal(); });

  /* Filtros */
  $("#filters").addEventListener("click", e=>{
    const chip = e.target.closest(".chip");
    if(!chip) return;
    document.querySelectorAll(".chip").forEach(c=>c.classList.remove("active"));
    chip.classList.add("active");
    const f = chip.dataset.filter;
    document.querySelectorAll(".menu-section").forEach(sec=>{
      const show = f==="all" || sec.dataset.cat===f;
      sec.classList.toggle("hide", !show);
    });
    revealCards();
  });
}

/* --- Animación de aparición de tarjetas al hacer scroll --- */
let io;
function revealCards(){
  const cards = document.querySelectorAll(".card:not(.in)");
  if(!("IntersectionObserver" in window)){
    cards.forEach(c=>c.classList.add("in"));
    return;
  }
  if(!io){
    io = new IntersectionObserver((entries)=>{
      entries.forEach((en,i)=>{
        if(en.isIntersecting){
          en.target.style.transitionDelay = (Math.min(i,6)*60)+"ms";
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, {threshold:.12, rootMargin:"0px 0px -40px 0px"});
  }
  cards.forEach(c=>io.observe(c));
}

/* --- Guía de métodos --- */
const GUIDE = [
  {key:"v60", art:"v60", title:"V60", tag:"Claridad y aromas",
   blurb:"Para quienes aman las notas florales y frutales, y una taza limpia y brillante."},
  {key:"aeropress", art:"aeropress", title:"Aeropress", tag:"Suave y versátil",
   blurb:"Cuerpo medio, muy equilibrado y sin amargor. Rápido y perdona errores."},
  {key:"espresso", art:"espresso", title:"Espresso", tag:"Intenso y con crema",
   blurb:"Concentrado y con cuerpo. La base de cappuccinos, lattes y flat whites."}
];

function renderGuide(){
  const g = document.querySelector("#guideGrid");
  if(!g) return;
  g.innerHTML = GUIDE.map(x=>`
    <article class="guide-card" data-method="${x.key}" tabindex="0" role="button" aria-label="Ver método ${x.title}">
      <div class="card-art">${ICON[x.art]}</div>
      <div>
        <h3>${x.title}</h3>
        <p>${x.blurb}</p>
        <span class="gtag">${x.tag}</span>
      </div>
    </article>`).join("");
}

/* --- Modal de método (desde la guía) --- */
function openMethodModal(key){
  const m = METHOD_INFO[key];
  if(!m) return;
  lastFocus = document.activeElement;
  const icon = key==="v60"?ICON.v60:key==="aeropress"?ICON.aeropress:ICON.espresso;
  modalBody.innerHTML = `
    <div class="m-hero">
      <div class="m-art">${icon}</div>
      <div class="m-title"><h3>Método ${m.name}</h3></div>
    </div>
    <div class="m-section"><h4>Cómo funciona</h4><p>${m.text}</p></div>
    <div class="m-section"><h4>Nuestra receta</h4><ol class="m-steps">${m.steps.map(s=>`<li>${s}</li>`).join("")}</ol></div>
    <a class="m-order" href="${waLink(CONFIG.msgGeneral)}" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Z"/></svg>
      Pedir por WhatsApp
    </a>`;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  document.querySelector(".modal-close").focus();
}

/* --- Init --- */
renderCards();
renderGuide();
bindEvents();
revealCards();

/* Guía: abrir modal de método */
document.querySelector("#guideGrid").addEventListener("click", e=>{
  const c = e.target.closest(".guide-card");
  if(c) openMethodModal(c.dataset.method);
});
document.querySelector("#guideGrid").addEventListener("keydown", e=>{
  const c = e.target.closest(".guide-card");
  if(c && (e.key==="Enter"||e.key===" ")){ e.preventDefault(); openMethodModal(c.dataset.method); }
});

/* Enlaces de WhatsApp globales */
const gWa = waLink(CONFIG.msgGeneral);
["#fabWa","#footerWa"].forEach(sel=>{ const el=document.querySelector(sel); if(el) el.href = gWa; });

/* Loader */
window.addEventListener("load", ()=>{
  const l = document.querySelector("#loader");
  if(l) setTimeout(()=>l.classList.add("done"), 600);
});

