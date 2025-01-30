<template>
  <div style="margin: 20px auto; max-width: 1000px;">
    <div :class="`common_name${sale ? '--sale' : ''}`">
      <p :style="`text-decoration:${sale ? 'line-through': 'auto'}`">{{ price }}</p>
      <p v-if="sale">{{ price_sale }}</p>
      <button @click="sale=!sale">{{ !sale ? 'Хочу скидку' : 'Лучше без скидки!'}}</button>
    </div>
    <ClientOnly>
      <TiptapEditor />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const sale = ref(false)
const price = computed(()=>{
  return sale.value ? 4000*2 : 4000
})
const price_sale = 6000
</script>

<style>
</style>