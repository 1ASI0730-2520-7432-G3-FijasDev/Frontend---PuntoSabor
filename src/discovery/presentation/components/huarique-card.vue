<template>
  <article class="card card--category">
    <div v-if="img" class="card__media media">
      <img :src="img" :alt="item.name || item.category" loading="lazy" @error="onImgError" />
      <span class="media__badge">{{ item.category }}</span>
    </div>

    <div class="card__body">
      <strong>{{ item.name }}</strong>

      <p class="meta">
        {{ item.district }}
        • S/{{ isNum(item.price) ? Number(item.price).toFixed(2) : item.price }}
      </p>

      <!-- Bloque de calificación -->
      <div v-if="reviewStats" class="meta meta--reviews" aria-live="polite">
        <span class="meta__stars">{{ '★'.repeat(reviewStats.avgRounded) }}</span>
        <span class="meta__info">
          {{ reviewStats.avg.toFixed(1) }} / 5 · {{ reviewStats.count }} reseña<span v-if="reviewStats.count!==1">s</span>
        </span>
      </div>

      <div class="ps-actions">
        <!-- Ver reseñas -->
        <router-link
            class="ps-btn ps-btn--ghost"
            :to="{ name: 'reviews', params: { huariqueId: hid } }"
            :aria-label="`${$t('reviews.cta.viewReviews')} ${item.name}`"
            @click.stop
        >
          {{ $t('reviews.cta.viewReviews') }}
        </router-link>

        <!-- Reseñar -->
        <router-link
            class="ps-btn ps-btn--primary"
            :to="{ name: 'review-new', params: { huariqueId: hid } }"
            :aria-label="`${$t('reviews.cta.reviewThisPlace')} ${item.name}`"
            @click.stop
        >
          {{ $t('reviews.cta.reviewThisPlace') }}
        </router-link>
      </div>
    </div>
  </article>
</template>

<script>
import { api } from '@/shared/infrastructure/base-api';

export default {
  name: 'HuariqueCard',
  props: {
    item: { type: Object, required: true },
    img:  { type: String, default: '' }
  },
  data() {
    return { reviewStats: null };
  },
  computed: {
    hid() {
      const it = this.item || {};
      const id = it.id ?? it.huariqueId ?? it.HuariqueId ?? it.Id ?? it._id ?? null;
      return Number(id);
    }
  },
  async mounted() {
    try {
      const all = await api('/reviews');
      const reviews = all.filter(r => Number(r.huariqueId) === this.hid);
      if (reviews.length > 0) {
        const avg = reviews.reduce((s, r) => s + Number(r.rating ?? r.stars ?? 0), 0) / reviews.length;
        this.reviewStats = {
          count: reviews.length,
          avg,
          avgRounded: Math.round(avg)
        };
      }
    } catch (err) {
      console.warn('Error al cargar reseñas:', err);
    }
  },
  methods: {
    isNum(v) { return typeof v === 'number' || (!isNaN(v) && v !== null && v !== ''); },
    onImgError(e) { e.target.style.opacity = 0; }
  }
};
</script>

<style scoped>
:root { --ps-brown:#5B3010; --ps-gold:#E7A33E; --ps-cream:#FFF8E6; }

.meta--reviews {
  display: flex;
  align-items: center;
  gap: .4rem;
  margin-top: .25rem;
  font-size: .92rem;
  color: #4b3b2d;
}
.meta__stars {
  color: var(--ps-gold);
  font-size: .95rem;
  letter-spacing: 1px;
}
.meta__info {
  color: var(--ps-brown);
  font-weight: 600;
}

.ps-actions{
  display:flex; gap:.5rem; margin-top:.75rem; flex-wrap:wrap;
}

.ps-btn{
  --shadow: 0 2px 8px rgba(0,0,0,.08);
  display:inline-flex; align-items:center; justify-content:center;
  padding:.5rem .85rem; border-radius:999px; font-weight:700;
  text-decoration:none; transition:transform .12s ease, box-shadow .12s ease, opacity .12s ease;
  box-shadow: var(--shadow);
  border:1px solid transparent;
}
.ps-btn:hover{ transform:translateY(-1px); box-shadow:0 6px 14px rgba(0,0,0,.10); }

.ps-btn--primary{
  background: var(--ps-gold);
  color:#41240e;
  border-color: color-mix(in srgb, var(--ps-gold) 60%, transparent);
}
.ps-btn--primary:active{ transform:translateY(0); opacity:.9; }

.ps-btn--ghost{
  background:#fff;
  color: var(--ps-brown);
  border-color: color-mix(in srgb, var(--ps-brown) 22%, transparent);
}
.ps-btn--ghost:hover{ background: var(--ps-cream); }
</style>
