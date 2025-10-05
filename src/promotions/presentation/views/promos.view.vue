<template>
  <section class="wrap">
    <h2 class="section-title">Promociones</h2>
    <div class="grid cards-3">
      <article v-for="p in promos" :key="p.id" class="card">
        <div class="card__media">Promo</div>
        <div class="card__body">
          <strong>{{ p.title }}</strong>
          <p class="meta">{{ p.note }}</p>
          <button class="btn">Ver detalles</button>
        </div>
      </article>
    </div>
  </section>
</template>
<script>
import { listPromosQuery } from '../../application/list-promos.query.js';
export default {
  name:'PromosView',
  data:()=>({promos:[]}),
  async created(){ this.promos = await listPromosQuery(); }
}
</script>
