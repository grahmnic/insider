<template>
  <div class="article-empty d-flex flex-column justify-content-center align-items-center">
    <h2 class="text-muted">Sorry, this page doesn't exist ;(</h2>
    <router-link :to="`/`">Back to Home</router-link>
</div>
</template>

<script>
export default {
    name: 'not-found'
}
</script>

<style>
.article-empty {
    height: 100vh;
}
</style>