<template>
  <section class="wrap">
    <h2 class="section-title">{{ $t('categories.title') }}</h2>
    <div class="grid cards-3">
      <article v-for="c in cats" :key="c" class="card">
        <div class="card__media">{{ c }}</div>
        <div class="card__body">
          <strong>{{ c }}</strong>
          <p class="meta">{{ $t('categories.exploreInArea', { category: c }) }}</p>
          <RouterLink
              class="btn"
              :to="{ path: '/results', query: { q: c } }"
          >
            {{ $t('categories.see') }}
          </RouterLink>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import { listCategoriesQuery } from '../../application/list-categories.query.js';

export default {
  name: 'CategoriesView',
  data: () => ({ cats: [] }),
  async created() {
    this.cats = await listCategoriesQuery();
  },
};
</script>

<style scoped>
.section-title {
  font-weight: 900;
  color: var(--brown);
  font-size: clamp(24px, 3.4vw, 40px);
  margin: 8px 0 16px;
  text-align: center;
}

.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  border: 1px solid rgba(0, 0, 0, 0.06);
  text-align: center;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
}

.card__media {
  background: var(--bg-alt);
  font-weight: 700;
  font-size: 1.3rem;
  padding: 2rem 0;
  color: var(--brown);
}

.card__body {
  padding: 16px;
}

.btn {
  background: var(--orange);
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 18px rgba(227, 137, 27, 0.25);
}
</style>
