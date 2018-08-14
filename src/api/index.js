
/* 
    api 文件
*/

import axios from 'axios'
http://172.16.29.66:8081/#/index
axios.defaults.baseURL = 'http://127.0.0.1:3000/restapi/shopping';
// axios.defaults.baseURL = 'http://172.16.29:3000/restapi/shopping';

// 获取首页的食品入口数据


export const getFoodEnter = () => {
    let url = '/openapi/entries?latitude=39.90469&longitude=116.407173&templates[]=main_template&templates[]=favourable_template&templates[]=svip_template&terminal=h5'
    return axios.get(url)
}

// 默认加载的首页商铺信息

/* 
    首页 order_by = 0
    https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=39.90469&longitude=116.407173&offset=8&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=f10273ac3a9d4a1993de6c39b091d602&terminal=h5
*/
export const getListData = (offset = 0, num = 0) => {
    let url = `/v3/restaurants?latitude=39.90469&longitude=116.407173&offset=${offset}&limit=8&order_by=${num}&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=f10273ac3a9d4a1993de6c39b091d602&terminal=h5`
    return axios.get(url)
}

/* 
    距离最近 order_by = 5
    https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=39.90469&longitude=116.407173&offset=0&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&order_by=5&rank_id=&terminal=h5

 */

// 根据id 获取该商铺具体信息
// /shopping/v2/menu?restaurant_id=406894&terminal=h5

export const getDetailData = (id) => {
    let url = `/v2/menu?restaurant_id=${id}&terminal=h5`
    return axios.get(url)
}
