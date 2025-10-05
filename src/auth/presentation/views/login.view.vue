<template>
  <section class="wrap" style="display:grid;place-items:center">
    <div class="card" style="width:min(520px,96%)">
      <div class="card__body">
        <h2 class="section-title">Inicia sesión</h2>
        <form @submit.prevent="login" style="display:grid;gap:12px">
          <input v-model="email" placeholder="Correo" />
          <button class="btn">Ingresar</button>
        </form>
        <p class="meta" style="margin-top:8px">
          ¿No tienes cuenta?
          <RouterLink to="/register">Regístrate</RouterLink>
        </p>
        <p v-if="error" class="meta" style="color:#b00020">{{ error }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { loginUseCase } from '../../application/login.usecase.js';

export default {
  name: 'LoginView',
  data: () => ({ email: '', error: '' }),
  methods: {
    async login(){
      this.error = '';
      try{
        await loginUseCase(this.email.trim());
        this.$router.push('/role');
      }catch(e){ this.error = e.message; }
    }
  }
}
</script>
