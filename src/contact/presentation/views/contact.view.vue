<template>
  <section class="wrap">
    <h2 class="section-title">Contáctanos</h2>
    <div class="grid cards-2">
      <form class="card" @submit.prevent="send">
        <div class="card__body" style="display:grid;gap:12px">
          <input v-model="name" placeholder="Nombre"/>
          <input v-model="email" placeholder="Correo"/>
          <textarea v-model="msg" rows="6" placeholder="Mensaje"></textarea>
          <button class="btn">Enviar</button>
          <p v-if="ok" class="meta">✅ Gracias, recibimos tu consulta.</p>
        </div>
      </form>
      <div class="card"><div class="card__body">
        <div style="height:260px;border-radius:16px;background:
        linear-gradient(transparent 24px, rgba(0,0,0,.06) 25px),
        linear-gradient(90deg, transparent 24px, rgba(0,0,0,.06) 25px);
        background-size:25px 25px; position:relative">
          <span style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:18px;height:18px;border-radius:50%;background:#e3891b;border:3px solid #fff"></span>
        </div>
      </div></div>
    </div>
  </section>
</template>
<script>
import { sendMessageUsecase } from '../../application/send-message.usecase.js';
export default {
  name:'ContactView',
  data:()=>({ name:'', email:'', msg:'', ok:false }),
  methods:{
    async send(){
      await sendMessageUsecase?.({ name:this.name, email:this.email, msg:this.msg });
      this.ok = true; setTimeout(()=> this.ok=false, 2500);
    }
  }
}
</script>
