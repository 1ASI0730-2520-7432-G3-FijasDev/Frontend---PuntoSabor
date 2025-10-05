<template>
  <section class="wrap">
    <h2 class="section-title">Resultados <small style="font-size:14px">{{ results.length }} hallazgos</small></h2>
    <div class="grid cards-4">
      <HuariqueCard v-for="h in results" :key="h.id" :item="h" />
    </div>
  </section>
</template>

<script>
import { searchHuariquesQuery } from '../../application/search-huariques.query.js';
import HuariqueCard from '../components/huarique-card.vue';
export default {
  name:'ResultsView',
  components:{ HuariqueCard },
  data:()=>({ results:[] }),
  async created(){ this.fetch(); },
  watch:{ '$route.query.q': 'fetch' },
  methods:{
    async fetch(){ this.results = await searchHuariquesQuery(this.$route.query.q || ''); }
  }
}
</script>
