/* ===== Akroma Coffee — lógica del menú (versión divertida) ===== */

/* --- Configuración del negocio (edítala fácilmente) --- */
const CONFIG = {
  whatsapp: "573026026027",            // <-- número en formato internacional, sin + ni espacios
  msgGeneral: "¡Hola Akroma! Quiero hacer un pedido ☕",
  msgItem: name => `¡Hola Akroma! Quiero pedir un *${name}* ☕`
};
const waLink = msg => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --- Colores base para las ilustraciones --- */
const INK="#3a2415", ORANGE="#ff7a3d", TEAL="#27b9a6", PINK="#ff5d8f", CREMA="#cf9a5a", COFFEE="#6b3f1d";

/* --- Librería de ilustraciones SVG (coloridas y juguetonas) --- */
const ILLO = {
  cherry:(berry,leaf="#4fb477")=>`<svg viewBox="0 0 200 170" class="float-art" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"><path d="M100 42 C 82 66 80 80 80 94"/><path d="M100 42 C 118 66 120 80 120 94"/></g>
    <path d="M100 44 q 36 -28 62 -8 q -24 32 -62 8 z" fill="${leaf}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M112 30 q 16 -4 28 4" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="80" cy="118" r="27" fill="${berry}" stroke="${INK}" stroke-width="5"/>
    <circle cx="122" cy="118" r="27" fill="${berry}" stroke="${INK}" stroke-width="5"/>
    <circle cx="72" cy="110" r="6.5" fill="#fff" opacity=".75"/>
    <circle cx="114" cy="110" r="6.5" fill="#fff" opacity=".75"/>
  </svg>`,
  espresso:(crema=CREMA)=>`<svg viewBox="0 0 200 170" class="float-art" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"><path d="M86 32 q-9 9 0 18 q9 9 0 18"/><path d="M114 32 q-9 9 0 18 q9 9 0 18"/></g>
    <path d="M60 80 H134 V98 a30 30 0 0 1 -30 30 H90 a30 30 0 0 1 -30 -30 Z" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <ellipse cx="97" cy="80" rx="37" ry="9" fill="${crema}" stroke="${INK}" stroke-width="5"/>
    <path d="M134 88 a18 18 0 0 1 0 30" fill="none" stroke="${INK}" stroke-width="6"/>
    <ellipse cx="100" cy="142" rx="52" ry="10" fill="#fff" stroke="${INK}" stroke-width="5"/>
  </svg>`,
  milk:(art=CREMA)=>`<svg viewBox="0 0 200 170" class="float-art" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"><path d="M88 22 q-9 9 0 18"/><path d="M112 22 q-9 9 0 18"/></g>
    <path d="M54 56 H146 V100 a44 44 0 0 1 -44 44 H98 a44 44 0 0 1 -44 -44 Z" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <ellipse cx="100" cy="56" rx="46" ry="12" fill="#fff4e2" stroke="${INK}" stroke-width="5"/>
    <path d="M100 72 c -8 -12 -27 -5 -20 9 c 5 9 20 17 20 17 c 0 0 15 -8 20 -17 c 7 -14 -12 -21 -20 -9 z" fill="${art}" stroke="${INK}" stroke-width="3.5"/>
    <path d="M146 72 a18 18 0 0 1 0 30" fill="none" stroke="${INK}" stroke-width="6"/>
  </svg>`,
  cold:(liquid=COFFEE)=>`<svg viewBox="0 0 200 170" class="float-art" xmlns="http://www.w3.org/2000/svg">
    <rect x="108" y="14" width="11" height="124" rx="5" transform="rotate(10 113 76)" fill="${PINK}" stroke="${INK}" stroke-width="4.5"/>
    <path d="M66 42 H134 L124 150 H76 Z" fill="#eaf6ff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M71 88 H129 L124 150 H76 Z" fill="${liquid}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <rect x="82" y="92" width="22" height="22" rx="4" transform="rotate(-12 93 103)" fill="#fff" opacity=".88" stroke="${INK}" stroke-width="4"/>
    <rect x="104" y="106" width="20" height="20" rx="4" transform="rotate(16 114 116)" fill="#fff" opacity=".88" stroke="${INK}" stroke-width="4"/>
  </svg>`,
  v60:()=>`<svg viewBox="0 0 200 170" class="float-art" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"><path d="M88 16 q-8 8 0 16"/><path d="M112 16 q-8 8 0 16"/></g>
    <rect x="58" y="38" width="84" height="12" rx="6" fill="#fff" stroke="${INK}" stroke-width="5"/>
    <path d="M64 50 H136 L100 104 Z" fill="${ORANGE}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M82 50 L96 100 M118 50 L104 100" stroke="${INK}" stroke-width="2.5" opacity=".5"/>
    <path d="M100 104 v10" stroke="${COFFEE}" stroke-width="5" stroke-linecap="round"/>
    <path d="M70 122 H130 V134 a16 16 0 0 1 -16 16 H86 a16 16 0 0 1 -16 -16 Z" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <ellipse cx="100" cy="122" rx="30" ry="6" fill="${COFFEE}" stroke="${INK}" stroke-width="5"/>
  </svg>`,
  aeropress:()=>`<svg viewBox="0 0 200 170" class="float-art" xmlns="http://www.w3.org/2000/svg">
    <rect x="80" y="14" width="40" height="14" rx="6" fill="${TEAL}" stroke="${INK}" stroke-width="5"/>
    <rect x="93" y="26" width="14" height="24" fill="${TEAL}" stroke="${INK}" stroke-width="5"/>
    <rect x="74" y="48" width="52" height="68" rx="8" fill="#fff" stroke="${INK}" stroke-width="5"/>
    <path d="M74 88 H126 V108 a8 8 0 0 1 -8 8 H82 a8 8 0 0 1 -8 -8 Z" fill="${COFFEE}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M82 120 H118 L112 150 H88 Z" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  </svg>`
};
function illoFor(d){
  switch(d.art){
    case "cherry": return ILLO.cherry(d.tint, d.leaf);
    case "espresso": return ILLO.espresso();
    case "milkcup": return ILLO.milk();
    case "iced": return ILLO.cold();
    default: return ILLO.espresso();
  }
}
const bannerStyle = d => `background:linear-gradient(150deg, ${d.bg[0]}, ${d.bg[1]})`;

/* --- Explicaciones de métodos --- */
const METHOD_INFO = {
  v60:{name:"V60", art:"v60",
    text:"Filtrado por goteo en cono de Hario. Vertemos agua a ~92°C de forma circular sobre 20 g de café molido medio. El agua atraviesa el filtro por gravedad y regala una taza limpia, brillante y súper aromática que resalta las notas florales y frutales.",
    steps:["20 g de café, molienda media","Enjuaga el filtro + 'bloom' con 40 ml (40 s)","Vertidos circulares hasta 300 ml","Tiempo total: 2:30 – 3:00 min"]},
  aeropress:{name:"Aeropress", art:"aeropress",
    text:"Método de inmersión y presión. El café reposa sumergido en agua y luego se empuja con un émbolo a través del filtro. ¿Resultado? Un café de cuerpo medio, suave, equilibrado y sin amargor. ¡Y perdona errores!",
    steps:["20 g de café, molienda media-fina","Inmersión con 220 ml de agua a ~88°C","Reposo y agitado: 1:00 – 1:30 min","Presión suave del émbolo: 20 – 30 s"]},
  espresso:{name:"Espresso", art:"espresso",
    text:"Extracción a presión: ~9 bares empujan agua a ~93°C a través de café finamente molido y compactado. En 25–30 segundos sale un shot concentrado, con cuerpo y una crema dorada que es la base de todas nuestras bebidas con leche.",
    steps:["18 g de Café Castillo, molienda fina","Compactado (tamper) uniforme","Extracción: 9 bares · 25–30 s","Rendimiento: ~36 ml (espresso doble)"]},
  coldbrew:{name:"Cold Brew", art:"iced",
    text:"Extracción en frío durante 12–18 horas. Sin calor, el café libera dulzor y suavidad con muy baja acidez y nada de amargor. Servido bien frío sobre hielo.",
    steps:["70 g de café por litro, molienda gruesa","Reposo en agua fría: 12–18 h","Filtrado fino","¡Servido sobre mucho hielo!"]}
};

/* --- Datos de las bebidas --- */
const DRINKS = [
  /* ===== FILTRADOS ===== */
  { id:"castillo", cat:"filtrado", name:"Castillo Honey", price:7000, art:"cherry",
    tint:"#f4b740", leaf:"#4fb477", bg:["#ffe8a3","#ffc24b"], methods:["v60","aeropress"],
    desc:"Avellana, panela, limoncillo, miel y vainilla. ¡Suave, dulce y equilibrado!",
    tags:["Honey","Tostión media","Acevedo–Huila"],
    notes:["Avellana","Panela","Limoncillo","Miel","Vainilla"],
    profile:"Tostión media con el equilibrio perfecto entre cuerpo y acidez. Su dulzor se realza gracias al delicado proceso Honey: una experiencia sofisticada y un verdadero tesoro en cada taza.",
    specs:[["Origen","Acevedo · Huila"],["Variedad","Castillo"],["Proceso","Honey"],["Altitud","1.580 msnm"]], sca:null },
  { id:"bourbon", cat:"filtrado", name:"Bourbon Naranja", price:9000, art:"cherry",
    tint:"#ff7a3d", leaf:"#4fb477", bg:["#ffd0a8","#ff9a3d"], methods:["v60","aeropress"],
    desc:"Flor de naranja, caramelo, toronja, cítrico y panela. ¡Vibrante y sedoso!",
    tags:["Honey 120h","SCA 86.5","San Adolfo–Huila"],
    notes:["Flor de naranja","Caramelo","Toronja","Cítrico","Panela"],
    profile:"Café balanceado y vibrante, con un dulzor sedoso incomparable potenciado por un fermento de 120 horas. La tostión media resalta su complejidad frutal y las notas dulces del proceso Honey. Selección artesanal por finca.",
    specs:[["Origen","San Adolfo · Huila"],["Variedad","Bourbon Naranja"],["Proceso","Honey · fermento 120 h"],["Altitud","1.720 msnm"]], sca:86.5 },
  { id:"geisha", cat:"filtrado", name:"Geisha Honey", price:10000, art:"cherry",
    tint:"#ff5d8f", leaf:"#4fb477", bg:["#ffd0e0","#ff8fb4"], methods:["v60","aeropress"],
    desc:"Frutos rojos, floral y jazmín. Acidez elegante y textura sedosa. 🌸",
    tags:["Honey 25 días","SCA 87+","San Adolfo–Huila"],
    notes:["Frutos rojos","Floral","Jazmín"],
    profile:"Acidez alta pero equilibrada, con mucha dulzura por su proceso Honey. Cuerpo ligero a medio con textura sedosa y un aroma intenso y complejo. El Geisha es una experiencia única para los paladares más exigentes.",
    specs:[["Origen","San Adolfo · Huila"],["Variedad","Geisha"],["Proceso","Honey · secado 25 días"],["Fermento","24 horas"],["Altitud","1.750 msnm"]], sca:87 },
  { id:"wush", cat:"filtrado", name:"Wush Wush Natural", price:11000, art:"cherry",
    tint:"#a45bff", leaf:"#4fb477", bg:["#e0d0ff","#bda0ff"], methods:["v60","aeropress"],
    desc:"Chocolate negro, manzana verde, frutales y el dulzor único del zapote.",
    tags:["Natural 180h","SCA 87+","Cantarito–Huila"],
    notes:["Chocolate negro","Manzana verde","Notas frutales","Zapote"],
    profile:"Una combinación vibrante con notas marcadas a chocolate negro y manzana verde, toques frutales y el dulzor único del zapote. Proceso natural con fermentación extendida de 180 horas y tostión media para balancear su complejidad.",
    specs:[["Origen","Cantarito · Acevedo, Huila"],["Variedad","Wush Wush"],["Proceso","Natural · fermento 180 h"],["Altitud","1.580 msnm"]], sca:87 },

  /* ===== ESPRESSO ===== */
  { id:"espresso", cat:"espresso", name:"Espresso", price:3500, art:"espresso", base:"espresso", bg:["#ffe2c2","#ffb877"],
    desc:"Shot puro de café Castillo. Concentrado, con cuerpo y crema dorada.",
    tags:["Single shot","9 bares"],
    recipe:"Un shot de espresso (~9 g de café). ¡La forma más pura de probar nuestro café de la casa!",
    specs:[["Café","Castillo de la casa"],["Volumen","~30 ml"],["Extracción","25–30 s"]] },
  { id:"doppio", cat:"espresso", name:"Espresso Doble", price:4500, art:"espresso", base:"espresso", bg:["#ffd0a8","#ff9a3d"],
    desc:"Doble shot para los que necesitan MUCHA energía y sabor. ⚡",
    tags:["Doppio","18 g"],
    recipe:"Doble shot de espresso (18 g de café) para una taza más intensa y con más cuerpo.",
    specs:[["Café","Castillo de la casa"],["Volumen","~60 ml"],["Extracción","25–30 s"]] },
  { id:"americano", cat:"espresso", name:"Americano", price:4000, art:"espresso", base:"espresso", bg:["#ffe6cc","#ffc28a"],
    desc:"Espresso alargado con agua caliente. Suave y de buen volumen.",
    tags:["Sin leche","Suave"],
    recipe:"Un shot de espresso al que añadimos agua caliente: conserva los aromas con menor intensidad. Ideal para largas jornadas de estudio.",
    specs:[["Café","Castillo de la casa"],["Volumen","~150 ml"],["Leche","No"]] },
  { id:"macchiato", cat:"espresso", name:"Macchiato", price:4500, art:"milkcup", base:"espresso", bg:["#ffe0ec","#ffb3cd"],
    desc:"Espresso 'manchado' con un toque de espuma de leche.",
    tags:["Mucho café","Toque de leche"],
    recipe:"Espresso coronado con una pequeña cucharada de leche espumada. Suaviza el shot sin esconder su carácter.",
    specs:[["Café","Castillo de la casa"],["Leche","~15 ml espuma"],["Volumen","~45 ml"]] },
  { id:"cortado", cat:"espresso", name:"Cortado", price:5000, art:"milkcup", base:"espresso", bg:["#d9f5f0","#9fe6da"],
    desc:"Espresso 'cortado' con igual cantidad de leche vaporizada.",
    tags:["1:1","Equilibrado"],
    recipe:"Partes iguales de espresso y leche vaporizada (1:1). ¡El balance perfecto entre fuerza del café y suavidad de la leche!",
    specs:[["Café","Castillo de la casa"],["Leche","~30 ml vaporizada"],["Volumen","~70 ml"]] },
  { id:"cappuccino", cat:"espresso", name:"Cappuccino", price:6000, art:"milkcup", base:"espresso", bg:["#fff0d6","#ffd27e"],
    desc:"Espresso, leche vaporizada y una generosa capa de espuma cremosa.",
    tags:["1:1:1","Espumoso"],
    recipe:"El clásico: un tercio de espresso, un tercio de leche vaporizada y un tercio de espuma sedosa. Cremoso y reconfortante.",
    specs:[["Café","Castillo de la casa"],["Leche","~120 ml + espuma"],["Volumen","~150 ml"]] },
  { id:"flatwhite", cat:"espresso", name:"Flat White", price:6500, art:"milkcup", base:"espresso", bg:["#e6e0ff","#c3b0ff"],
    desc:"Doble espresso con microespuma fina. Sedoso e intenso.",
    tags:["Doble shot","Microespuma"],
    recipe:"Doble espresso con leche texturizada en microespuma muy fina y poca capa de espuma. Más café que un latte, con textura aterciopelada.",
    specs:[["Café","Castillo de la casa"],["Leche","~130 ml microespuma"],["Volumen","~160 ml"]] },
  { id:"latte", cat:"espresso", name:"Latte", price:6500, art:"milkcup", base:"espresso", bg:["#ffeede","#ffd0a8"],
    desc:"Espresso con bastante leche vaporizada. Suave y cremoso. 🥛",
    tags:["Suave","Cremoso"],
    recipe:"Un shot de espresso con abundante leche vaporizada y una fina capa de espuma. La opción más suave, perfecta para empezar el día.",
    specs:[["Café","Castillo de la casa"],["Leche","~200 ml vaporizada"],["Volumen","~220 ml"]] },
  { id:"mocha", cat:"espresso", name:"Mocha", price:7500, art:"milkcup", base:"espresso", bg:["#ecd6c2","#c99a6b"],
    desc:"Espresso, chocolate y leche vaporizada. ¡Dulce y reconfortante!",
    tags:["Con chocolate","Dulce"],
    recipe:"Espresso combinado con chocolate y leche vaporizada. El antojo dulce ideal para premiarte después de un parcial. 🍫",
    specs:[["Café","Castillo de la casa"],["Extra","Chocolate"],["Volumen","~220 ml"]] },

  /* ===== FRÍOS ===== */
  { id:"coldbrew", cat:"frio", name:"Cold Brew", price:8000, art:"iced", base:"coldbrew", bg:["#d9f5f0","#7fd9c8"],
    desc:"Extracción en frío 12–18 h con café Castillo. Dulce, suave y refrescante.",
    tags:["Frío","Baja acidez"],
    recipe:"Café Castillo extraído en frío durante 12 a 18 horas y servido sobre hielo. Naturalmente dulce, suave y sin amargor.",
    specs:[["Café","Castillo de la casa"],["Extracción","12–18 h en frío"],["Servido","Sobre hielo"]] },
  { id:"icedlatte", cat:"frio", name:"Iced Latte", price:7000, art:"iced", base:"espresso", bg:["#e0f0ff","#a8d8ff"],
    desc:"Espresso sobre hielo y leche fría. Cremoso y refrescante.",
    tags:["Frío","Cremoso"],
    recipe:"Espresso vertido sobre hielo y leche fría. Refrescante y cremoso, ideal para los días soleados del campus.",
    specs:[["Café","Castillo de la casa"],["Leche","~200 ml fría"],["Servido","Sobre hielo"]] },
  { id:"affogato", cat:"frio", name:"Affogato", price:8000, art:"iced", base:"espresso", bg:["#ffe0ec","#ffb3cd"],
    desc:"Helado de vainilla 'ahogado' en un shot de espresso caliente. 🍨",
    tags:["Postre","Café + helado"],
    recipe:"Una bola de helado de vainilla bañada con un shot de espresso caliente. El contraste frío–caliente convierte el café en un postre delicioso.",
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
      <div class="card-art" style="${bannerStyle(d)}">${illoFor(d)}</div>
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
const GUIDE = [
  {key:"v60", title:"V60", tag:"Claridad y aromas", blurb:"Para quien ama las notas florales y frutales, y una taza limpia y brillante."},
  {key:"aeropress", title:"Aeropress", tag:"Suave y versátil", blurb:"Cuerpo medio, equilibrado y sin amargor. Rápido y perdona errores."},
  {key:"espresso", title:"Espresso", tag:"Intenso y con crema", blurb:"Concentrado y con cuerpo. La base de cappuccinos, lattes y flat whites."}
];
function renderGuide(){
  const g = $("#guideGrid");
  if(!g) return;
  g.innerHTML = GUIDE.map(x=>`
    <article class="guide-card" data-method="${x.key}" tabindex="0" role="button" aria-label="Ver método ${x.title}">
      <div class="card-art">${ILLO[x.key]()}</div>
      <div>
        <h3>${x.title}</h3>
        <p>${x.blurb}</p>
        <span class="gtag">${x.tag}</span>
      </div>
    </article>`).join("");
}

/* --- Construcción del modal --- */
function modalHTML(d){
  let body = `
    <div class="m-banner" style="${bannerStyle(d)}">${illoFor(d)}</div>
    <div class="m-wrap">
      <div class="m-title"><h3>${d.name}</h3></div>
      <div><span class="m-price">${fmt(d.price)}</span>`;

  if(d.cat==="filtrado"){
    body += `</div>
      <div class="m-section"><h4>👅 Notas de cata</h4><div class="m-notes">${d.notes.map(n=>`<span class="m-note">${n}</span>`).join("")}</div></div>
      <div class="m-section"><h4>✨ Perfil</h4><p>${d.profile}</p></div>
      <div class="m-section"><h4>🌎 Origen y proceso</h4><ul class="m-specs">${d.specs.map(([k,v])=>`<li><b>${k}</b><span>${v}</span></li>`).join("")}</ul></div>`;
    d.methods.forEach(mk=>{
      const m = METHOD_INFO[mk];
      body += `<div class="m-section"><h4>☕ Preparación · ${m.name}</h4><p>${m.text}</p><ol class="m-steps">${m.steps.map(s=>`<li>${s}</li>`).join("")}</ol></div>`;
    });
    if(d.sca) body += `<div class="m-sca">⭐ <b>SCA ${d.sca}+ · ${scaLabel(d.sca)}.</b> Calificado por catadores expertos sobre 100 puntos. ¡Todo lo que supere 80 es café de especialidad!</div>`;
  } else {
    const m = METHOD_INFO[d.base];
    body += ` <span class="m-method">Café Castillo de la casa</span></div>
      <div class="m-section"><h4>🍵 La bebida</h4><p>${d.recipe}</p></div>
      <div class="m-section"><h4>📋 Detalles</h4><ul class="m-specs">${d.specs.map(([k,v])=>`<li><b>${k}</b><span>${v}</span></li>`).join("")}</ul></div>
      <div class="m-section"><h4>⚙️ ¿Cómo se prepara? · ${m.name}</h4><p>${m.text}</p><ol class="m-steps">${m.steps.map(s=>`<li>${s}</li>`).join("")}</ol></div>`;
  }

  body += `</div>
    <a class="m-order" href="${waLink(CONFIG.msgItem(d.name))}" target="_blank" rel="noopener" data-order>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Z"/></svg>
      ¡Pedir ${d.name}! · ${fmt(d.price)}
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
  burst(window.innerWidth/2, window.innerHeight*0.35, 60);
}
function openMethodModal(key){
  const m = METHOD_INFO[key];
  if(!m) return;
  lastFocus = document.activeElement;
  modalBody.innerHTML = `
    <div class="m-banner" style="background:linear-gradient(150deg,#fff0d6,#ffd27e)">${ILLO[key]()}</div>
    <div class="m-wrap">
      <div class="m-title"><h3>Método ${m.name}</h3></div>
      <div class="m-section"><h4>🔎 Cómo funciona</h4><p>${m.text}</p></div>
      <div class="m-section"><h4>📝 Nuestra receta</h4><ol class="m-steps">${m.steps.map(s=>`<li>${s}</li>`).join("")}</ol></div>
    </div>
    <a class="m-order" href="${waLink(CONFIG.msgGeneral)}" target="_blank" rel="noopener" data-order>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Z"/></svg>
      ¡Pedir por WhatsApp!
    </a>`;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  $(".modal-close").focus();
  burst(window.innerWidth/2, window.innerHeight*0.35, 60);
}
function closeModal(){
  modal.hidden = true;
  document.body.style.overflow = "";
  if(lastFocus) lastFocus.focus();
}

/* --- Confetti 🎉 --- */
const cv = $("#confetti"), ctx = cv ? cv.getContext("2d") : null;
let parts = [], raf = null;
const CC = ["#ff7a3d","#ff5d8f","#a45bff","#27b9a6","#ffc24b","#ffffff"];
function sizeCv(){ if(cv){ cv.width = innerWidth; cv.height = innerHeight; } }
addEventListener("resize", sizeCv); sizeCv();
function burst(x, y, n=70){
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
  // Confeti al pedir 🎉
  modalBody.addEventListener("click", e=>{ if(e.target.closest("[data-order]")) burst(window.innerWidth/2, window.innerHeight*0.8, 120); });

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
