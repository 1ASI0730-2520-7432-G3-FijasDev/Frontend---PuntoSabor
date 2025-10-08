<template>
  <section class="register wrap" aria-labelledby="title">
    <div class="panel">
      <div class="left">
        <h1 id="title" class="title">¡Hola, amigo!</h1>

        <form class="form" @submit.prevent="onSubmit" novalidate>

          <label class="field">
            <span class="field__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M4 20a8 8 0 0 1 16 0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="8" r="4" stroke-width="1.8"/>
              </svg>
            </span>
            <input
                v-model.trim="name"
                class="input"
                type="text"
                inputmode="text"
                autocomplete="name"
                placeholder="Nombre"
                aria-label="Nombre"
                required
            />
          </label>


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
                placeholder="Correo electrónico"
                aria-label="Correo electrónico"
                required
            />
          </label>

          <button class="btn" type="submit" :disabled="!canSend || sending">
            <span v-if="!sending">Crear cuenta</span>
            <span v-else>Creando…</span>
          </button>
        </form>

        <transition name="toast">
          <p v-if="msg" class="toast">{{ msg }}</p>
        </transition>
      </div>

      <aside class="right" aria-hidden="true">
        <div class="right__inner">
          <h2 class="hello">¡Qué gusto verte!</h2>
          <p class="sub">
            Crea tu cuenta con tu nombre y correo. Te tomará menos de un minuto.
          </p>
        </div>
      </aside>
    </div>
  </section>
</template>

<script>
import { registerUseCase } from '../../application/register.usecase.js';

export default {
  name: 'RegisterView',
  data: () => ({
    name: '',
    email: '',
    sending: false,
    msg: ''
  }),
  computed: {
    canSend() {
      const emailOk = /\S+@\S+\.\S+/.test(this.email || '');
      return !!this.name && emailOk;
    }
  },
  methods: {
    async onSubmit() {
      if (!this.canSend || this.sending) return;
      this.sending = true;
      try {
        await registerUseCase({
          name: this.name.trim(),
          email: this.email.trim()
        });
        this.msg = '¡Cuenta creada! Te llevamos a elegir tu rol…';
        setTimeout(() => this.$router.push('/role'), 900);
      } catch (e) {
        this.msg = 'No pudimos crear tu cuenta. Intenta nuevamente.';
      } finally {
        this.sending = false;
        setTimeout(() => (this.msg = ''), 2500);
      }
    }
  }
};
</script>

<style scoped>
.register{
  min-height: calc(100dvh - 140px);
  display: grid;
  place-items: center;
}

.panel{
  width: min(980px, 96%);
  background: #ffffff;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0 18px 48px rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.06);
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  position: relative;
}


.left{
  padding: 38px 40px 34px;
  display: grid;
  align-content: center;
  gap: 18px;
}
.title{
  margin: 0 0 6px;
  font-weight: 900;
  color: #6f4228;
}


.form{ display: grid; gap: 12px; }

.field{ position: relative; display: block; }
.field__icon{
  position: absolute; inset-inline-start: 12px; top: 50%; transform: translateY(-50%);
  width: 20px; height: 20px; display: grid; place-items: center;
}
.field__icon svg{
  width: 20px; height: 20px;
  stroke: #714623;
  fill: none;
}

.input{
  width: 100%;
  padding: 12px 14px 12px 40px;
  border-radius: 999px;
  border: 1px solid #e7e7eb;
  background: #fff;
  color: #222;
  outline: none;
  box-shadow: inset 0 1px 0 rgba(16,24,40,.03);
  transition: border-color .15s ease, box-shadow .15s ease;
}
.input::placeholder{ color: #a0a0a8; }
.input:focus{
  border-color: #714623;
  box-shadow: 0 0 0 3px rgba(113,70,35,.22);
}


.btn{
  margin-top: 6px;
  padding: 12px 18px;
  border-radius: 999px;
  border: 1px solid transparent;
  background: #e3891b;
  color: #ffffff;
  font-weight: 800; letter-spacing: .2px;
  cursor: pointer;
  box-shadow: 0 10px 22px rgba(227,137,27,.25);
  transition: transform .08s ease, filter .15s ease, box-shadow .2s ease, background .15s ease;
}
.btn:hover{ filter: brightness(1.05); }
.btn:active{ transform: translateY(1px); background: #cf7a18; }
.btn:disabled{
  background: #e3891b !important;
  color: #ffffff !important;
  opacity: .85 !important;
  cursor: not-allowed;
  box-shadow: none !important;
}


.toast{
  margin-top: 8px;
  background: #ecfdf5;
  color: #047857;
  border: 1px solid #a7f3d0;
  padding: 10px 12px;
  border-radius: 10px;
  font-weight: 600;
}


.right{
  background: #714623;
  color: #fff;
  display: grid; place-items: center;
}
.right__inner{
  padding: 40px 34px;
  text-align: center;
  max-width: 360px;
}
.hello{ margin: 0 0 10px; font-weight: 900; }
.sub{ margin: 0; opacity: .95; line-height: 1.45; }


@media (max-width: 900px){
  .panel{ grid-template-columns: 1fr; }
  .right{ order:-1; min-height: 180px; }
  .left{ padding-block: 26px 34px; }
}
</style>
