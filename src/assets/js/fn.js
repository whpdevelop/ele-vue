

export const scrollLoad = (ele, ref, cb) => {
    /* 
        注意需要在data中定义标志  flag = true
    */
    // console.log(ele)
    let scrollH = document.documentElement.scrollTop;
    let homeH = ele.$refs[ref].offsetHeight;
    let clientH = document.documentElement.clientHeight;
    let distence = homeH - scrollH - clientH;
    // console.log(homeH)
    if (distence < 200) {
        if (ele.flag) {
            ele.flag = false;
            cb && cb()
            // getIndexMoudelData(this.$route.params.index, 20).then(res => {
            //   this.flag = true;
            //   this.datas.entrylist.push(...res.data.d.entrylist);
            // });
        }
    }
}