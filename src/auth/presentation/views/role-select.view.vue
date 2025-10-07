<template>
  <section class="wrap" style="display:grid;place-items:center">
    <div class="card" style="width:min(720px,96%)">
      <div class="card__body">
        <h2 class="section-title">Elige tu rol</h2>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
          <button
              :class="['btn-ghost', role==='explorer' && 'btn']"
              :aria-pressed="role==='explorer'"
              @click="role='explorer'">
            Descubridor
          </button>

          <button
              :class="['btn-ghost', role==='owner' && 'btn']"
              :aria-pressed="role==='owner'"
              @click="role='owner'">
            Dueño de restaurante
          </button>
        </div>

        <div style="display:flex;justify-content:flex-end;margin-top:14px">
          <button class="btn" :disabled="!role" @click="save">
            Continuar
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RoleSelectView',
  data: () => ({ role: null }),

  mounted() {

    const persistedRole = localStorage.getItem('ps-role');
    if (persistedRole) this.role = persistedRole;
  },

  methods: {
    save() {

      localStorage.setItem('ps-role', this.role);


      try {
        const prev = JSON.parse(localStorage.getItem('ps-session') || '{}');
        const session = { ...prev, role: this.role };
        localStorage.setItem('ps-session', JSON.stringify(session));
      } catch {
        localStorage.setItem('ps-session', JSON.stringify({ role: this.role }));
      }


      if (this.role === 'owner') {

        this.$router.push({ name: 'owner-huarique-new' });
      } else {

        this.$router.push({ name: 'home' });
      }
    }
  }
};
</script>

<style scoped>
button:focus-visible { outline: 2px solid var(--orange,#e3891b); outline-offset: 2px; }
</style>
