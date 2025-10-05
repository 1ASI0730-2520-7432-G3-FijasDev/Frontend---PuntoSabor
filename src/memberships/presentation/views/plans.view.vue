<template>
  <section class="wrap">
    <h2 class="section-title">Planes de membresía</h2>
    <div class="grid cards-3">
      <article v-for="p in plans" :key="p.id" class="card">
        <div class="card__body">
          <h3>{{ p.name }}</h3>
          <p class="meta">S/{{ p.price }} / mes</p>
          <button class="btn">Elegir</button>
        </div>
      </article>
    </div>
  </section>
</template>
<script>
import { listPlansQuery } from '../../application/list-plans.query.js';
export default {
  name:'PlansView',
  data:()=>({plans:[]}),
  async created(){ this.plans = await listPlansQuery(); }
}
</script>
