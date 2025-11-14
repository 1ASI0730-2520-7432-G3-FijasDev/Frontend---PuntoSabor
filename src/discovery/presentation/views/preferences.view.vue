<script setup>
import { ref, onMounted, computed } from 'vue';
import { getPreferencesQuery } from '@/discovery/application/get-preferences.query';
import { updatePreferencesUsecase } from '@/discovery/application/update-preferences.usecase';
import { listCategoriesQuery } from '@/discovery/application/list-categories.query';
import { getSession } from '@/auth/application/get-session.query.js'; // 👈 igual que en App.vue

const loading = ref(true);
const saving = ref(false);
const categories = ref([]);
const session = ref(null);

const form = ref({
  cuisines: [],
  maxPrice: null,
  district: '',
  nearOnly: false,
});

const budgets = [
  { label: 'Sin límite', value: null },
  { label: 'Hasta S/ 15', value: 15 },
  { label: 'Hasta S/ 20', value: 20 },
  { label: 'Hasta S/ 25', value: 25 },
  { label: 'Hasta S/ 30', value: 30 },
];

const fallbackCategories = [
  'Pollo',
  'Marina',
  'Criolla',
  'Chifa',
  'Postres',
  'Menú',
  'Café',
  'Parrillas',
];

// email directamente desde la sesión guardada en localStorage
const userEmail = computed(() => session.value?.email || null);

async function loadCategories() {
  try {
    const cats = await listCategoriesQuery();
    categories.value = Array.isArray(cats) && cats.length ? cats : fallbackCategories;
  } catch {
    categories.value = fallbackCategories;
  }
}

async function loadSessionAndPreferences() {
  try {
    // 👇 igual que en App.vue, es síncrono
    session.value = getSession();
    console.log('SESSION EN PREFERENCES:', session.value);

    if (!userEmail.value) {
      console.warn('No hay email en sesión, ¿seguro que estás logeado?');
      return;
    }

    const prefs = await getPreferencesQuery(userEmail.value);
    form.value = {
      cuisines: prefs.cuisines || [],
      maxPrice: prefs.maxPrice ?? null,
      district: prefs.district || '',
      nearOnly: !!prefs.nearOnly,
    };
  } catch (err) {
    console.warn('No se pudo cargar preferencias, usando defaults', err);
  }
}

onMounted(async () => {
  await loadCategories();
  await loadSessionAndPreferences();
  loading.value = false;
});

async function onSubmit() {
  if (!userEmail.value) {
    alert('Debes iniciar sesión para guardar tus preferencias.');
    return;
  }
  saving.value = true;
  try {
    await updatePreferencesUsecase(userEmail.value, form.value);
    alert(`Preferencias guardadas para ${userEmail.value}`);
  } catch (err) {
    console.error('Error guardando preferencias', err);
    alert('Ocurrió un error al guardar tus preferencias');
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <section class="wrap prefs-wrap" aria-labelledby="prefs-title">
    <header class="page-head">
      <h2 id="prefs-title" class="section-title">
        Configuración de preferencias
      </h2>
      <p class="section-subtitle">
        Personaliza tus recomendaciones según tu estilo de huariques.
      </p>
    </header>

    <div v-if="loading">Cargando preferencias…</div>

    <form v-else class="prefs-form" @submit.prevent="onSubmit">
      <!-- Tipo de cocina -->
      <fieldset class="prefs-group">
        <!-- Legend solo para accesibilidad, se oculta por CSS -->
        <legend>Tipo de cocina preferida</legend>

        <!-- TÍTULO VISIBLE -->
        <p class="prefs-group-title">Tipo de cocina preferida</p>

        <p class="hint">Puedes elegir más de una.</p>
        <div class="chips-grid">
          <label
              v-for="cat in categories"
              :key="cat"
              class="chip-option"
          >
            <input
                type="checkbox"
                :value="cat"
                v-model="form.cuisines"
            />
            <span>{{ cat }}</span>
          </label>
        </div>
      </fieldset>

      <!-- Presupuesto -->
      <fieldset class="prefs-group">
        <legend>Presupuesto por persona</legend>

        <!-- TÍTULO VISIBLE -->
        <p class="prefs-group-title">Presupuesto por persona</p>

        <select v-model="form.maxPrice">
          <option
              v-for="b in budgets"
              :key="b.label"
              :value="b.value"
          >
            {{ b.label }}
          </option>
        </select>
      </fieldset>

      <!-- Ubicación -->
      <fieldset class="prefs-group">
        <legend>Ubicación</legend>

        <!-- TÍTULO VISIBLE -->
        <p class="prefs-group-title">Ubicación</p>

        <label class="field">
          <span>Distrito preferido</span>
          <input
              type="text"
              v-model="form.district"
              placeholder="Ej: Surco, Miraflores…"
          />
        </label>

        <label class="field checkbox">
          <input type="checkbox" v-model="form.nearOnly" />
          <span>Solo mostrar huariques cerca de mí</span>
        </label>
      </fieldset>

      <button class="btn-primary" type="submit" :disabled="saving">
        {{ saving ? 'Guardando…' : 'Guardar preferencias' }}
      </button>
    </form>
  </section>
</template>
