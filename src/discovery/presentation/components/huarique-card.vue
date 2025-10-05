<template>
  <article class="card">
    <div class="card__media">{{ item.category }}</div>
    <div class="card__body">
      <strong>{{ item.name }}</strong>
      <p class="meta">{{ item.district }} • S/{{ item.price.toFixed(2) }} • {{ item.rating }} ★</p>
    </div>
  </article>
</template>
<script>
export default { name:'HuariqueCard', props:{ item:{ type:Object, required:true } } }
</script>
