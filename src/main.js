// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import  VueQuillEditor from 'vue-quill-editor'
import 'url-search-params-polyfill' 
import "babel-polyfill"

//UE编辑器
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

import 'element-ui/lib/theme-chalk/index.css'
import './css/default.css'
import './css/main.css'
import 'quill/dist/quill.snow.css'


Vue.use(VueQuillEditor)
Vue.use(ElementUI)
Vue.config.productionTip = false
window.axios = axios 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  methods:{
    checkLogin(){
      if(!localStorage.login){
        this.$router.push('/login') 
      }else{
        var _this = this  
        var params = new URLSearchParams() 
        params.append('status', 'checklogin') 
        params.append('username',localStorage.login) 
        axios.post('../../data/admindata.php',params)
          .then(function (response) {
            if(response.data.code != '0'){

            }else{
              _this.$router.push('/login') 
            }
          })
      }
    }
  },
  created() {
    this.checkLogin() 
  },
  mounted:function(){
  },
  watch:{
    "$route" : 'checkLogin'
  },
})


Vue.component('navBox', {
  // 选项
  template: '<li>A custom component!</li>'
})