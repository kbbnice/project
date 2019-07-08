import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { DatePicker } from '_ant-design-vue@1.3.10@ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(DatePicker);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
