import Vue from "vue";
import LoadingComponent from './loading.vue'
 
const Loading = {}
let showLoading = false // 存储loading显示状态
let loadingNode = null // 存储loading节点元素
const LoadingConstructor = Vue.extend(LoadingComponent)
 
Loading.install = function (Vue) {
 Vue.prototype.$loading = function (tips, type) {
  if (type === 'hide') {
   loadingNode.isShowLoading = showLoading = false
  } else {
   if (showLoading) {
    // 如果loading还在，则不再执行
    return
   }
   loadingNode = new LoadingConstructor({
    data: {
     isShowLoading: showLoading,
     content: tips
    }
   })
   loadingNode.$mount() // 挂在实例，为了获取下面的loadingNode.$el
   document.body.appendChild(loadingNode.$el)
   loadingNode.isShowLoading = showLoading = true
  }
 };
 
 ['show', 'hide'].forEach(function (type) {
  Vue.prototype.$loading[type] = function (tips) {
   return Vue.prototype.$loading(tips, type)
  }
 })
}
 
export default Loading