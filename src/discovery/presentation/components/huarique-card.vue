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
        • {{ item.rating }} ★
      </p>
    </div>
  </article>
</template>

<script>
export default {
  name: 'HuariqueCard',
  props: {
    item: { type: Object, required: true },
    img:  { type: String, default: '' }
  },
  methods: {
    isNum(v) { return typeof v === 'number' || (!isNaN(v) && v !== null && v !== ''); },
    onImgError(e) { e.target.style.opacity = 0; }
  }
};
</script>

<style scoped>
.media {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  height: 220px;
  width: 100%;
  display: block;
  background: var(--bg-alt);
  transition: transform 0.3s ease;
}

.media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.02) translateZ(0);
  transition: transform 0.4s cubic-bezier(.2, .7, .2, 1), filter 0.3s ease;
  filter: saturate(1.05) contrast(1.05);
}

.card:hover .media img {
  transform: scale(1.07);
  filter: saturate(1.1) contrast(1.1);
}

.media__badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--brown);
  font-size: 0.9rem;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 12px;
  box-shadow: var(--shadow-1);
  letter-spacing: 0.3px;
}

.media {
  aspect-ratio: 4 / 3;
  height: auto;
}
</style>


