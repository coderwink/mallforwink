<template >
  <div v-show="isShow">
    <div class="toast">{{message}}</div>
  </div>
</template>

<script>
export default {
  // props: {
  //     message: {
  //       type: String,
  //       default() {
  //         return '加入购物车成功'
  //       }
  //     },
  //     isShow: {
  //       type: Boolean,
  //       default() {
  //         return false
  //       }
  //     }
  // }   组件的使用方法
  //封装成插件， 那么就得需要定义一个自己的方法 让这个方法被调用的时候执行修改值的方式
  data() {
    return {
      message: "",
      isShow: false
    };
  },
  methods: {
    show(message, delay = 2000) {
      this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
      }, delay);
    }
  }
};
</script>

<style scoped>
.toast {
  padding: 10px 20px;
  /* line-height: 30px; */
  /* text-align: center;
    width: 150px;
    height: 30px; */
  z-index: 999;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
}
</style>