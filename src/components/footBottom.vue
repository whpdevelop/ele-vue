<template>
 <div id='footBottom'>
    <van-tabbar v-model="active">
        <van-tabbar-item icon="home" to="/index">首页</van-tabbar-item>
        <van-tabbar-item icon="share" to="/discover" >发现</van-tabbar-item>
        <van-tabbar-item icon="pending-orders" to="order">订单</van-tabbar-item>
        <van-tabbar-item icon="contact" to="/profile">我的</van-tabbar-item>
    </van-tabbar>
 </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      icon: {
        normal: "//img.yzcdn.cn/icon-normal.png",
        active: "//img.yzcdn.cn/icon-active.png"
      }
    };
  },
  components: {}
};
</script>

<style>
</style>
