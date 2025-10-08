<template>
  <section class="wrap">
    <h2 class="section-title">{{ $t('ownerNew.promos.title') }}</h2>

    <div class="grid cards-3">
      <article v-for="p in promos" :key="p.id" class="card card--promo">
        <div class="card__media media">
          <img :src="promoImg(p)" :alt="trTitle(p)" loading="lazy" @error="onImgError" />
          <span class="media__badge">{{ trTitle(p) }}</span>
        </div>

        <div class="card__body">
          <p class="meta">{{ trNote(p) }}</p>
          <button class="btn">{{ $t('ownerNew.promos.seeDetails') }}</button>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import { listPromosQuery } from '../../application/list-promos.query.js';

const modules = import.meta.glob('/src/assets/*.{png,jpg,jpeg,webp}', { eager: true, as: 'url' });
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

const BUCKETS = [
  { key: 'parrilla', keys: ['parrilla', 'parrillas', 'grill', 'asado'], imgs: ['parrillasref'] },
  { key: 'pollo',    keys: ['pollo', 'brasa', 'brasas'],                imgs: ['pollo_brasa'] },
  { key: 'marino',   keys: ['marino', 'marina', 'ceviche', 'mariscos', 'pescado'], imgs: ['la_marina', 'marisco'] },
  { key: 'cafe',     keys: ['cafe', 'café', 'espresso', 'latte'],      imgs: ['caféref'] },
  { key: 'postre',   keys: ['postre', 'postres', 'dulce', 'torta', 'pastel', 'helado', 'mazamorra'], imgs: ['postresref', 'dulcesazon', 'mazamorra_morada'] },
  { key: 'criollo',  keys: ['criollo', 'criolla', 'anticucho', 'aji de gallina', 'lomo saltado'],   imgs: ['criolla', 'antojos_criollos'] }
];

export default {
  name: 'PromosView',
  data: () => ({ promos: [] }),

  async created () {
    this.promos = await listPromosQuery();
  },

  methods: {
    norm (s) {
      return String(s || '')
          .toLowerCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    },

    promoKey (p) {
      const text = this.norm(`${p.title} ${p.note}`);
      const bucket = BUCKETS.find(b => b.keys.some(k => text.includes(this.norm(k))));
      return bucket?.key || null;
    },

    trTitle (p) {
      const k = this.promoKey(p);
      if (k) {
        const path = `ownerNew.promos.cards.${k}.title`;
        const t = this.$t(path);
        if (t !== path) return t;
      }
      return p.title;
    },
    trNote (p) {
      const k = this.promoKey(p);
      if (k) {
        const path = `ownerNew.promos.cards.${k}.note`;
        const t = this.$t(path);
        if (t !== path) return t;
      }
      return p.note;
    },

    promoImg (p) {
      const k = this.promoKey(p);
      if (k) {
        const bucket = BUCKETS.find(b => b.key === k);
        const candidates = bucket.imgs.flatMap(n => [n, n.replace(/-/g, '_')]);
        for (const key of candidates) if (IMG_MAP[key]) return IMG_MAP[key];
      }

      const title = this.norm(p.title).replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
      for (const key of [title, title.replace(/-/g, '_')]) if (IMG_MAP[key]) return IMG_MAP[key];

      return FALLBACK;
    },

    onImgError (e) { e.target.src = FALLBACK; }
  }
};
</script>
