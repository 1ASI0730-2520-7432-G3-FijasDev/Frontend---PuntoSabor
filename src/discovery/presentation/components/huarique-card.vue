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