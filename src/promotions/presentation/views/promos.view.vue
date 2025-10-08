<template>
  <section class="wrap">
    <h2 class="section-title">Promociones</h2>

    <div class="grid cards-3">
      <article v-for="p in promos" :key="p.id" class="card card--promo">
        <div class="card__media media">
          <img :src="promoImg(p)" :alt="p.title" loading="lazy" @error="onImgError" />
          <span class="media__badge">{{ p.title }}</span>
        </div>

        <div class="card__body">
          <p class="meta">{{ p.note }}</p>
          <button class="btn">Ver detalles</button>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import { listPromosQuery } from '../../application/list-promos.query.js';

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
    IMG_MAP['slogopuntosabor'] ||
    IMG_MAP['logopuntosabor'] ||
    Object.values(IMG_MAP)[0];

export default {
  name: 'PromosView',
  data: () => ({ promos: [] }),
  async created() {
    this.promos = await listPromosQuery();
  },
  methods: {
    promoImg(p) {
      const text = `${p.title} ${p.note}`.toLowerCase();

      const buckets = [
        { keys: ['pollo', 'brasa', 'parrilla', 'parrillas'], imgs: ['pollo', 'pollo-brasa', 'parrillasref'] },
        { keys: ['marina', 'ceviche', 'marisco', 'mariscos'], imgs: ['la-marina', 'marisco'] },
        { keys: ['criollo', 'casera'], imgs: ['criolla', 'antojos-criollos'] },
        { keys: ['chifa', 'wok', 'china', 'asiatica'], imgs: ['chifaref', 'la-picanteria', 'don-pepe', 'el-forastero'] },
        { keys: ['postre', 'dulce', 'mazamorra'], imgs: ['postresref', 'dulcesazon', 'mazamorra-morada'] },
        { keys: ['menu', 'menú'], imgs: ['menuref'] },
        { keys: ['cafe', 'café'], imgs: ['caferef', 'caféref'] }
      ];

      for (const b of buckets) {
        if (b.keys.some(k => text.includes(k))) {
          const candidates = b.imgs.flatMap(k => [k, k.replace(/-/g, '_')]);
          for (const key of candidates) if (IMG_MAP[key]) return IMG_MAP[key];
        }
      }

      return FALLBACK;
    },

    onImgError(e) {
      e.target.src = FALLBACK;
    }
  }
};
</script>

<style scoped>
.media {
  position: relative;
  overflow: hidden;
  background: var(--bg-alt);
  aspect-ratio: 4 / 3;
  display: grid;
  place-items: center;
  transition: transform 0.3s ease;
}
.media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02) translateZ(0);
  transition: transform 0.45s cubic-bezier(.2, .7, .2, 1), filter 0.3s ease;
  filter: saturate(1.03) contrast(1.02);
}
.card:hover .media img {
  transform: scale(1.06) translateY(-2px);
  filter: saturate(1.06) contrast(1.05);
}
.media__badge {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
  padding: 8px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--brown);
  font-weight: 900;
  letter-spacing: 0.2px;
  box-shadow: var(--shadow-1);
}
</style>
