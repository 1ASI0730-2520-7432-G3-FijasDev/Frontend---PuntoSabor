<template>
  <section class="wrap">
    <h2 class="section-title">Huariques cerca de ti (mapa simulado)</h2>
    <div ref="map" class="map" style="height:420px;border-radius:16px;background:
      linear-gradient(transparent 24px, rgba(0,0,0,.06) 25px),
      linear-gradient(90deg, transparent 24px, rgba(0,0,0,.06) 25px);
      background-size:25px 25px; position:relative; overflow:hidden;">
      <span v-for="(p,i) in pins" :key="i"
            class="pin"
            :style="{left:(p.x*100)+'%', top:(p.y*100)+'%'}"></span>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">
      <RouterLink class="btn-ghost" :to="{ path:'/results', query:{ q:'Pollo' } }">Recomendado</RouterLink>
      <RouterLink class="btn-ghost" :to="{ path:'/results', query:{ q:'Menú' } }">Tu zona</RouterLink>
      <RouterLink class="btn-ghost" to="/reviews">Reseñas</RouterLink>
    </div>
  </section>
</template>

<script>
export default {
  name:'MapView',
  data:()=>({ pins:[{x:.2,y:.3},{x:.4,y:.55},{x:.6,y:.25},{x:.78,y:.62},{x:.33,y:.75}] })
}
</script>

<style scoped>
.pin{position:absolute;width:18px;height:18px;border-radius:50%;background:#e3891b;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.25);transform:translate(-50%,-50%)}
</style>
