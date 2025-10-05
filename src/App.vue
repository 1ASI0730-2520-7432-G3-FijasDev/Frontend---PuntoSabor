<template>
  <!-- Si usas el switcher de idiomas, déjalo. Si no, elimínalo -->
  <LanguageSwitcher />

  <nav class="nav">
    <div class="nav__inner">
      <RouterLink class="brand" to="/">
        <img class="brand__mark" :src="smallLogo" alt="PuntoSabor" />
      </RouterLink>
      <div class="nav__menu">
        <RouterLink to="/categories">{{ $t('nav.categories') }}</RouterLink>
        <RouterLink to="/promos">{{ $t('nav.promos') }}</RouterLink>
        <RouterLink to="/plans">{{ $t('nav.plans') }}</RouterLink>
        <RouterLink to="/contact">{{ $t('nav.contact') }}</RouterLink>
        <RouterLink to="/map">{{ $t('nav.map') }}</RouterLink>
        <RouterLink class="btn" to="/auth">{{ $t('nav.signin') }}</RouterLink>
      </div>
    </div>
  </nav>

  <RouterView />

  <footer class="footer">
    <div class="wrap">
      <RouterLink class="brand" to="/" style="color:#fff">
        <img class="brand__mark brand__mark--footer" :src="smallLogo" alt="PuntoSabor" />
      </RouterLink>
      <small>© 2025 FijasDev</small>
    </div>
  </footer>
</template>

<script>
import smallLogo from '@/assets/slogoPuntoSabor.png';
import LanguageSwitcher from '@/shared/presentations/components/language-switcher.vue'; // quítalo si no usas i18n

export default {
  name: 'App',
  components: { LanguageSwitcher }, // quítalo si no usas i18n
  data: () => ({ smallLogo })
};
</script>

<style scoped>
.brand {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.brand__mark{
  width: 36px;
  height: 36px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,.15));
}

/* puedes variar el tamaño del logo del footer si quieres */
.brand__mark--footer{
  width: 32px;
  height: 32px;
}

@media (max-width: 640px) {
  .brand__mark{ width: 32px; height: 32px; }
}
</style>
