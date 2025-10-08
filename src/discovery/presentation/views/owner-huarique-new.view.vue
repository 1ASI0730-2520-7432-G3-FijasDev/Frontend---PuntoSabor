<template>
  <section class="wrap owner-form" aria-labelledby="title">
    <header class="page-head">
      <h1 id="title" class="section-title">Registrar huarique</h1>
      <p class="section-sub">Completa la información para que te encuentren más fácil.</p>
    </header>

    <!-- Panel que ENGLOBA las sesiones -->
    <div class="sheet">
      <form class="form-grid" @submit.prevent="onSubmit">
        <!-- Columna izquierda -->
        <div class="col">
          <!-- Datos -->
          <section class="card">
            <div class="card__head">
              <span class="badge-ico" aria-hidden="true">
                <!-- Utensilios -->
                <svg viewBox="0 0 24 24" class="ico-svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"
                        d="M8.25 3.75v6m-3-6v6m6-6v6M5.25 9.75s0 3 3 3 3-3 3-3M15.75 4.5l4.5 4.5m0-4.5-4.5 4.5M18 14.25v6"/>
                </svg>
              </span>
              <h3 class="card__title">Datos</h3>
            </div>
            <div class="card__body">
              <div class="field-row">
                <div>
                  <label>Nombre</label>
                  <input v-model.trim="model.name" required />
                </div>
                <div>
                  <label>Categoría</label>
                  <select v-model="model.categoryId" required>
                    <option value="" disabled>Selecciona…</option>
                    <option value="anticuchos">Anticuchos</option>
                    <option value="ceviche">Ceviche</option>
                    <option value="chifa">Chifa</option>
                    <option value="polleria">Pollería</option>
                  </select>
                </div>
              </div>

              <div class="field-row">
                <div>
                  <label>Precio promedio (S/)</label>
                  <input type="number" min="0" step="0.1" v-model.number="model.avgPrice" />
                </div>
                <div>
                  <label>Distrito</label>
                  <input v-model.trim="model.district" />
                </div>
              </div>

              <label class="check">
                <input type="checkbox" v-model="model.nearMe" />
                <span class="pill pill--ghost">Cerca de mí</span>
              </label>
            </div>
          </section>

          <!-- Dirección -->
          <section class="card">
            <div class="card__head">
              <span class="badge-ico" aria-hidden="true">
                <!-- Pin -->
                <svg viewBox="0 0 24 24" class="ico-svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"
                        d="M12 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"
                        d="M19.5 10.5c0 5.25-7.5 10.125-7.5 10.125S4.5 15.75 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                </svg>
              </span>
              <h3 class="card__title">Dirección</h3>
            </div>
            <div class="card__body">
              <div class="field-row">
                <div>
                  <label>Calle / Nro.</label>
                  <input v-model.trim="model.address" required placeholder="Av. Los Incas 123" />
                </div>
                <div>
                  <label>Ciudad</label>
                  <input v-model.trim="model.city" placeholder="Lima" />
                </div>
              </div>
              <div class="field-row">
                <div>
                  <label>Referencia</label>
                  <input v-model.trim="model.reference" placeholder="Frente al parque" />
                </div>
                <div>
                  <label>Teléfono</label>
                  <input v-model.trim="model.phone" placeholder="+51 999 999 999" />
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Columna derecha -->
        <div class="col">
          <!-- Horarios -->
          <section class="card">
            <div class="card__head">
              <span class="badge-ico" aria-hidden="true">
                <!-- Reloj -->
                <svg viewBox="0 0 24 24" class="ico-svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"
                        d="M12 6v6l4 2"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"
                        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
              </span>
              <h3 class="card__title">Horarios</h3>
            </div>
            <div class="card__body">
              <label class="check">
                <input type="checkbox" v-model="model.closed" />
                <span class="tag tag--warn">Cerrado</span>
              </label>

              <div class="field-row align-end">
                <div>
                  <label>Abrimos</label>
                  <div class="control-with-ico">
                    <span class="ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" class="ico-svg sm">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"
                              d="M12 6v6l4 2"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"
                              d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                      </svg>
                    </span>
                    <input type="time" v-model="model.openAt" />
                  </div>
                </div>
                <div>
                  <label>Cerramos</label>
                  <div class="control-with-ico">
                    <span class="ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" class="ico-svg sm">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"
                              d="M12 6v6l4 2"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"
                              d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                      </svg>
                    </span>
                    <input type="time" v-model="model.closeAt" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Servicios -->
          <section class="card">
            <div class="card__head">
              <span class="badge-ico" aria-hidden="true">
                <!-- Recibo -->
                <svg viewBox="0 0 24 24" class="ico-svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"
                        d="M6 3.75 8 5.25l2-1.5 2 1.5 2-1.5 2 1.5 2-1.5V20.25l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5V3.75Z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"
                        d="M8.25 8.25h7.5m-7.5 3h7.5m-7.5 3h4.5"/>
                </svg>
              </span>
              <h3 class="card__title">Servicios</h3>
            </div>
            <div class="card__body">
              <div class="chips">
                <label class="chip">
                  <input type="checkbox" v-model="model.services.delivery" />
                  <span class="tag">Delivery</span>
                </label>
                <label class="chip">
                  <input type="checkbox" v-model="model.services.takeaway" />
                  <span class="tag">Para llevar</span>
                </label>
                <label class="chip">
                  <input type="checkbox" v-model="model.services.dinein" />
                  <span class="tag">En salón</span>
                </label>
              </div>
            </div>
          </section>

          <!-- Menú -->
          <section class="card">
            <div class="card__head">
              <span class="badge-ico" aria-hidden="true">
                <!-- Lista -->
                <svg viewBox="0 0 24 24" class="ico-svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"
                        d="M8.25 6.75h10.5M8.25 12h10.5M8.25 17.25h10.5M4.5 6.75h.008v.008H4.5V6.75Zm0 5.25h.008v.008H4.5V12Zm0 5.25h.008v.008H4.5v-.008Z"/>
                </svg>
              </span>
              <h3 class="card__title">Menú</h3>
            </div>
            <div class="card__body">
              <div class="menu-row">
                <input placeholder="Nombre" v-model.trim="menuItem.name" />
                <input type="number" min="0" step="0.1" placeholder="Precio (S/)" v-model.number="menuItem.price" />
                <input placeholder="Sección" v-model.trim="menuItem.section" />
                <button type="button" class="btn-ghost" :disabled="!menuItem.name" @click="addItem">+ Añadir ítem</button>
              </div>

              <ul class="menu-list">
                <li v-for="(it, i) in model.menu" :key="i">
                  <span>{{ it.name }} — S/ {{ it.price }} ({{ it.section }})</span>
                  <button type="button" class="icon" @click="removeItem(i)" aria-label="Eliminar">✕</button>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <!-- Barra de acciones -->
        <div class="actions">
          <button class="btn" type="submit" :disabled="!canSave">Guardar</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { createHuarique } from '@/discovery/application/create-huarique.usecase';

const router = useRouter();

const model = reactive({
  name:'', categoryId:'', avgPrice:0, district:'',
  nearMe:false, address:'', city:'', reference:'', phone:'',
  openAt:'09:00', closeAt:'22:00', closed:false,
  services:{ delivery:true, takeaway:true, dinein:true },
  menu:[]
});

const menuItem = reactive({ name:'', price:0, section:'' });

const canSave = computed(() =>
    model.name?.trim() && model.categoryId && model.address?.trim()
);

function addItem(){
  if(!menuItem.name) return;
  model.menu.push({ name:menuItem.name, price:menuItem.price, section:menuItem.section });
  Object.assign(menuItem, { name:'', price:0, section:'' });
}
function removeItem(i){ model.menu.splice(i,1); }

async function onSubmit(){
  try{
    const created = await createHuarique({ ...model });
    router.push({ name:'owner-huarique-edit', params:{ id: created.id }});
  }catch(e){
    alert('No se pudo guardar. Inténtalo otra vez.');
  }
}
</script>

<style scoped>
/* ====== Paleta ====== */
:root{
  --bg: #e4f0bd;
  --bg-alt: #f5f8e6;

  --brown: #6f4228;
  --orange: #e3891b;
  --orange-soft: #ffe8c9;
  --orange-stroke: #f1d8b9;

  --card-bg: #ffffff;
  --card-stroke: #ebe8e1;

  --radius: 22px;
  --radius-card: 26px;
  --radius-pill: 999px;

  --shadow-1: 0 8px 20px rgba(0,0,0,.06);
  --ring: 0 0 0 3px rgba(227,137,27,.28);
}

.owner-form{ padding-bottom: 24px; }
.page-head{ margin-bottom: 12px; }
.section-title{ color: var(--brown); margin: 0 0 6px; }
.section-sub{ color:#637257; margin:0 0 12px; }

.sheet{
  background: linear-gradient(180deg, #fffdf8 0%, #fffaf1 100%);
  border: 1px solid #eadcc8;
  border-radius: 28px;
  box-shadow: 0 12px 28px rgba(0,0,0,.06);
  padding: 18px;
}

/* ====== Grid ====== */
.form-grid{
  display:grid;
  grid-template-columns: minmax(0,1.2fr) minmax(0,1fr);
  gap:16px;
  align-items:start;
}
.col{ display:grid; gap:16px; min-width:0; }

/* ====== Tarjetas ====== */
.card{
  background: var(--card-bg);
  border-radius: var(--radius-card);
  border: 1px solid var(--card-stroke);
  box-shadow: var(--shadow-1);
  overflow:hidden;
  transition: border-color .15s ease, box-shadow .15s ease;
}
.card:hover{ border-color:#e2dfd6; box-shadow: 0 10px 24px rgba(0,0,0,.08); }

.card__head{
  display:flex; align-items:center; gap:10px;
  padding: 14px 18px 8px;
  background: #fff;
}
.card__title{ margin:0; color: var(--brown); font-weight: 700; }

.badge-ico{
  width:34px; height:34px; border-radius: var(--radius-pill);
  display:grid; place-items:center;
  background: var(--orange-soft);
  border: 1px solid var(--orange-stroke);
}
.ico-svg{
  width: 18px; height: 18px; stroke: #6f4228; fill: none;
}
.ico-svg.sm{ width:16px; height:16px; }

.card__body{ padding: 14px 18px 18px; background: #fff; }

/* ====== Controles ====== */
.field-row{
  display:grid; gap:10px; margin-top:8px;
  grid-template-columns: repeat(2, minmax(0,1fr));
}
.align-end > * { align-self: end; }
label{ display:block; font-weight:700; color:#3d3d3d; margin:8px 0 6px; }

input, select, textarea{
  width:100%; min-width:0;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid #e7e4dc;
  background: #fff;
  box-shadow: inset 0 1px 0 rgba(0,0,0,.02);
  outline: none;
  transition: border-color .15s ease, box-shadow .15s ease;
}
input:focus, select:focus, textarea:focus{ border-color: #e2b67a; box-shadow: var(--ring); }
input:hover, select:hover, textarea:hover{ border-color: #ece6dc; }

/* input time con icono */
.control-with-ico{ position: relative; }
.control-with-ico .ico{
  position:absolute; left:10px; top:50%; transform:translateY(-50%);
  opacity:.75; pointer-events:none;
}
.control-with-ico input{ padding-left: 34px; }

/* ====== Chips ====== */
.check{ display:inline-flex; align-items:center; gap:8px; margin-top:10px; }
.tag{
  display:inline-flex; align-items:center; gap:6px;
  padding:6px 10px; border-radius: var(--radius-pill);
  background: var(--orange-soft);
  border: 1px solid var(--orange-stroke);
  color:#5e4a36; font-weight:600; font-size:.92rem;
}
.tag--warn{ background:#fbe0dc; border-color:#f3b9b2; color:#7f4a44; }
.pill{ padding:6px 10px; border-radius: var(--radius-pill); font-weight:600; font-size:.92rem; }
.pill--ghost{ background:#fff; border:1px solid #e8e2d9; color:#6a5a49; }

.chips{ display:flex; flex-wrap:wrap; gap:8px; margin-top:6px; }
.chip{ display:inline-flex; align-items:center; gap:8px; }
.chip input{ accent-color: var(--orange); }

/* ====== Menú ====== */
.menu-row{
  display:grid;
  grid-template-columns: minmax(0,1.3fr) 140px minmax(0,1fr) auto;
  gap:10px; align-items:center; margin-top:6px;
}
.menu-list{ list-style:none; padding:0; margin:12px 0 0; display:grid; gap:8px; }
.menu-list li{
  display:flex; justify-content:space-between; align-items:center;
  padding:10px 12px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid var(--card-stroke);
}
.icon{ background:transparent; border:none; font-size:18px; line-height:1; cursor:pointer; }

/* ====== Botones ====== */
.btn{
  padding: 11px 18px; border:none; border-radius: 18px;
  background: linear-gradient(180deg, #f7b35c 0%, var(--orange) 100%);
  color:#fff; font-weight:700; cursor:pointer;
  box-shadow: 0 8px 18px rgba(227,137,27,.25), inset 0 1px 0 rgba(255,255,255,.35);
  transition: transform .08s ease, box-shadow .15s ease, filter .15s ease;
}
.btn:hover{ filter: brightness(1.03); box-shadow: 0 12px 26px rgba(227,137,27,.30); }
.btn:active{ transform: translateY(1px); }
.btn:disabled{ opacity:.6; cursor:default; box-shadow:none; }
.btn-ghost{
  padding: 9px 14px; border-radius: 14px; border:1px solid #e3e3e3; background:#fff; cursor:pointer;
}
.btn-ghost:disabled{ opacity:.55; cursor:default; }

/* ====== Action bar ====== */
.actions{
  grid-column: 1 / -1;
  display:flex; justify-content:flex-end; gap:10px;
  padding-top: 6px;
}

/* ====== Responsive ====== */
@media (max-width: 980px){
  .form-grid{ grid-template-columns: 1fr; }
  .menu-row{ grid-template-columns: minmax(0,1fr) 120px minmax(0,1fr) auto; }
}
</style>
