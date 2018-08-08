<template>
  <div id="app">
    <div class="rem"></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
.rem {
  width: 2rem;
  height: 2rem;
  background-color: #000;
}
</style>
