<template>
  <section class="wrap zones-wrap" aria-labelledby="zones-title">
    <header class="page-head">
      <h2 id="zones-title" class="section-title">Huariques cerca de ti</h2>
      <p class="hint">Mapa con Leaflet, filtros, búsqueda y ficha con detalles del local.</p>
    </header>

    <!-- Controles -->
    <div class="controls">
      <div class="chips" role="tablist" aria-label="Filtrar por categoría">
        <button
            v-for="c in chipOptions"
            :key="c.cat"
            class="chip"
            :class="{ active: activeCat === c.cat }"
            role="tab"
            :aria-selected="activeCat === c.cat"
            @click="onChip(c.cat)"
        >
          {{ c.label }}
        </button>
      </div>

      <div class="search">
        <input
            v-model.trim="queryText"
            type="search"
            placeholder="Buscar por nombre…"
            aria-label="Buscar huarique"
        />
      </div>
    </div>

    <!-- Layout -->
    <div class="zones-grid">
      <!-- Mapa + fichas -->
      <div class="map-col">
        <div ref="mapEl" id="map-zones" class="map"></div>

        <!-- Stack de 2 tarjetas -->
        <Transition name="card-pop" mode="out-in">
          <div v-if="selectedMeta" :key="activeId" class="detail-stack" aria-live="polite">
            <!-- Tarjeta: solo imagen -->
            <article class="media-card" :title="selectedPlace?.name">
              <img
                  :src="logoUrl(selectedMeta.logo)"
                  :alt="selectedPlace?.name || 'Logo'"
                  class="media-img"
              />
            </article>

            <!-- Tarjeta: descripción -->
            <article class="info-card">
              <header class="info-head">
                <h3 class="info-title">{{ selectedPlace?.name }}</h3>
                <div class="badges">
                  <span class="badge badge--cat">{{ catLabel(selectedPlace?.cat) }}</span>
                  <span v-for="t in filteredTags" :key="t" class="badge badge--muted">{{ t }}</span>
                </div>
              </header>

              <p class="info-desc">{{ selectedMeta.desc }}</p>

              <ul class="info-list" role="list">
                <li>
                  <svg class="i" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/>
                  </svg>
                  <span>{{ selectedMeta.address }}</span>
                </li>
                <li>
                  <svg class="i" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm.5 5h-1v6l5 3 .5-.9-4.5-2.7Z"/>
                  </svg>
                  <span>{{ selectedMeta.hours }}</span>
                </li>
              </ul>

              <div class="divider"></div>

              <div class="info-actions">
                <RouterLink class="btn btn--primary" :to="{ path:'/results', query:{ q:selectedPlace?.name } }">
                  <svg class="i" viewBox="0 0 24 24"><path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h12v2H3z"/></svg>
                  Ver menú
                </RouterLink>

                <a class="btn" :href="mapsHref" target="_blank" rel="noopener">
                  <svg class="i" viewBox="0 0 24 24"><path d="M12 2 3 6v12l9 4 9-4V6zM5 8l7-3 7 3-7 3z"/></svg>
                  Cómo llegar
                </a>

                <button class="btn" type="button" @click="callActive">
                  <svg class="i" viewBox="0 0 24 24"><path d="M6.6 10.2c1.6 3.2 4 5.6 7.2 7.2l2.4-2.4c.3-.3.8-.4 1.2-.2 1 .4 2 .6 3.1.6.7 0 1.2.5 1.2 1.2V21c0 .7-.5 1.2-1.2 1.2C10.3 22.2 1.8 13.7 1.8 3.2 1.8 2.5 2.3 2 3 2h3.3c.7 0 1.2.5 1.2 1.2 0 1 .2 2.1.6 3.1.1.4 0 .9-.3 1.2z"/></svg>
                  Llamar
                </button>

                <button class="btn btn--ghost" type="button" @click="shareActive">
                  <svg class="i" viewBox="0 0 24 24"><path d="M18 8a3 3 0 1 0-2.82-4h-.02L8.91 7.1a3 3 0 0 0 0 5.8l6.25 3.1a3 3 0 1 0 .66-1.33L9.6 11.6a3 3 0 0 0 0-1.2l6.22-3.08A3 3 0 0 0 18 8Z"/></svg>
                  Compartir
                </button>
              </div>
            </article>
          </div>

          <article v-else key="empty" class="info-card empty">
            <span class="brand-placeholder">Selecciona un huarique para ver su descripción</span>
          </article>
        </Transition>

        <!-- Acciones rápidas -->
        <nav class="quick-actions" aria-label="Acciones rápidas">
          <RouterLink
              class="chip-link chip-link--accent"
              :to="{ path:'/results', query:{ q:'Pollo' } }"
          >
            Recomendado
          </RouterLink>

          <RouterLink
              class="chip-link"
              :to="{ path:'/results', query:{ q:'Menú' } }"
          >
            Tu zona
          </RouterLink>

          <RouterLink class="chip-link" to="/reviews">
            Reseñas
          </RouterLink>
        </nav>
      </div>

      <!-- Lista -->
      <aside class="list-col">
        <ul class="zones-list" role="listbox" aria-label="Listado de huariques">
          <li
              v-for="p in filteredPlaces"
              :key="p.id"
              :class="{ active: p.id === activeId }"
              tabindex="0"
              role="option"
              @click="selectPlace(p.id, true)"
              @keyup.enter="selectPlace(p.id, true)"
          >
            <strong class="name">{{ p.name }}</strong>
            <small class="cat">{{ catLabel(p.cat) }}</small>
          </li>
          <li v-if="filteredPlaces.length === 0" class="empty">No hay resultados para “{{ queryText }}”.</li>
        </ul>
      </aside>
    </div>
  </section>
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount, reactive, ref, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default defineComponent({
  name: 'MapView',
  components: { RouterLink },
  setup() {
    const mapEl = ref(null)
    const state = reactive({ query: '', activeCat: 'all', activeId: null })

    const queryText = computed({
      get: () => state.query, set: v => (state.query = v ?? '')
    })
    const activeCat = computed({
      get: () => state.activeCat, set: v => (state.activeCat = v || 'all')
    })
    const activeId = computed({
      get: () => state.activeId, set: v => (state.activeId = v ?? null)
    })

    const chipOptions = [
      { cat:'all', label:'Todos' },
      { cat:'pollo', label:'Pollerías' },
      { cat:'criollo', label:'Criollo' },
      { cat:'mar', label:'Marinos' },
      { cat:'postre', label:'Dulces' },
    ]
    const catLabel = (cat)=> chipOptions.find(c=>c.cat===cat)?.label ?? cat

    const places = [
      { id:'forastero',  name:'El Forastero',     cat:'pollo' },
      { id:'picanteria', name:'La Picantería',    cat:'criollo' },
      { id:'marina',     name:'La Marina',        cat:'mar' },
      { id:'donpepe',    name:'Don Pepe',         cat:'pollo' },
      { id:'antojitos',  name:'Antojos Criollos', cat:'criollo' },
      { id:'dulcesazon', name:'Dulce Sazón',      cat:'postre' },
    ]

    const logoUrl = (file)=> new URL(`../../../assets/${file}`, import.meta.url).href

    const META = {
      forastero:{ lat:-12.0649, lng:-77.0375, logo:'el_forastero.jpg',
        address:'Av. Arequipa 1234, Jesús María', hours:'Lun–Dom 12:00–22:00',
        desc:'Pollo a la brasa con papas crocantes y salsas caseras. Ambiente familiar.',
        tags:['Pollerías','Delivery','Pago con tarjeta'], phone:'+51 999 111 222' },
      picanteria:{ lat:-12.0842, lng:-77.0510, logo:'la_picanteria.jpg',
        address:'Calle Tradición 255, Miraflores', hours:'Mar–Dom 12:30–17:00',
        desc:'Cocina criolla de sazón arequipeña con platos al momento y recovas.',
        tags:['Criollo','Reservas','Picante 🔥'], phone:'+51 999 222 333' },
      marina:{ lat:-12.0781, lng:-77.0325, logo:'la_marina.jpg',
        address:'Av. Petit Thouars 4600, Lince', hours:'Lun–Dom 12:00–21:30',
        desc:'Pescados y mariscos frescos: ceviches, jaleas y causas marinas.',
        tags:['Marinos','Takeout','Carta marina'], phone:'+51 999 333 444' },
      donpepe:{ lat:-12.0625, lng:-77.0288, logo:'don_pepe.jpg',
        address:'Jr. Domingo Ponte 880, La Victoria', hours:'Lun–Dom 11:30–22:30',
        desc:'Pollos a la leña y anticuchos. Porciones generosas y precios honestos.',
        tags:['Pollerías','Promos','Familiar'], phone:'+51 999 444 555' },
      antojitos:{ lat:-12.0707, lng:-77.0451, logo:'antojos_criollos.jpg',
        address:'Av. Salaverry 3100, San Isidro', hours:'Lun–Sáb 12:00–21:00',
        desc:'Menús criollos del día, estofados y postres caseros.',
        tags:['Criollo','Menú del día','Postres'], phone:'+51 999 555 666' },
      dulcesazon:{ lat:-12.0729, lng:-77.0368, logo:'dulcesazon.jpg',
        address:'Jr. Miro Quesada 220, Lima', hours:'Mar–Dom 13:00–20:00',
        desc:'Pastelería artesanal: tortas, alfajores y mazamorra morada.',
        tags:['Dulces','Para llevar'], phone:'+51 999 666 777' },
    }

    // Leaflet
    let map = null
    const markersById = new Map()
    const logoIcon = (file)=>{
      const size=46
      return L.icon({ iconUrl:logoUrl(file), iconSize:[size,size], iconAnchor:[size/2,size],
        popupAnchor:[0,-size+10], className:'marker-logo' })
    }

    const filteredPlaces = computed(()=>{
      const q = state.query.toLowerCase()
      return places.filter(p=>{
        const byCat = (state.activeCat==='all' || p.cat===state.activeCat)
        const byTxt = p.name.toLowerCase().includes(q)
        return byCat && byTxt
      })
    })

    const selectedPlace = computed(()=> places.find(p=>p.id===state.activeId) || null)
    const selectedMeta  = computed(()=> (state.activeId && META[state.activeId]) ? META[state.activeId] : null)


    const filteredTags = computed(()=>{
      const p=selectedPlace.value, m=selectedMeta.value
      if(!p || !m) return []
      const cat = catLabel(p.cat).toLowerCase()
      return (m.tags||[]).filter(t => String(t).toLowerCase() !== cat)
    })

    const mapsHref = computed(()=>{
      if(!state.activeId) return '#'
      const m = META[state.activeId]
      return `https://www.google.com/maps?q=${m.lat},${m.lng}`
    })

    function onChip(cat){
      state.activeCat = cat || 'all'
      if(state.activeId && !filteredPlaces.value.some(p=>p.id===state.activeId)) state.activeId=null
    }
    function selectPlace(id, center=false){
      state.activeId = id
      if(center && markersById.has(id)){
        const mk = markersById.get(id)
        map.setView(mk.getLatLng(), 16, { animate:true })
        mk.openPopup()
      }
    }
    function centerOnActive(){
      if(!state.activeId) return
      const mk = markersById.get(state.activeId); if(mk) map.setView(mk.getLatLng(),16,{animate:true})
    }
    function callActive(){
      const m = selectedMeta.value; if(!m?.phone) return
      window.location.href = `tel:${m.phone.replace(/\s+/g,'')}`
    }
    async function shareActive(){
      const p=selectedPlace.value, m=selectedMeta.value; if(!p||!m) return
      const url=`https://www.google.com/maps?q=${m.lat},${m.lng}`
      const title=`${p.name} — ${m.address}`
      const text=`Te comparto este huarique: ${p.name}. Horario: ${m.hours}.`
      try{
        if(navigator.share){ await navigator.share({title,text,url}) }
        else { await navigator.clipboard.writeText(`${title}\n${text}\n${url}`); alert('Enlace copiado') }
      }catch{}
    }

    watch(filteredPlaces,(list)=>{ if(state.activeId && !list.some(p=>p.id===state.activeId)) state.activeId=null })

    onMounted(()=>{
      const cont = mapEl.value; if(!cont) return
      if(cont._leaflet_id) cont._leaflet_id = null

      map = L.map(cont, { zoomControl:true, scrollWheelZoom:true }).setView([-12.069,-77.035], 14)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:20, attribution:'&copy; OpenStreetMap'}).addTo(map)

      places.forEach(p=>{
        const m = META[p.id]; if(!m) return
        const mk = L.marker([m.lat,m.lng], { icon:logoIcon(m.logo) }).addTo(map)
        mk.bindPopup(`<img src="${logoUrl(m.logo)}" alt="${p.name}" class="popup-logo">`, { autoPan:true, closeButton:true, maxWidth:240, className:'ps-popup' })
        mk.on('click', ()=>selectPlace(p.id, false))
        markersById.set(p.id, mk)
      })

      if(filteredPlaces.value.length) selectPlace(filteredPlaces.value[0].id, true)
    })
    onBeforeUnmount(()=>{ if(map){ map.remove(); markersById.clear() } })

    return {
      mapEl, chipOptions, catLabel, places,
      filteredPlaces, selectedPlace, selectedMeta, filteredTags,
      selectPlace, onChip, centerOnActive, callActive, shareActive,
      logoUrl, mapsHref, queryText, activeCat, activeId,
    }
  }
})
</script>

<style scoped>
/* ===== Theme ===== */
:root { --brand:#3a2b1a; --accent:#e3891b; --accent-soft:rgba(227,137,27,.14); }
.zones-wrap{ --radius:18px; color:#2a2a2a; }
.section-title{ font-size:clamp(1.6rem,2.4vw,2.4rem); margin:0 0 4px; }
.hint{ color:#6b6b6b; margin:0 0 8px; }

/* ===== Controles ===== */
.controls{ display:grid; gap:12px; grid-template-columns:1fr auto; align-items:center; margin-bottom:12px; }
@media (max-width:920px){ .controls{ grid-template-columns:1fr; } }

.chips{ display:flex; gap:8px; flex-wrap:wrap; }
.chip{ border:1px solid rgba(0,0,0,.12); background:#fff; color:#3b3b3b; padding:8px 12px; border-radius:999px; font-weight:600; font-size:.9rem; transition:.12s; }
.chip:hover{ transform:translateY(-1px); box-shadow:0 6px 16px rgba(0,0,0,.08); }
.chip.active{ background:var(--accent-soft); border-color:rgba(227,137,27,.45); color:#4a2b0b; }

.search input{ width:280px; padding:10px 12px; border-radius:12px; border:1px solid rgba(0,0,0,.12); transition:.2s; }
.search input:focus{ outline:none; border-color:rgba(227,137,27,.45); box-shadow:0 0 0 4px rgba(227,137,27,.18); }
@media (max-width:920px){ .search input{ width:100%; } }

/* ===== Grid ===== */
.zones-grid{ display:grid; grid-template-columns:1.6fr .95fr; gap:16px; align-items:start; }
@media (max-width:1200px){ .zones-grid{ grid-template-columns:1fr; } }

/* ===== Mapa ===== */
.map{ height:430px; border-radius:18px; overflow:hidden; box-shadow:0 10px 26px rgba(0,0,0,.07); border:1px solid rgba(0,0,0,.06); }

/* ===== Stack de tarjetas ===== */
.detail-stack{
  display:flex; gap:14px; margin-top:12px; align-items:stretch;
}
.media-card, .info-card{
  background:linear-gradient(180deg,#fff,#fffef8);
  border:1px solid rgba(0,0,0,.08);
  border-radius:var(--radius);
  box-shadow:0 14px 30px rgba(0,0,0,.06);
}
.media-card{
  width:180px; min-width:180px; display:grid; place-items:center; padding:14px;
}
.media-img{ width:100%; height:152px; object-fit:contain; border-radius:12px; background:#fafafa; box-shadow:inset 0 0 0 1px rgba(0,0,0,.06); }

.info-card{
  flex:1; padding:16px 18px; display:flex; flex-direction:column; gap:10px;
}
.info-head{ display:flex; align-items:flex-start; justify-content:space-between; gap:12px; }
.info-title{ margin:0; font-size:1.12rem; font-weight:800; color:var(--brand); letter-spacing:.1px; }

.badges{ display:flex; gap:8px; flex-wrap:wrap; }
.badge{ display:inline-block; padding:6px 10px; border-radius:999px; font-size:.78rem; font-weight:700; }
.badge--cat{ background:var(--accent-soft); color:#4a2b0b; border:1px solid rgba(227,137,27,.35); }
.badge--muted{ background:#f3f4f6; border:1px solid #e5e7eb; color:#555; }

.info-desc{ margin:0; color:#444; font-size:.98rem; line-height:1.45; }

.info-list{ list-style:none; margin:0; padding:0; display:grid; gap:6px; color:#3f3f3f; }
.info-list li{ display:flex; align-items:center; gap:10px; }
.i{ width:18px; height:18px; fill:#885b2a; flex:0 0 18px; }

.divider{ height:1px; background:linear-gradient(90deg,transparent,rgba(0,0,0,.08),transparent); }

.info-actions{ display:flex; gap:10px; flex-wrap:wrap; }
.btn{ display:inline-flex; align-items:center; gap:8px; padding:10px 14px; border-radius:12px; border:1px solid rgba(0,0,0,.12); background:#fff; font-weight:750; color:#3a2b1a; transition:.12s; }
.btn .i{ width:18px; height:18px; fill:#7a4f22; }
.btn:hover{ transform:translateY(-1px); box-shadow:0 12px 22px rgba(0,0,0,.08); border-color:rgba(0,0,0,.18); }
.btn:focus{ outline:none; box-shadow:0 0 0 4px rgba(227,137,27,.18); }
.btn--primary{ background:#fff7ec; border-color:rgba(227,137,27,.45); color:#5a3a16; }

/* Responsive */
@media (max-width:820px){
  .detail-stack{ flex-direction:column; }
  .media-card{ width:100%; min-width:unset; }
  .media-img{ height:140px; }
}

/* ===== Lista lateral ===== */
.list-col .zones-list{ list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:10px; }
.zones-list li{ background:#fff; border:1px solid rgba(0,0,0,.08); border-radius:12px; padding:12px 14px; display:flex; justify-content:space-between; align-items:center; gap:10px; cursor:pointer; transition:.15s; }
.zones-list li:hover{ transform:translateY(-1px); border-color:rgba(0,0,0,.18); box-shadow:0 10px 20px rgba(0,0,0,.06); background:#fffdfa; }
.zones-list li.active{ outline:3px solid rgba(210,203,71,.38); box-shadow:inset 0 6px 18px rgba(0,0,0,.05); }
.zones-list .name{ font-weight:700; }
.zones-list .cat{ color:#777; }
.zones-list .empty{ text-align:center; color:#888; }

/* ===== FIX: imágenes gigantes en popups de Leaflet ===== */
/* Anula resets globales (max-width:100%) dentro del mapa */
:deep(.leaflet-pane img){
  max-width: none !important;
}

/* Limita el tamaño del popup y su contenido */
:deep(.leaflet-container .leaflet-popup){
  max-width: 220px;
}
:deep(.leaflet-container .leaflet-popup-content-wrapper){
  width: auto;
  max-width: 220px;
  padding: 6px 6px 8px;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,.06);
  box-shadow: 0 12px 26px rgba(0,0,0,.16);
}
:deep(.leaflet-container .leaflet-popup-content){
  margin: 6px 8px !important;
  width: auto !important;
}

/* Fuerza tamaño exacto de la imagen del popup */
:deep(.leaflet-container .leaflet-popup-content img),
:deep(.ps-popup .popup-logo){
  width: 160px !important;
  height: 160px !important;
  max-width: 160px !important;
  max-height: 160px !important;
  object-fit: contain !important;
  display: block;
  border-radius: 10px;
  background: #fff;
}

/* Sombra de la “puntita” del popup (opcional) */
:deep(.leaflet-container .leaflet-popup-tip){
  filter: drop-shadow(0 2px 6px rgba(0,0,0,.12));
}
</style>
