<script>
import { RouterLink, RouterView } from 'vue-router'
import theHeader from './components/Header.vue'
export default {
  components: {
    theHeader
  }
}
</script>

<template>
  <header>
    <theHeader />
  </header>
  <RouterView />
</template>

<style scoped>
header{
  line-height: 2rem;
}
</style>