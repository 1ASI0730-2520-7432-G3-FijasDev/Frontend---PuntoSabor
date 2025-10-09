<template>
  <section class="wrap">
    <h2 class="section-title">Reseñas</h2>
    <div class="grid cards-2">
      <article v-for="r in reviews" :key="r.id" class="card">
        <div class="card__body">
          <strong>{{ r.by }} • {{ '★'.repeat(r.stars) }}</strong>
          <p>{{ r.text }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
<script>
import { listReviewsQuery } from '../../application/list-reviews.query.js';
export default {
  name:'ReviewsView',
  data:()=>({reviews:[]}),
  async created(){ this.reviews = await listReviewsQuery(); }
}
</script>
