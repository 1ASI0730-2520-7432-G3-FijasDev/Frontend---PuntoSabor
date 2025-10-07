<!-- src/contact/presentation/views/contact.view.vue -->
<template>
  <section class="wrap contact" aria-labelledby="title">
    <header class="page-head">
      <h1 id="title" class="section-title">{{ $t('contact.title') }}</h1>
      <p class="section-sub">
        {{ $t('home.subhead') }}
      </p>
    </header>

    <div class="sheet">
      <div class="contact-grid">
        <!-- ===== Formulario ===== -->
        <form class="card form-card" @submit.prevent="onSubmit">
          <div class="card__head">
            <span class="badge-ico">
              <!-- Mail -->
              <svg viewBox="0 0 24 24" class="ico-svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                      d="M21 8.25v7.5A2.25 2.25 0 0 1 18.75 18h-13.5A2.25 2.25 0 0 1 3 15.75v-7.5A2.25 2.25 0 0 1 5.25 6h13.5A2.25 2.25 0 0 1 21 8.25Z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                      d="M3.75 7.5 12 12.75 20.25 7.5"/>
              </svg>
            </span>
            <h3 class="card__title">Escríbenos</h3>
          </div>

          <div class="card__body">
            <div class="field">
              <label for="name">Nombre</label>
              <input id="name" v-model.trim="form.name" type="text" autocomplete="name" required placeholder="Tu nombre" />
            </div>

            <div class="field">
              <label for="email">Correo</label>
              <input id="email" v-model.trim="form.email" type="email" autocomplete="email" required placeholder="tucorreo@dominio.com" />
            </div>

            <div class="field">
              <label for="message">Mensaje</label>
              <textarea id="message" v-model.trim="form.message" rows="6" required placeholder="Cuéntanos en qué podemos ayudarte…"></textarea>
            </div>

            <div class="actions">
              <button class="btn" type="submit" :disabled="!canSend || sending">
                <span v-if="!sending">Enviar</span>
                <span v-else>Enviando…</span>
              </button>
              <span v-if="sent" class="sent-badge">{{ $t('contact.sent') }}</span>
            </div>
          </div>
        </form>

        <!-- ===== Mapa + info ===== -->
        <aside class="card map-card" aria-label="Mapa y datos de contacto">
          <div class="card__head">
            <span class="badge-ico">
              <!-- Pin -->
              <svg viewBox="0 0 24 24" class="ico-svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                      d="M12 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                      d="M19.5 10.5c0 5.25-7.5 10.125-7.5 10.125S4.5 15.75 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
              </svg>
            </span>
            <h3 class="card__title">Ubícanos</h3>
          </div>

          <div class="card__body map-body">
            <div ref="mapEl" class="map" aria-label="Mapa de ubicación"></div>

            <ul class="contact-info">
              <li>
                <span class="badge-ico badge-ico--sm">
                  <!-- Home -->
                  <svg viewBox="0 0 24 24" class="ico-svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                          d="M3 9.75 12 3l9 6.75M4.5 10.875V21h15V10.875"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                          d="M9 21v-6h6v6"/>
                  </svg>
                </span>
                <span>Av. Sabor 123, Lima</span>
              </li>

              <li>
                <span class="badge-ico badge-ico--sm">
                  <!-- Phone -->
                  <svg viewBox="0 0 24 24" class="ico-svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                          d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h1.39c.93 0 1.748.622 1.98 1.523l.71 2.762c.2.781-.123 1.61-.81 2.07l-1.12.747a.75.75 0 0 0-.27.936A12.03 12.03 0 0 0 11.462 16.5a.75.75 0 0 0 .936-.27l.747-1.12c.46-.687 1.289-1.01 2.07-.81l2.762.71c.901.232 1.523 1.05 1.523 1.98v1.39c0 1.243-1.007 2.25-2.25 2.25h-.75C8.6 21 3 15.4 3 8.25v-.75Z"/>
                  </svg>
                </span>
                <a href="tel:+51999999999">+51 999 999 999</a>
              </li>

              <li>
                <span class="badge-ico badge-ico--sm">
                  <!-- Mail -->
                  <svg viewBox="0 0 24 24" class="ico-svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                          d="M21 8.25v7.5A2.25 2.25 0 0 1 18.75 18h-13.5A2.25 2.25 0 0 1 3 15.75v-7.5A2.25 2.25 0 0 1 5.25 6h13.5A2.25 2.25 0 0 1 21 8.25Z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                          d="M3.75 7.5 12 12.75 20.25 7.5"/>
                  </svg>
                </span>
                <a href="mailto:hola@puntosabor.com">hola@puntosabor.com</a>
              </li>

              <li>
                <span class="badge-ico badge-ico--sm">
                  <!-- Clock -->
                  <svg viewBox="0 0 24 24" class="ico-svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                          d="M12 6v6l4 2"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                          d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                </span>
                <span>Lun–Vie: 9:00–18:00</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, computed, ref, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// TU LOGO
import smallLogo from '@/assets/slogoPuntoSabor.png';

const form = reactive({ name: '', email: '', message: '' });
const sending = ref(false);
const sent = ref(false);

const canSend = computed(() => {
  const emailOk = /\S+@\S+\.\S+/.test(form.email || '');
  return !!form.name?.trim() && emailOk && !!form.message?.trim();
});

async function onSubmit() {
  if (!canSend.value || sending.value) return;
  sending.value = true; sent.value = false;
  await new Promise(r => setTimeout(r, 900));
  sending.value = false; sent.value = true;
  setTimeout(() => { sent.value = false; }, 3000);
}

/* ===== Leaflet ===== */
const mapEl = ref(null);
const center = [-12.0464, -77.0428];

onMounted(() => {
  if (!mapEl.value) return;

  const map = L.map(mapEl.value, { scrollWheelZoom: true, zoomControl: true }).setView(center, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
  }).addTo(map);

  // === Marker con TU LOGO ===
  const psIcon = L.icon({
    iconUrl: smallLogo,
    iconSize: [44, 44],      // ajusta si lo quieres más grande/pequeño
    iconAnchor: [22, 42],    // base del pin
    popupAnchor: [0, -40],
    className: 'ps-marker'
  });

  L.marker(center, { icon: psIcon })
      .addTo(map)
      .bindPopup('<b>PuntoSabor</b><br>Av. Sabor 123, Lima')
      .openPopup();

  setTimeout(() => map.invalidateSize(), 250);
});
</script>

<style scoped>
:root{
  --bg: #e4f0bd;
  --bg-alt: #f5f8e6;
  --brown: #6f4228;
  --orange: #e3891b;

  --card-bg: #ffffff;
  --card-stroke: #eadcc8;

  --radius-lg: 26px;
  --radius: 18px;
  --shadow-1: 0 10px 26px rgba(0,0,0,.08);
  --ring: 0 0 0 3px rgba(227,137,27,.28);
}

.contact{
  padding-bottom: 28px;
  background: linear-gradient(180deg, var(--bg-alt) 0%, var(--bg) 100%);
  border-radius: var(--radius);
}
.page-head{ margin-bottom: 12px; }
.section-title{ color: var(--brown); margin: 0 0 6px; }
.section-sub{ color:#637257; margin:0 0 16px; }

.sheet{
  background: linear-gradient(180deg, #fffdf8 0%, #fffaf1 100%);
  border: 1px solid var(--card-stroke);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-1);
  padding: 18px;
}

.contact-grid{
  display: grid;
  grid-template-columns: minmax(0,1.05fr) minmax(0,1fr);
  gap: 16px;
  align-items: start;
}

.card{
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--card-stroke);
  box-shadow: var(--shadow-1);
  overflow: hidden;
}
.card__head{ display:flex; align-items:center; gap:10px; padding:14px 18px 8px; background:#fff; }
.card__title{ margin:0; color: var(--brown); font-weight: 700; }
.badge-ico{
  width:34px; height:34px; border-radius:999px;
  display:grid; place-items:center;
  background:#fff3e1; border:1px solid #f3d4ae;
}
.badge-ico--sm{ width:28px; height:28px; }
.ico-svg{ width:18px; height:18px; stroke:#6f4228; fill:none; }
.card__body{ padding:14px 18px 18px; }

/* Form */
.form-card .field{ margin-bottom: 12px; }
label{ display:block; font-weight:700; color:#3d3d3d; margin:0 0 6px; }
input, textarea{
  width:100%; padding:11px 12px; border-radius: var(--radius);
  border:1px solid #e7e4dc; background:#fff; outline:none;
  transition: border-color .15s, box-shadow .15s; box-shadow: inset 0 1px 0 rgba(0,0,0,.03);
}
textarea{ resize:vertical; min-height:120px; }
input:focus, textarea:focus{ border-color:#e2b67a; box-shadow: var(--ring); }
input:hover, textarea:hover{ border-color:#ece6dc; }

.actions{ display:flex; align-items:center; gap:12px; padding-top:4px; }
.btn{
  padding:11px 18px; border:none; border-radius:18px;
  background:linear-gradient(180deg,#f7b35c 0%, var(--orange) 100%);
  color:#fff; font-weight:700; cursor:pointer;
  box-shadow:0 8px 18px rgba(227,137,27,.25), inset 0 1px 0 rgba(255,255,255,.35);
  transition: transform .08s, box-shadow .15s, filter .15s;
}
.btn:hover{ filter:brightness(1.03); box-shadow:0 12px 26px rgba(227,137,27,.30); }
.btn:active{ transform:translateY(1px); }
.btn:disabled{ opacity:.6; cursor:default; box-shadow:none; }

.sent-badge{
  font-weight:600; color:#2e7d32; background:#e7f6e8; border:1px solid #cfead1;
  padding:6px 10px; border-radius:999px;
}

/* Mapa + info */
.map-body{ display:grid; gap:12px; }
.map{
  width:100%; height:320px; border-radius: var(--radius);
  overflow:hidden; border:1px solid #efe3cf;
}
.map :deep(.leaflet-pane), .map :deep(.leaflet-top), .map :deep(.leaflet-bottom){ border-radius:inherit; }

/* Estilo del pin con logo */
.ps-marker { filter: drop-shadow(0 6px 10px rgba(0,0,0,.25)); }
.ps-marker img{
  background:#fff; border-radius:50%; border:3px solid #eecc9d;
  padding:3px; box-sizing:content-box;
}

.contact-info{
  list-style:none; margin:0; padding:0; display:grid; gap:8px;
}
.contact-info li{
  display:flex; align-items:center; gap:10px;
  padding:8px 10px; border:1px solid #f0e8da; border-radius: var(--radius); background:#fffefb;
}
.contact-info a{
  color:#5a402f; text-decoration:none; border-bottom:1px dashed #e7c08b;
}
.contact-info a:hover{ border-bottom-style:solid; }

@media (max-width: 980px){
  .contact-grid{ grid-template-columns: 1fr; }
  .map{ height:260px; }
}
</style>
