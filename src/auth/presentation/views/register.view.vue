<template>
  <section class="wrap" style="display:grid;place-items:center">
    <div class="card" style="width:min(520px,96%)">
      <div class="card__body">
        <h2 class="section-title">Regístrate</h2>
        <form @submit.prevent="register" style="display:grid;gap:12px">
          <input v-model="name" placeholder="Nombre" />
          <input v-model="email" placeholder="Correo" />
          <button class="btn">Crear cuenta</button>
        </form>
        <p class="meta" v-if="msg">{{ msg }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { registerUseCase } from '../../application/register.usecase.js';
export default {
  name: 'RegisterView',
  data: () => ({ name:'', email:'', msg:'' }),
  methods:{
    async register(){
      await registerUseCase({ name:this.name.trim(), email:this.email.trim() });
      this.msg = '✅ ¡Cuenta creada! Serás dirigido a selección de rol…';
      setTimeout(()=> this.$router.push('/role'), 800);
    }
  }
}
</script>
