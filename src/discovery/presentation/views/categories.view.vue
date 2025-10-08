<template>
  <section class="wrap categories-page" aria-labelledby="cat-title">
    <header class="page-head fx-sub">
      <h2 id="cat-title" class="section-title fx-title">
        {{ $t('categories.title') }}
      </h2>
    </header>

    <div class="grid cards-3 categories-grid">
      <article
          v-for="(c, i) in cats"
          :key="c"
          class="card card--category item"
          :style="stagger(i)"
      >

        <div class="card__media media">
          <img :src="categoryImg(c)" :alt="c" loading="lazy" @error="onImgError" />
          <span class="media__badge" :aria-label="c">
            {{ c }}
          </span>
        </div>

        <div class="card__body">

          <p class="meta">{{ $t('categories.exploreInArea', { category: c }) }}</p>
        </div>

        <footer class="card__footer">
          <RouterLink class="btn" :to="{ path: '/results', query: { q: c } }">
            {{ $t('categories.see') }}
          </RouterLink>
        </footer>
      </article>
    </div>
  </section>
</template>

<script>
import { listCategoriesQuery } from '../../application/list-categories.query.js';


const modules = import.meta.glob('/src/assets/*.{png,jpg,jpeg,webp}', {
  eager: true,
  as: 'url'
});

const IMG_MAP = Object.fromEntries(
    Object.entries(modules).map(([path, url]) => {
      const filename = path.split('/').pop().toLowerCase().replace(/\.[^.]+$/, '');
      return [filename, url];
    })
);

const FALLBACK =
    IMG_MAP['logopuntosabor'] ||
    IMG_MAP['slogopuntosabor'] ||
    Object.values(IMG_MAP)[0];

export default {
  name: 'CategoriesView',
  data: () => ({
    cats: []
  }),
  async created () {
    this.cats = await listCategoriesQuery();
  },
  methods: {
    slugify (s) {
      return String(s)
          .toLowerCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9\-]/g, '');
    },

    categoryImg (c) {
      const slug = this.slugify(c);
      const ALIAS = {
        pollo:   ['pollo', 'pollo-brasa', 'pollo_brasa'],
        marina:  ['marina', 'la-marina', 'la_marina', 'marisco', 'mariscos'],
        criolla: ['criolla', 'antojos-criollos', 'antojos_criollos'],
        chifa:   ['chifa', 'la-picanteria', 'la_picanteria', 'don-pepe', 'don_pepe', 'el-forastero', 'el_forastero'],
        postres: ['postres', 'dulces', 'dulcesazon', 'mazamorra', 'mazamorra-morada', 'mazamorra_morada'],
        menu:    ['menu', 'menú'],
        cafe:    ['cafe']
      };

      const candidates = (ALIAS[slug] || [slug])
          .map(k => [k, k.replace(/-/g, '_')])
          .flat();

      for (const key of candidates) {
        if (IMG_MAP[key]) return IMG_MAP[key];
      }
      return FALLBACK;
    },
    onImgError (e) {
      e.target.src = FALLBACK;
    },

    stagger (i) {
      const delay = (i % 12) * 60; // ms
      return { animationDelay: `${delay}ms` };
    }
  }
};
</script>

<style scoped>
/* ===== Cabecera ===== */
.page-head{
  margin-bottom: 4px;
}
.fx-title{
  position: relative;
  display: inline-block;
  padding-bottom: 6px;
}
.fx-title::after{
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: -4px;
  height: 6px;
  border-radius: 6px;
  background: linear-gradient(90deg, rgba(227,137,27,.25), rgba(111,66,40,.35));
  filter: blur(0.2px);
  animation: underlineGlow 2.2s ease-in-out infinite alternate;
}
@keyframes underlineGlow {
  from { opacity: .65; transform: scaleX(.98); }
  to   { opacity: 1;   transform: scaleX(1.02); }
}
.fx-sub{
  margin: 6px 0 14px;
}

/* ===== Grid local ===== */
.categories-grid{ gap: 14px; }


.item{
  animation: cardPop .55s cubic-bezier(.2,.7,.2,1) both;
}
@keyframes cardPop{
  from{ opacity: 0; transform: translateY(18px) scale(.98); }
  to  { opacity: 1; transform: translateY(0)   scale(1);   }
}


.card__body{ padding: 12px 14px; }
.card--category .card__footer{ padding: 10px 12px; }

.media{
  position: relative;
  overflow: hidden;
  background: var(--bg-alt);
  aspect-ratio: 4 / 3;
  display: grid;
  place-items: center;
  transition: transform .3s ease;
}
.media img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02) translateZ(0);
  transition: transform .45s cubic-bezier(.2,.7,.2,1), filter .3s ease;
  filter: saturate(1.03) contrast(1.02);
}
.card:hover .media img{
  transform: scale(1.06) translateY(-2px);
  filter: saturate(1.06) contrast(1.05);
}

.media__badge{
  position: absolute;
  left: 10px; right: 10px; bottom: 10px;
  display: inline-block;
  padding: 8px 12px;
  border-radius: 12px;
  background: rgba(255,255,255,.9);
  color: var(--brown);
  font-weight: 900;
  letter-spacing: .2px;
  box-shadow: var(--shadow-1);
  will-change: transform, opacity;
  animation: badgeIn .5s ease-out both;
}
@keyframes badgeIn{
  from{ transform: translateY(10px); opacity: 0; }
  to  { transform: translateY(0);    opacity: 1; }
}
.card:hover .media__badge{
  animation: none;
  transform: translateY(-2px);
}
.card:hover .media__badge::after{
  content:"";
  position:absolute; inset:0;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,.25), transparent);
  transform: translateX(-100%);
  animation: shine .8s ease-out;
  border-radius: inherit;
}
@keyframes shine{
  to { transform: translateX(100%); }
}

.categories-grid:has(> :nth-child(3n+1):last-child) > :last-child{
  grid-column: 5 / span 4;
}
.categories-grid:has(> :nth-child(3n+1):nth-last-child(2)) > :nth-last-child(2){
  grid-column: 3 / span 4;
}
.categories-grid:has(> :nth-child(3n+2):last-child) > :last-child{
  grid-column: 7 / span 4;
}

@media (max-width:1024px){
  .categories-page .cards-3 > *{ grid-column: span 6; }
}
@media (max-width:640px){
  .categories-page .cards-3 > *{ grid-column: 1 / -1; }
  .media__badge{ left: 8px; right: 8px; bottom: 8px; padding: 7px 10px; }
}
</style>
