import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/base.css';
import 'mdn-polyfills/HTMLCanvasElement.prototype.toBlob';
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
