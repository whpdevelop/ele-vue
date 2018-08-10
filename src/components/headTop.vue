<template>
 <div id='headTop'>
     <p>
       <van-icon name="location" class="icon"/>
       <span>北京</span>
      </p>
      <router-link to="/search" class="search">
        <van-icon name="search" class="icon"/>
        <span>搜索饿了吗商家 商品名称</span>
      </router-link>
 </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {}
};
</script>
<style lang="scss">
#headTop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 1.6rem;
  padding: 0.2rem;
  background-color: #0085ff;

  .icon {
    vertical-align: middle;
  }
  p {
    color: #fff;
  }
  .search {
    margin-top: 0.1rem;
    display: block;
    height: 0.6rem;
    background-color: #ddd;
    text-align: center;
    line-height: 0.6rem;
  }
}
</style>
