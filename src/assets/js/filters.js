
import Vue from 'vue'

Vue.filter('numFormat', function (val) {
    var ret = Math.round(val / 10)
    return ret / 100;
})