<template>
  <section class="wrap hero">
    <div class="blob"></div>

    <div class="hero__grid">
      <!-- Lado izquierdo -->
      <div>
        <h1>{{ $t('home.headline') }}</h1>
        <p class="hero__lead">{{ $t('home.subhead') }}</p>

        <form class="search" @submit.prevent="goSearch">
          <input v-model="q" :placeholder="$t('home.searchPlaceholder')" />
          <button class="btn">{{ $t('home.ctaExplore') }}</button>
        </form>

        <div class="chips">
          <button class="chip" @click="quick('Pollo')">Pollo</button>
          <button class="chip" @click="quick('Marina')">Marina</button>
          <button class="chip" @click="quick('Menú')">Menú</button>

          <RouterLink class="chip" to="/categories">{{ $t('home.ctaExplore') }}</RouterLink>
          <RouterLink class="chip" to="/map">{{ $t('home.ctaMap') }}</RouterLink>
        </div>
      </div>

      <!-- Lado derecho: logo con nombre -->
      <div class="pinwrap">
        <div class="pin pin--img">
          <img :src="smallLogo" alt="PuntoSabor" />
        </div>
        <h2 class="hero__brand">PuntoSabor</h2>
      </div>
    </div>
  </section>

  <!-- Sección de categorías destacadas -->
  <section class="wrap" v-if="cats.length">
    <h2 class="section-title">{{ $t('home.catsTitle') }}</h2>
    <div class="grid cards-4">
      <article v-for="c in cats" :key="c" class="card card--category">
        <div class="card__media">{{ c }}</div>
        <div class="card__body">
          <strong>{{ c }}</strong>
          <p class="meta">{{ $t('home.popularNear') }}</p>
        </div>
        <div class="card__footer">
          <RouterLink class="btn" :to="{ path:'/results', query:{ q:c } }">
            {{ $t('home.view') }}
          </RouterLink>
          <span class="meta">+10</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import { listCategoriesQuery } from '@/discovery/application/list-categories.query.js';
import smallLogo from '@/assets/slogoPuntoSabor.png';

export default {
  name: 'HomeView',
  data: () => ({
    q: '',
    cats: [],
    smallLogo
  }),
  async created() {
    this.cats = (await listCategoriesQuery()).slice(0, 4);
  },
  methods: {
    goSearch() {
      this.$router.push({ path: '/results', query: { q: this.q } });
    },
    quick(term) {
      this.$router.push({ path: '/results', query: { q: term } });
    }
  }
};
</script>