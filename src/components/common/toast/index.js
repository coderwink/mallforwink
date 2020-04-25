import Toast from './Toast'
import Vue from 'vue'
//创建一个obj
const obj = {}
obj.install = function (Vue) {
  //1.创建构造器
  console.log('---');
  
  const constructor = Vue.extend(Toast)
  //通过new创建 toast 
  const toast = new constructor()
  //手动将toast挂载到div上
  toast.$mount(document.createElement('div'))
  //将template模板加入到body中
  document.body.appendChild(toast.$el)
  //添加进原型
  Vue.prototype.$toast = toast 
}
export default obj