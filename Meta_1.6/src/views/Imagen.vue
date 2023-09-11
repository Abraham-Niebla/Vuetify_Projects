<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      :src = "url"
      cover
    ></v-img>

    <v-card-title class="text-pink-darken-3">
      Imagenes aleatorias
    </v-card-title>

    <v-card-subtitle class="text-pink-lighten-2">
      Miles de imagenes generadas aleatoriamente
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="purple-darken-1"
        variant="text"
        @click="actualizaImagen"
      >
        Cambiar
      </v-btn>

      <v-spacer />

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show" class="text-purple-darken-4"/>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider />

        <v-card-text class="text-pink-darken-4">
          Muchas imagenes generadas al azar por medio del link "https://random.imagecdn.app/300/400"
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue';
  const show = ref(false);
  const imagenURL = ref("https://random.imagecdn.app/300/400");
  const url = ref(imagenURL.value);

  async function actualizaImagen()
  {
    const response = await fetch(imagenURL.value,
    {
      method: "GET"
    });

    console.log(response.url);
    url.value = response.url;
  }
</script>
