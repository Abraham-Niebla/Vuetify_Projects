<template>
  <ul class="skip-links">
    <li>
      <a href="#main" ref="skipLink" class="skip-link">Skip to main content</a>
    </li>
  </ul>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const skipLink = ref()

  watch(
    () => route.path,
    () => {
      skipLink.value.focus()
    }
  )
</script>

<style>
  .skip-link {
    white-space: nowrap;
    margin: 1em auto;
    top: 0;
    position: fixed;
    left: 50%;
    margin-left: -72px;
    opacity: 0;
  }
  .skip-link:focus {
    opacity: 1;
    background-color: white;
    padding: 0.5em;
    border: 1px solid black;
  }
</style>
