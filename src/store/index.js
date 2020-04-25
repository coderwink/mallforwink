import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCount(state, payload) {
      payload.count++  
    },
    addCartShop(state, payload) {
      payload.isChecked = true
      state.cartList.push(payload)
    }
  },
  actions: {
    addCartShop(context, payload) {
     return new Promise((resolve, reject) => {
      let oldPoduction = context.state.cartList.find(item => item.iid === payload.iid);
      if(oldPoduction) {
        resolve("商品数量加一")
        context.commit('addCount', oldPoduction)
      }else {
        //如果没有 每一次进来 payload.count的默认值都是一
        resolve("加入购物车成功")
        payload.count = 1
        context.commit('addCartShop', payload)
      } 
     })
    }
  }
})
export default store