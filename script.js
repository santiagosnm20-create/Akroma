/* ===== Akroma Coffee — lógica del menú ===== */

/* --- Configuración del negocio (edítala fácilmente) --- */
const CONFIG = {
  whatsapp: "573026026027",            // <-- número en formato internacional, sin + ni espacios
  msgGeneral: "¡Hola Akroma! Quiero hacer un pedido.",
  msgItem: name => `¡Hola Akroma! Quiero pedir un *${name}*.`
};
const waLink = msg => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --- Paleta para las ilustraciones (cohesiva) --- */
const INK="#2f2117", ACCENT="#c07c43", ACCENT_D="#a2632f", CREMA="#cf9a5a",
      COFFEE="#6b3f1d", CHERRY="#bf5b3a", SAGE="#8a9a73", PAPER="#fffaf3", ICE="#eae0d2";

/* --- Librería de ilustraciones SVG --- */
const ILLO = {
  cherry:()=>`<svg viewBox="0 0 200 170" class="float-art" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"><path d="M100 42 C 82 66 80 80 80 94"/><path d="M100 42 C 118 66 120 80 120 94"/></g>
    <path d="M100 44 q 36 -28 62 -8 q -24 32 -62 8 z" fill="${SAGE}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M112 30 q 16 -4 28 4" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="80" cy="118" r="27" fill="${CHERRY}" stroke="${INK}" stroke-width="5"/>
    <circle cx="122" cy="118" r="27" fill="${CHERRY}" stroke="${INK}" stroke-width="5"/>
    <circle cx="72" cy="110" r="6.5" fill="#fff" opacity=".5"/>
    <circle cx="114" cy="110" r="6.5" fill="#fff" opacity=".5"/>
  </svg>`,
  espresso:()=>`<svg viewBox="0 0 200 170" class="float-art" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"><path d="M86 32 q-9 9 0 18 q9 9 0 18"/><path d="M114 32 q-9 9 0 18 q9 9 0 18"/></g>
    <path d="M60 80 H134 V98 a30 30 0 0 1 -30 30 H90 a30 30 0 0 1 -30 -30 Z" fill="${PAPER}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <ellipse cx="97" cy="80" rx="37" ry="9" fill="${CREMA}" stroke="${INK}" stroke-width="5"/>
    <path d="M134 88 a18 18 0 0 1 0 30" fill="none" stroke="${INK}" stroke-width="6"/>
    <ellipse cx="100" cy="142" rx="52" ry="10" fill="${PAPER}" stroke="${INK}" stroke-width="5"/>
  </svg>`,
  tinto:()=>`<svg viewBox="0 0 200 170" class="float-art" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"><path d="M88 30 q-9 9 0 18 q9 9 0 18"/><path d="M112 30 q-9 9 0 18 q9 9 0 18"/></g>
    <path d="M62 78 H138 V104 a38 38 0 0 1 -38 38 a38 38 0 0 1 -38 -38 Z" fill="${PAPER}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <ellipse cx="100" cy="78" rx="38" ry="10" fill="${COFFEE}" stroke="${INK}" stroke-width="5"/>
    <path d="M138 86 a20 20 0 0 1 0 34" fill="none" stroke="${INK}" stroke-width="6"/>
  </svg>`,
  milk:()=>`<svg viewBox="0 0 200 170" class="float-art" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"><path d="M88 22 q-9 9 0 18"/><path d="M112 22 q-9 9 0 18"/></g>
    <path d="M54 56 H146 V100 a44 44 0 0 1 -44 44 H98 a44 44 0 0 1 -44 -44 Z" fill="${PAPER}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <ellipse cx="100" cy="56" rx="46" ry="12" fill="#fff4e2" stroke="${INK}" stroke-width="5"/>
    <path d="M100 72 c -8 -12 -27 -5 -20 9 c 5 9 20 17 20 17 c 0 0 15 -8 20 -17 c 7 -14 -12 -21 -20 -9 z" fill="${CREMA}" stroke="${INK}" stroke-width="3.5"/>
    <path d="M146 72 a18 18 0 0 1 0 30" fill="none" stroke="${INK}" stroke-width="6"/>
  </svg>`,
  cold:()=>`<svg viewBox="0 0 200 170" class="float-art" xmlns="http://www.w3.org/2000/svg">
    <rect x="108" y="14" width="11" height="124" rx="5" transform="rotate(10 113 76)" fill="${ACCENT}" stroke="${INK}" stroke-width="4.5"/>
    <path d="M66 42 H134 L124 150 H76 Z" fill="${ICE}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M71 88 H129 L124 150 H76 Z" fill="${COFFEE}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <rect x="82" y="92" width="22" height="22" rx="4" transform="rotate(-12 93 103)" fill="#fff" opacity=".55" stroke="${INK}" stroke-width="4"/>
    <rect x="104" y="106" width="20" height="20" rx="4" transform="rotate(16 114 116)" fill="#fff" opacity=".55" stroke="${INK}" stroke-width="4"/>
  </svg>`,
  v60:()=>`<svg viewBox="0 0 200 170" class="float-art" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"><path d="M88 16 q-8 8 0 16"/><path d="M112 16 q-8 8 0 16"/></g>
    <rect x="58" y="38" width="84" height="12" rx="6" fill="${PAPER}" stroke="${INK}" stroke-width="5"/>
    <path d="M64 50 H136 L100 104 Z" fill="${ACCENT}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M82 50 L96 100 M118 50 L104 100" stroke="${INK}" stroke-width="2.5" opacity=".45"/>
    <path d="M100 104 v10" stroke="${COFFEE}" stroke-width="5" stroke-linecap="round"/>
    <path d="M70 122 H130 V134 a16 16 0 0 1 -16 16 H86 a16 16 0 0 1 -16 -16 Z" fill="${PAPER}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <ellipse cx="100" cy="122" rx="30" ry="6" fill="${COFFEE}" stroke="${INK}" stroke-width="5"/>
  </svg>`,
  aeropress:()=>`<svg viewBox="0 0 200 170" class="float-art" xmlns="http://www.w3.org/2000/svg">
    <rect x="80" y="14" width="40" height="14" rx="6" fill="${ACCENT}" stroke="${INK}" stroke-width="5"/>
    <rect x="93" y="26" width="14" height="24" fill="${ACCENT}" stroke="${INK}" stroke-width="5"/>
    <rect x="74" y="48" width="52" height="68" rx="8" fill="${PAPER}" stroke="${INK}" stroke-width="5"/>
    <path d="M74 88 H126 V108 a8 8 0 0 1 -8 8 H82 a8 8 0 0 1 -8 -8 Z" fill="${COFFEE}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M82 120 H118 L112 150 H88 Z" fill="${PAPER}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  </svg>`,
  prensa:()=>`<svg viewBox="0 0 200 170" class="float-art" xmlns="http://www.w3.org/2000/svg">
    <rect x="88" y="12" width="24" height="14" rx="5" fill="${ACCENT}" stroke="${INK}" stroke-width="5"/>
    <rect x="96" y="24" width="8" height="22" fill="${INK}"/>
    <path d="M58 44 H142 L134 58 H66 Z" fill="${ACCENT}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <rect x="66" y="58" width="68" height="86" rx="12" fill="${PAPER}" stroke="${INK}" stroke-width="5"/>
    <path d="M66 96 H134 V132 a12 12 0 0 1 -12 12 H78 a12 12 0 0 1 -12 -12 Z" fill="${COFFEE}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <line x1="70" y1="96" x2="130" y2="96" stroke="${INK}" stroke-width="4"/>
    <path d="M134 72 a24 24 0 0 1 0 52" fill="none" stroke="${INK}" stroke-width="6"/>
  </svg>`
};
function illoFor(d){
  switch(d.art){
    case "cherry": return ILLO.cherry();
    case "tinto": return ILLO.tinto();
    case "espresso": return ILLO.espresso();
    case "milkcup": return ILLO.milk();
    case "iced": return ILLO.cold();
    default: return ILLO.espresso();
  }
}

/* --- Métodos (info general, SIN tiempos ni elaboración) --- */
const METHOD_INFO = {
  v60:{name:"V60", art:"v60",
    text:"Método de filtrado por goteo. Regala una taza limpia, brillante y muy aromática que resalta las notas florales y frutales del café.",
    best:"Ideal para cafés florales, frutales y de acidez delicada."},
  aeropress:{name:"Aeropress", art:"aeropress",
    text:"Método de inmersión y presión. Produce una taza suave, de cuerpo medio y muy equilibrada, sin amargor.",
    best:"Ideal para cafés dulces y balanceados que quieres suaves."},
  prensa:{name:"Prensa Francesa", art:"prensa",
    text:"Método de inmersión total con filtro metálico. Entrega una taza de cuerpo completo, redonda y con mucha textura.",
    best:"Ideal para cafés con cuerpo y notas a chocolate o frutos maduros."},
  espresso:{name:"Espresso", art:"espresso",
    text:"Extracción a presión que concentra el café en un shot con cuerpo y crema dorada. Es la base de nuestras bebidas con leche.",
    best:"La base intensa de cappuccinos, lattes y flat whites."}
};

/* --- Datos de las bebidas --- */
const DRINKS = [
  /* ===== ESPRESSO & CAFÉ (se muestran primero) ===== */
  { id:"tinto", cat:"espresso", name:"Tinto", price:1500, art:"tinto",
    desc:"Café negro de la casa (Castillo). Un buen café de origen, sencillo y muy económico.",
    tags:["Económico","Café negro","Castillo"],
    recipe:"Nuestro Café Castillo servido como un clásico tinto colombiano: negro, suave y aromático. La forma más económica de disfrutar un buen café de origen.",
    specs:[["Café","Castillo de la casa"],["Estilo","Café negro"],["Tamaño","~180 ml"]] },
  { id:"espresso", cat:"espresso", name:"Espresso", price:3500, art:"espresso",
    desc:"Shot puro de café Castillo. Concentrado, con cuerpo y crema dorada.",
    tags:["Shot sencillo","Intenso"],
    recipe:"Un shot de espresso de café Castillo: la forma más pura e intensa de probar nuestro café de la casa.",
    specs:[["Café","Castillo de la casa"],["Tipo","Shot sencillo"],["Volumen","~30 ml"]] },
  { id:"doppio", cat:"espresso", name:"Espresso Doble", price:4500, art:"espresso",
    desc:"Doble shot para quienes buscan más sabor y energía.",
    tags:["Doppio","Doble shot"],
    recipe:"Doble shot de espresso para una taza más intensa y con más cuerpo.",
    specs:[["Café","Castillo de la casa"],["Tipo","Doble shot"],["Volumen","~60 ml"]] },
  { id:"americano", cat:"espresso", name:"Americano", price:4000, art:"espresso",
    desc:"Espresso alargado con agua caliente. Suave y de buen volumen.",
    tags:["Sin leche","Suave"],
    recipe:"Un espresso al que añadimos agua caliente: conserva los aromas con una intensidad más suave. Ideal para acompañar largas jornadas de estudio.",
    specs:[["Café","Castillo de la casa"],["Con","Agua caliente"],["Volumen","~150 ml"]] },
  { id:"macchiato", cat:"espresso", name:"Macchiato", price:4500, art:"milkcup",
    desc:"Espresso con un toque de espuma de leche.",
    tags:["Mucho café","Toque de leche"],
    recipe:"Espresso coronado con una pequeña cantidad de leche espumada que suaviza el shot sin esconder su carácter.",
    specs:[["Café","Castillo de la casa"],["Leche","Toque de espuma"],["Volumen","~45 ml"]] },
  { id:"cortado", cat:"espresso", name:"Cortado", price:5000, art:"milkcup",
    desc:"Espresso con igual cantidad de leche. Equilibrado y suave.",
    tags:["1:1","Equilibrado"],
    recipe:"Partes iguales de espresso y leche: el balance perfecto entre la fuerza del café y la suavidad de la leche.",
    specs:[["Café","Castillo de la casa"],["Proporción","1:1 con leche"],["Volumen","~70 ml"]] },
  { id:"cappuccino", cat:"espresso", name:"Cappuccino", price:6000, art:"milkcup",
    desc:"Espresso, leche y una generosa capa de espuma cremosa.",
    tags:["Clásico","Espumoso"],
    recipe:"El clásico: espresso, leche y una capa generosa de espuma sedosa. Cremoso y reconfortante.",
    specs:[["Café","Castillo de la casa"],["Leche","Vaporizada + espuma"],["Volumen","~150 ml"]] },
  { id:"flatwhite", cat:"espresso", name:"Flat White", price:6500, art:"milkcup",
    desc:"Doble espresso con microespuma fina. Sedoso e intenso.",
    tags:["Doble shot","Microespuma"],
    recipe:"Doble espresso con leche en microespuma muy fina: más café que un latte y una textura aterciopelada.",
    specs:[["Café","Castillo (doble)"],["Leche","Microespuma"],["Volumen","~160 ml"]] },
  { id:"latte", cat:"espresso", name:"Latte", price:6500, art:"milkcup",
    desc:"Espresso con bastante leche. Suave y cremoso.",
    tags:["Suave","Cremoso"],
    recipe:"Un espresso con abundante leche y una fina capa de espuma. La opción más suave, perfecta para empezar el día.",
    specs:[["Café","Castillo de la casa"],["Leche","Vaporizada"],["Volumen","~220 ml"]] },
  { id:"mocha", cat:"espresso", name:"Mocha", price:7500, art:"milkcup",
    desc:"Espresso, chocolate y leche. Dulce y reconfortante.",
    tags:["Con chocolate","Dulce"],
    recipe:"Espresso combinado con chocolate y leche: el antojo dulce ideal para premiarte después de un parcial.",
    specs:[["Café","Castillo de la casa"],["Extra","Chocolate"],["Volumen","~220 ml"]] },

  /* ===== FILTRADOS — single origin ===== */
  { id:"castillo", cat:"filtrado", name:"Castillo Honey", price:7000, art:"cherry", recommend:"aeropress",
    desc:"Avellana, panela, limoncillo, miel y vainilla. Suave, dulce y equilibrado.",
    tags:["Honey","Tostión media","Acevedo–Huila"],
    notes:["Avellana","Panela","Limoncillo","Miel","Vainilla"],
    profile:"Tostión media con el equilibrio perfecto entre cuerpo y acidez. Su dulzor se realza gracias al delicado proceso Honey: una experiencia sofisticada y un verdadero tesoro en cada taza.",
    specs:[["Origen","Acevedo · Huila"],["Variedad","Castillo"],["Proceso","Honey"],["Altitud","1.580 msnm"]], sca:null },
  { id:"bourbon", cat:"filtrado", name:"Bourbon Naranja", price:9000, art:"cherry", recommend:"v60",
    desc:"Flor de naranja, caramelo, toronja, cítrico y panela. Vibrante y sedoso.",
    tags:["Honey","SCA 86.5","San Adolfo–Huila"],
    notes:["Flor de naranja","Caramelo","Toronja","Cítrico","Panela"],
    profile:"Café balanceado y vibrante, con un dulzor sedoso incomparable. La tostión media resalta su complejidad frutal y las notas dulces del proceso Honey. Selección artesanal por finca.",
    specs:[["Origen","San Adolfo · Huila"],["Variedad","Bourbon Naranja"],["Proceso","Honey"],["Altitud","1.720 msnm"]], sca:86.5 },
  { id:"geisha", cat:"filtrado", name:"Geisha Honey", price:10000, art:"cherry", recommend:"v60",
    desc:"Frutos rojos, floral y jazmín. Acidez elegante y textura sedosa.",
    tags:["Honey","SCA 87+","San Adolfo–Huila"],
    notes:["Frutos rojos","Floral","Jazmín"],
    profile:"Acidez alta pero equilibrada, con mucha dulzura. Cuerpo ligero a medio con textura sedosa y un aroma intenso y complejo. El Geisha es una experiencia única para los paladares más exigentes.",
    specs:[["Origen","San Adolfo · Huila"],["Variedad","Geisha"],["Proceso","Honey"],["Altitud","1.750 msnm"]], sca:87 },
  { id:"wush", cat:"filtrado", name:"Wush Wush Natural", price:11000, art:"cherry", recommend:"prensa",
    desc:"Chocolate negro, manzana verde, frutales y el dulzor único del zapote.",
    tags:["Natural","SCA 87+","Cantarito–Huila"],
    notes:["Chocolate negro","Manzana verde","Notas frutales","Zapote"],
    profile:"Una combinación vibrante con notas marcadas a chocolate negro y manzana verde, toques frutales y el dulzor único del zapote. Proceso natural y tostión media para balancear su complejidad.",
    specs:[["Origen","Cantarito · Acevedo, Huila"],["Variedad","Wush Wush"],["Proceso","Natural"],["Altitud","1.580 msnm"]], sca:87 },

  /* ===== FRÍOS ===== */
  { id:"coldbrew", cat:"frio", name:"Cold Brew", price:8000, art:"iced",
    desc:"Café Castillo extraído en frío. Dulce, suave y refrescante.",
    tags:["Frío","Baja acidez"],
    recipe:"Café Castillo extraído en frío y servido sobre hielo. Naturalmente dulce, suave y sin amargor.",
    specs:[["Café","Castillo de la casa"],["Estilo","Extracción en frío"],["Servido","Sobre hielo"]] },
  { id:"icedlatte", cat:"frio", name:"Iced Latte", price:7000, art:"iced",
    desc:"Espresso sobre hielo y leche fría. Cremoso y refrescante.",
    tags:["Frío","Cremoso"],
    recipe:"Espresso vertido sobre hielo y leche fría. Refrescante y cremoso, ideal para los días soleados del campus.",
    specs:[["Café","Castillo de la casa"],["Leche","Fría"],["Servido","Sobre hielo"]] },
  { id:"affogato", cat:"frio", name:"Affogato", price:8000, art:"iced",
    desc:"Helado de vainilla bañado con un shot de espresso.",
    tags:["Postre","Café + helado"],
    recipe:"Una bola de helado de vainilla bañada con un shot de espresso. El contraste frío–caliente convierte el café en un postre delicioso.",
    specs:[["Café","Castillo de la casa"],["Extra","Helado de vainilla"],["Servido","Postre"]] }
];

/* --- Utilidades --- */
const fmt = n => "$" + n.toLocaleString("es-CO");
const $ = sel => document.querySelector(sel);
const scaLabel = p => p>=90?"Excepcional":p>=85?"Excelente":"Muy bueno";

/* --- Render de tarjetas --- */
function cardHTML(d){
  const tags = d.tags.map(t=>`<span class="tag${/SCA/.test(t)?' sca':''}">${t}</span>`).join("");
  return `
    <article class="card" data-id="${d.id}" tabindex="0" role="button" aria-label="Ver ${d.name}">
      <div class="card-art">${illoFor(d)}</div>
      <div class="card-body">
        <div class="card-title"><h3>${d.name}</h3><span class="price">${fmt(d.price)}</span></div>
        <p class="card-desc">${d.desc}</p>
        <div class="card-tags">${tags}</div>
        <span class="card-more">Toca para ver</span>
      </div>
    </article>`;
}
function renderCards(){
  const groups = {filtrado:"#cards-filtrado", espresso:"#cards-espresso", frio:"#cards-frio"};
  Object.entries(groups).forEach(([cat,sel])=>{
    $(sel).innerHTML = DRINKS.filter(d=>d.cat===cat).map(cardHTML).join("");
  });
}

/* --- Guía de métodos --- */
const GUIDE = ["espresso","v60","aeropress","prensa"];
function renderGuide(){
  const g = $("#guideGrid");
  if(!g) return;
  g.innerHTML = GUIDE.map(k=>{
    const m = METHOD_INFO[k];
    return `
    <article class="guide-card" data-method="${k}" tabindex="0" role="button" aria-label="Ver método ${m.name}">
      <div class="card-art">${ILLO[m.art]()}</div>
      <div>
        <h3>${m.name}</h3>
        <p>${m.text}</p>
        <span class="gtag">${m.best}</span>
      </div>
    </article>`;
  }).join("");
}

/* --- Construcción del modal --- */
function modalHTML(d){
  let body = `
    <div class="m-banner">${illoFor(d)}</div>
    <div class="m-wrap">
      <div class="m-title"><h3>${d.name}</h3></div>
      <div><span class="m-price">${fmt(d.price)}</span>`;

  if(d.cat==="filtrado"){
    const rec = METHOD_INFO[d.recommend];
    body += `</div>
      <div class="m-section"><h4>Notas de cata</h4><div class="m-notes">${d.notes.map(n=>`<span class="m-note">${n}</span>`).join("")}</div></div>
      <div class="m-section"><h4>Perfil</h4><p>${d.profile}</p></div>
      <div class="m-rec">
        <span class="ricon">${ILLO[rec.art]()}</span>
        <span><b>Método recomendado: ${rec.name}</b><span>${rec.best}</span></span>
      </div>
      <div class="m-section"><h4>Origen y proceso</h4><ul class="m-specs">${d.specs.map(([k,v])=>`<li><b>${k}</b><span>${v}</span></li>`).join("")}</ul></div>`;
    if(d.sca) body += `<div class="m-sca"><b>SCA ${d.sca}+ · ${scaLabel(d.sca)}.</b> Calificado por catadores expertos sobre 100 puntos. Todo lo que supera 80 es café de especialidad.</div>`;
  } else {
    body += `</div>
      <div class="m-section"><h4>La bebida</h4><p>${d.recipe}</p></div>
      <div class="m-section"><h4>Detalles</h4><ul class="m-specs">${d.specs.map(([k,v])=>`<li><b>${k}</b><span>${v}</span></li>`).join("")}</ul></div>`;
  }

  body += `</div>
    <a class="m-order" href="${waLink(CONFIG.msgItem(d.name))}" target="_blank" rel="noopener" data-order>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Z"/></svg>
      Pedir ${d.name} · ${fmt(d.price)}
    </a>`;
  return body;
}

/* --- Control del modal --- */
const modal = $("#modal"), modalBody = $("#modalBody");
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
function openMethodModal(key){
  const m = METHOD_INFO[key];
  if(!m) return;
  lastFocus = document.activeElement;
  modalBody.innerHTML = `
    <div class="m-banner">${ILLO[m.art]()}</div>
    <div class="m-wrap">
      <div class="m-title"><h3>Método ${m.name}</h3></div>
      <div class="m-section"><h4>Qué es</h4><p>${m.text}</p></div>
      <div class="m-rec"><span class="ricon">${ILLO[m.art]()}</span><span><b>Recomendado para</b><span>${m.best}</span></span></div>
    </div>
    <a class="m-order" href="${waLink(CONFIG.msgGeneral)}" target="_blank" rel="noopener" data-order>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Z"/></svg>
      Pedir por WhatsApp
    </a>`;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  $(".modal-close").focus();
}
function closeModal(){
  modal.hidden = true;
  document.body.style.overflow = "";
  if(lastFocus) lastFocus.focus();
}

/* --- Confetti (sutil, en paleta) --- */
const cv = $("#confetti"), ctx = cv ? cv.getContext("2d") : null;
let parts = [], raf = null;
const CC = ["#c07c43","#a2632f","#bf5b3a","#8a9a73","#e7d3bc","#6b3f1d"];
function sizeCv(){ if(cv){ cv.width = innerWidth; cv.height = innerHeight; } }
addEventListener("resize", sizeCv); sizeCv();
function burst(x, y, n=90){
  if(REDUCED || !ctx) return;
  for(let i=0;i<n;i++){
    parts.push({x,y,vx:(Math.random()-.5)*10,vy:Math.random()*-10-3,g:.3,
      s:Math.random()*7+4,c:CC[i%CC.length],rot:Math.random()*6,vr:(Math.random()-.5)*.45,life:0});
  }
  if(!raf) loop();
}
function loop(){
  ctx.clearRect(0,0,cv.width,cv.height);
  for(const p of parts){
    p.vy+=p.g; p.x+=p.vx; p.y+=p.vy; p.rot+=p.vr; p.life++;
    ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot);
    ctx.fillStyle=p.c; ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s*0.62); ctx.restore();
  }
  parts = parts.filter(p=>p.y < cv.height+50 && p.life < 220);
  if(parts.length) raf = requestAnimationFrame(loop);
  else { raf = null; ctx.clearRect(0,0,cv.width,cv.height); }
}

/* --- Eventos --- */
function bindEvents(){
  document.querySelectorAll(".cards").forEach(c=>{
    c.addEventListener("click", e=>{ const card=e.target.closest(".card"); if(card) openModal(card.dataset.id); });
    c.addEventListener("keydown", e=>{ const card=e.target.closest(".card");
      if(card && (e.key==="Enter"||e.key===" ")){ e.preventDefault(); openModal(card.dataset.id); } });
  });
  $("#guideGrid").addEventListener("click", e=>{ const g=e.target.closest(".guide-card"); if(g) openMethodModal(g.dataset.method); });
  $("#guideGrid").addEventListener("keydown", e=>{ const g=e.target.closest(".guide-card");
    if(g && (e.key==="Enter"||e.key===" ")){ e.preventDefault(); openMethodModal(g.dataset.method); } });

  modal.querySelectorAll("[data-close]").forEach(el=>el.addEventListener("click", closeModal));
  document.addEventListener("keydown", e=>{ if(e.key==="Escape" && !modal.hidden) closeModal(); });
  modalBody.addEventListener("click", e=>{ if(e.target.closest("[data-order]")) burst(window.innerWidth/2, window.innerHeight*0.8, 110); });

  $("#filters").addEventListener("click", e=>{
    const chip = e.target.closest(".chip"); if(!chip) return;
    document.querySelectorAll(".chip").forEach(c=>c.classList.remove("active"));
    chip.classList.add("active");
    const f = chip.dataset.filter;
    document.querySelectorAll(".menu-section").forEach(sec=>{
      sec.classList.toggle("hide", !(f==="all" || sec.dataset.cat===f));
    });
    revealCards();
  });
}

/* --- Aparición de tarjetas al hacer scroll --- */
let io;
function revealCards(){
  const cards = document.querySelectorAll(".card:not(.in)");
  if(!("IntersectionObserver" in window)){ cards.forEach(c=>c.classList.add("in")); return; }
  if(!io){
    io = new IntersectionObserver(ents=>{
      ents.forEach((en,i)=>{ if(en.isIntersecting){ en.target.style.transitionDelay=(Math.min(i,6)*70)+"ms"; en.target.classList.add("in"); io.unobserve(en.target); } });
    }, {threshold:.12, rootMargin:"0px 0px -40px 0px"});
  }
  cards.forEach(c=>io.observe(c));
}

/* --- Init --- */
renderCards();
renderGuide();
bindEvents();
revealCards();

const gWa = waLink(CONFIG.msgGeneral);
["#fabWa","#footerWa"].forEach(sel=>{ const el=$(sel); if(el) el.href = gWa; });

window.addEventListener("load", ()=>{ const l=$("#loader"); if(l) setTimeout(()=>l.classList.add("done"), 700); });
