<template>
  <v-table fixed-header height="705px" >
    <thead>
      <tr>
        <th class="text-center">
          <h3 class="bg-purple-darken-1">Autor</h3 >
        </th>

        <th class="text-center">
          <h3 class="bg-purple-darken-1">Titulo</h3 >
        </th>

        <th class="text-center">
          <h3 class="bg-purple-darken-1">Post</h3 >
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in creadores" :key="item.id">
        <td class="text-center">{{ item.Autor }}</td>
        <td class="text-center">{{ item.Titulo }}</td>
        <td class="text-justify">{{ item.Post }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const urlPosts = "https://jsonplaceholder.typicode.com/posts";
const urlAutores = "https://jsonplaceholder.typicode.com/users";
const creadores = ref([]);

onMounted(async () =>
{
  try
  {
    // Obtener datos de los posts
    const responsePosts = await fetch(urlPosts);
    const dataPosts = await responsePosts.json();

    // Obtener datos de los autores
    const responseAutores = await fetch(urlAutores);
    const dataAutores = await responseAutores.json();

    // Combinar los datos de autores y posts
    const mergedData = dataPosts.map(post =>
    {
      const autor = dataAutores.find(autor => autor.id === post.userId);
      return {
        Autor: autor.name,
        Titulo: post.title,
        Post: post.body};
    });

    // Actualizar la variable creadores con los datos combinados
    creadores.value = mergedData;
  }
  catch (error)
  {
    console.error("Error al obtener los datos:", error);
  }
});
</script>
