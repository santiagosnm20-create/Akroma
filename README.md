# ☕ Akroma Coffee — Carta Virtual

Menú digital **interactivo y mobile-first** para Akroma Coffee, una cafetería de especialidad
enfocada en métodos **V60**, **Aeropress** y **espresso**, con cafés *single origin* del Huila, Colombia.

Pensado para estudiantes de universidad pública: precios justos y experiencia bonita.

## ✨ Características

- **Diseño mobile-first** con paleta café/dorado y tipografías elegantes.
- **Filtros por método**: Filtrados · Espresso · Fríos.
- **Modales interactivos** al tocar cada bebida: notas de cata, origen, proceso, pasos de preparación y puntaje SCA.
- **Guía "¿Qué método elegir?"** (V60 / Aeropress / Espresso).
- **Sección educativa SCA** y **"Nuestro origen"** (historia del Huila).
- **Pedidos por WhatsApp** (botón flotante + botón en cada bebida).
- **Logo SVG animado** y pantalla de carga.
- Sin dependencias ni build: **HTML + CSS + JS puro**.

## 💰 Lógica de precios (COP)

**Filtrados** — 20 g por porción (1 libra = 500 g):

| Café | Libra | Costo grano | Precio |
|------|------:|------------:|-------:|
| Castillo Honey | $45.000 | $1.800 | **$7.000** |
| Bourbon Naranja | $75.000 | $3.000 | **$9.000** |
| Geisha Honey | $81.000 | $3.240 | **$10.000** |
| Wush Wush Natural | $87.000 | $3.480 | **$11.000** |

**Espresso** — Café Castillo de la casa ($150.000 / 2.5 kg = $60/g).

## 🚀 Uso

Abre `index.html` en cualquier navegador. No requiere servidor ni instalación.

### Configurar WhatsApp
En `script.js`, edita la constante `CONFIG.whatsapp` con el número real en formato internacional
(ej: `573001234567`, sin `+` ni espacios).

### Publicar gratis con GitHub Pages
`Settings` → `Pages` → Source: rama `main` / carpeta `/root` → **Save**.
En unos minutos tendrás una URL pública para abrir el menú desde cualquier celular o compartir por QR.

## 📁 Estructura

```
.
├── index.html      # Estructura y contenido
├── styles.css      # Estilos, animaciones y responsive
├── script.js       # Datos del menú, modales, filtros y WhatsApp
└── assets/
    └── logo.svg    # Logo de Akroma Coffee
```

---

Café de especialidad del Huila, Colombia. 🇨🇴
