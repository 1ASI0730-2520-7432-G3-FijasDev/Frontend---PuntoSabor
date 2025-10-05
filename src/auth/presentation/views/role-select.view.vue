<template>
  <section class="wrap" style="display:grid;place-items:center">
    <div class="card" style="width:min(720px,96%)">
      <div class="card__body">
        <h2 class="section-title">Elige tu rol</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
          <button :class="['btn-ghost', role==='descubridor' && 'btn']" @click="role='descubridor'">Descubridor</button>
          <button :class="['btn-ghost', role==='duenio' && 'btn']" @click="role='duenio'">Dueño de restaurante</button>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:14px">
          <button class="btn" :disabled="!role" @click="save">Continuar</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RoleSelectView',
  data: () => ({ role: null }),
  methods:{
    save(){
      localStorage.setItem('ps-role', this.role);
      this.$router.push('/');
    }
  }
}
</script>
