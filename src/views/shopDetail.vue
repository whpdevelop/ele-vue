<template>
 <div id='shopDetail'>
     <div class="nav">
         <van-nav-bar left-arrow class="navTop" @click-left="onClickLeft"/>
         <img :src="imgsrc.format(info.src,info.src.includes('jpeg')?'jpeg':'png')" alt="">
     </div>
    <h3>{{info.title}}</h3>
    <ul class="titleNav">
        <li>点餐</li>
        <li>评价</li>
        <li>商家</li>
    </ul>
    <h4>商家推荐</h4>
    <ul class="shopRecommend">
        <li>
            <img src="https://fuss10.elemecdn.com/5/53/a9b46d4531cbbdb11696bc28023c6png.png?imageMogr/format/webp/thumbnail/240x/" alt="">
            <p>水果茶</p>
            <p>
                <span>¥</span>
                <span>+</span>
            </p>
        </li>
    </ul>
 </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      keyName: this.$route.name
    };
  },
  created() {
    if (!localStorage.getItem(this.$route.name)) {
      console.log();
      this.init();
    }
    this.info = JSON.parse(localStorage.getItem(this.$route.name));
  },
  methods: {
    init() {
      //   this.$route.params
      console.log(JSON.stringify(this.$route.params));
      localStorage.setItem(
        this.$route.name,
        JSON.stringify(this.$route.params)
      );
    },
    onClickLeft() {
      //   this.$router.push("/index");
      this.$router.go(-1);
    }
  },
  watch: {},
  destroyed() {
    localStorage.removeItem(this.keyName);
  },
  components: {}
};
</script>

<style lang="scss">
#shopDetail {
  .van-nav-bar__left {
    font-size: 0.4rem;
    bottom: 0.9rem;
    .van-icon {
      color: #fff;
    }
  }
  .navTop {
    height: 1.8rem;
    background-color: #ddd;
  }
  .nav {
    height: 2.5rem;
    position: relative;
    img {
      width: 1.6rem;
      height: 1.6rem;
      position: absolute;
      left: 50%;
      top: 0.9rem;
      transform: translateX(-50%);
      z-index: 10;
    }
  }
  h3 {
    text-align: center;
  }
  .titleNav {
    display: flex;
    border-bottom: 1px solid rgb(218, 213, 213);
    li {
      flex: 1;
      text-align: center;
      line-height: 1rem;
    }
  }
  h4 {
    padding: 0.1rem;
  }
  .shopRecommend {
    li {
      width: 2rem;
      img {
        width: 100%;
        height: 100px;
      }
    }
  }
}
</style>
