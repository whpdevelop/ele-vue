<template>
 <div id='index' ref="shopList">
   <!-- 首页轮播图 -->
    <van-swipe  class="foodEnter">
      <van-swipe-item>
        <ul>
          <li v-if="index<10" v-for="(item,index) in foodEnterData" :key="index">
            <!-- <img :src="item.src" alt=""> -->
            <!-- 
              由于图片的后缀有可能是 .jpeg .png
             -->
            <img :src="imgsrc.format(item.image_hash,item.image_hash.includes('jpeg')?'jpeg':'png')" alt="">
            <p>{{item.name}}</p>
          </li>
        </ul>
      </van-swipe-item>
      <van-swipe-item>
        <ul>
          <li v-if="index>=10" v-for="(item,index) in foodEnterData" :key="index">
            <img :src="imgsrc.format(item.image_hash,'jpeg')" alt="">
            <p>{{item.name}}</p>
          </li>
        </ul>
      </van-swipe-item>
    </van-swipe>
    <!-- 优惠活动 -->
    <van-row class="activity" justify="space-around" type="flex">
      <van-col span="11" class="left">
        <p>品质套餐</p>
        <p>搭配齐全吃得好</p>
        <p>立即抢购 ></p>
        <img :src="imgs[0]" alt="">
      </van-col>
      <van-col span="11" class="right">
        <p>限量抢购</p>
        <p>超值美味9.9元起</p>
        <p>1287人正在抢 ></p>
        <img :src="imgs[1]" alt="">
      </van-col>
    </van-row>
    <!-- 推荐商家 -->
    <p>- 推荐商家 -</p>

    <van-tabs v-model="active" class="list">
      <van-tab v-for="(item,index) in recommendShops" :title="item.title" :key="index">

        <!-- 商家列表 -->
        <van-cell-group>
          <van-cell class="item" v-for="(item,index) in shopLists" :key="index" @click="toDetail({id:item.restaurant.id,src:item.restaurant.image_path,title:item.restaurant.name})">
            <van-row>
              <van-col span="6">
                <img :src="imgsrc.format(item.restaurant.image_path,item.restaurant.image_path.includes('jpeg')?'jpeg':'png')" alt="">
              </van-col>
              <van-col span="18">
                <van-tag type="primary">品牌</van-tag>
                <span>{{item.restaurant.name}}</span>
                <van-row type="flex"       justify="space-between">
                    <van-col span="16">
                      <img class="star" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjUwJSIgeTI9IjUwJSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiNGRkRFMDAiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkZCMDAwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNNTQuMDE3IDguMDcybC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1My42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bS00OCAwTDMuNDY1IDkuNjMzYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDUuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMEw3LjU1IDMuMzUybDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2TDguNDk3IDYuMjY5bC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDE3LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMMjkuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w0MS42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=">
                    <span>{{item.restaurant.rating}}</span>
                    </van-col>
                    <van-col span="8">
                      <span>月售{{item.restaurant.recent_order_num}}单</span>
                    </van-col>
                </van-row>
                <van-row type="flex" justify="space-between">
                  <van-col>
                    <span>¥0起送</span>
                    <span>{{item.restaurant.piecewise_agent_fee.description}}</span>
                  </van-col>
                  <van-col>
                    <span>{{ item.restaurant.distance | numFormat}} km</span>
                    <span>{{item.restaurant.order_lead_time}}分钟</span>
                  </van-col>
                </van-row>
              </van-col>
            </van-row>
          </van-cell>
        </van-cell-group>
      </van-tab>
    </van-tabs>
    <!-- <h1>{{imgsrc.format('aa')}}</h1> -->
    <!-- 加载菊花 -->
    <van-loading type="spinner" color="black" v-if="!flag"/>
    

 </div>
</template>

<script>
import { getFoodEnter, getListData } from "@/api";
import { scrollLoad } from "@/assets/js/fn";
export default {
  data() {
    return {
      offset: 8,
      flag: true,
      active: 0,
      imgs: [
        "https://fuss10.elemecdn.com/d/d4/16ff085900d62b8d60fa7e9c6b65dpng.png?imageMogr/format/webp/thumbnail/!240x160r/gravity/Center/crop/240x160/",
        "https://fuss10.elemecdn.com/b/e1/0fa0ed514c093a7138b0b9a50d61fpng.png?imageMogr/format/webp/thumbnail/!240x160r/gravity/Center/crop/240x160/"
      ],
      foodEnterData: [],

      recommendShops: [
        { title: "品质联盟" },
        { title: "距离最近" },
        // { title: "品质联盟" },
        { title: "筛选" }
      ],
      shopLists: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // 获取轮播图中的信息
      getFoodEnter().then(res => {
        this.foodEnterData.push(...res.data[0].entries);
        // console.log(this.foodEnterData);
      });
      // 获取默认加载的商铺列表
      getListData().then(res => {
        this.shopLists.push(...res.data.items);
        // console.log(this.shopLists);
      });
    },
    // 跳转详情页
    toDetail(obj) {
      this.$router.push({ name: "shopDetail", params: obj });
    }
  },
  mounted() {
    // 滚动加载更多
    window.onscroll = () => {
      let that = this;
      scrollLoad(that, "shopList", () => {
        getListData(this.offset).then(res => {
          console.log(res);
          this.offset += 8;
          this.flag = true;
          this.shopLists.push(...res.data.items);
        });
      });
    };
  },
  destroyed() {
    window.onscroll = null;
  },
  components: {}
};
</script>

<style lang="scss">
#index {
  .van-loading {
    margin: 0.2rem 0;
    height: 0.8rem;
    padding-left: 50%;
  }
  .foodEnter {
    height: 3.6rem;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        text-align: center;
        width: 20%;
        height: 1.8rem;
        img {
          width: 0.9rem;
          height: 0.9rem;
        }
        p {
          font-size: 0.24rem;
        }
      }
    }
  }
  .activity {
    .left {
      background-color: #f4f4f4;
      padding: 0.2rem;
      p:nth-of-type(1) {
        font-size: 0.36rem;
        font-weight: 700;
      }
      p:nth-of-type(2) {
        padding-top: 5/50rem;
        font-size: 12/50rem;
      }
      p:nth-of-type(3) {
        padding-top: 0.2rem;
        font-size: 0.28rem;
        color: #af8260;
      }
      img {
        width: 2rem;
        float: right;
      }
    }
    .right {
      background-color: #f4f4f4;
      padding: 0.2rem;
      p:nth-of-type(1) {
        font-size: 18px;
        font-weight: 700;
        color: red;
      }
      p:nth-of-type(2) {
        padding-top: 0.1rem;
        font-size: 12/50rem;
      }
      p:nth-of-type(3) {
        padding-top: 0.1rem;
        font-size: 0.28rem;
        color: #af8260;
      }
      img {
        width: 2rem;
        float: right;
      }
    }
  }
  & > p {
    padding: 0.1rem 0;
    text-align: center;
    font-size: 18/50rem;
  }
  .list {
    .item {
      img {
        width: 80%;
        border-radius: 50%;
      }
      .star {
        width: 1.5rem;
      }
    }
  }
}
</style>


    // foodEnterData: [
    //     {
    //       src:
    //         "http://fuss10.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
    //       title: "美食"
    //     },
    //     {
    //       src:
    //         "http://fuss10.elemecdn.com/c/7e/76a23eb90dada42528bc41499d6f8jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
    //       title: "商超便利"
    //     },
    //     {
    //       src:
    //         "http://fuss10.elemecdn.com/c/e9/8b589472823fa97666cef19af644cjpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
    //       title: "午餐"
    //     },
    //     {
    //       src:
    //         "http://fuss10.elemecdn.com/0/d0/dd7c960f08cdc756b1d3ad54978fdjpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
    //       title: "水果"
    //     },
    //     {
    //       src:
    //         "http://fuss10.elemecdn.com/7/0a/af108e256ebc9f02db599592ae655jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
    //       title: "医药健康"
    //     },
    //     {
    //       src:
    //         "http://fuss10.elemecdn.com/a/7b/b02bd836411c016935d258b300cfejpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
    //       title: "大牌5折"
    //     },
    //     {
    //       src:
    //         "http://fuss10.elemecdn.com/3/01/c888acb2c8ba9e0c813f36ec9e90ajpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
    //       title: "浪漫鲜花"
    //     },
    //     {
    //       src:
    //         "http://fuss10.elemecdn.com/c/21/e42997b86b232161a5a16ab813ae8jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
    //       title: "厨房生鲜"
    //     },
    //     {
    //       src:
    //         "http://fuss10.elemecdn.com/e/58/bceb19258e3264e64fb856722c3c1jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
    //       title: "跑腿代购"
    //     },
    //     {
    //       src:
    //         "http://fuss10.elemecdn.com/7/b6/235761e50d391445f021922b71789jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
    //       title: "披萨意面"
    //     },
    //     {
    //       src:
    //         "http://fuss10.elemecdn.com/7/d6/6f2631288a44ec177204e05cbcb93jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
    //       title: "地方小吃"
    //     },
    //     {
    //       src:
    //         "http://fuss10.elemecdn.com/e/c7/b7ba9547aa700bd20d0420e1794a8jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
    //       title: "麻辣烫"
    //     },
    //     {
    //       src:
    //         "http://fuss10.elemecdn.com/a/8a/ec21096d528b7cfd23cdd894f01c6jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/",
    //       title: "地方菜系"
    //     }
    //   ],
