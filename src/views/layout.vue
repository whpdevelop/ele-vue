<template>
 <div id='layout'>
    <head-top></head-top>
    <router-view/>
    <foot-bottom></foot-bottom>
 </div>
</template>

<script>
import headTop from "@/components/headtop";
import footBottom from "@/components/footBottom";
export default {
  data() {
    return {};
  },
  components: {
    headTop,
    footBottom
  }
};
</script>

<style lang="scss">
#layout {
  padding-top: 1.7rem;
  padding-bottom: 1rem;
}
</style>
