<template>
  <div>
    <h1>¡Me mudo!</h1>
    <article>
      <h2>Contexto:</h2>
      <p>Tengo que dejar en febrero el departamento que habito en el barrio de Palermo, Ciudad de Buenos Aires y vendo
        casi todo.</p>
      <p>Te invito a ver el listado y ponerte en contacto por WhatsApp para reservar lo que quieras comprar.</p>
      <p>Si te interesa más de una cosa, podemos armar algún combo con descuentos.</p>
    </article>

    <h2>Productos</h2>
    <section class="grid-container">

      <template v-for="{ id, nombre, descripcion, disponibilidad, precio, estado } in products" :key="id">
        <div v-if="estado != 'vendido'" class="grid-item">
          <span v-if="estado === 'reservado'" class="badge">Reservado</span>
          <!-- <img src="`../assets/vue.svg`" :alt="`Imagen de ${nombre}`"> -->
          <img :src="`/img/${id}.jpg`" :alt="`Imagen de ${nombre}`">
          <div>
            <h3>{{ nombre.toUpperCase() }}</h3>
            <p>{{ descripcion }}</p>
            <p>Disponible para retiro el día: {{ disponibilidad }}</p>
            <p>{{ Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(precio) }}</p>
            <RouterLink :to="`./productdetail/${id}`">Ver más</RouterLink>
          </div>
        </div>
      </template>


    </section>

  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useProductsStore } from '../stores/products'
import { onMounted } from 'vue';

// access the `store` variable anywhere in the component ✨
const store = useProductsStore()
const { products } = storeToRefs(store)
// console.log(products)

onMounted(() => {
  store.fetchProducts()
})

function getIMGPath(id) {
  return `../assets/img/${id}.jpg`
}

</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 25rem), 1fr));
  gap: 1rem;
  width: 100%;
  /* background: #000; */
}

.grid-item {
  display: flex;
  position: relative;
  /* flex-direction: column; */
  gap: 1rem;
  padding: 1rem;
  background: #3a3a3a;
  border-radius: .25rem;
  box-shadow: 1px 1px .15rem #c664ff;


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
    /* background: #fff; */
    filter: drop-shadow(0 0 0.5rem #c3c3c3);
    min-height: 5rem;
    flex: 1 1 1;
    object-fit: cover;
    object-position: center center;
    max-width: 150px;
    aspect-ratio: 1;
  }
  
  >div {
    flex: 2
  }
  
  @media screen and (max-width: 768px) {
    flex-direction: column;
    img{
      max-width: 100%;
    }
  }
}
</style>