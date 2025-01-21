<template>
  <nav>
    <RouterLink to="/"><- Volver</RouterLink>
  </nav>
  <div>
    <h1>DETALLES DE {{ nombre.toUpperCase() }}</h1>
    <h2>Producto: {{ nombre.toUpperCase() }}</h2>
    <p>Product ID: {{ $route.params.id }}</p>

    <section>

      <span v-if="estado === 'reservado'" class="badge">Reservado</span>

      <img :src="`/img/${id}.jpg`" :alt="`Imagen de ${nombre}`" @error="$event.target.src = '/vite.svg'"/>
      <img :src="`/img/${id}_b.jpg`" :alt="`Otra imagen de ${nombre}`" @error="$event.target.style.display = 'none'"/>

      <div>
        <h3>{{ nombre.toUpperCase() }}</h3>
        <p>{{ descripcion }}</p>
        <p>Disponible para retiro el día: {{ disponibilidad }}</p>
        <p>{{ Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(precio) }}</p>
      </div>
      <a aria-label="Chat on WhatsApp" :href="`https://wa.me/${telefono}?text=${encodedMessage}`" target="_blank">
        <img alt="Chat on WhatsApp" src="@/assets/WhatsAppButtonGreenSmall.svg" />
      </a>
    </section>
  </div>

</template>

<script setup>

import { storeToRefs } from 'pinia';
import { useProductsStore } from '../stores/products'
import { useRoute } from 'vue-router'


const route = useRoute()

// access the `store` variable anywhere in the component ✨
const store = useProductsStore()
const { products } = storeToRefs(store)
const { id, nombre, descripcion, disponibilidad, precio, estado } = products.value.find(product => product.id === route.params.id)
const telefono = import.meta.env.VITE_TELEFONO
const encodedMessage = encodeURI(`Hola! Me interesa el producto:\n*${nombre}* \nID: ${id}\n`)


</script>

<style scoped>
section{
  position: relative;
}
.badge {
  position: absolute;
  top: 0;
  right: 0;
  background: rgb(255, 187, 0);
  color: #3a3a3a;
  padding: .5rem;
  border-radius: .25rem;
  width: 50%;
  rotate: 15deg;
  translate: 0 80%;
}

img {
  /* max-height: 80dvh; */
  max-width: 100%;
  /* aspect-ratio: 1/2; */
  object-fit: contain;
}
</style>