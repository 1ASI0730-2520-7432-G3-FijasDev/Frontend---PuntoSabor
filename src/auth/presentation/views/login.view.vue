<template>
  <section class="login wrap" aria-labelledby="title">
    <div class="panel" role="region" aria-describedby="subtitle">
      <header class="head">
        <h1 id="title" class="title">Inicia sesión</h1>
        <p id="subtitle" class="subtitle">Ingresa tu correo para continuar</p>
      </header>

      <form class="form" @submit.prevent="onSubmit" novalidate>

        <label class="field">
          <span class="field__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="m3 7 9 6 9-6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              <rect x="3" y="7" width="18" height="14" rx="2.5" stroke-width="1.8"/>
            </svg>
          </span>
          <input
              v-model.trim="email"
              class="input"
              type="email"
              inputmode="email"
              autocomplete="email"
              placeholder="Correo"
              aria-label="Correo electrónico"
              required
          />
        </label>

        <button class="btn" type="submit" :disabled="!emailOk || loading">
          <span v-if="!loading">Ingresar</span>
          <span v-else>Ingresando…</span>
        </button>

        <p class="meta">
          ¿No tienes cuenta?
          <RouterLink to="/register" class="link">Regístrate</RouterLink>
        </p>

        <transition name="toast">
          <p v-if="error" class="error" role="alert">{{ error }}</p>
        </transition>
      </form>
    </div>
  </section>
</template>

<script>
import { loginUseCase } from '../../application/login.usecase.js';

export default {
  name: 'LoginView',
  data: () => ({
    email: '',
    loading: false,
    error: ''
  }),
  computed: {
    emailOk(){
      return /\S+@\S+\.\S+/.test(this.email || '');
    }
  },
  methods: {
    async onSubmit(){
      if (!this.emailOk || this.loading) return;
      this.error = '';
      this.loading = true;
      try{
        await loginUseCase(this.email);
        this.$router.push('/role');
      }catch(e){
        this.error = e?.message || 'No pudimos iniciar sesión. Intenta nuevamente.';
      }finally{
        this.loading = false;
        if (this.error) setTimeout(() => (this.error = ''), 2500);
      }
    }
  }
}
</script>

<style scoped>

.login{
  min-height: calc(100dvh - 140px);
  display: grid;
  place-items: center;
  padding: 20px;
}

.login .panel{
  width: min(520px, 96%);
  background: #ffffff !important;
  border-radius: 40px;
  box-shadow: 0 18px 48px rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.06);
  padding: 28px 28px 24px;
}

.head{ margin-bottom: 8px; }
.login .title{
  margin: 0; font-weight: 900; letter-spacing: .2px;
  color: #6f4228 !important;
}
.subtitle{ margin: 6px 0 0; color: #6b7280; font-size: .95rem; }

.form{ display: grid; gap: 12px; margin-top: 14px; }

.field{ position: relative; display: block; }
.field__icon{
  position: absolute; inset-inline-start: 12px; top: 50%; transform: translateY(-50%);
  width: 20px; height: 20px; display: grid; place-items: center;
}
.field__icon svg{
  width: 20px; height: 20px; stroke: #714623; fill: none;
}

.input{
  width: 100%;
  padding: 12px 14px 12px 40px;
  border-radius: 999px;
  border: 1px solid #e7e7eb;
  background: #fff; color: #222; outline: none;
  box-shadow: inset 0 1px 0 rgba(16,24,40,.03);
  transition: border-color .15s ease, box-shadow .15s ease;
}
.input::placeholder{ color: #a0a0a8; }
.input:focus{ border-color: #714623; box-shadow: 0 0 0 3px rgba(113,70,35,.22); }

.login .form .btn{
  margin-top: 6px;
  padding: 12px 18px;
  border-radius: 999px;
  border: 1px solid transparent !important;
  background: #e3891b !important;
  color: #1b1b1b !important;
  font-weight: 800; letter-spacing: .2px;
  cursor: pointer;
  box-shadow: 0 10px 22px rgba(227,137,27,.25);
  transition: transform .08s ease, filter .15s ease, box-shadow .2s ease, background .15s ease;
}
.login .form .btn:hover{ filter: brightness(1.04); }
.login .form .btn:active{ transform: translateY(1px); background: #cf7a18 !important; }
.login .form .btn:disabled{
  background: #e3891b !important;
  color: #ffffff !important;
  opacity: .85 !important;
  cursor: not-allowed;
  box-shadow: none !important;
}


.meta{ margin: 6px 2px 0; color: #6b7280; font-size: .93rem; }
.link{ color:#3b82f6; text-decoration: none; border-bottom: 1px dashed #bfdbfe; }
.link:hover{ border-bottom-style: solid; }

.error{
  margin-top: 8px;
  background: #fff1f2;
  color: #b00020;
  border: 1px solid #fecdd3;
  padding: 10px 12px;
  border-radius: 10px;
  font-weight: 600;
}

.toast-enter-active,.toast-leave-active{ transition: opacity .25s, transform .25s; }
.toast-enter-from,.toast-leave-to{ opacity: 0; transform: translateY(-4px); }
</style>
