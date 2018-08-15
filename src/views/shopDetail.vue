<template>
 <div id='shopDetail'>
     <div class="nav" ref="nav">
         <van-nav-bar left-arrow class="navTop" @click-left="onClickLeft"/>
         <img :src="imgsrc.format(info.src,info.src.includes('jpeg')?'jpeg':'png')" alt="">
     </div>
    <h3 ref="title">{{info.title}}</h3>
    <ul :class="{titleNav:true,titleFixed:fixedFlag}">
        <li>点餐</li>
        <li>评价</li>
        <li>商家</li>
    </ul>
    <h4 :class="{mt:fixedFlag}">商家推荐</h4>
    <ul class="shopRecommend">
        <li>
            <img src="https://fuss10.elemecdn.com/5/53/a9b46d4531cbbdb11696bc28023c6png.png?imageMogr/format/webp/thumbnail/240x/" alt="">
            <p>水果茶</p>
            <p>
                <span>¥</span>
                <span>+</span>
            </p>
        </li>
        <li>
            <img src="https://fuss10.elemecdn.com/5/53/a9b46d4531cbbdb11696bc28023c6png.png?imageMogr/format/webp/thumbnail/240x/" alt="">
            <p>水果茶</p>
            <p>
                <span>¥</span>
                <span>+</span>
            </p>
        </li>
        <li>
            <img src="https://fuss10.elemecdn.com/5/53/a9b46d4531cbbdb11696bc28023c6png.png?imageMogr/format/webp/thumbnail/240x/" alt="">
            <p>水果茶</p>
            <p>
                <span>¥</span>
                <span>+</span>
            </p>
        </li>
         <li>
            <img src="https://fuss10.elemecdn.com/5/53/a9b46d4531cbbdb11696bc28023c6png.png?imageMogr/format/webp/thumbnail/240x/" alt="">
            <p>水果茶</p>
            <p>
                <span>¥</span>
                <span>+</span>
            </p>
        </li>
    </ul>
    <div class="foodList" ref="foodList" :style="{height:listH+'px'}">
      <div class="foodNav" ref="foodNav">
        <ul>
          <li v-for="(item,index) in foodListData" :key="index" @click="toFoodList(index)">{{item.name}}</li>
        </ul>
      </div>
      <div class="foodLists" ref="foodLists">
        <ul>
          <li v-for="(item,index) in foods" :key="index" ref="list">
          <!-- <li v-for="index in 80" :key="index" ref="list"> -->
            <h4>
              {{item.name}}
            </h4>
              <ul>
                <li v-for="(item,index) in item.data" :key="index">
                  <div class="left">
                      <img :src="imgsrc.format(item.image_path,item.image_path.includes('jpeg')?'jpeg':'png')" alt="">
                  </div>
                  <div class="right">
                      <h5>{{item.name}}</h5>
                      <p > {{item.description}}</p>
                      <p>{{item.tips}}</p>
                      <p>
                        <span>¥{{item.specfoods[0].price}}</span>
                        <span>+</span>
                      </p>
                  </div>
                </li>
              </ul>
          </li>
        </ul>
      </div>
    </div>
 </div>
</template>

<script>
// 引入实现滚动的插件
import BScroll from "better-scroll";
import { getDetailData } from "@/api";
export default {
  data() {
    return {
      info: {},
      keyName: this.$route.name,
      listH: 0,
      fixedFlag: false,
      foodListData: [],
      foods: []
    };
  },
  created() {
    // 设置食物列表的固定高度
    this.listH = window.innerHeight - 51;
    if (!localStorage.getItem(this.$route.name)) {
      this.init();
    }
    this.info = JSON.parse(localStorage.getItem(this.$route.name));
  },
  mounted() {
    let lis = this.$refs.list;
    // console.log(this.$refs.list);
    // 食物区域的滚动处理
    this.initScroll();

    this.$nextTick(() => {
      // if (!this.initScroll) {
      // } else {
      // }
      // let lis = this.$refs.list;
      // console.log(lis.length);
    });

    // 获取 nav 盒子的高度
    let navH = this.$refs.nav.offsetHeight;
    // 获取title 盒子的高度
    let titleH = this.$refs.title.offsetHeight;
    // 卷曲的高度 基准值
    this.standardH = navH + titleH;
    window.addEventListener("scroll", this.fixedHandle.bind(this), false);
  },
  updated() {
    let lis = this.$refs.list;
    this.listScroll.refresh();
    // console.log(this.$refs.list);
    // this.$nextTick(() => {
    //   this.initScroll();
    // });
  },
  methods: {
    init() {
      //   this.$route.params
      // console.log(JSON.stringify(this.$route.params));
      localStorage.setItem(
        this.$route.name,
        JSON.stringify(this.$route.params)
      );
      // 获取数据 foodlistnavdata
      // console.log(this.$route.params.id);
      getDetailData(this.$route.params.id).then(res => {
        // console.log(res);
        this.foodListData.push(...res.data);
        let arr = [];
        res.data.forEach(item => {
          arr.push({ name: item.name, data: item.foods });
        });
        this.foods.push(...arr);
      });
    },
    onClickLeft() {
      //   this.$router.push("/index");
      this.$router.go(-1);
    },
    initScroll() {
      this.listScroll = new BScroll(this.$refs.foodLists, {
        click: true,
        scrollY: true
      });
      this.listScroll.on("scrollEnd", () => {
        this.listScroll.refresh();
      });
      this.navScroll = new BScroll(this.$refs.foodNav, {
        click: true,
        scrollY: true
      });
    },
    // 处理tabar 滚动到顶部固定
    fixedHandle() {
      let scrollH = document.documentElement.scrollTop;
      if (scrollH >= this.standardH) {
        this.fixedFlag = true;
      } else {
        this.fixedFlag = false;
      }
    },
    // 跳转到导航对应的内容
    toFoodList(index) {
      this.listScroll.refresh();
      // this.$refs.list 获取所有的列表
      let el = this.$refs.list[index];
      // 滚动到相应的位置
      this.listScroll.scrollToElement(el, 300);
    }
  },
  watch: {
    dom: function(a, b) {
      console.log(a);
      console.log(b);
    }
  },
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
  .titleFixed {
    position: fixed;
    top: 0;
    z-index: 100;
    margin-bottom: 1rem;
  }
  .titleNav {
    height: 1rem;
    width: 100%;
    background-color: #fff;
    display: flex;
    border-bottom: 1px solid rgb(218, 213, 213);
    li {
      flex: 1;
      text-align: center;
      line-height: 1rem;
    }
  }
  .mt {
    margin-top: 1rem;
  }
  h4 {
    padding: 0.1rem;
  }
  .shopRecommend {
    display: flex;
    overflow: scroll;
    height: 4.2rem;

    li {
      flex: none;
      width: 4rem;
      padding: 0.1rem 0.2rem;
      img {
        width: 100%;
        height: 2rem;
      }
      p:nth-of-type(1) {
        text-align: center;
        padding-top: 0.2rem;
      }
      p:nth-of-type(2) {
        padding-top: 0.4rem;
        display: flex;
        justify-content: space-around;
        span:nth-of-type(2) {
          background-color: #2396ff;
          display: block;
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 50%;
          color: #fff;
          font-size: 0.4rem;
          text-align: center;
          line-height: 0.4rem;
        }
      }
    }
  }
  .foodList {
    border-top: 1px solid #ccc;
    overflow: hidden;
    display: flex;
    .foodNav {
      border-right: 1px solid #ccc;
      flex: 1;
      ul {
        li {
          line-height: 1rem;
          text-align: center;
          border-bottom: 1px solid #ccc;
        }
      }
    }
    .foodLists {
      flex: 3;
      & > ul {
        padding: 0.1rem;
        & > li {
          ul {
            li {
              display: flex;
              flex-wrap: wrap;
              .left {
                // width: 1.5rem;
                // height: 1.5rem;
                width: 30%;
                padding: 0.1rem;
                img {
                  width: 100%;
                  // height: 100%;
                }
              }
              .right {
                width: 70%;
                padding: 0 0.2rem;
                p {
                  font-size: 0.1rem;
                }
                p:nth-of-type(3) {
                  span:nth-of-type(1) {
                    float: left;
                  }
                  span:nth-of-type(2) {
                    float: right;
                    width: 0.4rem;
                    height: 0.4rem;
                    background-color: #2396ff;
                    border-radius: 50%;
                    color: #fff;
                    text-align: center;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
