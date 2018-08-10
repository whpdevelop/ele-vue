// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// rem 适配脚本
import '@/assets/js/rem.js'
// 公共样式
import '@/assets/css/base.scss'

// 引入ui组件 (按需引入)

import { Button } from 'vant';
Vue.use(Button);
import { Icon } from 'vant';
Vue.use(Icon);
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);
import { Lazyload } from 'vant';
// options 为可选参数，无则不传
Vue.use(Lazyload);
import { Row, Col } from 'vant';
Vue.use(Row).use(Col);
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);
import { Tag } from 'vant';
Vue.use(Tag);
import { Loading } from 'vant';
Vue.use(Loading);


Vue.config.productionTip = false

// 定义一个图片路径的全局变量
Vue.prototype.imgsrc = 'https://fuss10.elemecdn.com/{0}.{1}?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/'

// 引入公共方法
import '@/assets/js/tools'
// Vue.prototype.format = format

// 引入全局过滤器
import '@/assets/js/filters'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
