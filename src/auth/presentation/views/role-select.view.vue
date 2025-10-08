<template>
  <section class="role wrap" aria-labelledby="title">
    <div class="panel" role="region" aria-describedby="subtitle">
      <header class="head">
        <h1 id="title" class="title">Elige tu rol</h1>
        <p id="subtitle" class="subtitle">Selecciona cómo quieres usar PuntoSabor</p>
      </header>

      <div
          class="roles"
          role="radiogroup"
          aria-label="Roles disponibles"
          @keydown.left.prevent="focusPrev()"
          @keydown.right.prevent="focusNext()"
          @keydown.space.prevent="activateFocused()"
          @keydown.enter.prevent="activateFocused()"
      >
        <button
            ref="opt0"
            class="role-card"
            :class="{ active: role==='explorer', 'is-selected': role==='explorer' }"
            role="radio"
            :aria-checked="role==='explorer'"
            aria-label="Descubridor"
            @click="setRole('explorer')"
        >
          <span class="icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" />
              <circle cx="12" cy="10" r="2.7"/>
            </svg>
          </span>
          <span class="role-title">Descubridor</span>
          <span class="role-desc">Encuentra huariques y guarda tus favoritos.</span>
        </button>

        <button
            ref="opt1"
            class="role-card"
            :class="{ active: role==='owner', 'is-selected': role==='owner' }"
            role="radio"
            :aria-checked="role==='owner'"
            aria-label="Dueño de restaurante"
            @click="setRole('owner')"
        >
          <span class="icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M3 9h18l-2-4H5l-2 4Z" />
              <path d="M5 9v10h14V9" />
              <path d="M9 19v-6h6v6" />
            </svg>
          </span>
          <span class="role-title">Dueño de restaurante</span>
          <span class="role-desc">Publica tu huarique y gestiona tu vitrina.</span>
        </button>
      </div>

      <div class="actions">
        <button class="btn" :disabled="!role" @click="save">Continuar</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RoleSelectView',
  data: () => ({ role: null, focusIdx: 0 }),
  mounted() {
    const persistedRole = localStorage.getItem('ps-role');
    if (persistedRole) this.role = persistedRole;
  },
  methods: {
    setRole(r){ this.role = r; },
    focusPrev(){
      this.focusIdx = this.focusIdx === 0 ? 1 : 0;
      this.$refs[`opt${this.focusIdx}`]?.focus();
    },
    focusNext(){
      this.focusIdx = this.focusIdx === 0 ? 1 : 0;
      this.$refs[`opt${this.focusIdx}`]?.focus();
    },
    activateFocused(){
      this.setRole(this.focusIdx === 0 ? 'explorer' : 'owner');
    },
    save(){
      localStorage.setItem('ps-role', this.role);
      try{
        const prev = JSON.parse(localStorage.getItem('ps-session') || '{}');
        const session = { ...prev, role: this.role };
        localStorage.setItem('ps-session', JSON.stringify(session));
      }catch{
        localStorage.setItem('ps-session', JSON.stringify({ role: this.role }));
      }
      this.$router.push(this.role === 'owner' ? { name:'owner-huarique-new' } : { name:'home' });
    }
  }
};
</script>

<style scoped>
:root{
  --radius: 40px;
  --card: #fff;
  --text: #222;
  --muted: #6b7280;
  --stroke: #e7e7eb;
  --title-brown: #6f4228;
  --brown: #714623;
  --brand: #e3891b;
  --brand-press: #cf7a18;
}

.role{
  min-height: calc(100dvh - 140px);
  display: grid;
  place-items: center;
  padding: 20px;
}
.panel{
  width: min(820px, 96%);
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: 0 18px 48px rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.06);
  padding: 26px 26px 22px;
}
.head{ margin-bottom: 8px; }
.title{
  margin: 0;
  font-weight: 900;
  color: var(--title-brown);
  letter-spacing: .2px;
}
.subtitle{ margin: 6px 0 0; color: var(--muted); font-size: .95rem; }

.roles{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
}
.role-card{
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: 12px;
  row-gap: 2px;
  align-items: center;
  border: 1px solid var(--stroke);
  background: #fff;
  color: var(--text);
  border-radius: 18px;
  padding: 14px 16px;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,.04);
  transition: border-color .15s ease, box-shadow .2s ease, transform .05s ease, background .15s ease, color .15s ease;
}
.role-card:hover{ border-color: #e9e9ee; box-shadow: 0 8px 20px rgba(0,0,0,.08); }
.role-card:active{ transform: translateY(1px); }
.role-card .icon{
  width: 40px; height: 40px;
  display: grid; place-items: center;
  border-radius: 12px;
  background: rgba(113,70,35,.08);
}
.role-card .icon svg{ width: 22px; height: 22px; stroke: var(--brown); fill: none; stroke-width: 1.8; }
.role-title{ font-weight: 800; color: var(--text); }
.role-desc{ grid-column: 2 / -1; font-size: .92rem; color: var(--muted); }

.actions{ display: flex; justify-content: flex-end; margin-top: 16px; }
.btn{
  padding: 12px 18px;
  border-radius: 999px;
  border: 1px solid transparent;
  background: var(--brand);
  color: #fff;
  font-weight: 800; letter-spacing: .2px;
  cursor: pointer;
  box-shadow: 0 10px 22px rgba(227,137,27,.25);
  transition: transform .08s ease, filter .15s ease, box-shadow .2s ease, background .15s ease;
}
.btn:hover{ filter: brightness(1.05); }
.btn:active{ transform: translateY(1px); background: var(--brand-press); }
.btn:disabled{ background: var(--brand); opacity: .65; cursor: not-allowed; box-shadow: none; }

.role-card:focus-visible, .btn:focus-visible{
  outline: 3px solid rgba(113,70,35,.35);
  outline-offset: 2px;
}

.role .panel .head .title{ color: #6f4228 !important; }
.role .actions .btn{
  background: #e3891b !important;
  border-color: #e3891b !important;
  color: #fff !important;
}
.role .actions .btn:active{ background: #cf7a18 !important; }
.role .actions .btn:disabled{
  background: #e3891b !important;
  color: #fff !important;
  opacity: .65 !important;
  box-shadow: none !important;
  cursor: not-allowed;
}

.role .roles .role-card.active,
.role .roles .role-card.is-selected,
.role .roles .role-card[aria-checked="true"]{
  background: #e3891b !important;
  border-color: #e3891b !important;
  color: #fff !important;
  box-shadow: 0 12px 28px rgba(227,137,27,.28) !important;
}
.role .roles .role-card.active .role-title,
.role .roles .role-card.active .role-desc,
.role .roles .role-card.is-selected .role-title,
.role .roles .role-card.is-selected .role-desc,
.role .roles .role-card[aria-checked="true"] .role-title,
.role .roles .role-card[aria-checked="true"] .role-desc{
  color: #fff !important;
}
.role .roles .role-card.active .icon,
.role .roles .role-card.is-selected .icon,
.role .roles .role-card[aria-checked="true"] .icon{
  background: rgba(255,255,255,.16) !important;
}
.role .roles .role-card.active .icon svg,
.role .roles .role-card.is-selected .icon svg,
.role .roles .role-card[aria-checked="true"] .icon svg{
  stroke: #fff !important;
}

@media (max-width: 720px){
  .roles{ grid-template-columns: 1fr; }
}
</style>
